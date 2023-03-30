import React from "react";

const ConcernIndicator = ({ concernIndicator }) => {
  return (
    <div className="bg-info p-3 text-white container rounded">
      <h2 className="text-center display-6">Concern Indicator</h2>
      <h3 className="text-center display-6">{concernIndicator}</h3>
    </div>
  );
};

export default ConcernIndicator;
