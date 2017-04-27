var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var welcomeSchema = new Schema({
    message: {
        type: String,
        required: true
    }
});

module.exports = mongoose.models.Welcome ?
    mongoose.model('Welcome') :
    mongoose.model('Welcome', welcomeSchema);