const UserModel = require('./../schema/Users').UserModel;
const DeviceModel = require('./../schema/Device').DeviceModel;
const currStatsModel = require('./../schema/CurrStats').currModel;
const hourStatsModel = require('./../schema/HourStats').hourStatsModel;


//add device id to user's devices id array
async function registerDevice(reqBody, responder){
    try{
        const newDevice = new DeviceModel({
            user_id: reqBody.user_id
        })
        newDevice.save().then(()=>{
            UserModel.findOneAndUpdate(
                { _id: reqBody.user_id }, 
                { $push: {devices: newDevice._id} }
            ).then(data=>{
                responder.json({
                    response: "Success",
                    id: newDevice._id
                })
            });
            
        });
    }
    catch(err){
        responder.json({ 
            response: "Error: Device not linked!",
            error_: err
        })
    }
}

//*Set Item names in devices'
async function setItemNames(reqBody, responder){
    try{
        DeviceModel.findOneAndUpdate(
            { _id: reqBody.device_id },
            {  itemNames: reqBody.itemNames }
        ).then(data=>{
            responder.json({
                response: "Success",
                data: reqBody.itemNames
            })
        });
    }
    catch(err){
        responder.json({ 
            response: "Error: Item names not set properly!",
            error_: err
        })
    }
}


async function getItemNames(reqBody, responder){
    try{
        DeviceModel.find({ _id: reqBody.device_id }).then(res=>{
            if(res.length > 0){
                responder.json(res[0].itemNames);
            }else
                responder.json({
                    response: "No such device exists! try again!"
                })
        })
    }
    catch(err){
        responder.json({ 
            response: "Error: Item names not set properly!",
            error_: err
        })
    }
}




//*Fetch Data from stats/real time
//real time data
async function fetchDevice_curr(reqBody, responder){ 
    currStatsModel.find({ device_id: reqBody.device_id })
        .then(res =>{
            responder.json(res);
        })
}

async function fetchDevice_hourly(reqBody, responder){
    hourStatsModel.find({ device_id: reqBody.device_id }).then(res=>{
        responder.json(res)
    })
}



module.exports = {
    registerDevice,
    setItemNames,
    getItemNames,
    fetchDevice_curr,
    fetchDevice_hourly
}