// Router.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Answer from './Pages/Answer/Answer'; // Adjust path if needed

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/answer" />} />
      <Route path="/answer" element={<Answer />} />
    </Routes>
  );
};

export default AppRoutes;
