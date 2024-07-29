const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');
let traslator = new Translator()

let validText = 'Mangoes are my favorite fruit.';
let invalidLocale = 'b-to-a'
const americanToBritish = 'american-to-british'
const britishToAmerican = 'british-to-american'

suite('Functional Tests', () => {
    test('Translation with text and locale fields', function(done){
        chai
            .request(server)
            .keepOpen()
            .post('/api/translate')
            .send({
                text: validText,
                locale: americanToBritish
            })
            .end(function(err, res){
                assert.equal(res.status, 200)
                assert.equal(res.type, 'application/json')
                assert.equal(res.body.translation, "Mangoes are my <span class=\"highlight\">favourite</span> fruit.")
                done()
            });
    });

    test('Translation with text and invalid locale field', function(done){
        chai
            .request(server)
            .keepOpen()
            .post('/api/translate')
            .send({
                text: validText,
                locale: invalidLocale
            })
            .end(function(err, res){
                assert.equal(res.status, 200)
                assert.equal(res.type, 'application/json')
                assert.equal(res.body.error, 'Invalid value for locale field')
                done()
            });
    });

    test('Translation with missing text field', function(done){
        chai
            .request(server)
            .keepOpen()
            .post('/api/translate')
            .send({
                locale: invalidLocale
            })
            .end(function(err, res){
                assert.equal(res.status, 200)
                assert.equal(res.type, 'application/json')
                assert.equal(res.body.error, 'Required field(s) missing')
                done()
            });
    });

    test('Translation with missing locale field', function(done){
        chai
            .request(server)
            .keepOpen()
            .post('/api/translate')
            .send({
                text: validText
            })
            .end(function(err, res){
                assert.equal(res.status, 200)
                assert.equal(res.type, 'application/json')
                assert.equal(res.body.error, 'Required field(s) missing')
                done()
            });
    });

    test('Translation with empty text', function(done){
        chai
            .request(server)
            .keepOpen()
            .post('/api/translate')
            .send({
                text: '',
                locale: americanToBritish
            })
            .end(function(err, res){
                assert.equal(res.status, 200)
                assert.equal(res.type, 'application/json')
                assert.equal(res.body.error, 'No text to translate')
                done()
            });
    });

    test('Translation with text that needs no translation', function(done){
        chai
            .request(server)
            .keepOpen()
            .post('/api/translate')
            .send({
                text: validText,
                locale: britishToAmerican
            })
            .end(function(err, res){
                assert.equal(res.status, 200)
                assert.equal(res.type, 'application/json')
                assert.equal(res.body.translation, "Everything looks good to me!")
                done()
            });
    });
});
