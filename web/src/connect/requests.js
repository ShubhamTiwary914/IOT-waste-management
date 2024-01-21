//* Makes HTTP requests[GET/POST] onto the server-side app
//* All request from the client-side[react]  should be redirected onto:   <host>/


import axios from "axios";
const hostPATH = 'http://localhost:8080/'




/* Example of a request made with the following class
    Requests.httpGET({}, (res)=>{
        console.log(res)
    })
*/


export default class Requests{
    static async httpGET(data, callback){
        axios.get(hostPATH, data)
        .then(res =>{
            callback(res.data);
        })
        .catch(err =>{
            callback(err);
        })
    }
}








