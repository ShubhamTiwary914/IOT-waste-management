const mongoose = require("mongoose");
const monthStats = require('./MonthStat');
const weekStats = require('./WeekStat')


const userSchema =  new mongoose.Schema({
    uname: String,
    email: {
        type: String,
        lowercase: true
    },
    details: {
        location: String,
        created_date: {
            type: Date,
            default: ()=> Date.now()
        },
        stats: {
            ttl_fresh_ratio: Number,
            food_types: [String],
            month_stats: [monthStats.monthStats_schema],
            week_stats: weekStats.weekStats_schema
        }
    },
    devices: [mongoose.SchemaTypes.ObjectId]
});

const UserModel = new mongoose.model('users', userSchema);


module.exports = {
    userSchema,
    UserModel
};

