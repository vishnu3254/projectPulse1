import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";

const ProjectManagerRootLayout = () => {
  return (
    <div>
      {/* header */}
      <div>
        <Header />
      </div>

      {/* outlet */}
      <div style={{ minHeight: "85vh" }}>
        <Outlet />
      </div>

      {/* footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ProjectManagerRootLayout;
