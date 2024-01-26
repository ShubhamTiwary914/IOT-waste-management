const { default: mongoose } = require("mongoose");


const foodStats = new mongoose.Schema({
    food_name: String,
    quality_ratio: Number,
    avg_quantity: Number,
    buying_rate: Number
})


const FoodModel = new mongoose.model('food', foodStats)
module.exports = {
    foodStatsSchema: foodStats,
    FoodModel
};