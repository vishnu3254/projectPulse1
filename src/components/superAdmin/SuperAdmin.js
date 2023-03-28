import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import GetUsers from "./GetUsers";

const SuperAdmin = () => {
  let { userObj } = useSelector((state) => state.login);

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
