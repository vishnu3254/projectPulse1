import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";

import { useForm } from "react-hook-form";

const CreateProjectModal = (props) => {
  // state to store gdo , projectmanager, hr manager
  let [gdos, setGdos] = useState([]);
  let [projectManagers, setProjectManagers] = useState([]);
  let [hrManagers, setHrManagers] = useState([]);

  // project Created or not status state
  // let [projectCreated, setProjectCreated] = useState(false);
  let { setProjectCreated } = props;

  // useForm
  let {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // onAddProject
  const onAddProject = async (projectObj) => {
    // let projectObj = getValues();

    // here the name and id is splitted becasue only id is required for backend to process the data
    projectObj.gdoId = projectObj.gdoId.split("-")[1];
    projectObj.hrManager = projectObj.hrManager.split("-")[1];
    projectObj.projectManager = projectObj.projectManager.split("-")[1];
    console.log("project Object", projectObj);

    // made the request to create project
    let res = await axios.post(
      "http://localhost:4000/admin-api/admin/project",
      projectObj,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );

    console.log(res.data);
    if (res.data.message === "Project Created") {
      setProjectCreated(true);
      // after some time make it false because of rendering the content only some time
      setTimeout(() => {
        setProjectCreated(false);
      }, 4000);
    }
    reset();
    // hide the modal
    props.onHide();
  };

  // function to get gdo Data
  const getGdoData = async () => {
    let res = await axios.get("http://localhost:4000/gdo");
    // console.log(res.data.payload);
    setGdos(res.data.payload);
  };

  // function to get Project Manager Data
  const getProjectManagerData = async () => {
    let res = await axios.get("http://localhost:4000/projectManager");
    setProjectManagers(res.data.payload);
  };

  // function to get hrManager details
  const getHrManagerDetails = async () => {
    let res = await axios.get("http://localhost:4000/hrManager");
    setHrManagers(res.data.payload);
  };

  // useEffect to get the data from api to display hr,gdo and project manager is select options
  useEffect(() => {
    getGdoData();
    getProjectManagerData();
    getHrManagerDetails();
  }, []);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create project
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* form to create project */}
        <form className="w-75 mx-auto" onSubmit={handleSubmit(onAddProject)}>
          {/* project Name */}
          <div className="">
            <label htmlFor="projectName">Project Name</label>
            <input
              type="text"
              className="form-control"
              {...register("projectName", { required: true })}
              placeholder="project name"
            />
            {errors.projectName?.type === "required" && (
              <p className="text-danger">Project name is required</p>
            )}
          </div>

          {/* Client */}
          <div className="mt-2">
            <label htmlFor="client">Client</label>
            <input
              type="text"
              className="form-control"
              {...register("client", { required: true })}
              placeholder="client Id"
            />
            {errors.client?.type === "required" && (
              <p className="text-danger">Client is required</p>
            )}
          </div>

          {/* GDO */}
          <div className="mt-2">
            <label htmlFor="gdoId">GDO</label>
            <select
              className="form-control"
              {...register("gdoId", { required: true })}
            >
              <option>Select GDO</option>
              {/* iterte gdo */}
              {gdos.map((gdo, index) => (
                <option key={index}>
                  {gdo.username}-{gdo.userId}
                </option>
              ))}
            </select>
            {errors.gdoId?.type === "required" && (
              <p className="text-danger">GDO is required</p>
            )}
          </div>

          {/* Project manager */}
          <div className="mt-2">
            <label htmlFor="projectManager">Project Manager</label>
            <select
              className="form-control"
              {...register("projectManager", { required: true })}
            >
              <option>Select projectManager</option>
              {/* render project manager details as options */}
              {projectManagers.map((projectManager, index) => (
                <option key={index}>
                  {projectManager.username}-{projectManager.userId}
                </option>
              ))}
            </select>
            {errors.projectManager?.type === "required" && (
              <p className="text-danger">projectManager is required</p>
            )}
          </div>

          {/* HR manager */}
          <div className="mt-2">
            <label htmlFor="hrManager">HR Manager</label>
            <select
              className="form-control"
              {...register("hrManager", { required: true })}
            >
              <option>Select hrManager</option>
              {/* render the hr manager data as optiosn*/}
              {hrManagers.map((hrManager, index) => (
                <option key={index}>
                  {hrManager.username}-{hrManager.userId}
                </option>
              ))}
            </select>
            {errors.hrManager?.type === "required" && (
              <p className="text-danger">hrManager is required</p>
            )}
          </div>

          {/* client account manager */}
          <div className="mt-2">
            <label htmlFor="clientAccountManager">ClientAccountManager</label>
            <input
              type="text"
              placeholder="client account manager name"
              {...register("clientAccountManager", { required: true })}
              className="form-control"
            />
            {errors.clientAccountManager?.type === "required" && (
              <p className="text-danger">clientAccountManager is required</p>
            )}
          </div>

          {/* statusOfProject */}
          <div className="mt-2">
            <label htmlFor="statusOfProject">StatusOfProject</label>
            <select
              className="form-control"
              {...register("statusOfProject", { required: true })}
            >
              <option>Select statusOfProject</option>
              <option>Sales</option>
              <option>Pre-sales</option>
              <option>Client Sign Off</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>Paused</option>
              <option>Deferred</option>
            </select>
            {errors.statusOfProject?.type === "required" && (
              <p className="text-danger">statusOfProject is required</p>
            )}
          </div>

          {/* Start Date */}
          <div className="mt-2">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              className="form-control"
              {...register("startDate", { required: true })}
            />
            {errors.startDate?.type === "required" && (
              <p className="text-danger">startDate is required</p>
            )}
          </div>

          {/* End Date */}
          <div className="mt-2">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              className="form-control"
              {...register("endDate", { required: true })}
            />
            {errors.endDate?.type === "required" && (
              <p className="text-danger">endDate is required</p>
            )}
          </div>

          {/* overAllProjectFitnessIndicator */}
          <div className="mt-2">
            <label htmlFor="overAllProjectFitnessIndicator">
              OverAllProjectFitnessIndicator
            </label>
            <select
              className="form-control"
              {...register("overAllProjectFitnessIndicator", {
                required: true,
              })}
            >
              <option>Select projectFitnessIndicator</option>
              <option>Red</option>
              <option>Amber</option>
              <option>Green</option>
            </select>
            {errors.overAllProjectFitnessIndicator?.type === "required" && (
              <p className="text-danger">
                overAllProjectFitnessIndicator is required
              </p>
            )}
          </div>

          {/* Domain */}
          <div className="mt-2">
            <label htmlFor="domain">Domain</label>
            <input
              type="text"
              className="form-control"
              {...register("domain", { required: true })}
              placeholder="Domain"
            />
            {errors.domain?.type === "required" && (
              <p className="text-danger">Domain is required</p>
            )}
          </div>

          {/* Type of project */}
          <div className="mt-2">
            <label htmlFor="typeOfProject">Type Of Project</label>
            <select className="form-control" {...register("typeOfProject")}>
              <option>Select Type of Project</option>
              <option>Development</option>
              <option>Devops</option>
              <option>Test Automation</option>
              <option>Performance Testing</option>
              <option>Security</option>
              <option>Sustenance Engineering</option>
              <option>Mobility</option>
              <option>Storage</option>
            </select>
            {errors.typeOfProject?.type === "required" && (
              <p className="text-danger">TypeOfProject is required</p>
            )}
          </div>

          <button className="btn btn-success mt-2">Add Project</button>
        </form>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={onAddProject}>Add Project</Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default CreateProjectModal;
