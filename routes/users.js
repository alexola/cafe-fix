var express = require('express');
var router = express.Router();
var Item = require('../models/item')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//POST TO ITEMS COLLECTION
router.post('/api', function(req, res, next) {
 var category = req.query.category;
 Item.find({category: category}, (err,items) => {
   res.json(items);
 });
});

router.post("/api/newItem", function(req,res,next){
  console.log(req.body)
   Item.create({name: req.body.name, category: req.body['category[]']}, (err, item)=>{
     if (err) {
       console.log(err);
     } else {
       res.json(item);
     }
   });

});




module.exports = router;
