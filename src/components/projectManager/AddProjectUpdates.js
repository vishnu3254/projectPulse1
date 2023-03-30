import React, { useState } from "react";
import AddProjectUpdateModal from "./AddProjectUpdateModal";

const AddProjectUpdates = () => {
  // modals
  const [show, setShow] = useState(false);

  return (
    <div className="bg-success p-3  rounded">
      <h2 className="text-center display-6 fs-2 text-white">
        Add Project Updates
      </h2>
      <p className="text-center   text-white">
        Here you can add project updates{" "}
      </p>
      <button
        className="btn bg-white d-block mx-auto"
        onClick={() => setShow(true)}
      >
        Add Project Update
      </button>

      {show == true && <AddProjectUpdateModal show={show} setShow={setShow} />}
    </div>
  );
};

export default AddProjectUpdates;
