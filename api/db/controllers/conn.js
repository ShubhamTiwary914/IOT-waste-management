const mongoose = require('mongoose');

const dbName = 'hackiot-uu'
const hostName = 'mongodb.net'
const dbPATH = `mongodb+srv://shubhamtiwary914:c7g3JBFZK8YCqzZS@${dbName}.9ukkwqf.${hostName}/`;



async function connectDatabase(){
    try{
        await mongoose.connect(dbPATH).then(()=>{
            console.log(`Connected to database ${dbName} @host:${hostName}`);
        });
    }
    catch(err){
        console.log(`Failed connecteing to database ${dbName} @host:${hostName}`);
        console.log($`Error Status: ${err}`);
    }
}

module.exports = connectDatabase;
