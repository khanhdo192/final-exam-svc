import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { CheckoutRequest } from '../../interfaces/auth';
import { checkout } from '../../services/order';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearCart } from '../../store/slices/cartItemsSlice';
import { checkoutSuccess } from '../../store/slices/checkoutSlice';
import { phoneRegExp } from '../../utils/regex';
import ButtonDunk from './ButtonDunk';

interface IUserCheckout {
  Name: string;
  Address: string;
  Phone: string;
  Email: string;
}

const CheckoutForm: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentOrder = useAppSelector(state => state.cartItems.orderItem);
  const currentUser = useAppSelector(state => state.profile.currentUser) as any;

  const initialValues: IUserCheckout = {
    ...currentUser,
  };
  const [values, setValues] = useState<IUserCheckout>(initialValues);

  const handleChange = (e: { target: HTMLInputElement }) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // const validationSchema = Yup.object({
  //   Name: Yup.string().required('Fullname is required').max(40),
  //   Address: Yup.string().required('Address is required'),
  //   Phone: Yup.string()
  //     .required('Phone number is required')
  //     .matches(phoneRegExp, 'Phone number is not valid'),
  //   Email: Yup.string().required('Email is required').email('Invalid email format'),
  // });

  const handleOrder = async () => {
    try {
      if (currentOrder && currentOrder.length > 0) {
        const checkoutValues = {
          billingAddress: { ...values },
          items: [...currentOrder],
        };
        const res = await checkout(checkoutValues as CheckoutRequest);
        dispatch(checkoutSuccess(res));
        dispatch(clearCart());
        navigate(`/cart/${res.Data}`);
      } else {
        toast.info('Your cart is empty');
      }
    } catch (error) {
      toast.error('Place order failed');
    }
  };

  return (
    <div className="checkout__form">
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={handleOrder}
      >
        <Form>
          <h2 className="checkout__title">Billing details</h2>
          <div className="form-checkout">
            <label htmlFor="Name">Fullname</label>
            <Field
              name="Name"
              type="text"
              className="dunk-input"
              placeholder="Enter your fullname"
              value={values.Name}
              onChange={handleChange}
            />
            <ErrorMessage name="Name" component="div" className="text-danger" />
          </div>
          <div className="form-checkout">
            <label htmlFor="Address">Address</label>
            <Field
              name="Address"
              type="text"
              className="dunk-input"
              placeholder="Enter your address"
              value={values.Address}
              onChange={handleChange}
            />
            <ErrorMessage name="Address" component="div" className="text-danger" />
          </div>
          <div className="form-checkout">
            <label htmlFor="Phone">Phone number</label>
            <Field
              name="Phone"
              type="text"
              className="dunk-input"
              placeholder="Enter your phone number"
              value={values.Phone}
              onChange={handleChange}
            />
            <ErrorMessage name="Phone" component="div" className="text-danger" />
          </div>
          <div className="form-checkout">
            <label htmlFor="Email">Email</label>
            <Field
              name="Email"
              type="text"
              className="dunk-input"
              placeholder="Enter your email"
              value={values.Email}
              onChange={handleChange}
            />
            <ErrorMessage name="Email" component="div" className="text-danger" />
          </div>
          <ButtonDunk type="submit" text="Place order" />
        </Form>
      </Formik>
    </div>
  );
};

export default CheckoutForm;
