// import react-hook-form
import { useForm } from "react-hook-form";
import loginSlice, { userLogin } from "../../redux/slices/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

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
    // navigate to specific pages
    if (userObj.role === "superAdmin" && sessionStorage.getItem("token")) {
      navigate("/super-admin");
    } else if (userObj.role === "admin" && sessionStorage.getItem("token")) {
      navigate("/admin");
    } else if (userObj.role === "gdoHead" && sessionStorage.getItem("token")) {
      navigate("/gdo");
    } else if (
      userObj.role === "projectManager" &&
      sessionStorage.getItem("token")
    ) {
      navigate("/project-manager");
    } else if (userObj.role === null) {
      toast.info("You are not assigned any role please contact super admin");
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
    <div className="p-4">
      {userObj.role === null && <ToastContainer />}
      {errorMessage && (
        <p className="text-danger text-center">{errorMessage}</p>
      )}
      <div className="row mx-auto justify-content-center">
        <form
          className="p-4 bg-success rounded col-12 col-sm-12 col-md-9 col-lg-8 "
          onSubmit={handleSubmit(onSubmitForm)}
        >
          <h2 className="text-center text-white display-4">LOGIN</h2>
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
    </div>
  );
};

export default Login;
