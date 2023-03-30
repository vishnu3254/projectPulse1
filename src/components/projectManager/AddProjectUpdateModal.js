import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const AddProjectUpdateModal = ({ show, setShow }) => {
  let { userObj } = useSelector((state) => state.login);

  const handleClose = () => setShow(false);
  
  // useForm
  let {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm();

  // projects
  let [projects, setProjects] = useState([]);

  // function to get projects data
  const getProjects = async () => {
    let res = await axios.get(
      "http://localhost:4000/projectManager-api/projectManager/portfolioDashboard",
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    setProjects(res.data.payload);
  };

  // onSubmitForm
  const onSubmitForm = async (updateObj) => {
    updateObj.projectId = updateObj.projectId.split("-")[1];
    // console.log(updateObj);

    // make req to add project update
    let res = await axios.post(
      `http://localhost:4000/projectManager-api/projectManager/projectUpdates/project/${updateObj.projectId}`,
      updateObj,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    console.log(res.data);
    handleClose();
  };

  // useEffect to get the projects
  useEffect(() => {
    getProjects();
  }, []);
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Project Updates</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            {/* project */}
            <div className="mt-4">
              <label htmlFor="projectId">Project ID</label>
              <select className="form-control" {...register("projectId")}>
                <option>Select Project</option>
                {projects?.map((project, index) => (
                  <option key={index}>
                    {project.projectName}-{project.projectId}
                  </option>
                ))}
              </select>
            </div>

            {/* project manager */}
            <div className="mt-4">
              <label htmlFor="projectManager">Project Manager</label>
              <input
                type="text"
                value={`${userObj.username}-${userObj.userId}`}
                disabled
                className="form-control"
              />
            </div>

            

            {/* project status update / description */}
            <div className="mt-4">
              <label htmlFor="projectStatusUpdate">Description</label>
              <textarea
                type="text"
                className="form-control"
                rows={5}
                cols={10}
                {...register("projectStatusUpdate")}
              />
            </div>

            {/* schedule status */}
            <div className="mt-4">
              <label htmlFor="scheduleStatus">Schedule status</label>
              <select className="form-control" {...register("scheduleStatus")}>
                <option>Select schedule status</option>
                <option>Red</option>
                <option>Amber</option>
                <option>Green</option>
              </select>
            </div>

            {/* Resourcing status */}
            <div className="mt-4">
              <label htmlFor="resourcingStatus">Resourcing status</label>
              <select
                className="form-control"
                {...register("resourcingStatus")}
              >
                <option>Select Resourcing Status</option>
                <option>Red</option>
                <option>Amber</option>
                <option>Green</option>
              </select>
            </div>

            {/* Quality status */}
            <div className="mt-4">
              <label htmlFor="qualityStatus">Quality status</label>
              <select className="form-control" {...register("qualityStatus")}>
                <option>Select Quality Status</option>
                <option>Red</option>
                <option>Amber</option>
                <option>Green</option>
              </select>
            </div>

            {/* Waiting for client status */}
            <div className="mt-4">
              <label htmlFor="waitingForClient">Quality status</label>
              <select
                className="form-control"
                {...register("waitingForClient")}
              >
                <option>Select Waiting for status</option>
                <option>Yes</option>
                <option>NO</option>
              </select>
            </div>

            <button className="btn btn-success mt-4 d-block mx-auto">
              Add Project Update
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddProjectUpdateModal;
