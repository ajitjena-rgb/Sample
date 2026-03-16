import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AccountCreated from '../AccountCreated.jsx';
import AddFunds from './pages/AddFunds.jsx';
import PaymentSource from './pages/PaymentSource.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AccountCreated />} />
      <Route path="/add-funds" element={<AddFunds />} />
      <Route path="/payment-source" element={<PaymentSource />} />
    </Routes>
  </BrowserRouter>
);
