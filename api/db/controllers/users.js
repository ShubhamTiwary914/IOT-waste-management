const UserModel = require('./../schema/Users').UserModel;

async function createUser(userReq, responder){
    try{
        const newUser = new UserModel({
            uname: userReq.uname,
            email: userReq.email,
            details: {
                location: userReq.location
            }
        })
        newUser.save().then(()=>{
            responder.json({
                response: "Success"
            })
        });
    }
    catch(err){
        responder.json({ 
            response: "Error: User not created!",
            error_: err
        })
    }
}

async function fetchUser(userEmail, responder){
    try{
        UserModel.find({ email: userEmail }).then(data=> responder.json(data));
    }
    catch(err){
        responder.json({ 
            response: "Error: User data couldnt be fetched!",
            error_: err
        })
    }
}



module.exports = {
    createUser,
    fetchUser
}