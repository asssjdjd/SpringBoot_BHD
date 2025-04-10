import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import showtimeService from "../services/Api/ShowtimeService"; // Adjusted service for showtimes
import theaterService from "../services/Api/TheaterService";
import filmService from "../services/Api/FilmService";

const CreateShowtime = () => {
  const [theaters, setTheaters] = useState([]);
  const [films, setFilms] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [theaterId, setTheaterId] = useState("");
  const [filmId, setFilmId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    theaterService.getAll().then((res) => {
      // console.log(res["data"]["response"])
      setTheaters(res["data"]["response"]);
    });
  }, []);

  useEffect(() => {
    filmService.getAll().then((res) => {
      // console.log(res["data"]["response"])
      setFilms(res["data"]["response"]);
    });
  }, []);

  const handleSubmitCreateShowtime = (e) => {
    e.preventDefault();
    const showtimeData = {
      start_time: startTime,
      theater_id: theaterId,
      film_id: filmId,
    };

    showtimeService
      .create(showtimeData)
      .then((res) => {
        console.log(res);
        toast.success(
          `Showtime at ${res["data"]["response"]["start_time"]} has been created`
        );
        navigate("/admin/showtime");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to create showtime");
      });
  };

  const handleGoBack = () => {
    navigate("/admin/showtime");
  };

  const handleChangeTheater = (e) => {
    setTheaterId(e.target.value)
  }

  const handleChangeFilm = (e) => {
    setFilmId(e.target.value)
  }

  return (
    <>
      <form
        onSubmit={handleSubmitCreateShowtime}
        className="p-3 border rounded bg-light shadow-sm"
      >
        <div className="mb-3">
          <label htmlFor="startTime" className="form-label">
            Start Time
          </label>
          <input
            id="startTime"
            type="date" // Using date input for start_time
            className="form-control"
            placeholder="Select start time (e.g., 2025-04-04)"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
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
          <label>Chọn film:</label>
          <select
            className="form-select w-25"
            onChange={handleChangeFilm}
            required
          >
            <option value="">-- các film --</option>
            {films.map((film) => (
              <option key={film.id} value={film.name}>
                {film.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Tạo lịch chiếu
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

export default CreateShowtime;
