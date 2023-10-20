const db = require("../models");
const Patient = db.patient;

// Create and Save a new Patient
exports.create = (req, res) => {
  //console.log(req)
  // Validate request
  if (!req.body.firstName) {
    console.log("req.body ::");
    console.log(req.body);
    
    res.status(400).send({ message: "Content can not be empty!!!!!" });
    return;
  }

  // Create a Patient
  const patient = new Patient({
    
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dateOfBirth: req.body.dateOfBirth,
    address: req.body.address,
    department: req.body.department,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    doctor: req.body.doctor,
    published: req.body.published
  });

  // Save Patient in the database
  patient
    .save(patient)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "!! Error !! while creating and saving the Patient details."
      });
    });
};

// Retrieve all Patient from the database.
exports.findAll = (req, res) => {
  const firstName = req.query.firstName;
  var condition = firstName ? { firstName: { $regex: new RegExp(firstName), $options: "i" } } : {};
  //var condition = name;

  Patient.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "!! Error !! Couldn't retrieve patient details."
      });
    });
};

// Find a single Patient with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Patient.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "System couldn't find Patient with PatientID " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "!! Error !!, While retrieving Patient with id=" + id });
    });
};

// Update a Patient by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Patient.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Patinet with id=${id}. Maybe Patient was not found!`
        });
      } else res.send({ message: "Patient was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Patient with id=" + id
      });
    });
};

// Delete a Patient with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  console.log("PatientId is deleted : ");
  console.log(id);

  Patient.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete patient with id=${id}. Maybe Patient was not found!`
        });
      } else {
        res.send({
          message: "Patient with selected ID, was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Patient with PatientID=" + id
      });
    });
};

// Delete all PATIENTS from the database.
exports.deleteAll = (req, res) => {
  Patient.deleteMany({})
    .then(data => {
      res.send({
        message: `Total ${data.deletedCount} Patients details were Found, and All of those Patients details from the database are deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "!! Error !!, Coundn't delete all Patients details from the datab."
      });
    });
};

// Find all published PATIENTS
exports.findAllPublished = (req, res) => {
  Patient.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving PATIENTS."
      });
    });
};

