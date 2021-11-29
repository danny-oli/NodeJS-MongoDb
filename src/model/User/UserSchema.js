const mongoose = require("../../config/database");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  }, {
    timestamps: { createdAt: true, updatedAt: true }
  })



module.exports = mongoose.model("User", UserSchema);
