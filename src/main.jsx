import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import React Router components

import SignIn from './Components/SignIn/SignIn.jsx';
import App from './App.jsx';

// Import Bootstrap CSS globally (recommended)
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* All routing logic must be inside BrowserRouter */}
      <Routes> {/* Routes define which component renders for a given path */}
        {/*
          Define a Route for your SignIn component.
          When the URL matches "/login", the SignIn component will be rendered.
        */}
        <Route path="/login" element={<SignIn />} />

        {/*
          You'll also need a route for your main App component, likely at the root path.
          Adjust this based on your application's actual home page/dashboard path.
        */}
        <Route path="/" element={<App />} />

        {/* Add more routes for other pages (e.g., /signup, /dashboard) as needed */}
        {/* <Route path="/signup" element={<SignUpComponent />} /> */}

      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
