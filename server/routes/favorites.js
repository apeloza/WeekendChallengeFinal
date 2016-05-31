var express = require('express');
var router = express.Router();
var Pet = require('../models/pet');
var path = require('path');

router.post('/', function (req, res) {
  var pet = new Pet(req.body);
  pet.save(function (err) {
    if (err) {
      res.sendStatus(500);
      console.log(err);
      return;
    }

    res.sendStatus(201);
  });
});

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/views/favorites.html'));
});

router.get('/db', function(req, res) {
  Pet.find({}, function (err, pets) {
    if (err) {
      res.sendStatus(500);
      console.log(err);
      return;
    }

    res.send(pets);
  });
});

router.delete('/:id', function (req, res) {
  Pet.findByIdAndRemove(req.params.id, function (err) {
    console.log(req.params.id);
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.sendStatus(204);
  });
});
module.exports = router;
