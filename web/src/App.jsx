import { useEffect } from 'react'
import Requests from './connect/requests'


function App() {
  //test request made to backend
  useEffect(()=>{
    Requests.httpGET({}, (res)=>{
      console.log(res)
    })
  }, [])
  



  return (
    <div>
        Test App
    </div>
  )
}

export default App
