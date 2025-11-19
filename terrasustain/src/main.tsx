import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import './index.css';
import Home from './components/unauthenticated/Home';
import LoginPage from './components/auth/Login';
import SignupPage from './components/auth/Register';
import Profile from './components/authenticated-citizen/profile';
import './styles/animations.css';
// layouts
import MainLayout from './layouts/MainLayout';
import AboutPage from './components/unauthenticated/about';
import RoleSelector from './components/auth/RoleSelectionModel';
import CitizenLayout from './components/authenticated-citizen/CitizenLayout';
import CitizenDashboard from './components/authenticated-citizen/dashboard';
import AddIssue from './components/authenticated-citizen/AddIssue';
import CommunityPage from './components/authenticated-citizen/Community';
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Layout route */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage/>}/>
        </Route>
        <Route element={<CitizenLayout/>}>
          <Route path='/citizen' element ={<CitizenDashboard/>}/>
          <Route path='/citizen/profile' element ={<Profile/>}/>
          <Route path= '/citizen/add_issue' element ={<AddIssue/>}/>
          <Route path= '/citizen/community' element ={<CommunityPage/>}/>
        </Route>
        {/* Standalone routes (no header/details) */}
        <Route path='/role' element={<RoleSelector isOpen={true} onClose={() => console.log(" selector closed")}/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
