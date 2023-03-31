import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const TeamCompositionModal = (props) => {
  // state to store employees
  let [employees, setEmployees] = useState([]);
  // state for projects
  let [projects, setProjects] = useState([]);

  // // state for team assign status
  // let [teamAssign, setTeamAssign] = useState(false);

  let { setTeamAssign } = props;

  // useForm
  let {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // function to get employee data
  const getEmployeeData = async () => {
    let res = await axios.get("http://localhost:4000/employees");
    setEmployees(res.data.payload);
  };

  // function to get projects
  const getProjects = async () => {
    let res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    console.log(res.data.payload);
    setProjects(res.data.payload);
  };

  // use Effect to deal with api call
  useEffect(() => {
    getEmployeeData();
    getProjects();
  }, []);

  // url
  let { url } = props;
  // function to onTeamAssign
  const onTeamAssign = async (empObj) => {
    // format the empObj to required format we want only id from name-id for employee
    let [username, empId] = empObj.empId.split("-");
    empObj.empId = empId;
    empObj.username = username;
    empObj.projectId = empObj.projectId.split("-")[1];
    console.log(empObj);
    // make the request to assign team

    let res = await axios.post(
      "http://localhost:4000/gdo-api/gdo/projectTeam",
      empObj,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    console.log(res.data);
    if (res.data.message === "project assigned to employee") {
      setTeamAssign(true);
      setTimeout(() => {
        setTeamAssign(false);
      }, 4000);
    }
    // reset the form
    reset();
    // hide the modal
    props.onHide();
  };

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Assign Employee to a project
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* form to create project */}
          <form className="w-75 mx-auto" onSubmit={handleSubmit(onTeamAssign)}>
            {/* Employee */}
            <div className="">
              <label htmlFor="empId">Employee</label>
              <select
                className="form-control"
                {...register("empId", { required: true })}
              >
                <option>Select Employee</option>
                {/* render employees */}
                {employees?.map((employee, index) => (
                  <option key={index}>
                    {employee.empName}-{employee.empId}
                  </option>
                ))}
              </select>
              {errors.empId?.type === "required" && (
                <p className="text-danger">Employee is required</p>
              )}
            </div>

            {/* Project */}
            <div className="mt-2">
              <label htmlFor="projectId">Project</label>
              <select
                className="form-control"
                {...register("projectId", { required: true })}
              >
                <option>Select Project</option>
                {/* render all projects as options */}
                {projects?.map((project, index) => (
                  <option key={index}>
                    {project.projectName}-{project.projectId}
                  </option>
                ))}
              </select>
              {errors.projectId?.type === "required" && (
                <p className="text-danger">Client is required</p>
              )}
            </div>

            {/* role */}
            <div className="mt-2">
              <label htmlFor="role">Role</label>
              <select
                className="form-control"
                {...register("role", { required: true })}
              >
                <option>Select Role</option>
                <option>QA</option>
                <option>DEV</option>
                <option>PRODUCT</option>
                <option>MANAGEMENT</option>
                <option>DEVOPS</option>
              </select>
              {errors.role?.type === "required" && (
                <p className="text-danger">Role is required</p>
              )}
            </div>

            {/* statusOfEmployee */}
            <div className="mt-2">
              <label htmlFor="status">Status</label>
              <select
                className="form-control"
                {...register("status", { required: true })}
              >
                <option>Select status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
              {errors.statusOfProject?.type === "required" && (
                <p className="text-danger">status is required</p>
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

            {/* Billing status */}
            <div className="mt-2">
              <label htmlFor="billingStatus">BillingStatus</label>
              <select
                className="form-control"
                {...register("billingStatus", {
                  required: true,
                })}
              >
                <option>Select BillingStatus</option>
                <option>Billed</option>
                <option>Buffer</option>
              </select>
              {errors.billingStatus?.type === "required" && (
                <p className="text-danger">billingStatus is required</p>
              )}
            </div>

            {/* Exposed to customer or not */}
            <div className="mt-2">
              <label htmlFor="exposedToCustomer">ExposedToCustomer</label>
              <select
                className="form-control"
                {...register("exposedToCustomer", {
                  required: true,
                })}
              >
                <option>Select ExposedToCustomer</option>
                <option>Yes</option>
                <option>No</option>
              </select>
              {errors.exposedToCustomer?.type === "required" && (
                <p className="text-danger">ExposedToCustomer is required</p>
              )}
            </div>

            {/* allocationType */}
            <div className="mt-2">
              <label htmlFor="allocationType">AllocationType</label>
              <select
                className="form-control"
                {...register("allocationType", {
                  required: true,
                })}
              >
                <option>Select AllocationType</option>
                <option>Permanent</option>
                <option>Temporary</option>
              </select>
              {errors.allocationType?.type === "required" && (
                <p className="text-danger">AllocationType is required</p>
              )}
            </div>

            <button className="btn btn-success mt-2">Assign Employee</button>
          </form>
        </Modal.Body>
        {/* <Modal.Footer>
        <Button onClick={onAddProject}>Add Project</Button>
      </Modal.Footer> */}
      </Modal>
    </div>
  );
};

export default TeamCompositionModal;
