import Card from "antd/es/card/Card";
import React, { useEffect, useState } from "react";
import { Calendar } from "antd";
import dayjs from "dayjs";
import showtimeService from "../services/Api/ShowtimeService";
import { useParams } from "react-router-dom";
import filmService from "../services/Api/FilmService";
import { useDispatch } from "react-redux";
import { updateAll } from "../features/redux/FilmSlice";
import { useNavigate } from "react-router-dom";
import { getTimeBuy } from "../features/redux/UserSlice";

const SessionSelection = () => {
  const currentTime = new Date();
  const { filmId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [value, setValue] = useState(() => dayjs(currentTime));
  const [selectedValue, setSelectedValue] = useState(() => dayjs(currentTime));
  const [day, setDay] = useState("");
  const [filmName, setFilmName] = useState("");
  const [allShowtimes, setAllShowtimes] = useState([]);
  const [filteredShowtimes, setFilteredShowtimes] = useState([]);

  const convertToDateString = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const slide1 = (date) => date.slice(0, 10);
  const slide2 = (date) => date.slice(11, 16);

  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };

  const onPanelChange = (newValue) => {
    setValue(newValue);
  };


  // Lấy tên phim theo ID
  useEffect(() => {
    filmService
      .getOneFilm(filmId)
      .then((res) => {
        const name = res?.data?.response?.name;
        if (name) setFilmName(name);
      })
      .catch((e) => console.error(e));
  }, [filmId]);

  // Chuyển selectedValue => string ngày (yyyy-mm-dd)
  useEffect(() => {
    setDay(convertToDateString(selectedValue["$d"]));
  }, [selectedValue]);

  // Lấy tất cả showtime
  useEffect(() => {
    showtimeService
      .getAll()
      .then((res) => {
        setAllShowtimes(res.data.response || []);
      })
      .catch((e) => console.error(e));
  }, []);

  
  // Lọc danh sách showtime phù hợp theo ngày và tên phim
  useEffect(() => {
    if (!filmName || !day || allShowtimes.length === 0) return;
    
    const filtered = allShowtimes
      .filter(
        (item) =>
          item.film_id === filmName && slide1(item.start_time) === day
      )
      .sort((a, b) => b.start_time.localeCompare(a.start_time));

    setFilteredShowtimes(filtered);
  }, [filmName, day, allShowtimes]);


  const handleSubmit = (time, name) => {
    dispatch(updateAll({ time, theart_name: name }));
    dispatch(getTimeBuy({time_buy_ticket : day}))
    navigate('/home/detail-food')
  }
  

  return (
    <div className="container mb-4 d-flex">
      <Card className="card-left col-8" style={{ borderRadius: "15px" }}>
        <div style={{ margin: "30px 30px 0 30px" }}>
          {filteredShowtimes.length === 0 ? (
            <p>Không có suất chiếu cho ngày này.</p>
          ) : (
            filteredShowtimes.map((item, index) => (
              <div className="mt-list-widget mb-3" key={index}>
                <ul>
                  <li>
                    <a  className="text-decoration-none">
                      {item.theater_id}
                    </a>
                  </li>
                </ul>
                <div className="row ">
                  <div className="col-2 medium-3 small-12 large-3">
                    <div className="col">
                      <div className="session-item film-item">
                        <div className="time text-center" onClick = {() => handleSubmit(slide2(item.start_time),item.theater_id)}>
                          {slide2(item.start_time)}
                        </div>
                        <div className="meta text-center">
                          <span className="type">Phụ đề</span>
                          <span className="format">2D</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      <Calendar
        value={value}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
        fullscreen={false}
        className="ms-4"
      />
    </div>
  );
};

export default SessionSelection;
