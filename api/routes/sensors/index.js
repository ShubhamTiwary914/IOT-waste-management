const express = require('express')
const senserRoute = express.Router();
const updatesHandler = require('./../../db/controllers/esp')




senserRoute.post('/esp/link/', (req, res)=>{
    console.log(`Connection with Device @device:id: ${req.body.deviceID} established!`);
    res.json({
        passed: true
    })
})


senserRoute.post('/esp/post/', (req, res)=>{
    updatesHandler.updateRealTime(req.body, res)
})


module.exports = senserRoute;