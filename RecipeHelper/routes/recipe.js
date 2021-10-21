var express = require('express');
var router = express.Router();
var Recipe = require('../models/Recipe.js');

/* GET ALL RECIPES */
router.get('/', function (req, res, next) {
  Recipe.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE RECIPE BY ID */
router.get('/:id', function (req, res, next) {
  Recipe.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE RECIPE */
router.post('/', function (req, res, next) {
  Recipe.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE RECIPE */
router.put('/:id', function(req, res, next){
  console.log(req.params.id);
  Recipe.findByIdAndUpdate(req.params.id, req.body, function (err, post){
    if (err) return next(err);
    res.json(post);
    })
  })

/* DELETE RECIPE */
router.delete('/:id',function(req,res,next){
  Recipe.findByIdAndDelete(req.params.id,function(err, post){
    if(err) return next(err);
    res.json(post);
  })
})

module.exports = router;