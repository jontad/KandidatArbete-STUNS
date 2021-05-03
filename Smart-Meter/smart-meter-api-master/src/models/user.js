require('dotenv').config();
const mongoose = require('mongoose');
const salt = process.env.SALT;

const userSchema = new mongoose.Schema({
    MeterID: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, salt);

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
}

const User = mongoose.model('User', userSchema);
module.exports = User;