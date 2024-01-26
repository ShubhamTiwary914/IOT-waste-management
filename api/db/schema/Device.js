const mongoose = require('mongoose')

const deviceSchema = new mongoose.Schema({
    user_id: mongoose.SchemaTypes.ObjectId,
    container_no: Number,
    set_date: Number,
    fetched_stats: {
        temp: Number,
        humidity: Number,
        CH4: Number,
        C02: Number,
        duration: Number 
    }
})

const DeviceModel = new mongoose.model('devices', deviceSchema);
module.exports = {
    deviceSchema,
    DeviceModel
};