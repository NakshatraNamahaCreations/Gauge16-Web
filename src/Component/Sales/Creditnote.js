import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/esm/Button";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import NavDropdown from "react-bootstrap/NavDropdown";
import { InputAdornment, TextField } from "@mui/material";
import Form from "react-bootstrap/Form";

import { Table } from "react-bootstrap";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

function Creditnote() {
  const [item, setItem] = useState(false);
  const [ModifyITems, setModifyITems] = useState(false);

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
      selector: (row) => row.creditnoteDate,
      name: "Date",
      sort: true,
    },

    {
      selector: (row) => row.creditnoteNumber,
      name: "Credit Note Number",
      sort: true,
    },

    {
      selector: (row) => row.customername,
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
            onClick={() => deletequotation(row)}
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

  const [customername, setcustomername] = useState("");
  const [creditnoteNumber, setcreditnoteNumber] = useState("");

  const [creditnoteDate, setcreditnoteDate] = useState(
    moment().format("YYYY-MM-DD")
  );

  const [allItems, setAllItems] = useState([]);

  const [allcreditdata, setallcreditdata] = useState([]);
  const [allitem, setallitem] = useState([]);
  const [allcustomer, setallcustomer] = useState([]);
  const [searchquotation, setsearchquotation] = useState("");

  useEffect(() => {
    getallcreditdata();
  }, []);

  useEffect(() => {
    getAllcustomer();
  }, []);

  const getallcreditdata = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9001/api/transaction/creditnote/getAllcreditnote"
      );
      if (response.status === 200) {
        console.log("Account Group=====>", response.data);
        setallcreditdata(response.data.allcreditnote);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  // const filterdata = allcreditdata.filter(
  //   (item) =>
  //     (item.creditnoteDate &&
  //       item.creditnoteDate
  //         .toLowerCase()
  //         .includes(searchquotation.toLowerCase())) ||
  //     (item.customername &&
  //       item.customername.toLowerCase().includes(searchquotation.toLowerCase()))
  // );

  const filterdata = allcreditdata.filter((item) => {
    const creditnoteDateLower = item.creditnoteDate
      ? item.creditnoteDate.toLowerCase()
      : "";
    const customerNameLower = item.customername
      ? item.customername.toString().toLowerCase()
      : "";

    return (
      creditnoteDateLower.includes(searchquotation.toLowerCase()) ||
      customerNameLower.includes(searchquotation.toLowerCase())
    );
  });

  const quotationsWithData = allcreditdata.map((quotation) => {
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

  const totalDiscountAmount = allcreditdata.reduce((acc, quotation) => {
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

  console.log("totalDiscountAmount", totalDiscountAmount);

  console.log("allcustomer----29393", allitem);

  const getAllcustomer = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9001/api/master/customers/getallcustomer"
      );
      if (response.status === 200) {
        console.log("Account Group=====>", response.data);
        setallcustomer(response.data.allCustomers);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  console.log("allquoitation", allcreditdata);

  const addSalesItem = async () => {
    try {
      let config = {
        url: "/transaction/creditnote/addcreditnote",
        method: "post",
        baseURL: "http://localhost:9001/api",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          customername: customername,

          creditnoteNumber: creditnoteNumber,
          creditnoteDate: creditnoteDate,
          itemDetails: itemDetails.map((item) => ({
            ...item,
            discountAmount: item.discountAmount || 0,
          })),
          salestype: "Quotation",
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

  // new

  const [unitFrom, setunitFrom] = useState("kg");
  const [unitTo, setunitTo] = useState("kg");

  const [expanded, setExpanded] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const [itemDetails, setitemDetails] = useState([
    {
      itemId: "",
      itemName: "",
      quantity: "1",
      rate: "0.00",
      discount: "0",
      discountAmount: 0,
      tax: "0",
    },
  ]);

  useEffect(() => {
    getAllItems();
  }, []);

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
        tax:
          selectedItem?.tax !== undefined && selectedItem?.tax !== null
            ? String(selectedItem.tax)
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
      tax: "0",
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
          newDiscount,
          newTableSet[index].tax
        ),
      };
      return newTableSet;
    });
  };

  const handleGstChange = (e, index) => {
    const newGst = e.target.value;
    setitemDetails((prevTableSet) => {
      const newTableSet = [...prevTableSet];
      newTableSet[index] = {
        ...newTableSet[index],
        gst: newGst,
        discountAmount: calculateDiscountAmount(
          newTableSet[index].rate,
          newTableSet[index].quantity,
          newTableSet[index].discount,
          newGst
        ),
      };
      return newTableSet;
    });
  };

  const calculateDiscountAmount = (rate, quantity, discount, tax) => {
    const stringToQuantity = parseFloat(quantity);
    const stringToRate = parseFloat(rate);
    const stringToDiscount = parseFloat(discount);
    const stringToTax = parseFloat(tax);
    if (
      isNaN(stringToQuantity) ||
      isNaN(stringToRate) ||
      isNaN(stringToDiscount) ||
      isNaN(stringToTax)
    ) {
      return "0.00";
    }
    const totalBeforeDiscount = stringToRate * stringToQuantity;

    const discountAmount = (stringToDiscount / 100) * totalBeforeDiscount;

    const discountedAmount = totalBeforeDiscount - discountAmount;

    if (isNaN(discountedAmount)) {
      return "0.00";
    }

    const gstAmount = (stringToTax / 100) * discountedAmount;

    if (isNaN(gstAmount)) {
      return "0.00";
    }

    const finalAmount = discountedAmount + gstAmount;

    return finalAmount.toFixed(2);
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

  const deletequotation = async (data) => {
    try {
      const response = await axios.delete(
        `http://localhost:9001/api/transaction/salesorder/deletesalesorder/${data._id}`
      );
      if (response.status === 200) {
        console.log(response.data);
        alert("Deleted Suceessfully");
        // window.location.reload();
        getallcreditdata();
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    const creditdataLength = allcreditdata.length;
    setcreditnoteNumber(creditdataLength + 1);
  }, [allcreditdata]);

  return (
    <>
      {!item && !ModifyITems && (
        <>
          <div className="row mt-4  m-auto ">
            <div className="col-md-2 ">
              <h1>Credit Note</h1>
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
                placeholder="Search Customer Name Date..."
                type="text"
                onChange={(e) => setsearchquotation(e.target.value)}
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
          <p className="textbld f_20">New Credit Note </p>
          <div className="row mt-5  ">
            <div className="col-md-8">
              <div className="row ">
                <div className="col-md-4">
                  <p className="colr-red textbld">Customer*</p>
                </div>
                <div className="col-md-8 mb-4">
                  <Form.Select
                    onChange={(e) => setcustomername(e.target.value)}
                  >
                    <option>---Select Customer Name---</option>
                    {allcustomer?.map((ele) => {
                      return (
                        <>
                          <option value={ele.customerNameFirstName}>
                            {" "}
                            {ele.customerNameSalutation}{" "}
                            {ele.customerNameFirstName}
                            {ele.customerNameLastName}
                          </option>
                        </>
                      );
                    })}
                  </Form.Select>
                </div>
              </div>
              <div className="row ">
                <div className="col-md-4">
                  <p className="colr-red textbld">Credit Note Number*</p>
                </div>
                <div className="col-md-8 mb-4">
                  <Form.Control
                    placeholder="Sales Quotation Number"
                    value={creditnoteNumber}
                    onChange={(e) => setcreditnoteNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="row ">
                <div className="col-md-4">
                  <p className="colr-red textbld">Credit Note Date*</p>
                </div>

                <TextField
                  className=" m-auto mb-4"
                  sx={{ width: "48ch" }}
                  size="small"
                  type="date"
                  onChange={(e) => setcreditnoteDate(e.target.value)}
                  value={creditnoteDate}
                />
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
              <th className="td_S th_C p-2">Gst</th>
              <th className="td_S th_C p-2">Amount</th>
              <th className="td_S th_C p-2">Action</th>
            </thead>
            <tbody>
              {itemDetails.map((ele, index) => {
                console.log("Rendering index:", index);
                return (
                  <tr>
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
                      <Form.Control
                        placeholder="Gst"
                        type="number"
                        style={{
                          border: "1px solid #dee2e6",
                          padding: "11px",
                          outline: 0,
                          borderRadius: "8px",
                        }}
                        value={ele.tax}
                        onChange={(e) => handleGstChange(e, index)}
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
                        {
                          (console.log(
                            "ele.rate, ele.quantity, ele.discount, ele.tax ",
                            ele.rate,
                            ele.quantity,
                            ele.discount,
                            ele.tax
                          ),
                          calculateDiscountAmount(
                            ele.rate,
                            ele.quantity,
                            ele.discount,
                            ele.tax
                          ))
                        }
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
                    onClick={addSalesItem}
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
    </>
  );
}

export default Creditnote;