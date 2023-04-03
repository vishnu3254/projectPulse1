import React, { useEffect, useState } from "react";
import GetProjects from "../getProjects/GetProjects";
import CreateProject from "./CreateProject";

const Admin = () => {
  // for re-rendering of projects level up of state from createProjectModal component
  let [projectCreated, setProjectCreated] = useState(false);
  let [projectUpdated, setProjectUpdated] = useState(false);
  let [projectDeleted, setProjectDeleted] = useState(false);

  return (
    <div className="container">
      {/* create project */}
      <div className="col-5 col-sm-6 col-md-3 col-lg-3 ms-5 mt-4">
        <CreateProject
          projectCreated={projectCreated}
          setProjectCreated={setProjectCreated}
        />
      </div>

      {/* project created */}
      {projectCreated && (
        <p className="text-success text-center display-6 fs-2 mt-4">
          Project Created Successfully
        </p>
      )}

      {/* project Updated */}
      {projectUpdated && (
        <p className="text-success text-center display fs-2 mt-4">
          Project Updated successfully
        </p>
      )}

      {/* project deleted */}
      {projectDeleted && (
        <p className="text-success text-center display fs-2 mt-4">
          Project Deleted successfully
        </p>
      )}

      <div style={{ minHeight: "85vh" }} className="mt-5 ">
        <GetProjects
          url="http://localhost:4000/admin-api/admin/portfolioDashboard"
          specificUrl="http://localhost:4000/admin-api/admin/portfolioDashboard/project"
          projectCreated={projectCreated}
          setProjectCreated={setProjectCreated}
          setProjectUpdated={setProjectUpdated}
          projectUpdated={projectUpdated}
          projectDeleted={projectDeleted}
          setProjectDeleted={setProjectDeleted}
        />
      </div>
    </div>
  );
};

export default Admin;
