const ProjectUpdates = ({ projectUpdates }) => {
  // console.log("project in detailed view", project);
  return (
    <div className="p-3 shadow container mt-5 rounded">
      <h2 className="text-center mt-2 display-6">Project Updates</h2>
      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 container mx-auto mt-4 ">
        {projectUpdates?.length === 0 ? (
          <p className="text-danger fs-5 text-center mx-auto">
            No Project Updates for this project
          </p>
        ) : (
          <table className="table table-striped table-responsive table-bordered text-center">
            <thead className="bg-success text-white">
              <tr>
                <td>Project Manager</td>
                <td>Date</td>
                <td>Project Status Updates</td>
                <td>Schedule status</td>
                <td>Resourcing Status</td>
                <td>Quality Status</td>
                <td>Waiting For client</td>
              </tr>
            </thead>

            <tbody>
              {projectUpdates?.map((project, index) => (
                <tr key={index}>
                  <td>{project.projectManager}</td>
                  <td>{project.date?.split("T")[0]}</td>
                  <td>{project.projectStatusUpdate}</td>
                  <td>{project.scheduleStatus}</td>
                  <td>{project.resourcingStatus}</td>
                  <td>{project.qualityStatus}</td>
                  <td>{project.waitingForClient}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProjectUpdates;
