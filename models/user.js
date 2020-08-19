const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true,
        minlength:5,
        match: [/^[A-Za-z0-9]+$/, 'Username is not valid'],
    },
    password: {
        type: String,
        required: true,
        minlength:5,
        match: [/^[A-Za-z0-9]+$/, 'Password is not valid'],
    }

})

module.exports = mongoose.model('User', UserSchema)




