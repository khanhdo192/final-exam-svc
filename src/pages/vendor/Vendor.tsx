import React from 'react';
import { Outlet } from 'react-router-dom';
import VendorComponent from '../../components/vendor/VendorComponent';

const Vendor = () => {
  return (
    <div>
      <VendorComponent />
      <Outlet />
    </div>
  );
};

export default Vendor;
