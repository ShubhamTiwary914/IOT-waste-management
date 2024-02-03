const mongoose = require('mongoose')


const currStatsSchema = new mongoose.Schema({
    device_id: mongoose.SchemaTypes.ObjectId,
    stats: [
        {
            date: {
                type: Date,
                default: ()=> Date.now()
            },
            time: String,
            data: {
                temp: Number,
                containers: [
                    {
                        item: String,
                        o2: Number,
                        co2: Number,
                        weight: Number
                    }
                ]
            }
        }
    ]
})


const currModel = new mongoose.model('currStats', currStatsSchema);
module.exports = {
    currStatsSchema,
    currModel
};