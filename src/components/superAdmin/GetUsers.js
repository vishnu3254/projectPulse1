import axios from "axios";
import React, { useEffect, useState } from "react";
import SuperAdminModal from "../modals/SuperAdminModal";

const GetUsers = () => {
  // state to store the users
  let [users, setUsers] = useState([]);

  // particuluar use
  let [user, setUser] = useState({});

  // modals
  const [show, setShow] = useState(false);

  // deleted or not
  let [deleted, setDeleted] = useState(false);

  const getAllUsers = async () => {
    // get the token
    let token = sessionStorage.getItem("token");
    let res = await axios.get("http://localhost:4000/superAdmin-api", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUsers(res.data.payload);
    // console.log("All users ", res.data.payload);
  };

  // function to edit user
  const editUser = (ind) => {
    users.map((user, index) => {
      if (index == ind) {
        // console.log("selected user is ", user);
        setShow(true);
        setUser(user);
      }
    });
  };

  // function to delete
  const deleteUser = async (userId) => {
    // console.log("deleted UserID", userId);

    let res = await axios.delete(
      `http://localhost:4000/superAdmin-api/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    // After deleting get the users again to render the new data after deleting
    // console.log("After deleting", usersData);
    if (res.data.message === "User deleted Successfully") {
      setDeleted(true);
      // await getAllUsers();

      let res = await axios.get("http://localhost:4000/superAdmin-api", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      setUsers(res.data.payload);
    }
  };

  // useEffect
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      <h1 className="display-4 text-center">All users</h1>
      {/* table to display the data */}
      {deleted && (
        <p className="text-danger text-center">user deleted Successfully</p>
      )}
      <table className="table table-responsive table-striped table-bordered text-center container">
        <thead className="bg-dark text-white fs-4 display-6 p-2">
          <tr>
            <td>UserID</td>
            <td>Username</td>
            <td>Email</td>
            <td>Role</td>
            <td>Edit</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.userId}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role == null ? "No role Assigned" : user.role}</td>
              <td>
                <button
                  className="btn btn-outline-info"
                  onClick={() => editUser(index)}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => deleteUser(user.userId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* show modal conditionally */}
      {show == true && (
        <SuperAdminModal user={user} show={show} setShow={setShow} />
      )}
    </div>
  );
};

export default GetUsers;
