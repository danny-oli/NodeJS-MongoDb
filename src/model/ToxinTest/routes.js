const AuthValidation = require("../../middleware/AuthValidation");
const ToxinTestController = require("./ToxinTestController");

module.exports = (app) => {
  app.get("/findToxinTests", AuthValidation, ToxinTestController.list);
  app.post("/createToxinTest", AuthValidation, ToxinTestController.create);
  return app;
};
