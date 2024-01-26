const mongoose = require('mongoose');
const User = require('./../db/schema/Users').UserModel
const Week = require('./../db/schema/WeekStat').WeekModel
const FoodStat = require('./../db/schema/FoodStat').FoodModel


function test(){

    const foodstat1 = new FoodStat({
        food_name: "Banana",
        quality_ratio: 93
    })

    const foodstat2 = new FoodStat({
        food_name: "Banana",
        quality_ratio: 93
    })

    const currWeek = new Week({
        day: 3,
        food_stats: [foodstat1, foodstat2]
    })


    const user = new User({
        uname: "Tester",
        details: {
            stats: {
                week_stats: currWeek
            }
        }
    })
    //console.log(user);
    //console.log(currWeek);

    //user.save();
}

module.exports = test;