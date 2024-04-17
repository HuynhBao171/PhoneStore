var express = require('express');
var router = express.Router();
var brandModel = require('../schemas/brand')

router.get('/', async function (req, res, next) {
  var brands = await brandModel.find({})
  .populate('published').exec();
  res.status(200).send(brands);
});

router.get('/:id', async function (req, res, next) {
  try {
    var brand = await brandModel.findById(req.params.id).exec();
    res.status(200).send(brand);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post('/', async function (req, res, next) {
  try {
    let newbrand = new brandModel({
      name: req.body.name,
    });
    await newbrand.save();
    res.status(200).send(newbrand);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.put('/:id', async function (req, res, next) {
  try {
    var brand = await brandModel.findByIdAndUpdate(req.params.id, req.body,
      {
        new: true
      }).exec();
    res.status(200).send(brand);
  } catch (error) {
    res.status(404).send(error);
  }
});

// router.delete('/:id', async function (req, res, next) {
//   try {
//     var brand = await brandModel.findByIdAndUpdate(req.params.id, {
//       isDeleted: true
//     },
//       {
//         new: true
//       }).exec();
//     res.status(200).send(brand);
//   } catch (error) {
//     res.status(404).send(error);
//   }
// });
module.exports = router;
