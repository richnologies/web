module.exports = function(app) {
  app.use((req, res, next) => {
    res.render('404', {});
    next();
  });
};
