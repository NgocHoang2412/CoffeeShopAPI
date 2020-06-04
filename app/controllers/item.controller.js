const db = require("../models");
const Item = db.items;

// Create and Save a new Item
exports.create = (req,res) => {
    //validate request
    if(!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!"});
        return;
    }
    // create a Item
    const item =  new Item({
        name : req.body.name,
        imageURL : req.body.imageURL,
        defaultPrice : req.body.defaultPrice,
        unit : req.body.unit,
        size : req.body.size,
        description : req.body.description
    });
    // save Item in the database
    item 
        .save(item)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message : 
                    err.message || "Something went wrong while create a new Item."
            });
        });
};

// Retrieve all Item from the database
exports.findAll = (req,res) => {
    const name = req.query.name;
    var condition = name ? {name : {$regex : new RegExp(name), $option: "i"}} : {};
    Item.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message : 
                    err.message || "Something went wrong while retrieving items."
            });
        });
};

// Find a single Item with an id
exports.findOne = (req,res) => {
    const id = req.param.id;

    Item.findById(id)
        .then(data => {
            if(!data)
                res.status(404).send({message : "Can not find the id : " + id});
            else
                res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message : 
                    err.message || "Error retrieving Item with id =" + id 
            });
        });
};

// Update a Item by the id in the request
exports.update = (req,res) => {
    if(!req.body){
        return res.status(404).send({
            message : "Body can not be empty!"
        });
    }

    const id = req.param.id;
    Item.findByIdAndUpdate(id, req.body,{useFindAndModify:false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                  message: `Cannot update Item with id=${id}. Maybe Item was not found!`
                });
            } else res.send({ message: "Item was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message : 
                    err.message || "Error updating Item with id =" + id 
            });
        });
};

// Delete a Item with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Item.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Item with id=${id}. Maybe Item was not found!`
          });
        } else {
          res.send({
            message: "Item was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Item with id=" + id
        });
      });
  };
  
  // Delete all Items from the database.
  exports.deleteAll = (req, res) => {
    Item.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Items were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Items."
        });
      });
  };