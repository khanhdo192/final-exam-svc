import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SwiperCore, { Navigation, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ACTION_CART } from '../../constants/enum';
import { IProductItemDetail } from '../../interfaces/ProductItem';
import { addToCart, getCart } from '../../services/cart';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setCart } from '../../store/slices/cartItemsSlice';
import { formatCurrency } from '../../utils/formatCurrency';
import ButtonDunk from '../checkout/ButtonDunk';
import ToastAdd from '../common/ToastAdd';

const ProductView = (props: any) => {
  const [activeThumb, setActiveThumb] = useState<SwiperCore>();
  const [capacity, setCapacity] = useState<string | undefined>('');
  const [cartAmount, setCartAmount] = useState(1);
  const isLogged = useAppSelector(state => state.auth.login.isLogged);
  const product: IProductItemDetail = props.product;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const updateCartItem = (type: string) => {
    if (type === ACTION_CART.ADD) {
      setCartAmount(cartAmount + 1);
    } else {
      setCartAmount(cartAmount - 1 < 1 ? 1 : cartAmount - 1);
    }
  };

  useEffect(() => {
    setCartAmount(1);
    setCapacity(undefined);
  }, [product]);

  const check = () => {
    if (capacity === undefined) {
      toast.warn('Please choose capacity');
      return false;
    }
    return true;
  };

  const handleAddToCart = async () => {
    try {
      if (isLogged) {
        if (check()) {
          let item = {
            ProductId: product.Id,
            Quantity: cartAmount,
          };
          await addToCart(item);
          const res = await getCart();
          dispatch(setCart(res.Data));
          toast.success(
            <ToastAdd link="/cart" text="Go to cart">
              {product.Name}
            </ToastAdd>,
          );
        }
      } else {
        navigate('/login', { replace: true, state: { from: location } });
      }
    } catch (error) {
      throw error;
    }
  };

  if (!product) {
    return <div>Loading</div>;
  }

  return (
    <div className="product-detail">
      <div className="row">
        <div className="col-lg-6 col-12">
          <Swiper
            spaceBetween={10}
            navigation={true}
            modules={[Navigation, Thumbs]}
            grabCursor={true}
            thumbs={{ swiper: activeThumb && !activeThumb.destroyed ? activeThumb : null }}
            className="product-swiper"
          >
            {product.Images.map((item, index) => (
              <SwiperSlide key={index}>
                <img src={item.Link} alt="product images" />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={setActiveThumb}
            spaceBetween={10}
            slidesPerView={4}
            modules={[Navigation, Thumbs]}
            className="thumb-swiper"
          >
            {product.Images.map((item, index) => (
              <SwiperSlide key={index}>
                <img src={item.Link} alt="product images" />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="product__info__desc">
            <h3>Description</h3>
            <p>{product.FullDescription}</p>
            <p>{product.ShortDescription}</p>
          </div>
        </div>
        <div className="col-lg-6 col-12">
          <div className="product__info">
            <h1 className="product__info__title">{product.Name}</h1>
            <div className="product__info__item">
              <span className="product__info__item__price">{formatCurrency(product.Price)}</span>
            </div>
            <div className="product__info__item">
              <div className="product__info__item__title">Color</div>
              <div className="product__info__item__list">
                <div className="product__info__item__list__item">
                  <div className={`circle bg-${product.Color?.Name}`} />
                </div>
              </div>
            </div>
            <div className="product__info__item">
              <div className="product__info__item__title">Capacity</div>
              <div className="product__info__item__list">
                <div
                  className={`product__info__capacity ${
                    capacity === product.Capacity?.Name ? 'active' : ''
                  }`}
                  onClick={() => setCapacity(product.Capacity?.Name)}
                >
                  <span className="product__info__giga">{product.Capacity?.Name}</span>
                </div>
              </div>
            </div>
            <div className="product__info__item">
              <div className="product__info__item__title">Amount</div>
              <div className="product__info__item__quantity">
                <div className="d-flex justify-content-center align-items-center select-quantity">
                  <div
                    className="product__info__item__quantity__btn"
                    onClick={() => updateCartItem(ACTION_CART.MINUS)}
                  >
                    <i className="bx bx-minus" />
                  </div>
                  <div className="product__info__item__quantity__input">{cartAmount}</div>
                  <div
                    className="product__info__item__quantity__btn"
                    onClick={() => updateCartItem(ACTION_CART.ADD)}
                  >
                    <i className="bx bx-plus" />
                  </div>
                </div>
              </div>
            </div>
            <div className="product__info__item">
              <ButtonDunk type="button" text="Add to cart" onClick={() => handleAddToCart()} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
