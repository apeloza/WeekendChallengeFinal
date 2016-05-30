var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PetSchema = new Schema({
  id: { type: String, required: true },
  image: { type: String },
  name: {type: String, required: true},
  description: {type: String}
});
PetSchema.pre('save', function (next) {
  var truncated = this.description.substring(0,300);
  truncated+= ' ...';
  this.description = truncated;
  next();
});

var Pet = mongoose.model('Pet', PetSchema);

module.exports = Pet;
