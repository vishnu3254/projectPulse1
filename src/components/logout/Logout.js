import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearState } from "../../redux/slices/loginSlice";
import "./Logout.css";

const Logout = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  // function to logout
  const onLogout = () => {
    dispatch(clearState());
    navigate("/");
  };

  return (
    <div>
      <p className="text-white pt-2 fs-5 log" onClick={onLogout}>
        Logout
      </p>
    </div>
  );
};

export default Logout;
