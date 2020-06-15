const db = require("../models");
const Category = db.category;

// Create and Save a new Category
exports.create = (req,res) => {
    //validate request
    if(!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!"});
        return;
    }
    // create a Item
    const category =  new Category({
        categoryID : req.body.categoryID,
        name : req.body.name
     });
    // save Category in the database
    category 
        .save(category)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message : 
                    err.message || "Something went wrong while create a new category."
            });
        });
};

// Retrieve all Category from the database
exports.findAll = (req,res) => {
    const name = req.query.name;
    var condition = name ? {name : {$regex : new RegExp(name), $option: "i"}} : {};
    Category.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message : 
                    err.message || "Something went wrong while retrieving Categories."
            });
        });
};

// Find a single Category with an id
exports.findOne = (req,res) => {
    const id = req.param.id;

    Category.findById(id)
        .then(data => {
            if(!data)
                res.status(404).send({message : "Can not find the id : " + id});
            else
                res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message : 
                    err.message || "Error retrieving Category with id =" + id 
            });
        });
};

// Update a Category by the id in the request
exports.update = (req,res) => {
    if(!req.body){
        return res.status(404).send({
            message : "Body can not be empty!"
        });
    }

    const id = req.param.id;
    Category.findByIdAndUpdate(id, req.body,{useFindAndModify:false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                  message: `Cannot update Item with id=${id}. Maybe Category was not found!`
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

// Delete a Category with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Category.findByIdAndRemove(id, { useFindAndModify: false })
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
  
  // Delete all Categories from the database.
  exports.deleteAll = (req, res) => {
    Category.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Categories were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Categories."
        });
      });
  };
