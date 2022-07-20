import { Link } from 'react-router-dom';
import Logo from '../../assets/svg/Logo';
import Grid from '../common/Grid';

const footerAboutLinks = [
  {
    display: 'About',
    path: '/about',
  },
  {
    display: 'Contact',
    path: '/about',
  },
  {
    display: 'Hiring',
    path: '/about',
  },
  {
    display: 'News',
    path: '/about',
  },
  {
    display: 'Stores',
    path: '/about',
  },
];

const footerCustomerLinks = [
  {
    display: 'Policy',
    path: '/about',
  },
  {
    display: 'Warranty',
    path: '/about',
  },
  {
    display: 'Refund',
    path: '/about',
  },
];

const footerSupportedLinks = [
  {
    display: 'Hotline',
    path: '/about',
  },
  {
    display: 'Ordering',
    path: '/about',
  },
  {
    display: 'Feedback',
    path: '/about',
  },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <Grid col={4} mdCol={2} smCol={1} gap={10}>
          <div>
            <div className="footer__title">Hotline</div>
            <div className="footer__content">
              {footerSupportedLinks.map((item, index) => (
                <p key={index}>
                  <Link to={item.path}>{item.display}</Link>
                </p>
              ))}
            </div>
          </div>
          <div>
            <div className="footer__title">About us</div>
            <div className="footer__content">
              {footerAboutLinks.map((item, index) => (
                <p key={`ab-link-${index}`}>
                  <Link to={item.path}>{item.display}</Link>
                </p>
              ))}
            </div>
          </div>
          <div>
            <div className="footer__title">Policy</div>
            <div className="footer__content">
              {footerCustomerLinks.map((item, index) => (
                <p key={`ct-link${index}`}>
                  <Link to={item.path}>{item.display}</Link>
                </p>
              ))}
            </div>
          </div>
          <div className="footer__about">
            <p>
              <Link to="/">
                <Logo />
              </Link>
            </p>
            <p>
              In 2022, Shopdunk becomes an authorized Apple reseller. We develop the chain standard
              store and Apple Mono Store to provide the best product experience and Apple services
              for Vietnamese users.
            </p>
          </div>
        </Grid>
      </div>
    </footer>
  );
};

export default Footer;
