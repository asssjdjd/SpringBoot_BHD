import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import filmService from "../services/Api/FilmService";
import NavigationBar from "../layouts/NavbarHome";
import Banner from "../layouts/Banner";
import Footer from "../layouts/Footer";
import SessionSelection from "./SessionSelected";


const FilmDetail = () => {
  const { filmId } = useParams();
  const [film, setFilm] = useState({});
  

//   console.log(filmId);
  useEffect(()=>{
    filmService
    .getOneFilm(filmId)
    .then((res) => {
      // console.log(res["data"]["response"])
      setFilm(res["data"]["response"]);
    })
    .catch((err) => {
      console.log(err);
    });
  },[filmId])
  

  // Date formatting logic
  const formatDate = (dateTime) => {
    if (!dateTime) return "";
    const dateParts = dateTime.split(" ")[0]; // Get date part
    const [year, month, day] = dateParts.split("-");
    return `${day}/${month}/${year}`;
  };

  const formattedDate = formatDate(film?.launch_date);

  return (
    <>
      <Banner />
      <NavigationBar />
      <div className="container" style={{ width: "100vw" }}>
        {/* Film Details Row */}
        <div className="row" style={{ display: "flex" }}>
          {/* Film Image */}
          <div
            className="col-4"
            style={{ flex: "0 0 33.33%", padding: "15px" }}
          >
            <img
              src={film?.images}
              alt={film?.name}
              style={{ width: "100%", height: "auto", borderRadius: "20px" }}
            />
          </div>

          {/* Film Information */}
          <div
            className="col-5"
            style={{ flex: "0 0 41.67%", padding: "15px" }}
          >
            <h3 style={{ color: "#72be43" }}>{film?.name}</h3>
            <br />
            <p>{film?.description}</p>
            <br />
            <p>
              Phân loại:{" "}
              <button
                style={{
                  color: "white",
                  backgroundColor: "red",
                  padding: "2px 8px",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                T13
              </button>{" "}
              Phim phổ biến đến người xem từ 13 tuổi trở lên
            </p>
            <p>
              Định dạng:{" "}
              <button
                style={{
                  color: "white",
                  backgroundColor: "#72be43",
                  padding: "2px 8px",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                2D
              </button>
            </p>
            <p>
              Đạo diễn:{" "}
              <span style={{ color: "#72be43" }}>{film?.name_director}</span>
            </p>
            <p>
              Diễn viên:{" "}
              <span style={{ color: "#72be43" }}>{film?.name_actor}</span>
            </p>
            <p>
              Thể loại:{" "}
              <span style={{ color: "#72be43" }}>{film?.type_name}</span>
            </p>
            {film?.launch_date && <p>Ngày khởi chiếu: {formattedDate}</p>}
            <p>Thời lượng: {film?.duration} phút</p>
            <p>Ngôn ngữ: Phụ đề</p>
          </div>

          {/* Additional Image */}
          <div className="col-3" style={{ flex: "0 0 25%", padding: "15px" }}>
            <img
              src="https://www.bhdstar.vn/wp-content/uploads/2025/01/Doc-01.jpg"
              alt="Additional image"
              style={{ width: "100%", height: "auto", borderRadius: "20px" }}
            />
          </div>
        </div>

        {/* Video Trailer */}
        {film?.video_link && film?.video_link !== "no" && (
          <div style={{ marginTop: "40px", textAlign: "center" }}>
            <iframe
              width="1300"
              height="730"
              src={film.video_link}
              title={film.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
      <SessionSelection/>
      <Footer />
    </>
  );
};

// Placeholder Discount Component
const Discount = () => {
  return <div>{/* Include your discount component content here */}</div>;
};

export default FilmDetail;
