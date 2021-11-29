const mongoose = require("../config/database");
const Schema = mongoose.Schema;

const Sms = new Schema({
  idCreator: { type: Number, required: false },
  idJob: { type: Number, required: false },
  idEmployee: { type: Number, required: false },
  subject: { type: String, required: false },
  status: { type: String, required: true },
  uri: { type: String, required: false },
  id: { type: Number, required: false },
  to: { type: String, required: true },
  from: { type: String, required: true },
  type: { type: String, default: "SMS" },
  creationTime: { type: String, required: true },
  attachments: { type: Array, required: false },
  direction: { type: String, required: false },
  body: { type: String, required: true },
  language: { type: String, required: false },
  errorMessage: { type: String, required: false },
});



module.exports = mongoose.model("Sms", Sms);
