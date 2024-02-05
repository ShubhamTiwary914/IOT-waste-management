const express = require('express')
const webAppRouter = express.Router();
const userCollection = require('./../../db/controllers/users')  
const deviceCollection = require('./../../db/controllers/devices')


//*USER ROUTE ---
//fetch user data
webAppRouter.post('/users/check/', (req, res)=>{
    userCollection.fetchUser(req.body.email, res);
})


//[create|update] user data
webAppRouter.post('/users/create/', (req, res)=>{
    userCollection.createUser(req.body, res);
})





//*DEVICES ROUTE ---
//register device under user
webAppRouter.post('/device/link/', (req, res)=>{
    deviceCollection.registerDevice(req.body, res);
})

webAppRouter.post('/device/setitems/', (req, res)=>{
    deviceCollection.setItemNames(req.body, res);
})

webAppRouter.post('/device/getitems/', (req, res)=>{
    deviceCollection.getItemNames(req.body, res);
})





//fetch device data and return to user
webAppRouter.post('/device/fetch/curr/', (req, res)=>{
    deviceCollection.fetchDevice_curr(req.body, res)
})

webAppRouter.post('/device/fetch/week/', (req, res)=>{
    deviceCollection.fetchDevice_week(req.body, res)
})

webAppRouter.post('/device/fetch/month/', (req, res)=>{
    deviceCollection.fetchDevice_month(req.body, res)
})




module.exports = webAppRouter;