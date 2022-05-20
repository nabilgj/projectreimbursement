import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { EditAccount } from './Components/EditAccount/EditAccount';

import { LoginPage } from './Views/LoginPage/LoginPage';
import { HomePage } from './Views/HomePage/HomePage';
import { ProfilePage } from './Views/ProfilePage/ProfilePage';
import { ViewAccount } from './Views/ViewAccount/ViewAccount';

import { ReimbursementForm } from './Components/ReimbursementForm/ReimbursementForm';
import { PendingReqPage } from './Components/PendingReqPage/PendingReqPage';
import { ResolvedReqPage } from './Components/ResolvedReqPage/ResolvedReqPage';

import { ApproveDeny } from './Views/ApproveDeny/ApproveDeny';
import { ViewAllPending } from './Views/ViewAllPending/ViewAllPending';
import { ViewAllResolved } from './Views/ViewAllResolved/ViewAllResolved';
import { ViewAllEmployyes } from './Views/ViewAllEmployyes/ViewAllEmployyes';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/submitreimbursement" element={<ReimbursementForm />} />
        <Route path="/viewaccount" element={<ViewAccount />} />
        <Route path="/viewaccount/edit/:id" element={<EditAccount />} />
        <Route path="/pendingrequest" element={<PendingReqPage />} />
        <Route path="/resolvedrequest" element={<ResolvedReqPage />} />

        <Route path="/approvedeny" element={<ApproveDeny />} />
        <Route path="/viewpending" element={<ViewAllPending />} />
        <Route path="/allresolved" element={<ViewAllResolved />} />
        <Route path="/allemployees" element={<ViewAllEmployyes />} />

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
