const Footer = () => {
  return (
    <>
      <footer className="bg-dark text-white py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5 className="section-title-normal">
                <span>VỀ BHD STAR</span>
              </h5>
              <ul className="list-unstyled">
                <li>Hệ thống rạp</li>
                <li>Cụm rạp</li>
                <li>Liên hệ</li>
              </ul>
              <a
                href="http://online.gov.vn/HomePage/CustomWebsiteDisplay.aspx?DocId=46613"
                target="_blank"
                rel="noopener"
              >
                <img
                  className="alignnone wp-image-159"
                  src="https://www.bhdstar.vn/wp-content/uploads/2023/08/image-21.png"
                  alt=""
                  width="190"
                  height="72"
                />
              </a>
            </div>
            <div className="col-md-4">
              <h5 className="section-title-normal">
                <span>QUY ĐỊNH & ĐIỀU KHOẢN</span>
              </h5>
              <ul className="list-unstyled">
                <li>Quy định thành viên</li>
                <li>Điều khoản</li>
                <li>Hướng dẫn đặt vé trực tuyến</li>
                <li>Quy định và chính sách chung</li>
                <li>Chính sách bảo vệ thông tin cá nhân của người tiêu dùng</li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5 className="section-title-normal">
                <span>CHĂM SÓC KHÁCH HÀNG</span>
              </h5>
              <br />
              <p>Hotline: 19002099</p>
              <p>
                Giờ làm việc: 9:00 - 22:00 (Tất cả các ngày bao gồm cả Lễ, Tết)
              </p>
              <p>
                Email hỗ trợ:{" "}
                <a href="mailto:cskh@bhdstar.vn">cskh@bhdstar.vn</a>
              </p>
            </div>
            <div>
              <a href="#" className="me-3">
                <i className="fa fa-facebook"></i>
              </a>
              <a href="#" className="me-3">
                <i className="fa fa-instagram"></i>
              </a>
              <a href="#" className="me-3">
                <i className="fa fa-tiktok"></i>
              </a>
              <a href="#" className="me-3">
                <i className="fa fa-youtube"></i>
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center mt-4">
              <p className="mb-0">
                Công ty TNHH MTV Ngôi Sao Cineplex BHD Việt Nam
              </p>
              <p className="mb-0">
                Giấy CNĐKDN: 0104597158. Đăng ký lần đầu ngày 15 tháng 04 năm
                2010
              </p>
              <p className="mb-0">
                Địa chỉ: Tầng 11, Tòa nhà Hồng Hà Building, Lý Thường Kiệt, P.
                Phan Chu Trinh, Quận Hoàn Kiếm, Hà Nội
              </p>
              <p className="mb-0">Hotline: 19002099</p>
              <p className="mb-0">
                COPYRIGHT 2010 BHD STAR. ALL RIGHTS RESERVED
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;
