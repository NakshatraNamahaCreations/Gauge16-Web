import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/esm/Button";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import { TextField } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Deliverychallangroup() {
  const [item, setItem] = useState(false);
  const [Name, setName] = useState([]);
  const [deliverychallanGroupName, setdeliverychallanGroupName] = useState("");
  const [AliasName, setAliasName] = useState("");
  const [selectprimary, setselectprimary] = useState("");
  const [underGroup, setunderGroup] = useState("");
  const [allAccountGroups, setAllAccountGroups] = useState([]);
  const [activeGroups, setActiveGroups] = useState([]);

  const [selectedGroup, setSelectedGroup] = useState({});

  const [selected, setSelected] = useState("All Account Group");
  const [showDropdown, setShowDropdown] = useState(false);
  const [ModifyAccount, setModifyAccount] = useState(false);
  const [searchaccountgroupname, setsearchaccountgroupname] = useState("");

  const handleRowClicked = (row) => {
    console.log("Clicked Row:", row);
    setSelectedGroup(row);
    setModifyAccount(true);
  };
  console.log("selectedGroup", selectedGroup);

  const handleRowSelectedList = (e) => {
    const selectedItem = e.target.innerText.trim();
    setSelected(selectedItem);
    setShowDropdown(false);
  };

  const handleDropdownToggle = (isOpen) => {
    setShowDropdown(isOpen);
  };

  useEffect(() => {
    getAllAccountGroup();
  }, []);

  const getAllAccountGroup = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9001/api/deliverychallan/challangroup/getAlldeliverychallanGroups"
      );
      if (response.status === 200) {
        console.log("Account Group=====>", response.data);
        setAllAccountGroups(response.data.alldeliverychallangroup);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const filterdata = allAccountGroups.filter((item) =>
    item.deliverychallanGroupName.toLowerCase().includes(searchaccountgroupname)
  );

  const addchallanGroups = async () => {
    if (!deliverychallanGroupName | !AliasName) {
      alert("Fill Mandatory Fields");
    } else {
      try {
        const config = {
          url: "/deliverychallan/challangroup/adddeliverychallanGroups",
          method: "post",
          baseURL: "http://localhost:9001/api",
          headers: { "content-type": "application/json" },
          data: {
            deliverychallanGroupName: deliverychallanGroupName,
            aliasName: AliasName,
            primaryGroup: selectprimary,
            underGroup: selectprimary === "Yes" ? "" : underGroup,
          },
        };
        let res = await axios(config);
        console.log(res.status);
        if (res.status === 200) {
          console.log(res.data);
          alert("Account group Added");
          window.location.reload();
        }
      } catch (error) {
        console.log(error.response);
        alert("Error in Adding Account Group");
      }
    }
  };

  const navigate = useNavigate();

  const itemgroupdetails = (id) => {
    navigate(`/deliverychallangroupdetail/${id}`);
  };

  const handleRowClick = (row) => {
    itemgroupdetails(row._id);
  };

  const editchallanAccount = async (selectedAccountId) => {
    try {
      const config = {
        url: `/deliverychallan/challangroup/editAccountGroups/${selectedAccountId}`,
        method: "put",
        baseURL: "http://localhost:9001/api",
        headers: { "content-type": "application/json" },
        data: {
          deliverychallanGroupName: deliverychallanGroupName,
          aliasName: AliasName,
          primaryGroup: selectprimary,
          underGroup: selectprimary === "Yes" ? "" : underGroup,
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
      alert("Something went wrong! Try again....");
    }
  };

  const deleteAccount = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:9001/api/deliverychallan/challangroup/deleteAccountGroups/${id}`
      );
      if (response.status === 200) {
        console.log(response.data);
        alert("Account has been deleted");

        getAllAccountGroup();
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const columns = [
    {
      name: "Deliverychallan Group Name",
      selector: (row) => row.deliverychallanGroupName,
      sortable: true,
    },
    {
      name: "Alias Name",
      selector: (row) => row.aliasName,
      sortable: true,
    },
    {
      name: "Primary Group",
      selector: (row) => row.primaryGroup,
      sortable: true,
    },

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

  return (
    <>
      {!item && !ModifyAccount && (
        <>
          <div className="row mt-4  m-auto ">
            <div className="col-md-4 ">
              <h2>Deliverychallan Group</h2>
            </div>
            <div className="col-md-5 me-auto"></div>
            <div className="col-md-3">
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
            </div>
          </div>

          <div className="row mt-3 m-auto">
            <div className="col-md-4 ">
              <Form.Control
                className="col-md-4 mb-3"
                placeholder="Search Delivery Challan Group Name..."
                type="text"
                onChange={(e) => setsearchaccountgroupname(e.target.value)}
              />
            </div>

            <div className="col-md-4 m-auto"></div>

            {/* <NavDropdown
              className="col-md-2 textbld  m-auto"
              title={selected}
              show={showDropdown}
              onSelect={handleRowSelectedList}
              onToggle={handleDropdownToggle}
            >
              <ul className="row p-3 m-auto" style={{ width: "220px" }}>
                <li
                  onClick={(e) => handleRowSelectedList(e)}
                  className="p-1 m-auto list_inner"
                >
                  All Account Group
                </li>
                <li
                  onClick={(e) => handleRowSelectedList(e)}
                  className="p-1 m-auto list_inner"
                >
                  {" "}
                  Active Account Group
                </li>
                <li
                  onClick={(e) => handleRowSelectedList(e)}
                  className="p-1 m-auto list_inner"
                >
                  {" "}
                  Inactive Account Group
                </li>{" "}
              </ul>
            </NavDropdown> */}
          </div>
          <div className="row m-auto">
            <DataTable
              columns={columns}
              data={filterdata}
              onRowClicked={handleRowClick}
              pagination
            />
          </div>
        </>
      )}
      {/* ...................new account group........... */}
      {item && !ModifyAccount && (
        <div className="container ">
          <p className="row   m-auto ">
            <h2 className="textbld  mt-3 ">New Deliverychallan Group</h2>
          </p>
          <div className="col-md-9">
            <div className="row p-3">
              <div className="col-md-4">
                <p className="colr-red  textbld">Deliverychallan Group Name*</p>
              </div>
              <div className="col-md-8">
                <Form.Control
                  className="shadow-sm"
                  onChange={(e) => setdeliverychallanGroupName(e.target.value)}
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
                <p className="colr-red textbld">Primary Group(Y/N)*</p>
              </div>
              <div className="col-md-8">
                <Form.Select
                  className=""
                  value={selectprimary}
                  label="Unit"
                  onChange={(e) => setselectprimary(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Form.Select>
              </div>
            </div>
            <div className="row p-3">
              <div className="col-md-4">
                <p
                  className={
                    selectprimary === "Yes"
                      ? "adclr colr-red textbld"
                      : "colr-red textbld"
                  }
                >
                  Under Group*
                </p>
              </div>
              <div className="col-md-8">
                <Form.Select
                  onChange={(e) => setunderGroup(e.target.value)}
                  disabled={selectprimary === "Yes"}
                >
                  <option value="">Select</option>
                  {allAccountGroups?.map((ele) => {
                    return (
                      <option value={ele.deliverychallanGroupName}>
                        {ele.deliverychallanGroupName}
                      </option>
                    );
                  })}
                </Form.Select>
              </div>
            </div>
          </div>

          <div className="row mb-4  m-auto">
            <div className="col-md-2"></div>
            <div className="col-md-6">
              <div className="row">
                <Button
                  className="col-md-5 
                textbld m-auto m-2 bg_color"
                  onClick={addchallanGroups}
                >
                  Add Deliverychallan Group
                </Button>
                <Button
                  onClick={() => setItem(false)}
                  className="col-md-5 textbld m-auto m-2"
                  variant="light"
                >
                  Cancel
                </Button>
              </div>
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
      )}
      {/* .......................modify group */}
      {!item && ModifyAccount && (
        <div className="container ">
          <p className="row   m-auto ">
            <h2 className="textbld  mt-3 ">Modify Deliverychallan Group</h2>
          </p>
          <div className="col-md-9">
            <div className="row p-3">
              <div className="col-md-4">
                <p className="colr-red  textbld">Deliverychallan Group Name*</p>
              </div>
              <div className="col-md-8">
                <Form.Control
                  className="shadow-sm"
                  defaultValue={selectedGroup.deliverychallanGroupName}
                  onChange={(e) => setdeliverychallanGroupName(e.target.value)}
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
                  defaultValue={selectedGroup.aliasName}
                  onChange={(e) => setAliasName(e.target.value)}
                />
              </div>
            </div>
            <div className="row p-3">
              <div className="col-md-4">
                <p className="colr-red textbld">Primary Group(Y/N)*</p>
              </div>
              <div className="col-md-8">
                <Form.Select
                  className=""
                  value={selectprimary || selectedGroup.primaryGroup}
                  label="Unit"
                  onChangeCapture={(e) => setselectprimary(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Form.Select>
              </div>
            </div>
            <div className="row p-3">
              <div className="col-md-4">
                <p
                  className={
                    selectprimary === "Yes"
                      ? "adclr colr-red textbld"
                      : "colr-red textbld"
                  }
                >
                  Under Group*
                </p>
              </div>
              <div className="col-md-8">
                <Form.Select
                  onChange={(e) => setunderGroup(e.target.value)}
                  disabled={selectprimary === "Yes"}
                  value={underGroup || selectedGroup.underGroup}
                >
                  <option value="">Select</option>
                  {allAccountGroups?.map((ele) => {
                    return (
                      <option value={ele.deliverychallanGroupName}>
                        {ele.deliverychallanGroupName}
                      </option>
                    );
                  })}
                </Form.Select>
              </div>
            </div>
          </div>

          <div className="row mb-4  m-auto">
            <div className="col-md-2"></div>
            <div className="col-md-6">
              <div className="row">
                <Button
                  className="col-md-5 textbld m-auto m-2
                 bg_color"
                  onClick={() => editchallanAccount(selectedGroup._id)}
                >
                  Modify deliverychallan Group
                </Button>
                <Button
                  onClick={() => setModifyAccount(false)}
                  className="col-md-5 textbld m-auto m-2"
                  variant="light"
                >
                  Cancel
                </Button>
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
export default Deliverychallangroup;
