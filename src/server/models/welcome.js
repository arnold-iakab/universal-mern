var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var welcomeSchema = new Schema({
    message: {
        type: String,
        unique: true,
        required: true
    }
});

welcomeSchema.plugin(uniqueValidator);

module.exports = mongoose.models.Welcome ?
    mongoose.model('Welcome') :
    mongoose.model('Welcome', welcomeSchema);
