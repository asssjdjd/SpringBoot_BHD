import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import theaterService from "../services/Api/TheaterService";
import { toast } from "react-toastify";


const AllTheater = () => {

  const [theaters,setTheaters] = useState([])

  const fetchTheater = () => {
    theaterService.getAll()
    .then((res) =>{
        // console.log(res["data"]["response"])
        setTheaters(res["data"]["response"])
    })
    .catch((e) => {
        console.log(e)
        toast.error("Don't view theater now!")
    })
  }

  useEffect(() => {
    fetchTheater()
  },[])

  const deleteTheater = (theateId) => {
    theaterService.delete(theateId)
    .then((res) => {
        // console.log(res["data"]["response"])
        fetchTheater()
        toast.success(res["data"]["response"]);
    })
    .catch((e) =>{
        console.log(e)
        toast.error("Film mustn't be delteted")
    })
}

 
  return (
    <div>
      <h1 className="text-success mt-3 ms-4 mb-3">Theaters</h1>
      <div className="float-end mb-3">
        <Link to="/admin/create-theater" className="btn btn-primary text-white text-decoration-none">
          Thêm mới
        </Link>
      </div>

      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {theaters.map((theater) => (
            <tr key={theater.id}>
              <th scope="row">{theater.id}</th>
              <td>{theater.name}</td>
              <td>{theater.email}</td>
              <td>{(theater.address)}</td>
              <td>
                <Link
                  to={`/admin/theater/${theater.id}`}
                  className="btn btn-primary text-white text-decoration-none me-2"
                >
                  Sửa
                </Link>
                <Link
                  onClick={() => {deleteTheater(theater.id)}}
                  className="btn btn-danger text-white text-decoration-none"
                >
                  Xóa
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllTheater;
