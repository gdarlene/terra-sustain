import React from 'react';
import Header from '../components/unauthenticated/Header';
import Details from '../components/unauthenticated/Details';
import { Outlet } from 'react-router-dom';
import Footer from '../components/unauthenticated/Footer';

const MainLayout: React.FC = () => {
  return (
    <>
      <Details />
      <Header />
      <main>
        <Outlet /> 
      </main>
      <Footer/>
    </>
  );
};

export default MainLayout;
