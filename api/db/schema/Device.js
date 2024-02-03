const mongoose = require('mongoose')

const deviceSchema = new mongoose.Schema({
    user_id: mongoose.SchemaTypes.ObjectId,
    set_date: {
        type: Date,
        default: ()=> Date.now()
    },

    containers: [
        {
            temp: Number,
            O2: Number,
            Co2: Number,
            duration: Number 
        }
    ]
})


const DeviceModel = new mongoose.model('devices', deviceSchema);
module.exports = {
    deviceSchema,
    DeviceModel
};