var express = require('express');

module.exports = function(app) {
  var publicRouter = express.Router(); // eslint-disable-line new-cap

  publicRouter
    .route(['/', '/index'])
    .get((req, res) => {
      res.status(200);
      res.render('index');
    });

  publicRouter
    .route('/gardabateas')
    .get((req, res) => {
      res.status(200);
      res.render('gardabateas');
    });

  app.use('/', publicRouter);
};
