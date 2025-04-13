
import { Outlet } from "react-router-dom";
import Navbar from "../layouts/NavAdmin";
import Banner from "../layouts/Banner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminPaste = () => {
  const role = localStorage.getItem("role")
  const authen = localStorage.getItem("authenticated")
  const navigate = useNavigate();
  
  useEffect(() => {
    if(role.includes("ADMIN") && authen) {
    // cho phep vao 
    toast.success("welcome to admin page")
  }else{
    navigate('/home')
  }
  },[role,authen])
  
    return (
        <>
            <Banner />
              <Navbar />
            {/* header */}
              <Outlet />
        </>
    )
}

export default AdminPaste;