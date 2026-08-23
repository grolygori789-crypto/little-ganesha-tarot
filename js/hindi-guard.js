(() => {
  'use strict';
  const BASE = window.LGTQuestionGuard;
  if (!BASE) throw new Error('Hindi question guard requires base Question Guard.');
  const CRISIS = /(?:मैं|मुझे|मेरा|मेरी).{0,24}(?:मरना चाहता|मरना चाहती|आत्महत्या|खुद को मार|जान दे|जीना नहीं चाहता|जीना नहीं चाहती)/u;
  const VIOLENT = /(?:मैं|मुझे).{0,24}(?:मारना चाहता|मारना चाहती|हत्या करना|चाकू मार|गोली मार|नुकसान पहुँचाना चाहता|नुकसान पहुंचाना चाहता)/u;
  function validate(value) {
    const result = BASE.validate(value);
    if (!result.ok) return result;
    const text = result.text || '';
    if (CRISIS.test(text)) return { ...result, ok:false, code:'safetyCrisis' };
    if (VIOLENT.test(text)) return { ...result, ok:false, code:'violentIntent' };
    return result;
  }
  window.LGTQuestionGuard = Object.freeze({ ...BASE, version:'question-guard-hi-v1', validate });
})();
