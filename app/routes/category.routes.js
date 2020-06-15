module.exports  =  app => {
    const categories = require("..//controllers/category.controller.js");
    var router = require("express").Router();

    // Create new categories
    router.post("/",categories.create);

    // get all categories
    router.get("/",categories.findAll);

    // get one categories
    router.get("/:id",categories.findOne);

    // delete one categories
    router.delete("/:id",categories.delete);

    // delete all categories
    router.delete("/",categories.deleteAll);

    // update one categories
    router.put("/:id",categories.update);

    app.use("/api/categories",router);
};