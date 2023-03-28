import { useSelector } from "react-redux";
import Logout from "../logout/Logout";
import "./Header.css";

const Header = () => {
  let { userObj } = useSelector((state) => state.login);

  return (
    <div className=" bg-dark">
      <div className="d-flex justify-content-end align-items-center me-2">
        <Logout />
        <p className="text-white p-2 fs-5">{userObj.email}</p>
      </div>
    </div>
  );
};

export default Header;
