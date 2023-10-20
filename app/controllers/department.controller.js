const db = require("../models");
const Department = db.department;

// Create and Save a new DEPARTMENT
exports.create = (req, res) => {

  //console.log(req)
  // Validate request
  if (!req.body.nameOfdepartment) {
    console.log("req.body ::");
    console.log(req.body);
    
    res.status(400).send({ message: "Content can not be empty!!!!!" });
    return;
  }

  // Create a department
  const department = new Department({
    nameOfdepartment: req.body.nameOfdepartment,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email

  });

  // Save department in the database
  department
    .save(department)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Doctor."
      });
    });
};

// Retrieve all departments from the database.
exports.findAll = (req, res) => {
  const nameOfdepartmentname = req.query.nameOfdepartmentname;
  var condition = nameOfdepartmentname ? { nameOfdepartmetnname: { $regex: new RegExp(nameOfdepartmentname), $options: "i" } } : {};
  //var condition = name;

  Department.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Departments."
      });
    });
};

// Find a single department with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Department.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Department with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Department with id=" + id });
    });
};

// Update a department by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to be updated can not be empty!"
    });
  }

  const id = req.params.id;

  Department.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Department with id=${id}. Maybe Department was not found!`
        });
      } else res.send({ message: "Department was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Department with id=" + id
      });
    });
};

// Delete department with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Department.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Department with id=${id}. Maybe Department was not found!`
        });
      } else {
        res.send({
          message: "Department was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Department with id=" + id
      });
    });
};


