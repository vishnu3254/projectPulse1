import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import GetUsers from "./GetUsers";

const SuperAdmin = () => {
  let { userObj } = useSelector((state) => state.login);

  let navigate = useNavigate();

  useEffect(() => {
    // if there is no token then redirect to login component
    if (sessionStorage.getItem("token") === null) {
      console.log("token not found");
      navigate("/");
    }
  }, []);

  return (
    <div>
      {/* header */}
      <div>
        <Header />
      </div>

      {/*outlet  */}
      <div style={{ minHeight: "85vh" }}>
        <GetUsers />
      </div>

      {/* footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default SuperAdmin;
