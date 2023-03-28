import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  // state
  let [otpStatus, setOtpStatus] = useState();
  let [email, setEmail] = useState("");
  let [checkOtp, setCheckOtp] = useState("");
  let [resetPassword, setResetPassword] = useState("");

  // navigate
  let navigate = useNavigate();

  // useform
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // onotpsubmit
  const onOtpSubmit = async (userCredentials) => {
    console.log(userCredentials);
    let res = await axios.post(
      `http://localhost:4000/user-api/user/${email}/resetPassword`,
      userCredentials
    );
    console.log("res in onopt submit", res.data);
    if (res.data.message === "Invalid OTP") {
      setCheckOtp(res.data.message);
    } else {
      setResetPassword("Password Reset Successfully");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  // onSubmitForm
  const onSubmitForm = async (userEmail) => {
    setEmail(userEmail.email);

    let res = await axios.post(
      "http://localhost:4000/user-api/user/forgotPassword",
      userEmail
    );
    console.log(res.data);
    if (res.data.message === "Otp is sent to your email...") {
      setOtpStatus(true);
    }
  };

  return (
    <div className="row container">
      <h2 className="display-6 text-center">Forgot password</h2>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="col-7 col-sm-5 col-md-5 mx-auto">
          <input
            type="email"
            {...register("email", { required: true })}
            id="email"
            placeholder="Enter email"
            className="form-control"
          />
          {errors.email?.type === "required" && (
            <p className="text-danger">Email is required</p>
          )}
        </div>
        <button className="btn btn-success d-block mx-auto mt-4">
          Click to get otp
        </button>
      </form>

      {/* conditional rendering */}

      {otpStatus === true && (
        <div className="row container">
          <form
            className="col-7 col-sm-5 col-md-5 mx-auto"
            onSubmit={handleSubmit(onOtpSubmit)}
          >
            {/* otp */}
            <div className="mt-4">
              <label htmlFor="otp">Enter Otp</label>
              <input
                type="text"
                placeholder="otp"
                {...register("otp", { required: true })}
                className="form-control"
              />
              {errors.otp?.type === "required" && (
                <p className="text-danger">*Otp is required</p>
              )}
            </div>
            {checkOtp && <p className="text-danger">{checkOtp}</p>}
            {/* password */}
            <div className="mt-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="password"
                {...register("password", { required: true })}
                className="form-control"
              />
              {errors.password?.type === "required" && (
                <p className="text-danger">*password is required</p>
              )}
            </div>
            <button className="btn btn-success d-block mx-auto mt-3">
              Change password
            </button>
          </form>
          {resetPassword && (
            <p className="text-success text-center">
              {resetPassword} and redirecting to login page....
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
