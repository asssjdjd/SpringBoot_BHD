import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useState } from "react";
import { useEffect } from "react";
import categoryService from "../services/Api/CategoryService";
import { toast } from "react-toastify";

const AllCategorys = () => {
  const [categorys,setCategorys] = useState([])

  const fetchCategorys = async () => {
    categoryService.getAll()
    .then((res) => {
      setCategorys(res["data"]["response"])
    })
    .catch((err) => {
        console.log(err)
        toast.error("Don't view category now")
    })
  }

  useEffect(() => {
      fetchCategorys();
  },[])

  // console.log(categorys)

  const deleteCategory = (categoryID) => {
    console.log(categoryID)
      categoryService.delete(categoryID)
      .then((res) => {
        console.log(res["data"])
        toast.success(res["data"]["response"])
        fetchCategorys();
      })
      .catch((err) => {
        console.log(err)
        toast.error("Don't delete this category")
      })
  }

  return (
    <>
      <>
       <h1 className = "ms-5 text-success">Category</h1>
        <div className="float-end">
          <button className="btn btn-primary">
            <Link
              className="text-decoration-none text-white"
              to="/admin/create-category"
            >
              Thêm mới
            </Link>
          </button>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              categorys.map((category) => (
                <tr key={category.id}>
                <th scope="row">{category.id}</th>
                <td>{category.type}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => {deleteCategory(category.type)}}>
                    <Link
                      className="text-decoration-none text-white"
                    >
                      Xóa
                    </Link>
                  </button>
                </td>
              </tr>
              ))
            }
          </tbody>
        </table>
      </>
    </>
  );
};

export default AllCategorys;
