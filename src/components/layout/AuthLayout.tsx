import { Outlet } from 'react-router-dom';
import Footer from '../footer/Footer';
import HeaderAuth from '../header/HeaderAuth';

const AuthLayout = () => {
  return (
    <>
      <HeaderAuth />
      <Outlet />
      <Footer />
    </>
  );
};

export default AuthLayout;
