import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { LoginPage } from './Views/LoginPage/LoginPage';
import { HomePage } from './Views/HomePage/HomePage';
import { ReimbursementForm } from './Components/ReimbursementForm/ReimbursementForm';
import { ProfilePage } from './Views/ProfilePage/ProfilePage';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/submitreimbursement" element={<ReimbursementForm />} />

        <Route
          path="/reimbursements/getAllRequestsByEmployee/:id"
          element={<ProfilePage />}
        />

        <Route />
      </Routes>
    </BrowserRouter>
  );
}

// go inside index tsx
export default App;
