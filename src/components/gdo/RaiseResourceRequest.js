import React, { useState } from "react";
import RaiseResourceRequestModel from "./RaiseResourceRequestModel";

const RaiseResourceRequest = ({ url }) => {
  // modals
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="container row ms-3 ">
        <div className="bg-success p-4  ms-5 ps-5 mt-4 text-white  rounded col-8 col-sm-8 ">
          <h1 className="display-6 fs-1">Raise resource request</h1>
          <p>Here you can Raise resource request for a project</p>
          <button
            className="btn bg-white text-success fs-5 d-block "
            onClick={() => setShow(true)}
          >
            Raise Resource
          </button>
        </div>
      </div>

      {/* show modal conditionally */}
      {show == true && (
        <RaiseResourceRequestModel url={url} show={show} setShow={setShow} />
      )}
    </div>
  );
};

export default RaiseResourceRequest;
