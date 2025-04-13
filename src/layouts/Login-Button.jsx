import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginButton = () => {

    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your login logic here
        navigate('/register-login')
    };
    return (
        <>
            <div className="d-flex" id="right-navbar">
              <a
                title="Đăng ký/Đăng nhập"
                href="#"
                className="text-decoration-none text-white p-2 rounded-3 fw-normal position-relative"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
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
                    display: showDropdown ? "block" : "none",
                    backgroundColor: "rgba(44, 44, 44, .29)",
                  }}
                >
                  <div
                    className="card-body d-flex flex-column justify-content-end pb-4"
                    style={{
                      backgroundColor: "rgba(44, 44, 44, .29)",
                      fontSize: "14px",
                    }}
                  >
                    <Form id="loginForm" onSubmit={handleSubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="emailInput">Email*</Form.Label>
                        <Form.Control
                          type="text"
                          id="emailInput"
                          placeholder="Email"
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="passwordInput">
                          Mật khẩu*
                        </Form.Label>
                        <Form.Control
                          type="password"
                          id="passwordInput"
                          placeholder="Mật khẩu"
                          required
                        />
                      </Form.Group>

                      <div
                        className="mb-2 d-flex justify-content-end p-2"
                        id="button_forgotpassword"
                      >
                        {/* You can uncomment and convert this to a Link if using react-router */}
                        {/* <a href="#" id="forgotPassword">Quên mật khẩu?</a> */}
                        <span>forgot password</span>
                      </div>

                      <Button
                        type="submit"
                        className="btn-md btn_1 w-100 mb-2 border-0 fw-bold mb-3"
                        style={{ backgroundColor: "#72be43" }}
                      >
                        Đăng nhập
                      </Button>

                      <Button
                        type="button"
                        id="registerButton"
                        className="btn-md btn_2 w-100 mb-2 border-0 fw-bold"
                        style={{ backgroundColor: "#fff", color: "#72be43" }}
                      >
                        Đăng ký thành viên
                      </Button>
                    </Form>
                  </div>
                </div>
              </a>
            </div>
        </>
    )

}
export default LoginButton