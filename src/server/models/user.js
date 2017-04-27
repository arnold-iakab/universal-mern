// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var validators = require('mongoose-validators');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
var userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: [validators.isAlphanumeric(), validators.isLength(2, 60)]
    },
    password: {
        type: String,
        required: true
    }
    ,
    admin: {
        type: Boolean,
        required: true,
        default: false
    }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.models.User ?
    mongoose.model('User') :
    mongoose.model('User', userSchema);
    