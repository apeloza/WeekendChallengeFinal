var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var favorites = require('./routes/favorites');
var mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './public')));

app.use('/favorites', favorites);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './public/views/index.html'));
});

var databaseURI = 'mongodb://localhost:27017/mu';

mongoose.connect(databaseURI);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connection open ', databaseURI);
});

mongoose.connection.on('error', function (err) {
  console.log('Mongoose error connecting ', err);
});

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});
