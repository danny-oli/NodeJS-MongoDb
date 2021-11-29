const mongoose = require("../../config/database");
const Schema = mongoose.Schema;

const SubstanceSchema = new Schema({

  name: { type: String, required: true, unique: true },
  limit: { type: Number, required: true },
  enhancerOtherSubstances: {
    confirmation: { type: Boolean, required: true, default: false },
    otherSubstances: [{
      name: { type: String },
      limit: { type: Number }
    }]
  }
}, {
  timestamps: { createdAt: true, updatedAt: true }
})

module.exports = mongoose.model("Substance", SubstanceSchema);
