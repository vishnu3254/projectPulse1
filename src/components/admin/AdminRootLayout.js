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

      {/* create project
      <div>
        <CreateProject
          projectCreated={projectCreated}
          setProjectCreated={setProjectCreated}
        />
      </div>

      <div style={{ minHeight: "85vh" }}>
        <GetProjects
          url="http://localhost:4000/admin-api/admin/portfolioDashboard"
          projectCreated={projectCreated}
          setProjectCreated={setProjectCreated}
        />
      </div> */}

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
