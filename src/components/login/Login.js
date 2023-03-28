// import react-hook-form
import { useForm } from "react-hook-form";
import loginSlice, { userLogin } from "../../redux/slices/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  // get the login state
  let { userObj, errorMessage, status } = useSelector((state) => state.login);

  console.log(userObj);

  // navigate
  let navigate = useNavigate();

  // useForm
  let {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // dispatch
  let dispatch = useDispatch();

  // useEffect
  useEffect(() => {
    // if user is superAdmin
    if (userObj.role === "superAdmin") {
      navigate("/super-admin");
    }
  }, [userObj]);

  // onSubmitForm
  const onSubmitForm = (userCredentials) => {
    //console.log(userObj);
    // actionObj
    let actionObj = userLogin(userCredentials);
    // dispatch
    dispatch(actionObj);
  };

  return (
    <div className="container row w-100 p-4">
      {errorMessage && (
        <p className="text-danger text-center">{errorMessage}</p>
      )}
      <form
        className="col-5 col-sm-5 col-md-5 col-lg-5 mx-auto w-75 p-4 bg-success rounded "
        onSubmit={handleSubmit(onSubmitForm)}
      >
        <h2 className="text-center text-white display-4">Login</h2>
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

        {/* dont have an account */}
        <div className="d-flex align-items-center">
          <p className="text-white mt-3">Don't have an account?</p>
          <ul className="nav ms-3">
            <li>
              <NavLink
                className="text-white"
                style={{ textDecoration: "none" }}
                to="register"
              >
                click here to Register
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Forgot password */}
        <div>
          <ul className="nav mt-1">
            <li className="nav-item">
              <NavLink
                className="text-white fs-6"
                style={{ textDecoration: "none" }}
                to="/forgot-password"
              >
                Forgot password?
              </NavLink>
            </li>
          </ul>
        </div>
        <button className="btn bg-white mt-4 d-block mx-auto w-25">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;