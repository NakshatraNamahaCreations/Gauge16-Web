import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/esm/Button";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import NavDropdown from "react-bootstrap/NavDropdown";
import Select from "@mui/material/Select";
import Form from "react-bootstrap/Form";
import { TextField } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";

function Vendor() {
  const [Vendor, setVendor] = useState(false);
  const [selected, setSelected] = useState("All Vendor");
  const [showDropdown, setShowDropdown] = useState(false);
  const [ModifyVendors, setModifyVendors] = useState(false);
  const [opendelete, setopendelete] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState({});
  const [saluation, setSaluation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [aliasOrCompany, setAliasOrCompany] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [gSTINNumber, setGSTINNumber] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [landmark, setLandmark] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [aliasName, setAliasName] = useState("");
  const [email, setEmail] = useState("");
  const [conatctPhoneNumber, setConatctPhoneNumber] = useState("");
  const [allVendor, setAllVendor] = useState([]);
  const [activeVendorList, setActiveVendorList] = useState([]);
  const [searchvendorname, setsearchvendorname] = useState("");

  const handleRowClicked = (row) => {
    console.log("Clicked Row:", row);
    setSelectedVendor(row);
    setModifyVendors(true);
  };

  const handleRowSelectedList = (e) => {
    const selectedItem = e.target.innerText.trim();
    setSelected(selectedItem);
    setShowDropdown(false);
  };

  const handleDropdownToggle = (isOpen) => {
    setShowDropdown(isOpen);
  };

  useEffect(() => {
    getAllVendor();
  }, []);

  const getAllVendor = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9001/api/master/vendors/getallvendor"
      );
      if (response.status === 200) {
        console.log("vendor=====>", response.data);
        setAllVendor(response.data.allVendors);
        // const filteringActiveGroups = response.data.allVendors
        // .filter(
        //   (active) => active.vendorStatus === "Active"
        // );
        // setActiveVendorList(filteringActiveGroups);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const addVendor = async () => {
    if (!firstName || !lastName || !aliasOrCompany) {
      alert("Fill Mandatory Fields");
    } else {
      try {
        const config = {
          url: "/master/vendors/addvendor",
          method: "post",
          baseURL: "http://localhost:9001/api",
          headers: { "content-type": "application/json" },
          data: {
            vendorNameSaluation: saluation,
            vendorNameFirstName: firstName,
            vendorNameLastName: lastName,
            aliasNameOrCompanyName: aliasOrCompany,
            paymentTerms: paymentTerms,
            panNumber: panNumber,
            gstInNumber: gSTINNumber,
            Street: street,
            City: city,
            State: state,
            zipCode: zipCode,
            country: country,
            landmark: landmark,
            phoneNumber: phoneNumber,
            Name: name,
            aliasName: aliasName,
            email: email,
            personPhoneNumber: conatctPhoneNumber,
          },
        };
        let res = await axios(config);
        console.log(res.status);
        if (res.status === 200) {
          console.log(res.data);
          alert("vendor Added");
          window.location.reload();
        }
      } catch (error) {
        console.log(error.response);
        alert("Error in Adding Account Group");
      }
    }
  };

  const filterdata = allVendor.filter(
    (item) =>
      (item.vendorNameSaluation &&
        item.vendorNameSaluation
          .toLowerCase()
          .includes(searchvendorname.toLowerCase())) ||
      (item.vendorNameFirstName &&
        item.vendorNameFirstName
          .toLowerCase()
          .includes(searchvendorname.toLowerCase())) ||
      (item.vendorNameLastName &&
        item.vendorNameLastName
          .toLowerCase()
          .includes(searchvendorname.toLowerCase()))
  );

  const editVendor = async (selectedVendor) => {
    try {
      const config = {
        url: `/master/vendors/editvendor/${selectedVendor}`,
        method: "put",
        baseURL: "http://localhost:9001/api",
        headers: { "content-type": "application/json" },
        data: {
          vendorNameSaluation: saluation,
          vendorNameFirstName: firstName,
          vendorNameLastName: lastName,
          aliasNameOrCompanyName: aliasOrCompany,
          paymentTerms: paymentTerms,
          panNumber: panNumber,
          gstInNumber: gSTINNumber,
          Street: street,
          City: city,
          State: state,
          zipCode: zipCode,
          country: country,
          landmark: landmark,
          phoneNumber: phoneNumber,
          Name: name,
          aliasName: aliasName,
          email: email,
          personPhoneNumber: conatctPhoneNumber,
        },
      };
      let res = await axios(config);
      console.log(res.status);
      if (res.status === 200) {
        console.log(res.data);
        alert("Updated Successfully");
        window.location.reload();
        // getAllAccounts();
      }
    } catch (error) {
      console.log(error.response);
      alert("Something went wrong! Try again....");
    }
  };

  const deleteVendor = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:9001/api/master/vendors/deletevendor/${id}`
      );
      if (response.status === 200) {
        console.log(response.data);
        alert("Vendor has been deleted");
        // window.location.reload();
        getAllVendor();
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const activeVendor = async (selectedVendor) => {
    try {
      const config = {
        url: `/master/vendors/vendorstatus/${selectedVendor}`,
        method: "put",
        baseURL: "http://localhost:9001/api",
        headers: { "content-type": "application/json" },
        data: {
          vendorStatus: "Active",
        },
      };
      let response = await axios(config);
      if (response.status === 200) {
        console.log(response.data);
        alert("Vendor has been Activated");
        // window.location.reload();
        getAllVendor();
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const inActiveVendor = async (selectedVendor) => {
    try {
      const config = {
        url: `/master/vendors/vendorstatus/${selectedVendor}`,
        method: "put",
        baseURL: "http://localhost:9001/api",
        headers: { "content-type": "application/json" },
        data: {
          vendorStatus: "InActive",
        },
      };
      let response = await axios(config);
      if (response.status === 200) {
        console.log(response.data);
        alert("Vendor has been InActivated");
        // window.location.reload();
        getAllVendor();
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const columns = [
    {
      name: "vendor Name",
      selector: (row) => (
        <div>
          {row.vendorNameSaluation} {row.vendorNameFirstName}{" "}
          {row.vendorNameLastName}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Company Name",
      selector: (row) => row.aliasNameOrCompanyName,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phoneNumber,
      sortable: true,
    },
    // {
    //   name: "Receivable",
    //   selector: (row) => row.underGroup,
    //   sortable: true,
    // },
    // {
    //   name: "Work Phone",
    //   selector: (row) => row.underGroup,
    //   sortable: true,
    // },
    // {
    //   name: "Work Phone",
    //   selector: (row) => row.underGroup,
    //   sortable: true,
    // },
    // {
    //   name: "Work Phone",
    //   selector: (row) => row.underGroup,
    //   sortable: true,
    // },
    // {
    //   name: "Work Phone",
    //   selector: (row) => row.underGroup,
    //   sortable: true,
    // },
    // {
    //   name: "Status",
    //   sortable: true,
    //   cell: (row) => (
    //     <div>
    //       <button
    //         style={{
    //           border: "1px solid #2a982e",
    //           color: row.vendorStatus === "Active" ? "white" : "#2a982e",
    //           backgroundColor:
    //             row.vendorStatus === "Active" ? "#2a982e" : "white",
    //         }}
    //         onClick={() => activeVendor(row._id)}
    //       >
    //         Active
    //       </button>{" "}
    //       <button
    //         style={{
    //           border: "1px solid #E91E63",
    //           color: row.vendorStatus === "InActive" ? "white" : "#E91E63",
    //           backgroundColor:
    //             row.vendorStatus === "InActive" ? "#E91E63" : "white",
    //         }}
    //         onClick={() => inActiveVendor(row._id)}
    //       >
    //         InActive
    //       </button>
    //     </div>
    //   ),
    // },
    {
      name: "Action",
      sortable: true,
      cell: (row) => (
        <div>
          <i
            className="fa-regular fa-pen-to-square"
            style={{ color: "black", cursor: "pointer" }}
            title="Modify"
            onClick={() => handleRowClicked(row)}
          ></i>{" "}
          /{" "}
          <i
            className="fa-solid fa-trash"
            style={{ color: "red", cursor: "pointer" }}
            title="Delete"
            onClick={() => deleteVendor(row._id)}
          ></i>
        </div>
      ),
    },
  ];
  return (
    <>
      {!Vendor && !ModifyVendors && (
        <>
          <div className="row mt-4  m-auto ">
            <div className="col-md-4 ">
              <h2>Vendor </h2>
            </div>
            <div className="col-md-5 me-auto"></div>
            <div className="col-md-3">
              <div className="d-flex ">
                <span className="m-auto">
                  <img width={30} height={30} src="../Images/sort.png" alt="" />
                </span>
                <Button
                  className="m-auto bgcolr bordernone "
                  onClick={() => setVendor(true)}
                >
                  <span className="textbld m-auto">
                    New <AddOutlinedIcon />
                  </span>
                </Button>

                {/* <Dropdown className="cus   m-auto border1 bordernone  text-center">
                  <Dropdown.Toggle variant="warning">
                    <span>
                      <MoreVertIcon />
                    </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="p-2">
                    <Dropdown.Item
                      onClick={() => setModifyVendors(true)}
                      className="list_inner"
                    >
                      Modify Vendor
                    </Dropdown.Item>
                    <Dropdown.Item className="list_inner">Delete</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown> */}
              </div>
            </div>
          </div>

          <div className="row mt-3 m-auto">
            <div className="col-md-4 ">
              <Form.Control
                className="col-md-4 mb-3"
                placeholder="Search Vendor Name..."
                type="text"
                onChange={(e) => setsearchvendorname(e.target.value)}
              />
            </div>

            <div className="col-md-6 m-auto"></div>

            <NavDropdown
              className="col-md-2 textbld  m-auto"
              title={selected}
              show={showDropdown}
              onSelect={handleRowSelectedList}
              onToggle={handleDropdownToggle}
            >
              <ul className="row p-3 m-auto lis_wid">
                <li
                  onClick={(e) => handleRowSelectedList(e)}
                  className="p-1 m-auto list_inner"
                >
                  All Vendor
                </li>
                <li
                  onClick={(e) => handleRowSelectedList(e)}
                  className="p-1 m-auto list_inner"
                >
                  Active Vendor
                </li>
                <li
                  onClick={(e) => handleRowSelectedList(e)}
                  className="p-1 m-auto list_inner"
                >
                  Inactive Vendor
                </li>{" "}
              </ul>
            </NavDropdown>
          </div>
          <div className="row m-auto">
            <DataTable
              columns={columns}
              data={filterdata}
              onRowClicked={handleRowClicked}
              pagination
            />
          </div>
        </>
      )}

      {Vendor && !ModifyVendors && (
        <div className="container ">
          <p className="row   m-auto ">
            <h2 className="textbld  mt-3 ">New Vendor</h2>
          </p>
          <div className="row mt-5 m-auto ">
            <div className="col-md-8">
              <div className="row p-2 mb-3 ">
                <div className="col-md-3">
                  <p className="colr-red textbld">Vendor Name*</p>
                </div>

                <div className="col-md-3">
                  <TextField
                    id="outlined-basic"
                    label="Saluation"
                    variant="outlined"
                    size="small"
                    onChange={(e) => setSaluation(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <TextField
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                    size="small"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <TextField
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                    size="small"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-4">
                  <p className="colr-red textbld">Alias Name/Company Name*</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    className="shadow-sm"
                    onChange={(e) => setAliasOrCompany(e.target.value)}
                  />
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-4">
                  <p className=" textbld">Payment Terms</p>
                </div>

                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  className="col-md-8"
                  size="small"
                  onChange={(e) => setPaymentTerms(e.target.value)}
                >
                  <option value={10}>online</option>
                  <option value={20}>pay on delivery</option>
                </Select>
              </div>

              <div className="row p-3">
                <div className="col-md-4">
                  <p className="textbld">Pan Number</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    className="shadow-sm"
                    onChange={(e) => setPanNumber(e.target.value)}
                  />
                </div>
              </div>

              <div className="row p-3">
                <div className="col-md-4">
                  <p className="textbld">GSTIN Number</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    className="shadow-sm"
                    onChange={(e) => setGSTINNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-6">
                  <p className="textbld colr-red">Address*</p>
                </div>
              </div>

              <div className="row p-3">
                <div className="col-md-4">
                  <p className="textbld">Street</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    className="shadow-sm"
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="Street"
                  />
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-4">
                  <p className="textbld">City</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    className="shadow-sm"
                    placeholder="City"
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-4">
                  <p className="textbld">State</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    className="shadow-sm"
                    onChange={(e) => setState(e.target.value)}
                    placeholder="State"
                  />
                </div>
              </div>

              <div className="row p-3">
                <div className="col-md-4">
                  <p className="textbld">Zip Code</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    className="shadow-sm"
                    placeholder="Zip Code"
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-4">
                  <p className="textbld">Country</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    className="shadow-sm"
                    placeholder="Country"
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-4">
                  <p className="textbld">Landmark</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    className="shadow-sm"
                    placeholder="Landmark"
                    onChange={(e) => setLandmark(e.target.value)}
                  />
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-4">
                  <p className="textbld">Phone Number</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    className="shadow-sm"
                    placeholder="Phone Number"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>

              <div className="row p-3">
                <div className="col-md-6">
                  <p className="textbld">Contact Person Information</p>
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-4">
                  <p className="textbld">Name</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    className="shadow-sm"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="row p-3">
                <div className="col-md-4">
                  <p className="textbld">Alias Name</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    className="shadow-sm"
                    placeholder="Alias Name"
                    onChange={(e) => setAliasName(e.target.value)}
                  />
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-4">
                  <p className="textbld">Email</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    className="shadow-sm"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-4">
                  <p className="textbld">Phone Number</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    className="shadow-sm"
                    placeholder="Phone Number"
                    onChange={(e) => setConatctPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-4  m-auto">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <div className="row">
                <Button
                  className="col-md-5 textbld 
                m-auto m-2 bg_color"
                  onClick={addVendor}
                >
                  Add Vendor
                </Button>
                <Button
                  onClick={() => setVendor(false)}
                  className="col-md-5 textbld m-auto m-2"
                  variant="light"
                >
                  Cancel
                </Button>{" "}
              </div>
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
      )}
      {/* ===============edit============= */}
      {!Vendor && ModifyVendors && (
        <div className="container ">
          <p className="row   m-auto ">
            <h2 className="textbld  mt-3 ">Edit Vendor</h2>
          </p>
          <div className="row mt-5 m-auto ">
            <div className="col-md-8">
              <div className="row p-2 m-auto mb-3 ">
                <div className="col-md-3">
                  <p className="colr-red textbld">Vendor Name*</p>
                </div>

                <div className="col-md-3">
                  <TextField
                    id="outlined-basic"
                    label="Saluation"
                    variant="outlined"
                    size="small"
                    defaultValue={
                      saluation || selectedVendor.vendorNameSaluation
                    }
                    onChange={(e) => setSaluation(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <TextField
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                    size="small"
                    defaultValue={
                      firstName || selectedVendor.vendorNameFirstName
                    }
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <TextField
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                    size="small"
                    defaultValue={lastName || selectedVendor.vendorNameLastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-4">
                  <p className="colr-red textbld">Alias Name/Company Name*</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    className="shadow-sm"
                    defaultValue={
                      aliasOrCompany || selectedVendor.aliasNameOrCompanyName
                    }
                    onChange={(e) => setAliasOrCompany(e.target.value)}
                  />
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-4">
                  <p className=" textbld">Payment Terms</p>
                </div>

                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  className="col-md-8"
                  size="small"
                  value={paymentTerms || selectedVendor.paymentTerms}
                  onChange={(e) => setPaymentTerms(e.target.value)}
                >
                  <option value={10}>online</option>
                  <option value={20}>pay on delivery</option>
                </Select>
              </div>

              <div className="row p-3">
                <div className="col-md-4">
                  <p className="textbld">Pan Number</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    className="shadow-sm"
                    defaultValue={panNumber || selectedVendor.panNumber}
                    onChange={(e) => setPanNumber(e.target.value)}
                  />
                </div>
              </div>

              <div className="row p-3">
                <div className="col-md-4">
                  <p className="textbld">GSTIN Number</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    className="shadow-sm"
                    defaultValue={gSTINNumber || selectedVendor.gstInNumber}
                    onChange={(e) => setGSTINNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-6">
                  <p className="textbld colr-red">Address*</p>
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-4">
                  <p className="textbld">Street</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    className="shadow-sm"
                    placeholder="Street"
                    defaultValue={street || selectedVendor.Street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-4">
                  <p className="textbld">City</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    className="shadow-sm"
                    placeholder="City"
                    defaultValue={city || selectedVendor.City}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-4">
                  <p className="textbld">State</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    className="shadow-sm"
                    placeholder="State"
                    defaultValue={state || selectedVendor.State}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
              </div>

              <div className="row p-3">
                <div className="col-md-4">
                  <p className="textbld">Zip Code</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    className="shadow-sm"
                    placeholder="Zip Code"
                    defaultValue={zipCode || selectedVendor.zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-4">
                  <p className="textbld">Country</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    className="shadow-sm"
                    placeholder="Country"
                    defaultValue={country || selectedVendor.country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-4">
                  <p className="textbld">Landmark</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    className="shadow-sm"
                    placeholder="Landmark"
                    defaultValue={landmark || selectedVendor.landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                  />
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-4">
                  <p className="textbld">Phone Number</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    className="shadow-sm"
                    placeholder="Phone Number"
                    defaultValue={phoneNumber || selectedVendor.phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>

              <div className="row p-3">
                <div className="col-md-6">
                  <p className="textbld">Contact Person Information</p>
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-4">
                  <p className="textbld">Name</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    className="shadow-sm"
                    placeholder="Name"
                    defaultValue={name || selectedVendor.Name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="row p-3">
                <div className="col-md-4">
                  <p className="textbld">Alias Name</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    className="shadow-sm"
                    placeholder="Alias Name"
                    defaultValue={aliasName || selectedVendor.aliasName}
                    onChange={(e) => setAliasName(e.target.value)}
                  />
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-4">
                  <p className="textbld">Email</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    className="shadow-sm"
                    placeholder="Email"
                    defaultValue={email || selectedVendor.email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-4">
                  <p className="textbld">Phone Number</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    className="shadow-sm"
                    placeholder="Phone Number"
                    defaultValue={
                      conatctPhoneNumber || selectedVendor.personPhoneNumber
                    }
                    onChange={(e) => setConatctPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-4  m-auto">
            <div className="col-md-2"></div>
            <div className="col-md-6">
              <div className="row">
                <Button
                  className="col-md-5 textbld m-auto m-2 bg_color"
                  onClick={() => editVendor(selectedVendor._id)}
                >
                  Modify Vendor
                </Button>
                <Button
                  className="col-md-5 textbld m-auto m-2"
                  variant="light"
                  onClick={() => setModifyVendors(false)}
                >
                  Cancel
                </Button>{" "}
              </div>
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
      )}
    </>
  );
}
export default Vendor;
