const mongoose = require('mongoose')

const deviceSchema = new mongoose.Schema({
    user_id: mongoose.SchemaTypes.ObjectId,
    set_date: {
        type: Date,
        default: ()=> Date.now()
    }
})


const DeviceModel = new mongoose.model('devices', deviceSchema);
module.exports = {
    deviceSchema,
    DeviceModel
};