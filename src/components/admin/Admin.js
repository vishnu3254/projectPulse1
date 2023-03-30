import React, { useState } from "react";
import GetProjects from "../getProjects/GetProjects";
import CreateProject from "./CreateProject";

const Admin = () => {
  // for re-rendering of projects level up of state from createProjectModal component
  let [projectCreated, setProjectCreated] = useState(false);

  return (
    <div>
      {/* create project */}
      <div>
        <CreateProject
          projectCreated={projectCreated}
          setProjectCreated={setProjectCreated}
        />
      </div>

      {projectCreated && (
        <p className="text-success text-center display-6 fs-2">
          Project Created Successfully
        </p>
      )}
      <div style={{ minHeight: "85vh" }}>
        <GetProjects
          url="http://localhost:4000/admin-api/admin/portfolioDashboard"
          specificUrl="http://localhost:4000/admin-api/admin/portfolioDashboard/project"
          projectCreated={projectCreated}
          setProjectCreated={setProjectCreated}
        />
      </div>
    </div>
  );
};

export default Admin;
