import logoNavbar from "../pages/asset/img/logo2024.png";

const Navbar = () => {
  return (
    <>
      <div id="navbar-header" className="sticky-top">
        <nav className="navbar navbar-expand-lg navbar-light bg-light fw-bold">
          <div className="container">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li
                  className="nav-item me-5"
                  style={{ marginLeft: "calc(100vw / 3)" }}
                >
                  <div className="container">
                    <img
                      src={logoNavbar}
                      alt="logo_navbar"
                      height="35"
                      width="160"
                    />
                  </div>
                </li>
                <li className="nav-item ms-5">
                  <a className="nav-link ps-2" href="#">
                    Quy định
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link ps-2" href="#">
                    FAQ
                  </a>
                </li>
              </ul>

              <div className="d-flex" id="right-navbar">
                <a
                  title="Đăng ký/Đăng nhập"
                  href="#"
                  className="text-decoration-none text-white p-2 rounded-3 fw-normal position-relative"
                  aria-expanded="false"
                >
                  <span
                    id="hover_nav"
                    className="btn btn-md text-white p-2 rounded-3 fw-bold"
                    style={{
                      border: "1px solid #e3f2c0",
                      backgroundColor: "#72be43",
                    }}
                  >
                    Đăng nhập/Đăng ký
                  </span>
                  <div
                    id="nav_dropdown"
                    className="card position-absolute top-5 end-0 fw-bold"
                    style={{
                      width: "320px",
                      transform: "translateX(20px)",
                      display: "none",
                    }}
                  >
                    <div
                      className="card-body d-flex flex-column justify-content-end pb-4"
                      style={{ backgroundColor: "#9b9b9b", fontSize: "14px" }}
                    >
                      <form id="loginForm" action="#" method="POST">
                        <div className="mb-3">
                          <label htmlFor="emailInput" className="form-label">
                            Email*
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="emailInput"
                            placeholder="Email"
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="passwordInput" className="form-label">
                            Mật khẩu*
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="passwordInput"
                            placeholder="Mật khẩu"
                            required
                          />
                        </div>
                        <div
                          className="mb-2 d-flex justify-content-end p-2"
                          id="button_forgotpassword"
                        >
                          forgot password
                        </div>
                        <button
                          type="submit"
                          className="btn btn-md btn_1 btn-primary w-100 mb-2 border-0 fw-bold mb-3"
                          style={{ backgroundColor: "#72be43" }}
                        >
                          Đăng nhập
                        </button>
                        <button
                          type="button"
                          id="registerButton"
                          className="btn btn-md btn_2 btn-primary w-100 mb-2 border-0 fw-bold"
                          style={{
                            backgroundColor: "#fff",
                            color: "#72be43",
                          }}
                        >
                          Đăng ký thành viên
                        </button>
                      </form>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
