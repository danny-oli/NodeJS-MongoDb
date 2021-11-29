const AuthValidation = require("../../middleware/AuthValidation");
const UserController = require("./UserController");

module.exports = (app) => {

  app.get("/getUsers", AuthValidation, UserController.list);
  app.post("/create", UserController.create);
  //   app.get("/find/:id", AuthValidation, controller.findById);
  // app.put('/:id', controller.update);
  //   app.delete("/delete/:id", AuthValidation, controller.deleteOne);

  return app;
};
