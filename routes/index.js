var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/phones',require('./phones'));
router.use('/brands',require('./brands'));
router.use('/users',require('./users'));
router.use('/auth',require('./auth'));
router.use('/orders',require('./orders'));
module.exports = router;
