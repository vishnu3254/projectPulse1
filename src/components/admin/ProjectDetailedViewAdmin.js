import { useParams } from "react-router-dom";
import GetSpecificProjectDetails from "../getSpecificProjectDetails/GetSpecificProjectDetails";

const ProjectDetailedViewAdmin = () => {
  // get projectId from url
  let { projectId } = useParams();
  return (
    <div>
      <GetSpecificProjectDetails url={`http://localhost:4000/admin-api/admin/portfolioDashboard/project/${projectId}`} />
    </div>
  );
};

export default ProjectDetailedViewAdmin;
