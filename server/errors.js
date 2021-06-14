module.exports = function errorHandler(app) {
  app.use((_, res, next) => {
    res.render('404', {});
    next();
  });
};
