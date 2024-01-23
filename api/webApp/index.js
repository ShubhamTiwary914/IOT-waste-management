const express = require('express')
const webAppRouter = express.Router();


webAppRouter.get('/', (req, res)=>{
    console.log('User has joined on web-PORT!')
    res.json({
        passed: true
    })
})


module.exports = webAppRouter;