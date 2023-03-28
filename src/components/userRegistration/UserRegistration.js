// import react-hook-form
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import "./UserRegistration.css";
import { useNavigate } from "react-router-dom";

const UserRegistration = () => {
  // state to check the registeration
  let [registered, setRegsitered] = useState("");

  // useForm
  let {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // navigate
  let navigate = useNavigate();

  // onSubmitForm
  const onSubmitForm = async (userObj) => {
    console.log(userObj);
    let res = await axios.post("http://localhost:4000/user-api/user", userObj);
    console.log(res.data);
    setRegsitered(res.data.message);
    if (res.data.message == "User Registered") {
      navigate("/login");
    }
  };

  return (
    <div className="container row">
      {/* render the registration success */}
      {registered && (
        <p className="text-success text-center fs-4">{registered}</p>
      )}
      <form
        className="col-5 col-sm-5 col-md-5 col-lg-5 mx-auto w-75 p-4 bg-success rounded mt-5 "
        onSubmit={handleSubmit(onSubmitForm)}
      >
        <h2 className="text-center text-white mt-4">UserRegistration</h2>
        <div className="mt-4">
          {/* username */}
          <label htmlFor="username" className="form-label text-white">
            Username
          </label>
          <input
            type="text"
            placeholder="username"
            {...register("username", { required: true, minLength: 4 })}
            className="form-control"
          />
          {errors.username?.type === "required" && (
            <p className="text-warning">*Username is required</p>
          )}
        </div>

        {/* Email */}
        <div className="mt-4">
          <label htmlFor="email" className="form-label text-white">
            Email
          </label>
          <input
            type="email"
            placeholder="email"
            {...register("email", { required: true })}
            className="form-control"
          />
          {errors.email?.type === "required" && (
            <p className="text-warning">*Email is required</p>
          )}
        </div>

        {/* Password */}
        <div className="mt-4">
          <label htmlFor="password" className="form-label text-white">
            Password
          </label>
          <input
            type="password"
            placeholder="password"
            {...register("password", { required: true })}
            className="form-control"
          />
          {errors.password?.type === "required" && (
            <p className="text-warning">*Password is required</p>
          )}
        </div>

        {/* already have an account */}
        <div className="d-flex align-items-center ">
          <p className="text-white mt-3 ">Already have an account?</p>
          <ul className="nav">
            <li>
              <NavLink className="text-white ms-3" to="/">
                click here to login
              </NavLink>
            </li>
          </ul>
        </div>

        <button className="btn bg-white mt-4 d-block mx-auto w-25">
          Register
        </button>
      </form>
    </div>
  );
};

export default UserRegistration;
