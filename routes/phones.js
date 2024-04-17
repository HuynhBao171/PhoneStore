var express = require('express');
var router = express.Router();
var phoneModel = require('../schemas/phone')
require('express-async-errors')


router.get('/', async function (req, res, next) {
  let limit = req.query.limit ? req.query.limit : 5;
  let page = req.query.page ? req.query.page : 1;
  var queries = {};
  var exclude = ["sort", "page", "limit"];
  var stringFilter = ["name", "brand"];
  var numberFilter = ["year"];
  //{ page: '1', limit: '5', name: 'Hac,Ly', brand: 'Cao' }
  for (const [key, value] of Object.entries(req.query)) {
    if (!exclude.includes(key)) {
      if (stringFilter.includes(key)) {
        queries[key] = new RegExp(value.replace(',', '|'), 'i');
      } else {
        if (numberFilter.includes(key)) {
          let string = JSON.stringify(value);
          let index = string.search(new RegExp('lte|gte|lt|gt', 'i'));
          if (index < 0) {
            queries[key] = value;
          } else {
            queries[key] = JSON.parse(string.slice(0, index) + "$" 
            + string.slice(2, string.length));
          }
        }
      }
    }
  }
  console.log(queries);
  queries.isDeleted = false;
  phones = await phoneModel.find(queries)
    .populate({ path: 'brand', select: "_id name" }).lean()
    .skip((page - 1) * limit).limit(limit).exec();
  res.status(200).send(phones);
});

router.get('/:id', async function (req, res, next) {
  var phone = await phoneModel.findById(req.params.id).exec();
  res.status(200).send(phone);
});

router.post('/', async function (req, res, next) {
  try {
    let newphone = new phoneModel({
      name: req.body.name,
      year: req.body.year,
      brand: req.body.brand
    });
    await newphone.save();
    res.status(200).send(newphone);
  } catch (error) {
    res.status(404).send(error);
  }
});
router.put('/:id', async function (req, res, next) {
  try {
    var phone = await phoneModel.findByIdAndUpdate(req.params.id, req.body,
      {
        new: true
      }).exec();
    res.status(200).send(phone);
  } catch (error) {
    res.status(404).send(error);
  }
});
router.delete('/:id', async function (req, res, next) {
  try {
    var phone = await phoneModel.findByIdAndUpdate(req.params.id, {
      isDeleted: true
    },
      {
        new: true
      }).exec();
    res.status(200).send(phone);
  } catch (error) {
    res.status(404).send(error);
  }
});
module.exports = router;
