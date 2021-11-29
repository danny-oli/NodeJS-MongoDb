const AuthValidation = require("../../middleware/AuthValidation");
const UserController = require("./UserController");

module.exports = (app) => {
  app.get("/findUsers", AuthValidation, UserController.list);
  app.post("/createUser", UserController.create);
  app.get("/findUser/:id", AuthValidation, UserController.findById);
  app.put("/updateUser/:id", AuthValidation, UserController.update);
  app.delete("/deleteUser/:id", AuthValidation, UserController.deleteOne);
  return app;
};
