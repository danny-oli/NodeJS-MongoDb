const mongoose = require("../../config/database");
const Schema = mongoose.Schema;

const ReportSchema = new Schema(
  {
    result: { type: Boolean, default: true },
    sampleCode: { type: String },
    checkedSubstances: [
      {
        substance: { type: String },
        quantity: { type: Number, required: true },
      },
    ],
    approvedSubstances: [
      {
        substance: { type: String },
        quantity: { type: Number, required: true },
      },
    ],
    reprovedSubstances: [
      {
        substance: { type: String },
        quantity: { type: Number, required: true },
      },
    ],
    message: { type: String },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

module.exports = mongoose.model("Report", ReportSchema);
