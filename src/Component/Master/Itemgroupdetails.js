import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/esm/Button";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import NavDropdown from "react-bootstrap/NavDropdown";
import { InputAdornment, TextField, Typography } from "@mui/material";
import Form from "react-bootstrap/Form";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import Dropdown from "react-bootstrap/Dropdown";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

function Itemgroupdetails() {
  const { id } = useParams();

  const [item, setItem] = useState(false);
  const [ModifyITems, setModifyITems] = useState(false);

  // Field input
  const [itemImage, setitemImage] = useState("");
  const [itemName, setitemName] = useState("");
  const [aliasName, setaliasName] = useState("");
  const [primaryGroup, setprimaryGroup] = useState("");
  const [underGroup, setunderGroup] = useState("");
  const [skuCode, setskuCode] = useState("");
  const [skuManufacturerCode, setskuManufacturerCode] = useState("");
  const [description, setdescription] = useState("");
  const [tax, settax] = useState("");
  const [unitRequired, setunitRequired] = useState("");
  const [unitFrom, setunitFrom] = useState("kg");
  const [unitTo, setunitTo] = useState("kg");
  const [sellingPrice, setsellingPrice] = useState("");
  const [salesDescription, setsalesDescription] = useState("");
  const [hsnCode, sethsnCode] = useState("");
  const [manufacturersCode, setmanufacturersCode] = useState("");
  const [brand, setbrand] = useState("");
  const [manufacturer, setmanufacturer] = useState("");
  const [weight, setweight] = useState("");
  const [dimensionsHeight, setdimensionsHeight] = useState("");
  const [dimensionsWidth, setdimensionsWidth] = useState("");
  const [dimensionsLength, setdimensionsLength] = useState("");
  const [purchasePrice, setpurchasePrice] = useState("");
  const [purchaseDescription, setpurchaseDescription] = useState("");
  const [itemGroupCategory, setitemGroupCategory] = useState("");
  const [openingStock, setopeningStock] = useState("");
  const [openingStockRatePerUnit, setopeningStockRatePerUnit] = useState("");
  const [reOrderLevel, setreOrderLevel] = useState("");
  const [preferredVendor, setpreferredVendor] = useState("");
  const [allitemgroupdata, setallitemgroupdata] = useState([]);
  const [allitemdata, setallitemdata] = useState([]);
  const [categoryObjects, setCategoryObjects] = useState({});
  const [filtergroupname, setfiltergroupname] = useState("");

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

  console.log("sumanraj---data", id);

  useEffect(() => {
    getItem();
  }, []);

  const getItem = async () => {
    let res = await axios.get(
      "http://localhost:9001/api/master/items/getallitems"
    );
    if (res.status === 200) {
      console.log(res);
      setallitemdata(
        res.data?.allItems.filter((item) => item.underGroup === id)
      );
    }
  };

  const filterdata = allitemdata.filter((item) =>
    item.itemName.toLowerCase().includes(filtergroupname.toLowerCase())
  );

  const Edititem = async () => {
    // if (!itemName || !aliasName) {
    //   alert("Please fill all fields");
    // } else {
    const formdata = new FormData();
    formdata.append("itemName", itemName);
    formdata.append("itemImage", itemImage);
    formdata.append("aliasName", aliasName);
    formdata.append("primaryGroup", primaryGroup);
    formdata.append("underGroup", underGroup);
    formdata.append("skuCode", skuCode);
    formdata.append("skuManufacturerCode", skuManufacturerCode);
    formdata.append("description", description);
    formdata.append("tax", tax);
    formdata.append("unitRequired", unitRequired);
    formdata.append("unitFrom", unitFrom);
    formdata.append("unitTo", unitTo);
    formdata.append("sellingPrice", sellingPrice);
    formdata.append("salesDescription", salesDescription);
    formdata.append("hsnCode", hsnCode);
    formdata.append("manufacturersCode", manufacturersCode);
    formdata.append("brand", brand);
    formdata.append("manufacturer", manufacturer);
    formdata.append("weight", weight);
    formdata.append("dimensionsHeight", dimensionsHeight);
    formdata.append("dimensionsWidth", dimensionsWidth);
    formdata.append("dimensionsLength", dimensionsLength);
    formdata.append("purchasePrice", purchasePrice);
    formdata.append("purchaseDescription", purchaseDescription);
    formdata.append("itemGroupCategory", itemGroupCategory);
    formdata.append("openingStock", openingStock);
    formdata.append("openingStockRatePerUnit", openingStockRatePerUnit);
    formdata.append("reOrderLevel", reOrderLevel);
    formdata.append("preferredVendor", preferredVendor);
    try {
      let config = {
        url: `master/items/edititem/${categoryObjects._id}`,
        method: "put",
        baseURL: "http://localhost:9001/api",
        data: formdata,
      };
      await axios(config).then(function (res) {
        if (res.status === 200) {
          console.log("success", res);
          alert(res.data.message);
          window.location.assign("/Items");
        }
      });
    } catch (error) {
      console.log(error);
      alert("not able to complete");
    }
    // }
  };

  const deleteitem = async (data) => {
    try {
      const res = await axios.delete(
        `http://localhost:9001/api/master/items/deleteitem/${data._id}`
      );

      if (res.status === 200) {
        console.log(res.data);
        alert(res.data.message);
        getItem();
      }
    } catch (error) {
      console.log("Error", error);
      alert("Cannot perform the operation");
    }
  };

  const handlerowedit = (row) => {
    setModifyITems(true);
    setCategoryObjects(row);
  };

  const columns = [
    {
      selector: (row, index) => index + 1,
      name: "Sl.No",
    },
    {
      selector: (row) => row.itemName,
      name: "Name",
      sort: true,
    },

    {
      selector: (row) => row.skuCode,
      name: "Your Company's SKU Code",
      sort: true,
    },

    {
      selector: (row) => row.description.substr(0, 100),
      name: "Description",
      sort: true,
    },
    {
      selector: (row) => row.sellingPrice,
      name: "Rate",
      sort: true,
    },

    {
      name: "Action",
      selector: (row) => (
        <div>
          <i
            class="fa-solid fa-trash-can"
            onClick={() => deleteitem(row)}
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

  const [selected, setSelected] = useState("All Items");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleRowSelectedList = (e) => {
    const selectedItem = e.target.innerText.trim();
    setSelected(selectedItem);
    setShowDropdown(false);
  };

  const handleDropdownToggle = (isOpen) => {
    setShowDropdown(isOpen);
  };

  const [selectprimary, setselectprimary] = useState("");
  // new

  const [taxable, setTaxable] = useState(false);
  const [selectedTaxCategory, setSelectedTaxCategory] = useState("");

  const [Name, setName] = useState([]);

  const handleDropdownToggle3 = (event) => {
    setunitTo(event.target.value);
  };

  const handleDropdownToggle2 = (event) => {
    setunitFrom(event.target.value);
  };

  const [expanded, setExpanded] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const handleChangeAccordian = (index) => {
    setExpanded(!expanded);
    setExpandedIndex(index);
  };
  const [lengths, setlengths] = useState("");
  const [widths, setwidths] = useState("");
  const [heights, setheights] = useState("");

  const conversionFactorKgToPieces = 5;
  const conversionFactorPiecesToDz = 12;
  const conversionFactorDzToPieces = 1 / conversionFactorPiecesToDz;
  const conversionFactorDzToKg = 0.5;

  let [CalculatedUnit, setCalculatedUnit] = useState(null);
  // const [opendelete, setopendelete] = useState(false);
  const [ProductQuantity, setProductQuantity] = useState("");
  const handleConvert = () => {
    let result;

    if (unitFrom === "Kg" && unitTo === "Kg") {
      result = ProductQuantity;
    } else if (unitFrom === "Pieces" && unitTo === "Pieces") {
      result = ProductQuantity;
    } else if (unitFrom === "Dozen" && unitTo === "Dozen") {
      result = ProductQuantity;
    } else if (unitFrom === "Kg" && unitTo === "Pieces") {
      result = ProductQuantity * conversionFactorKgToPieces;
    } else if (unitFrom === "Pieces" && unitTo === "Dozen") {
      result = ProductQuantity / conversionFactorPiecesToDz;
    } else if (unitFrom === "Dozen" && unitTo === "Pieces") {
      result = ProductQuantity * conversionFactorDzToPieces;
    } else if (unitFrom === "Pieces" && unitTo === "Kg") {
      result = ProductQuantity / conversionFactorKgToPieces;
    } else if (unitFrom === "Dozen" && unitTo === "Kg") {
      result = ProductQuantity * conversionFactorDzToKg;
    }

    setCalculatedUnit(result);
  };

  const handleChangeAccordian1 = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
    setExpanded(!expanded);
  };

  console.log("allitemdata====", allitemdata);

  return (
    <>
      {!item && !ModifyITems && (
        <>
          {/* <div className="row mt-4  m-auto ">
            <div className="col-md-2 ">
              <h1>Items</h1>
            </div>
            <div className="col-md-7"></div>
            <div className="col-md-3">
              <div className="d-flex">
                <span className="m-auto">
                  <img width={30} height={30} src="../Images/sort.png" alt="" />
                </span>
                <Button
                  className=" m-auto bgcolr bordernone "
                  onClick={() => setItem(true)}
                >
                  <span className="textbld m-auto">
                    New <AddOutlinedIcon />
                  </span>
                </Button>
              </div>
            </div>
          </div> */}

          <div className="row mt-3 m-auto">
            <div className="col-md-4 ">
              <Form.Control
                className="col-md-4 mb-3"
                placeholder="Search Name..."
                type="text"
                onChange={(e) => setfiltergroupname(e.target.value)}
              />
            </div>

            <div className="col-md-6 "></div>

            {/* <NavDropdown
              className="col-md-2 textbld "
              title={selected}
              show={showDropdown}
              onSelect={handleRowSelectedList}
              onToggle={handleDropdownToggle}
            >
              {" "}
              <li
                onClick={(e) => handleRowSelectedList(e)}
                className="col-md-10 p-1  m-auto   list_inner "
              >
                All Items
              </li>
              <li
                onClick={(e) => handleRowSelectedList(e)}
                className="col-md-10 p-1  m-auto  list_inner"
              >
                {" "}
                Active Items
              </li>
              <li
                onClick={(e) => handleRowSelectedList(e)}
                className="col-md-10 p-1  m-auto list_inner"
              >
                {" "}
                Inactive Items
              </li>{" "}
            </NavDropdown> */}
          </div>
          <div className="row m-auto">
            <DataTable columns={columns} data={filterdata} pagination />
          </div>
        </>
      )}

      {item && !ModifyITems && (
        <div className="container ">
          <p className="row   m-auto ">
            <h2 className="textbld  mt-3">New Items</h2>
          </p>
          <div className="row mt-5 m-auto">
            <div className="col-md-9">
              <div className="row p-3">
                <div className="col-md-4">
                  <p className="colr-red  textbld">Item Name*</p>
                </div>

                <div className="col-md-8">
                  <Form.Control onChange={(e) => setitemName(e.target.value)} />
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-4">
                  <p className="colr-red textbld">Alias Name*</p>
                </div>

                <div className="col-md-8">
                  <Form.Control
                    onChange={(e) => setaliasName(e.target.value)}
                  />
                </div>
              </div>

              <div className="row p-3">
                <div className="col-md-4">
                  <p className={selectprimary === "Yes" ? "adclr" : ""}>
                    Under Group
                  </p>
                </div>
                <div className="col-md-8">
                  <Form.Select
                    disabled={selectprimary === "Yes"}
                    onChange={(e) => setunderGroup(e.target.value)}
                  >
                    {allitemgroupdata
                      ?.filter((ele) => ele.itemgroupstatus === "Active")
                      .map((ele) => (
                        <option key={ele._id} value={ele._id}>
                          {ele.itemGroupName}
                        </option>
                      ))}

                    <option value={"General"}>General</option>
                  </Form.Select>
                </div>
              </div>

              <div className="row p-3">
                <div className="col-md-4">
                  <p className="colr-red textbld">SKU Code*</p>
                </div>
                <div className="col-md-8">
                  <Form.Control onChange={(e) => setskuCode(e.target.value)} />
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-4">
                  <p className="colr-red textbld">SKU Manufacturers's Code*</p>
                </div>

                <div className="col-md-8">
                  <Form.Control
                    onChange={(e) => setskuManufacturerCode(e.target.value)}
                  />
                </div>
              </div>

              <div className="row p-3">
                <div className="col-md-4">
                  <p>Description</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    onChange={(e) => setdescription(e.target.value)}
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
                    value={tax}
                    disabled={!taxable}
                    onChange={(e) => settax(e.target.value)}
                  >
                    {/* {Name?.map((ele) => {
                    return <option value={ele.id}>{ele.name}</option>;
                  })} */}
                    <option>Select</option>
                    <option value="Income Tax">Income Tax</option>
                    <option value={"Income Tax"}>Income Tax</option>
                    <option value={"Manufacturers"}>Manufacturers</option>
                    <option value={"Wholesale"}>Wholesale</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="col-md-3 text-center">
              <Form.Label className="text-center borders">
                <AddIcon className="addicon" />

                <Form.Control
                  className="shadow-sm"
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => setitemImage(e.target.files[0])}
                />
                {itemImage && (
                  <img
                    src={URL.createObjectURL(itemImage)}
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

          <div className="row m-auto ">
            <div className="col-md-1 m-auto">
              <span className="colr-red textbld">Unit*</span>
            </div>
            <div className="col-md-3 m-auto ">
              <TextField
                onChange={(e) => setProductQuantity(e.target.value)}
                size="small"
                label="Enter required quantity"
                id="outlined-start-adornment"
                sx={{ m: 1, width: "30ch", borderRadius: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" className="ms-3">
                      {unitFrom}
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="col-md-3 m-auto ">
              <FormControl
                sx={{ m: 1, width: "30ch", borderRadius: 2 }}
                size="small"
              >
                <InputLabel id="demo-select-small-label">From</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={unitFrom}
                  label="Unit"
                  onChange={handleDropdownToggle2}
                >
                  <MenuItem value={"Kg"}>Kg</MenuItem>
                  <MenuItem value={"Pieces"}>Pieces</MenuItem>
                  <MenuItem value={"Dozen"}>Dozen</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-md-3 m-auto ">
              <FormControl
                sx={{ m: 1, width: "30ch", borderRadius: 2 }}
                size="small"
              >
                <InputLabel id="demo-select-small-label">To</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={unitTo}
                  label="Unit"
                  onChange={handleDropdownToggle3}
                >
                  <MenuItem value={"Kg"}>Kg</MenuItem>
                  <MenuItem value={"Pieces"}>Pieces</MenuItem>
                  <MenuItem value={"Dozen"}>Dozen</MenuItem>
                </Select>
              </FormControl>
            </div>{" "}
            <div className="row ">
              <div className="col-md-9"></div>
              <div className="col-md-2 m-auto">
                <Button variant="success" onClick={handleConvert}>
                  = Convert
                </Button>
              </div>
              <div className="col-md-1 m-auto">
                <Button variant="secondary">Reset</Button>
              </div>
            </div>
          </div>
          <div className="row  m-auto ">
            <div className="col-md-6 ">
              <Accordion
                expanded={expandedIndex === 1}
                className={`shadow-sm mb-3 ${
                  expandedIndex === 1
                    ? "accordin_conatiner2"
                    : "accordin_conatiner"
                }`}
              >
                <AccordionSummary
                  className="togleques"
                  expandIcon={
                    <img
                      onClick={() => handleChangeAccordian1(1)}
                      width={70}
                      height={70}
                      alt=""
                      src={
                        expandedIndex === 1
                          ? "../Images/on (2).png"
                          : "../Images/off.png"
                      }
                    />
                  }
                >
                  <Typography>Sales Information</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="row">
                    <p className="col-md-4">Selling Price*</p>{" "}
                    <TextField
                      className="mb-3 col-md-8"
                      sx={{
                        borderRadius: 2,
                      }}
                      size="small"
                      onChange={(e) => setsellingPrice(e.target.value)}
                    />
                  </div>
                  <div className="row">
                    <p className="col-md-4">Description</p>
                    <TextField
                      className="col-md-8"
                      sx={{
                        borderRadius: 2,
                      }}
                      size="small"
                      onChange={(e) => setsalesDescription(e.target.value)}
                    />
                  </div>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expandedIndex === 2}
                className={`shadow-sm mb-3 ${
                  expandedIndex === 2
                    ? "accordin_conatiner2"
                    : "accordin_conatiner"
                }`}
              >
                <AccordionSummary
                  expandIcon={
                    <img
                      onClick={() => handleChangeAccordian1(2)}
                      width={70}
                      height={70}
                      alt=""
                      src={
                        expandedIndex === 2
                          ? "../Images/on (2).png"
                          : "../Images/off.png"
                      }
                    />
                  }
                  onClick={() => handleChangeAccordian1(2)}
                >
                  <Typography>Purchase Information</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="row">
                    <p className="col-md-4">Purchase Price*</p>{" "}
                    <TextField
                      className="col-md-8 mb-3"
                      sx={{
                        borderRadius: 2,
                      }}
                      size="small"
                      onChange={(e) => setpurchasePrice(e.target.value)}
                    />
                  </div>
                  <div className="row">
                    <p className="col-md-4">Description</p>{" "}
                    <TextField
                      className="col-md-8 mb-3"
                      sx={{
                        borderRadius: 2,
                      }}
                      size="small"
                      onChange={(e) => setpurchaseDescription(e.target.value)}
                    />
                  </div>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expandedIndex === 3}
                className={`shadow-sm mb-3 ${
                  expandedIndex === 3
                    ? "accordin_conatiner2"
                    : "accordin_conatiner"
                }`}
              >
                <AccordionSummary
                  expandIcon={
                    <img
                      onClick={() => handleChangeAccordian1(3)}
                      width={70}
                      height={70}
                      alt=""
                      src={
                        expandedIndex === 3
                          ? "../Images/on (2).png"
                          : "../Images/off.png"
                      }
                    />
                  }
                  onClick={() => handleChangeAccordian1(3)}
                >
                  <Typography>Track Inventory For This Item</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="row mb-3">
                    <p className="col-md-6">Item Group Category </p>{" "}
                    <TextField
                      className="col-md-6"
                      sx={{
                        borderRadius: 2,
                      }}
                      size="small"
                      onChange={(e) => setitemGroupCategory(e.target.value)}
                    />
                  </div>
                  <div className="row mb-3">
                    <p className="col-md-6">Opening Stock</p>{" "}
                    <TextField
                      className="col-md-6"
                      sx={{
                        borderRadius: 2,
                      }}
                      size="small"
                      onChange={(e) => setopeningStock(e.target.value)}
                    />
                  </div>
                  <div className="row mb-3">
                    <p className="col-md-6">Opening Stock Rate Per Unit </p>{" "}
                    <TextField
                      className="col-md-6"
                      sx={{
                        borderRadius: 2,
                      }}
                      size="small"
                      onChange={(e) =>
                        setopeningStockRatePerUnit(e.target.value)
                      }
                    />
                  </div>
                  <div className="row mb-3">
                    <p className="col-md-6">Reorder Level </p>{" "}
                    <TextField
                      className="col-md-6"
                      sx={{
                        borderRadius: 2,
                      }}
                      size="small"
                      onChange={(e) => setreOrderLevel(e.target.value)}
                    />
                  </div>
                  <div className="row mb-3">
                    <p className="col-md-6">Preferred Vendor </p>{" "}
                    <TextField
                      className="col-md-6"
                      sx={{
                        borderRadius: 2,
                      }}
                      size="small"
                      onChange={(e) => setpreferredVendor(e.target.value)}
                    />
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
                    sx={{ borderRadius: 2 }}
                    onChange={(e) => sethsnCode(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mb-3 ">
                {" "}
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
                    sx={{ borderRadius: 2 }}
                    onChange={(e) => setmanufacturersCode(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mb-3 ">
                {" "}
                <div className="col-md-1"></div>
                <div className="col-md-4 m-auto">
                  <InputLabel className="textbld">Brand </InputLabel>
                </div>
                <div className="col-md-7">
                  <TextField
                    id="outlined-basic"
                    label="Brand"
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: 2 }}
                    onChange={(e) => setbrand(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mb-3 ">
                <div className="col-md-1"></div>
                <div className="col-md-4 m-auto">
                  <InputLabel className="textbld">Manufacturer </InputLabel>
                </div>
                <div className="col-md-7">
                  <TextField
                    id="outlined-basic"
                    label="Manufacturer"
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: 2 }}
                    onChange={(e) => setmanufacturer(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mb-3 ">
                <div className="col-md-1"></div>
                <div className="col-md-4 m-auto">
                  <InputLabel className="textbld">Weight </InputLabel>
                </div>
                <div className="col-md-7">
                  <TextField
                    id="outlined-basic"
                    label="Weight"
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: 2 }}
                    onChange={(e) => setweight(e.target.value)}
                  />
                </div>
              </div>

              <div className="row mb-3 ">
                <div className="col-md-1"></div>
                <div className="col-md-4 m-auto">
                  <InputLabel className="textbld">Dimensions(cm) </InputLabel>
                </div>
                <div className="col-md-7 m-auto">
                  <div className="row mt-2 m-auto">
                    <div className="col-md-4 m-auto">
                      <TextField
                        id="dimensions"
                        label="length"
                        variant="outlined"
                        size="small"
                        value={dimensionsLength}
                        sx={{ width: "9ch", borderRadius: 2 }}
                        onChange={(e) => setdimensionsLength(e.target.value)}
                      />
                    </div>
                    <div className="col-md-4 m-auto">
                      <TextField
                        id="dimensions"
                        label="width"
                        variant="outlined"
                        size="small"
                        sx={{ width: "9ch", borderRadius: 2 }}
                        value={dimensionsWidth}
                        onChange={(e) => setdimensionsWidth(e.target.value)}
                      />
                    </div>
                    <div className="col-md-4 m-auto">
                      <TextField
                        id="dimensions"
                        label="height"
                        variant="outlined"
                        size="small"
                        value={dimensionsHeight}
                        sx={{ width: "9ch", borderRadius: 2 }}
                        onChange={(e) => setdimensionsHeight(e.target.value)}
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
                  // onClick={Additem}
                >
                  Add Item
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
      {!item && ModifyITems && (
        <div className="container ">
          <p className="textbld f_20">Modify Items</p>
          <div className="row mt-5 m-auto ">
            <div className="col-md-9">
              <div className="row p-3">
                <div className="col-md-4">
                  <p className="textbld">Item Name</p>
                </div>

                <div className="col-md-8">
                  <Form.Control
                    onChange={(e) => setitemName(e.target.value)}
                    defaultValue={categoryObjects.itemName}
                  />
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-4">
                  <p className="textbld">Alias Name</p>
                </div>

                <div className="col-md-8">
                  <Form.Control
                    onChange={(e) => setaliasName(e.target.value)}
                    defaultValue={categoryObjects.aliasName}
                  />
                </div>
              </div>

              <div className="row p-3">
                <div className="col-md-4">
                  <p className={selectprimary === "Yes" ? "adclr" : ""}>
                    Under Group
                  </p>
                </div>
                <div className="col-md-8">
                  <Form.Select
                    disabled={selectprimary === "Yes"}
                    onChange={(e) => setunderGroup(e.target.value)}
                    value={underGroup || categoryObjects.underGroup}
                  >
                    {allitemgroupdata
                      ?.filter((ele) => ele.itemgroupstatus === "Active")
                      .map((ele) => (
                        <option key={ele._id} value={ele.id}>
                          {ele.itemGroupName}
                        </option>
                      ))}
                    <option value={"General"}>General</option>
                  </Form.Select>
                </div>
              </div>

              <div className="row p-3">
                <div className="col-md-4">
                  <p className="colr-red textbld">SKU Code*</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    onChange={(e) => setskuCode(e.target.value)}
                    defaultValue={categoryObjects.skuCode}
                  />
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-4">
                  <p className="colr-red textbld">SKU Manufacturers's Code*</p>
                </div>

                <div className="col-md-8">
                  <Form.Control
                    onChange={(e) => setskuManufacturerCode(e.target.value)}
                    defaultValue={categoryObjects.skuManufacturerCode}
                  />
                </div>
              </div>

              <div className="row p-3">
                <div className="col-md-4">
                  <p>Description</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
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
                    disabled={!taxable}
                    onChange={(e) => settax(e.target.value)}
                    value={tax || categoryObjects.tax}
                  >
                    <option>Select</option>
                    <option value="Income Tax">Income Tax</option>
                    <option value={"Income Tax"}>Income Tax</option>
                    <option value={"Manufacturers"}>Manufacturers</option>
                    <option value={"Wholesale"}>Wholesale</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="col-md-3 text-center">
              <Form.Label className="text-center borders">
                <Form.Control
                  className="shadow-sm"
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => setitemImage(e.target.files[0])}
                />
                {itemImage ? (
                  <img
                    src={URL.createObjectURL(itemImage)}
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
                    src={`http://localhost:9001/item/${categoryObjects.itemImage}`}
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

          <div className="row m-auto ">
            <div className="col-md-1 m-auto">
              <span className="colr-red textbld">Unit*</span>
            </div>
            <div className="col-md-3 m-auto ">
              <TextField
                onChange={(e) => setProductQuantity(e.target.value)}
                size="small"
                label="Enter required quantity"
                id="outlined-start-adornment"
                sx={{ m: 1, width: "30ch", borderRadius: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" className="ms-3">
                      {unitFrom}
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="col-md-3 m-auto ">
              <FormControl
                sx={{ m: 1, width: "30ch", borderRadius: 2 }}
                size="small"
              >
                <InputLabel id="demo-select-small-label">From</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={unitFrom}
                  label="Unit"
                  onChange={handleDropdownToggle2}
                >
                  <MenuItem value={"Kg"}>Kg</MenuItem>
                  <MenuItem value={"Pieces"}>Pieces</MenuItem>
                  <MenuItem value={"Dozen"}>Dozen</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-md-3 m-auto ">
              <FormControl
                sx={{ m: 1, width: "30ch", borderRadius: 2 }}
                size="small"
              >
                <InputLabel id="demo-select-small-label">To</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={unitTo}
                  label="Unit"
                  onChange={handleDropdownToggle3}
                >
                  <MenuItem value={"Kg"}>Kg</MenuItem>
                  <MenuItem value={"Pieces"}>Pieces</MenuItem>
                  <MenuItem value={"Dozen"}>Dozen</MenuItem>
                </Select>
              </FormControl>
            </div>{" "}
            <div className="row ">
              <div className="col-md-9"></div>
              <div className="col-md-2 m-auto">
                <Button variant="success" onClick={handleConvert}>
                  = Convert
                </Button>
              </div>
              <div className="col-md-1 m-auto">
                <Button variant="secondary">Reset</Button>
              </div>
            </div>
          </div>
          <div className="row  m-auto ">
            <div className="col-md-6 ">
              <Accordion
                expanded={expandedIndex === 1}
                className={`shadow-sm mb-3 ${
                  expandedIndex === 1
                    ? "accordin_conatiner2"
                    : "accordin_conatiner"
                }`}
              >
                <AccordionSummary
                  className="togleques"
                  expandIcon={
                    <img
                      onClick={() => handleChangeAccordian1(1)}
                      width={70}
                      height={70}
                      alt=""
                      src={
                        expandedIndex === 1
                          ? "../Images/on (2).png"
                          : "../Images/off.png"
                      }
                    />
                  }
                >
                  <Typography>Sales Information</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="row">
                    <p className="col-md-4">Selling Price*</p>{" "}
                    <TextField
                      className="mb-3 col-md-8"
                      sx={{
                        borderRadius: 2,
                      }}
                      size="small"
                      onChange={(e) => setsellingPrice(e.target.value)}
                      defaultValue={categoryObjects.sellingPrice}
                    />
                  </div>
                  <div className="row">
                    <p className="col-md-4">Description</p>{" "}
                    <TextField
                      className="col-md-8"
                      sx={{
                        borderRadius: 2,
                      }}
                      size="small"
                      onChange={(e) => setsalesDescription(e.target.value)}
                      defaultValue={categoryObjects.salesDescription}
                    />
                  </div>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expandedIndex === 2}
                className={`shadow-sm mb-3 ${
                  expandedIndex === 2
                    ? "accordin_conatiner2"
                    : "accordin_conatiner"
                }`}
              >
                <AccordionSummary
                  expandIcon={
                    <img
                      onClick={() => handleChangeAccordian1(2)}
                      width={70}
                      height={70}
                      alt=""
                      src={
                        expandedIndex === 2
                          ? "../Images/on (2).png"
                          : "../Images/off.png"
                      }
                    />
                  }
                  onClick={() => handleChangeAccordian1(2)}
                >
                  <Typography>Purchase Information</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="row">
                    <p className="col-md-4">Purchase Price*</p>{" "}
                    <TextField
                      className="col-md-8 mb-3"
                      sx={{
                        borderRadius: 2,
                      }}
                      size="small"
                      onChange={(e) => setpurchasePrice(e.target.value)}
                      defaultValue={categoryObjects.purchasePrice}
                    />
                  </div>
                  <div className="row">
                    <p className="col-md-4">Description</p>{" "}
                    <TextField
                      className="col-md-8 mb-3"
                      sx={{
                        borderRadius: 2,
                      }}
                      size="small"
                      onChange={(e) => setpurchaseDescription(e.target.value)}
                      defaultValue={categoryObjects.purchaseDescription}
                    />
                  </div>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expandedIndex === 3}
                className={`shadow-sm mb-3 ${
                  expandedIndex === 3
                    ? "accordin_conatiner2"
                    : "accordin_conatiner"
                }`}
              >
                <AccordionSummary
                  expandIcon={
                    <img
                      onClick={() => handleChangeAccordian1(3)}
                      width={70}
                      height={70}
                      alt=""
                      src={
                        expandedIndex === 3
                          ? "../Images/on (2).png"
                          : "../Images/off.png"
                      }
                    />
                  }
                  onClick={() => handleChangeAccordian1(3)}
                >
                  <Typography>Track Inventory For This Item</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="row mb-3">
                    <p className="col-md-6">Item Group Category </p>{" "}
                    <TextField
                      className="col-md-6"
                      sx={{
                        borderRadius: 2,
                      }}
                      size="small"
                      onChange={(e) => setitemGroupCategory(e.target.value)}
                      defaultValue={categoryObjects.itemGroupCategory}
                    />
                  </div>
                  <div className="row mb-3">
                    <p className="col-md-6">Opening Stock</p>{" "}
                    <TextField
                      className="col-md-6"
                      sx={{
                        borderRadius: 2,
                      }}
                      size="small"
                      onChange={(e) => setopeningStock(e.target.value)}
                      defaultValue={categoryObjects.openingStock}
                    />
                  </div>
                  <div className="row mb-3">
                    <p className="col-md-6">Opening Stock Rate Per Unit </p>{" "}
                    <TextField
                      className="col-md-6"
                      sx={{
                        borderRadius: 2,
                      }}
                      size="small"
                      onChange={(e) =>
                        setopeningStockRatePerUnit(e.target.value)
                      }
                      defaultValue={categoryObjects.openingStockRatePerUnit}
                    />
                  </div>
                  <div className="row mb-3">
                    <p className="col-md-6">Reorder Level </p>{" "}
                    <TextField
                      className="col-md-6"
                      sx={{
                        borderRadius: 2,
                      }}
                      size="small"
                      onChange={(e) => setreOrderLevel(e.target.value)}
                      defaultValue={categoryObjects.reOrderLevel}
                    />
                  </div>
                  <div className="row mb-3">
                    <p className="col-md-6">Preferred Vendor </p>{" "}
                    <TextField
                      className="col-md-6"
                      sx={{
                        borderRadius: 2,
                      }}
                      size="small"
                      onChange={(e) => setpreferredVendor(e.target.value)}
                      defaultValue={categoryObjects.preferredVendor}
                    />
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
            <div className="col-md-6 ">
              <div className="row mb-3  ">
                <h6>More Fields</h6>
              </div>
              <div className="row mb-3 ">
                {" "}
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
                    sx={{ borderRadius: 2 }}
                    onChange={(e) => sethsnCode(e.target.value)}
                    defaultValue={categoryObjects.hsnCode}
                  />
                </div>
              </div>
              <div className="row mb-3 ">
                {" "}
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
                    sx={{ borderRadius: 2 }}
                    onChange={(e) => setmanufacturersCode(e.target.value)}
                    defaultValue={categoryObjects.manufacturersCode}
                  />
                </div>
              </div>
              <div className="row mb-3 ">
                {" "}
                <div className="col-md-1"></div>
                <div className="col-md-4 m-auto">
                  <InputLabel className="textbld">Brand </InputLabel>
                </div>
                <div className="col-md-7">
                  <TextField
                    id="outlined-basic"
                    label="Brand"
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: 2 }}
                    onChange={(e) => setbrand(e.target.value)}
                    defaultValue={categoryObjects.brand}
                  />
                </div>
              </div>
              <div className="row mb-3 ">
                <div className="col-md-1"></div>
                <div className="col-md-4 m-auto">
                  <InputLabel className="textbld">Manufacturer </InputLabel>
                </div>
                <div className="col-md-7">
                  <TextField
                    id="outlined-basic"
                    label="Manufacturer"
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: 2 }}
                    onChange={(e) => setmanufacturer(e.target.value)}
                    defaultValue={categoryObjects.manufacturer}
                  />
                </div>
              </div>
              <div className="row mb-3 ">
                {" "}
                <div className="col-md-1"></div>
                <div className="col-md-4 m-auto">
                  <InputLabel className="textbld">Weight </InputLabel>
                </div>
                <div className="col-md-7">
                  <TextField
                    id="outlined-basic"
                    label="Weight"
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: 2 }}
                    onChange={(e) => setweight(e.target.value)}
                    defaultValue={categoryObjects.weight}
                  />
                </div>
              </div>

              <div className="row mb-3 ">
                {" "}
                <div className="col-md-1"></div>
                <div className="col-md-4 m-auto">
                  <InputLabel className="textbld">Dimensions(cm) </InputLabel>
                </div>
                <div className="col-md-7 m-auto">
                  <div className="row mt-2 m-auto">
                    <div className="col-md-4 m-auto">
                      <TextField
                        id="dimensions"
                        label="length"
                        variant="outlined"
                        size="small"
                        defaultValue={categoryObjects.dimensionsLength}
                        sx={{ width: "9ch", borderRadius: 2 }}
                        onChange={(e) => setdimensionsLength(e.target.value)}
                      />{" "}
                    </div>
                    <div className="col-md-4 m-auto">
                      <TextField
                        id="dimensions"
                        label="width"
                        variant="outlined"
                        size="small"
                        sx={{ width: "9ch", borderRadius: 2 }}
                        defaultValue={categoryObjects.dimensionsWidth}
                        onChange={(e) => setdimensionsWidth(e.target.value)}
                      />
                    </div>
                    <div className="col-md-4 m-auto">
                      <TextField
                        id="dimensions"
                        label="height"
                        variant="outlined"
                        size="small"
                        defaultValue={categoryObjects.dimensionsHeight}
                        sx={{ width: "9ch", borderRadius: 2 }}
                        onChange={(e) => setdimensionsHeight(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row  m-auto pb-3">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <div className="row">
                <Button
                  className="col-md-5 textbld m-auto m-2 bg_color"
                  onClick={Edititem}
                >
                  Add Item
                </Button>
                <Button
                  onClick={() => setModifyITems(false)}
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
    </>
  );
}

export default Itemgroupdetails;
