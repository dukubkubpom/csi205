import { Outlet } from "react-router-dom";
import './AppLayout.css'

import Appheader from "../components/Appheader";
import Appnavbar from "../components/AppNavbar";
import Appfooter from "../components/Appfooter";

const AppLayout = ({products, carts, setToken}) => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center min-vh-100 text-center"
      style={{ padding: "20px" }}
    >
      <div className="">
        <Appheader />
      </div>
      <div className="p-3">
        <Appnavbar products={products} carts={carts} setToken={setToken} />
      </div>
      <div
        className="border border-3 rounded-4 p-3 border-dark p-3 w-100"
        style={{
          maxWidth: "1000px",
          overflow: "auto",
        }}
      >
        <Outlet />
      </div>
      <div className="p-3">
        <Appfooter />
      </div>

    </div>
  );
};

export default AppLayout;