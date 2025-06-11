
import Header from './Components/Header/Header'; // Adjust path to match your Header.jsx location
import Footer from './Components/Footer/Footer';
import SignIn from './Components/SignIn/SignIn';
import { BrowserRouter } from 'react-router-dom';
const App = () => {
  return (
    <BrowserRouter> {/* Wrap in Router for Link functionality */}
        <div>
          <Header />
          <SignIn/>
          <Footer/>
        </div>
    </BrowserRouter>
  );
};

export default App;