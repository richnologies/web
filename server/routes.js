const express = require('express');

module.exports = function publicRouter(app) {
  // eslint-disable-next-line new-cap
  const publicRouter = express.Router();

  publicRouter.route(['/', '/index']).get((req, res) => {
    res.status(200).render('index');
  });

  publicRouter.route('/gardabateas').get((req, res) => {
    res.status(200).render('gardabateas');
  });

  app.use('/', publicRouter);
};
