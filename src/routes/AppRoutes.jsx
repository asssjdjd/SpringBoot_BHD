
import React from "react";
// import { lazy,Suspense } from "react";

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
import Home from "../pages/Home";
import AboutUs from "../components/AboutUs";
import NowShowingpage from "../pages/Now-Showing";
import ShoppingFood from "../pages/Shoping-food";
import Promotion from "../pages/PromotionPage";
import FilmDetail from "../components/DetailFilm";
import OLComboCouple from "../components/QLComboCouple";
import Cart from "../pages/ShoppingCart";



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/register-login" element={<RegisterLogin />} />
      
      <Route path = "/cart" element  = {<Cart />}></Route>

      <Route path = "/detail-food" element  = {<OLComboCouple />}></Route>
      <Route path = "/about-us" element = {<AboutUs />}></Route>
      <Route path = "/lich-chieu" element = {<NowShowingpage />} ></Route>
      <Route path = "/cua-hang" element = {<ShoppingFood />}></Route>
      <Route path= "/promotion" element = {<Promotion />}></Route>
      <Route path = '/home/detail-film/:filmId' element = {<FilmDetail />} ></Route>\

      <Route path = "/home" element = {<Home/>}>
          <Route path = "detail-food" element  = {<OLComboCouple />}></Route>
      </Route>

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

      <Route path = "*" element = {<RegisterLogin />}></Route>
    </Routes>
    
  );
};

export default AppRoutes;