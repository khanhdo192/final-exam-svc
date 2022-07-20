import { useEffect, useState } from 'react';
import { CartResponse } from '../../interfaces/auth';
import { IProductsCart } from '../../interfaces/ProductItem';
import { getCart } from '../../services/cart';
import { useAppSelector } from '../../store/hooks';
import { formatCurrency } from '../../utils/formatCurrency';
import Divider from '../common/Divider';
import OrderItem from './OrderItem';

const Order = () => {
  const cartItems = useAppSelector(state => state.cartItems.currentCart) as any;
  const total = cartItems?.reduce(
    (t: number, i: { Products: { Price: number }; Quantity: number }) => {
      return t + i.Products.Price * i.Quantity;
    },
    0,
  );

  return (
    <div className="checkout__card">
      <div className="checkout__cart-order">
        <h2 className="checkout__title">Your order</h2>
        {cartItems?.map((item: IProductsCart, i: any) => (
          <OrderItem item={item} key={`cart-item-${i}`} />
        ))}
        <Divider />
        <div className="checkout__subtotal">
          <p>Total</p>
          <p>{total && formatCurrency(total)}</p>
        </div>
      </div>
    </div>
  );
};

export default Order;
