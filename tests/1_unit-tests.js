const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

//function for delete span tags
function transation(translator, text, locale) {
    return translator.translation(text, locale).replace(/<\/?span([^<\/]*)>/g, "")
}
suite('Unit Tests', () => {
    const translator = new Translator();
    suite("American to British English", (locale = "american-to-british") => {
        test("Translate Mangoes are my favorite fruit. to British English", function () {
            assert.equal(transation(translator, "Mangoes are my favorite fruit.", locale), "Mangoes are my favourite fruit.");
        });
        test("Translate I ate yogurt for breakfast. to British English", function () {
            assert.equal(transation(translator, "I ate yogurt for breakfast.", locale), "I ate yoghurt for breakfast.");
        });
        test("Translate We had a party at my friend's condo. to British English", function () {
            assert.equal(transation(translator, "We had a party at my friend's condo.", locale), "We had a party at my friend's flat.");
        });
        test("Translate Can you toss this in the trashcan for me? to British English", function () {
            assert.equal(transation(translator, "Can you toss this in the trashcan for me?", locale), "Can you toss this in the bin for me?");
        });
        test("Translate The parking lot was full. to British English", function () {
            assert.equal(transation(translator, "The parking lot was full.", locale), "The car park was full.");
        });
        test("Translate Like a high tech Rube Goldberg machine. to British English", function () {
            assert.equal(transation(translator, "Like a high tech Rube Goldberg machine.", locale), "Like a high tech Heath Robinson device.");
        });
        test("Translate To play hooky means to skip class or work. to British English", function () {
            assert.equal(transation(translator, "To play hooky means to skip class or work.", locale), "To bunk off means to skip class or work.");
        });
        test("Translate No Mr. Bond, I expect you to die. to British English", function () {
            assert.equal(transation(translator, "No Mr. Bond, I expect you to die.", locale), "No Mr Bond, I expect you to die.");
        });
        test("Translate Dr. Grosh will see you now. to British English", function () {
            assert.equal(transation(translator, "Dr. Grosh will see you now.", locale), "Dr Grosh will see you now.");
        });
        test("Translate Lunch is at 12:15 today. to British English", function () {
            assert.equal(transation(translator, "Lunch is at 12:15 today.", locale), "Lunch is at 12.15 today.");
        });
    });
    suite("British to American English", (locale = "british-to-american") => {
        test("Translate We watched the footie match for a while. to American English", function () {
            assert.equal(transation(translator, "We watched the footie match for a while.", locale), "We watched the soccer match for a while.");
        });
        test("Translate Paracetamol takes up to an hour to work. to American English", function () {
            assert.equal(transation(translator, "Paracetamol takes up to an hour to work.", locale), "Tylenol takes up to an hour to work.");
        });
        test("Translate First, caramelise the onions. to American English", function () {
            assert.equal(transation(translator, "First, caramelise the onions.", locale), "First, caramelize the onions.");
        });
        test("Translate I spent the bank holiday at the funfair. to American English", function () {
            assert.equal(transation(translator, "I spent the bank holiday at the funfair.", locale), "I spent the public holiday at the carnival.");
        });
        test("Translate I had a bicky then went to the chippy. to American English", function () {
            assert.equal(transation(translator, "I had a bicky then went to the chippy.", locale), "I had a cookie then went to the fish-and-chip shop.");
        });
        test("Translate I've just got bits and bobs in my bum bag. to American English", function () {
            assert.equal(transation(translator, "I've just got bits and bobs in my bum bag.", locale), "I've just got odds and ends in my fanny pack.");
        });
        test("Translate The car boot sale at Boxted Airfield was called off. to American English", function () {
            assert.equal(transation(translator, "The car boot sale at Boxted Airfield was called off.", locale), "The swap meet at Boxted Airfield was called off.");
        });
        test("Translate Have you met Mrs Kalyani? to American English", function () {
            assert.equal(transation(translator, "Have you met Mrs Kalyani?", locale), "Have you met Mrs. Kalyani?");
        });
        test("Translate Prof Joyner of King's College, London. to American English", function () {
            assert.equal(transation(translator, "Prof Joyner of King's College, London.", locale), "Prof. Joyner of King's College, London.");
        });
        test("Translate Tea time is usually around 4 or 4.30. to American English", function () {
            assert.equal(transation(translator, "Tea time is usually around 4 or 4.30.", locale), "Tea time is usually around 4 or 4:30.");
        });

    })
    suite("Highlight translation to British English ", (locale = "american-to-british") => {
        test("Highlight translation in Mangoes are my favorite fruit.", function () {
            const translation = translator.translation("Mangoes are my favorite fruit.", locale);
            assert.equal(translation, "Mangoes are my <span class=\"highlight\">favourite</span> fruit.");
            assert.include(translation, "<span class=\"highlight\">favourite</span>");
        });
        test("Highlight translation in I ate yogurt for breakfast.", function () {
            const translation = translator.translation("I ate yogurt for breakfast.", locale);
            assert.equal(translation, "I ate <span class=\"highlight\">yoghurt</span> for breakfast.");
            assert.include(translation, "<span class=\"highlight\">yoghurt</span>");
        });
    });
    suite("Highlight translation to American English ", (locale = "british-to-american") => {
        test("Highlight translation in We watched the footie match for a while.", function () {
            const translation = translator.translation("We watched the footie match for a while.", locale);
            assert.equal(translation, "We watched the <span class=\"highlight\">soccer</span> match for a while.");
            assert.include(translation, "<span class=\"highlight\">soccer</span>");
        });
        test("Highlight translation in Paracetamol takes up to an hour to work.", function () {
            const translation = translator.translation("Paracetamol takes up to an hour to work.", locale);
            assert.equal(translation, "<span class=\"highlight\">Tylenol</span> takes up to an hour to work.");
            assert.include(translation, "<span class=\"highlight\">Tylenol</span>");
        });
    })
});
