const AuthValidation = require("../../middleware/AuthValidation");
const SubstanceController = require("./SubstanceController");

module.exports = (app) => {

  app.get('/', AuthValidation, SubstanceController.list);
  app.post('/createSubstancec', AuthValidation, SubstanceController.create)
  app.get('/find/:id', SubstanceController.findById);
  // route.put('/:id', controller.update);
  // route.delete('/:id', controller.deleteOne);
  //   app.get("/find/:id", AuthValidation, controller.findById);
  // app.put('/:id', controller.update);
  //   app.delete("/delete/:id", AuthValidation, controller.deleteOne);

  return app;
};
