import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GetProjects from "../getProjects/GetProjects";
import AddProjectUpdates from "./AddProjectUpdates";
import RaiseConcerns from "./RaiseConcerns";

const ProjectManager = () => {
  let navigate = useNavigate();

  useEffect(() => {
    // if there is no token then redirect to login component
    if (sessionStorage.getItem("token") === null) {
      console.log("token not found");
      navigate("/");
    }
  }, []);
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
