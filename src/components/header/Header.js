import { useSelector } from "react-redux";

const Header = () => {
  let { userObj } = useSelector((state) => state.login);
  console.log("UserObj in header", userObj);
  return (
    <div className=" bg-success">
      <div className="justify-content-end p-2 align-content-end">
        <p className="text-white">{userObj.email}</p>
      </div>
    </div>
  );
};

export default Header;
