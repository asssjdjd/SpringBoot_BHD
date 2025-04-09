import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import categoryService from "../services/Api/CategoryService";

const UpdateFilm = () => {
  const navigate = useNavigate();
  const { filmId } = useParams(); // Lấy ID phim từ URL
  const token = localStorage.getItem("token");

  const [categorys, setCategorys] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    video_link: "",
    images: [],
    duration: "",
    name_director: "",
    name_actor: "",
    description: "",
    launch_date: "",
    category_name: "",
  });

  // Lấy danh sách thể loại
  useEffect(() => {
    categoryService.getAll().then((res) => {
      setCategorys(res.data.response);
    });
  }, []);

  // Load thông tin phim hiện tại
  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/identity/films/${filmId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data.response;
        setFormData({
          name: data.name,
          video_link: data.video_link,
          images: [],
          duration: data.duration,
          name_director: data.name_director,
          name_actor: data.name_actor,
          description: data.description,
          launch_date: data.launch_date,
          category_name: data.category_name,
        });
      } catch (e) {
        console.log(e)
        toast.error("Không tải được dữ liệu phim");
      }
    };

    fetchFilm();
  }, [filmId, token]);

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
      if (Array.isArray(value)) {
        value.forEach((file) => data.append(key, file));
      } else {
        data.append(key, value);
      }
    });

    try {
      const res = await axios.put(
        `http://localhost:8080/identity/films/${filmId}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res)

      toast.success("Cập nhật phim thành công!");
      navigate("/admin/film");
    } catch (err) {
      toast.error("Lỗi: " + err.response?.data?.message || "Không rõ nguyên nhân");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="mb-3">
        <label>Tên phim:</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Link video:</label>
        <input
          type="text"
          className="form-control"
          name="video_link"
          value={formData.video_link}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Ảnh phim (nhiều ảnh):</label>
        <input
          type="file"
          className="form-control"
          name="images"
          multiple
          accept="image/*"
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Thời lượng (phút):</label>
        <input
          type="number"
          className="form-control"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Tên đạo diễn:</label>
        <input
          type="text"
          className="form-control"
          name="name_director"
          value={formData.name_director}
          onChange={handleChange}
          required
        />
      </div>

      

      <div className="mb-3">
        <label>Mô tả phim:</label>
        <textarea
          className="form-control"
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Ngày khởi chiếu:</label>
        <input
          type="date"
          className="form-control"
          name="launch_date"
          value={formData.launch_date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Thể loại:</label>
        <select
          className="form-select w-25"
          name="category_name"
          value={formData.category_name}
          onChange={handleChange}
          required
        >
          <option value="">-- Chọn thể loại --</option>
          {categorys.map((category) => (
            <option key={category.id} value={category.type}>
              {category.type}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Cập nhật phim
      </button>
    </form>
  );
};

export default UpdateFilm;
