var express = require('express');
var router = express.Router();
var Item = require('../models/item');

/* GET users listing. */
router.get('/map', function (req,res,next){
    res.render('fix/map');
});
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//GET FROM ITEMS DB
router.get('/api/newItem', function(req, res, next) {
 // var category = req.query.category;
 // var userItem = req.query._id;

 Item.find({}, (err,items) => {
   if (err){
     res.status(500).json(err);
   } else {
      console.log('items: ', items);
      res.status(200).json(items);
   }
  //  console.log(items.length);
 });
});



//POST NEW ITEMS TO DB
router.post("/api/newItem", function(req,res,next){

    let item = req.body;

   Item.create( item, (err, item)=>{
     if (err) {
       res.status(500).json(err);
     } else {
       console.log('Item create: ', item);
       res.status(200).json(item);
     }
   });

});



// DELETE ITEMS FROM DB
router.delete("/api/oldItem/:id", function(req,res,next){

  console.log(req.params.id);

Item.remove( { _id: req.params.id }, function(err, doc){
  if (err) {
    console.log("ERROR!");
    res.status(500).json(err);
  }
  else {
    console.log(doc);
    res.status(200).json(doc);
  }
});

  //   let itemId = req.item._id;
   //
  //  Item.delete( itemId, (err, response)=>{
  //    if (err) {
  //      res.status(500).json(err);
  //    } else {
  //      console.log('response json', response);
  //      res.status(200).json(response);
  //    }
  //  });

});



//api/newItem
router.get('api/newItem/test', function(req, res, next) {
  var category = req.query.category;
  Item.find({category: category}, (err,items) => {
    res.json(items);
  });
});


module.exports = router;
