// import React, { useState } from "react";
// import TextField from "@mui/material/TextField";

// const YourComponent = () => {
//   const [units, setUnits] = useState("");
//   const [sellingPrice, setSellingPrice] = useState("");
//   const [gst, setGst] = useState("");
//   const [convertedPrice, setConvertedPrice] = useState(null);
//   const [discount, setDiscount] = useState("");

//   const handleDiscountChange = (e) => {
//     setDiscount(e.target.value);
//   };

//   const handleDropdownToggle3 = (e) => {
//     setUnits(e.target.value);
//   };

//   const handleGstChange = (e) => {
//     setGst(e.target.value);
//   };

//   // const convertPrice = () => {
//   //   const calculategst =
//   //     parseFloat(sellingPrice) +
//   //     (parseFloat(gst) / 100) * parseFloat(sellingPrice);
//   //   // const findingAmount = parseFloat(sellingPrice) + calculategst;

//   //   console.log("calculategst", calculategst);
//   //   // console.log("finalvalue", findingAmount);

//   //   setConvertedPrice(calculategst.toFixed(2));
//   // };

//   const convertPrice = () => {
//     // Parse values to floats
//     const sellingPriceFloat = parseFloat(sellingPrice);
//     const gstFloat = parseFloat(gst);
//     const discountFloat = parseFloat(discount);

//     // Calculate GST amount
//     const gstAmount = (gstFloat / 100) * sellingPriceFloat;

//     // Calculate discount amount
//     const discountAmount = (discountFloat / 100) * sellingPriceFloat;

//     // Calculate total price including GST and discount
//     const totalPrice = sellingPriceFloat + gstAmount - discountAmount;

//     // Update state with the converted price
//     setConvertedPrice(totalPrice.toFixed(2));
//   };

//   return (
//     <div className="row p-3 m-auto">
//       <div className="col-md-3">
//         <p>Units *</p>
//         <select
//           style={{
//             width: "170px",
//             borderRadius: "4px",
//             padding: "7px",
//             borderColor: "#c4c4c4",
//           }}
//           onChange={handleDropdownToggle3}
//           value={units}
//         >
//           <option value="">Select</option>
//           <option value="BOX">BOX</option>
//           <option value="DOZ">DOZ</option>
//           <option value="KGS">KGS</option>
//         </select>
//       </div>
//       <div className="col-md-3">
//         <p>Selling Price*</p>
//         <TextField
//           className="mb-3 col-md-8"
//           sx={{
//             borderRadius: 2,
//           }}
//           size="small"
//           type="number"
//           value={sellingPrice}
//           onChange={(e) => setSellingPrice(e.target.value)}
//         />
//       </div>
//       <div className="col-md-3">
//         <p>GST *</p>
//         <select
//           style={{
//             width: "170px",
//             borderRadius: "4px",
//             padding: "7px",
//             borderColor: "#c4c4c4",
//           }}
//           onChange={handleGstChange}
//           value={gst}
//         >
//           <option value="">Select</option>
//           <option value="No GST">No GST</option>
//           <option value={0.1}>GST @ 0%</option>
//           <option value={25}>GST @ 25%</option>
//           <option value={1.5}>GST @ 1.5%</option>
//           <option value={3}>GST @ 3%</option>
//           <option value={5}>GST @ 5%</option>
//           <option value={6}>GST @ 6%</option>
//           <option value={12}>GST @ 12%</option>
//           <option value={14}>GST @ 14%</option>
//           <option value={18}>GST @ 18%</option>
//           <option value={28}>GST @ 28%</option>
//           {/* Add other GST options */}
//         </select>
//       </div>

//       <div className="col-md-3">
//         <p>Discount *</p>
//         <TextField
//           className="mb-3 col-md-8"
//           sx={{
//             borderRadius: 2,
//           }}
//           size="small"
//           type="number"
//           value={discount}
//           onChange={handleDiscountChange}
//         />
//       </div>
//       <div className="col-md-3">
//         <button onClick={convertPrice}>Convert Price</button>
//         {convertedPrice !== null && <p>Converted Price: {convertedPrice}</p>}
//       </div>
//     </div>
//   );
// };

// export default YourComponent;

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/esm/Button";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import NavDropdown from "react-bootstrap/NavDropdown";
import { InputAdornment, TextField } from "@mui/material";
import Form from "react-bootstrap/Form";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AddIcon from "@mui/icons-material/Add";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import axios from "axios";

