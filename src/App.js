import React,{useState} from 'react'
import Home from './component/Home/Home'
import Play from './component/Play/Play'

const App = () => {

  const [letPlay, setLetPlay] = useState(false)
  
  return (
    <>
    { 
      letPlay
      ? <Play goHome={()=>setLetPlay(false)}/> 
      : <Home letPlay={()=>setLetPlay(true)}/>
     }
      
      
      
    </>
  )
}

export default App
