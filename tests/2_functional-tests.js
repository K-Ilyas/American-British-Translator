const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
    suite("POST request to /api/translate", () => {
        test("Translation with text and locale fields", function (done) {
            chai
                .request(server)
                .post("/api/translate")
                .send({ text: "Mangoes are my favorite fruit.", locale: "american-to-british" })
                .end(function (error, response) {
                    assert.equal(response.status, "200", "the response status must be 200");
                    assert.hasAllKeys(response.body, ["text", "translation"])
                    assert.equal(response.body.text, "Mangoes are my favorite fruit.", "the text property must be equal to the original text");
                    assert.equal(response.body.translation, "Mangoes are my <span class=\"highlight\">favourite</span> fruit.", "the translation property must include the right translation");
                    done();
                })
        });
        test("Translation with text and invalid locale field", function (done) {
            chai
                .request(server)
                .post("/api/translate")
                .send({ text: "Mangoes are my favorite fruit.", locale: "british" })
                .end(function (error, response) {
                    assert.equal(response.status, "200", "the response status must be 200");
                    assert.property(response.body, "error", "the response must include the error property");
                    assert.equal(response.body.error, "Invalid value for locale field", "the response must be Invalid value for locale field");
                    done();
                })
        });
        test("Translation with missing text field", function (done) {
            chai
                .request(server)
                .post("/api/translate")
                .send({ locale: "american-to-british" })
                .end(function (error, response) {
                    assert.equal(response.status, "200", "the response status must be 200");
                    assert.property(response.body, "error", "the response must include the error property");
                    assert.equal(response.body.error, "Required field(s) missing", "the response must be Required field(s) missing");
                    done();
                })
        });
        test("Translation with missing locale field", function (done) {
            chai
                .request(server)
                .post("/api/translate")
                .send({ text: "Mangoes are my favorite fruit." })
                .end(function (error, response) {
                    assert.equal(response.status, "200", "the response status must be 200");
                    assert.property(response.body, "error", "the response must include the error property");
                    assert.equal(response.body.error, "Required field(s) missing", "the response must be Required field(s) missing");
                    done();
                })
        });
        test("Translation with empty text", function (done) {
            chai
                .request(server)
                .post("/api/translate")
                .send({ text: "", locale: "american-to-british" })
                .end(function (error, response) {
                    assert.equal(response.status, "200", "the response status must be 200");
                    assert.property(response.body, "error", "the response must include the error property");
                    assert.equal(response.body.error, "No text to translate", "the response must be No text to translate");
                    done();
                })
        });
        test("Translation with text that needs no translation", function (done) {
            chai
                .request(server)
                .post("/api/translate")
                .send({ text: "Mangoes are my favourite fruit.", locale: "american-to-british" })
                .end(function (error, response) {
                    assert.equal(response.status, "200", "the response status must be 200");
                    assert.hasAllKeys(response.body, ["text", "translation"])
                    assert.equal(response.body.text, "Mangoes are my favourite fruit.", "the text property must be equal to the original text");
                    assert.equal(response.body.translation, "Everything looks good to me!", "the translation property must be Everything looks good to me!");
                    done();
                })
        });
    });
});
