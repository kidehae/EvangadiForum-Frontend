import { createContext, useEffect, useState }  from 'react'; 
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header'
import About from './Components/About/About'

const App = () => {
  return (
    <> 
      
        <div>
          <Header />
          <About/>
          <Footer/>
        </div>
      
    </>
  );
};

export default App;