// import { useState } from "react";

import categoryService from "../services/Api/CategoryService";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import userAPI from "../services/Api/UserService";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const CreateCategory = () => {
  const [type, setType] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setType(e.target.value);

  const handleSubmitCreateCategory = (e) => {
    e.preventDefault();
    // console.log(type);
    categoryService.create(type)
    .then((res) => {
      console.log(res)
      toast.success("Type " + res["data"]["response"]["type"] + "has been created")
      navigate('/admin/category')
    })
    
  }

  const handleGoBack = () => {
    navigate('/admin/category')
  }

  return (
    <>
      <form onSubmit={handleSubmitCreateCategory} className="p-3 border rounded bg-light shadow-sm">
      <div className="mb-3">
        <label htmlFor="type" className="form-label">Tên thể loại</label>
        <input
          id="type"
          type="text"
          className="form-control"
          // value={type}
          placeholder="Nhập tên thể loại"
          onChange= {handleChange}
          required
        />
      </div>
      <button type = "submit" className="btn btn-primary" >Tạo thể loại</button>
    </form>
    <button className = "btn btn-sm btn-success ms-2 mt-4" onClick={handleGoBack}>
      Quay lại
    </button>
    </>
  );
};

export default CreateCategory;
