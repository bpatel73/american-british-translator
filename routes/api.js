'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const {text, locale} = req.body
      if(text === ''){
        res.json({ error: 'No text to translate' })
      }
      else if(!text || !locale){
        res.json({ error: 'Required field(s) missing' })
      }
      else if(locale !== 'american-to-british'  && locale !== 'british-to-american'){
        res.json({ error: 'Invalid value for locale field' })
      }
      else{
        translator.translateText(text, locale)
        if(text === translator.resultText){
          res.json({text: text, translation: 'Everything looks good to me!'})
        }else{
          translator.highlightTranslation()
          res.json({text: text, translation: translator.resultText})
        }
      }
    });
};
