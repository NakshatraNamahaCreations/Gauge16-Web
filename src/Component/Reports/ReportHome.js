import React from "react";

function ReportHome() {
  const handleClick = () => {
    // Prevent the default link behavior (navigating to the specified URL)
    // e.preventDefault();
    // Your custom logic goes here
    console.log("Link clicked!");
  };
  return (
    <div className="p-3">
      <h2>Reports</h2>
    </div>
  );
}

export default ReportHome;
