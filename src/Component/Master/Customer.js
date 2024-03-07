import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/esm/Button";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import NavDropdown from "react-bootstrap/NavDropdown";
import Select from "@mui/material/Select";
import Form from "react-bootstrap/Form";
import { TextField } from "@mui/material";
import axios from "axios";

function Customer() {
  const [Customer, setCustomer] = useState(false);
  const [ModifyCustomers, setModifyCustomers] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [selected, setSelected] = useState("All Customer");
  const [showDropdown, setShowDropdown] = useState(false);
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
  const [allCustomer, setAllCustomer] = useState([]);
  const [searchcustomerName, setsearchcustomerName] = useState("");

  const handleRowClicked = (row) => {
    setSelectedCustomer(row);
    setModifyCustomers(true);
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
    getAllCustomers();
  }, []);

  const getAllCustomers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9001/api/master/customers/getallcustomer"
      );
      if (response.status === 200) {
        console.log("Customer=====>", response.data);
        setAllCustomer(response.data.allCustomers);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const filterdata = allCustomer.filter(
    (item) =>
      item.customerNameSaluation
        .toLowerCase()
        .includes(searchcustomerName.toLowerCase()) ||
      item.customerNameFirstName
        .toLowerCase()
        .includes(searchcustomerName.toLowerCase()) ||
      item.customerNameLastName
        .toLowerCase()
        .includes(searchcustomerName.toLowerCase())
  );

  const addCustomers = async () => {
    if (!firstName) {
      alert("Fill Mandatory Fields");
    } else {
      try {
        const config = {
          url: "/master/customers/addcustomer",
          method: "post",
          baseURL: "http://localhost:9001/api",
          headers: { "content-type": "application/json" },
          data: {
            customerNameSaluation: saluation,
            customerNameFirstName: firstName,
            customerNameLastName: lastName,
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
          alert("Customer Added");
          window.location.reload();
        }
      } catch (error) {
        console.log(error.response);
        alert("Error in Adding Account Group");
      }
    }
  };

  const editCustomer = async (selectedCustomer) => {
    try {
      const config = {
        url: `/master/customers/editcustomer/${selectedCustomer}`,
        method: "put",
        baseURL: "http://localhost:9001/api",
        headers: { "content-type": "application/json" },
        data: {
          customerNameSaluation: saluation,
          customerNameFirstName: firstName,
          customerNameLastName: lastName,
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
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:9001/api/master/customers/deletecustomer/${id}`
      );
      if (response.status === 200) {
        console.log(response.data);
        alert("Customer has been deleted");

        getAllCustomers();
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const activeCustomer = async (selectedCustomer) => {
    try {
      const config = {
        url: `/master/customers/customerstatus/${selectedCustomer}`,
        method: "put",
        baseURL: "http://localhost:9001/api",
        headers: { "content-type": "application/json" },
        data: {
          customerStatus: "Active",
        },
      };
      let response = await axios(config);
      if (response.status === 200) {
        console.log(response.data);
        alert("Customer has been Activated");
        getAllCustomers();
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const inActiveCustomer = async (selectedCustomer) => {
    try {
      const config = {
        url: `/master/customers/customerstatus/${selectedCustomer}`,
        method: "put",
        baseURL: "http://localhost:9001/api",
        headers: { "content-type": "application/json" },
        data: {
          customerStatus: "InActive",
        },
      };
      let response = await axios(config);
      if (response.status === 200) {
        console.log(response.data);
        alert("Customer has been InActivated");
        getAllCustomers();
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const columns = [
    {
      name: "Customer Name",
      selector: (row) => (
        <div>
          {row.customerNameSaluation} {row.customerNameFirstName}
          {row.customerNameLastName}
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
    //   name: "Status",
    //   sortable: true,
    //   cell: (row) => (
    //     <div>
    //       <button
    //         style={{
    //           border: "1px solid #2a982e",
    //           color: row.customerStatus === "Active" ? "white" : "#2a982e",
    //           backgroundColor:
    //             row.customerStatus === "Active" ? "#2a982e" : "white",
    //         }}
    //         onClick={() => activeCustomer(row._id)}
    //       >
    //         Active
    //       </button>{" "}
    //       <button
    //         style={{
    //           border: "1px solid #E91E63",
    //           color: row.customerStatus === "InActive" ? "white" : "#E91E63",
    //           backgroundColor:
    //             row.customerStatus === "InActive" ? "#E91E63" : "white",
    //         }}
    //         onClick={() => inActiveCustomer(row._id)}
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
          ></i>
          /
          <i
            className="fa-solid fa-trash"
            style={{ color: "red", cursor: "pointer" }}
            title="Delete"
            onClick={() => deleteCustomer(row._id)}
          ></i>
        </div>
      ),
    },
  ];

  return (
    <>
      {!Customer && !ModifyCustomers && (
        <>
          <div className="row mt-4  m-auto ">
            <div className="col-md-4 ">
              <h2>Customer </h2>
            </div>
            <div className="col-md-5 me-auto"></div>
            <div className="col-md-3">
              <div className="d-flex ">
                <span className="m-auto">
                  <img width={30} height={30} src="../Images/sort.png" alt="" />
                </span>
                <Button
                  className="m-auto bgcolr bordernone"
                  onClick={() => setCustomer(true)}
                >
                  <span className="textbld m-auto">
                    New <AddOutlinedIcon />
                  </span>
                </Button>
              </div>
            </div>
          </div>

          <div className="row mt-3 m-auto">
            <div className="col-md-4 ">
              <Form.Control
                className="col-md-4 mb-3"
                placeholder="Search Customer Name..."
                type="text"
                onChange={(e) => setsearchcustomerName(e.target.value)}
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
              <ul className="row p-3 m-auto" style={{ width: "180px" }}>
                <li
                  onClick={(e) => handleRowSelectedList(e)}
                  className="p-1 m-auto list_inner"
                >
                  All Customer
                </li>
                <li
                  onClick={(e) => handleRowSelectedList(e)}
                  className="p-1 m-auto list_inner"
                >
                  Active Customer
                </li>
                <li
                  onClick={(e) => handleRowSelectedList(e)}
                  className="p-1 m-auto list_inner"
                >
                  Inactive Customer
                </li>
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

      {/* ...................new customer................. */}

      {Customer && !ModifyCustomers && (
        <div className="container ">
          <p className="row   m-auto ">
            <h2 className="textbld  mt-3 ">New Customer</h2>
          </p>
          <div className="row mt-5 m-auto ">
            <div className="col-md-8">
              <div className="row p-2 mb-3 ">
                <div className="col-md-3">
                  <p className="colr-red textbld">Customer Name*</p>
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
              {/* <div className="row p-3">
                <div className="col-md-4">
                  <p className="colr-red textbld">Alias Name/Company Name*</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    className="shadow-sm"
                    onChange={(e) => setAliasOrCompany(e.target.value)}
                  />
                </div>
              </div> */}
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
                  className="col-md-5 textbld m-auto m-2 bg_color"
                  onClick={addCustomers}
                >
                  Add Customer
                </Button>
                <Button
                  onClick={() => setCustomer(false)}
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
      {/* ...........modift customer................... */}
      {!Customer && ModifyCustomers && (
        <div className="container ">
          <p className="row   m-auto ">
            <h2 className="textbld  mt-3 ">Edit Customer</h2>
          </p>
          <div className="row mt-5 m-auto ">
            <div className="col-md-8">
              <div className="row p-2 m-auto mb-3 ">
                <div className="col-md-3">
                  <p className="colr-red textbld">Customer Name*</p>
                </div>

                <div className="col-md-3">
                  <TextField
                    id="outlined-basic"
                    label="Saluation"
                    variant="outlined"
                    size="small"
                    defaultValue={
                      saluation || selectedCustomer.customerNameSaluation
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
                      firstName || selectedCustomer.customerNameFirstName
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
                    defaultValue={
                      lastName || selectedCustomer.customerNameLastName
                    }
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
                      aliasOrCompany || selectedCustomer.aliasNameOrCompanyName
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
                  value={paymentTerms || selectedCustomer.paymentTerms}
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
                    defaultValue={panNumber || selectedCustomer.panNumber}
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
                    defaultValue={gSTINNumber || selectedCustomer.gstInNumber}
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
                    defaultValue={street || selectedCustomer.Street}
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
                    defaultValue={city || selectedCustomer.City}
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
                    defaultValue={state || selectedCustomer.State}
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
                    defaultValue={zipCode || selectedCustomer.zipCode}
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
                    defaultValue={country || selectedCustomer.country}
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
                    defaultValue={landmark || selectedCustomer.landmark}
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
                    defaultValue={phoneNumber || selectedCustomer.phoneNumber}
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
                    defaultValue={name || selectedCustomer.Name}
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
                    defaultValue={aliasName || selectedCustomer.aliasName}
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
                    defaultValue={email || selectedCustomer.email}
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
                      conatctPhoneNumber || selectedCustomer.personPhoneNumber
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
                  onClick={() => editCustomer(selectedCustomer._id)}
                >
                  Modify Customer
                </Button>
                <Button
                  onClick={() => setModifyCustomers(false)}
                  className="col-md-5 textbld m-auto m-2"
                  variant="light"
                >
                  Cancel
                </Button>{" "}
              </div>
            </div>
            <div className="col-md-4"></div>
          </div>
          {/* */}
        </div>
      )}
    </>
  );
}
export default Customer;
