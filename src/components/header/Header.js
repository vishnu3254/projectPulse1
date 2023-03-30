import { useSelector } from "react-redux";
import Logout from "../logout/Logout";
import "./Header.css";

const Header = () => {
  let { userObj } = useSelector((state) => state.login);

  return (
    <div className="bg-dark d-flex justify-content-between p-1">
      <div>
        <p className="text-white mt-3 ms-2">WAL PULSE</p>
      </div>
      <div className="d-flex align-items-center pt-1">
        <Logout />
        <p className="text-white p-2 fs-5">{userObj.email}</p>
      </div>
    </div>
  );
};

// d-flex justify-content-end align-items-center me-2
export default Header;
