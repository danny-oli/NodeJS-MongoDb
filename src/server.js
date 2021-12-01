const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// header("Access-X")
app.use(cors()); 

// Loading Api routes
require('./routes/routes')(app) 

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('Server running', { port: PORT, mode: process.env.NODE_ENV });
});
