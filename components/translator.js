const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    constructor(){
        this.matched = []
        this.result = []
        this.resultText = ''
    }

    checkAmericanBritish(locale){
        let searchDict;
        if(locale === 'american-to-british'){
            searchDict = americanOnly
        }
        else{
            searchDict = britishOnly
        }
        let text = this.resultText
        const arrAmericanBritish = Object.keys(searchDict);
        const regex = new RegExp(`\\b(${arrAmericanBritish.join('|')})\\b`, "gi")
        const parts = text.match(regex)?.filter(Boolean).map(word => word.trim());
        
        parts?.forEach(el => {
            if(text.match(el)){
                this.matched.push(searchDict[el.toLowerCase()])
                text = text.replace(el, searchDict[el.toLowerCase()])
            }
        })
        this.resultText = text
    }

    checkSpelling(locale){
        let searchDict;
        if(locale === 'american-to-british'){
            searchDict = americanToBritishSpelling
        }
        else{
            searchDict = Object.fromEntries(Object.entries(americanToBritishSpelling).map(([key,val]) => [val, key]));
        }
        let text = this.resultText
        const regex = /[^\w\s']/g
        for (let prop in searchDict){
            if(text.replace(regex, '').split(' ').includes(prop)){
                this.matched.push(searchDict[prop])
                text = text.replace(prop, searchDict[prop])
            }
        }
        this.resultText = text
    }

    checkTitle(locale){
        let searchDict;
        if(locale === 'american-to-british'){
            searchDict = americanToBritishTitles
        }
        else{
            searchDict = Object.fromEntries(Object.entries(americanToBritishTitles).map(([key,val]) => [val, key]));
        }
        let text = this.resultText
        const arrTitles = Object.keys(searchDict)
        const regex = new RegExp(`(${arrTitles.map(keyword => keyword.replace('.', '\\.')).join('|')})`, "gi")
        const parts = text.match(regex)?.filter(Boolean).map(word => word.trim());
        
        parts?.forEach(el => {
            if(text.match(el)){
                if(el[0] === el[0].toUpperCase()){
                    const replacement = searchDict[el.toLowerCase()]
                    this.matched.push(replacement[0].toUpperCase() + replacement.slice(1))
                    text = text.replace(el, replacement[0].toUpperCase() + replacement.slice(1))
                }
                if(el[0] === el[0].toLowerCase()){
                    this.matched.push(searchDict[el.toLowerCase()])
                    text = text.replace(el, searchDict[el.toLowerCase()])
                }
                
            }
        });
        this.resultText = text
    }

    checkTime(locale){
        let regex;
        if(locale === 'american-to-british'){
            regex = /(\d+)\:(\d{2})/g
        }else{
            regex = /(\d+)\.(\d{2})/g
        }
        let text = this.resultText
        const parts = text.match(regex)?.filter(Boolean).map(word => word.trim());

        parts?.forEach(el => {
            if(text.match(el)){
                if(regex.toString().includes(':')){
                    this.matched.push(el.replace(':', '.'))
                    text = text.replace(el, el.replace(':', '.'))
                }
                if(regex.toString().includes('.')){
                    this.matched.push(el.replace('.', ':'))
                    text = text.replace(el, el.replace('.', ':'))
                }
            }
        });
        this.resultText = text
    }

    translateText(text, locale){
        this.resultText = text
        this.checkSpelling(locale);
        this.checkAmericanBritish(locale);
        this.checkTime(locale)
        this.checkTitle(locale)
        console.log(this.resultText, this.matched);
    }

    highlightTranslation(){
        let highlighted = this.resultText
        this.matched.forEach(el => {
            highlighted = this.resultText.replace(el, `<span class="highlight">${el}</span>`)
        });
        this.resultText = highlighted
    }
}

module.exports = Translator;