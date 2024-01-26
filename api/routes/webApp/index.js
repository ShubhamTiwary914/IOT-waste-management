const express = require('express')
const webAppRouter = express.Router();
const userCollection = require('./../../db/controllers/users')  
const deviceCollection = require('./../../db/controllers/devices')


//*USER ROUTE ---
//fetch user data
webAppRouter.post('/users/', (req, res)=>{
    userCollection.fetchUser(req.body.email, res);
})


//[create|update] user data
webAppRouter.post('/users/create/', (req, res)=>{
    userCollection.createUser(req.body, res);
})




//*DEVICES ROUTE ---
//fetch raw device data by id
webAppRouter.post('/device/', (req, res)=>{
    deviceCollection.fetchDevice(req.body.deviceID, res);
})

//register device under user
webAppRouter.post('/device/create/', (req, res)=>{
    deviceCollection.registerDevice(req.body, res);
})




module.exports = webAppRouter;