var express = require('express');
var router = express.Router();
const Item = require('../models/item');

/* GET users listing. */
router.get('/map', function (req,res,next){
    res.render('fix/map');
});
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/api', function(req, res, next) {
  var category = req.query.category;
  Item.find({category: category}, (err,items) => {
    res.json(items);
  });
});

module.exports = router;
