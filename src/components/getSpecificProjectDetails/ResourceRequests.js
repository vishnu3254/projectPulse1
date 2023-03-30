import React from "react";

const ResourceRequests = ({ resourceRequests }) => {
  return (
    <div className="p-3 shadow container mt-5 rounded">
      <h2 className="text-center mt-2 display-6">Resource Requests</h2>
      {resourceRequests?.length == 0 ? (
        <p className="text-danger fs-5 text-center">
          No Resource requests available for this project
        </p>
      ) : (
        <table className="table table-striped table-responsive table-bordered text-center">
          <thead className="bg-success text-white">
            <tr>
              <td>GDO ID</td>
              <td>Project ID</td>
              <td>Request Description</td>
            </tr>
          </thead>
          <tbody>
            {resourceRequests?.map((requests, index) => (
              <tr key={index}>
                <td>{requests.gdoId}</td>
                <td>{requests.projectId}</td>
                <td>{requests.requestDescription}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ResourceRequests;
