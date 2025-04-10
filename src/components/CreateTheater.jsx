import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateTheater = () => {
    const navigate = useNavigate();

     const [formData, setFormData] = useState({
        name: "",
        images: [],
        address: "",
        phone: "",
        policy: "",
        email: "",
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

        console.log(formData)

        const data = new FormData();
    
        Object.entries(formData).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((file) => data.append(key, file));
          } else {
            data.append(key, value);
          }
        });

        // in de kiem tra 

        for (let pair of data.entries()) {
            console.log(pair[0], pair[1]);
          }
          
    
        try {
          const res = await axios.post(
            "http://localhost:8080/identity/theater",
            data,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("Upload thành công:", res.data);
          toast.success("Tạo theater thành công!");
          navigate("/admin/theater");
        } catch (err) {
          //   console.log("Lỗi upload:", err);
    
          alert("Upload thất bại!");
          toast.error("error " + err["response"]["data"]["message"]);
        }
      };
    


  return (
    <>
        <form
            method="POST"
            enctype="multipart/form-data"
            className="container mt-4"
            onSubmit={handleSubmit}
        >
            <div className="mb-3">
                <label className="form-label">Tên rạp</label>
                <input type="text" name="name" className="form-control" onChange={handleChange} required />
            </div>

            <div className="mb-3">
                <label className="form-label">Địa chỉ</label>
                <input type="text" name="address" className="form-control" onChange={handleChange} required />
            </div>

            <div className="mb-3">
                <label className="form-label">Số điện thoại</label>
                <input type="text" name="phone" className="form-control" onChange={handleChange} required />
            </div>

            <div className="mb-3">
                <label className="form-label">email</label>
                <input type="email" name="email" className="form-control" onChange={handleChange} required />
            </div>

            <div className="mb-3 d-flex">
                <label className="form-label">Quy định giá vé</label>
                <textarea name="policy" id="" cols="100" rows="10" onChange={handleChange}></textarea>
            </div>

            <div className="mb-3">
            <label className="form-label">Tải ảnh lên</label>
            <input
                type="file"
                name="images"
                accept="image/*"
                className="form-control" onChange={handleChange}
                required
            />
            </div>

            <button type="submit" className="btn btn-primary">
            Thêm rạp
            </button>
        </form>
    </>
  );
};

export default CreateTheater
