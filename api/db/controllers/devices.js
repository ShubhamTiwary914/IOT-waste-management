const UserModel = require('./../schema/Users').UserModel;
const DeviceModel = require('./../schema/Device').DeviceModel;


async function registerDevice(reqBody, responder){
    try{
        const newDevice = new DeviceModel({
            user_id: reqBody.user_id,
            container_no: reqBody.container_no
        })
        newDevice.save().then(()=>{
            UserModel.findOneAndUpdate(
                { _id: reqBody.user_id }, 
                { $push: {devices: newDevice._id} }
            ).then(data=>{
                responder.json({
                    response: "Success",
                    iD: newDevice._id
                })
            });
            
        });
    }
    catch(err){
        responder.json({ 
            response: "Error: Device not created!",
            error_: err
        })
    }
}


async function fetchDevice(deviceID, responder){
    try{
        DeviceModel.find({ _id: deviceID }).then(data=> responder.json(data));
    }
    catch(err){
        responder.json({ 
            response: "Error: Device data couldnt be fetched!",
            error_: err
        })
    }
}

module.exports = {
    registerDevice,
    fetchDevice
}