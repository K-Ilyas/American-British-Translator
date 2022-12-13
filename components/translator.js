const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    translation(text, locale) {
        let translation = text.slice();
        if (locale === "american-to-british") {
            for (let value in americanOnly) {
                if ((new RegExp("\s?" + value + " ")).test(text.toLowerCase()) || (new RegExp(" " + value + "\\.")).test(text.toLowerCase())) {

                    translation = translation.replace((new RegExp(value, "i")), '<span class="highlight">' + americanOnly[value] + "</span>");
                }
            }
            for (let value in americanToBritishSpelling) {
                if ((new RegExp("\s?" + value + " ")).test(text.toLowerCase()) || (new RegExp("\s?" + value + "\\.")).test(text.toLowerCase())) {
                    translation = translation.replace((new RegExp(value, "i")), '<span class="highlight">' + americanToBritishSpelling[value] + "</span>");
                }
            }
            for (let value in americanToBritishTitles) {
                if ((new RegExp("\s?" + value.replace(/(\.)/, "\\$1") + " ")).test(text.toLowerCase())) {
                    translation = translation.replace((new RegExp(value, "i")), '<span class="highlight">' + americanToBritishTitles[value].charAt(0).toUpperCase() + americanToBritishTitles[value].slice(1) + "</span>");
                }
            }
            // time 
            translation = translation.replace(/(\d{1,2})(:)(\d{1,2})/, '<span class="highlight">' + "$1.$3" + "</span>");
        }
        else if (locale === "british-to-american") {
            for (let value in britishOnly) {
                if ((new RegExp("\s?" + value + " ")).test(text.toLowerCase()) || (new RegExp("\s?" + value + "\\.")).test(text.toLowerCase())) {
                    translation = translation.replace((new RegExp(value, "i")), '<span class="highlight">' + britishOnly[value] + "</span>");
                }
            }
            for (let value in americanToBritishSpelling) {
                if ((new RegExp("\s?" + americanToBritishSpelling[value] + " ")).test(text.toLowerCase()) || (new RegExp("\s?" + americanToBritishSpelling[value] + "\\.")).test(text.toLowerCase())) {
                    translation = translation.replace((new RegExp(americanToBritishSpelling[value], "i")), '<span class="highlight">' + value + "</span>");
                }
            }
            for (let value in americanToBritishTitles) {
                if ((new RegExp("\s?" + americanToBritishTitles[value].replace(/(\.)/, "\\$1") + " ")).test(text.toLowerCase())) {
                    translation = translation.replace((new RegExp(americanToBritishTitles[value], "i")), '<span class="highlight">' + value.charAt(0).toUpperCase() + value.slice(1) + "</span>");
                }
            }
            // time 
            translation = translation.replace(/(\d{1,2})(.)(\d{1,2})/, '<span class="highlight">' + "$1:$3" + "</span>");
        }
        return /<\/span>/.test(translation) ? translation : "Everything looks good to me!";
    }
}

module.exports = Translator;