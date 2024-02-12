const mongoose  = require('mongoose')


const hourStatsSchema = new mongoose.Schema({
    device_id: mongoose.SchemaTypes.ObjectId,
    stats: [
        {
            date: {
                type: Date,
                default: ()=> Date.now()
            },
            hour: Number,  //0-24 
            data: {
                temp: Number,
                containers: [
                    {
                        o2: Number,
                        co2: Number,
                        weight: Number
                    }
                ]
            }
        }
    ]
})

const hourStatsModel = new mongoose.model('hourStats', hourStatsSchema)
module.exports = {
    hourStatsSchema,
    hourStatsModel
}

