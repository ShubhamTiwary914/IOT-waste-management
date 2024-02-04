import React from 'react'
import { useEffect } from 'react'
import Requests from './../connect/requests'



function Random() {

  useEffect(()=>{
    Requests.fetchUser({ email: "tester@gmail.com" }, (res)=>{
      //console.log(res);
    })

    Requests.fetchDevice_realTime((res)=>{
      console.log(res);
    })
  }, [])
  

  return (
    <div>

    </div>
  )
}

export default Random