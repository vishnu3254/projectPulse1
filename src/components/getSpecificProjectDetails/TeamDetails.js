import React from "react";

const TeamDetails = ({ project }) => {
  return (
    <div className="p-3 shadow container mt-5 rounded">
      <h2 className="text-center  display-6">Team Details</h2>
      <div>
        {/* conditional render */}
        {project.employeeProjectDetails?.length == 0 ? (
          <p className="text-danger fs-5 text-center">
            No employee is assigned to this project
          </p>
        ) : (
          <table className="table table-striped table-responsive table-bordered text-center">
            <thead className="bg-success text-white">
              <tr>
                <td>Emp Id</td>
                <td>Username</td>
                <td>Role</td>
                <td>Start Date</td>
                <td>End Date</td>
                <td>Status</td>
                <td>Billing Status</td>
                <td>Exposed To Customer</td>
                <td>Allocation Type</td>
              </tr>
            </thead>
            <tbody>
              {/* render the data in table */}
              {project.employeeProjectDetails?.map((employee, index) => (
                <tr key={index}>
                  <td>{employee.empId}</td>
                  <td>{employee.username}</td>
                  <td>{employee.role}</td>
                  <td>{employee.startDate}</td>
                  <td>{employee.endDate}</td>
                  <td>{employee.status}</td>
                  <td>{employee.billingStatus}</td>
                  <td>{employee.exposedToCustomer}</td>
                  <td>{employee.allocationType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TeamDetails;
