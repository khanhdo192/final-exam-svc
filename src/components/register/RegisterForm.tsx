import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { RegisterRequest } from '../../interfaces/auth';
import { IUser } from '../../interfaces/User';
import { register } from '../../services/auth';
import { useAppDispatch } from '../../store/hooks';
import { registerSuccess } from '../../store/slices/authSlice';
import { phoneRegExp } from '../../utils/regex';
const RegisterForm: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initialValues: IUser = {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters'),
    email: Yup.string().required('Email is required').email('Invalid email format'),
    phone: Yup.string().required('Phone is required').matches(phoneRegExp, 'Invalid phone format'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
    acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),
  });

  const onSubmit = async (values: IUser, submittingObject: any) => {
    submittingObject.resetForm();
    try {
      await register(values as RegisterRequest);
      dispatch(registerSuccess());
      toast.success('Register success');
      navigate('/login');
    } catch (error) {
      toast.error('Email already exists ');
    }
  };
  return (
    <div className="register-form">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ resetForm }) => (
          <Form>
            <div>
              <h2>Sign up</h2>
            </div>
            <div className="form-group-register">
              <Field name="name" type="text" className="dunk-input" placeholder="Username" />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>
            <div className="form-group-register">
              <Field name="email" type="email" className="dunk-input" placeholder="Email" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>
            <div className="form-group-register">
              <Field name="phone" type="text" className="dunk-input" placeholder="Phone" />
              <ErrorMessage name="phone" component="div" className="text-danger" />
            </div>
            <div className="form-group-register">
              <Field
                name="password"
                type="password"
                className="dunk-input"
                placeholder="Password"
              />
              <ErrorMessage name="password" component="div" className="text-danger" />
            </div>
            <div className="form-group-register">
              <Field
                name="confirmPassword"
                type="password"
                className="dunk-input"
                placeholder="Confirm password"
              />
              <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
            </div>
            <div className="form-group-register form-check">
              <Field name="acceptTerms" type="checkbox" className="form-check-input" />
              <label htmlFor="acceptTerms" className="form-check-label">
                I have read and agree to the Terms
              </label>
              <ErrorMessage name="acceptTerms" component="div" className="text-danger" />
            </div>
            <div className="register-btn">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
              <button
                type="button"
                onClick={() => {
                  resetForm();
                }}
                className="btn btn-warning float-right"
              >
                Reset
              </button>
            </div>
            <div className="link-login">
              <p>
                Already have an account?{' '}
                <Link to="/login" className="login">
                  Login now
                </Link>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default RegisterForm;
