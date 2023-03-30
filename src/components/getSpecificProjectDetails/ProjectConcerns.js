import React from "react";

const ProjectConcerns = ({ projectConcerns }) => {
  console.log("project concerns", projectConcerns);
  return (
    <div className="p-3 shadow container mt-5 rounded">
      <h2 className="text-center mt-2 display-6">Project Concerns</h2>
      {projectConcerns?.length == 0 ? (
        <p className="text-danger fs-5 text-center">
          No Concerns available for this project
        </p>
      ) : (
        <table className="table table-striped table-responsive table-bordered text-center">
          <thead className="bg-success text-white">
            <tr>
              <td>Concern Description</td>
              <td>Concern Raised by</td>
              <td>Date</td>
              <td>Severity</td>
              <td>Raised Internally or not</td>
              <td> Concern Status</td>
              <td>Concern Mitigated OnDate</td>
            </tr>
          </thead>
          <tbody>
            {projectConcerns?.map((project, index) => (
              <tr key={index}>
                <td>{project.concernDescription}</td>
                <td>{project.concernRaisedBy}</td>
                <td>{project.onDate?.split("T")[0]}</td>
                <td>{project.severity}</td>
                <td>{project.raisedInternallyOrNot}</td>
                <td>{project.statusOfConcern}</td>
                <td>{project.concernMitigatedOnDate?.split("T")[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProjectConcerns;
