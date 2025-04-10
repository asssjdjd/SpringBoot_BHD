import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import theaterService from "../services/Api/TheaterService";

const CreateFoodCombo = () => {
  const navigate = useNavigate();
  const [theaters, setTheaters] = useState([]);

  useEffect(() => {
    theaterService.getAll().then((res) => {
      // console.log(res["data"]["response"])
      setTheaters(res["data"]["response"]);
    });
  }, []);

  const handleChangeTheater = (e) => {
    handleChange(e);
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    theater_id: "",
    images: [],
  });

  const token = localStorage.getItem("token"); // TODO: Replace with actual token

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: Array.from(files), // Handle multiple files
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
        "http://localhost:8080/identity/foods/upload",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Upload successful:", res.data);
      toast.success("Tạo foodcombo thành công!");
      navigate("/admin/food-combo");
    } catch (err) {
      console.log("Upload error:", err);
      toast.error("Error: " + err["response"]["data"]["message"]);
    }
  };

  const handleGoBack = () => {
    navigate("/admin/food-combo");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="container mt-4 p-3 border rounded bg-light shadow-sm"
      >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Tên FOOD-COMBO:
          </label>
          <input
            id="name"
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., ga ran"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Mô tả:
          </label>
          <textarea
            id="description"
            className="form-control"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="e.g., sieu ngon"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Giá bán:
          </label>
          <input
            id="price"
            type="number"
            className="form-control"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g., 10000"
            required
          />
        </div>
        <div className="mb-3">
          <label>Chọn rạp :</label>
          <select
            className="form-select w-25"
            onChange={handleChangeTheater}
            required
          >
            <option value="">-- Các rạp --</option>
            {theaters.map((theater) => (
              <option key={theater.id} value={theater.name}>
                {theater.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="images" className="form-label">
            Ảnh:
          </label>
          <input
            id="images"
            type="file"
            className="form-control"
            name="images"
            multiple
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Tạo combo
        </button>
      </form>
      <button
        className="btn btn-sm btn-success ms-2 mt-4"
        onClick={handleGoBack}
      >
        Quay lại
      </button>
    </>
  );
};

export default CreateFoodCombo;
