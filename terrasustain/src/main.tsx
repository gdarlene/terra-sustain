import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import './index.css';
import Home from './components/unauthenticated/Home';
import LoginPage from './components/auth/Login';
import SignupPage from './components/auth/Register';
import './styles/animations.css';
// layouts
import MainLayout from './layouts/MainLayout';
import AboutPage from './components/unauthenticated/about';
import RoleSelector from './components/auth/RoleSelectionModel';
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Layout route */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage/>}/>
        </Route>
        {/* Standalone routes (no header/details) */}
        <Route path='/role' element={<RoleSelector isOpen={true} onClose={() => console.log(" selector closed")}/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
