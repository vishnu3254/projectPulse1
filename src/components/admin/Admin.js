import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import GetProjects from "../getProjects/GetProjects";
import Header from "../header/Header";
import CreateProject from "./CreateProject";

const Admin = () => {
  // for re-rendering of projects level up of state from createProjectModal component
  let [projectCreated, setProjectCreated] = useState(false);

  return (
    <div>
      {/* header */}
      <div>
        <Header />
      </div>

      {/* create project */}
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
      </div>

      {/* footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Admin;
