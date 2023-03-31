import { useSelector } from "react-redux";
import Logout from "../logout/Logout";
import "./Header.css";

const Header = () => {
  let { userObj } = useSelector((state) => state.login);

  return (
    <div className="bg-dark d-flex justify-content-between p-1">
      <div className="d-flex align-items-center">
        <img src="wal-logo.svg" width="50px" height="50px" />
        <p className="text-white mt-3 ms-2">WAL PULSE</p>
      </div>
      <div className="d-flex align-items-center">
        <Logout />
        <p className="text-white pt-2 fs-5 ms-4">{userObj.email}</p>
      </div>
    </div>
  );
};

// d-flex justify-content-end align-items-center me-2
export default Header;
