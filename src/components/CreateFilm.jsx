import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import categoryService from "../services/Api/CategoryService";

const CreateFilm = () => {
  const navigate = useNavigate();
  const [categorys, setCategorys] = useState([]);

  useEffect(() => {
    categoryService.getAll().then((res) => {
      // console.log(res["data"]['response'])
      setCategorys(res["data"]["response"]);
    });
  }, []);

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

  const token = localStorage.getItem("token"); // TODO: thay bằng token thực tế

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: Array.from(files), // xử lý multiple file
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
      const res = await axios.post(
        "http://localhost:8080/identity/films/upload",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Upload thành công:", res.data);
      toast.success("Tạo phim thành công!");
      navigate("/admin/film");
    } catch (err) {
      //   console.log("Lỗi upload:", err);

      alert("Upload thất bại!");
      toast.error("error " + err["response"]["data"]["message"]);
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
          required
        />
      </div>
      <div className="mb-3">
        <label>Thời lượng (phút):</label>
        <input
          type="number"
          className="form-control"
          name="duration"
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
        Tạo phim
      </button>
    </form>
  );
};

export default CreateFilm;
