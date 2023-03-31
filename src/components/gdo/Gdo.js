import React, { useState } from "react";
import GetProjects from "../getProjects/GetProjects";
import RaiseResourceRequest from "./RaiseResourceRequest";
import TeamAssign from "./TeamAssign";

const Gdo = () => {
  // state for team assign status state level up
  let [teamAssign, setTeamAssign] = useState(false);

  return (
    <div className="">
      <div className="row mt-5">
        <div className="col-7 col-sm-5 col-md-4 mx-auto mt-4 h-100">
          <TeamAssign
            url="http://localhost:4000/gdo-api/gdo/portfolioDashboard"
            teamAssign={teamAssign}
            setTeamAssign={setTeamAssign}
          />
        </div>

        <div className="col-7 col-sm-5 col-md-4 mx-auto mt-4 h-100">
          <RaiseResourceRequest url="http://localhost:4000/gdo-api/gdo/portfolioDashboard" />
        </div>
      </div>

      {teamAssign && (
        <p className="text-center text-success display-6 fs-4">
          Employee assigned to project Successfully
        </p>
      )}

      <div className="mt-5 mb-5 pb-5">
        <GetProjects
          url="http://localhost:4000/gdo-api/gdo/portfolioDashboard"
          specificUrl="http://localhost:4000/gdo-api/gdo/portfolioDashboard/project"
        />
      </div>
    </div>
  );
};

export default Gdo;
