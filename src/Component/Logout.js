import React, { useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import Header from "./Header";
import Sidenav1 from "./sidenav";

export default function Logout() {
  return (
    <div className="row me-0">
      <div className="col-md-2">
        <Sidenav1/>
      </div>
      <div className="col-md-10">
        <Header />
      </div>
    </div>
  );
}
