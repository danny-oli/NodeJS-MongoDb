const mongoose = require("mongoose");
const keys = require("./keys");

mongoose.set("useFindAndModify", false);

// useNewParser: true for compatibility with other mongo versions
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


module.exports = mongoose;
