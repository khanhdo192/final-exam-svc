import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

const HeroSlider = () => {
  return (
    <Swiper
      loop={true}
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="home-swiper"
    >
      <SwiperSlide>
        <img
          className="image-cover"
          src="https://shopdunk.com/wp-content/uploads/2022/06/Banner-PC-macbook-air-DKT-1-1.jpg"
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="image-cover"
          src="https://shopdunk.com/wp-content/uploads/2022/06/Banner-PC-1.jpg"
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="image-cover"
          src="https://shopdunk.com/wp-content/uploads/2022/06/Banner-PC-macbook-air-M2-2.jpg"
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="image-cover"
          src="https://shopdunk.com/wp-content/uploads/2022/05/Banner-PC-imac.jpg"
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="image-cover"
          src="https://shopdunk.com/wp-content/uploads/2022/05/Banner-Web-1.jpg"
          alt=""
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroSlider;
