const { default: mongoose } = require("mongoose");


const weekStats_schema = new mongoose.Schema({
    device_id: mongoose.SchemaTypes.ObjectId,
    weeks: [
        {
            week: String,
            days: [
                {
                    day: Number,
                    data: {
                        temp: Number,
                        containers: [
                            {
                                o2: Number,
                                co2: Number
                            }
                        ]
                    }
                }
            ]
        }
    ]
})


const WeekModel = new mongoose.model('week', weekStats_schema)
module.exports = {
    weekStats_schema,
    WeekModel
}