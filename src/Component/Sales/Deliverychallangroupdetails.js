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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import Dropdown from "react-bootstrap/Dropdown";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Table } from "react-bootstrap";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

// moment().format("MM-DD-YYYY")

function Deliverychallangroupdetails() {
  const { id } = useParams();
  const [item, setItem] = useState(false);
  const [ModifyITems, setModifyITems] = useState(false);

  const [customername, setcustomername] = useState("");
  const [deliverychallanNumber, setdeliverychallanNumber] = useState("");
  const [deliverychallanDate, setdeliverychallanDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [vchno, setvchno] = useState("");
  const [challantype, setchallantype] = useState("");
  const [salestype, setsalestype] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [allcustomer, setallcustomer] = useState([]);
  const [series, setseries] = useState("");
  const [customerNameFirstName, setCustomerNameFirstName] = useState("");
  const [alldeliverychallan, setalldeliverychallan] = useState([]);
  const [categoryObjects, setCategoryObjects] = useState({});
  const [searchdeliverychallan, setsearchdeliverychallan] = useState("");
  const [parentGroup, setparentGroup] = useState("");
  const [alldeliverychallagroup, setalldeliverychallagroup] = useState([]);

  const adddeliverychallan = async () => {
    try {
      let config = {
        url: "/transaction/challan/addchallan",
        method: "post",
        baseURL: "http://localhost:9001/api",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          customername: {
            id: customername,
            firstName: customerNameFirstName,
          },
          deliverychallanNumber: deliverychallanNumber,
          deliverychallanDate: deliverychallanDate,
          parentGroup: parentGroup,
          itemDetails: itemDetails,
        },
      };
      let response = await axios(config);
      if (response.status === 200) {
        alert("added successfully");
        window.location.reload();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const [itemDetails, setitemDetails] = useState([
    {
      itemId: "",
      itemName: "",
      quantity: "1",
      rate: "0.00",
      discount: "0",
      discountAmount: "0",
    },
  ]);

  useEffect(() => {
    getAllItems();
    getAllcustomer();
    getAllchallan();
  }, []);

  useEffect(() => {
    getAlldeliverychallangroup();
  }, []);

  const getAllcustomer = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9001/api/master/accounts/getallaccounts"
      );
      if (response.status === 200) {
        console.log("Account Group=====>", response.data);
        setallcustomer(response.data.allAccount);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const getAlldeliverychallangroup = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9001/api/deliverychallan/challangroup/getAlldeliverychallanGroups"
      );
      if (response.status === 200) {
        console.log("Account Group=====>", response.data);
        setalldeliverychallagroup(response.data.alldeliverychallangroup);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const getAllItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9001/api/master/items/getallitems"
      );
      if (response.status === 200) {
        // console.log("AllItems=====>", response.data);
        setAllItems(response.data.allItems);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  const getAllchallan = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9001/api/transaction/challan/getAllchallan"
      );
      if (response.status === 200) {
        setalldeliverychallan(
          response.data.allchallan.filter((item) => item.parentGroup === id)
        );
      }
    } catch (error) {
      console.warn(error);
    }
  };

  console.log("setalldeliverychallan====", alldeliverychallan);

  const handleSelectChange = (e, index) => {
    const selectedValue = e.target.value;
    const selectedItem = allItems.find((item) => item._id === selectedValue);
    // console.log("selectedItem", selectedItem);
    setitemDetails((prevTableSet) => {
      const newTableSet = [...prevTableSet];
      newTableSet[index] = {
        ...newTableSet[index],
        itemId: selectedItem?._id || "",
        itemName: selectedItem?.itemName || "",
        quantity:
          selectedItem?.unitRequired !== undefined &&
          selectedItem?.unitRequired !== null
            ? String(selectedItem.unitRequired)
            : "1",
        rate:
          selectedItem?.sellingPrice !== undefined &&
          selectedItem?.sellingPrice !== null
            ? String(selectedItem.sellingPrice)
            : "0.00",
        discount:
          selectedItem?.discount !== undefined &&
          selectedItem?.discount !== null
            ? String(selectedItem.discount)
            : "0",
      };

      return newTableSet;
    });
  };

  const addTableRow = () => {
    const newRow = {
      itemId: "",
      itemName: "",
      quantity: "1",
      rate: "0.00",
      discount: "0",
      // discountAmount: calculateDiscountAmount("0.00", "1", "0"),
    };
    setitemDetails((prevTableSet) => [...prevTableSet, newRow]);
  };

  const handleQuantityChange = (e, index) => {
    const newQuantity = e.target.value;
    setitemDetails((prevTableSet) => {
      const newTableSet = [...prevTableSet];
      newTableSet[index] = {
        ...newTableSet[index],
        quantity: newQuantity,
        discountAmount: calculateDiscountAmount(
          newTableSet[index].rate,
          newQuantity,
          newTableSet[index].discount
        ),
      };
      return newTableSet;
    });
  };

  const handleRateChange = (e, index) => {
    const newRate = e.target.value;
    setitemDetails((prevTableSet) => {
      const newTableSet = [...prevTableSet];
      newTableSet[index] = {
        ...newTableSet[index],
        rate: newRate,
        discountAmount: calculateDiscountAmount(
          newRate,
          newTableSet[index].quantity,
          newTableSet[index].discount
        ),
      };
      return newTableSet;
    });
  };

  const handleDiscountChange = (e, index) => {
    const newDiscount = e.target.value;
    setitemDetails((prevTableSet) => {
      const newTableSet = [...prevTableSet];
      newTableSet[index] = {
        ...newTableSet[index],
        discount: newDiscount,
        discountAmount: calculateDiscountAmount(
          newTableSet[index].rate,
          newTableSet[index].quantity,
          newDiscount
        ),
      };
      return newTableSet;
    });
  };

  const calculateDiscountAmount = (rate, quantity, discount) => {
    const stringToQuantity = parseFloat(quantity);
    const stringToRate = parseFloat(rate);
    const discountAmount = (
      stringToRate *
      stringToQuantity *
      (1 - Number(discount) / 100)
    ).toFixed(2);
    return discountAmount;
  };

  const handleDeleteRow = (index) => {
    setitemDetails((prevTableSet) => {
      const updatedTableSet = [
        ...prevTableSet.slice(0, index),
        ...prevTableSet.slice(index + 1),
      ];
      console.log("Updated rows:", updatedTableSet);
      return updatedTableSet;
    });
  };

  const handleRowSelected = (rows) => {
    console.log("Selected Rows:", rows);
  };

  const handleRowClicked = (row) => {
    console.log("Clicked Row:", row);
  };

  const quotationsWithData = alldeliverychallan.map((quotation) => {
    const totalDiscountAmount = quotation.itemDetails
      ? quotation.itemDetails.reduce((itemTotal, item) => {
          return itemTotal + parseFloat(item.discountAmount || 0);
        }, 0)
      : 0;

    return {
      ...quotation,
      totalDiscountAmount: totalDiscountAmount,
    };
  });

  const totalDiscountAmount = alldeliverychallan.reduce((acc, quotation) => {
    if (quotation.itemDetails) {
      return (
        acc +
        quotation.itemDetails.reduce((itemTotal, item) => {
          return itemTotal + parseFloat(item.discountAmount || 0);
        }, 0)
      );
    }
    return acc;
  }, 0);

  const filterdata = alldeliverychallan.filter(
    (item) =>
      (item.deliverychallanDate &&
        item.deliverychallanDate
          .toLowerCase()
          .includes(searchdeliverychallan.toLowerCase())) ||
      (item.customername[0]?.firstName &&
        item.customername[0]?.firstName
          .toLowerCase()
          .includes(searchdeliverychallan.toLowerCase()))
  );

  const columns = [
    {
      selector: (row, index) => index + 1,
      name: "Sl.No",
    },
    {
      selector: (row) => row.deliverychallanDate,
      name: "Date",
      sort: true,
    },

    {
      selector: (row) => row.deliverychallanNumber,
      name: "Delivery Challan Number",
      sort: true,
    },

    {
      selector: (row) => row.customername[0]?.firstName,
      name: "Customer Name",
      sort: true,
    },
    {
      selector: (row) => {
        const totalDiscountAmountForRow = row.itemDetails
          ? row.itemDetails.reduce((itemTotal, item) => {
              return itemTotal + parseFloat(item.discountAmount || 0);
            }, 0)
          : 0;

        const roundedTotalDiscountAmountForRow = Math.round(
          totalDiscountAmountForRow
        );

        return roundedTotalDiscountAmountForRow;
      },
      name: "Rate",
      sort: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <div>
          <i
            class="fa-solid fa-trash-can"
            onClick={() => deletedeliverychallan(row)}
            style={{ color: "red", cursor: "pointer" }}
          ></i>
          <i
            title="Edit"
            class="fa-regular fa-pen-to-square ms-2"
            style={{ cursor: "pointer" }}
            // onClick={() => handlerowedit(row)}
          ></i>
        </div>
      ),
    },
  ];

  const deletedeliverychallan = async (data) => {
    try {
      const res = await axios.delete(
        `http://localhost:9001/api/transaction/challan/deletechallan/${data._id}`
      );

      if (res.status === 200) {
        console.log(res.data);
        alert(res.data.message);
        getAllchallan();
      }
    } catch (error) {
      console.log("Error", error);
      alert("Cannot perform the operation");
    }
  };

  const [selected, setSelected] = useState("All Items");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleRowSelectedList = (e) => {
    const selectedItem = e.target.innerText.trim();
    setSelected(selectedItem);
    setShowDropdown(false);
  };

  const [unitFrom, setunitFrom] = useState("kg");
  const [unitTo, setunitTo] = useState("kg");

  const handleDropdownToggle2 = (event) => {
    setunitFrom(event.target.value);
  };

  const [expanded, setExpanded] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const handleChangeAccordian = (index) => {
    setExpanded(!expanded);
    setExpandedIndex(index);
  };

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

  const handleCustomerSelect = (e) => {
    const selectedCustomerId = e.target.value;
    const selectedCustomer = allcustomer.find(
      (customer) => customer._id === selectedCustomerId
    );

    if (selectedCustomer) {
      setcustomername(selectedCustomerId);
      setCustomerNameFirstName(selectedCustomer.customerNameFirstName);
    }
  };

  useEffect(() => {
    const creditdataLength = alldeliverychallan.length;
    setdeliverychallanNumber(creditdataLength + 1);
  }, [alldeliverychallan]);

  return (
    <>
      {!item && !ModifyITems && (
        <>
          <div className="row mt-4  m-auto ">
            <div className="col-md-2 ">
              <h6>Delivery Challans</h6>
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
                placeholder="Search Date Customer Name..."
                type="text"
                onChange={(e) => setsearchdeliverychallan(e.target.value)}
              />
            </div>

            <div className="col-md-6 "></div>
          </div>
          <div className="row m-auto">
            <DataTable columns={columns} data={filterdata} pagination />
          </div>
        </>
      )}
      {item && !ModifyITems && (
        <div className="container p-5">
          <p className="textbld f_20">New Delivery Challan </p>
          <div className="row mt-5  ">
            <div className="col-md-8">
              <div className="row ">
                <div className="col-md-4">
                  <p className="colr-red textbld">Customer*</p>
                </div>
                <div className="col-md-8 mb-4">
                  <Form.Select onChange={(e) => handleCustomerSelect(e)}>
                    <option>---Select Customer Name---</option>
                    {allcustomer?.map((ele) => {
                      return (
                        <>
                          <option value={ele._id}>{ele.accountName}</option>
                        </>
                      );
                    })}
                  </Form.Select>
                </div>
              </div>
              <div className="row ">
                <div className="col-md-4">
                  <p className="colr-red textbld">Delivery Challan Number*</p>
                </div>
                <div className="col-md-8 mb-4">
                  <Form.Control
                    placeholder="Delivery Challan Number"
                    onChange={(e) => setdeliverychallanNumber(e.target.value)}
                    value={deliverychallanNumber}
                  />
                </div>
              </div>
              <div className="row ">
                <div className="col-md-4">
                  <p className="colr-red textbld">Delivery Challan Date*</p>
                </div>

                <TextField
                  className=" m-auto mb-4"
                  sx={{ width: "48ch" }}
                  size="small"
                  type="date"
                  onChange={(e) => setdeliverychallanDate(e.target.value)}
                  value={deliverychallanDate}
                />
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
                    onChange={(e) => setparentGroup(e.target.value)}
                  >
                    <option value="">Select</option>
                    {alldeliverychallagroup?.map((ele) => {
                      return (
                        <option value={ele._id}>
                          {ele.deliverychallanGroupName}
                        </option>
                      );
                    })}
                  </Form.Select>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-2 text-start">
              <button
                className="sale-order-add-item-btn"
                style={{
                  padding: "3px 7px",
                  border: "1px solid #f9f9fb",
                  borderRadius: "5px",
                }}
                onClick={addTableRow}
              >
                <i
                  class="fa-solid fa-circle-plus"
                  style={{ color: "#188dfa" }}
                ></i>
                Add Row
              </button>
            </div>
            <div className="col-md-8 m-auto "></div>
            <div className="col-md-2 text-end textbld bulkupload">
              Bulk Update
            </div>
          </div>
          <Table className="col-md-12">
            <thead>
              <th className="td_S th_C p-2">Items Details</th>
              <th className="td_S th_C p-2">Quantity</th>
              <th className="td_S th_C p-2">Rate</th>
              <th className="td_S th_C p-2">Discount</th>
              <th className="td_S th_C p-2">Amount</th>
              <th className="td_S th_C p-2"></th>
            </thead>
            <tbody>
              {itemDetails.map((ele, index) => {
                console.log("Rendering index:", index);
                return (
                  <tr>
                    {/* {console.log("ele", ele)} */}
                    <td className="td_S m-auto th_C p-4">
                      <select
                        style={{
                          border: "1px solid #dee2e6",
                          padding: "11px",
                          outline: 0,
                          borderRadius: "8px",
                        }}
                        onChange={(e) => handleSelectChange(e, index)}
                      >
                        <option value="">Select an item</option>;
                        {allItems?.map((items) => {
                          return (
                            <option key={items._id} value={items._id}>
                              {items.itemName} / SKU:{items.skuCode} / Rate: Rs.
                              {items.sellingPrice}
                            </option>
                          );
                        })}
                      </select>
                    </td>{" "}
                    <td className="td_S m-auto th_C p-4">
                      <Form.Control
                        placeholder="Quantity"
                        type="number"
                        min={1}
                        style={{
                          border: "1px solid #dee2e6",
                          padding: "11px",
                          outline: 0,
                          borderRadius: "8px",
                        }}
                        value={ele.quantity}
                        onChange={(e) => handleQuantityChange(e, index)}
                      />
                    </td>
                    <td className="td_S m-auto th_C p-4">
                      <Form.Control
                        placeholder="Rate"
                        type="number"
                        min={0}
                        style={{
                          border: "1px solid #dee2e6",
                          padding: "11px",
                          outline: 0,
                          borderRadius: "8px",
                        }}
                        value={ele.rate}
                        onChange={(e) => handleRateChange(e, index)}
                      />
                    </td>
                    <td className="td_S m-auto th_C p-4">
                      <Form.Control
                        placeholder="discount"
                        type="number"
                        style={{
                          border: "1px solid #dee2e6",
                          padding: "11px",
                          outline: 0,
                          borderRadius: "8px",
                        }}
                        value={ele.discount}
                        onChange={(e) => handleDiscountChange(e, index)}
                      />
                    </td>
                    <td className="td_S m-auto th_C p-4">
                      <div
                        className="mb-1"
                        style={{
                          // boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
                          border: "1px solid #dee2e6",
                          padding: "11px",
                          outline: 0,
                          borderRadius: "8px",
                          fontWeight: 700,
                        }}
                      >
                        {calculateDiscountAmount(
                          ele.rate,
                          ele.quantity,
                          ele.discount
                        )}
                      </div>
                    </td>
                    <td className="td_S m-auto th_C p-4">
                      <button
                        onClick={() => handleDeleteRow(index)}
                        className="delete-row-button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <div className="row  ">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-5">
                  {/* <Link className="row anchore_Tag" to="/Sales"> */}
                  <Button
                    className=" textbld m-auto m-2 bg_color"
                    onClick={adddeliverychallan}
                  >
                    Done
                  </Button>{" "}
                  {/* </Link>{" "} */}
                </div>
                <Button
                  // onClick={() => setpullquotaion(false)}
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
      {/* {!item && ModifyITems && (
        <div className="container ">
          <p className="textbld f_20">Modify Items</p>
          <div className="row mt-5 m-auto ">
            <div className="col-md-9">
              <div className="row p-3">
                <div className="col-md-4">
                  <p className="colr-red  textbld">Item Name*</p>
                </div>

                <div className="col-md-8">
                  <Form.Control onChange={(e) => setName(e.target.value)} />
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-4">
                  <p className="colr-red textbld">Alias Name*</p>
                </div>

                <div className="col-md-8">
                  <Form.Control
                    onChange={(e) => setAliasName(e.target.value)}
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
                    value={selectprimary}
                    label="Unit"
                    onChangeCapture={(e) => setselectprimary(e.target.value)}
                  >
                    <option disabled>Select</option>
                    <option value={"Yes"}>Yes</option>
                    <option value={"No"}>No</option>
                  </Form.Select>
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
                    onChange={(e) => setunderGroup(e.target.value)}
                    disabled={selectprimary === "Yes"}
                  >
                    {Name?.map((ele) => {
                      return <option value={ele.id}>{ele.name}</option>;
                    })}
                    <option value={"General"}>General</option>
                  </Form.Select>
                </div>
              </div>

              <div className="row p-3">
                <div className="col-md-4">
                  <p className="colr-red textbld">SKU Code*</p>
                </div>
                <div className="col-md-8">
                  <Form.Control onChange={(e) => setSkuCode(e.target.value)} />
                </div>
              </div>
              <div className="row p-3">
                <div className="col-md-4">
                  <p className="colr-red textbld">SKU Manufacturers's Code*</p>
                </div>

                <div className="col-md-8">
                  <Form.Control
                    onChange={(e) => setManuFacturersCode(e.target.value)}
                  />
                </div>
              </div>

              <div className="row p-3">
                <div className="col-md-4">
                  <p>Description</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    onChange={(e) => setDescription(e.target.value)}
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
                    value={selectedTaxCategory}
                    disabled={!taxable}
                    onChange={(e) => setSelectedTaxCategory(e.target.value)}
                  >
                    {Name?.map((ele) => {
                      return <option value={ele.id}>{ele.name}</option>;
                    })}
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

                <TextField type="file" style={{ display: "none" }} />
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
                      onChange={(e) => setsalespric(e.target.value)}
                      className="mb-3 col-md-8"
                      sx={{
                        borderRadius: 2,
                      }}
                      size="small"
                    />
                  </div>
                  <div className="row">
                    <p className="col-md-4">Description</p>{" "}
                    <TextField
                      className="col-md-8"
                      onChange={(e) => setsalesDescription(e.target.value)}
                      sx={{
                        borderRadius: 2,
                      }}
                      size="small"
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
                      onChange={(e) => setPurchasespric(e.target.value)}
                      sx={{
                        borderRadius: 2,
                      }}
                      size="small"
                    />
                  </div>
                  <div className="row">
                    <p className="col-md-4">Description</p>{" "}
                    <TextField
                      className="col-md-8 mb-3"
                      onChange={(e) => setPurchasesDescription(e.target.value)}
                      sx={{
                        borderRadius: 2,
                      }}
                      size="small"
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
                      onChange={(e) => setItemGCategory(e.target.value)}
                      sx={{
                        borderRadius: 2,
                      }}
                      size="small"
                    />
                  </div>
                  <div className="row mb-3">
                    <p className="col-md-6">Opening Stock</p>{" "}
                    <TextField
                      className="col-md-6"
                      onChange={(e) => setopeningStock(e.target.value)}
                      sx={{
                        borderRadius: 2,
                      }}
                      size="small"
                    />
                  </div>
                  <div className="row mb-3">
                    <p className="col-md-6">Opening Stock Rate Per Unit </p>{" "}
                    <TextField
                      className="col-md-6"
                      onChange={(e) => setoSRateperunit(e.target.value)}
                      sx={{
                        borderRadius: 2,
                      }}
                      size="small"
                    />
                  </div>
                  <div className="row mb-3">
                    <p className="col-md-6">Reorder Level </p>{" "}
                    <TextField
                      className="col-md-6"
                      onChange={(e) => setreorderLevel(e.target.value)}
                      sx={{
                        borderRadius: 2,
                      }}
                      size="small"
                    />
                  </div>
                  <div className="row mb-3">
                    <p className="col-md-6">Preferred Vendor </p>{" "}
                    <TextField
                      className="col-md-6"
                      onChange={(e) => setPreferredVendor(e.target.value)}
                      sx={{
                        borderRadius: 2,
                      }}
                      size="small"
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
                    onChange={(e) => setHSNcode(e.target.value)}
                    id="outlined-basic"
                    label="HSN Code"
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: 2 }}
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
                    onChange={(e) => setmanufacturerscode1(e.target.value)}
                    id="outlined-basic"
                    label="Manufacturers Code"
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: 2 }}
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
                    onChange={(e) => setBrand(e.target.value)}
                    id="outlined-basic"
                    label="Brand"
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: 2 }}
                  />
                </div>
              </div>
              <div className="row mb-3 ">
                {" "}
                <div className="col-md-1"></div>
                <div className="col-md-4 m-auto">
                  <InputLabel className="textbld">Manufacturer </InputLabel>
                </div>
                <div className="col-md-7">
                  <TextField
                    onChange={(e) => setManufacturer(e.target.value)}
                    id="outlined-basic"
                    label="Manufacturer"
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: 2 }}
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
                    onChange={(e) => setweight(e.target.value)}
                    id="outlined-basic"
                    label="Weight"
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: 2 }}
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
                        value={lengths}
                        sx={{ width: "9ch", borderRadius: 2 }}
                        onChange={(e) => setlengths(e.target.value)}
                      />{" "}
                    </div>
                    <div className="col-md-4 m-auto">
                      <TextField
                        id="dimensions"
                        label="width"
                        variant="outlined"
                        size="small"
                        sx={{ width: "9ch", borderRadius: 2 }}
                        value={widths}
                        onChange={(e) => setwidths(e.target.value)}
                      />
                    </div>
                    <div className="col-md-4 m-auto">
                      <TextField
                        id="dimensions"
                        label="height"
                        variant="outlined"
                        size="small"
                        value={heights}
                        sx={{ width: "9ch", borderRadius: 2 }}
                        onChange={(e) => setheights(e.target.value)}
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
                <Button className="col-md-5 textbld m-auto m-2 bg_color">
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
      )} */}
    </>
  );
}

export default Deliverychallangroupdetails;
