const express = require('express')
const senserRoute = express.Router();
const updatesHandler = require('./../../db/controllers/esp')




senserRoute.post('/esp/link/', (req, res)=>{
    console.log(`Connection with Device @device:id: ${req.body.device_id} established!`);
    res.json({
        passed: true
    })
})


senserRoute.post('/esp/post/', (req, res)=>{
    try{
        console.log(`Data Received from esp32 for device-id: ${req.body["device_id"]}`);
        //console.log(req.body["data"]);
        updatesHandler.updateRealTime(req.body, res)
    }
    catch(err){
        console.log("Parsing error @/esp/post/")
    }
})


module.exports = senserRoute;