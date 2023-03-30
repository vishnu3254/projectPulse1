import React, { useState } from "react";
import RaiseConcernModal from "./RaiseConcernModal";

const RaiseConcerns = () => {
  let [show, setShow] = useState([]);

  return (
    <div>
      <div className="bg-success p-3  rounded">
        <h2 className="text-center display-6 fs-2 text-white">
          Raise Concerns
        </h2>
        <p className="text-center   text-white">Here you can raise concerns</p>
        <button
          className="btn bg-white d-block mx-auto"
          onClick={() => setShow(true)}
        >
          Raise Concern
        </button>
      </div>

      {show === true && <RaiseConcernModal show={show} setShow={setShow} />}
    </div>
  );
};

export default RaiseConcerns;
