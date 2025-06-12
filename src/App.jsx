

import Landing from './Pages/Landing/Landing'
import Router from './Router'
import { createContext, useEffect, useState }  from 'react'; 
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header'
import About from './Components/About/About'
import Register from './Components/Register/Register';


const App = () => {


  return (

    <div>
      <Router/>
    </div>
  )
} 

export default App;
