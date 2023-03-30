import React from "react";

const ProjectFitness = ({ projectFitness }) => {
  return (
    <div className="bg-info p-3 text-white  container rounded">
      <h2 className="text-center display-6">Project Fitness</h2>
      <h3 className="text-center display-6">{projectFitness}</h3>
    </div>
  );
};

export default ProjectFitness;
