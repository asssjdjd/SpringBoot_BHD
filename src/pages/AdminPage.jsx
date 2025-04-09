
import { Outlet } from "react-router-dom";
import Navbar from "../layouts/NavAdmin";
import Banner from "../layouts/Banner";

const AdminPaste = () => {
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