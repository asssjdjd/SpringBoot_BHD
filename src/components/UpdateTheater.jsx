import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const UpdateTheater = () => {
  const navigate = useNavigate();
  const { theaterId } = useParams(); // Lấy id từ URL
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    images: [],
    address: "",
    phone: "",
    policy: "",
    email: "",
  });

  // Load thông tin rạp
  useEffect(() => {
    if (!token) {
      toast.error("Vui lòng đăng nhập.");
      navigate("/login");
      return;
    }

    const fetchTheater = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/identity/theater/${theaterId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data.response;
        setFormData({
          name: data.name,
          images: [], // Không load ảnh hiện tại, nếu cần thì thêm field mới
          address: data.address,
          phone: data.phone,
          policy: data.policy,
          email: data.email,
        });
      } catch (e) {
        console.error(e);
        toast.error("Không tải được dữ liệu rạp.");
      }
    };

    fetchTheater();
  }, [theaterId, token, navigate]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: Array.from(files),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        value.forEach((file) => data.append(key, file));
      } else if (!Array.isArray(value)) {
        data.append(key, value);
      }
    });

    try {
      const res = await axios.put(
        `http://localhost:8080/identity/theater/${theaterId}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Cập nhật rạp thành công!");
      navigate("/admin/theater");
      console.log(res)
    } catch (err) {
      console.error(err);
      toast.error("Lỗi cập nhật: " + err?.response?.data?.message || "Không rõ nguyên nhân");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="mb-3">
        <label className="form-label">Tên rạp</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Địa chỉ</label>
        <input
          type="text"
          name="address"
          className="form-control"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Số điện thoại</label>
        <input
          type="text"
          name="phone"
          className="form-control"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Quy định giá vé</label>
        <textarea
          name="policy"
          rows="6"
          className="form-control"
          value={formData.policy}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <div className="mb-3">
        <label className="form-label">Ảnh (có thể để trống nếu không thay đổi)</label>
        <input
          type="file"
          name="images"
          accept="image/*"
          className="form-control"
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-warning">
        Cập nhật rạp
      </button>
    </form>
  );
};

export default UpdateTheater;
