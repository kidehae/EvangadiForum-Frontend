import React, { createContext, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// import Header from './Components/Header/Header';
// import Footer from './Components/Footer/Footer';
import Register from './Components/Register/Register';


export const AppState = createContext();

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
    // Add any logout logic (e.g., localStorage.clear())
  };

  return (
    <Router>
      <AppState.Provider value={{ user, setUser, handleLogout }}>
        <div>
          {/* <Header /> */}
          <Register />
          {/* <Footer /> */}
        </div>
      </AppState.Provider>
    </Router>
  );
};

export default App;
