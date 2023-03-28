import React from "react";
import CreateProjectModal from "./CreateProjectModal";

const CreateProject = ({ projectCreated, setProjectCreated }) => {
  // for modal
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div className="container row ms-3 ">
      <div className="bg-success p-4  ms-5 ps-5 mt-4 text-white  rounded col-3 col-sm-3 ">
        <h1 className="display-6 fs-1">Create Project</h1>
        <p>Here you can create new Project</p>
        <button
          className="btn bg-white text-success fs-5 d-block "
          onClick={() => setModalShow(true)}
        >
          create project
        </button>

        {/* render modal */}
        <CreateProjectModal
          setProjectCreated={setProjectCreated}
          projectCreated={projectCreated}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
    </div>
  );
};

export default CreateProject;
