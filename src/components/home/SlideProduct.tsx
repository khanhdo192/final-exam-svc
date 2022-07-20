import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductCard from '../product/ProductCard';

export type IProduct = {
  Id: number;
  Images: { Id: number; Link: string }[];
  Name: string;
  Price: number;
  Quantity: number;
  ShortDescription?: string;
};

const SlideProduct = (props: { products: IProduct[] }) => {
  return (
    <Swiper
      slidesPerView={1}
      freeMode={true}
      spaceBetween={20}
      breakpoints={{
        480: {
          slidesPerView: 2,
        },
        640: {
          slidesPerView: 2,
          pagination: true,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 4,
        },
      }}
      navigation={true}
      modules={[Navigation]}
      className="topsell-swiper"
    >
      {props.products.map((item, index) => (
        <SwiperSlide key={`product-${index}`}>
          <ProductCard
            image={item.Images[0].Link}
            name={item.Name}
            price={item.Price}
            id={item.Id}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SlideProduct;
