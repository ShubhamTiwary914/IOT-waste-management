const express = require('express');
const app = express();
const cors = require('cors')


//Middlewares
app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(cors())


//Routings
const webRouter = require('./webApp/index')
const sensorRouter = require('./sensors/index')
//path[GET]: <host>/
app.use(webRouter);     
//path[GET]:  <host>/receiver/
app.use(sensorRouter);  




//Create Server
const PORT = 8080;
app.listen(PORT, function (err) {
    if(err) 
        console.log(err);
    else
        console.log("Server listening on PORT: ", PORT);
});