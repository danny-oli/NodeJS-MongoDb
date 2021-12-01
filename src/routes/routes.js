const express = require("express");

module.exports = (app) => {    
    const router = express.Router()

    const userRoutes = require("../model/User/routes")(router);
    const authRoutes = require("../model/Auth/routes")(router);
    const substanceRoutes = require("../model/Substance/routes")(router);
    const toxinTestRoutes = require("../model/ToxinTest/routes")(router);

    app.use("/api/user", userRoutes);
    app.use("/api/auth", authRoutes);
    app.use("/api/substance", substanceRoutes);
    app.use("/api/toxinTest", toxinTestRoutes);
    
    return app;
};






