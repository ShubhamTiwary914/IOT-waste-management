const mongoose = require("mongoose");


const userSchema =  new mongoose.Schema({
    uname: String,
    email: {
        type: String,
        lowercase: true
    },

    details: {
        location: String,
        created_date: {
            type: Date,
            default: ()=> Date.now()
        },
    },
    devices: [mongoose.SchemaTypes.ObjectId]
});


const UserModel = new mongoose.model('users', userSchema);


module.exports = {
    userSchema,
    UserModel
};

