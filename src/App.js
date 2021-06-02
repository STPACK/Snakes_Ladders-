import React, { useState } from 'react'
import CreateGrid from './component/setup/CreateGrid'
import './App.css'

const App = () => {
  const [col, setCol] = useState(1)
  const [row, setRow] = useState(1)
  return (
    <div className="app__container">
      
      <CreateGrid col={4} row={5}/>
      
    </div>
  )
}

export default App
