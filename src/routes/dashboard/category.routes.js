const express = require('express');
const router = express.Router();
const Category = require('../../model/dashboard/Category');

// Fetch all categories
router.get('/categories', (req, res) => {
  Category.find({}, 'name', function (error, categories) {
    if (error) {
      console.error(error);
    }
    return res.send({
      categories: categories,
    });
  }).sort({ _id: -1 });
});

// Add new category
router.post('/categories', (req, res) => {
  var db = req.db;
  var name = req.body.name;
  var new_category = new Category({
    name: name,
  });

  new_category.save(function (error) {
    if (error) {
      console.log(error);
    }
    return res.send({
      success: true,
      message: 'Category saved successfully!',
    });
  });
});

// Fetch single category
router.get('/category/:id', (req, res) => {
  var db = req.db;
  Category.findById(req.params.id, 'name', function (error, category) {
    if (error) {
      console.error(error);
    }
    return res.send(category);
  });
});

// Update a category
router.put('/categories/:id', (req, res) => {
  var db = req.db;
  Category.findById(req.params.id, 'name', function (error, category) {
    if (error) {
      console.error(error);
    }

    category.name = req.body.name;
    category.save(function (error) {
      if (error) {
        console.log(error);
      }
      res.status(201).send({
        success: true,
        massage: 'Category updated successfully!',
      });
    });
  });
});

// router.put('/categories/:id', (req, res, next) => {
//   var db = req.db;
//   const category = new Category({
//     _id: req.params.id,
//     name: req.body.name,
//   });
//   Category.updateOne({ _id: req.params.id }, 'name').then(() => {
//     category.name = req.body.name;
//     category
//       .save(function (error) {
//         if (error) {
//           console.log(error);
//         }
//         res.status(201).send({
//           success: true,
//           massage: 'Category updated successfully!',
//         });
//       })
//       .catch((error) => {
//         res.status(400).json({
//           error: error,
//         });
//       });
//   });
// });

// Delete a category
// router.delete('/categories/:id', (req, res, next) => {
//   var db = req.db;
//   Category.remove(
//     {
//       _id: req.params.id,
//     },
//     function (err, category) {
//       if (err) res.send(err);
//       return res.status(200).send({
//         success: true,
//         message: 'Category removed successfully!',
//       });
//     }
//   );
// });

router.delete('/categories/:id', (req, res, next) => {
  var db = req.db;
  Category.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).send({
        success: true,
        message: 'Category removed successfully!',
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

module.exports = router;
