const express = require('express')
const App = express();


App.get('/', (req, res)=>{
    console.log('User connected')
})


App.listen(8080, '0.0.0.0', ()=>{
    console.log("Server Started at port 8080")
})