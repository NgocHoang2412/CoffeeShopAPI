module.exports  =  app => {
    const items = require("..//controllers/item.controller.js");
    var router = require("express").Router();

    // Create new item
    router.post("/",items.create);

    // get all items
    router.get("/",items.findAll);

    // get one item
    router.get("/:id",items.findOne);

    // delete one item
    router.delete("/:id",items.delete);

    // delete all items
    router.delete("/",items.deleteAll);

    // update one item
    router.put("/:id",items.update);

    app.use("/api/items",router);
};