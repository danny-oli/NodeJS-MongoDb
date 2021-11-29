const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors()); // header("Access-X")

const router = express.Router();

const userRoutes = require("./model/User/routes")(router);
const authRoutes = require("./model/Auth/routes")(router);
const substanceRoutes = require("./model/Substance/routes")(router);
const toxinTestRoutes = require("./model/ToxinTest/routes")(router);

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/substance", substanceRoutes);
app.use("/api/toxinTest", toxinTestRoutes);


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("#### SERVER ONLINE ####");
});
