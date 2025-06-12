import { createContext, useEffect, useState }  from 'react'; 
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header'

import About from './Components/About/About'
import Register from './Components/Register/Register';
import QuestionPage from './Pages/Question/QuestionPage';

const App = () => {


  return (
    <> 
      
        <div>
          <Header />
          <About/>
          <Register/>
          <QuestionPage/>
          <Footer/>
        </div>
      
    </>
  );
};

export default App;
