import React from "react";
// import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import filmService from "../services/Api/FilmService";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


const AllFilms = () => {
//   const navigate = useNavigate();

//   const handleShowTime = (id) => {
//     navigate(`/admin/showtime/${id}`);
//   };

    const[films,setFilms] = useState([]);

    const fetchFilms = () => {
        filmService.getAll().then((res) => {
            // console.log(res["data"]["response"])
            setFilms(res["data"]["response"])
        })
        .catch((e) => {
            toast.error("Don't view film now")
            console.log(e)
        })
    }

    const deleteFilm = (filmID) => {
        filmService.delete(filmID)
        .then((res) => {
            // console.log(res["data"]["response"])
            fetchFilms()
            toast.success(res["data"]["response"]);
        })
        .catch((e) =>{
            console.log(e)
            toast.error("Film mustn't be delteted")
        })
    }


    useEffect(() => {
        fetchFilms()
    },[])
  

  return (
    <>
      <h1 className="text-success mt-3 ms-4 mb-3">Films</h1>

      <div>
        <div className="float-end mb-3">
          <button className="btn btn-primary">
            <a className="text-decoration-none text-white" href="create-film">
              Thêm mới
            </a>
          </button>
        </div>

        <table className="table table-hover">
          <thead >
            <tr >
              <th scope="col" className = "col">#</th>
              <th scope="col" className = "col">Name</th>
              <th scope="col" className = "col">Duration</th>
              <th scope="col" className = "col">Type</th>
              <th scope="col" className = "col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {films &&
              films.map((film) => (
                <tr key={film.id} >
                  <th scope="row">{film.id}</th>
                  <td>{film.name}</td>
                  <td>{film.duration}</td>
                  <td>{film.category_name}</td>
                  <td>
                    <button
                      className="btn btn-info me-2"
                    //   onClick={() => handleShowTime(film.id)}
                    >
                      Xem lịch chiếu
                    </button>
                    <button className="btn btn-primary me-2">
                      <a
                        className="text-decoration-none text-white"
                        href={`/admin/film/${film.id}`}
                      >
                        Sửa
                      </a>
                    </button>
                    <button className="btn btn-danger">
                      <a
                        className="text-decoration-none text-white"
                        onClick={() => {deleteFilm(film.id)}}
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

export default AllFilms;
