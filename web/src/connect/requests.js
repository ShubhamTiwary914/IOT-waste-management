//* Makes HTTP requests[GET/POST] onto the server-side app
//* All request from the client-side[react]  should be redirected onto:   <host>/


import axios from "axios";
const hostPATH = 'http://localhost:8080'






/*
    createUser's method data format:  {
        uname: "Tester",
        email: "tester@gmail.com",
        details: {
            location: "23'342543N 28'456738S"
        }
    }

    fetchUser's method data format: {
        email: "tester@gmail.com"
    }

    linkDevice's method data format: {
        email: "tester@gmail.com"
    }

    fetchDevices' method data format: {
        email: "tester@gmail.com"
    }
*/ 




export default class Requests{
    static async httpPOST(uriPATH, data, callback){
        axios.post(`${hostPATH}${uriPATH}`, data)
        .then(res =>{
            callback(res);
        })
        .catch(err =>{
            callback(err);
        })
    }



    static async createUser(data, callback){
        Requests.httpPOST('/users/create/', data, callback);
    }


    static async fetchUser(data, callback){
        Requests.httpPOST('/users/', data, callback);
    }

    static async linkDevice(data, callback){
        Requests.httpPOST('/device/create/', data, callback);
    }

    static async fetchDevice(data, callback){
        Requests.httpPOST('/device/', data, callback);
    }
}








