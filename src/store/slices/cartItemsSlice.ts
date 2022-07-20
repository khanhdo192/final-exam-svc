import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProductsCart } from '../../interfaces/ProductItem';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import _ from 'lodash';

interface CartState {
  currentCart: IProductsCart[];
  orderItem:
    | {
        ProductId: number;
        Quantity: number;
        TotalPrice: number;
      }[]
    | null;
}

const initialState: CartState = {
  currentCart: [],
  orderItem: [
    {
      ProductId: 0,
      Quantity: 0,
      TotalPrice: 0,
    },
  ],
};

export const cartItemsSlice = createSlice({
  name: 'cartItems',
  initialState,
  reducers: {
    setCart: (state: CartState, action: PayloadAction<IProductsCart[]>) => {
      state.currentCart = action.payload;
    },
    updateItems: (state: CartState, action: PayloadAction<IProductsCart>) => {
      const newItem = action.payload;
      const item = state.currentCart.filter(e => e.CartId === newItem.CartId);
      if (item.length > 0) {
        state.currentCart = state.currentCart.filter(e => e.CartId !== newItem.CartId);
        state.currentCart = [
          ...state.currentCart,
          {
            CartId: item[0].CartId,
            Products: { ...newItem.Products },
            Quantity: newItem.Quantity,
          },
        ];
        state.currentCart = _.sortBy(state.currentCart, 'CartId');
      }
    },
    removeItems: (state: CartState, action: PayloadAction<number>) => {
      const item = action.payload;
      state.currentCart = state.currentCart.filter(e => e.CartId !== item);
    },
    clearCart: state => {
      state.currentCart = [];
      state.orderItem = [];
    },
    setOrderItem: (
      state: CartState,
      action: PayloadAction<
        {
          ProductId: number;
          Quantity: number;
          TotalPrice: number;
        }[]
      >,
    ) => {
      state.orderItem = action.payload;
    },
  },
});

export const { setCart, updateItems, removeItems, clearCart, setOrderItem } =
  cartItemsSlice.actions;

export default cartItemsSlice.reducer;
