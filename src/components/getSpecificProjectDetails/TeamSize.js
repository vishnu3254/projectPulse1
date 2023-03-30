const TeamSize = ({ teamSize }) => {
  return (
    <div className="container p-3 bg-info text-white rounded">
      <h2 className="text-center display-6">Team Size</h2>
      <h3 className="text-center display-6">{teamSize}</h3>
    </div>
  );
};

export default TeamSize;
