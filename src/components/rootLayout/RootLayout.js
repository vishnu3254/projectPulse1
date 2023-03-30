import React from "react";
import { Outlet } from "react-router-dom";
import Description from "../description/Description";

const RootLayout = () => {
  return (
    <div className=" row m-auto">
      <div className="container ps-5 col-9 col-sm-4 col-md-5 ps-2 m-auto">
        <Description />
      </div>
      <div className="container col-10 col-sm-8 col-md-6 mx-auto mt-5">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
