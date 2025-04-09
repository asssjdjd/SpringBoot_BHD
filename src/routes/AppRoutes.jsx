
import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterLogin
 from "../pages/Register-Login";
 import AdminPaste from "../pages/AdminPage"
 import AllCategorys from "../components/EditCategorys";
import CreateCategory from "../components/CreateCategory";
import AllFilms from "../components/EditFilms";
import CreateFilm from "../components/CreateFilm";
import UpdateFilm from "../components/UpdateFilm";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/register-login" element={<RegisterLogin />} />
      <Route path = "/admin" element= {<AdminPaste />} >
          <Route path = "category" element = {<AllCategorys />}> </Route>
          <Route path = "create-category" element = {<CreateCategory />}/>
          <Route path = 'film' element = { <AllFilms/>} />
          <Route path = "create-film" element = {<CreateFilm />}/>
          <Route path="film/:filmId" element={<UpdateFilm />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;