import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { CartResponse, LoginRequest, ProfileResponse } from '../../interfaces/auth';
import { IUser } from '../../interfaces/User';
import { login } from '../../services/auth';
import { getCart } from '../../services/cart';
import { getUser } from '../../services/user';
import { useAppDispatch } from '../../store/hooks';
import { loginSuccess } from '../../store/slices/authSlice';
import { setCart } from '../../store/slices/cartItemsSlice';
import { getProfile } from '../../store/slices/profileSlice';
import ButtonDunk from '../checkout/ButtonDunk';

const LoginForm: React.FunctionComponent = () => {
  const initialValues: IUser = {
    email: '',
    password: '',
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = (location?.state as any) || {};
  const pathname = from?.pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = async (values: IUser) => {
    try {
      const res = await login(values as LoginRequest);
      localStorage.setItem('accessToken', res.Data.AccessToken);
      dispatch(loginSuccess(res.Data));
      toast.success('Login success');
      const resProfile: ProfileResponse = await getUser();
      dispatch(getProfile(resProfile.Data));
      navigate(pathname || '/', { replace: true });
      const resCart: CartResponse = await getCart();
      dispatch(setCart(resCart.Data));
    } catch (error) {
      throw error;
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Invalid email format'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
  });

  return (
    <div className="login-form">
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="form-title ">
            <h2>Login</h2>
          </div>
          <div className="form-group">
            <label htmlFor="email"> Email </label>
            <Field name="email" type="email" className="dunk-input" />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </div>
          <div className="form-group">
            <label htmlFor="password"> Password </label>
            <Field name="password" type="password" className="dunk-input" />
            <ErrorMessage name="password" component="div" className="text-danger" />
          </div>
          <div className="forget-link">
            <Link to="/forgotpassword">Forgot Password?</Link>
          </div>
          <div className="form-group-submit">
            <ButtonDunk type="submit" text="Login" />
          </div>
          <div className="register-link">
            You don't have account? <Link to="/register">Register</Link>
          </div>
          <div className="register-link">
            Login as <Link to="/login-vendor">Vendor</Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
export default LoginForm;
