import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GetProjects = ({ url, projectCreated, specificUrl }) => {
  // console.log(url);

  let [projects, setProjects] = useState([]);
  console.log("url of project manager", url);

  const getAllProjects = async () => {
    let res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    console.log(res.data);
    setProjects(res.data.payload);
  };

  // console.log("specific url", specificUrl);
  // navigate
  let navigate = useNavigate();

  // navigateToDetailedView
  const navigateToDetailedView = (projectId) => {
    // console.log(projectId);
    navigate(`project/${projectId}`, { state: specificUrl + `/${projectId}` });
  };

  // useEffect
  useEffect(() => {
    getAllProjects();
  }, [projectCreated]);

  return (
    <div className="container">
      <h2 className="display-5 text-center">All Projects</h2>
      {/* render the projects */}
      <table className="table table-responsive table-bordered table-striped text-center">
        <thead className="bg-success text-white">
          <tr>
            <td>Project Name</td>
            <td>Client</td>
            <td>Client Account Manager</td>
            <td>OverAllProjectFitnessIndicator</td>
            <td>Start Date</td>
            <td>End Date</td>
            <td>Status</td>
            <td>Detailed View</td>
          </tr>
        </thead>
        <tbody>
          {/* render all the projects */}
          {projects.map((project, index) => (
            <tr key={index}>
              <td>{project.projectName}</td>
              <td>{project.client}</td>
              <td>{project.clientAccountManager}</td>
              <td>{project.overAllProjectFitnessIndicator}</td>
              <td>{project.startDate.split("T")[0]}</td>
              <td>{project.endDate.split("T")[0]}</td>
              <td>{project.statusOfProject}</td>
              <td>
                <button
                  className="btn btn-outline-info"
                  onClick={() => navigateToDetailedView(project.projectId)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetProjects;
