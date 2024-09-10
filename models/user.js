const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    active: {
        type: Boolean,
        default: false
    },
    profilePicture: {
        type: String,
        default: ''
    },
    cartId:{
        type: String
    },
    favId: {
        type: String
    }
})

UserSchema.methods.toJSON = function(){
    const {password, __v, ...user} = this.toObject()
    return user
}


const UserModel = model('users', UserSchema)
module.exports = UserModel