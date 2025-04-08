const Register = (props) => {

    const {handleChange,handleCreateUser} = props;

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
      <form action="#" className="mt-5 mb-5">
        <h3 className="fs-3 fw-bold">Đăng ký tài khoản</h3>
        <div
          className="d-flex row"
          style={{ marginLeft: "2%", marginRight: "20%" }}
        >
          <div className="form-left col-6">
            <label className="form-label mt-4">UserName*</label>
            <input
              type="text"
              className="p-2 form-control input-group"
              id="username"
              name="username"
              onChange={handleChange}
              required
            />
            <label className="form-label mt-4">Giới tính*</label>
            <select
              className="form-select p-2"
              aria-label="Default select example"
            >
              <option selected>Chọn giới tính</option>
              <option value="1">Nam</option>
              <option value="2">Nữ</option>
              <option value="3">Khác</option>
            </select>
            <label htmlFor="password" className="form-label mt-4">
              PassWord*
            </label>
            <div className="input-group">
              <input
                name="password"
                type="password"
                className="form-control p-2 password-input"
                onChange={handleChange}
                required
              />
              <span
                className="input-group-text"
                onClick={(e) => togglePassword(e.target)}
              >
                <i className="bi bi-eye"></i>
              </span>
            </div>
          </div>
          <div className="form-right col-6">
            <label className="form-label mt-4">PhoneNumber*</label>
            <input
              type="text"
              name="phonenumber"
              className="p-2 form-control input-group"
              onChange={handleChange}
              id="name"
              required
            />
            <label htmlFor="email" className="form-label mt-4">
              Email*
            </label>
            <input
              type="email"
              className="p-2 form-control input-group"
              id="email"
              required
            />
            <label htmlFor="password" className="form-label mt-4">
              Nhập lại mật khẩu*
            </label>
            <div className="input-group">
              <input
                type="password"
                className="form-control p-2 password-input"
                required
              />
              <span
                className="input-group-text"
                onClick={(e) => togglePassword(e.target)}
              >
                <i className="bi bi-eye"></i>
              </span>
            </div>
          </div>

          <label htmlFor="date" className="form-label mt-4">
            Ngày sinh*
          </label>
          <input
            type="date"
            className="form-control w-25 input-group"
            id="date"
            name="dob"
            onChange={handleChange}
            required
          />
          <label htmlFor="phone" className="form-label mt-4">
            Tỉnh/Thành phố*
          </label>
          <select
            className="form-select p-2"
            aria-label="Default select example"
          >
            <option selected>Chọn Tỉnh/Thành phố</option>
            <option value="Hồ Chí Minh">Hồ Chí Minh</option>
            <option value="Hà Nội">Hà Nội</option>
            {/* Add other options as needed */}
          </select>
          <div className="d-flex mt-4">
            <input
              type="checkbox"
              className="form-check-input me-2"
              id="check"
              required
            />
            <label className="form-check-label" htmlFor="check">
              Tôi đồng ý với các điều khoản và điều kiện của BHD Star
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 mt-4 button-radius border-0"
            style={{ backgroundColor: "#72be43" }}
            onClick={handleCreateUser}
          >
            ĐĂNG KÝ
          </button>
        </div>
      </form>
    </>
  );
};

export default Register;
