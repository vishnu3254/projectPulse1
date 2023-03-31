import React from "react";
import TeamCompositionModal from "./TeamCompositionModal";

const TeamAssign = ({ url, teamAssign, setTeamAssign }) => {
  // for modal
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div>
      <div className=" container ">
        <div className="bg-success p-4  text-white  rounded">
          <h1 className="display-6 fs-1">Team Composition</h1>
          <p>Here you can Assign Employees to a project</p>
          <button
            className="btn bg-white text-success fs-5 d-block "
            onClick={() => setModalShow(true)}
          >
            Assign Employees
          </button>

          {/* render modal */}
          <TeamCompositionModal
            teamAssign={teamAssign}
            setTeamAssign={setTeamAssign}
            url={url}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default TeamAssign;
