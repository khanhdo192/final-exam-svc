import React from 'react';
import { Outlet } from 'react-router-dom';
import Container from '../common/Container';
import Header from '../header/Header';

const VendorLayout = () => {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default VendorLayout;
