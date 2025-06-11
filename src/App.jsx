import React from 'react'
import Footer from "./Components/Footer/Footer"
import { Route,Routes } from 'react-router-dom'


const App = () => {
  return (
    <div>
     <Routes>

<Route path="/" element={<Footer/>}/>
     </Routes>
      

    </div>
  )
}

export default App