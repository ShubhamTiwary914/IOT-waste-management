const mongoose = require('mongoose')

const deviceSchema = new mongoose.Schema({
    user_id: mongoose.SchemaTypes.ObjectId,
    set_date: {
        type: Date,
        default: ()=> Date.now()
    },
    itemNames: [String] //item names in containers[by-index]
})


const DeviceModel = new mongoose.model('devices', deviceSchema);
module.exports = {
    deviceSchema,
    DeviceModel
};