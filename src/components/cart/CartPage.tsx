import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IProductsCart } from '../../interfaces/ProductItem';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setOrderItem } from '../../store/slices/cartItemsSlice';
import { formatCurrency } from '../../utils/formatCurrency';
import CartItem from '../cart/CartItem';
import ButtonDunk from '../checkout/ButtonDunk';
import Divider from '../common/Divider';
import Helmet from '../common/Helmet';

const CartPage = () => {
  const currentCart = useAppSelector(state => state.cartItems.currentCart);
  const [cartItems, setCartItems] = useState(currentCart);
  const dispatch = useAppDispatch();

  const total = currentCart?.reduce(
    (t: number, i: { Products: { Price: number }; Quantity: number }) => {
      return t + i.Products.Price * i.Quantity;
    },
    0,
  );

  useEffect(() => {
    setCartItems(currentCart);
  }, [currentCart]);

  const orderItems = cartItems.map((item: IProductsCart) => {
    return {
      ProductId: item.Products.Id,
      Quantity: item.Quantity,
      TotalPrice: item.Products.Price * item.Quantity,
    };
  });
  dispatch(setOrderItem(orderItems));

  if (cartItems.length === 0) {
    return (
      <>
        <Helmet title="Cart">
          <div className="cart">
            <div className="cart__noti">
              <div className="cart__noti__image">
                <img
                  src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/cart/9bdd8040b334d31946f49e36beaf32db.png"
                  alt=""
                />
              </div>
              <p>Your cart is empty</p>
              <Link to="/catalog">
                <ButtonDunk type="button" text="Let's go shopping" />
              </Link>
            </div>
          </div>
        </Helmet>
      </>
    );
  }

  return (
    <Helmet title="Cart">
      <div className="cart">
        <div className="cart__list">
          {cartItems?.map((item: IProductsCart, index: any) => (
            <div key={`cart-list-${index}`}>
              <CartItem item={item} />
              <Divider />
            </div>
          ))}
        </div>
        <div className="cart__info">
          <div className="cart__info__txt">
            <h3>You have {cartItems?.length} product in cart</h3>
            <div className="cart__info__txt__price">
              <h4>Total:</h4>
              <p>{formatCurrency(Number(total))}</p>
            </div>
          </div>
          <div className="cart__info__btn">
            <Link to="/checkout">
              <ButtonDunk type="button" text="Checkout now" />
            </Link>
            <Link to="/catalog">
              <ButtonDunk type="button" text="Continue shopping" />
            </Link>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default CartPage;
