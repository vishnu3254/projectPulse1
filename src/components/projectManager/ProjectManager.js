import React from "react";
import GetProjects from "../getProjects/GetProjects";
import AddProjectUpdates from "./AddProjectUpdates";
import RaiseConcerns from "./RaiseConcerns";

const ProjectManager = () => {
  return (
    <div className="container">
      <div className="row container mt-5">
        {/* add project updates */}
        <div className="col-10 col-sm-4 col-md-4 mt-4">
          <AddProjectUpdates />
        </div>

        {/* raise concerns */}
        <div className="col-10 col-sm-4 col-md-4 mt-4">
          <RaiseConcerns />
        </div>
      </div>
      <div className="mt-5">
        <GetProjects
          url="http://localhost:4000/projectManager-api/projectManager/portfolioDashboard"
          specificUrl="http://localhost:4000/projectManager-api/projectManager/portfolioDashboard/project"
        />
      </div>
    </div>
  );
};

export default ProjectManager;
