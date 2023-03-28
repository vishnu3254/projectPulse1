import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";

const SuperAdmin = () => {
  let { userObj } = useSelector((state) => state.login);

  return (
    <div>
      {/* header */}
      <div>
        <Header />
      </div>

      {/*  menu*/}
      <div></div>
      {/*outlet  */}
      <div style={{ minHeight: "80vh" }}>
        <Outlet />
      </div>
      {/* footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default SuperAdmin;
