const AuthValidation = require("../../middleware/AuthValidation");
const SubstanceController = require("./SubstanceController");

module.exports = (app) => {
  app.get('/findSubstances', AuthValidation, SubstanceController.list);
  app.post('/createSubstance', AuthValidation, SubstanceController.create)
  app.get('/findSubstance/:id', AuthValidation, SubstanceController.findById);
  return app;
};
