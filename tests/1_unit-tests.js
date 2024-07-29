const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator()
const americanToBritish = 'american-to-british'
const britishToAmerican = 'british-to-american'

suite('Unit Tests', () => {
    test('Mangoes are my favorite fruit. to British English', () => {
        const text = 'Mangoes are my favorite fruit.'
        translator.translateText(text, americanToBritish)
        assert.equal(translator.resultText, 'Mangoes are my favourite fruit.');
    });

    test('I ate yogurt for breakfast. to British English', () => {
        const text = 'I ate yogurt for breakfast.'
        translator.translateText(text, americanToBritish)
        assert.equal(translator.resultText, 'I ate yoghurt for breakfast.');
    });

    test('We had a party at my friend\'s condo. to British English', () => {
        const text = "We had a party at my friend's condo."
        translator.translateText(text, americanToBritish)
        assert.equal(translator.resultText, "We had a party at my friend's flat.")
    });

    test('Can you toss this in the trashcan for me? to British English', () => {
        const text = 'Can you toss this in the trashcan for me?'
        translator.translateText(text, americanToBritish)
        assert.equal(translator.resultText, 'Can you toss this in the bin for me?')
    });

    test('The parking lot was full. to British English', () => {
        const text = 'The parking lot was full.'
        translator.translateText(text, americanToBritish)
        assert.equal(translator.resultText, 'The car park was full.')
    });

    test('Like a high tech Rube Goldberg machine. to British English', () => {
        const text = 'Like a high tech Rube Goldberg machine.'
        translator.translateText(text, americanToBritish)
        assert.equal(translator.resultText, 'Like a high tech Heath Robinson device.')
    });

    test('To play hooky means to skip class or work. to British English', () => {
        const text = 'To play hooky means to skip class or work.'
        translator.translateText(text, americanToBritish)
        assert.equal(translator.resultText, 'To bunk off means to skip class or work.')
    });

    test('No Mr. Bond, I expect you to die. to British English', () => {
        const text = 'No Mr. Bond, I expect you to die.'
        translator.translateText(text, americanToBritish)
        assert.equal(translator.resultText, 'No Mr Bond, I expect you to die.')
    });

    test('Dr. Grosh will see you now. to British English', () => {
        const text = 'Dr. Grosh will see you now.'
        translator.translateText(text, americanToBritish)
        assert.equal(translator.resultText, 'Dr Grosh will see you now.')
    });

    test('Lunch is at 12:15 today. to British English', () => {
        const text = 'Lunch is at 12:15 today.'
        translator.translateText(text, americanToBritish)
        assert.equal(translator.resultText, 'Lunch is at 12.15 today.')
    });

    test('We watched the footie match for a while. to American English', () => {
        const text = 'We watched the footie match for a while.'
        translator.translateText(text, britishToAmerican)
        assert.equal(translator.resultText, 'We watched the soccer match for a while.')
    });

    test('Paracetamol takes up to an hour to work. to American English', () => {
        const text = 'Paracetamol takes up to an hour to work.'
        translator.translateText(text, britishToAmerican)
        assert.equal(translator.resultText, 'Tylenol takes up to an hour to work.')
    });

    test('First, caramelise the onions. to American English', () => {
        const text = 'First, caramelise the onions.'
        translator.translateText(text, britishToAmerican)
        assert.equal(translator.resultText, 'First, caramelize the onions.')
    });

    test('I spent the bank holiday at the funfair. to American English', () => {
        const text = 'I spent the bank holiday at the funfair.'
        translator.translateText(text, britishToAmerican)
        assert.equal(translator.resultText, 'I spent the public holiday at the carnival.')
    });

    test('I had a bicky then went to the chippy. to American English', () => {
        const text = 'I had a bicky then went to the chippy.'
        translator.translateText(text, britishToAmerican)
        assert.equal(translator.resultText, 'I had a cookie then went to the fish-and-chip shop.')
    });

    test('I\'ve just got bits and bobs in my bum bag. to American English', () => {
        const text = "I've just got bits and bobs in my bum bag."
        translator.translateText(text, britishToAmerican)
        assert.equal(translator.resultText, "I've just got odds and ends in my fanny pack.")
    });

    test('The car boot sale at Boxted Airfield was called off. to American English', () => {
        const text = 'The car boot sale at Boxted Airfield was called off.'
        translator.translateText(text, britishToAmerican)
        assert.equal(translator.resultText, 'The swap meet at Boxted Airfield was called off.')
    });

    test('Have you met Mrs Kalyani? to American English', () => {
        const text = 'Have you met Mrs Kalyani?'
        translator.translateText(text, britishToAmerican)
        assert.equal(translator.resultText, 'Have you met Mrs. Kalyani?')
    });

    test('Prof Joyner of King\'s College, London. to American English', () => {
        const text = "Prof Joyner of King's College, London."
        translator.translateText(text, britishToAmerican)
        assert.equal(translator.resultText, "Prof. Joyner of King's College, London.")
    });

    test('Tea time is usually around 4 or 4.30. to American English', () => {
        const text = 'Tea time is usually around 4 or 4.30.'
        translator.translateText(text, britishToAmerican)
        assert.equal(translator.resultText, 'Tea time is usually around 4 or 4:30.')
    });

    test('Highlight translation in Mangoes are my favorite fruit.', () => {
        const text = 'Mangoes are my favorite fruit.'
        translator.translateText(text, americanToBritish)
        translator.highlightTranslation()
        assert.equal(translator.resultText, "Mangoes are my <span class=\"highlight\">favourite</span> fruit.")
    });

    test('Highlight translation in I ate yogurt for breakfast.', () => {
        const text = 'I ate yogurt for breakfast.'
        translator.translateText(text, americanToBritish)
        translator.highlightTranslation()
        assert.equal(translator.resultText, "I ate <span class=\"highlight\">yoghurt</span> for breakfast.")
    });

    test('Highlight translation in We watched the footie match for a while.', () => {
        const text = 'We watched the footie match for a while.'
        translator.translateText(text, britishToAmerican)
        translator.highlightTranslation()
        assert.equal(translator.resultText, "We watched the <span class=\"highlight\">soccer</span> match for a while.")
    });

    test('Highlight translation in Paracetamol takes up to an hour to work.', () => {
        const text = 'Paracetamol takes up to an hour to work.'
        translator.translateText(text, britishToAmerican)
        translator.highlightTranslation()
        assert.equal(translator.resultText, "<span class=\"highlight\">Tylenol</span> takes up to an hour to work.")
    });
});
