module.exports  =  app => {
    const auth = require("..//controllers/auth.controller.js");
    var router = require("express").Router();

    // Create new token
    router.post("/",[
    auth.isPasswordAndUserMatch,
    auth.login
    ]);

    // welcome
    router.get("/",auth.welcome);

    app.use("/api/auth",router);
};