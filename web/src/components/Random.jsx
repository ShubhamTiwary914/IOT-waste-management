import React from 'react'
import { useEffect } from 'react'
import Requests from './../connect/requests'



function Random() {

  useEffect(()=>{
    //login user
    Requests.fetchUser({ email: "tester@gmail.com" }, (res)=>{
      //console.log(res);
    })

    //fetch device data once
    Requests.fetchDevice_realTime((res)=>{
      console.log(res);
    })

    //get device item names
    /*
    Requests.getItems((res)=>{
      console.log(res);
    })
    */

    //change device item names in containers
    /*
    Requests.setItems({
      itemNames: [
          "Apple",
          "Banana",
          "Potato"
      ]
    }, (res)=>{
      console.log(res);
    })
    */

  }, [])
  

  return (
    <div>

    </div>
  )
}

export default Random