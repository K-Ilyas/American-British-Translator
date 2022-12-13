'use strict';

const { translator } = require("../middlewares/translator");
const { requiredFields } = require("../controllers/translator-fields");

module.exports = function (app) {

  app.route('/api/translate')
    .post(requiredFields, (req, res) => {

      translator(req.body.text, req.body.locale, (err, data) => {
        if (err)
          res.status(200).json(err)
        if (data)
          res.status(200).json(data);
      });
    });
};
