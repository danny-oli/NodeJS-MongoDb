const AuthController = require("./AuthController");

module.exports = (app) => {
  app.post("/login", AuthController.login);
  return app;
};