function Items() {
  const [item, setItem] = useState(false);
  const [ModifyITems, setModifyITems] = useState(false);
  const [taxExclusive, setTaxExclusive] = useState(true);
  const [taxInclusive, setTaxInclusive] = useState(false);
  // Field input
  const [SKUCodeName, setSKUCodeName] = useState("");
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
  const [discount, setdiscount] = useState("");
  const [quantity, setquantity] = useState("");
  const [gst, setgst] = useState("");
  const [unit, setunit] = useState("");
  const [allskucode, setallskucode] = useState([]);

  useEffect(() => {
    getItemgroup();
  }, []);

  const getItemgroup = async () => {
    let res = await axios.get(
      "http://localhost:9001/api/master/itemgroups/getallitemgroups"
    );
    if (res.status === 200) {
      // console.log(res);
      setallitemgroupdata(res.data?.allItems);
    }
  };

  useEffect(() => {
    getItem();
  }, []);

  useEffect(() => {
    getAllskucode();
  }, []);

  const getAllskucode = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9001/api/master/skucode/getAllskucode"
      );
      if (response.status === 200) {
        // console.log("Account Group=====>", response.data);
        setallskucode(response.data.allskucode);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const getItem = async () => {
    let res = await axios.get(
      "http://localhost:9001/api/master/items/getallitems"
    );
    if (res.status === 200) {
      console.log(res);
      setallitemdata(res.data?.allItems.reverse());
    }
  };

  // console.log("allitemdata====", allitemdata);

  const filterdata = allitemdata.filter((item) =>
    item.itemName.toLowerCase().includes(filtergroupname.toLowerCase())
  );
  console.log("filterdata", filterdata);

  const Additem = async () => {
    if (!itemName || !aliasName) {
      alert("Please fill all fields");
    } else {
      const formdata = new FormData();
      formdata.append("itemName", itemName);
      formdata.append("itemImage", itemImage);
      formdata.append("aliasName", aliasName);
      formdata.append("primaryGroup", primaryGroup);
      formdata.append("underGroup", underGroup);
      formdata.append("skuCodeId", skuCode);
      formdata.append("skuCode", SKUCodeName);
      formdata.append("skuManufacturerCode", skuManufacturerCode);
      formdata.append("description", description);
      formdata.append("tax", tax);
      formdata.append("taxType", taxInclusive ? "Tax Inclusive" : "Exclusive");
      formdata.append("unitRequired", unitRequired);
      formdata.append("unitFrom", unitFrom);
      formdata.append("unitTo", unitTo);
      formdata.append(
        "sellingPrice",
        taxInclusive
          ? gstIncludedAmount.toFixed(2)
          : parseFloat(sellingPrice).toFixed(2)
      );
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
      formdata.append("stockInHand", openingStock);
      formdata.append("oldstockinhand", openingStock);
      formdata.append("openingStockRatePerUnit", openingStockRatePerUnit);
      formdata.append("reOrderLevel", reOrderLevel);
      formdata.append("preferredVendor", preferredVendor);
      formdata.append("discount", discount);
      formdata.append("quantity", quantity);
      formdata.append("gst", gst);
      formdata.append("unit", unit);
      try {
        let config = {
          url: "master/items/additem",
          method: "post",
          baseURL: "http://localhost:9001/api",
          data: formdata,
        };
        await axios(config).then(function (res) {
          if (res.status === 200) {
            console.log("success", res);
            alert(res.data.success);
            window.location.assign("/Items");
          }
        });
      } catch (error) {
        console.log(error);
        alert("not able to complete");
      }
    }
  };

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
    formdata.append("stockInHand", openingStock);
    formdata.append("oldstockinhand", openingStock);
    formdata.append("openingStockRatePerUnit", openingStockRatePerUnit);
    formdata.append("reOrderLevel", reOrderLevel);
    formdata.append("preferredVendor", preferredVendor);
    formdata.append("quantity", quantity);
    formdata.append("gst", gst);
    formdata.append("unit", unit);
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

  const handlerowedit = (row) => {
    setModifyITems(true);
    setCategoryObjects(row);
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

  const handleRowSelected = (rows) => {
    console.log("Selected Rows:", rows);
  };

  const handleRowClicked = (row) => {
    console.log("Clicked Row:", row);
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
      name: "SKU Code",
      sort: true,
    },
    {
      selector: (row) => row.unitTo,
      name: "Unit",
      sort: true,
    },
    {
      selector: (row) => row.tax,
      name: "Tax",
      sort: true,
    },

    {
      selector: (row) => row.sellingPrice,
      name: "Price",
      sort: true,
    },
    {
      selector: (row) => row.stockInHand,
      name: "Stock In Hand",
      sort: true,
    },
    {
      selector: (row) => row.description.substr(0, 100),
      name: "Description",
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
  const [opendelete, setopendelete] = useState(false);
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

  // console.log("allitemgroupdata====13", allitemgroupdata);
  // console.log("first", allitemdata);

  // GSTAmount= ( GSTRate / 100) * Amount  ... formula

  const GSTAmount = (parseFloat(tax) / 100) * parseFloat(sellingPrice);
  const gstIncludedAmount = parseFloat(sellingPrice) + GSTAmount;
  // console.log("gstIncludedAmount", gstIncludedAmount.toFixed(2));
  // console.log("allskucode", allskucode);
  const handleSkuCodeChange = (selectedSkuCode) => {
    const selectedSku = allskucode.find((ele) => ele._id === selectedSkuCode);
    // console.log("selectedSku", selectedSku);
    if (selectedSku) {
      setskuCode(selectedSkuCode);
      setSKUCodeName(selectedSku.skucode);
      setpurchasePrice(selectedSku.purchaseprice || "");
      setpurchaseDescription(selectedSku.purchasedesc || "");
    }
  };

  return (
    <>
      {!item && !ModifyITems && (
        <>
          <div className="row mt-4  m-auto ">
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
          </div>

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

            <NavDropdown
              className="col-md-2 textbld "
              title={selected}
              show={showDropdown}
              onSelect={handleRowSelectedList}
              onToggle={handleDropdownToggle}
            >
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
                Active Items
              </li>
              <li
                onClick={(e) => handleRowSelectedList(e)}
                className="col-md-10 p-1  m-auto list_inner"
              >
                Inactive Items
              </li>
            </NavDropdown>
          </div>
          <div className="row m-auto">
            <DataTable columns={columns} data={filterdata} pagination />
          </div>
        </>
      )}
      {/* ========================================adding new items=================================================== */}
      {item && !ModifyITems && (
        <div className="container ">
          <p className="row   m-auto ">
            <h2 className="textbld  mt-3 ">New Items</h2>
          </p>
          <div className="row mt-5 m-auto ">
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
                  <Form.Select
                    onChange={(e) => handleSkuCodeChange(e.target.value)}
                    value={skuCode}
                  >
                    <option value="">Select SKU Code</option>
                    {allskucode.map((ele) => (
                      <option key={ele._id} value={ele._id}>
                        {ele.skucode}
                      </option>
                    ))}
                  </Form.Select>
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

              {/* <div className="row p-3">
                <div className="col-md-4">
                  <p>Quantity</p>
                </div>
                <div className="col-md-8">
                  <Form.Control onChange={(e) => setquantity(e.target.value)} />
                </div>
              </div> */}

              <div className="row p-3">
                <div className="col-md-4">
                  <div className="row">
                    <div className="col-md-4">
                      {/* <Form.Check
                        inline
                        type="radio"
                        label="Taxable"
                        name="group"
                        onClick={() => setTaxable(true)}
                        checked={taxable}
                      /> */}
                      <p>GST %</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <Form.Select
                    value={tax}
                    onChange={(e) => settax(e.target.value)}
                  >
                    <option>Select</option>
                    <option value="No GST">No GST</option>
                    <option value={5}>GST @ 5%</option>
                    <option value={12}>GST @ 12%</option>
                    <option value={18}>GST @ 18%</option>
                    <option value={28}>GST @ 28%</option>
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

                      padding: "10px",
                    }}
                  />
                )}
              </Form.Label>
              <p className=" m-auto text-center textbld"> Add Images</p>
            </div>
          </div>

          {/* <div className="row m-auto ">
            <div className="col-md-1 m-auto">
              <span className="colr-red textbld">Unit *</span>
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
            </div>
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
          </div> */}
          <div className="row p-3 m-auto ">
            <div className="col-md-3">
              <p>Units *</p>
              <select
                style={{
                  width: "170px",
                  borderRadius: "4px",
                  padding: "7px",
                  borderColor: "#c4c4c4",
                }}
                onChange={handleDropdownToggle3}
                // value={units}
              >
                <option value="">Select</option>
                <option value="BOX">BOX</option>
                <option value="DOZ">DOZ</option>
                <option value="KGS">KGS</option>
              </select>
              {/* <FormControl
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
              </FormControl> */}
            </div>
            <div className="col-md-3">
              <p>Selling Price*</p>
              <TextField
                className="mb-3 col-md-8"
                sx={{
                  borderRadius: 2,
                }}
                size="small"
                type="number"
                onChange={(e) => setsellingPrice(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <p>Select Tax Type</p>
              <div
                className="d-flex"
                style={{ justifyContent: "space-between" }}
              >
                <div>
                  <Form.Check
                    type="radio"
                    id="Inclusive"
                    label="Inclusive"
                    onChange={() => {
                      setTaxInclusive(true);
                      setTaxExclusive(false);
                    }}
                    checked={taxInclusive ? true : false}
                  />

                  <p className="ps-4">
                    ₹{" "}
                    {gstIncludedAmount ? gstIncludedAmount.toFixed(2) : "0.00"}{" "}
                    / per unit
                  </p>
                </div>
                <div>
                  <Form.Check
                    type="radio"
                    id="Exclusive"
                    label="Exclusive"
                    onChange={() => {
                      setTaxExclusive(true);
                      setTaxInclusive(false);
                    }}
                    checked={taxExclusive ? true : false}
                  />

                  <p className="ps-4">
                    ₹{" "}
                    {sellingPrice === "" || null
                      ? "0.00"
                      : parseFloat(sellingPrice).toFixed(2)}{" "}
                    / per unit
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="col-md-3">
              <p>GST *</p>
              <select
                style={{
                  width: "170px",
                  borderRadius: "4px",
                  padding: "7px",
                  borderColor: "#c4c4c4",
                }}
                onChange={handleDropdownToggle3}
                // value={units}
              >
                <option value="">Select</option>
                <option value="No GST">No GST</option>
                <option value={0.1}>GST @ 0%</option>
                <option value={0.25}>GST @ 25%</option>
                <option value={1.5}>GST @ 1.5%</option>
                <option value={3}>GST @ 3%</option>
                <option value={5}>GST @ 5%</option>
                <option value={6}>GST @ 6%</option>
                <option value={12}>GST @ 12%</option>
                <option value={14}>GST @ 14%</option>
                <option value={18}>GST @ 18%</option>
                <option value={28}>GST @ 28%</option>
              </select>
            </div> */}
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
                    <p className="col-md-4">Selling Price*</p>
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
                    <p className="col-md-4">Purchase Price*</p>
                    <TextField
                      className="col-md-8 mb-3"
                      sx={{
                        borderRadius: 2,
                      }}
                      size="small"
                      value={purchasePrice}
                      onChange={(e) => setpurchasePrice(e.target.value)}
                    />
                  </div>
                  <div className="row">
                    <p className="col-md-4">Description</p>
                    <TextField
                      className="col-md-8 mb-3"
                      sx={{
                        borderRadius: 2,
                      }}
                      size="small"
                      value={purchaseDescription}
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
                    <p className="col-md-6">Item Group Category </p>
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
                    <p className="col-md-6">Opening Stock</p>
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
                    <p className="col-md-6">Opening Stock Rate Per Unit </p>
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
                    <p className="col-md-6">Reorder Level </p>
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
                    <p className="col-md-6">Preferred Vendor </p>
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
              {/* <div className="row mb-3 ">
                
                <div className="col-md-1"></div>
                <div className="col-md-4 m-auto">
                  <InputLabel className="textbld">Discount </InputLabel>
                </div>
                <div className="col-md-7">
                  <TextField
                    id="outlined-basic"
                    label="Brand"
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: 2 }}
                    onChange={(e) => setdiscount(e.target.value)}
                  />
                </div>
              </div> */}
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
                  onClick={Additem}
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
                    // value={tax}
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
                {/* <AddIcon className="addicon" /> */}

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

                      padding: "10px",
                    }}
                  />
                )}
              </Form.Label>
              <p className=" m-auto text-center textbld"> Add Images</p>
            </div>
          </div>
          {/* Unit Code */}
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
            </div>
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
                    <p className="col-md-4">Selling Price*</p>
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
                    <p className="col-md-4">Description</p>
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
                    <p className="col-md-4">Purchase Price*</p>
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
                    <p className="col-md-4">Description</p>
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
                    <p className="col-md-6">Item Group Category </p>
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
                    <p className="col-md-6">Opening Stock</p>
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
                    <p className="col-md-6">Opening Stock Rate Per Unit </p>
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
                    <p className="col-md-6">Reorder Level </p>
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
                    <p className="col-md-6">Preferred Vendor </p>
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
                  <InputLabel className="textbld">Discount </InputLabel>
                </div>
                <div className="col-md-7">
                  <TextField
                    id="outlined-basic"
                    label="Brand"
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: 2 }}
                    onChange={(e) => setdiscount(e.target.value)}
                    defaultValue={categoryObjects.discount}
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
                      />
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
                </Button>
              </div>
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
      )}
    </>
  );
}

export default Items;
