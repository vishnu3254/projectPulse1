import UserRegistration from "../userRegistration/UserRegistration";
import "./HomePage.css";
const HomePage = () => {
  return (
    <div className="container row ">
      <div className=" container col-sm-8 col-md-7 col-lg-7 mt-5 bg-success w-50 rounded">
        <UserRegistration />
      </div>
    </div>
  );
};

export default HomePage;
