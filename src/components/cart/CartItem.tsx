import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ACTION_CART } from '../../constants/enum';
import { IProductsCart } from '../../interfaces/ProductItem';
import { getCart, removeCart, updateCart } from '../../services/cart';
import { useAppDispatch } from '../../store/hooks';
import { removeItems, setCart, updateItems } from '../../store/slices/cartItemsSlice';
import { formatCurrency } from '../../utils/formatCurrency';

interface ICartItems {
  item: IProductsCart;
}

const CartItem = (props: ICartItems) => {
  const item = props.item.Products;
  const quantity = props.item.Quantity;
  const cartId = props.item.CartId;
  const dispatch = useAppDispatch();

  const updateCartAmount = async (action: string) => {
    if (action === ACTION_CART.ADD) {
      try {
        await updateCart({ CartId: cartId, Quantity: quantity + 1 });
        dispatch(updateItems({ CartId: cartId, Products: item, Quantity: quantity + 1 }));
      } catch (error) {
        throw error;
      }
    }
    if (action === ACTION_CART.MINUS) {
      try {
        if (quantity === 1) {
          return removeCartItem();
        }
        await updateCart({ CartId: cartId, Quantity: quantity - 1 });
        dispatch(updateItems({ CartId: cartId, Products: item, Quantity: quantity - 1 }));
      } catch (error) {
        throw error;
      }
    }
  };

  const removeCartItem = async () => {
    try {
      await removeCart(cartId);
      dispatch(removeItems(cartId));
      toast.success(`${item.Name} have been removed`);
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <div className="cart__item">
        <div className="cart__item__image">
          <Link to={`/catalog/${item.Id}`}>
            <img src={item.Images[0].Link} alt="" />
          </Link>
        </div>
        <div className="cart__item__info">
          <div className="cart__item__info__name">
            <Link to={`/catalog/${item.Id}`}>
              <p>{item.Name}</p>
            </Link>
            <p>
              {item.Color.Name} - {item.Capacity.Name}
            </p>
          </div>
          <div className="cart__item__info__price">
            <p> {formatCurrency(item.Price)}</p>
          </div>
          <div className="cart__item__info__quantity">
            <div className="product__info__item__quantity">
              <div className="d-flex justify-content-center align-items-center select-quantity">
                <div
                  className="product__info__item__quantity__btn"
                  onClick={() => updateCartAmount(ACTION_CART.MINUS)}
                >
                  <i className="bx bx-minus" />
                </div>
                <div className="product__info__item__quantity__input">{quantity}</div>
                <div
                  className="product__info__item__quantity__btn"
                  onClick={() => updateCartAmount(ACTION_CART.ADD)}
                >
                  <i className="bx bx-plus" />
                </div>
              </div>
            </div>
          </div>
          <div className="cart__item__del">
            <i className="bx bx-trash" onClick={() => removeCartItem()} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
