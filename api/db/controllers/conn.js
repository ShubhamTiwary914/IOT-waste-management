const mongoose = require('mongoose');
const hostName = 'mongodb://127.0.0.1';
const dbName = 'hackiot-uu';



async function connectDatabase(){
    try{
        await mongoose.connect(`${hostName}/${dbName}`).then(()=>{
            console.log(`Connected to database ${dbName} @host:${hostName}`);
        });
    }
    catch(err){
        console.log(`Failed connecteing to database ${dbName} @host:${hostName}`);
        console.log($`Error Status: ${err}`);
    }
}

module.exports = connectDatabase;
