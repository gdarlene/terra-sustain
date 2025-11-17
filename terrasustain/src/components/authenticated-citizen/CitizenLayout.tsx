import React from 'react';
import { Outlet } from 'react-router-dom';
const CitizenLayout: React.FC = () => {
  return (
    <>
      <main>
        <Outlet /> 
      </main>
    </>
  );
};
export default CitizenLayout;