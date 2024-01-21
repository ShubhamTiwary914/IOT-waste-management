const express = require('express');
const app = express();
const PORT = 3000;


//Routings
const webRouter = require('./webApp/index')
const sensorRouter = require('./sensors/index')
app.use(webRouter);
app.use(sensorRouter);



//Create Server
app.listen(PORT, function (err) {
    if(err) 
        console.log(err);
    console.log("Server listening on PORT", PORT);
});