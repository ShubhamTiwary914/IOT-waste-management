const express = require('express');
const app = express();
const cors = require('cors')


//Middlewares
app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(cors())


//database[mongoose]
const connector = require('./db/controllers/conn')
connector();




//Routings
const webRouter = require('./routes/webApp/index')
const sensorRouter = require('./routes/sensors/index')
//path[GET]: <host>/
app.use(webRouter);     
//path[GET]:  <host>/esp/
app.use(sensorRouter);  




//Create Server
const PORT = 8080;
app.listen(PORT, function (err) {
    if(err) 
        console.log(err);
    else
        console.log("Server listening on PORT: ", PORT);
});