import React from 'react';
import { Outlet } from 'react-router-dom';
import Container from '../common/Container';

const VendorLayout = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default VendorLayout;
