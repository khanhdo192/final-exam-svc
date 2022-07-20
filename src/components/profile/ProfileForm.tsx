import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { ProfileRequest } from '../../interfaces/auth';
import { postUser, updateImage } from '../../services/user';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateProfile, upImage } from '../../store/slices/profileSlice';
import { phoneRegExp } from '../../utils/regex';
import ButtonDunk from '../checkout/ButtonDunk';
import Avatar from './Avatar';

export interface IProfile {
  Id?: number;
  Name: string;
  Email: string;
  Phone: string;
  Address: string;
  AvatarImage?: string;
  Permission?: string;
}

const ProfileForm: React.FunctionComponent = () => {
  const currentUser = useAppSelector(state => state.profile.currentUser) as any;
  const [values, setValues] = useState<IProfile>(currentUser);
  const initialValues: IProfile = {
    ...values,
  };
  const dispatch = useAppDispatch();

  const handleChange = (e: { target: HTMLInputElement }) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleChangeAvatar = async (value: string) => {
    setValues({ ...values, AvatarImage: value });
    try {
      const res = await updateImage(value as string);
      dispatch(upImage(res.Data));
      toast.success('Avatar change success');
    } catch (error) {
      toast.error('Avatar change failed');
    }
  };

  // const validationSchema = yup.object().shape({
  //   Name: yup.string().required('Username is required'),
  //   Email: yup.string().required('Email is required').email('Invalid email format'),
  //   Phone: yup
  //     .string()
  //     .required('Phone is required')
  //     .matches(phoneRegExp, 'Phone number is not valid'),
  //   Address: yup.string().required('Address is required').nullable(),
  // });

  const handleSubmit = async () => {
    try {
      const res = await postUser(values as ProfileRequest);
      if (res.StatusCode === 200) {
        dispatch(updateProfile(values));
      }
      toast.success('Update profile success');
    } catch (error) {
      toast.error('Update profile failed');
    }
  };

  return (
    <div className="profile-container">
      <div className="checkout__form">
        <Formik
          initialValues={initialValues}
          // validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <h2 className="checkout__title">Profile Information</h2>
            <div className="form-checkout">
              <Avatar
                value={!values.AvatarImage ? '' : values.AvatarImage}
                onClick={handleChangeAvatar}
              />
            </div>
            <div className="form-checkout">
              <label>Name</label>
              <Field
                name="Name"
                type="text"
                className="dunk-input"
                value={!values.Name ? '' : values.Name}
                onChange={handleChange}
              />
              <ErrorMessage name="Name" component="div" className="text-danger" />
            </div>
            <div className="form-checkout">
              <label>Email</label>
              <Field
                name="Email"
                type="text"
                className="dunk-input"
                value={!values.Email ? '' : values.Email}
                onChange={handleChange}
              />
              <ErrorMessage name="Email" component="div" className="text-danger" />
            </div>
            <div className="form-checkout">
              <label>Phone number</label>
              <Field
                name="Phone"
                type="text"
                className="dunk-input"
                value={!values.Phone ? '' : values.Phone}
                onChange={handleChange}
              />
              <ErrorMessage name="Phone" component="div" className="text-danger" />
            </div>
            <div className="form-checkout">
              <label>Address</label>
              <Field
                name="Address"
                type="text"
                className="dunk-input"
                value={!values.Address ? '' : values.Address}
                onChange={handleChange}
              />
              <ErrorMessage name="Address" component="div" className="text-danger" />
            </div>
            <ButtonDunk type="submit" text="Edit" />
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ProfileForm;
