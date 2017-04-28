// get an instance of mongoose and mongoose.Schema
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import validators from 'mongoose-validators';

let Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
let userSchema = new Schema({
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

export default mongoose.models.User ?
    mongoose.model('User') :
    mongoose.model('User', userSchema);
