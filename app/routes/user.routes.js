module.exports  =  app => {
    const users = require("..//controllers/user.controller.js");
    var router = require("express").Router();

    // Create new item
    router.post("/",users.create);

    // get all users
    router.get("/",users.findAll);

    // get one item
    router.get("/:id",users.findOne);

    // delete one item
    router.delete("/:id",users.delete);

    // delete all users
    router.delete("/",users.deleteAll);

    // update one item
    router.put("/:id",users.update);

    app.use("/api/users",router);
};