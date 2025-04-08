import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Login = (props) => {
  const {handleUsername,handlePassWord,handleLogout} = props;

  const togglePassword = (icon) => {
    let input = icon.parentElement.querySelector(".password-input");
    let eyeIcon = icon.querySelector("i");

    if (input.type === "password") {
      input.type = "text";
      eyeIcon.classNameList.remove("bi-eye");
      eyeIcon.classNameList.add("bi-eye-slash");
    } else {
      input.type = "password";
      eyeIcon.classNameList.remove("bi-eye-slash");
      eyeIcon.classNameList.add("bi-eye");
    }
  };

  return (
    <>
      <form action="#" className="mt-5 mb-5" style={{ marginLeft: "30%" }}>
        <h3 className="fs-3 fw-bold">Đăng nhập tài khoản</h3>
        <label htmlFor="email" className="form-label mt-4">
          Username*
        </label>
        <input
          type="username"
          className="p-2 form-control input-group"
          id="email"
          placeholder="Tài khoản hoặc Email của bạn"
          // (e) => setEmail(e.target.value)
          onChange={handleUsername}
          required
        />
        <label htmlFor="password" className="form-label mt-4">
          Password*
        </label>
        <div className="input-group">
          <input
            type="password"
            placeholder="Mật khẩu"
            className="form-control p-2 password-input"
            onChange={(handlePassWord)}
            required
          />
          <span
            className="input-group-text"
            onClick={(e) => togglePassword(e.target)}
          >
            <i className="bi bi-eye"></i>
          </span>
        </div>
        <div className="d-flex justify-content-end mt-3">
          <a
            href="#"
            className="text-decoration-none"
            style={{ color: "#72be43" }}
          >
            Quên mật khẩu?
          </a>
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100 mt-4 button-radius border-0"
          style={{ backgroundColor: "#72be43" }}
          onClick={handleLogout}
        >
          ĐĂNG NHẬP
        </button>
      </form>
    </>
  );
};

export default Login;
