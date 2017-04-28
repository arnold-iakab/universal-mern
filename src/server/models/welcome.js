import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

let Schema = mongoose.Schema;

let welcomeSchema = new Schema({
    message: {
        type: String,
        unique: true,
        required: true
    }
});

welcomeSchema.plugin(uniqueValidator);

export default mongoose.models.Welcome ?
    mongoose.model('Welcome') :
    mongoose.model('Welcome', welcomeSchema);
