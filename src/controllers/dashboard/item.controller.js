const Item = require("../../model/dashboard/item.model");
const { singleFileUpload } = require("./fileuploadController");
const image = singleFileUpload;

// Retrieve and return all Items from the database.
exports.findAll = (req, res) => {
  Item.find()
    .then((items) => {
      res.send(items);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Something went wrong while getting list of items.",
      });
    });
};
// Create and Save a new Item
exports.create = (req, res) => {
  console.log("the new item", req.body);
  // Validate request
  if (!req.body) {
    return res.status(400).send({ message: "Please fill all required field" });
  }
  // Create a new Item
  const body = JSON.parse(JSON.stringify(req.body));

  const item = new Item({
    category: req.body.category,
    name: req.body.name,
    desc: req.body.desc,
    price: req.body.price,
    image: req.file.filename,
    isAvailable: req.body.isAvailable,
  });
  // Save item in the database
  item
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something went wrong while adding new item.",
      });
    });
};
// Find a single Item with a id
exports.findOne = (req, res) => {
  Item.findById(req.params.id)
    .then((item) => {
      if (!item) {
        return res
          .status(404)
          .send({ message: "Item not found with id " + req.params.id });
      }
      res.send(item);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res
          .status(404)
          .send({ message: "Item not found with id " + req.params.id });
      }
      return res
        .status(500)
        .send({ message: "Error getting item with id " + req.params.id });
    });
};
// Update a Item identified by the id in the request
exports.update = (req, res) => {
  const body = JSON.parse(JSON.stringify(req.body));
  // Validate Request
  if (!req.body) {
    return res.status(400).send({ message: "Please fill all required field" });
  }
  // Find item and update it with the request body
  Item.findByIdAndUpdate(
    req.params.id,
    {
      category: req.body.category,
      name: req.body.name,
      desc: req.body.desc,
      price: req.body.price,
      image: req.file.originalname,
    },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return res
          .status(404)
          .send({ message: "item not found with id " + req.params.id });
      }
      res.send(item);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res
          .status(404)
          .send({ message: "item not found with id " + req.params.id });
      }
      return res
        .status(500)
        .send({ message: "Error updating item with id " + req.params.id });
    });
};
// Delete a Item with the specified id in the request
exports.delete = (req, res) => {
  Item.findByIdAndRemove(req.params.id)
    .then((item) => {
      if (!item) {
        return res
          .status(404)
          .send({ message: "item not found with id " + req.params.id });
      }
      res.send({ message: "item deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res
          .status(404)
          .send({ message: "item not found with id " + req.params.id });
      }
      return res.status(500).send({
        message: "Could not delete item with id " + req.params.id,
      });
    });
};
