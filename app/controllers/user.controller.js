const db = require("../models");
const User = db.users;

// Create and Save a new User
exports.create = (req,res) => {
    //validate request
    if(!req.body) {
        res.status(400).send({ message: "Content can not be empty!"});
        return;
    }
    // create a User
    const user =  new User({
        username : req.body.username,
        password : req.body.password
    });
    // save User in the database
    user 
        .save(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message : 
                    err.message || "Something went wrong while create a new User."
            });
        });
};

// Retrieve all User from the database
exports.findAll = (req,res) => {
    const name = req.query.username;
    var condition = name ? {name : {$regex : new RegExp(name), $option: "i"}} : {};
    User.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message : 
                    err.message || "Something went wrong while retrieving users."
            });
        });
};

exports.findByUserName = (username) => {
    return User.find({username: username});
};

// Find a single User with an id
exports.findOne = (req,res) => {
    const id = req.param.id;

    User.findById(id)
        .then(data => {
            if(!data)
                res.status(404).send({message : "Can not find the id : " + id});
            else
                res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message : 
                    err.message || "Error retrieving User with id =" + id 
            });
        });
};

// Update a User by the id in the request
exports.update = (req,res) => {
    if(!req.body){
        return res.status(404).send({
            message : "Body can not be empty!"
        });
    }

    const id = req.param.id;
    User.findByIdAndUpdate(id, req.body,{useFindAndModify:false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                  message: `Cannot update User with id=${id}. Maybe Item was not found!`
                });
            } else res.send({ message: "User was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message : 
                    err.message || "Error updating User with id =" + id 
            });
        });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    User.findByIdAndRemove(id, { useFindAndModify: false })
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
  
  // Delete all Users from the database.
  exports.deleteAll = (req, res) => {
    User.deleteMany({})
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