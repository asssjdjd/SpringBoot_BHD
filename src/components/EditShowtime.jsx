import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useState, useEffect } from "react";
import showtimeService from "../services/Api/ShowtimeService";
import { toast } from "react-toastify";

const AllShowtimes = () => {
  const [showtimes, setShowtimes] = useState([]);

  const fetchShowtimes = async () => {
    showtimeService
      .getAll()
      .then((res) => {
        setShowtimes(res["data"]["response"]);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Cannot view showtimes right now");
      });
  };

  useEffect(() => {
    fetchShowtimes();
  }, []);

  const deleteShowtime = (showtimeId) => {
    showtimeService
      .delete(showtimeId)
      .then((res) => {
        console.log(res["data"]);
        toast.success("film deleted");
        fetchShowtimes(); // Refresh the list after deletion
      })
      .catch((err) => {
        console.log(err);
        toast.error("Cannot delete this showtime");
      });
  };

  return (
    <>
      <h1 className="ms-5 text-success">Showtimes</h1>
      <div className="float-end">
        <button className="btn btn-primary">
          <Link
            className="text-decoration-none text-white"
            to="/admin/create-showtime"
          >
            Thêm mới
          </Link>
        </button>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Start Time</th>
            <th scope="col">Theater ID</th>
            <th scope="col">Film ID</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {showtimes.map((showtime) => (
            <tr key={showtime.id}>
              <th scope="row">{showtime.id}</th>
              <td>{showtime.start_time}</td>
              <td>{showtime.theater_id}</td>
              <td>{showtime.film_id}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteShowtime(showtime.id)} // Assuming the ID is used for deletion
                >
                  <Link className="text-decoration-none text-white">
                    Xóa
                  </Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AllShowtimes;