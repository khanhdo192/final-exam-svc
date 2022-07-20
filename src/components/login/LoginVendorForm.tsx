import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import useCurrentUser from '../../hooks/useCurrentUser';
import { LoginRequest } from '../../interfaces/auth';
import { IUser } from '../../interfaces/User';
import { loginVendor } from '../../services/auth';
import { useAppDispatch } from '../../store/hooks';
import { loginVendorSuccess } from '../../store/slices/authSlice';
import ButtonDunk from '../checkout/ButtonDunk';

const LoginVendorForm = () => {
  const initialValues: IUser = {
    email: '',
    password: '',
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useCurrentUser();

  const onSubmit = async (values: IUser) => {
    try {
      if (!user) {
        const res = await loginVendor(values as LoginRequest);
        localStorage.setItem('accessTokenVendor', JSON.stringify(res.Data.AccessToken));
        dispatch(loginVendorSuccess(res));
        toast.success('Login success');
        navigate('/vendor', { replace: true });
      } else {
        toast.warn('You need logout current account');
      }
    } catch (error) {
      toast.error('Login failed');
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
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <div className="form-title ">
            <h2>Vendor Login</h2>
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
        </Form>
      </Formik>
    </div>
  );
};

export default LoginVendorForm;
