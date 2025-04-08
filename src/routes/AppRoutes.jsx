
import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterLogin
 from "../pages/Register-Login";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegisterLogin />} />
    </Routes>
  );
};

export default AppRoutes;