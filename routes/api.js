'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {

  const translator = new Translator();


  console.log(translator.translation("I've just got bits and bobs in my bum bag.", "british-to-american"));

  app.route('/api/translate')
    .post((req, res) => {

    });
};
