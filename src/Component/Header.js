import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NotificationsIcon from "@mui/icons-material/Notifications";

import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import { useLocation } from "react-router-dom";
function Header() {
  const location = useLocation();
  const pathname = location.pathname;
  let sidenavName = null;
  // if (pathname === "/Items") {
  //   sidenavName = "Items";
  // } else if (pathname === "/ItemGroup") {
  //   sidenavName = "Item Group";
  // } else if (pathname === "/Account") {
  //   sidenavName = "Account ";
  // } else if (pathname === "/AccountGroup") {
  //   sidenavName = "Account Group";
  // } else if (pathname === "/Customer") {
  //   sidenavName = "Customer";
  // } else if (pathname === "/Vendor") {
  //   sidenavName = "Vendor";
  // }
  // if (pathname === "/Sales") {
  //   sidenavName = "Sales";
  // }

  return (
    <div className="row shadow-sm m-auto" bg="white">
      <Navbar className="text-center">
        <Container>
          <Navbar.Brand>
            <h2 className="me-auto mt-3">{sidenavName}</h2>{" "}
          </Navbar.Brand>
          {/* {!sidenavName && (
            <Nav.Link className="me-auto mt-3">
              {" "}
              <TextField
                className="mx-5 "
                sx={{ width: "35ch" }}
                size="small"
                id="outlined-start-adornment"
                placeholder="Search"
                type="text"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Nav.Link>
          )} */}
          <Nav className=" ">
            <Nav.Link className="mt-3">
              {" "}
              <span>
                {" "}
                <NotificationsIcon
                  className="text-dark "
                  style={{ fontSize: "35px" }}
                />
              </span>
            </Nav.Link>
            <Nav.Link>
              {" "}
              <img
                className="fiximg"
                height={50}
                src="../Assests/Gauge_16-removebg-preview.png"
                alt=""
              />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
