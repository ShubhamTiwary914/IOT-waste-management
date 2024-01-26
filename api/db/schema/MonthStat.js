const { default: mongoose } = require("mongoose");
const foodStat = require('./FoodStat')

const monthStats_schema = new mongoose.Schema({
    month: String,
    food_stats: [foodStat.foodStatsSchema]
})

const MonthModel = new mongoose.model('month', monthStats_schema)
module.exports = {
    monthStats_schema,
    MonthModel
}