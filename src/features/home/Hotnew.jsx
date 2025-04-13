import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';   
import '../../assets/HighlightedNews.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Sample news data (replace with real data)
const newsItems = [
  {
    imgSrc: 'https://www.bhdstar.vn/wp-content/uploads/2025/02/COMBOSLDO-01-min.jpg',
    link: '/news/combo-sldo',
    alt: 'Combo SLDO Promotion',
  },
  {
    imgSrc: 'https://www.bhdstar.vn/wp-content/uploads/2024/09/z6098497568270_f2fa708435c9ba93ce1fa26f55729c3f.jpg',
    link: '/news/conan-promo',
    alt: 'Conan Promotion',
  },
  // Add more items as needed
  {
    imgSrc: 'https://www.bhdstar.vn/wp-content/uploads/2024/11/467403530_1008787251287761_8367159137306975953_n.jpg',
    link: '/news/xmas-promo',
    alt: 'Xmas Promotion',
  },
];

const HighlightedNews = () => {
  return (
    <div className="highlighted-news pt-5">
      <div className="container">
        <div className="text-center mb-4">
          <h2
            className="title-button fw-bold btn fs-3 p-2"
            style={{ color: '#72be43', border: '1px solid #72be43', borderRadius: '10px' }}
          >
            TIN NỔI BẬT
          </h2>
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          loop={true}
          spaceBetween={30}
          pagination={{ el: '.swiper-pagination', clickable: true, dynamicBullets: true }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            
          }}
          className="cart-wrapper3"
        >
          {newsItems.map((item, index) => (
            <SwiperSlide key={index} className="card-item">
              <a href={item.link} className="card-link d-flex justify-content-center">
                <img src={item.imgSrc} alt={item.alt} className="card-image" />
              </a>
            </SwiperSlide>
          ))}
          <div className="swiper-pagination mt-4"></div>
          <div className="swiper-button-prev fw-bold" style={{ color: '#72be43', marginLeft: '60px' }}></div>
          <div className="swiper-button-next fw-bold" style={{ color: '#72be43' }}></div>
        </Swiper>
      </div>
    </div>
  );
};

export default HighlightedNews;