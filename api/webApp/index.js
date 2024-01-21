const express = require('express')
const webAppRouter = express.Router();


webAppRouter.get('/', (req, res)=>{
    console.log('User has joined!')
    res.json({
        passed: true
    })
})


module.exports = webAppRouter;