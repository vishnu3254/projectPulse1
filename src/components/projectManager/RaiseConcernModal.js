import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
const RaiseConcernModal = ({ show, setShow }) => {
  let { userObj } = useSelector((state) => state.login);

  const handleClose = () => setShow(false);

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

  // useForm
  let {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm();

  // onSubmitForm
  const onSubmitForm = async (concernObj) => {
    concernObj.projectId = concernObj.projectId?.split("-")[1];
    concernObj.projectManager = userObj.userId;
    console.log(concernObj);

    // make request to insert data
    let res = await axios.post(
      "http://localhost:4000/projectManager-api/projectManager/projectConcern",
      concernObj,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    console.log(res.data);
    if (res.data.message === "Project Concern Raised....") {
      console.log("concern raised successfully");
    }

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
          <Modal.Title>Raise Concerns</Modal.Title>
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

            {/* Concern description */}
            <div className="mt-4">
              <label htmlFor="concernDescription">Concern Description</label>
              <textarea
                type="text"
                className="form-control"
                rows={5}
                cols={10}
                {...register("concernDescription")}
              />
            </div>

            {/* Date */}
            <div className="mt-4">
              <label htmlFor="onDate">Date</label>
              <input
                type="date"
                className="form-control"
                {...register("onDate")}
              />
            </div>

            {/* Severity */}
            <div className="mt-4">
              <label htmlFor="severity">Severity</label>
              <select className="form-control" {...register("severity")}>
                <option>Select Severity</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            {/* raisedInternallyOrNot */}
            <div className="mt-4">
              <label htmlFor="raisedInternallyOrNot">
                Raised Internally Or Not
              </label>
              <select
                className="form-control"
                {...register("raisedInternallyOrNot")}
              >
                <option>Select RaisedInternallyOrNot</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            {/* statusOfConcern */}
            <div className="mt-4">
              <label htmlFor="statusOfConcern">Status Of Concern</label>
              <select className="form-control" {...register("statusOfConcern")}>
                <option>Select Status Of Concern</option>
                <option>Raised</option>
                <option>Remediation Suggested</option>
                <option>Mitigated</option>
              </select>
            </div>

            {/* concernMitigatedOnDate */}
            <div className="mt-4">
              <label htmlFor="concernMitigatedOnDate">
                Concern Mitigated Date
              </label>
              <input
                type="date"
                className="form-control"
                {...register("concernMitigatedOnDate")}
              />
            </div>

            <button className="btn btn-success mt-4 d-block mx-auto">
              Raise Concern
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

export default RaiseConcernModal;
