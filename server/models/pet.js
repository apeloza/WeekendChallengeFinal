var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PetSchema = new Schema({
  id: { type: String, required: true },
  image: { type: String },
  name: {type: String, required: true},
  description: {type: String},
  animal: {type: String, required: true}
});
PetSchema.pre('save', function (next) {
  if (this.description) {
  var truncated = this.description.substring(0,100);
  truncated+= ' ...';
  this.description = truncated;
} else {
  this.description = "NO DESCRIPTION PROVIDED";
}
  next();
});

var Pet = mongoose.model('Pet', PetSchema);

module.exports = Pet;
