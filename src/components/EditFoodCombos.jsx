import React from "react";
// import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import foodComboService from "../services/Api/FoodComboService";


const AllFoods = () => {
//   const navigate = useNavigate();

//   const handleShowTime = (id) => {
//     navigate(`/admin/showtime/${id}`);
//   };

    const[foods,setfoods] = useState([]);

    const fetchfoods = () => {
        foodComboService.getAll().then((res) => {
            // console.log(res["data"]["response"])
            setfoods(res["data"]["response"])
        })
        .catch((e) => {
            toast.error("Don't view food now")
            console.log(e)
        })
    }

    const deletefood = (foodID) => {
        foodComboService.delete(foodID)
        .then((res) => {
            // console.log(res["data"]["response"])
            fetchfoods()
            toast.success("food has been deleted");
            console.log(res)
        })
        .catch((e) =>{
            console.log(e)
            toast.error("food mustn't be delteted")
        })
    }


    useEffect(() => {
        fetchfoods()
    },[])
  

  return (
    <>
      <h1 className="text-success mt-3 ms-4 mb-3">foods</h1>

      <div>
        <div className="float-end mb-3">
          <button className="btn btn-primary">
            <a className="text-decoration-none text-white" href="create-food">
              Thêm mới
            </a>
          </button>
        </div>

        <table className="table table-hover">
          <thead >
            <tr >
              <th scope="col" className = "col">#</th>
              <th scope="col" className = "col">Name</th>
              <th scope="col" className = "col">Price</th>
              <th scope="col" className = "col">Images</th>
              <th scope="col" className = "col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods &&
              foods.map((food) => (
                <tr key={food.id} >
                  <th scope="row">{food.id}</th>
                  <td>{food.name}</td>
                  <td>{food.price}</td>
                  <td>{food.images}</td>
                  <td> 
                    <button className="btn btn-danger">
                      <a
                        className="text-decoration-none text-white"
                        onClick={() => {deletefood(food.id)}}
                      >
                        Xóa
                      </a>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllFoods;
