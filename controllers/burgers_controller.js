const express = require('express'); 
const burger = require('../models/burger.js'); 
const router = express.Router(); 

// Create the `router` for the app, and export the `router` at the end of your file.
router.get('/', function(req, res) {
  burger.selectAll(function(data) {
    let hbsObj = {
      burgers: data
    };
    // console.log(hbsObj); 
    res.render('index', hbsObj); 
  });
});

router.post('/api/burgers', function(req, res) {
  burger.insertOne([
    'burger_name', 'devoured'
  ], [
    req.body.burger_name, req.body.devoured
  ], function(result) {
    res.json({id: result.insertId }); 
  });
});

router.put('/api/burgers/:id', function(req, res) {
  let condition = `id = ${req.params.id}`; 
  let objColVals = {devoured: req.body.devoured}; 
  // console.log(`objColVals: ${objColVals}`); 
  // console.log(`condition: ${condition}`); 
  
  burger.updateOne(objColVals, condition, function(result) {
    if (result.changedRows === 0) {
      return res.status(404).end(); 
    } else {
      res.status(200).end(); 
    }
  }); 
});

router.delete("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;