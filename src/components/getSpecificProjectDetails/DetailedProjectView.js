import React from "react";

const DetailedProjectView = ({ project }) => {
  console.log("project in detailed view", project);
  return (
    <div className="p-3 shadow container mt-4 rounded">
      <h2 className="text-center mt-4 display-6">Detailed view</h2>
      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 container mx-auto mt-4 ">
        <p>Project ID : {project.projectId}</p>
        <p>Project Name : {project.projectName}</p>
        <p>GDO ID : {project.gdoId}</p>
        <p>Client : {project.client}</p>
        <p>Project Manager: {project.projectManager}</p>
        <p>HR Manager : {project.hrManager}</p>
        <p>Client Account Manager : {project.clientAccountManager}</p>
        <p>Status of Project : {project.statusOfProject}</p>
        <p>
          Start Date : {project.startDate && project.startDate.split("T")[0]}
        </p>
        <p>End Date : {project.endDate && project.endDate.split("T")[0]}</p>
        <p>
          Overall Project Fitness Indicator :{" "}
          {project.overAllProjectFitnessIndicator}
        </p>
        <p>Domain : {project.domain}</p>
        <p>Type Of Project : {project.typeOfProject}</p>
        <p>Status : {project.statusOfProject}</p>
      </div>
    </div>
  );
};

export default DetailedProjectView;
