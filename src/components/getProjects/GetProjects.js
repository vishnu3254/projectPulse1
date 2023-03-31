import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateProjectModal from "../admin/CreateProjectModal";

const GetProjects = ({
  url,
  projectCreated,
  projectUpdated,
  specificUrl,
  setProjectUpdated,
  setProjectDeleted,
  projectDeleted,
}) => {
  // console.log(url);

  let [projects, setProjects] = useState([]);

  // selected project
  let [project, setProject] = useState({});

  // loading
  let [loading, setLoading] = useState(true);

  //get login user
  let { userObj } = useSelector((state) => state.login);

  // function to get projects
  const getAllProjects = async () => {
    let res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    setProjects(res.data.payload);
    // console.log("res", res.data.payload);
    // console.log("length", res.data.payload?.length);
    setLoading(false);
  };

  // for modal invoking
  let [modalShow, setModalShow] = useState(false);

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
  }, [projectCreated, projectUpdated, projectDeleted]);

  // function to editProjectDetails
  const editProject = (project, projectId) => {
    console.log("selected project id", project);
    setProject(project);
    setModalShow(true);
  };

  // function to delete Projects
  const deleteProject = async (projectId) => {
    let res = await axios.delete(
      `http://localhost:4000/admin-api/admin/portfolioDashboard/project/${projectId}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );

    console.log(res.data);
    if (res.data.message === "project is deleted") {
      setProjectDeleted(true);

      setTimeout(() => {
        setProjectDeleted(false);
      }, 3000);
    }
  };
  return (
    <div className="container">
      {loading === true ? (
        <div class="spinner-border text-primary d-block mx-auto" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      ) : projects === undefined ? (
        <p className="text-center text-danger fs-2">
          No Projects available for you
        </p>
      ) : (
        <div>
          <h2 className="display-5 text-center">All Projects</h2>
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
                {userObj.role === "admin" && <td>Edit</td>}
                {userObj.role === "admin" && <td>Delete</td>}
              </tr>
            </thead>
            <tbody>
              {/* render all the projects */}
              {projects?.map((project, index) => (
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
                  {/* edit */}
                  {userObj.role === "admin" && (
                    <td>
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => editProject(project, project.projectId)}
                      >
                        Edit
                      </button>
                    </td>
                  )}
                  {/* delete */}
                  {userObj.role === "admin" && (
                    <td>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => deleteProject(project.projectId)}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

                  {/* modal for creating project */}
      <CreateProjectModal
        show={modalShow}
        setShow={setModalShow}
        project={project}
        onHide={() => setModalShow(false)}
        setProjectUpdated={setProjectUpdated}
      />
    </div>
  );
};

export default GetProjects;
