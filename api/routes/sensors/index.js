const express = require('express')
const senserRoute = express.Router();




senserRoute.post('/esp/', (req, res)=>{
    console.log(req.body)
    res.json({
        passed: true
    })
})


module.exports = senserRoute;