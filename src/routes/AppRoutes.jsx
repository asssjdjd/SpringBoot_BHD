
import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterLogin from "../pages/Register-Login";
import AdminPaste from "../pages/AdminPage"
import AllCategorys from "../components/EditCategorys";
import CreateCategory from "../components/CreateCategory";
import AllFilms from "../components/EditFilms";
import CreateFilm from "../components/CreateFilm";
import UpdateFilm from "../components/UpdateFilm";
import AllTheater from "../components/EditTheater";
import CreateTheater from "../components/CreateTheater";
import UpdateTheater from "../components/UpdateTheater";
import AllUsers from "../components/ViewAllUser";
import AllShowtimes from "../components/EditShowtime";
import CreateShowtime from "../components/CreateShowtime";
import CreateFoodCombo from "../components/CreateFoodCombo";
import AllFoods from "../components/EditFoodCombos";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/register-login" element={<RegisterLogin />} />


      <Route path = "/admin" element= {<AdminPaste />} >
          <Route path = "user" element = {<AllUsers />}> </Route>
          <Route path = "category" element = {<AllCategorys />}> </Route>
          <Route path = "create-category" element = {<CreateCategory />}/>
          <Route path = 'film' element = { <AllFilms/>} />
          <Route path = "create-film" element = {<CreateFilm />}/>
          <Route path = "film/:filmId" element={<UpdateFilm />} />
          <Route path = "theater" element = {<AllTheater />}> </Route>
          <Route path = "create-theater" element = {<CreateTheater />}/>
          <Route path = "theater/:theaterId" element = {< UpdateTheater/>} />
          <Route path = "showtime" element = {<AllShowtimes />}> </Route>
          <Route path = "create-showtime" element = {<CreateShowtime />}/>
          <Route path = "food-combo" element = {<AllFoods/>}> </Route>
          <Route path = "create-food" element = {<CreateFoodCombo />}/>
      </Route>

    </Routes>
  );
};

export default AppRoutes;