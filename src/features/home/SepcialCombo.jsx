import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
// import './SpecialCombo.css'; // Import custom CSS
import "../../assets/SpeacialCombo.css"
import 'swiper/css'; // Swiper base styles
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'boxicons/css/boxicons.min.css'; // Boxicons (npm approach)
import { useNavigate } from 'react-router-dom';

// Combo data (replace with your actual data)
const combos = [
  {
    imgSrc: 'https://www.bhdstar.vn/wp-content/uploads/2024/09/combo-conan-moi.jpg',
    title: 'COMBO “CONAN – THÁM TỬ LỪNG DANH”',
    description: 'Mua combo bắp nước kèm 1 sản phẩm Conan với giá cực hời',
    // link: '/combos/conan-1', // Replace with real URL or React Router path
    alt: 'Combo Conan Thám Tử Lừng Danh',
  },
  {
    imgSrc: 'https://www.bhdstar.vn/wp-content/uploads/2025/02/COMBOSLDO-01-min.jpg',
    title: 'MÙA YÊU THƯƠNG, SAN SẺ NGỌT NGÀO',
    description:
      'MÙA YÊU THƯƠNG, SAN SẺ NGỌT NGÀO 1 Bắp rang bùng nổ, 1 Nước ngọt ngào, 1 Hộp socola cặp đôi: Giá chỉ 149,000đ.',
    // link: '/combos/valentine',
    alt: 'Combo Mùa Yêu Thương',
  },
  {
    imgSrc: 'https://www.bhdstar.vn/wp-content/uploads/2024/11/467403530_1008787251287761_8367159137306975953_n.jpg',
    title: 'COMBO XMAS SIÊU CUTE TẠI BHD STAR',
    description:
      'GIÁNG SINH LUNG LINH TẠI BHD STAR Chào đón Giáng Sinh tại BHD Star với bộ ly túi xinh iu nè cả nhà ơi...',
    // link: '/combos/xmas',
    alt: 'Combo Xmas BHD Star',
  },
  {
    imgSrc: 'https://www.bhdstar.vn/wp-content/uploads/2024/10/Ao-thun-Sai-gon-ink-vuong-2.jpg',
    title: 'COMBO “ÁO THUN BHDS x SAIGONINK” SIÊU CHẤT',
    description:
      'Công nghệ in hiện đại mang lại những sản phẩm áo thun BST Halloween của BHDS & SaigonInk có hình in sắc nét, màu sắc sinh động',
    // link: '/combos/saigonink',
    alt: 'Combo Áo Thun BHDS x SaigonInk',
  },
  {
    imgSrc: 'https://www.bhdstar.vn/wp-content/uploads/2024/09/z6098497568270_f2fa708435c9ba93ce1fa26f55729c3f.jpg',
    title: 'COMBO “CONAN – THÁM TỬ LỪNG DANH”',
    description: 'Mua combo bắp nước kèm túi tole hoặc quai xách ly siêu xinh với giá siêu ưu đãi',
    // link: '/combos/conan-2',
    alt: 'Combo Conan Thám Tử Lừng Danh 2',
  },
  
];

const SpecialCombo = () => {
  const navigate = useNavigate();

  return (
    <div className="special-combo pt-5">
      <div className="container">
        <div className="text-center mb-4">
          <h2
            className="title-button fw-bold btn fs-3 p-2"
            style={{ color: '#72be43', border: '1px solid #72be43', borderRadius: '10px' }}
          >
            COMBO ĐẶC BIỆT
          </h2>
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
          className="cart-wrapper2"
        >
          {combos.map((combo, index) => (
            <SwiperSlide key={index} className="card-item">
              <a href={combo.link} className="card-link d-flex flex-column align-items-center text-center">
                <img
                  src={combo.imgSrc}
                  alt={combo.alt}
                  className="card-image"
                  loading="lazy"
                  onClick = {() => {
                    navigate('/detail-food')
                  }}
                />
                <h4 className="cart-title fw-bold fs-6 mt-3">{combo.title}</h4>
                <p className="card-description">{combo.description}</p>
              </a>
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

export default SpecialCombo;