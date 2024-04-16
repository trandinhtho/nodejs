const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
var configs = require('../config/config')
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String ,
        required: true},
    phone: Number ,
       
    email: { type: String ,
        required: true},
    address: String, 
    password: { type: String ,
        required: true}
});
userSchema.pre('save', function () {
    this.password = bcrypt.hashSync(this.password, 10);
})
userSchema.methods.getJWT = function () {
    var token = jwt.sign({ id: this._id, name: this.name }, configs.SECRET_KEY, {
        expiresIn: configs.EXP_JWT
    });
    return token;
}



const User = mongoose.model('User', userSchema);

module.exports = User;
