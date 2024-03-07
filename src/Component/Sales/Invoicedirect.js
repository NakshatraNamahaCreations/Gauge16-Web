import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { Modal, Table } from "react-bootstrap";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import { Autocomplete, TextField } from "@mui/material";

function Invoicedirect() {
  const [ModifyCustomer, setModifyCustomer] = useState();
  const [allCustomer, setAllCustomer] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [allSalesItems, setAllSalesItems] = useState([]);

  const [customername, setcustomername] = useState("");
  const [Invoicenumber, setInvoicenumber] = useState(1);
  const [Invoicedate, setInvoicedate] = useState("");
  const [PaymentTerms, setPaymentTerms] = useState("");
  const [Address, setAddress] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [DeliveryMethod, setDeliveryMethod] = useState("");
  const [SalesPerson, setSalesPerson] = useState("");
  const [invoicetype, setinvoicetype] = useState("");
  const [alldeliverychallan, setalldeliverychallan] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [allAccounts, setAllAccounts] = useState([]);
  const [customerAddress, setCustomerAddress] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);
  const [checkedRow, setCheckedRow] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  const handleInvoiceTypeChange = (e) => {
    setinvoicetype(e.target.value);
    if (e.target.value === "deliveryChallan") {
      setShowModal(true);

      const selectedCustomer = allCustomer.find(
        (customer) => customer.customerNameFirstName === customername
      );
      setSelectedCustomerId(selectedCustomer?._id);
    } else {
      setShowModal(false);
    }
  };

  useEffect(() => {
    getAllchallan();
  }, []);

  const [itemDetails, setitemDetails] = useState([
    {
      itemId: "",
      itemName: "",
      quantity: 0,
      rate: 0.0,
      discount: 0,
      // tax: 0,
      discountAmount: 0,
      openingStock: 0,
      oldstockinhand: 0,
      markup: 0,
    },
  ]);
  const addTableRow = () => {
    const newRow = {
      itemId: "",
      itemName: "",
      quantity: 0,
      rate: 0.0,
      discount: 0,
      // tax: 0,
      discountAmount: 0,
      openingStock: 0,
      oldstockinhand: 0,
      markup: 0,
    };
    setitemDetails((prevTableSet) => [...prevTableSet, newRow]);
  };

  console.log("itemDetails", itemDetails);
  const [addItemShow, setAddItemShow] = useState(false);

  const handleClose = () => setAddItemShow(false);
  const handleShow = () => setAddItemShow(true);

  useEffect(() => {
    getAllAccounts();
    getAllItems();
    getAllSalesItems();
  }, []);

  // console.log("=======", allItems);

  const getAllAccounts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9001/api/master/accounts/getallaccounts"
      );
      if (response.status === 200) {
        // console.log("Customer=====>", response.data);
        setAllAccounts(response.data.allAccount);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  // console.log("allcustomer====", allCustomer);

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
        // console.log("AllItems=====>", response.data);
        setalldeliverychallan(response.data.allchallan);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  // console.log("setalldeliverychallan====", alldeliverychallan);

  const getAllSalesItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9001/api/transaction/saleitems/getallsalesitems"
      );
      if (response.status === 200) {
        console.log("AllItems=====>", response.data);
        setAllSalesItems(response.data.allSalesData);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  // console.log("items===", allSalesItems);

  // const addInvoice = async () => {
  //   try {
  //     let config = {
  //       url: "/transaction/salesorder/addinvoice",
  //       method: "post",
  //       baseURL: "http://localhost:9001/api",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       data: {
  //         customername: customername,
  //         Invoicenumber: Invoicenumber,
  //         Invoicedate: Invoicedate,
  //         PaymentTerms: PaymentTerms,
  //         Address: Address,
  //         PhoneNumber: PhoneNumber,
  //         DeliveryMethod: DeliveryMethod,
  //         SalesPerson: SalesPerson,
  //         itemDetails: itemDetails.map((item) => ({
  //           ...item,
  //           discountAmount: item.discountAmount || 0, // Make sure discountAmount is not undefined
  //         })),
  //         salestype: "Invoice",
  //         invoicetype: invoicetype,
  //       },
  //     };
  //     let response = await axios(config);
  //     if (response.status === 200) {
  //       alert("added successfully");

  //       window.location.assign("/salesinvoices");
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  const addInvoice = async () => {
    try {
      let config = {
        url: "/transaction/salesorder/addsalesorder",
        method: "post",
        baseURL: "http://localhost:9001/api",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          customername: customername,
          salesorderNumber: Invoicenumber,
          salesorderDate: Invoicedate,
          // PaymentTerms: PaymentTerms,
          Address: Address,
          PhoneNumber: PhoneNumber,
          DeliveryMethod: DeliveryMethod,
          SalesPerson: SalesPerson,
          itemDetails: itemDetails,
          // contactPersonMobileNumber: contactPerson,
          salestype: "Invoice",
        },
      };
      let response = await axios(config);
      if (response.status === 200) {
        alert("Added Successfully");
        window.location.assign("/salesinvoices");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleInputChanges = (e) => {
    // console.log("customerName", e.target.value);
    const findAccount = allAccounts.find((item) => item._id === e.target.value);
    setCustomerAddress(findAccount);
    setcustomername(findAccount.accountName);
    setAddress(findAccount.address);
    setPhoneNumber(findAccount.mobileNo);
  };

  const handleSelectChange = (event, newValue, index) => {
    // Use newValue to get the selected item
    const selectedItem = newValue;

    console.log(
      "selectedItem in the handleSelectChange function",
      selectedItem
    );

    setitemDetails((prevTableSet) => {
      const newTableSet = [...prevTableSet];
      const updatedStockInHand = selectedItem?.stockInHand || 0;
      newTableSet[index] = {
        ...newTableSet[index],
        itemId: selectedItem?._id || "",
        itemName: selectedItem?.itemName || "",
        quantity: Number(0),
        rate:
          selectedItem?.sellingPrice !== undefined &&
          selectedItem?.sellingPrice !== null
            ? Number(selectedItem.sellingPrice)
            : 0.0,
        discount: Number(0),
        oldstockinhand: updatedStockInHand,
      };

      return newTableSet;
    });
  };

  // const handleSelectChange = (e, index) => {
  //   const selectedValue = e.target.value;
  //   // console.log("selectedValue", selectedValue);
  //   const selectedItem = allItems.find((item) => item._id === selectedValue);
  //   // if (selectedValue > selectedItem.stockInHand) {
  //   //   alert("quantity can't be more than  stock available");
  //   //   return;
  //   // }
  //   console.log("selectedItem in the handle select functions", selectedItem);
  //   setitemDetails((prevTableSet) => {
  //     const newTableSet = [...prevTableSet];
  //     const updatedStockInHand = selectedItem?.stockInHand || 0;
  //     newTableSet[index] = {
  //       ...newTableSet[index],
  //       itemId: selectedItem?._id || "",
  //       itemName: selectedItem?.itemName || "",
  //       quantity: Number(0),
  //       // selectedItem?.stockInHand !== undefined &&
  //       // selectedItem?.stockInHand !== null
  //       //   ? String(selectedItem.stockInHand)
  //       //   : 1,
  //       rate:
  //         selectedItem?.sellingPrice !== undefined &&
  //         selectedItem?.sellingPrice !== null
  //           ? Number(selectedItem.sellingPrice)
  //           : 0.0,
  //       discount: Number(0),
  //       oldstockinhand: updatedStockInHand,
  //       // selectedItem?.discount !== undefined &&
  //       // selectedItem?.discount !== null
  //       //   ? String(selectedItem.discount)
  //       //   : 0,
  //       // tax:
  //       //   selectedItem?.tax !== undefined && selectedItem?.tax !== null
  //       //     ? String(selectedItem.tax)
  //       //     : 0,
  //     };

  //     return newTableSet;
  //   });
  // };

  const handleQuantityChange = (e, index) => {
    const newQuantity = Number(e.target.value);
    console.log("newQuantity", newQuantity);
    const selectedItem = itemDetails[index];
    console.log("selectedItem", selectedItem);
    console.log("newQuantity", newQuantity);
    if (
      parseInt(newQuantity, 10) > parseInt(itemDetails[index].oldstockinhand)
    ) {
      alert("Quantity can't be more than stock available");
      console.log("Quantity can't be more than stock available");
      return;
    } else {
      setitemDetails((prevTableSet) => {
        const newTableSet = [...prevTableSet];
        const findOldStockInHand = parseInt(itemDetails[index].oldstockinhand);
        const remainingStock = findOldStockInHand - newQuantity;
        newTableSet[index] = {
          ...newTableSet[index],
          quantity: newQuantity,
          stockInHand: findOldStockInHand - parseInt(newQuantity),
          discountAmount: calculateFinalAmount(
            newTableSet[index].rate,
            newQuantity,
            newTableSet[index].discount,
            remainingStock
          ),
        };
        console.log("Updated Table Set:", newTableSet);
        return newTableSet;
      });
    }
  };

  const handleRateChange = (e, index) => {
    const newRate = e.target.value;
    setitemDetails((prevTableSet) => {
      const newTableSet = [...prevTableSet];
      newTableSet[index] = {
        ...newTableSet[index],
        rate: newRate,
        discountAmount: calculateFinalAmount(
          newRate,
          newTableSet[index].quantity,
          newTableSet[index].discount
        ),
      };
      return newTableSet;
    });
  };

  const handleDiscountChange = (e, index) => {
    const newDiscount = Number(e.target.value);
    console.log("newDiscount", typeof newDiscount);
    setitemDetails((prevTableSet) => {
      const newTableSet = [...prevTableSet];
      newTableSet[index] = {
        ...newTableSet[index],
        discount: newDiscount,
        discountAmount: calculateFinalAmount(
          newTableSet[index].rate,
          newTableSet[index].quantity,
          newDiscount
          // newTableSet[index].tax // Pass tax value as well
        ),
      };
      return newTableSet;
    });
  };

  // const handleDiscountChange = (e, index) => {
  //   const newDiscount = e.target.value;
  //   setitemDetails((prevTableSet) => {
  //     const newTableSet = [...prevTableSet];
  //     newTableSet[index] = {
  //       ...newTableSet[index],
  //       discount: newDiscount,
  //       discountAmount: calculateFinalAmount(
  //         newTableSet[index].rate,
  //         newTableSet[index].quantity,
  //         newDiscount
  //       ),
  //     };
  //     return newTableSet;
  //   });
  // };

  // const handleGstChange = (e, index) => {
  //   const newGst = e.target.value;
  //   setitemDetails((prevTableSet) => {
  //     const newTableSet = [...prevTableSet];
  //     newTableSet[index] = {
  //       ...newTableSet[index],
  //       gst: newGst,
  //       discountAmount: calculateFinalAmount(
  //         newTableSet[index].rate,
  //         newTableSet[index].quantity,
  //         newTableSet[index].discount,
  //         newGst
  //       ),
  //     };
  //     return newTableSet;
  //   });
  // };

  const handleGstChange = (e, index) => {
    const newGst = e.target.value;
    setitemDetails((prevTableSet) => {
      const newTableSet = [...prevTableSet];
      newTableSet[index] = {
        ...newTableSet[index],
        gst: newGst,
        discountAmount: calculateFinalAmount(
          newTableSet[index].rate,
          newTableSet[index].quantity,
          newTableSet[index].discount,
          newGst
        ),
      };
      return newTableSet;
    });
  };

  // const calculateFinalAmount = (rate, quantity, discount, tax) => {
  //   const stringToQuantity = parseFloat(quantity);
  //   const stringToRate = parseFloat(rate);
  //   const stringToDiscount = parseFloat(discount);
  //   const stringToTax = parseFloat(tax);

  //   if (
  //     isNaN(stringToQuantity) ||
  //     isNaN(stringToRate) ||
  //     isNaN(stringToDiscount) ||
  //     isNaN(stringToTax)
  //   ) {
  //     return "0.00"; // or handle the error appropriately
  //   }

  //   // Calculate the total amount before discount
  //   const totalBeforeDiscount = stringToRate * stringToQuantity;

  //   // Calculate the discount amount
  //   const discountAmount = (stringToDiscount / 100) * totalBeforeDiscount;

  //   // Calculate the discounted amount
  //   const discountedAmount = totalBeforeDiscount - discountAmount;

  //   // Calculate the GST amount on the discounted amount
  //   const gstAmount = (stringToTax / 100) * discountedAmount;

  //   // Calculate the final amount with discount and GST
  //   const finalAmount = discountedAmount + gstAmount;

  //   return finalAmount.toFixed(2);
  // };

  const handleMarkupChange = (e, index) => {
    const newMarkUp = e.target.value;
    setitemDetails((prevTableSet) => {
      const newTableSet = [...prevTableSet];
      newTableSet[index] = {
        ...newTableSet[index],
        markup: newMarkUp,
        discountAmount: calculateFinalAmount(
          newTableSet[index].rate,
          newTableSet[index].quantity,
          newTableSet[index].discount,
          newMarkUp
        ),
      };
      return newTableSet;
    });
  };

  // const calculateFinalAmount = (
  //   rate,
  //   quantity,
  //   discount,
  //   markup
  //   //  tax
  // ) => {
  //   const stringToQuantity = quantity;
  //   const stringToRate = parseFloat(rate);
  //   const stringToDiscount = parseFloat(discount);
  //   const stringToMarkup = parseFloat(markup);
  //   // const stringToTax = parseFloat(tax);
  //   if (
  //     isNaN(stringToQuantity) ||
  //     isNaN(stringToRate) ||
  //     isNaN(stringToDiscount) ||
  //     isNaN(stringToMarkup)
  //     // isNaN(stringToTax)
  //   ) {
  //     return "0.00";
  //   }
  //   const totalBeforeDiscount = stringToRate * stringToQuantity;
  //   // console.log("totalBeforeDiscount", totalBeforeDiscount);
  //   const discountAmount = (stringToDiscount / 100) * totalBeforeDiscount;

  //   const discountedAmount = totalBeforeDiscount - discountAmount;

  //   if (isNaN(discountedAmount)) {
  //     return "0.00";
  //   }

  //   // const gstAmount = (stringToTax / 100) * discountedAmount;

  //   // if (isNaN(gstAmount)) {
  //   //   return "0.00";
  //   // }

  //   const finalAmount = discountedAmount;
  //   // const finalAmount = discountedAmount + gstAmount;

  //   return Math.round(finalAmount);
  // };

  const calculateFinalAmount = (rate, quantity, discount, markup) => {
    const stringToQuantity = parseFloat(quantity);
    const stringToRate = parseFloat(rate);

    const baseAmount = stringToRate * stringToQuantity;

    const discountedAmount = baseAmount * (1 - Number(discount) / 100);

    const finalAmount = discountedAmount * (1 + Number(markup) / 100);

    return Number(Math.round(finalAmount.toFixed(2)));
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

  const handleCheckboxChange = (index, currentRowsSelected) => {
    console.log("currentRowsSelected", currentRowsSelected);
    const checkedRowObject = currentRowsSelected.selectedRows?.map((row) => {
      const itemId = row.itemId;
      return {
        ...row,
      };
    });
    setCheckedRow(checkedRowObject);
    console.log("checkedRowObject", checkedRowObject);
    setSelectedRows((prevSelectedRows) => {
      const updatedSelectedRows = { ...prevSelectedRows };
      updatedSelectedRows[index] = !updatedSelectedRows[index];
      return updatedSelectedRows;
    });
  };

  useEffect(() => {
    const salesLength = allSalesItems.filter(
      (item) => item.salestype === "Sales"
    ).length;
    setInvoicenumber(salesLength + 1);
  }, [allSalesItems]);

  // console.log("selectedRows", selectedRows);
  // console.log("checkedRow outside fuct", checkedRow);
  return (
    <div className="container p-5">
      <p className="textbld f_20">New Invoice </p>
      <div className="row mt-5  ">
        <div className="col-md-8">
          <div className="row ">
            <div className="col-md-4">
              <p className="colr-red textbld">Customer Name*</p>
            </div>
            <div className="col-md-8 mb-4">
              <Form.Select
                className=""
                label="Customer"
                onChange={handleInputChanges}
              >
                <option value="">Select Customer</option>
                {allAccounts.map((ele) => (
                  <option value={ele._id}>{ele.accountName}</option>
                ))}
              </Form.Select>
            </div>
          </div>
          <div className="row ">
            <div className="col-md-4">
              <p className="colr-red textbld">Invoice Number*</p>
            </div>

            <div className="col-md-8 mb-4">
              <Form.Control
                placeholder="Sales Invoice Number"
                value={Invoicenumber}
                readOnly
                onChange={(e) => setInvoicenumber(e.target.value)}
              />
            </div>
          </div>
          <div className="row ">
            <div className="col-md-4">
              <p className="colr-red textbld">Invoice Date*</p>
            </div>

            <div className="col-md-8 mb-4">
              <Form.Control
                type="date"
                onChange={(e) => setInvoicedate(e.target.value)}
              />
            </div>
          </div>
          <div className="row ">
            <div className="col-md-4">
              <p className="colr-red textbld">Invoice Type*</p>
            </div>
            <div className="col-md-8 mb-4">
              <Form.Select
                className=""
                value={invoicetype}
                label="Invoice Type"
                onChange={handleInvoiceTypeChange}
              >
                <option value="">Select Invoice Type</option>
                <option value="direct">Direct</option>
                <option value="deliveryChallan">Delivery Challan</option>
              </Form.Select>
            </div>
          </div>
          <div>
            {invoicetype === "deliveryChallan" && (
              <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header>
                  <Modal.Title style={{ fontSize: "14px", fontWeight: "bold" }}>
                    Pick Pending Challans to Pick the Items
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Modal.Body>
                    {alldeliverychallan
                      .filter(
                        (item) =>
                          item.customername[0]?.id === selectedCustomerId
                      )
                      .map((item) => (
                        <div className="row" key={item._id}>
                          <div className="col-md-6">
                            <div style={{ color: "black", fontSize: 14 }}>
                              Challan No
                            </div>
                            <div className="pt-2">
                              {item.deliverychallanNumber}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div style={{ color: "black", fontSize: 14 }}>
                              Dated
                            </div>
                            <div className="pt-2">
                              {item.deliverychallanDate}
                            </div>
                          </div>
                        </div>
                      ))}
                  </Modal.Body>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </Button>
                  <Button variant="primary" onClick={() => setShowModal(false)}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
          </div>

          <div className="row ">
            <div className="col-md-3">
              <div className="d-flex">
                <span className="colr-red  textbld">Address*</span>
              </div>{" "}
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-8 mb-4">
              <Form.Control
                value={Address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="row ">
            <div className="col-md-4">
              <p className="textbld">Phone Number</p>
            </div>
            <div className="col-md-8 mb-4">
              <Form.Control
                value={PhoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="row ">
            <div className="col-md-4">
              <p className=" textbld">Delivery Method</p>
            </div>

            <div className="col-md-8 mb-4">
              <Form.Control
                value={DeliveryMethod}
                onChange={(e) => setDeliveryMethod(e.target.value)}
              />
            </div>
          </div>
          <div className="row ">
            <div className="col-md-4">
              <p className=" textbld">Sales Person</p>
            </div>
            <div className="col-md-8 mb-4">
              <Form.Control
                value={SalesPerson}
                onChange={(e) => setSalesPerson(e.target.value)}
              />
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
            <i class="fa-solid fa-circle-plus" style={{ color: "#188dfa" }}></i>{" "}
            Add Row
          </button>
        </div>
      </div>
      <Table className="col-md-12">
        <thead>
          {/* <th className="td_S th_C p-2">Select</th> */}
          <th className="td_S th_C p-2">Items Details</th>
          <th className="td_S th_C p-2">Quantity</th>
          <th className="td_S th_C p-2">Rate</th>
          <th className="td_S th_C p-2">Discount</th>
          <th className="td_S th_C p-2">Markup</th>
          <th className="td_S th_C p-2">Amount</th>
          <th className="td_S th_C p-2"></th>
        </thead>
        <tbody>
          {itemDetails.map((ele, index) => {
            return (
              <tr>
                {/* <td className="td_S m-auto th_C p-3">
                  <input
                    type="checkbox"
                    checked={selectedRows[index] || false}
                    onChange={() => handleCheckboxChange(index, ele)}
                  />
                </td> */}
                <td className="td_S m-auto th_C p-3">
                  {/* <select
                    style={{
                      border: "1px solid #dee2e6",
                      padding: "11px",
                      outline: 0,
                      borderRadius: "8px",
                      width: "200px",
                    }}
                    onChange={(e) => handleSelectChange(e, index)}
                  >
                    <option value="">Select an item</option>
                    {allItems?.map((items) => {
                      return (
                        <option key={items._id} value={items._id}>
                          {items.itemName} / SKU:{items.skuCode} / Rate: Rs.
                          {items.sellingPrice}
                        </option>
                      );
                    })}
                  </select> */}
                  <Autocomplete
                    id="Item Details"
                    options={allItems}
                    getOptionLabel={(option) =>
                      `${option.itemName} / SKU: ${option.skuCode} / Rate: Rs. ${option.sellingPrice}`
                    }
                    style={{ width: 300 }}
                    onChange={(event, newValue) =>
                      handleSelectChange(event, newValue, index)
                    }
                    // onChange={(event, newValue) =>
                    //   handleSelectChange(event, newValue, index)
                    // }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Item Details"
                        variant="outlined"
                      />
                    )}
                    renderOption={(props, option) => {
                      const { onMouseMove, onMouseOver, ...other } = props;
                      const isHovered =
                        hoveredItem && hoveredItem._id === option._id;
                      return (
                        <li
                          {...other}
                          onMouseOver={(event) => {
                            setHoveredItem(option);
                            onMouseOver && onMouseOver(event);
                          }}
                          onMouseMove={onMouseMove}
                        >
                          <div>
                            {`${option.itemName} / SKU: ${option.skuCode} / Rate: Rs. ${option.sellingPrice}`}
                          </div>
                          {isHovered && option.description && (
                            <div style={{ fontSize: 12, color: "gray" }}>
                              {`Description: ${option.description}`}
                            </div>
                          )}
                        </li>
                      );
                    }}
                  />
                </td>
                <td className="td_S m-auto th_C p-3">
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
                <td className="td_S m-auto th_C p-3">
                  <Form.Control
                    placeholder="Rate"
                    readOnly
                    min={0}
                    style={{
                      border: "1px solid #dee2e6",
                      padding: "11px",
                      outline: 0,
                      borderRadius: "8px",
                    }}
                    value={ele.rate}
                  />
                </td>
                <td className="td_S m-auto th_C p-3">
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
                    min={0}
                    onChange={(e) => handleDiscountChange(e, index)}
                  />
                </td>
                <td className="td_S m-auto th_C p-3">
                  <Form.Control
                    placeholder="discount"
                    type="number"
                    style={{
                      border: "1px solid #dee2e6",
                      padding: "11px",
                      outline: 0,
                      borderRadius: "8px",
                    }}
                    value={ele.markup}
                    min={0}
                    onChange={(e) => handleMarkupChange(e, index)}
                  />
                </td>
                <td className="td_S m-auto th_C p-3">
                  <div
                    className="mb-1"
                    style={{
                      border: "1px solid #dee2e6",
                      padding: "11px",
                      outline: 0,
                      borderRadius: "8px",
                      fontWeight: 700,
                    }}
                  >
                    {calculateFinalAmount(
                      ele.rate,
                      ele.quantity,
                      ele.discount,
                      ele.markup
                    )}
                  </div>
                </td>
                <td className="td_S m-auto th_C p-4">
                  <i
                    class="fa-solid fa-trash-can mt-3"
                    title="Delete Item"
                    onClick={() => handleDeleteRow(index)}
                    style={{ color: "red", cursor: "pointer" }}
                  ></i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <div className="row">
            <div className="col-md-5">
              <Button
                className=" textbld m-auto m-2 bg_color"
                onClick={addInvoice}
              >
                Done
              </Button>{" "}
            </div>
            <Button className="col-md-5 textbld m-auto m-2" variant="light">
              Cancel
            </Button>{" "}
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
}

export default Invoicedirect;
