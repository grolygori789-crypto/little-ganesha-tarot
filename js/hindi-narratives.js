(() => {
  'use strict';
  const CONTENT=window.LGTReadingContent, HC=window.LGTHindiContent;
  if(!CONTENT||!HC) throw new Error('Hindi narratives require tarot and Hindi content.');
  const VERSION='hindi-narratives-v1';
  const FOCUS=Object.freeze({
    general:{label:'जीवन की समग्र तस्वीर',context:'आपके जीवन की व्यापक दिशा',lens:'opportunitiesWatchouts',intro:'यह रीडिंग किसी एक घटना से ज़्यादा उस बड़े पैटर्न को देखती है जिसमें आप अभी खड़े हैं।'},
    love:{label:'प्यार और रिश्ते',context:'प्यार और रिश्तों की स्थिति',lens:'loveRelationships',intro:'यह रीडिंग रिश्ते की वास्तविक गतिशीलता, परस्पर प्रयास, भावनात्मक स्पष्टता और स्वस्थ अगला कदम देखती है।'},
    career:{label:'करियर और काम',context:'काम और करियर की दिशा',lens:'workGoals',intro:'यह रीडिंग आपके मौजूदा कामकाजी संदर्भ, दबाव, अवसर और आगे के व्यवहारिक कदम पर केंद्रित है।'},
    money:{label:'पैसा और संसाधन',context:'पैसे, सुरक्षा और उपलब्ध संसाधनों की स्थिति',lens:'moneyResources',intro:'यह रीडिंग पैसे और संसाधनों के साथ आपके निर्णय को समझने के लिए है; यह बाज़ार, कीमत या रिटर्न की गारंटी नहीं देती।'},
    wellbeing:{label:'भलाई और संतुलन',context:'आपकी गति, तनाव, आराम और जीवन-संतुलन',lens:'innerBalance',intro:'यह रीडिंग तनाव, आराम, सीमाओं और रोज़मर्रा के संतुलन को देखती है; यह किसी बीमारी का निदान या इलाज नहीं बताती।'},
    growth:{label:'व्यक्तिगत विकास',context:'आपके भीतर चल रहे विकास और बदलाव',lens:'guidanceToday',intro:'यह रीडिंग देखती है कि आपके भीतर क्या बदल रहा है, कौन-सा पुराना पैटर्न पीछे खींच रहा है और किस अभ्यास से बदलाव वास्तविक बनेगा।'}
  });
  const NEG=new Set(['12','13','15','16','18','26','30','31','39','40','43','51','52','54','57','58','59','67','68']);
  const POS=new Set(['03','06','07','08','10','14','17','19','20','21','22','24','25','27','34','35','36','37','38','44','45','47','49','50','55','64','66','69','71','72','73','76','77']);
  function tone(card){ if(NEG.has(card.id)) return -1; if(POS.has(card.id)) return 1; return 0; }
  function cardOf(x){return typeof x==='string'?CONTENT.getCard(x):x;}
  function safeCards(xs){const a=(xs||[]).map(cardOf);if(a.length!==3||a.some(x=>!x)||new Set(a.map(x=>x.id)).size!==3)throw new Error('Hindi spread requires three unique cards.');return a;}
  function focus(id){return FOCUS[id]||FOCUS.general;}
  function p(card){return HC.profile(card);}
  function focusLine(card,f){return HC.lens(card,f.lens);}
  function connector(a,b){
    const ta=tone(a),tb=tone(b);
    if(ta<0&&tb>0)return 'यही वह मोड़ है जहाँ दबाव से निकलने का रास्ता दिखाई देता है।';
    if(ta>0&&tb<0)return 'लेकिन अगला कार्ड बताता है कि अच्छी शुरुआत अपने-आप सुरक्षित परिणाम नहीं बनाती; बीच की शर्तों को संभालना होगा।';
    if(ta===tb)return 'दोनों कार्ड एक ही बात को अलग कोण से मजबूत कर रहे हैं।';
    return 'इन दोनों के बीच अंतर ही रीडिंग का सबसे उपयोगी तनाव है—यहीं आपका चुनाव मायने रखता है।';
  }
  function pattern(cards){
    const major=cards.filter(c=>c.arcana==='major').length;
    const suits=cards.map(c=>c.suit).filter(Boolean); const repeated=suits.find(s=>suits.filter(x=>x===s).length>=2);
    if(major>=2)return 'दो या अधिक मेजर आर्काना होने से यह केवल रोज़मर्रा की छोटी उलझन नहीं लगती। यहाँ दिशा, मूल्य या आपके अपने रुख में गहरा बदलाव महत्वपूर्ण है।';
    const themes={wands:'पहल, ऊर्जा और दिशा',cups:'भावना, जुड़ाव और भावनात्मक ईमानदारी',swords:'सोच, संवाद और कठिन निर्णय',pentacles:'स्थिरता, संसाधन और व्यवहारिक वास्तविकता'};
    if(repeated)return `एक ही सूट दोहरने से रीडिंग का केंद्र ${themes[repeated]} पर आ जाता है। सब कुछ एक साथ ठीक करने के बजाय इसी परत से शुरुआत करना ज़्यादा असरदार होगा।`;
    return 'तीनों कार्ड अलग तरह की बात उठा रहे हैं, इसलिए इसका समाधान एक ही चाल में नहीं है। भीतर की स्पष्टता, निर्णय और व्यवहारिक कदम—तीनों को साथ लाना होगा।';
  }
  function trajectory(cards){const [a,b,c]=cards.map(tone);if(a<0&&c>0)return'release';if(c>a)return'lift';if(c<a)return'pressure';if(a>0&&b>0&&c>0)return'supportive';if(a<0&&b<0&&c<0)return'demanding';return'mixed';}

  function three(cardsOrIds,focusId='general'){
    const cards=safeCards(cardsOrIds),f=focus(focusId),[a,b,c]=cards,[pa,pb,pc]=cards.map(p);
    const pos=[
      {id:'past',label:'अतीत',cardId:a.id,text:`${f.context} की पृष्ठभूमि में ${a.title.hi} दिखाता है कि ${focusLine(a,f)} यह बात अभी भी वर्तमान को प्रभावित कर रही है, लेकिन यह आपकी पूरी कहानी नहीं है।`},
      {id:'present',label:'वर्तमान',cardId:b.id,text:`अभी सबसे सक्रिय कार्ड ${b.title.hi} है। ${focusLine(b,f)} इसलिए इस रीडिंग का असली नियंत्रण-बिंदु वर्तमान में है—यहीं आपकी प्रतिक्रिया आगे की दिशा बदल सकती है।`},
      {id:'next',label:'आगे क्या खुल सकता है',cardId:c.id,text:`अगर मौजूदा पैटर्न इसी तरह चलता रहा, ${c.title.hi} ${f.context} को ${pc.e} की दिशा में ले जाता है। इसे तय भविष्य नहीं, बल्कि अभी बन रही सम्भावित दिशा की तरह पढ़ें।`}
    ];
    const story=`${a.title.hi} से ${b.title.hi} और फिर ${c.title.hi} तक की कहानी एक साफ़ क्रम बनाती है। शुरुआत में ${pa.e} अभी के केंद्र में ${pb.e} आ गया है। ${connector(b,c)} अंतिम कार्ड ${pc.e} की ओर संकेत देता है। इसका मतलब यह नहीं कि नतीजा तय है; मतलब यह है कि वर्तमान में आप जिस तरह जवाब देते हैं, वही आगे की संभावना को सबसे ज्यादा आकार देगा।`;
    const turning=`इस स्प्रेड का निर्णायक बिंदु ${b.title.hi} है। ${pb.a} अतीत को दोहराने या अंतिम कार्ड का इंतज़ार करने के बजाय यही वह हिस्सा है जिस पर आप अभी प्रभाव डाल सकते हैं।`;
    const guidance=`${f.context} में अभी सबसे समझदार कदम यह है: ${pb.a} उसके बाद ${pc.a} जल्दबाज़ी में अंतिम परिणाम पकड़ने की कोशिश न करें; पहले वर्तमान की शर्त को ठीक करें।`;
    return Object.freeze({version:VERSION,focusId,focusLabel:f.label,focusIntro:f.intro,trajectory:trajectory(cards),positions:Object.freeze(pos.map(Object.freeze)),story,turningPoint:turning,pattern:pattern(cards),guidance,reflection:pb.r});
  }

  function golden(cardsOrIds,focusId='general'){
    const cards=safeCards(cardsOrIds),f=focus(focusId),[a,b,c]=cards,[pa,pb,pc]=cards.map(p);
    const positions=[
      {id:'where-you-stand',label:'आप अभी कहाँ खड़े हैं',cardId:a.id,text:`${a.title.hi} आपकी मौजूदा स्थिति को ${pa.e} के रूप में दिखाता है। ${focusLine(a,f)} यह शुरुआती बिंदु है—न तो फैसला, न ही समस्या की पूरी परिभाषा।`},
      {id:'what-blocks',label:'रास्ते में क्या अटका रहा है',cardId:b.id,text:`${b.title.hi} बताता है कि असली रुकावट कहाँ बन रही है। ${focusLine(b,f)} खास सावधानी: ${pb.c}`},
      {id:'way-forward',label:'आगे की दिशा',cardId:c.id,text:`${c.title.hi} आगे बढ़ने की सबसे उपयोगी दिशा देता है। ${focusLine(c,f)} इसे भविष्यवाणी नहीं, बल्कि वह तरीका मानें जिससे परिस्थिति अधिक खुल सकती है।`}
    ];
    const atGlance=`आपकी स्थिति ${a.title.hi} से शुरू होकर ${b.title.hi} की रुकावट से टकराती है और ${c.title.hi} के रास्ते से खुलती है। मुख्य बात यह है कि ${pb.c.toLowerCase()} और उसके जवाब में ${pc.a.toLowerCase()}`;
    const goldenPath=`${f.context} में यह स्प्रेड “और ज़ोर लगाओ” नहीं कह रहा। पहले ${pb.e.toLowerCase()} को पहचानना होगा। ${connector(b,c)} ${pc.a} जब यह बदलाव व्यवहार में आएगा, तभी ${c.title.hi} की दिशा वास्तविक संभावना बनेगी।`;
    const actions=[`पहला कदम: ${pb.a}`,`दूसरा कदम: ${pc.a}`,`अपनी प्रगति को इस आधार पर जाँचें कि रुकावट वास्तव में कम हो रही है या सिर्फ भावना बदल रही है।`];
    return Object.freeze({version:VERSION,focusId,focusLabel:f.label,focusIntro:f.intro,trajectory:trajectory(cards),positions:Object.freeze(positions.map(Object.freeze)),atGlance,goldenPath,actions:Object.freeze(actions),reflection:pc.r});
  }

  function obstacle(cardsOrIds,focusId='general'){
    const cards=safeCards(cardsOrIds),f=focus(focusId),[a,b,c]=cards,[pa,pb,pc]=cards.map(p);
    const positions=[
      {id:'obstacle',label:'असल रुकावट',cardId:a.id,text:`${a.title.hi} रुकावट को सतह से थोड़ा गहरा दिखाता है: ${pa.e} ${f.context} में यही वह हिस्सा है जिसे सही नाम देना जरूरी है।`},
      {id:'feeds-it',label:'उसे क्या बनाए रखता है',cardId:b.id,text:`${b.title.hi} बताता है कि यह रुकावट क्यों बनी रहती है। ${pb.e} जब यह पैटर्न बार-बार दोहरता है, तो समस्या को अतिरिक्त ताकत मिलती है। ${pb.c}`},
      {id:'releases-it',label:'क्या उसे ढीला करता है',cardId:c.id,text:`${c.title.hi} समाधान को एक व्यवहारिक दिशा देता है: ${pc.a} यही वह बदलाव है जो रुकावट को एक ही झटके में मिटाने के बजाय धीरे-धीरे उसकी पकड़ कम कर सकता है।`}
    ];
    const atGlance=`यह रीडिंग कहती है कि रुकावट सिर्फ ${pa.e.toLowerCase()} नहीं है; उसे ${pb.e.toLowerCase()} बनाए रख रहा है। राहत का रास्ता ${pc.a.toLowerCase()} से शुरू होता है।`;
    const knot=`गाँठ का केंद्र ${a.title.hi} और ${b.title.hi} के संबंध में है। ${connector(a,b)} जब तक ${pb.c.toLowerCase()} तब तक बाहरी बदलाव भी लंबे समय तक टिकना मुश्किल होगा।`;
    const release=`${c.title.hi} का काम “जादुई समाधान” देना नहीं है। यह बताता है कि पकड़ कहाँ ढीली करनी है: ${pc.a} जितना यह कदम नियमित और मापने योग्य होगा, उतना आप समझ पाएँगे कि रुकावट सचमुच कम हो रही है।`;
    const actions=[`आज: ${pc.a}`,`इस सप्ताह देखें कि ${pb.c.toLowerCase()}`,`एक ऐसा संकेत तय करें जिससे आप पहचान सकें कि स्थिति व्यवहार में बेहतर हो रही है।`];
    const watchFor=`सावधानी यह है कि ${pb.c.toLowerCase()} अगर यह फिर लौटे, तो इसे असफलता न मानें; इसे पुराने पैटर्न की पहचान समझकर फिर से चुने हुए कदम पर लौटें।`;
    return Object.freeze({version:VERSION,focusId,focusLabel:f.label,focusIntro:f.intro,trajectory:trajectory(cards),positions:Object.freeze(positions.map(Object.freeze)),atGlance,knot,release,actions:Object.freeze(actions),watchFor,reflection:pc.r});
  }

  function ask(cardOrId,analysis={},question=''){
    const card=cardOf(cardOrId),pr=p(card),d=analysis.domain||'general',ft=analysis.facet||'general',t=tone(card);
    const ctx=({self_image:'आपकी छवि और आकर्षण',social_perception:'दूसरे आपको कैसे ग्रहण कर सकते हैं',love_relationships:'प्यार और रिश्ते',work_purpose:'काम और करियर',money_resources:'पैसा और संसाधन',choice_action:'आपके सामने मौजूद चुनाव',outlook_opportunity:'इस स्थिति की दिशा और अवसर',inner_growth:'आपकी भीतरी स्थिति और विकास',spiritual_unseen:'आध्यात्मिक अर्थ और प्रतीक',general:'आपके सवाल'})[d]||'आपके सवाल';
    let direct='';
    if(d==='love_relationships') direct=t>0?`संकेत रिश्ते में खुलापन या आगे बढ़ने की वास्तविक गुंजाइश दिखाता है, लेकिन इसे दूसरे व्यक्ति के मन की पक्की जानकारी न मानें। ${pr.e}`:t<0?`अभी रिश्ते में दबाव, दूरी या ऐसी शर्त दिखती है जिसे नज़रअंदाज़ करके सकारात्मक निष्कर्ष निकालना ठीक नहीं होगा। ${pr.e}`:`यह रिश्ता एकतरफ़ा “हाँ” या “ना” से ज़्यादा मिश्रित है। ${pr.e}`;
    else if(d==='work_purpose') direct=t>0?`काम के सवाल में दिशा रचनात्मक है, बशर्ते अवसर को ठोस कार्रवाई मिले। ${pr.e}`:t<0?`अभी सावधानी की वजह मौजूद है; जल्द फैसला करने से पहले रुकावट को समझना बेहतर होगा। ${pr.e}`:`काम की दिशा अभी खुली है और परिणाम आपके अगले व्यवहारिक निर्णय पर काफी निर्भर है। ${pr.e}`;
    else if(d==='money_resources') direct=t>0?`वित्तीय संदर्भ में यह कार्ड बेहतर प्रबंधन या अवसर की संभावना दिखाता है, गारंटी नहीं। ${pr.e}`:t<0?`पैसे के मामले में यह कार्ड जोखिम, दबाव या संसाधन-संबंधी सीमा को पहले संभालने की सलाह देता है। ${pr.e}`:`यहाँ पैसा किसी एक “अच्छे/बुरे” परिणाम से ज़्यादा संतुलित प्रबंधन का सवाल है। ${pr.e}`;
    else if(d==='choice_action') direct=t>0?`कार्ड आगे बढ़ने के पक्ष में झुकता है, लेकिन तभी जब कदम साफ़ और व्यवहारिक हो। ${pr.e}`:t<0?`कार्ड अभी रुककर शर्तें जाँचने की तरफ़ झुकता है। ${pr.e}`:`कार्ड तुरन्त हाँ या ना नहीं देता; पहले निर्णय का मुख्य मानदंड साफ़ करना ज़रूरी है। ${pr.e}`;
    else if(d==='social_perception'||d==='self_image') direct=`यह कार्ड कोई सार्वभौमिक “रेटिंग” नहीं देता। यह उस प्रभाव की ओर इशारा करता है जो आप अभी प्रोजेक्ट कर सकते हैं: ${pr.e}`;
    else if(d==='inner_growth') direct=`आपके भीतर की स्थिति को यह कार्ड इस तरह पढ़ता है: ${pr.e} इसे समस्या का लेबल नहीं, बल्कि ध्यान देने योग्य पैटर्न समझें।`;
    else if(d==='spiritual_unseen') direct=`इसे प्रतीकात्मक और चिंतनात्मक रीडिंग की तरह लें, किसी अदृश्य शक्ति के तथ्यात्मक प्रमाण की तरह नहीं। ${pr.e}`;
    else direct=t>0?`इस सवाल की दिशा फिलहाल रचनात्मक दिखती है, लेकिन परिणाम तय नहीं है। ${pr.e}`:t<0?`फिलहाल कुछ वास्तविक प्रतिरोध दिखता है, इसलिए सावधानी उपयोगी होगी। ${pr.e}`:`दिशा मिश्रित है; कार्ड किसी जल्द निष्कर्ष से ज़्यादा स्पष्टता बनाने को कहता है। ${pr.e}`;
    let condition=`जो बात साथ में देखनी चाहिए: ${pr.c} वास्तविक जीवन में व्यवहार, समय और उपलब्ध तथ्य कार्ड से अधिक निर्णायक प्रमाण हैं।`;
    if(ft==='investment') condition=`निवेश के लिए कार्ड को कीमत, रिटर्न या खरीद-बिक्री का संकेत न मानें। स्वतंत्र शोध, विविधीकरण, समय-सीमा और नुकसान सहने की क्षमता देखें। ${pr.c}`;
    if(ft==='feelings'||ft==='romantic_attraction') condition=`दूसरे व्यक्ति की निजी भावना को कार्ड निश्चित नहीं कर सकता। लगातार व्यवहार, प्रयास, संवाद और शब्दों तथा कामों का मेल अधिक विश्वसनीय संकेत हैं। ${pr.c}`;
    if(ft==='divine_protection'||ft==='unseen_influence') condition=`यह प्रतीकात्मक अर्थ दे सकता है, लेकिन देवता, आत्मा, श्राप या अदृश्य प्रभाव को वस्तुनिष्ठ तथ्य के रूप में सत्यापित नहीं कर सकता। ${pr.c}`;
    const rationale=`${card.title.hi} यहाँ इसलिए महत्वपूर्ण है क्योंकि ${ctx} के संदर्भ में इसका मुख्य पैटर्न है: ${pr.e} सवाल का विषय वही रहता है; कार्ड केवल यह बताता है कि उस विषय में किस पहलू को सबसे गंभीरता से देखना चाहिए।`;
    const ganesha=`अगर नन्हे गणेश इस रीडिंग को एक शांत सलाह में समेटें, तो वह होगी: ${pr.a} अपने निर्णय को डर या सिर्फ उम्मीद पर नहीं, बल्कि जो आप सच में देख और कर सकते हैं उस पर टिकाएँ।`;
    return Object.freeze({version:VERSION,contextLabel:ctx,direct,rationale,condition,ganesha,reflection:pr.r,question});
  }
  window.LGTHindiNarratives=Object.freeze({version:VERSION,focuses:FOCUS,tone,trajectory,three,golden,obstacle,ask});
})();
