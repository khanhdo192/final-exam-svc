import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Logo from '../../assets/svg/Logo';
import { CartResponse } from '../../interfaces/auth';
import { getCart } from '../../services/cart';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logoutSuccess } from '../../store/slices/authSlice';
import { clearCart, setCart } from '../../store/slices/cartItemsSlice';
import { clearProfile } from '../../store/slices/profileSlice';
import useOnClickOutside from '../../hooks/useOnClickOutside';

const mainNav = [
  {
    display: 'Home',
    path: '/',
  },
  {
    display: 'Catalog',
    path: '/catalog',
  },
];

const Header = () => {
  const location = useLocation();
  const activeNav = mainNav.findIndex(e => e.path === location.pathname);
  const isLogged = useAppSelector(state => state.auth.login?.isLogged);
  const isVendor = useAppSelector(state => state.auth.login?.isVendor);
  const dispatch = useAppDispatch();
  const [totalProducts, setTotalProducts] = useState<number | null>(null);
  const currentCart = useAppSelector(state => state.cartItems.currentCart) as any;

  useEffect(() => {
    setTotalProducts(currentCart?.length);
  }, [currentCart]);

  const menuRef = useRef<HTMLInputElement>(null);

  const clickOutsidehandler = () => {
    menuRef.current?.classList.remove('active');
  };
  useOnClickOutside(menuRef, clickOutsidehandler);

  const handleLogout = () => {
    dispatch(logoutSuccess());
    dispatch(clearProfile());
    dispatch(clearCart());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('accessTokenVendor');
    toast.info('You are now logged out');
  };

  return (
    <header>
      <div className="header">
        <div className="container">
          <div className="header__logo">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div className="header__menu">
            <div
              className="header__menu__mobile-toggle"
              onClick={() => {
                menuRef.current?.classList.toggle('active');
              }}
            >
              <i className="bx bx-menu-alt-left" />
            </div>
            <div className="header__menu__left" ref={menuRef}>
              <div
                className="header__menu__left__close"
                onClick={() => {
                  menuRef.current?.classList.toggle('active');
                }}
              >
                <i className="bx bx-x" />
              </div>
              {mainNav.map((item, index) => (
                <div
                  key={`header-item-${index}`}
                  className={`header__menu__item header__menu__left__item ${
                    index === activeNav ? 'active' : ''
                  }`}
                >
                  <Link to={item.path}>
                    <span>{item.display}</span>
                  </Link>
                </div>
              ))}
              {isVendor ? (
                <div className="header__menu__item header__menu__left__item">
                  <Link to="/vendor">
                    <span>Vendor</span>
                  </Link>
                </div>
              ) : (
                <div className="header__menu__item header__menu__left__item">
                  <Link to="/login-vendor">
                    <span>Vendor Signs</span>
                  </Link>
                </div>
              )}
              {/* {isLogged ? (
                <div className="header__menu__item header__menu__left__item">
                  <Link to="/vendor"><span>Vendor</span></Link>
                </div>
              ) : (
                <div className="header__menu__item header__menu__left__item">
                  <Link to="/login-vendor">
                    <span>Vendor Signs</span>
                  </Link>
                </div>
              )} */}
            </div>
            <div className="header__menu__right">
              <div className="header__menu__item header__menu__right__item">
                <Link to="/cart">
                  <div className="position-relative">
                    <i className="bx bx-shopping-bag" />
                    {totalProducts !== 0 && (
                      <div className="total-cart-item position-absolute">{totalProducts}</div>
                    )}
                  </div>
                </Link>
              </div>
              <div className="header__menu__item header__menu__right__item">
                {isLogged ? (
                  <div className="dropdown">
                    <div className="profile bx bxs-user-detail">
                      <div className="dropdown-content ">
                        <ul>
                          <li>
                            <Link to="/profile">
                              <div className="d-flex">
                                <i className="bx bx-user" />
                                <span>Profile</span>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/login"
                              onClick={handleLogout}
                              state={{ from: location }}
                              replace
                            >
                              <div className="d-flex">
                                <i className="bx bx-log-in-circle" />
                                <span> Logout</span>
                              </div>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link to="/login">
                    <i className="bx bx-user" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
