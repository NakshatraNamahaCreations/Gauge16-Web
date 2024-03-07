import React from "react";
import Sidenav1 from "../Component/sidenav";
import Header from "../Component/Header";
// import Header from "./Header";

export default function Layout({ Children }) {
  return (
    <div style={{ display: "flex" }}>
      <div
        className="col-md-2  shadow-sm bg-light"
        style={{
          position: "fixed",
          height: "100vh",
          overflowY: "scroll",
        }}
      >
        <li className="bgcolr p-3 ">
          <div>
            <img width={50} height={50} src="../Images/user.png" alt="" />
            <p className="row textbld m-auto">Gauge16</p>
            <p className="row  m-auto">Gauge16@gmail.com</p>
          </div>
        </li>
        <Sidenav1 />
      </div>
      <div className="col-md-10 fixing-margin" style={{ overflowY: "auto" }}>
        <Header />
        {Children}
      </div>
    </div>
  );
}
