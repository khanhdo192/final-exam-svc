import React from 'react';
import Navbar from 'react-bootstrap/esm/Navbar';
import Container from 'react-bootstrap/esm/Container';
import Logo from '../../assets/svg/Logo';
import { Link } from 'react-router-dom';

const HeaderAuth = () => {
  return (
    <Navbar className="nav-header-auth">
      <Container>
        <Navbar.Brand className="brand-logo">
          <Link to="/">
            <Logo />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="link-help">
            <Link to="/">You need support?</Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderAuth;
