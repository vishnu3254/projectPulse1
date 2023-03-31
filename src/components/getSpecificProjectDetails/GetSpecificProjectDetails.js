import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import ConcernIndicator from "./ConcernIndicator";
import DetailedProjectView from "./DetailedProjectView";
import ProjectConcerns from "./ProjectConcerns";
import ProjectFitness from "./ProjectFitness";
import ProjectUpdates from "./ProjectUpdates";
import ResourceRequests from "./ResourceRequests";
import TeamDetails from "./TeamDetails";
import TeamSize from "./TeamSize";

const GetSpecificProjectDetails = () => {
  // state to store the projectDetailedView
  let [project, setProject] = useState({});
  let [teamSize, setTeamSize] = useState(0);
  let [concernIndicator, setConcernIndicator] = useState(0);
  let [projectFitness, setProjectFitness] = useState("");
  let [projectUpdates, setProjectUpdates] = useState([]);
  let [resourceRequests, setResourceRequests] = useState([]);

  // get login user from store
  let { userObj } = useSelector((state) => state.login);

  // useParams
  let { projectId } = useParams();
  // console.log("project Id", projectId);
  // url from useLocation

  let { state } = useLocation();
  // console.log("url is ", state);
  // function to get detailed view
  const getDetailedView = async () => {
    let res = await axios.get(state, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    console.log(res.data.payload);
    if (res.data.payload) {
      setProject(res.data.payload);
      setTeamSize(res.data.teamSize);
      setConcernIndicator(res.data.concernIndicator);
      setProjectFitness(res.data.projectFitness);
      setProjectUpdates(res.data.projectUpdates);

      // console.log("project in get specifi ", project);
    }
  };

  // function to get resource requests
  const getResourceRequests = async () => {
    let res = await axios.get(
      `http://localhost:4000/admin-api/admin/resourceRequest/project/${projectId}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    console.log("resoruce requests", res.data);
    if (res.data.message === "All Resource requests") {
      setResourceRequests(res.data.payload);
    }
  };

  useEffect(() => {
    getDetailedView();
    getResourceRequests();
  }, []);
  return (
    <div className="container">
      {project === "undefined" ? (
        <div class="spinner-border text-primary d-block mx-auto" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div>
          <div className="row mx-auto mt-4 justify-content-center">
            <div className="col-8 col-sm-6 col-md-4 mt-4">
              <TeamSize teamSize={teamSize} />
            </div>
            <div className="col-8 col-sm-6 col-md-4 mt-4">
              <ConcernIndicator concernIndicator={concernIndicator} />
            </div>
            <div className="col-8 col-sm-6 col-md-4 mt-4">
              <ProjectFitness projectFitness={projectFitness} />
            </div>
          </div>

          {/* deteild project view */}
          <div>
            <DetailedProjectView project={project} />
          </div>

          {/* team details */}
          <div>
            <TeamDetails project={project} />
          </div>

          {/* project Updates */}
          <div>
            <ProjectUpdates projectUpdates={projectUpdates} />
          </div>

          {/* project concerns */}
          <div className="mb-5 pb-5">
            <ProjectConcerns projectConcerns={project.projectConcerns} />
          </div>

          {/* raise resource reqeusts */}
          {userObj.role === "admin" && (
            <div className="mb-5 pb-5">
              <ResourceRequests resourceRequests={resourceRequests} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GetSpecificProjectDetails;
