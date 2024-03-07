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

function Skucode() {
  const [item, setItem] = useState(false);
  const [Name, setName] = useState([]);
  const [skucode, setskucode] = useState("");
  const [purchaseprice, setpurchaseprice] = useState("");
  const [purchasedesc, setpurchasedesc] = useState("");

  const [allskucode, setallskucode] = useState([]);
  const [activeGroups, setActiveGroups] = useState([]);

  const [selectedGroup, setSelectedGroup] = useState({});

  const [showDropdown, setShowDropdown] = useState(false);
  const [ModifyAccount, setModifyAccount] = useState(false);
  const [searchaccountgroupname, setsearchaccountgroupname] = useState("");

  const handleRowClicked = (row) => {
    console.log("Clicked Row:", row);
    setSelectedGroup(row);
    setModifyAccount(true);
  };
  console.log("selectedGroup", selectedGroup);

  useEffect(() => {
    getAllskucode();
  }, []);

  const getAllskucode = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9001/api/master/skucode/getAllskucode"
      );
      if (response.status === 200) {
        console.log("Account Group=====>", response.data);
        setallskucode(response.data.allskucode);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const filterdata = allskucode.filter((item) =>
    item.skucode.toLowerCase().includes(searchaccountgroupname)
  );

  const addskucode = async () => {
    if (!skucode | !purchaseprice | !purchasedesc) {
      alert("Fill Mandatory Fields");
    } else {
      try {
        const config = {
          url: "/master/skucode/addskucode",
          method: "post",
          baseURL: "http://localhost:9001/api",
          headers: { "content-type": "application/json" },
          data: {
            skucode: skucode,
            purchaseprice: purchaseprice,
            purchasedesc: purchasedesc,
          },
        };
        let res = await axios(config);
        console.log(res.status);
        if (res.status === 200) {
          console.log(res.data);
          alert("skucode Added");
          window.location.reload();
        }
      } catch (error) {
        console.log(error.response);
        alert("Error in Adding Account Group");
      }
    }
  };

  const editskucode = async (selectedAccountId) => {
    try {
      const config = {
        url: `/master/skucode/editskucode/${selectedAccountId}`,
        method: "put",
        baseURL: "http://localhost:9001/api",
        headers: { "content-type": "application/json" },
        data: {
          skucode: skucode,
          purchaseprice: purchaseprice,
          purchasedesc: purchasedesc,
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
        `http://localhost:9001/api/master/skucode/deleteskucode/${id}`
      );
      if (response.status === 200) {
        console.log(response.data);
        alert("Account has been deleted");
        getAllskucode();
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const columns = [
    {
      selector: (row, index) => index + 1,
      name: "Sl.No",
    },
    {
      name: "Sku Code",
      selector: (row) => row.skucode,
      sortable: true,
    },
    {
      name: "Purchase Price",
      selector: (row) => row.purchaseprice,
      sortable: true,
    },
    {
      name: "Purchase Description",
      selector: (row) => row.purchasedesc,
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
              <h2>Sku Code</h2>
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
                placeholder="Search Skucode..."
                type="text"
                onChange={(e) => setsearchaccountgroupname(e.target.value)}
              />
            </div>

            <div className="col-md-4 m-auto"></div>
          </div>
          <div className="row m-auto">
            <DataTable columns={columns} data={filterdata} pagination />
          </div>
        </>
      )}
      {/* ...................new account group........... */}
      {item && !ModifyAccount && (
        <div className="container ">
          <p className="row   m-auto ">
            <h2 className="textbld  mt-3 ">New Sku Code</h2>
          </p>
          <div className="col-md-9">
            <div className="row p-3">
              <div className="col-md-4">
                <p className="colr-red  textbld">Skucode*</p>
              </div>
              <div className="col-md-8">
                <Form.Control
                  className="shadow-sm"
                  onChange={(e) => setskucode(e.target.value)}
                />
              </div>
            </div>
            <div className="row p-3">
              <div className="col-md-4">
                <p className="colr-red textbld">Purchase Price*</p>
              </div>
              <div className="col-md-8">
                <Form.Control
                  className="shadow-sm"
                  onChange={(e) => setpurchaseprice(e.target.value)}
                />
              </div>
            </div>
            <div className="row p-3">
              <div className="col-md-4">
                <p className="colr-red textbld">Purchase Description*</p>
              </div>
              <div className="col-md-8">
                <Form.Control
                  className="shadow-sm"
                  onChange={(e) => setpurchasedesc(e.target.value)}
                />
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
                  onClick={addskucode}
                >
                  Add Skucode
                </Button>
                <Button
                  onClick={() => setItem(false)}
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
      {/* .......................modify group */}
      {!item && ModifyAccount && (
        <div className="container ">
          <p className="row   m-auto ">
            <h2 className="textbld  mt-3 ">Modify Sku Code</h2>
          </p>
          <div className="col-md-9">
            <div className="row p-3">
              <div className="col-md-4">
                <p className="colr-red  textbld">Sku Code*</p>
              </div>
              <div className="col-md-8">
                <Form.Control
                  className="shadow-sm"
                  defaultValue={selectedGroup.skucode}
                  onChange={(e) => setskucode(e.target.value)}
                />
              </div>
            </div>
            <div className="row p-3">
              <div className="col-md-4">
                <p className="colr-red textbld">Purchase Price*</p>
              </div>
              <div className="col-md-8">
                <Form.Control
                  className="shadow-sm"
                  defaultValue={selectedGroup.purchaseprice}
                  onChange={(e) => setpurchaseprice(e.target.value)}
                />
              </div>
            </div>
            <div className="row p-3">
              <div className="col-md-4">
                <p className="colr-red textbld">Purchase Description*</p>
              </div>
              <div className="col-md-8">
                <Form.Control
                  className="shadow-sm"
                  defaultValue={selectedGroup.purchasedesc}
                  onChange={(e) => setpurchasedesc(e.target.value)}
                />
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
                  onClick={() => editskucode(selectedGroup._id)}
                >
                  Modify Sku Code
                </Button>
                <Button
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
export default Skucode;
