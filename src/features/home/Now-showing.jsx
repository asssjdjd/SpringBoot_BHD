import React, { useState,useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import "../../assets/NowShowingSlide.css"
import 'swiper/css'; // Swiper base styles
import 'swiper/css/navigation'; // Navigation styles
import 'swiper/css/pagination'; // Pagination styles
import 'boxicons/css/boxicons.min.css'; // Boxicons (Option 2 from your Boxicons question)
import filmService from '../../services/Api/FilmService';
import { useNavigate } from 'react-router-dom';
// Sample data (replace with your actual data)


const NowShowingSlide = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [data,setData] = useState([])
  const navigate = useNavigate();
  

  useEffect(() => {
    filmService
    .getAll()
    .then((res) => {
        // console.log(res["data"]["response"])
        setData(res["data"]["response"])
    })
    .catch((e) => {
        console.log(e)
    })
  },[])

  const showDetailFilm = (movieId) => {
    navigate(`/home/detail-film/${movieId}`)
  }

  return (
    <div id="now-showing-slide">
      <div
        className="fs-3 container mt-5 mb-4 d-flex justify-content-center align-items-center fw-bold text-center"
        style={{
          color: '#72be43',
          border: '1px solid #72be43',
          width: '460px',
          borderRadius: '10px',
        }}
      >
        NOW SHOWING / SNEAK SHOW
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        loop={true}
        spaceBetween={25}
        pagination={{ el: '.swiper-pagination', clickable: true, dynamicBullets: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          700: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1300: { slidesPerView: 4 },
        }}
        className="cart-wrapper"
      >

        {data.map((movie, index) => (
          <SwiperSlide key={index} className="card-item">
            <div
              className="card-content"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img src={movie.images} alt={movie.name} />
              <button
                // href={movie.video_link}
                onClick = {() => {showDetailFilm(movie.id)}}

                className={`buy_now d-inline-flex justify-content-center p-2 fs-5 align-items-center text-white ${
                  hoveredIndex === index ? 'visible' : ''
                }`}
              >
                Mua vé ngay <i className="bx bx-cart-add ms-2"></i>
              </button>
              <div className={`continue ${hoveredIndex === index ? 'visible' : ''}`}>
                <i className="bx bx-play-circle"></i>
              </div>
              <div className="meta mt-3 mb-3">
                <span
                  className="age-limit text-white p-1 rounded-3"
                  style={{ backgroundColor: 'rgb(254, 45, 45)', fontSize: '12px' }}
                >
                  T18
                </span>
                <span
                  className="type text-white p-1 rounded-3 bg-dark"
                  style={{ fontSize: '12px' }}
                >
                  {movie.category_name}
                </span>
                <span
                  className="format text-white p-1 rounded-3"
                  style={{ backgroundColor: '#72be43', fontSize: '12px' }}
                >
                  2D
                </span>
              </div>
              <h4>
                <a href={movie.link} className="fw-bold" style={{ textDecoration: 'none', color: '#72be43' }}>
                  {movie.name}
                </a>
              </h4>
              <div className="cats">
                Thể loại phim:{' '}
                <a href="#" className="fw-bold" style={{ textDecoration: 'none', color: '#72be43' }}>
                  {movie.category_name}
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-pagination"></div>
        <div className="swiper-button-prev fw-bold mb-5" style={{ color: '#72be43' }}></div>
        <div className="swiper-button-next fw-bold mb-5" style={{ color: '#72be43' }}></div>
      </Swiper>
    </div>
  );
};

export default NowShowingSlide;