import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./asset/css/main.css";
import { useState } from "react";
import authService from "../services/Api/AuthService";
import { toast } from "react-toastify";
import { useCreateUser } from "../hook/UserCreateRequest";
import userAPI from "../services/Api/UserService";
import Footer from "../layouts/Footer";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import Banner from "../layouts/Banner";
import Navbar from "../layouts/Navbar";

const RegisterLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { values, handleChange} = useCreateUser({
    username: '',
    phonenumber: '',
    dob: '',
    password: ''
  });

 const handleUsername = (e) => {
    setUsername(e.target.value)
 }

 const handlePassWord = (e) => {
    setPassword(e.target.value)
 }
  
  const handleLogout = (e) => {
    e.preventDefault();
    authService.login(username, password)
    .then((response) => {
    
      const response_data = response.data // Handle successful login response
    //   console.log(response_data)
    //   const code = response_data[]
      const code = response_data["code"]
      if(code == 1000) {
        const token = response_data["response"]["token"];
        const auth = response_data["response"]["authenticated"]
        //   console.log(token)
        //   console.log(auth)
        localStorage.setItem("token",token)
        localStorage.setItem("authenticated",auth)
        
        toast.success("Success Login")
      }
    })
    .catch((error) => {
      console.error("Login failed:", error);
      toast.error("Please check your information")
    });
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    // console.log(JSON.stringify(values))
    userAPI.create(JSON.stringify(values))
    .then((response) => {
        console.log(response.data)
        var username = response.data["response"]["username"];
        toast.success("User : " + username + " has been created success!")
    })
    .catch((error) => {
        // console.error(error["response"]["data"])
       const err = error["response"]["data"]["message"];
       toast.error(err)
    })
  }


  return (
    <>
      <div className="wrapper">
        {/* banner */}
        <Banner />
        {/* navbar */}
        <Navbar />

        {/* main */}
        <hr
          style={{
            border: "1px solid #72be43",
            marginLeft: "5%",
            marginRight: "5%",
            marginTop: "0px",
          }}
        />

        <div className="main mt-3">
          <div className="container-fluid d-flex row" style={{ width: "100%" }}>
            <div className="form-register col-5">

                <Login 
                handleUsername = {handleUsername}
                handlePassWord = {handlePassWord}
                handleLogout = {handleLogout}
               />
            </div>

            <div className="form-login col-7">
               <Register 
                 handleChange = {handleChange}
                 handleCreateUser = {handleCreateUser}
               />
            </div>
          </div>
        </div>

        {/* footer */}
        <Footer />
        
      </div>
    </>
  );
};

export default RegisterLogin;
