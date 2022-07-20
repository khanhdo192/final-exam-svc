import { createSlice } from '@reduxjs/toolkit';
import { CheckoutRequest } from '../../interfaces/auth';

interface OrderState {
  success: boolean;
  orderData?: CheckoutRequest | null;
}

const initialState: OrderState = {
  success: false,
  orderData: null,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    checkoutSuccess: (state, action) => {
      state.success = true;
      state.orderData = action.payload;
    },
  },
});

export const { checkoutSuccess } = checkoutSlice.actions;

export default checkoutSlice.reducer;
