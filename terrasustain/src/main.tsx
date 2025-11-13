import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import './index.css';
import Home from './components/unauthenticated/Home';
import LoginPage from './components/auth/Login';
import SignupPage from './components/auth/Register';
import AboutPage from './components/unauthenticated/about';
import './styles/animations.css';
// layouts
import MainLayout from './layouts/MainLayout';

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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
