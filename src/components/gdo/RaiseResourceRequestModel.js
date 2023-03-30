import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Toast from "react-bootstrap/Toast";

const RaiseResourceRequestModel = ({ show, setShow, url }) => {
  // get the login user
  let { userObj } = useSelector((state) => state.login);

  const handleClose = () => setShow(false);

  // state to store project data
  let [projects, setProjects] = useState([]);

  // useForm
  let {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // function to get projects
  const getProjects = async () => {
    let res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });

    // console.log(res.data);
    setProjects(res.data.payload);
  };

  // onSubmitForm
  const onSubmitForm = async (resourceObj) => {
    resourceObj.projectId = resourceObj.projectId.split("-")[1];
    resourceObj.gdoId = userObj.userId;
    console.log(resourceObj);

    // make a call to raise resource request
    let res = await axios.post(
      "http://localhost:4000/gdo-api/gdo/resourcingRequest",
      resourceObj,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    console.log(res.data.payload);
    if (res.data.message === "resourcing request raised") {
      // for toasting
      <Toast>
        <Toast.Body>Resource request raised</Toast.Body>
      </Toast>;
    }

    reset();
    handleClose();
  };

  // useEffect to deal with api call
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
          <Modal.Title>Raise Resource request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            {/* userId */}
            <div className="mt-4">
              <label htmlFor="projectId">Project </label>
              <select
                className="form-control"
                {...register("projectId", { required: true })}
              >
                <option>Select Project</option>
                {projects.map((project, index) => (
                  <option key={index}>
                    {project.projectName}-{project.projectId}
                  </option>
                ))}
              </select>
            </div>

            {/* gdoId */}
            <div className="mt-4">
              <label htmlFor="gdoId">GDO</label>
              <input
                type="text"
                {...register("gdoId")}
                className="form-control"
                value={`${userObj.username}-${userObj.userId}`}
                disabled
              />
            </div>

            {/* desctiption */}
            <div className="mt-4">
              <label htmlFor="requestDescription">Request Description</label>
              <textarea
                rows="4"
                cols="10"
                {...register("requestDescription")}
                className="form-control"
              />
            </div>
            <button className="btn btn-success mt-3">
              Raise Resource Request
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

export default RaiseResourceRequestModel;
