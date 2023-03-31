import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import GetProjects from "../getProjects/GetProjects";
import Header from "../header/Header";
import CreateProject from "./CreateProject";

const AdminRootLayout = () => {
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
