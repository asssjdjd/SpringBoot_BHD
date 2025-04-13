import React, { useState,useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
// import './ComingSoon.css'; // Import custom CSS
import '../../assets/ComingSoon.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'boxicons/css/boxicons.min.css';
import filmService from '../../services/Api/FilmService';
import { useNavigate } from 'react-router-dom';

const ComingSoon = () => {
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
    <div className="coming-soon pt-5">
      <div className="container">
        <div className="text-center mb-4">
          <h2
            className="title-button fw-bold btn fs-3 p-2"
            style={{ color: '#72be43', border: '1px solid #72be43', borderRadius: '10px' }}
          >
            COMING SOON
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
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1400: { slidesPerView: 4 },
            1700: { slidesPerView: 5 },
          }}
          className="cart-wrapper4"
        >
          {data.map((movie, index) => (
            <SwiperSlide key={index} className="card-item">
              <div
                // href={movie.video_link}
                className="card-link"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="position-relative">
                  { movie.images && <img src={movie.images} alt={movie.alt} className="card-image" onClick = {() => {showDetailFilm(movie.id)}} />}
                  <div className={`continue ${hoveredIndex === index ? 'visible' : ''}`}>
                    <i className="bx bx-play-circle"></i>
                  </div>
                </div>
                <div className="card-content fw-bold mt-2 text-center">
                  <span className="movie-title">{movie.title}</span>
                  <div className="d-inline-flex align-items-center text-muted">
                    <span>Thể loại phim:</span>
                    <div className="fw-bold ms-1" style={{ textDecoration: 'none', color: '#72be43' }}>
                      {movie.category_name}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-pagination mt-4"></div>
          <div className="swiper-button-prev fw-bold" style={{ color: '#72be43' }}></div>
          <div className="swiper-button-next fw-bold" style={{ color: '#72be43' }}></div>
        </Swiper>
      </div>
    </div>
  );
};

export default ComingSoon;