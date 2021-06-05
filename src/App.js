import React,{useState} from 'react'
import Home from './component/Home/Home'
import Play from './component/Play/Play'

const App = () => {

  const [letPlay, setLetPlay] = useState(true)
  
  return (
    <>
    { 
      letPlay
      ? <Play/> 
      : <Home letPlay={()=>setLetPlay(true)}/>
     }
      
      
      
    </>
  )
}

export default App
