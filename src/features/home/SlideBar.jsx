import React, { useState, useEffect, useRef } from 'react';
import "../../assets/SlideBar.css"

import anh1 from '../../pages/asset/img/slide-header/anh1.jpg';
import anh2 from '../../pages/asset/img/slide-header/anh2.png';
import anh3 from '../../pages/asset/img/slide-header/anh3.jpg';
import anh4 from '../../pages/asset/img/slide-header/anh4.jpg';
import anh5 from '../../pages/asset/img/slide-header/anh5.jpg';
import khuyennghi from '../../pages/asset/img/slide-header/khuyennghi.jpg';
import 'boxicons/css/boxicons.min.css';

const slides = [
    { src: anh1, alt: 'Slide 1' },
    { src: anh2, alt: 'Slide 2' },
    { src: anh3, alt: 'Slide 3' },
    { src: anh4, alt: 'Slide 4' },
    { src: anh5, alt: 'Slide 5' },
    { src: khuyennghi, alt: 'Slide 6' },
]

const SlideBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);
  const timeoutRef = useRef(null);

  const slideWidth = slideRef.current?.children[0]?.offsetWidth || 0;

  const handleRightSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleLeftSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  // Auto-slide every 7 seconds
  useEffect(() => {
    timeoutRef.current = setInterval(handleRightSlide, 7000);

    return () => clearInterval(timeoutRef.current); // Cleanup on unmount
  }, []);

  // Reset interval when manually navigating
  const handleManualNavigation = (direction) => {
    clearInterval(timeoutRef.current);
    direction === 'right' ? handleRightSlide() : handleLeftSlide();
    timeoutRef.current = setInterval(handleRightSlide, 7000);
  };

  return (
    <div id="slide-header">
      <div className="slide-show" style={{ overflow: 'hidden', width: '100%' }}>
        <div
          className="list-images"
          ref={slideRef}
          style={{
            transform: `translateX(-${currentIndex * slideWidth}px)`,
            transition: 'transform 0.5s ease',
            display: 'flex',
          }}
        >
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide.src}
              alt={slide.alt}
              style={{ width: '100%', flexShrink: 0 }}
            />
          ))}
        </div>

        <div className="content-slide-header container mb-4">
          <div
            className="btn-sm btn ps-3 pe-3 fs-4 fw-bold bg-white mb-3 btn_3"
            style={{
              color: '#72be43',
              border: '1px solid #72be43',
              borderRadius: '12px',
            }}
          >
            NOSFERATU: MA CÀ RỒNG
          </div>
          <div className="row">
            <div
              className="col-2 ps-3 ms-3 me-4 btn btn-sm fw-bold fs-5 d-inline-flex justify-content-center align-items-center text-white btn_1"
              style={{
                backgroundColor: '#72be43',
                border: '1px solid #72be43',
                borderRadius: '10px',
              }}
            >
              Mua vé ngay <i className="bx bx-cart-add ms-2"></i>
            </div>
            <div
              className="col-3 btn btn-sm fw-bold fs-5 bg-white d-inline-flex justify-content-center align-items-center btn_2"
              style={{
                color: '#72be43',
                border: '1px solid #72be43',
                borderRadius: '10px',
              }}
            >
              Thông tin chi tiết <i className="bx bxl-telegram ms-2"></i>
            </div>
          </div>
        </div>

        <div className="btns_slide">
          <button
            className="btn-left btn"
            onClick={() => handleManualNavigation('left')}
            aria-label="Previous slide"
          >
            <i className="bx bx-chevron-left"></i>
          </button>
          <button
            className="btn-right btn position-absolute"
            onClick={() => handleManualNavigation('right')}
            aria-label="Next slide"
          >
            <i className="bx bx-chevron-right"></i>
          </button>
        </div>

        <div className="index-images-slide-header">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`class-item index-${index} ${
                index === currentIndex ? 'active' : ''
              }`}
              onClick={() => setCurrentIndex(index)}
              role="button"
              aria-label={`Go to slide ${index + 1}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlideBar;