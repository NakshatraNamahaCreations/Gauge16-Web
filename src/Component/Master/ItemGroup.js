import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/esm/Button";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import NavDropdown from "react-bootstrap/NavDropdown";
import InputLabel from "@mui/material/InputLabel";
import Form from "react-bootstrap/Form";
import { TextField } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Dropdown from "react-bootstrap/Dropdown";
import AddIcon from "@mui/icons-material/Add";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ItemGroup() {
  const [item, setItem] = useState(false);
  const [selected, setSelected] = useState("All Items Groups");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleRowSelectedList = (e) => {
    const selectedItem = e.target.innerText.trim();
    setSelected(selectedItem);
    setShowDropdown(false);
    if (selectedItem === "Active Item Group") {
      setSelectedStatus("Active");
    } else if (selectedItem === "Inactive Item Group") {
      setSelectedStatus("InActive");
    } else {
      setSelectedStatus("All");
    }
  };

  const handleDropdownToggle = (isOpen) => {
    setShowDropdown(isOpen);
  };
  const [allitemgroupdata, setallitemgroupdata] = useState([]);
  const [unitFrom, setunitFrom] = useState("kg");
  const [unitTo, setunitTo] = useState("kg");
  const [taxable, setTaxable] = useState(false);
  const [selectedTaxCategory, setSelectedTaxCategory] = useState("");
  const [categoryObjects, setCategoryObjects] = useState({});

  const [itemGroupName, setitemGroupName] = useState("");
  const [aliasName, setaliasName] = useState("");
  const [primaryGroup, setprimaryGroup] = useState("");
  const [underGroup, setunderGroup] = useState("");
  const [description, setdescription] = useState("");
  const [tax, settax] = useState("");
  const [hsnCode, sethsnCode] = useState("");
  const [manufacturersCode, setmanufacturersCode] = useState("");
  const [itemGroupCategory, setitemGroupCategory] = useState("");
  const [openingStock, setopeningStock] = useState("");
  const [openingStockRatePerUnit, setopeningStockRatePerUnit] = useState("");
  const [reOrderLevel, setreOrderLevel] = useState("");
  const [itemsGroupImage, setitemsGroupImage] = useState("");
  const [filtergroupname, setfiltergroupname] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All"); // Default to show all items

  const filterdata = allitemgroupdata.filter((item) =>
    item.itemGroupName.toLowerCase().includes(filtergroupname.toLowerCase())
  );

  const filteredData = filterdata.filter((item) => {
    if (selectedStatus === "All") {
      return true; // Show all items
    } else {
      return item.itemgroupstatus === selectedStatus;
    }
  });

  const navigate = useNavigate();

  const itemgroupdetails = (id) => {
    navigate(`/itemgroupdetails/${id}`);
  };

  const handleRowClick = (row) => {
    itemgroupdetails(row._id);
  };

  const columns = [
    {
      selector: (row, index) => index + 1,
      name: "Sl.No",
    },
    {
      selector: (row) => row.itemGroupName,
      name: "Group Name",
      sort: true,
    },

    {
      selector: (row) => row.manufacturersCode,
      name: "Manufacturers's SKU Code",
      sort: true,
    },

    {
      selector: (row) => row.hsnCode,
      name: "HSN Code",
      sort: true,
    },
    {
      selector: (row) => row.description.substr(0, 100),
      name: "Description",
      sort: true,
    },
    {
      name: "Status",
      sortable: true,
      cell: (row) => (
        <div>
          <button
            style={{
              border: "1px solid #2a982e",
              color: row.itemgroupstatus === "Active" ? "white" : "#2a982e",
              backgroundColor:
                row.itemgroupstatus === "Active" ? "#2a982e" : "white",
            }}
            onClick={() => activeAccount(row._id)}
          >
            Active
          </button>
          <button
            style={{
              border: "1px solid #E91E63",
              color: row.itemgroupstatus === "InActive" ? "white" : "#E91E63",
              backgroundColor:
                row.itemgroupstatus === "InActive" ? "#E91E63" : "white",
            }}
            onClick={() => inActiveAccount(row._id)}
          >
            InActive
          </button>
        </div>
      ),
    },

    {
      name: "Action",
      selector: (row) => (
        <div>
          <i
            class="fa-solid fa-trash-can"
            onClick={() => deletegroupitem(row)}
            style={{ color: "red", cursor: "pointer" }}
          ></i>
          <i
            title="Edit"
            class="fa-regular fa-pen-to-square ms-2"
            style={{ cursor: "pointer" }}
            onClick={() => handlerowedit(row)}
          ></i>
        </div>
      ),
    },
  ];

  const AddItemGroup = async (e) => {
    if (!itemGroupName || !aliasName) {
      alert("Please Fill All Fields");
    } else {
      const formdata = new FormData();
      e.preventDefault();
      formdata.append("itemGroupName", itemGroupName);
      formdata.append("aliasName", aliasName);
      formdata.append("primaryGroup", primaryGroup);
      formdata.append("underGroup", underGroup);
      formdata.append("description", description);
      formdata.append("tax", tax);
      formdata.append("hsnCode", hsnCode);
      formdata.append("manufacturersCode", manufacturersCode);
      formdata.append("itemGroupCategory", itemGroupCategory);
      formdata.append("openingStock", openingStock);
      formdata.append("openingStockRatePerUnit", openingStockRatePerUnit);
      formdata.append("reOrderLevel", reOrderLevel);
      formdata.append("itemsGroupImage", itemsGroupImage);
      formdata.append("itemgroupstatus", "Active");

      try {
        const config = {
          url: "/master/itemgroups/additemgroups",
          method: "POST",
          baseURL: "http://localhost:9001/api",
          data: formdata,
        };
        await axios(config).then(function (res) {
          if (res.status === 200) {
            console.log("success", res);
            alert(res.data.success);
            window.location.assign("/ItemGroup");
          }
        });
      } catch (error) {
        console.log(error);
        alert("not able to complete");
      }
    }
  };

  const editItemGroup = async (e) => {
    const formdata = new FormData();
    e.preventDefault();
    formdata.append("itemGroupName", itemGroupName);
    formdata.append("aliasName", aliasName);
    formdata.append("primaryGroup", primaryGroup);
    formdata.append("underGroup", underGroup);
    formdata.append("description", description);
    formdata.append("tax", tax);
    formdata.append("hsnCode", hsnCode);
    formdata.append("manufacturersCode", manufacturersCode);
    formdata.append("itemGroupCategory", itemGroupCategory);
    formdata.append("openingStock", openingStock);
    formdata.append("openingStockRatePerUnit", openingStockRatePerUnit);
    formdata.append("reOrderLevel", reOrderLevel);
    formdata.append("itemsGroupImage", itemsGroupImage);

    try {
      const config = {
        url: `/master/itemgroups/edititemgroups/${categoryObjects._id}`,
        method: "put",
        baseURL: "http://localhost:9001/api",
        data: formdata,
      };
      await axios(config).then(function (res) {
        if (res.status === 200) {
          console.log("success", res);
          alert(res.data.message);
          window.location.assign("/ItemGroup");
        }
      });
    } catch (error) {
      console.log(error);
      alert("not able to complete");
    }
  };

  useEffect(() => {
    getItemgroup();
  }, []);

  const getItemgroup = async () => {
    let res = await axios.get(
      "http://localhost:9001/api/master/itemgroups/getallitemgroups"
    );
    if (res.status === 200) {
      console.log(res);
      setallitemgroupdata(res.data?.allItems);
    }
  };

  console.log("allitemgroupdata==", allitemgroupdata);

  const deletegroupitem = async (data) => {
    try {
      const res = await axios.delete(
        `http://localhost:9001/api/master/itemgroups/deleteitemgroups/${data._id}`
      );

      if (res.status === 200) {
        console.log(res.data);
        alert(res.data.message);
        getItemgroup();
      }
    } catch (error) {
      console.log("Error", error);
      alert("Cannot perform the operation");
    }
  };

  const activeAccount = async (selectedAccountId) => {
    try {
      const config = {
        url: `/master/itemgroups/itemgroupstatus/${selectedAccountId}`,
        method: "put",
        baseURL: "http://localhost:9001/api",
        headers: { "content-type": "application/json" },
        data: {
          itemgroupstatus: "Active",
        },
      };
      let response = await axios(config);
      if (response.status === 200) {
        console.log(response.data);
        alert("Account has been Activated");
        // window.location.reload();
        getItemgroup();
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const inActiveAccount = async (selectedAccountId) => {
    try {
      const config = {
        url: `/master/itemgroups/itemgroupstatus/${selectedAccountId}`,
        method: "put",
        baseURL: "http://localhost:9001/api",
        headers: { "content-type": "application/json" },
        data: {
          itemgroupstatus: "InActive",
        },
      };
      let response = await axios(config);
      if (response.status === 200) {
        console.log(response.data);
        alert("Account has been InActivated");

        getItemgroup();
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const [expanded, setExpanded] = useState(false);

  const handleChangeAccordian = () => {
    setExpanded(!expanded);
  };

  const [ModifyItesGroup, setModifyItesGroup] = useState(false);

  const handlerowedit = (row) => {
    setModifyItesGroup(true);
    setCategoryObjects(row);
  };

  console.log("itemsGroupImage=====", itemsGroupImage);
  console.log("======", categoryObjects);

  return (
    <>
      {!item && !ModifyItesGroup && (
        <>
          <div className="row mt-4  m-auto ">
            <div className="col-md-4">
              <h2>Item Group</h2>
            </div>
            <div className="col-md-5 m-auto"></div>
            <div className="col-md-3">
              <div className="d-flex ">
                <span className="m-auto">
                  <img width={30} height={30} src="../Images/sort.png" alt="" />
                </span>
                <Button
                  className="  m-auto bgcolr bordernone "
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
                placeholder="Search Group Name....."
                type="text"
                value={filtergroupname}
                onChange={(e) => setfiltergroupname(e.target.value)}
              />
            </div>

            <div className="col-md-5 me-auto"></div>

            <NavDropdown
              className="col-md-2 textbld  m-auto"
              title={selected}
              show={showDropdown}
              onSelect={handleRowSelectedList}
              onToggle={handleDropdownToggle}
            >
              <ul className="row p-1 m-auto" style={{ width: "180px" }}>
                <li
                  onClick={(e) => handleRowSelectedList(e)}
                  className="p-1 m-auto list_inner"
                >
                  All Item Group
                </li>
                <li
                  onClick={(e) => handleRowSelectedList(e)}
                  className="p-1 m-auto list_inner"
                >
                  Active Item Group
                </li>
                <li
                  onClick={(e) => handleRowSelectedList(e)}
                  className="p-1 m-auto list_inner"
                >
                  Inactive Item Group
                </li>
              </ul>
            </NavDropdown>
          </div>
          <div className="row m-auto">
            <div className="col-md-12">
              <DataTable
                columns={columns}
                data={filteredData}
                pagination
                // handleRowSelectedList={itemgroupdetails}
                onRowClicked={handleRowClick}
              />
            </div>
          </div>
        </>
      )}
      {item && !ModifyItesGroup && (
        <div className="container mt-3">
          <div
            className="p-2"
            style={{ cursor: "pointer" }}
            onClick={() => setItem(false)}
          >
            <i class="fa-solid fa-backward"></i> Back
          </div>
          <p className="row   m-auto ">
            <h2 className="textbld">New Items Group</h2>
          </p>
          <div className="row  m-auto ">
            <div className="col-md-9">
              <div className="row p-3">
                <div className="col-md-4">
                  <p className="colr-red">Item Group Name*</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    className="shadow-sm"
                    onChange={(e) => setitemGroupName(e.target.value)}
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
                    onChange={(e) => setaliasName(e.target.value)}
                  />
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-4">
                  <p>Primary Group(Y/N)</p>
                </div>
                <div className="col-md-8">
                  <Form.Select
                    className=""
                    value={primaryGroup}
                    label="Unit"
                    onChangeCapture={(e) => setprimaryGroup(e.target.value)}
                  >
                    <option disabled>Select</option>
                    <option value={"Yes"}>Yes</option>
                    <option value={"No"}>No</option>
                  </Form.Select>
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-4">
                  <p className={primaryGroup === "Yes" ? "adclr" : ""}>
                    Under Group
                  </p>
                </div>
                <div className="col-md-8">
                  <Form.Select
                    onChange={(e) => setunderGroup(e.target.value)}
                    disabled={primaryGroup === "Yes"}
                  >
                    {allitemgroupdata?.map((ele) => {
                      return (
                        <option value={ele.id}>{ele.itemGroupName}</option>
                      );
                    })}
                    <option value={"General"}>General</option>
                  </Form.Select>
                </div>
              </div>

              <div className="row p-3">
                <div className="col-md-4">
                  <p>Description</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    type="textarea"
                    onChange={(e) => setdescription(e.target.value)}
                  />
                </div>
              </div>
              {/* <div className="row p-3">
                <div className="col-md-4">
                  <div className="row">
                    <div className="col-md-4">
                      <Form.Check
                        inline
                        type="radio"
                        label="Taxable"
                        name="group"
                        onClick={() => setTaxable(true)}
                        checked={taxable}
                      />
                    </div>
                    <div className="col-md-8">
                      <Form.Check
                        inline
                        type="radio"
                        label="Non-Taxable"
                        name="group"
                        checked={!taxable}
                        onChange={() => setTaxable(false)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <Form.Select
                    value={tax}
                    onChange={(e) => settax(e.target.value)}
                    disabled={!taxable}
                  >
                    <option>Select</option>
                    <option value="Income Tax">Income Tax</option>
                    <option value="Retail">Retail</option>
                    <option value="Manufacturers">Manufacturers</option>
                    <option value="Wholesale">Wholesale</option>
                  </Form.Select>
                </div>
              </div> */}
            </div>
            <div className="col-md-3 text-center">
              <Form.Label className="text-center borders">
                {!itemsGroupImage && (
                  <>
                    <AddIcon className="addicon" />
                  </>
                )}

                <Form.Control
                  className="shadow-sm"
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => setitemsGroupImage(e.target.files[0])}
                />

                {itemsGroupImage && (
                  <img
                    src={URL.createObjectURL(itemsGroupImage)}
                    alt="Selected Image"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "200px",
                      // marginTop: "-40px",
                      padding: "10px",
                    }}
                  />
                )}
              </Form.Label>
              <p className=" m-auto text-center textbld"> Add Images</p>
            </div>
          </div>

          <div className="row  m-auto ">
            <div className="col-md-6 ">
              <div className="row mb-3  ms-3">
                <h6>More Fields</h6>
              </div>
              <div className="row mb-3 ">
                <div className="col-md-1"></div>
                <div className="col-md-4 m-auto">
                  <InputLabel className="textbld">HSN Code</InputLabel>
                </div>
                <div className="col-md-7">
                  <TextField
                    id="outlined-basic"
                    label="HSN Code"
                    variant="outlined"
                    size="small"
                    onChange={(e) => sethsnCode(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mb-3 ">
                <div className="col-md-1"></div>
                <div className="col-md-4 m-auto">
                  <InputLabel className="textbld">
                    Manufacturers Code
                  </InputLabel>
                </div>
                <div className="col-md-7">
                  <TextField
                    id="outlined-basic"
                    label="Manufacturers Code"
                    variant="outlined"
                    size="small"
                    onChange={(e) => setmanufacturersCode(e.target.value)}
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
                  onClick={AddItemGroup}
                >
                  Add Item Group
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
          {/* */}
        </div>
      )}

      {/* Edit Function Code */}

      {!item && ModifyItesGroup && (
        <div className="container mt-3 ">
          <div
            className="p-2"
            style={{ cursor: "pointer" }}
            onClick={() => setModifyItesGroup(false)}
          >
            <i class="fa-solid fa-backward"></i> Back
          </div>
          <p className="row   m-auto ">
            <h2 className="textbld  mt-3 ">Modify Items Group</h2>
          </p>
          <div className="row m-auto ">
            <div className="col-md-9">
              <div className="row p-3">
                <div className="col-md-4">
                  <p className="textbld">Item Group Name</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    className="shadow-sm"
                    onChange={(e) => setitemGroupName(e.target.value)}
                    defaultValue={categoryObjects.itemGroupName}
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
                    onChange={(e) => setaliasName(e.target.value)}
                    defaultValue={categoryObjects.aliasName}
                  />
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-4">
                  <p className="textbld">Primary Group(Y/N)</p>
                </div>
                <div className="col-md-8">
                  <Form.Select
                    className=""
                    value={primaryGroup}
                    label="Unit"
                    onChangeCapture={(e) => setprimaryGroup(e.target.value)}
                  >
                    <option disabled>Select</option>
                    <option value={"Yes"}>Yes</option>
                    <option value={"No"}>No</option>
                  </Form.Select>
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-4">
                  <p
                    className={
                      primaryGroup === "Yes" ? "textbld adclr" : "textbld"
                    }
                  >
                    Under Group
                  </p>
                </div>
                <div className="col-md-8 ">
                  <Form.Select
                    className="textbld"
                    onChange={(e) => setunderGroup(e.target.value)}
                    disabled={primaryGroup === "Yes"}
                    value={underGroup || categoryObjects.underGroup}
                  >
                    {allitemgroupdata?.map((ele) => {
                      return (
                        <option value={ele.id}>{ele.itemGroupName}</option>
                      );
                    })}
                    <option value={"General"}>General</option>
                  </Form.Select>
                </div>
              </div>

              <div className="row p-3">
                <div className="col-md-4">
                  <p className="textbld">Description</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    type="textarea"
                    onChange={(e) => setdescription(e.target.value)}
                    defaultValue={categoryObjects.description}
                  />
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-4">
                  <div className="row">
                    <div className="col-md-4">
                      <Form.Check
                        inline
                        type="radio"
                        label="Taxable"
                        name="group"
                        onClick={() => setTaxable(true)}
                        checked={taxable}
                      />
                    </div>
                    <div className="col-md-8">
                      <Form.Check
                        inline
                        type="radio"
                        label="Non-Taxable"
                        name="group"
                        checked={!taxable}
                        onChange={() => setTaxable(false)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <Form.Select
                    // value={selectedTaxCategory}
                    disabled={!taxable}
                    onChange={(e) => settax(e.target.value)}
                    value={tax || categoryObjects.tax}
                  >
                    <option>Select</option>
                    <option value="Income Tax">Income Tax</option>
                    <option value="Retail">Retail</option>
                    <option value="Manufacturers">Manufacturers</option>
                    <option value="Wholesale">Wholesale</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="col-md-3 text-center">
              <Form.Label className="text-center borders">
                {/* {!itemsGroupImage && (
                  <>
                    <AddIcon className="addicon" />
                  </>
                )} */}

                <Form.Control
                  className="shadow-sm"
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => setitemsGroupImage(e.target.files[0])}
                />
                {itemsGroupImage ? (
                  <img
                    src={URL.createObjectURL(itemsGroupImage)}
                    alt="Selected Image"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "200px",
                      // marginTop: "-40px",
                      padding: "10px",
                    }}
                  />
                ) : (
                  <img
                    src={`http://localhost:9001/item_groups/${categoryObjects.itemsGroupImage}`}
                    alt=""
                    style={{
                      maxWidth: "100%",
                      maxHeight: "200px",
                      // marginTop: "-40px",
                      padding: "10px",
                    }}
                  />
                )}
              </Form.Label>
              <p className=" m-auto text-center textbld"> Add Images</p>
            </div>
          </div>

          <div className="row  m-auto ">
            <div className="col-md-6 ">
              <Accordion
                className={`shadow-sm mb-3 ${
                  expanded ? "accordin_conatiner2" : "accordin_conatiner"
                }`}
              >
                <AccordionSummary
                  className="togleques"
                  expandIcon={
                    <img
                      onClick={handleChangeAccordian}
                      width={70}
                      height={70}
                      alt=""
                      src={
                        !expanded ? "../Images/on (2).png" : "../Images/off.png"
                      }
                    />
                  }
                >
                  <Typography> Track Inventory For This Items </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="row mb-3">
                    <p className="col-md-6">Items Group Category</p>
                    <div className="col-md-6">
                      <Form.Control
                        sx={{ m: 1, width: "30ch" }}
                        size="small"
                        onChange={(e) => setitemGroupCategory(e.target.value)}
                        defaultValue={categoryObjects.itemGroupCategory}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <p className="col-md-6">Opening Stock</p>
                    <div className="col-md-6">
                      <Form.Control
                        onChange={(e) => setopeningStock(e.target.value)}
                        defaultValue={categoryObjects.openingStock}
                        sx={{ m: 1, width: "30ch" }}
                        size="small"
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <p className="col-md-6">Opening Stock Rate Per Unit </p>
                    <div className="col-md-6">
                      <Form.Control
                        sx={{ m: 1, width: "30ch" }}
                        size="small"
                        onChange={(e) =>
                          setopeningStockRatePerUnit(e.target.value)
                        }
                        defaultValue={categoryObjects.openingStockRatePerUnit}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <p className="col-md-6">Reorder Level </p>
                    <div className="col-md-6">
                      <Form.Control
                        sx={{ m: 1, width: "30ch" }}
                        size="small"
                        onChange={(e) => setreOrderLevel(e.target.value)}
                        defaultValue={categoryObjects.reOrderLevel}
                      />
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
            <div className="col-md-6 ">
              <div className="row mb-3  ">
                <h6>More Fields</h6>
              </div>
              <div className="row mb-3 ">
                <div className="col-md-1"></div>
                <div className="col-md-4 m-auto">
                  <InputLabel className="textbld">HSN Code</InputLabel>
                </div>
                <div className="col-md-7">
                  <TextField
                    id="outlined-basic"
                    label="HSN Code"
                    variant="outlined"
                    size="small"
                    onChange={(e) => sethsnCode(e.target.value)}
                    defaultValue={categoryObjects.hsnCode}
                  />
                </div>
              </div>
              <div className="row mb-3 ">
                <div className="col-md-1"></div>
                <div className="col-md-4 m-auto">
                  <InputLabel className="textbld">
                    Manufacturers Code
                  </InputLabel>
                </div>
                <div className="col-md-7">
                  <TextField
                    id="outlined-basic"
                    label="Manufacturers Code"
                    variant="outlined"
                    size="small"
                    onChange={(e) => setmanufacturersCode(e.target.value)}
                    defaultValue={categoryObjects.manufacturersCode}
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
                  onClick={editItemGroup}
                >
                  Modify Item Group
                </Button>
                <Button
                  onClick={() => setModifyItesGroup(false)}
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
export default ItemGroup;
