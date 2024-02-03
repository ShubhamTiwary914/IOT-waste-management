const deviceCollection = require('./../schema/Device').DeviceModel;
const currStatsModel = require('./../schema/CurrStats').currModel;
const weekStatsModel = require('./../schema/WeekStat').WeekModel;


function getCurrentTimeString(){
    const dateObj = new Date();
    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes();
    let seconds = dateObj.getSeconds();

    let timestamp = hours + ":" + minutes + ":" + seconds;
    return timestamp;
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
            ).then(res => responder.json({ updated: true }))
            .catch(err =>{
                responder.json({ updated: false })
                console.log(`Error occured updating current stats: ${err}`);
            })
        })
    }catch(err){
        console.log(`Error occured receiving data from Sensors: ${err}`);
    }
} 





module.exports = {
    updateRealTime
}