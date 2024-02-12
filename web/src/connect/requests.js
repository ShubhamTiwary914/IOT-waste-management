//* Makes HTTP requests[GET/POST] onto the server-side app
//* All request from the client-side[react]  should be redirected onto:   <host>/


import axios from "axios";
const hostPATH = 'http://localhost:8080'


/*
    *createUser's method data format:  {
        uname: "Tester",
        email: "tester@gmail.com",
        details: {
            location: "23'342543N 28'456738S"
        }
    }
    *fetchUser's method data format: {
        email: "tester@gmail.com"
    }



    *linkDevice's method data format: {
        user_id: "x057647856786"
    }

    *getItems's method data format: NULL



    *setItems's method data format: {
        itemNames: [
            "Banana",
            "Apple",
            "Potato"
        ]
    }
\

    !NOTE:  fetcing devices need no parameters -> as devices' data are already stored when user logins
    i.e: 
    *fetchDevices' real time method data format:  NULL
    *fetchDevices' hourly  method data format:  NULL
*/ 


export default class Requests{
    static httpPOST(uriPATH, data, callback){
        axios.post(`${hostPATH}${uriPATH}`, data)
        .then(res =>{
            callback(res);
        })
        .catch(err =>{
            callback(err);
        })
    }

    //*User Controls -> Register and Login
    static async createUser(data, callback){
        Requests.httpPOST('/users/create/', data, callback);
    }

    static async fetchUser(data, callback){
        Requests.httpPOST('/users/check/', data, (res)=>{
            sessionStorage.setItem('device_id', res.data[0].devices);
            callback(res.data[0]);
        });
    }


    //*Controlling Items in Containers
    static async getItems(callback){
        const data = {
            device_id: sessionStorage.getItem("device_id")
        }
        Requests.httpPOST('/device/getitems/', data, (res)=>{
            callback(res.data);
        });
    }

    static async setItems(data, callback){
        data["device_id"] = sessionStorage.getItem("device_id");
        Requests.httpPOST('/device/setitems/', data, (res)=>{
            callback(res.data.data);
        });
    }



    //*Creating & Fetching devices data
    static async linkDevice(data, callback){
        Requests.httpPOST('/device/create/', data, callback);
    }

    static async fetchDevice_realTime(callback){
        const device_id = sessionStorage.getItem('device_id');
        Requests.httpPOST('/device/fetch/curr/', {
            device_id: device_id
        }, res=>{
            callback(res.data[0].stats)
        });
    }

    static async fetchDevice_hourly(callback){
        const device_id = sessionStorage.getItem('device_id');
        Requests.httpPOST('/device/fetch/hour/', {
            device_id: device_id
        }, res=>{
            callback(res.data[0].stats)
        });
    }


}








