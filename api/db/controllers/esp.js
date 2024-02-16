const currStatsModel = require('./../schema/CurrStats').currModel;
const hourStatsModel = require('./../schema/HourStats').hourStatsModel;
const itemControls = require('./itemControls')



function getCurrentTimeString(){
    const dateObj = new Date();
    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes();
    let seconds = dateObj.getSeconds();

    let timestamp = hours + ":" + minutes + ":" + seconds;
    return timestamp;
}


const parseGases = (reqBody) =>{
    for(let i=0; i<reqBody["data"]["containers"].length; i++){
        let co2 = reqBody["data"]["containers"][i]["co2"]; 
        reqBody["data"]["containers"][i]["o2"] = co2*(3/8); 
    }
    return reqBody
}



async function updateRealTime(reqBody, responder){
    try{
        //create if doesnt exist -> then push data onto stats
        currStatsModel.find({ device_id: reqBody.device_id }).then(data=>{
            //create device if not exists
            if(data.length <= 0){
                new currStatsModel({
                    device_id: reqBody.device_id
                }).save()
            }

            //update device by pushing new data onto db
            const currentTime = getCurrentTimeString()
            currStatsModel.findOneAndUpdate(
                { device_id: reqBody.device_id }, 
                { 
                    $push: {
                        stats: {
                            time: currentTime,
                            data: reqBody.data
                        }
                    } 
                }
            ).then(res => {
                responder.json({ updated: true })
                console.log("Successfully updated data received from sensors!");
                updateHourlyData(reqBody.device_id, reqBody.data, currentTime)
            })
            .catch(err =>{
                responder.json({ updated: true })
                console.log("Unsuccessful updating data received from sensors!");
            })
        })
    }catch(err){
        console.log(`Error occured receiving data from Sensors: ${err}`);
    }
} 




async function updateHourlyData(device_id, data, currTime){
    const hour =  parseInt(currTime.split(":")[0])
    const currentDate = new Date()

    try{
        //check if device_id exists -> else not: make 
        hourStatsModel.find({ device_id: device_id }).then(data=>{
            //create device if not exists[hour stats]
            if(data.length <= 0){
                new hourStatsModel({
                    device_id: device_id
                }).save()
            }       
        })

        //check if the hour is updated in db under the device' hour stats
        hourStatsModel.find({
            device_id: device_id,
            "stats.date": {
                $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0),
                $lt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 0, 0, 0)
            },
            "stats.hour": hour
        }).then(hourData=>{

            //itemControls.updateItemQueues_hourly(device_id);
            
            //if empty for the current hour -> then update
            
            if(hourData.length <= 0){
                hourStatsModel.findOneAndUpdate(
                    { device_id: device_id }, 
                    { 
                        $push: {
                            stats: {
                                hour: hour,
                                data: data
                            }
                        } 
                    }
                ).then(res => {
                    console.log("Successfully updated Hourly data!");
                    itemControls.updateItemQueues_hourly(device_id, currTime);
                })
                .catch(err =>{
                    console.log("Unable to update hourly data!");
                })
            }
        })
    }
    catch(err){
        console.log(`Unable to update hourly data!  ${err}`);
    }
}



module.exports = {
    updateRealTime,
    parseGases
}