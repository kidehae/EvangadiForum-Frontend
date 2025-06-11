import { createContext, useEffect, useState }  from 'react';
import Header from './Components/Header/Header'; // Adjust path to match your Header.jsx location
import { BrowserRouter as Router } from 'react-router-dom'; // Required for Link in Header
import { AppState } from './App'; // Required for context in Header

export const AppState = createContext();
const App = () => {
  return (
    <Router> {/* Wrap in Router for Link functionality */}
      <AppState.Provider value={{ user: null, setUser: () => {}, handleLogout: () => {} }}>
        <div>
          <Header />
        </div>
      </AppState.Provider>
    </Router>
  );
};

export default App;