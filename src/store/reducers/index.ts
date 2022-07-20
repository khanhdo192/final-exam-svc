import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import cartItemsReducer from '../slices/cartItemsSlice';
import checkoutReducer from '../slices/checkoutSlice';
import { commonReducer } from '../slices/common';
import productReducer from '../slices/productSlice';
import profileReducer from '../slices/profileSlice';
const rootReducer = combineReducers({
  auth: authReducer,
  checkout: checkoutReducer,
  common: commonReducer,
  cartItems: cartItemsReducer,
  product: productReducer,
  profile: profileReducer,
});

export default rootReducer;
