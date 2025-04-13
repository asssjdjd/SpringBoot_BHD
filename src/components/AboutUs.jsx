import React from 'react';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';
import NavigationBar from '../layouts/NavbarHome';
import Banner from '../layouts/Banner';

// Define reusable styles
const hrStyle = {
  border: '1px solid #72be43',
  marginLeft: '5%',
  marginRight: '5%',
  marginTop: 0,
};

const AboutUs = () => {
  // Initialize Swiper
//   useEffect(() => {
    new Swiper('.swiper', {
      modules: [Navigation, Pagination],
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
//   }, []);

  return (
    <>
      <Banner />
      <NavigationBar />
      <hr style={hrStyle} />
      <div className="container">
        <div className="col-inner">
          <div className="text">
            <h2 className="mb-4">Về chúng tôi</h2>
          </div>
        </div>

        <div className="swiper mb-5">
          <div className="cart-wrapper-about-us">
            <ul className="card-list swiper-wrapper">
              <li className="card-item-about-us swiper-slide">
                <a href="/history" className="card-link" aria-label="BHD Star Cineplex History">
                  <img
                    src="https://www.bhdstar.vn/wp-content/uploads/2023/09/aboutus1.jpg"
                    className="card-image"
                    alt="BHD Star Cineplex first cinema"
                  />
                  <p>
                    BHD Star Cineplex, established in 2010 with its first 5-screen cinema, is the only
                    Vietnamese cinema chain to expand rapidly since 2014. With new locations in prime
                    areas of Ho Chi Minh City, Hanoi, Hue, and beyond, we prioritize consistent,
                    high-quality customer experiences across all our theaters.
                  </p>
                </a>
              </li>
              <li className="card-item-about-us swiper-slide">
                <a href="/about" className="card-link" aria-label="About BHD Company">
                  <img
                    src="https://www.bhdstar.vn/wp-content/uploads/2023/09/aboutus2.jpg"
                    className="card-image"
                    alt="BHD Star Cineplex theater"
                  />
                  <p>
                    Founded in 1996 as Bình Hạnh Đan Co., Ltd., BHD engages in TV gameshows, film
                    production, and international film distribution. BHD Star Cineplex, a pioneer in
                    Vietnam’s cinema industry, places customer satisfaction at its core, earning its
                    reputation as a leading cinema chain.
                  </p>
                </a>
              </li>
              <li className="card-item-about-us swiper-slide">
                <a href="/technology" className="card-link" aria-label="BHD Technology">
                  <img
                    src="https://www.bhdstar.vn/wp-content/uploads/2023/09/aboutus3.jpg"
                    className="card-image"
                    alt="BHD Star Cineplex technology"
                  />
                  <p>
                    Equipped with cutting-edge audio-visual technology, BHD Star Cineplex delivers
                    immersive experiences in clean, comfortable spaces. Our professional staff is
                    dedicated to meeting customer needs promptly and effectively.
                  </p>
                </a>
              </li>
              <li className="card-item-about-us swiper-slide">
                <a href="/vision" className="card-link" aria-label="BHD Vision">
                  <img
                    src="https://www.bhdstar.vn/wp-content/uploads/2023/09/aboutus4.jpg"
                    className="card-image"
                    alt="BHD Star Cineplex modern facilities"
                  />
                  <p>
                    Since 2010, BHD Star Cineplex has offered premium cinema experiences with
                    state-of-the-art sound and visuals, setting the standard for modern theaters in
                    Vietnam.
                  </p>
                </a>
              </li>
            </ul>
            <div className="swiper-pagination" />
            <div className="swiper-button-prev" />
            <div className="swiper-button-next" />
          </div>
        </div>
      </div>
      <hr style={hrStyle} />
    </>
  );
};

export default AboutUs;