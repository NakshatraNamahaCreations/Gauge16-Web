import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Link, useLocation } from "react-router-dom";
import Row from "react-bootstrap/Row";
import { useSelector } from "react-redux";
// import Overview from "./Overview";
// import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { InputAdornment, TextField } from "@mui/material";
import { Card } from "react-bootstrap";
import Sidenav1 from "./sidenav";
export const Login = () => {
  const UserNumber = useSelector((state) => state.Name);
  const [Visibility, setVisibility] = useState(false);

  const handleVisibility = () => {
    setVisibility(true);
  };
  const handleVisibilityof = () => {
    setVisibility(false);
  };

  const location = useLocation();
  const excludeRoutes = ["/"];
  const shouldRenderSidenav = !excludeRoutes.includes(location.pathname);

  return (
    <>
      {shouldRenderSidenav && (
        <>
          <Sidenav1 />
        </>
      )}
      <div className="row me-0 mt-5" style={{ height: "90vh" }}>
        <div className="col-md-2"></div>

        <div className="col-md-8  m-auto">
          <div className="row p-4">
            <img
              alt=""
              className="col-md-6 "
              src="../Images/Computer login-pana.png"
            />
            <div className="col-md-1"></div>
            <div className="col-md-5">
              <div className="row">
                <Row className="row   ">
                  <div className="col-md-3"></div>{" "}
                  <img
                    className="col-md-6 "
                    src="../Assests/Gauge_16-removebg-preview.png"
                    alt=""
                  />
                  <div className="col-md-3"></div>
                </Row>
                <Row className="row mb-3  m-auto">
                  <div className="col-md-4"></div>
                  <h4 className="col-md-4 m-auto">Login</h4>
                  <div className="col-md-4"></div>{" "}
                </Row>
                <Row className="row mb-3  ">
                  <Form.Label>
                    Email /Phone Number
                    <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <TextField
                    size="small"
                    id="outlined-start-adornment"
                    placeholder="Email/Phone number"
                    type="text"
                  />
                </Row>

                <Row >
                  <Form.Label>
                    Password <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <TextField
                    size="small"
                    id="outlined-start-adornment"
                    placeholder="Password"
                    type={Visibility ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {Visibility ? (
                            <VisibilityIcon
                              className="text-dark"
                              onClick={handleVisibilityof}
                            />
                          ) : (
                            <VisibilityOffIcon
                              className="text-dark"
                              onClick={handleVisibility}
                            />
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                </Row>
                <Row className="row mb-3 mt-3">
                  <Button className="bg_color textbld">
                    <Link to="/dashboard" className="linktg">
                      Login
                    </Link>
                  </Button>{" "}
                </Row>
                <Row classNasme="row mb-3  m-auto mt-2">
                  <Link to="/Signup">
                    <p className="col-md-11 f_14 m-auto">
                      If your new to Gauge16? create account
                    </p>
                  </Link>
                </Row>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-2"></div>
      </div>
    </>
  );
};
