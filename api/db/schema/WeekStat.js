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
                                item: String,
                                o2: Number,
                                co2: Number,
                                weight: Number
                            }
                        ]
                    }
                }
            ]
        }
    ]
})


const WeekModel = new mongoose.model('weekStats', weekStats_schema)
module.exports = {
    weekStats_schema,
    WeekModel
}