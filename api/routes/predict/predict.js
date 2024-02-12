const express  = require('express')
const predictRouter = express.Router();
const axios = require('axios')

const predictPATH = 'http://127.0.0.1:8023/temp/'


predictRouter.post('/temp/', (req,res)=>{
    axios.post(predictPATH, req.body).then(result=>{
        res.json(result.data)
    })
})



module.exports = predictRouter