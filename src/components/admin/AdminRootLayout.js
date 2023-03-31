import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../footer/Footer";
import GetProjects from "../getProjects/GetProjects";
import Header from "../header/Header";
import CreateProject from "./CreateProject";

const AdminRootLayout = () => {
  let navigate = useNavigate();

  useEffect(() => {
    // if there is no token then redirect to login component
    if (sessionStorage.getItem("token") === null) {
      console.log("token not found");
      navigate("/");
    }
  }, []);

  return (
    <div>
      {/* header */}
      <div>
        <Header />
      </div>

      <div style={{ minHeight: "85vh" }}>
        <Outlet />
      </div>

      {/* footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default AdminRootLayout;
