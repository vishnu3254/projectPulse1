import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";

const SuperAdminModal = ({ show, setShow, user }) => {
  const handleClose = () => setShow(false);

  // useForm
  let {
    formState: { errors },
    register,
    getValues,
  } = useForm();
  console.log("user in modal", user);

  //onSubmitForm
  const onSaveChanges = async () => {
    let userObj = getValues();
    // console.log("userObj", userObj);
    user.role = userObj.assignRole;

    let res = await axios.put(
      "http://localhost:4000/superAdmin-api/user/role",
      user,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );

    // console.log(res.data);
    handleClose();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <h2>Edit User</h2>
            {/* userId */}
            <div className="mt-4">
              <label htmlFor="userId">UserId</label>
              <input
                type="text"
                id="userId"
                value={user.userId}
                disabled
                className="form-control"
              />
            </div>

            {/* username */}
            <div className="mt-4">
              <label htmlFor="userId">Username</label>
              <input
                type="text"
                value={user.username}
                disabled
                id="username"
                className="form-control"
              />
            </div>

            {/* email */}
            <div className="mt-4">
              <label htmlFor="userId">Email</label>
              <input
                type="email"
                id="email"
                value={user.email}
                disabled
                className="form-control"
              />
            </div>

            {/* Assign role */}
            <div className="mt-4">
              <label htmlFor="assignRole">Assign Role</label>
              <select
                defaultValue={user.role ? user.role : "Select Role"}
                className="form-control"
                {...register("assignRole", { required: true })}
                id="assignRole"
              >
                <option>Select Role</option>
                <option>admin</option>
                <option>gdoHead</option>
                <option>projectManager</option>
                <option>hrManager</option>
              </select>
              {errors.assignRole?.type === "required" && (
                <p className="text-danger text-center">
                  *Select Role is required
                </p>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SuperAdminModal;
