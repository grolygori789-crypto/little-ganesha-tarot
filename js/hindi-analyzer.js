(() => {
  'use strict';
  const BASE = window.LGTQuestionAnalyzer;
  if (!BASE) throw new Error('Hindi analyzer requires Question Analyzer.');

  const LABELS = Object.freeze({
    self_image:'स्व-छवि और आकर्षण', social_perception:'दूसरे आपको कैसे देखते हैं', love_relationships:'प्यार और रिश्ते',
    work_purpose:'काम और दिशा', money_resources:'पैसा और संसाधन', choice_action:'चुनाव और अगला कदम',
    outlook_opportunity:'दिशा और अवसर', inner_growth:'भीतरी स्थिति और विकास', spiritual_unseen:'आध्यात्मिक और अदृश्य', general:'समग्र चिंतन'
  });
  const has=(s,re)=>re.test(s);
  const norm=(v)=>String(v??'').normalize('NFC').replace(/[\u200B-\u200D\u2060\uFEFF]/g,'').replace(/\s+/g,' ').trim();
  const yesno=/(?:क्या|होगा|होगी|हूँगा|हूँगी|मिलेगा|मिलेगी|करूँ|करूं|चाहिए)/u;
  const multi=(s)=>((s.match(/[?？]/g)||[]).length>1)||/(?:और|फिर).{2,90}(?:क्या|कब|कैसे).{2,90}(?:क्या|कब|कैसे)/u.test(s);

  function timeframe(s){
    const m=s.match(/(?:अगले|आने वाले|आने वाली|में)\s*(\d{1,3})\s*(दिन|दिनों|हफ्ते|हफ़्ते|सप्ताह|महीने|महीनों|साल|वर्ष)/u);
    if(m){ const amount=Number(m[1]); const raw=m[2]; const unit=/दिन/.test(raw)?'day':/(हफ्त|हफ़्त|सप्ताह)/.test(raw)?'week':/मही/.test(raw)?'month':'year'; const enUnit=unit+(amount===1?'':'s'); return {key:`${amount}_${enUnit}`,explicit:true,amount,unit,monthsApprox:unit==='year'?amount*12:unit==='month'?amount:unit==='week'?amount/4.345:amount/30.437,original:m[0],labels:{en:`the next ${amount} ${enUnit}`,th:'',hi:`अगले ${amount} ${raw.replace(/ों$/,'')}`}}; }
    const named=[
      ['today',/(?:आज|आज के दिन)/u,'आज',0],['now',/(?:अभी|इस समय|फिलहाल|फ़िलहाल)/u,'अभी',0],['this_week',/(?:इस हफ्ते|इस हफ़्ते|इस सप्ताह)/u,'इस हफ्ते',.25],['next_week',/(?:अगले हफ्ते|अगले हफ़्ते|अगले सप्ताह)/u,'अगले हफ्ते',.25],['this_month',/(?:इस महीने)/u,'इस महीने',1],['next_month',/(?:अगले महीने)/u,'अगले महीने',1],['this_year',/(?:इस साल|इस वर्ष)/u,'इस साल',12],['next_year',/(?:अगले साल|अगले वर्ष)/u,'अगले साल',12],['short_term',/(?:जल्द|निकट भविष्य|आने वाले दिनों)/u,'निकट भविष्य में',3],['long_term',/(?:लंबे समय|दीर्घकाल|लंबी अवधि)/u,'लंबी अवधि में',24]
    ];
    for(const [key,re,label,monthsApprox] of named) if(re.test(s)) return {key,explicit:true,amount:null,unit:null,monthsApprox,original:label,labels:{en:'',th:'',hi:label}};
    return {key:'unspecified',explicit:false,amount:null,unit:null,monthsApprox:null,original:'',labels:{en:'',th:'',hi:''}};
  }
  function boundary(s){
    if(/(?:बीमारी|रोग|निदान|डायग्नोस|प्रेग्नेंट|प्रेगनेंट|गर्भवती|इलाज|दवा|ऑपरेशन|सर्जरी).{0,30}(?:होगा|होगी|ठीक|सफल|नतीजा|परिणाम|हूँ|हूं)/u.test(s)) return 'medical';
    if(/(?:अदालत|कोर्ट|मुकदमा|केस|कानूनी|जेल|सज़ा|सजा).{0,30}(?:जीत|हार|फैसला|क्या होगा|नतीजा)/u.test(s)) return 'legal';
    if(/(?:लॉटरी|जुआ|सट्टा|बेटिंग|जैकपॉट|लकी नंबर|शर्त).{0,40}(?:जीत|नंबर|कौन|क्या|कब|पैसा)/u.test(s)) return 'gambling';
    if(/(?:शेयर|स्टॉक|क्रिप्टो|बिटकॉइन|निवेश).{0,40}(?:कितना बढ़|कितना गिरे|दाम|कीमत|गारंटी|रिटर्न|पक्का|100%)/u.test(s)) return 'financial';
    if(/(?:कब मर|मौत कब|कितनी उम्र में मर|कब मृत्यु)/u.test(s)) return 'death';
    return null;
  }
  function facet(s,domain){
    const rules=[
      ['investment',/(?:निवेश|शेयर|स्टॉक|क्रिप्टो|म्यूचुअल फंड)/u],['wealth',/(?:अमीर|धनवान|समृद्ध|दौलत|संपत्ति)/u],['income',/(?:आमदनी|कमाई|वेतन|सैलरी)/u],['debt',/(?:कर्ज़|कर्ज|ऋण)/u],['savings',/(?:बचत|सेविंग)/u],
      ['feelings',/(?:वह मेरे लिए क्या महसूस|क्या वह मुझे पसंद|क्या वो मुझे पसंद|क्या वह मुझसे प्यार|भावना|फीलिंग)/u],['romantic_attraction',/(?:आकर्षित|आकर्षण|पसंद करता|पसंद करती)/u],['reconciliation',/(?:वापस आए|वापस आएगा|वापस आएगी|सुलह|फिर साथ)/u],['marriage',/(?:शादी|विवाह)/u],['relationship_future',/(?:रिश्ता.{0,20}(?:आगे|भविष्य|चलेगा|टिकेगा))/u],
      ['new_job',/(?:नई नौकरी|नौकरी बदल|जॉब बदल)/u],['promotion',/(?:प्रमोशन|पदोन्नति)/u],['project',/(?:प्रोजेक्ट|परियोजना)/u],['business',/(?:व्यवसाय|बिज़नेस|बिजनेस)/u],['career_direction',/(?:करियर|कैरियर)/u],
      ['appearance',/(?:सुंदर|खूबसूरत|हैंडसम|दिखता हूँ|दिखती हूँ|चेहरा|रूप)/u],['attractiveness',/(?:आकर्षक|आकर्षण|सेक्सी|चार्म)/u],['how_others_see_me',/(?:लोग मुझे कैसे देखते|दूसरे मुझे कैसे देखते|मेरे बारे में लोग क्या सोच)/u],
      ['anxiety',/(?:चिंता|घबराहट|डर|एंग्जायटी)/u],['motivation',/(?:प्रेरणा|मोटिवेशन|उत्साह नहीं)/u],['healing',/(?:हीलिंग|ठीक होना|भावनात्मक चोट|उबरना)/u],['purpose',/(?:जीवन का उद्देश्य|मकसद|मेरी दिशा)/u],
      ['divine_protection',/(?:देवता.{0,18}रक्षा|गणेश.{0,18}रक्षा|ईश्वर.{0,18}रक्षा|आशीर्वाद)/u],['unseen_influence',/(?:भूत|आत्मा|नज़र लगी|काला जादू|श्राप|शाप|नकारात्मक ऊर्जा)/u]
    ];
    for(const [key,re] of rules) if(re.test(s)) return key;
    if(domain==='choice_action') return 'decision';
    if(domain==='outlook_opportunity') return 'outcome';
    return 'general';
  }
  function domain(s){
    const scores={self_image:0,social_perception:0,love_relationships:0,work_purpose:0,money_resources:0,choice_action:0,outlook_opportunity:0,inner_growth:0,spiritual_unseen:0};
    const hit=(k,re,w=3)=>{ if(re.test(s)) scores[k]+=w; };
    hit('self_image',/(?:मैं कैसा दिख|मैं कैसी दिख|सुंदर|खूबसूरत|हैंडसम|आकर्षक|आत्मविश्वास|स्व-छवि)/u,4);
    hit('social_perception',/(?:लोग मुझे कैसे|दूसरे मुझे कैसे|लोग मेरे बारे में|किस नज़र से देखते|किस नजर से देखते|मेरी छवि|प्रतिष्ठा|इज़्ज़त|इज्जत)/u,5);
    hit('love_relationships',/(?:प्यार|प्रेम|रिश्ता|संबंध|बॉयफ्रेंड|गर्लफ्रेंड|पति|पत्नी|पार्टनर|क्रश|एक्स|शादी|विवाह|पसंद करता|पसंद करती|दिल)/u,5);
    hit('work_purpose',/(?:काम|नौकरी|जॉब|करियर|कैरियर|ऑफिस|बॉस|प्रोजेक्ट|परियोजना|व्यवसाय|बिज़नेस|बिजनेस|इंटरव्यू|प्रमोशन|पदोन्नति|पढ़ाई|परीक्षा)/u,5);
    hit('money_resources',/(?:पैसा|पैसे|धन|आर्थिक|वित्तीय|आमदनी|कमाई|वेतन|सैलरी|बचत|कर्ज़|कर्ज|ऋण|निवेश|शेयर|स्टॉक|क्रिप्टो|अमीर|दौलत|संपत्ति)/u,5);
    hit('choice_action',/(?:क्या करूँ|क्या करूं|क्या चुनूँ|क्या चुनूं|चुनना|निर्णय|फैसला|छोड़ दूँ|छोड़ दूं|रहूँ या|रहूं या|बदलना चाहिए|करना चाहिए)/u,4);
    hit('outlook_opportunity',/(?:आगे क्या|भविष्य|संभावना|मौका|सफल|नतीजा|परिणाम|किस दिशा|कैसा रहेगा|कैसी रहेगी|क्या होगा|क्या होगी)/u,3);
    hit('inner_growth',/(?:मन|भीतर|तनाव|चिंता|डर|थकान|बर्नआउट|संतुलन|विकास|आत्मविश्वास|हीलिंग|मोटिवेशन|आदत|मकसद)/u,4);
    hit('spiritual_unseen',/(?:आध्यात्मिक|ईश्वर|भगवान|देवता|गणेश|आत्मा|भूत|कर्म|भाग्य|संकेत|सपना|नज़र लगी|काला जादू|श्राप|शाप)/u,5);
    const order=['self_image','social_perception','love_relationships','work_purpose','money_resources','choice_action','outlook_opportunity','inner_growth','spiritual_unseen'];
    const ranked=order.map(k=>[k,scores[k]]).sort((a,b)=>b[1]-a[1]||order.indexOf(a[0])-order.indexOf(b[0]));
    return {key:ranked[0][1]>0?ranked[0][0]:'general',scores,ranked};
  }
  function type(s,facetKey){
    if(/(?:कब|कितने समय|कितने दिन|कितने महीने|कितने साल|समय लगेगा)/u.test(s)) return 'timing';
    if(/(?:कितना|कितनी|कितने प्रतिशत|कितनी संभावना)/u.test(s)) return 'degree';
    if(/(?:या|बनाम|कौन बेहतर|किसे चुन)/u.test(s) && /(?:चुन|बेहतर|करूँ|करूं)/u.test(s)) return 'comparison';
    if(/(?:क्या करूँ|क्या करूं|क्या चुनूँ|चाहिए|निर्णय|फैसला)/u.test(s)) return 'decision';
    if(['feelings','how_others_see_me','appearance','attractiveness'].includes(facetKey)) return 'perception';
    if(yesno.test(s)) return 'probability';
    if(/(?:आगे|भविष्य|दिशा|नतीजा|परिणाम|कैसा रहेगा|कैसी रहेगी)/u.test(s)) return 'outlook';
    return 'open';
  }
  function nameHash(name){let h=2166136261;for(const ch of String(name||'')){h^=ch.codePointAt(0);h=Math.imul(h,16777619);}return (h>>>0).toString(36);}
  function namedRomanticSubject(s){const m=s.match(/क्या\s+([\u0900-\u097F][\u0900-\u097F\u200c\u200d]{1,22})\s+मुझे/u);if(!m)return '';const n=m[1].trim();return /^(?:वह|वो|ये|यह)$/u.test(n)?'':n;}
  function target(s,d){
    if(namedRomanticSubject(s)) return 'specific_other';
    if(/(?:एक्स|पूर्व प्रेमी|पूर्व प्रेमिका)/u.test(s)) return 'ex';
    if(/(?:पति|पत्नी|पार्टनर|बॉयफ्रेंड|गर्लफ्रेंड)/u.test(s)) return 'partner';
    if(/(?:क्रश|पसंद का व्यक्ति|जिसे मैं पसंद)/u.test(s)) return 'crush';
    if(d==='social_perception') return 'public';
    if(d==='love_relationships') return 'relationship';
    if(d==='work_purpose') return /(?:नौकरी|जॉब)/u.test(s)?'job':'situation';
    return 'self';
  }
  function perspective(d,t){ if(d==='social_perception'||t==='public') return 'public_view'; if(['partner','ex','crush'].includes(t)) return 'other_view'; if(d==='love_relationships') return 'shared_dynamic'; return 'self_view'; }
  function analyzeHindi(value){
    const original=norm(value); const d=domain(original); const f=facet(original,d.key); const q=type(original,f); const tf=timeframe(original); const b=boundary(original); const t=target(original,d.key); const p=perspective(d.key,t); const named=namedRomanticSubject(original); const text=named&&['romantic_attraction','feelings'].includes(f)?`does hn${nameHash(named)} like me`:original;
    const ranked=d.ranked, top=ranked[0]?.[1]||0, second=ranked[1]?.[1]||0; const ambiguous=top>=4&&second>=4&&top-second<=1;
    return Object.freeze({
      version:'question-analyzer-hi-v1', text, domain:d.key, facet:f, facetDomain:d.key, questionType:q, target:t, perspective:p,
      metric:q==='timing'?'timing_quality':q==='probability'?'likelihood':q==='degree'?'degree':q==='comparison'?'deciding_factor':'general',
      timeframe:tf.key,timeframeMeta:Object.freeze(tf),comparison:q==='comparison',conditional:/(?:अगर|यदि).{2,120}(?:तो|क्या|होगा|होगी|चाहिए)/u.test(original),
      multiQuestion:multi(original),polarity:yesno.test(original)?'yes_no_tendency':'open',certaintyRequest:/(?:पक्का|गारंटी|100%|निश्चित|यकीन से)/u.test(original)?'high':(yesno.test(original)?'medium':'low'),
      confidence:d.key==='general'?.46:Math.min(.98,.72+Math.min(.2,top*.025)),ambiguous,boundary:b,
      epistemicMode:d.key==='spiritual_unseen'?(f==='unseen_influence'?'unseen-threat':'symbolic-only'):(p==='other_view'?'third-party-uncertain':null),
      candidates:Object.freeze(ambiguous?[ranked[0][0],ranked[1][0]]:[d.key]),scores:Object.freeze({...d.scores})
    });
  }
  function useHindi(value){ return document.documentElement.lang==='hi' || /[\u0900-\u097F]/u.test(String(value||'')); }
  function analyze(value){ return useHindi(value)?analyzeHindi(value):BASE.analyze(value); }
  function label(d,lang='en'){ return lang==='hi' ? (LABELS[d]||LABELS.general) : BASE.label(d,lang); }
  function withDomain(a,d){ if(!a||!LABELS[d]) return BASE.withDomain(a,d); return Object.freeze({...a,domain:d,facetDomain:a.facetDomain||d,ambiguous:false,candidates:Object.freeze([d]),confidence:Math.max(a.confidence||0,.9)}); }
  function withStoredResolution(a,stored){
    if(!(String(a?.version||'').includes('hi') || useHindi(a?.text))) return BASE.withStoredResolution(a,stored);
    if(!a||!stored) return a; const d=stored.contextKey&&LABELS[stored.contextKey]?stored.contextKey:a.domain;
    return Object.freeze({...a,domain:d,facet:stored.facet||a.facet,facetDomain:stored.facetDomain||a.facetDomain||d,questionType:stored.questionType||a.questionType,target:stored.target||a.target,perspective:stored.perspective||a.perspective,metric:stored.metric||a.metric,timeframe:stored.timeframe||a.timeframe,polarity:stored.polarity||a.polarity,ambiguous:false,candidates:Object.freeze([d]),confidence:Math.max(a.confidence||0,.9)});
  }
  window.LGTQuestionAnalyzer=Object.freeze({...BASE,version:'question-analyzer-v3+hi1',analyze,label,withDomain,withStoredResolution,hindiLabels:LABELS});
})();
