import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { LoginPage } from './Views/LoginPage/LoginPage';
import { ReimbursementPage } from './Views/ReimbursementPage/ReimbursementPage';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reimburse" element={<ReimbursementPage />} />
      </Routes>
    </BrowserRouter>
  );
}

// go inside index tsx
export default App;
