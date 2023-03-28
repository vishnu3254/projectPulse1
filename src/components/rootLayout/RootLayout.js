import React from "react";
import { Outlet } from "react-router-dom";
import Description from "../description/Description";

const RootLayout = () => {
  return (
    <div className="row">
      <div className="col-sm-4 ms-5 my-auto">
        <Description />
      </div>
      <div className="col-sm-7 mt-5 ">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
