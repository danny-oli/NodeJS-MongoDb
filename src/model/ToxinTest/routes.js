const AuthValidation = require("../../middleware/AuthValidation");
const ToxinTestController = require("./ToxinTestController");

module.exports = (app) => {

  app.get('/', AuthValidation, ToxinTestController.list);
  app.post('/createTT', AuthValidation, ToxinTestController.create);
  // app.get('/find/:id', SubstanceController.findOne);
  // route.put('/:id', controller.update);
  // route.delete('/:id', controller.deleteOne);
  //   app.get("/find/:id", AuthValidation, controller.findById);
  // app.put('/:id', controller.update);
  //   app.delete("/delete/:id", AuthValidation, controller.deleteOne);

  return app;
};
