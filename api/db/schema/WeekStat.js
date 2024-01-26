const { default: mongoose } = require("mongoose");
const foodStat = require('./FoodStat')

const weekStats_schema = new mongoose.Schema({
    day: Number,
    food_stats: [foodStat.foodStatsSchema]
})

const WeekModel = new mongoose.model('week', weekStats_schema)
module.exports = {
    weekStats_schema,
    WeekModel
}