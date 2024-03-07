import axios from "axios";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import { TextField } from "@mui/material";

function Acountgroupdetails() {
  const { id } = useParams();

  const [item, setItem] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState({});
  const [selected, setSelected] = useState("All Accounts");
  const [showDropdown, setShowDropdown] = useState(false);
  const [ModifyAccount, setModifyAccount] = useState(false);
  const [opendelete, setopendelete] = useState(false);
  const [Name, setName] = useState([]);
  const [AliasName, setAliasName] = useState("");
  const [prevyearbal, setprevyearbal] = useState("");
  const [address, setAddress] = useState("");
  const [OpBAl, setOpBAl] = useState("");
  const [selectedTaxCategory, setSelectedTaxCategory] = useState("");
  const [ParentGroup, setParentGroup] = useState("");
  const [HSNcode, setHSNcode] = useState();
  const [gstNumber, setGstNumber] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [faxNumber, setFaxNumber] = useState("");
  const [cstNumber, setCstNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [station, setStation] = useState("");
  const [distance, setDistance] = useState("");
  const [transport, setTransport] = useState("");
  const [lstNumber, setLstNumber] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [allAccounts, setAllAccounts] = useState([]);
  const [searchaccountname, setsearchaccountname] = useState("");
  // edit
  const [editName, setEditName] = useState("");
  const [editAliasName, setEditAliasName] = useState("");
  const [editprevyearbal, setEditprevyearbal] = useState("");
  const [editaddress, setEditAddress] = useState("");
  const [editOpBAl, setEditOpBAl] = useState("");
  const [editParentGroup, setEditParentGroup] = useState("");
  const [editgstNumber, setEditGstNumber] = useState("");
  const [editaadharNumber, setEditAadharNumber] = useState("");
  const [editpanNumber, setEditPanNumber] = useState("");
  const [editemail, setEditEmail] = useState("");
  const [editmobileNumber, setEditMobileNumber] = useState("");
  const [editfaxNumber, setEditFaxNumber] = useState("");
  const [editcstNumber, setEditCstNumber] = useState("");
  const [editbankName, setEditBankName] = useState("");
  const [editifscCode, setEditIfscCode] = useState("");
  const [edittelephoneNumber, setEditTelephoneNumber] = useState("");
  const [editcontactPerson, setEditContactPerson] = useState("");
  const [editstation, setEditStation] = useState("");
  const [editdistance, setEditDistance] = useState("");
  const [edittransport, setEditTransport] = useState("");
  const [editlstNumber, setEditLstNumber] = useState("");
  const [editbankAccountNumber, setEditBankAccountNumber] = useState("");

  const [allAccountGroups, setAllAccountGroups] = useState([]);
  const [activeGroups, setActiveGroups] = useState([]);

  const handleRowSelectedList = (e) => {
    const selectedItem = e.target.innerText.trim();
    setSelected(selectedItem);
    setShowDropdown(false);
  };

  const handleDropdownToggle = (isOpen) => {
    setShowDropdown(isOpen);
  };

  const handleRowSelected = (rows) => {
    console.log("Selected Rows:", rows);
  };

  const handleRowClicked = (row) => {
    console.log("Clicked Row:", row);
    setSelectedAccount(row);
    console.log("Clicked Row:", row);
    setModifyAccount(true);
  };

  console.log("sumanraj---data", id);

  useEffect(() => {
    getAllAccounts();
  }, []);

  const getAllAccounts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9001/api/master/accounts/getallaccounts"
      );
      if (response.status === 200) {
        console.log("Account=====>", response.data);
        setAllAccounts(
          response.data.allAccount.filter((item) => item.parentGroup === id)
        );
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const filterdata = allAccounts.filter((item) =>
    item.accountName.toLowerCase().includes(searchaccountname)
  );

  console.log("kiruthika====", allAccounts);

  const columns = [
    {
      name: "Account Name",
      selector: (row) => row.accountName,
      sortable: true,
    },
    {
      name: "Alias Name",
      selector: (row) => row.aliasName,
      sortable: true,
    },
    // {
    //   name: "Parent Group",
    //   selector: (row) => row.parentGroup,
    //   sortable: true,
    // },
    {
      name: "Opening Balance",
      selector: (row) => row.opBal,
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
    //           color: row.accountStatus === "Active" ? "white" : "#2a982e",
    //           backgroundColor:
    //             row.accountStatus === "Active" ? "#2a982e" : "white",
    //         }}
    //         onClick={() => activeAccount(row._id)}
    //       >
    //         Active
    //       </button>{" "}
    //       /{" "}
    //       <button
    //         style={{
    //           border: "1px solid #E91E63",
    //           color: row.accountStatus === "InActive" ? "white" : "#E91E63",
    //           backgroundColor:
    //             row.accountStatus === "InActive" ? "#E91E63" : "white",
    //         }}
    //         onClick={() => inActiveAccount(row._id)}
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
            onClick={() => deleteAccount(row._id)}
          ></i>
        </div>
      ),
    },
  ];

  const addAccount = async () => {
    if (!Name | !AliasName) {
      alert("Fill Mandatory Fields");
    } else {
      try {
        const config = {
          url: "/master/accounts/addaccounts",
          method: "post",
          baseURL: "http://localhost:9001/api",
          headers: { "content-type": "application/json" },
          data: {
            accountName: Name,
            aliasName: AliasName,
            parentGroup: ParentGroup,
            opBal: OpBAl,
            prevYearBal: prevyearbal,
            address: address,
            gstInNo: gstNumber,
            aadharNo: aadharNumber,
            panNo: panNumber,
            email: email,
            mobileNo: mobileNumber,
            faxNo: faxNumber,
            cstNo: cstNumber,
            bankName: bankName,
            ifscCode: ifscCode,
            telephoneNo: telephoneNumber,
            contactPerson: contactPerson,
            station: station,
            distance: distance,
            Transport: transport,
            lstNo: lstNumber,
            bankAcNo: bankAccountNumber,
          },
        };
        let res = await axios(config);
        console.log(res.status);
        if (res.status === 200) {
          console.log(res.data);
          alert("Account Added");
          window.location.reload();
        }
      } catch (error) {
        console.log(error.response);
        alert("Error in Adding Account");
      }
    }
  };

  useEffect(() => {
    getAllAccountGroup();
  }, []);

  const getAllAccountGroup = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9001/api/master/accountgroups/getallaccountgroups"
      );
      if (response.status === 200) {
        console.log("Account Group=====>", response.data);
        setAllAccountGroups(response.data.allAccount);
        const filteringActiveGroups = response.data.allAccount.filter(
          (active) => active.accountGroupStatus === "Active"
        );
        setActiveGroups(filteringActiveGroups);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const editAccount = async (selectedAccountId) => {
    try {
      const config = {
        url: `/master/accounts/editaccounts/${selectedAccountId}`,
        method: "put",
        baseURL: "http://localhost:9001/api",
        headers: { "content-type": "application/json" },
        data: {
          accountName: editName,
          aliasName: editAliasName,
          parentGroup: editParentGroup,
          opBal: editOpBAl,
          prevYearBal: editprevyearbal,
          address: editaddress,
          gstInNo: editgstNumber,
          aadharNo: editaadharNumber,
          panNo: editpanNumber,
          email: editemail,
          mobileNo: editmobileNumber,
          faxNo: editfaxNumber,
          cstNo: editcstNumber,
          bankName: editbankName,
          ifscCode: editifscCode,
          telephoneNo: edittelephoneNumber,
          contactPerson: editcontactPerson,
          station: editstation,
          distance: editdistance,
          Transport: edittransport,
          lstNo: editlstNumber,
          bankAcNo: editbankAccountNumber,
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

  const deleteAccount = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:9001/api/master/accounts/deleteaccounts/${id}`
      );
      if (response.status === 200) {
        console.log(response.data);
        alert("Account has been deleted");
        // window.location.reload();
        getAllAccounts();
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const activeAccount = async (selectedAccountId) => {
    try {
      const config = {
        url: `/master/accounts/accountstatus/${selectedAccountId}`,
        method: "put",
        baseURL: "http://localhost:9001/api",
        headers: { "content-type": "application/json" },
        data: {
          accountStatus: "Active",
        },
      };
      let response = await axios(config);
      if (response.status === 200) {
        console.log(response.data);
        alert("Account has been Activated");
        // window.location.reload();
        getAllAccounts();
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const inActiveAccount = async (selectedAccountId) => {
    try {
      const config = {
        url: `/master/accounts/accountstatus/${selectedAccountId}`,
        method: "put",
        baseURL: "http://localhost:9001/api",
        headers: { "content-type": "application/json" },
        data: {
          accountStatus: "InActive",
        },
      };
      let response = await axios(config);
      if (response.status === 200) {
        console.log(response.data);
        alert("Account has been InActivated");
        // window.location.reload();
        getAllAccounts();
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <>
      {!item && !ModifyAccount && (
        <>
          <div className="row mt-4  m-auto ">
            <div className="col-md-4 ">
              <h2>Account </h2>
            </div>
            <div className="col-md-5 me-auto"></div>
            {/* <div className="col-md-3">
              <div className="d-flex ">
                <span className="m-auto">
                  <img width={30} height={30} src="../Images/sort.png" alt="" />
                </span>
                <Button
                  className="m-auto bgcolr bordernone "
                  onClick={() => setItem(true)}
                >
                  <span className="textbld m-auto">
                    New <AddOutlinedIcon />
                  </span>
                </Button>
              </div>
            </div> */}
          </div>

          <div className="row mt-3 m-auto">
            <div className="col-md-4 ">
              <Form.Control
                className="col-md-4 mb-3"
                placeholder="Search here..."
                type="text"
                onChange={(e) => setsearchaccountname(e.target.value)}
              />
            </div>

            <div className="col-md-5"></div>
            {/* <div className="col-md-3  ">
              <div className="d-flex m-auto">
                <NavDropdown
                  className="row textbld m-auto "
                  title={selected}
                  show={showDropdown}
                  onSelect={handleRowSelectedList}
                  onToggle={handleDropdownToggle}
                >
                  <ul className="p-2">
                    <li
                      onClick={(e) => handleRowSelectedList(e)}
                      className=" p-1 m-auto list_inner"
                    >
                      All Account
                    </li>
                    <li
                      onClick={(e) => handleRowSelectedList(e)}
                      className=" p-1 m-auto list_inner"
                    >
                      {" "}
                      Active Account
                    </li>
                    <li
                      onClick={(e) => handleRowSelectedList(e)}
                      className=" p-1 m-auto list_inner"
                    >
                      {" "}
                      Inactive Account
                    </li>{" "}
                  </ul>
                </NavDropdown>
              </div>
            </div> */}
          </div>
          <div className="row m-auto">
            <DataTable
              columns={columns}
              data={filterdata}
              pagination
              onRowClicked={handleRowClicked}
            />
          </div>
        </>
      )}
      {item && !ModifyAccount && (
        <div className="container ">
          <div className="row m-auto ">
            <h6
              className="textbld mt-3"
              style={{ cursor: "pointer" }}
              onClick={() => setItem(false)}
            >
              <i class="fa-solid fa-chevron-left"></i> Back
            </h6>
          </div>
          <p className="row m-auto ">
            <h2 className="textbld  mt-3 ">New Account</h2>
          </p>
          <div className="row m-auto ">
            <div className="col-md-9">
              <div className="row p-3">
                <div className="col-md-4">
                  <p className="colr-red textbld">Account Name*</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    className="shadow-sm"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-4">
                  <p className="colr-red textbld">Alias Name*</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    className="shadow-sm"
                    onChange={(e) => setAliasName(e.target.value)}
                  />
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-4">
                  <p className="textbld">Under Group</p>
                </div>
                <div className="col-md-8">
                  <Form.Select
                    className=""
                    // value={ParentGroup}
                    label="Unit"
                    onChange={(e) => setParentGroup(e.target.value)}
                  >
                    <option value="">Select</option>
                    {activeGroups?.map((ele) => {
                      return (
                        <option value={ele._id}>{ele.accountGroupName}</option>
                      );
                    })}
                  </Form.Select>
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-4">
                  <p className="textbld">Op.Bal</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    onChange={(e) => setOpBAl(e.target.value)}
                    type="number"
                  />
                </div>
              </div>

              <div className="row p-3">
                <div className="col-md-4">
                  <p className="textbld">Prev.Year.Bal</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    onChange={(e) => setprevyearbal(e.target.value)}
                    type="number"
                  />
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-4">
                  <p className="textbld">Address</p>
                </div>
                <div className="col-md-8 ">
                  <Form.Control
                    onChange={(e) => setAddress(e.target.value)}
                    as="textarea"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row  m-auto ">
            <div className="row    p-5  ">
              <div className="row">
                <div className="col-md-6 m-auto">
                  <div className="row mb-3">
                    <div className="col-md-1"></div>
                    <div className="col-md-4 m-auto">
                      <p className="textbld">GSTIN No.</p>
                    </div>
                    <div className="col-md-7 ">
                      <TextField
                        className="row "
                        onChange={(e) => setGstNumber(e.target.value)}
                        id="outlined-basic"
                        label="GSTIN"
                        variant="outlined"
                        size="small"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 m-auto">
                  <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-7 m-auto ">
                      <Button variant="secondary" className="m-auto">
                        Validate GSTIN online
                      </Button>
                    </div>{" "}
                    <div className="col-md-4 "> </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 m-auto mt-3 mb-3">
                  <div className="row mb-3">
                    <div className="col-md-1"></div>
                    <div className="col-md-4 m-auto">
                      <p className="textbld">Aadhar No.</p>
                    </div>
                    <div className="col-md-7">
                      <TextField
                        className="row "
                        onChange={(e) => setAadharNumber(e.target.value)}
                        id="outlined-basic"
                        label="Aadhar Number"
                        variant="outlined"
                        size="small"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-1"></div>
                    <div className="col-md-4 m-auto">
                      <p className="textbld">PAN No.</p>
                    </div>
                    <div className="col-md-7">
                      <TextField
                        className="row "
                        onChange={(e) => setPanNumber(e.target.value)}
                        id="outlined-basic"
                        label="PAN Number"
                        variant="outlined"
                        size="small"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-1"></div>
                    <div className="col-md-4 m-auto">
                      <p className="textbld">Email</p>
                    </div>
                    <div className="col-md-7">
                      <TextField
                        className="row "
                        onChange={(e) => setEmail(e.target.value)}
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        size="small"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-1"></div>
                    <div className="col-md-4 m-auto">
                      <p className="textbld">Mobile No.</p>
                    </div>
                    <div className="col-md-7">
                      <TextField
                        className="row "
                        onChange={(e) => setMobileNumber(e.target.value)}
                        id="outlined-basic"
                        label="Mobile Number"
                        variant="outlined"
                        size="small"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-1"></div>
                    <div className="col-md-4 m-auto">
                      <p className="textbld">FAX No.</p>
                    </div>
                    <div className="col-md-7">
                      <TextField
                        className="row "
                        onChange={(e) => setFaxNumber(e.target.value)}
                        id="outlined-basic"
                        label="FAX Number"
                        variant="outlined"
                        size="small"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-1"></div>
                    <div className="col-md-4 m-auto">
                      <p className="textbld">CST No.</p>
                    </div>
                    <div className="col-md-7">
                      <TextField
                        className="row "
                        onChange={(e) => setCstNumber(e.target.value)}
                        id="outlined-basic"
                        label="CST Number"
                        variant="outlined"
                        size="small"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-1"></div>
                    <div className="col-md-4 m-auto">
                      <p className="textbld">Bank Name</p>
                    </div>
                    <div className="col-md-7">
                      <TextField
                        className="row "
                        onChange={(e) => setBankName(e.target.value)}
                        id="outlined-basic"
                        label="Bank Name"
                        variant="outlined"
                        size="small"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-6 m-auto mt-3 mb-3">
                  <div className="row mb-3">
                    <div className="col-md-1"></div>
                    <div className="col-md-4 m-auto">
                      <p className="textbld">IFSC Code</p>
                    </div>
                    <div className="col-md-7">
                      <TextField
                        className="row "
                        onChange={(e) => setIfscCode(e.target.value)}
                        id="outlined-basic"
                        label="IFSC Code"
                        variant="outlined"
                        size="small"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-1"></div>
                    <div className="col-md-4 m-auto">
                      <p className="textbld">Telephone No.</p>
                    </div>
                    <div className="col-md-7">
                      <TextField
                        className="row "
                        onChange={(e) => setTelephoneNumber(e.target.value)}
                        id="outlined-basic"
                        label="Telephone Number"
                        variant="outlined"
                        size="small"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-1"></div>
                    <div className="col-md-4 m-auto">
                      <p className="textbld">Contact Person</p>
                    </div>
                    <div className="col-md-7">
                      <TextField
                        className="row "
                        onChange={(e) => setContactPerson(e.target.value)}
                        id="outlined-basic"
                        label="Contact Person"
                        variant="outlined"
                        size="small"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-1"></div>
                    <div className="col-md-4 m-auto">
                      <p className="textbld">Station</p>
                    </div>
                    <div className="col-md-7">
                      <TextField
                        className="row "
                        onChange={(e) => setStation(e.target.value)}
                        id="outlined-basic"
                        label="Station"
                        variant="outlined"
                        size="small"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-1"></div>
                    <div className="col-md-4 m-auto">
                      <p className="textbld">Distance</p>
                    </div>
                    <div className="col-md-7">
                      <TextField
                        className="row "
                        onChange={(e) => setDistance(e.target.value)}
                        id="outlined-basic"
                        label="Distance"
                        variant="outlined"
                        size="small"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-1"></div>
                    <div className="col-md-4 m-auto">
                      <p className="textbld">Transport</p>
                    </div>
                    <div className="col-md-7">
                      <TextField
                        className="row "
                        onChange={(e) => setTransport(e.target.value)}
                        id="outlined-basic"
                        label="Transport"
                        variant="outlined"
                        size="small"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-1"></div>
                    <div className="col-md-4 m-auto">
                      <p className="textbld">LST No.</p>
                    </div>
                    <div className="col-md-7">
                      <TextField
                        className="row "
                        onChange={(e) => setLstNumber(e.target.value)}
                        id="outlined-basic"
                        label="LST Number"
                        variant="outlined"
                        size="small"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-1"></div>
                    <div className="col-md-4 m-auto">
                      <p className="textbld">Bank A/C No.</p>
                    </div>
                    <div className="col-md-7">
                      <TextField
                        className="row "
                        onChange={(e) => setBankAccountNumber(e.target.value)}
                        id="outlined-basic"
                        label="Bank Account Number"
                        variant="outlined"
                        size="small"
                      />
                    </div>
                  </div>
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
                  onClick={addAccount}
                >
                  Add Account
                </Button>
                <Button
                  onClick={() => setItem(false)}
                  // onClick={() => setModifyAccount(false)}
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
      {/* =====================edit======================= */}
      {!item && ModifyAccount && (
        <div className="container ">
          <div className="row m-auto ">
            <h6
              className="textbld mt-3"
              style={{ cursor: "pointer" }}
              onClick={() => setModifyAccount(false)}
            >
              <i class="fa-solid fa-chevron-left"></i> Back
            </h6>
          </div>
          <p className="row   m-auto ">
            <h2 className="textbld  mt-3 ">Modify Account</h2>
          </p>
          <div className="row m-auto ">
            <div className="col-md-9">
              <div className="row p-3">
                <div className="col-md-4">
                  <p className=" textbld">Account Name</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    className="shadow-sm"
                    defaultValue={selectedAccount.accountName}
                    onChange={(e) => setEditName(e.target.value)}
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
                    defaultValue={selectedAccount.aliasName}
                    onChange={(e) => setEditAliasName(e.target.value)}
                  />
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-4">
                  <p className="textbld">Parent Group</p>
                </div>
                <div className="col-md-8">
                  <Form.Select
                    className=""
                    value={editParentGroup || selectedAccount.parentGroup}
                    label="Unit"
                    onChange={(e) => setEditParentGroup(e.target.value)}
                  >
                    {/* <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option> */}
                    <option value="">Select</option>
                    {allAccountGroups?.map((ele) => {
                      return (
                        <option value={ele.accountGroupName}>
                          {ele.accountGroupName}
                        </option>
                      );
                    })}
                  </Form.Select>
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-4">
                  <p className="textbld">Op.Bal</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    defaultValue={selectedAccount.opBal}
                    onChange={(e) => setEditOpBAl(e.target.value)}
                    type="textarea"
                  />
                </div>
              </div>

              <div className="row p-3">
                <div className="col-md-4">
                  <p className="textbld">Prev.Year.Bal</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    defaultValue={selectedAccount.prevYearBal}
                    onChange={(e) => setEditprevyearbal(e.target.value)}
                    type="textarea"
                  />
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-4">
                  <p className="textbld">Address</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    defaultValue={selectedAccount.address}
                    onChange={(e) => setEditAddress(e.target.value)}
                    as="textarea"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row  m-auto ">
            <div className="row    p-5  ">
              <div className="row">
                <div className="col-md-6 m-auto">
                  <div className="row mb-3">
                    <div className="col-md-1"></div>
                    <div className="col-md-4 m-auto">
                      <p className="textbld">GSTIN No.</p>
                    </div>
                    <div className="col-md-7 ">
                      <TextField
                        className="row "
                        defaultValue={selectedAccount.gstInNo}
                        onChange={(e) => setEditGstNumber(e.target.value)}
                        id="outlined-basic"
                        label="GSTIN"
                        variant="outlined"
                        size="small"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 m-auto">
                  <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-7 m-auto ">
                      <Button variant="secondary" className="m-auto">
                        Validate GSTIN online
                      </Button>
                    </div>{" "}
                    <div className="col-md-4 "> </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 m-auto mt-3 mb-3">
                  <div className="row mb-3">
                    <div className="col-md-1"></div>
                    <div className="col-md-4 m-auto">
                      <p className="textbld">Aadhar No.</p>
                    </div>
                    <div className="col-md-7">
                      <TextField
                        className="row "
                        defaultValue={selectedAccount.aadharNo}
                        onChange={(e) => setEditAadharNumber(e.target.value)}
                        id="outlined-basic"
                        label="Aadhar Number"
                        variant="outlined"
                        size="small"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-1"></div>
                    <div className="col-md-4 m-auto">
                      <p className="textbld">PAN No.</p>
                    </div>
                    <div className="col-md-7">
                      <TextField
                        className="row "
                        defaultValue={selectedAccount.panNo}
                        onChange={(e) => setEditPanNumber(e.target.value)}
                        id="outlined-basic"
                        label="PAN Number"
                        variant="outlined"
                        size="small"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-1"></div>
                    <div className="col-md-4 m-auto">
                      <p className="textbld">Email</p>
                    </div>
                    <div className="col-md-7">
                      <TextField
                        className="row "
                        defaultValue={selectedAccount.email}
                        onChange={(e) => setEditEmail(e.target.value)}
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        size="small"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-1"></div>
                    <div className="col-md-4 m-auto">
                      <p className="textbld">Mobile No.</p>
                    </div>
                    <div className="col-md-7">
                      <TextField
                        className="row "
                        defaultValue={selectedAccount.mobileNo}
                        onChange={(e) => setEditMobileNumber(e.target.value)}
                        id="outlined-basic"
                        label="Mobile Number"
                        variant="outlined"
                        size="small"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-1"></div>
                    <div className="col-md-4 m-auto">
                      <p className="textbld">FAX No.</p>
                    </div>
                    <div className="col-md-7">
                      <TextField
                        className="row "
                        defaultValue={selectedAccount.faxNo}
                        onChange={(e) => setEditFaxNumber(e.target.value)}
                        id="outlined-basic"
                        label="FAX Number"
                        variant="outlined"
                        size="small"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-1"></div>
                    <div className="col-md-4 m-auto">
                      <p className="textbld">CST No.</p>
                    </div>
                    <div className="col-md-7">
                      <TextField
                        className="row "
                        defaultValue={selectedAccount.cstNo}
                        onChange={(e) => setEditCstNumber(e.target.value)}
                        id="outlined-basic"
                        label="CST Number"
                        variant="outlined"
                        size="small"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-1"></div>
                    <div className="col-md-4 m-auto">
                      <p className="textbld">Bank Name</p>
                    </div>
                    <div className="col-md-7">
                      <TextField
                        className="row "
                        defaultValue={selectedAccount.bankName}
                        onChange={(e) => setEditBankName(e.target.value)}
                        id="outlined-basic"
                        label="Bank Name"
                        variant="outlined"
                        size="small"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-6 m-auto mt-3 mb-3">
                  <div className="row mb-3">
                    <div className="col-md-1"></div>
                    <div className="col-md-4 m-auto">
                      <p className="textbld">IFSC Code</p>
                    </div>
                    <div className="col-md-7">
                      <TextField
                        className="row "
                        defaultValue={selectedAccount.ifscCode}
                        onChange={(e) => setEditIfscCode(e.target.value)}
                        id="outlined-basic"
                        label="IFSC Code"
                        variant="outlined"
                        size="small"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-1"></div>
                    <div className="col-md-4 m-auto">
                      <p className="textbld">Telephone No.</p>
                    </div>
                    <div className="col-md-7">
                      <TextField
                        className="row "
                        defaultValue={selectedAccount.telephoneNo}
                        onChange={(e) => setEditTelephoneNumber(e.target.value)}
                        id="outlined-basic"
                        label="Telephone Number"
                        variant="outlined"
                        size="small"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-1"></div>
                    <div className="col-md-4 m-auto">
                      <p className="textbld">Contact Person</p>
                    </div>
                    <div className="col-md-7">
                      <TextField
                        className="row "
                        defaultValue={selectedAccount.contactPerson}
                        onChange={(e) => setEditContactPerson(e.target.value)}
                        id="outlined-basic"
                        label="Contact Person"
                        variant="outlined"
                        size="small"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-1"></div>
                    <div className="col-md-4 m-auto">
                      <p className="textbld">Station</p>
                    </div>
                    <div className="col-md-7">
                      <TextField
                        className="row "
                        defaultValue={selectedAccount.station}
                        onChange={(e) => setEditStation(e.target.value)}
                        id="outlined-basic"
                        label="Station"
                        variant="outlined"
                        size="small"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-1"></div>
                    <div className="col-md-4 m-auto">
                      <p className="textbld">Distance</p>
                    </div>
                    <div className="col-md-7">
                      <TextField
                        className="row "
                        defaultValue={selectedAccount.distance}
                        onChange={(e) => setEditDistance(e.target.value)}
                        id="outlined-basic"
                        label="Distance"
                        variant="outlined"
                        size="small"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-1"></div>
                    <div className="col-md-4 m-auto">
                      <p className="textbld">Transport</p>
                    </div>
                    <div className="col-md-7">
                      <TextField
                        className="row "
                        defaultValue={selectedAccount.Transport}
                        onChange={(e) => setEditTransport(e.target.value)}
                        id="outlined-basic"
                        label="Transport"
                        variant="outlined"
                        size="small"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-1"></div>
                    <div className="col-md-4 m-auto">
                      <p className="textbld">LST No.</p>
                    </div>
                    <div className="col-md-7">
                      <TextField
                        className="row "
                        defaultValue={selectedAccount.lstNo}
                        onChange={(e) => setEditLstNumber(e.target.value)}
                        id="outlined-basic"
                        label="LST Number"
                        variant="outlined"
                        size="small"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-1"></div>
                    <div className="col-md-4 m-auto">
                      <p className="textbld">Bank A/C No.</p>
                    </div>
                    <div className="col-md-7">
                      <TextField
                        className="row "
                        defaultValue={selectedAccount.bankAcNo}
                        onChange={(e) =>
                          setEditBankAccountNumber(e.target.value)
                        }
                        id="outlined-basic"
                        label="Bank Account Number"
                        variant="outlined"
                        size="small"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-4  m-auto">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <div className="row">
                <Button
                  className="col-md-5 textbld m-auto m-2
                 bg_color"
                  onClick={() => editAccount(selectedAccount._id)}
                >
                  Modify Account
                </Button>
                <Button
                  // onClick={() => setItem(false)}
                  onClick={() => setModifyAccount(false)}
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

export default Acountgroupdetails;
