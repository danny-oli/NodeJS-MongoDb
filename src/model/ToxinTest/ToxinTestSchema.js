const mongoose = require("../../config/database");
const Schema = mongoose.Schema;

const ToxinTestSchema = new Schema(
  {
    codigo_amostra: { type: String, required: true, unique: true },
    Cocaina: { type: Number },
    Anfetamina: { type: Number },
    Metanfetamina: { type: Number },
    MDA: { type: Number },
    MDMA: { type: Number },
    THC: { type: Number },
    Morfina: { type: Number },
    Codeina: { type: Number },
    Heroina: { type: Number },
    result: { type: Boolean, default: false },
    message: {type: String}
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

module.exports = mongoose.model("ToxinTest", ToxinTestSchema);
