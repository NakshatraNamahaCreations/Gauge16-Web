import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/esm/Button";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Autocomplete, TextField } from "@mui/material";
import Form from "react-bootstrap/Form";

import { Table } from "react-bootstrap";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link } from "react-router-dom";
import axios from "axios";

function Quotations() {
  const [item, setItem] = useState(false);
  const [ModifyITems, setModifyITems] = useState(false);
  const [categoryObjects, setCategoryObjects] = useState({});
  const [customername, setcustomername] = useState("");
  const [allquotation, setallquotation] = useState([]);
  const [QuotationNumber, setQuotationNumber] = useState(1);
  const [QuotationDate, setQuotationDate] = useState("");
  const [PaymentTerms, setPaymentTerms] = useState("");
  const [Address, setAddress] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [DeliveryMethod, setDeliveryMethod] = useState("");
  const [SalesPerson, setSalesPerson] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [allitem, setallitem] = useState([]);
  const [contactPerson, setContactPerson] = useState("");
  const [allAccounts, setAllAccounts] = useState([]);
  const [customerAddress, setCustomerAddress] = useState({});
  const [searchquotation, setsearchquotation] = useState("");
  const [hoveredItem, setHoveredItem] = useState(null);

  console.log("QuotationNumber", QuotationNumber);

  useEffect(() => {
    const quotationLength = allquotation.filter(
      (item) => item.salestype === "Quotation"
    ).length;
    setQuotationNumber(quotationLength + 1);
  }, [allquotation]);

  const columns = [
    {
      selector: (row, index) => index + 1,
      name: "Sl.No",
    },
    {
      selector: (row) => row.QuotationDate,
      name: "Date",
      sort: true,
    },

    {
      selector: (row) => row.QuotationNumber,
      name: "Quotation Number",
      sort: true,
    },

    {
      selector: (row) => row.customername,
      name: "Customer Name",
      sort: true,
    },
    {
      name: "Rate",
      sort: true,
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
            onClick={() => handlerowedit(row)}
          ></i>
        </div>
      ),
    },
  ];

  const handlerowedit = (row) => {
    setModifyITems(true);
    setCategoryObjects(row);
  };

  useEffect(() => {
    getAllquotation();
  }, []);

  const getAllquotation = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9001/api/transaction/salesorder/getallquotation"
      );
      if (response.status === 200) {
        // console.log("Account Group=====>", response.data);
        setallquotation(response.data.quotationall.reverse());
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const filterdata = allquotation.filter(
    (item) =>
      (item.QuotationDate &&
        item.QuotationDate.toLowerCase().includes(
          searchquotation.toLowerCase()
        )) ||
      (item.customername &&
        item.customername.toLowerCase().includes(searchquotation.toLowerCase()))
  );

  const quotationsWithData = allquotation.map((quotation) => {
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

  const totalDiscountAmount = allquotation.reduce((acc, quotation) => {
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
  console.log("allcustomer", allitem);
  console.log("allquoitation", allquotation);

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
        setAllAccounts(response.data.allAccount);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const handleInputChanges = (e) => {
    console.log("customerName", e.target.value);
    const findAccount = allAccounts.find((item) => item._id === e.target.value);
    setCustomerAddress(findAccount);
    setcustomername(findAccount.accountName);
    setAddress(findAccount.address);
    setPhoneNumber(findAccount.mobileNo);
  };
  console.log("customerAddress", customerAddress);

  const addSalesItem = async () => {
    try {
      let config = {
        url: "/transaction/salesorder/addquotation",
        method: "post",
        baseURL: "http://localhost:9001/api",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          customername: customername,
          QuotationNumber: QuotationNumber,
          QuotationDate: QuotationDate,
          PaymentTerms: PaymentTerms,
          Address: Address,
          PhoneNumber: PhoneNumber,
          DeliveryMethod: DeliveryMethod,
          SalesPerson: SalesPerson,
          contactPersonMobileNumber: contactPerson,
          // additem: additem,
          // quantity: quantity,
          // rate: rate,
          // amount: amount,
          // discount: discount,
          itemDetails: itemDetails.map((item) => ({
            ...item,
            discountAmount: item.discountAmount || 0, // Make sure discountAmount is not undefined
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

  const editSalesItem = async () => {
    try {
      let config = {
        url: `/transaction/salesorder/editSalesorder/${categoryObjects._id}`,
        method: "put",
        baseURL: "http://localhost:9001/api",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          customername: customername,
          QuotationNumber: QuotationNumber,
          QuotationDate: QuotationDate,
          PaymentTerms: PaymentTerms,
          Address: Address,
          PhoneNumber: PhoneNumber,
          DeliveryMethod: DeliveryMethod,
          SalesPerson: SalesPerson,
          contactPersonMobileNumber: contactPerson,
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

  const [itemDetails, setitemDetails] = useState([
    {
      itemId: "",
      itemName: "",
      quantity: 0,
      rate: 0.0,
      discount: 0,
      discountAmount: 0,
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
      discountAmount: 0,
      markup: 0,
    };
    setitemDetails((prevTableSet) => [...prevTableSet, newRow]);
  };

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
        getAllquotation();
      }
    } catch (error) {
      console.warn(error);
    }
  };

  console.log("itemDetails", itemDetails);

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
        // oldstockinhand: updatedStockInHand,
      };

      return newTableSet;
    });
  };

  const handleQuantityChange = (e, index) => {
    const newQuantity = Number(e.target.value);
    console.log("newQuantity", newQuantity);
    const selectedItem = itemDetails[index];
    console.log("selectedItem", selectedItem);
    console.log("newQuantity", newQuantity);

    setitemDetails((prevTableSet) => {
      const newTableSet = [...prevTableSet];
      // const findOldStockInHand = parseInt(itemDetails[index].oldstockinhand);
      // const remainingStock = findOldStockInHand - newQuantity;
      newTableSet[index] = {
        ...newTableSet[index],
        quantity: newQuantity,
        // stockInHand: findOldStockInHand - parseInt(newQuantity),
        discountAmount: calculateFinalAmount(
          newTableSet[index].rate,
          newQuantity,
          newTableSet[index].discount,
          newTableSet[index].markup
        ),
      };
      console.log("Updated Table Set:", newTableSet);
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
          newDiscount,
          newTableSet[index].markup
          // newTableSet[index].tax // Pass tax value as well
        ),
      };
      return newTableSet;
    });
  };
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
  const calculateFinalAmount = (rate, quantity, discount, markup) => {
    const stringToQuantity = parseFloat(quantity);
    const stringToRate = parseFloat(rate);

    const baseAmount = stringToRate * stringToQuantity;

    const discountedAmount = baseAmount * (1 - Number(discount) / 100);

    const finalAmount = discountedAmount * (1 + Number(markup) / 100);

    return Number(Math.round(finalAmount.toFixed(2)));
  };

  return (
    <>
      {!item && !ModifyITems && (
        <>
          <div className="row mt-4  m-auto ">
            <div className="col-md-2 ">
              <h1>Quotations</h1>
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

                {/* <Dropdown className="cus   m-auto border1 bordernone  text-center">
                  <Dropdown.Toggle variant="warning">
                    <span>
                      <MoreVertIcon />
                    </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="p-2">
                    <Dropdown.Item
                      onClick={() => setModifyITems(true)}
                      className="list_inner"
                    >
                      Modify Item
                    </Dropdown.Item>
                    <Dropdown.Item className="list_inner">Delete</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown> */}
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
      {/*==============================Add New New Quotation======================================= */}
      {item && !ModifyITems && (
        <div className="container p-5">
          <p className="textbld f_20">New Quotation </p>
          <div className="row mt-5  ">
            <div className="col-md-8">
              <div className="row ">
                <div className="col-md-4">
                  <p className="colr-red textbld">Customer*</p>
                </div>
                <div className="col-md-8 mb-4">
                  {/* <Form.Control
                    placeholder="Customer name"
                    value={customername}
                    onChange={(e) => setcustomername(e.target.value)}
                  /> */}
                  <Form.Select
                    onChange={handleInputChanges}
                    // onChange={
                    //   (e) => setcustomername(e.target.value)
                    // }
                    // disabled={primaryGroup === "Yes"}
                  >
                    <option>---Select Customer Name---</option>
                    {allAccounts?.map((ele) => {
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
                  <p className="colr-red textbld">Quotation Number*</p>
                </div>
                <div className="col-md-8 mb-4">
                  <Form.Control
                    placeholder="Sales Quotation Number"
                    value={QuotationNumber}
                    readOnly
                    onChange={(e) => setQuotationNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="row ">
                <div className="col-md-4">
                  <p className="colr-red textbld">Quotation Date*</p>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    className=" m-auto mb-4"
                    sx={{ width: "100px" }}
                    // size="small"
                    type="date"
                    onChange={(e) => setQuotationDate(e.target.value)}
                    value={QuotationDate}
                  />{" "}
                </div>
              </div>
              <div className="row ">
                <div className="col-md-4">
                  <p className="textbld">Payment Terms</p>
                </div>
                <div className="col-md-8 mb-4">
                  <Form.Control
                    value={PaymentTerms}
                    onChange={(e) => setPaymentTerms(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <div className="d-flex">
                    <span className="colr-red  textbld">Address*</span>
                  </div>
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
              <div className="row">
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
              <div className="row">
                <div className="col-md-4">
                  <p className=" textbld">Contact Person Mobile</p>
                </div>

                <div className="col-md-8 mb-4">
                  <Form.Control
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
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
                <i
                  class="fa-solid fa-circle-plus"
                  style={{ color: "#188dfa" }}
                ></i>
                Add Row
              </button>
            </div>
            <div className="col-md-8 m-auto "></div>
            {/* <div className="col-md-2 text-end textbld bulkupload">
              Bulk Update
            </div> */}
          </div>
          <Table className="col-md-12">
            <thead>
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
                // console.log("Rendering index:", index);
                return (
                  <tr>
                    {/* {console.log("ele", ele)} */}
                    <td className="td_S m-auto th_C p-3">
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
                      {/* <select
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
                      </select> */}
                    </td>{" "}
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
                          width: "75%",
                        }}
                        value={ele.quantity}
                        onChange={(e) => handleQuantityChange(e, index)}
                      />
                    </td>
                    <td className="td_S m-auto th_C p-3">
                      <Form.Control
                        placeholder="Rate"
                        type="number"
                        readOnly
                        style={{
                          border: "1px solid #dee2e6",
                          padding: "11px",
                          outline: 0,
                          borderRadius: "8px",
                          width: "100px",
                        }}
                        value={ele.rate}
                        // onChange={(e) => handleRateChange(e, index)}
                      />
                    </td>
                    <td className="td_S m-auto th_C p-3">
                      <Form.Control
                        placeholder="discount"
                        type="number"
                        min={0}
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
                    {/* <td className="td_S m-auto th_C p-4">
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
                    </td> */}
                    <td className="td_S m-auto th_C p-3">
                      <Form.Control
                        placeholder="Markup"
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
                          // boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
                          border: "1px solid #dee2e6",
                          padding: "11px",
                          outline: 0,
                          borderRadius: "8px",
                          fontWeight: 700,
                          width: "100px",
                        }}
                      >
                        {
                          // (console.log(
                          //   "ele.rate, ele.quantity, ele.discount, ele.tax ",
                          //   ele.rate,
                          //   ele.quantity,
                          //   ele.discount,
                          //   ele.tax
                          // ),
                          calculateFinalAmount(
                            ele.rate,
                            ele.quantity,
                            ele.discount,
                            ele.markup
                          )
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
                  onClick={() => setItem(false)}
                >
                  Cancel
                </Button>{" "}
              </div>
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
      )}
      {/* edit================================= */}
      {!item && ModifyITems && (
        <div className="container p-5">
          <p className="textbld f_20">Edit Quotation </p>
          <div className="row mt-5  ">
            <div className="col-md-8">
              <div className="row ">
                <div className="col-md-4">
                  <p className="colr-red textbld">Customer*</p>
                </div>
                <div className="col-md-8 mb-4">
                  <Form.Select
                    onChange={(e) => setcustomername(e.target.value)}
                    value={customername || categoryObjects.customername}
                  >
                    <option>---Select Customer Name---</option>
                    {allAccounts?.map((ele) => (
                      <option value={ele._id}>{ele.accountName}</option>
                    ))}
                  </Form.Select>
                </div>
              </div>
              <div className="row ">
                <div className="col-md-4">
                  <p className="colr-red textbld">Quotation Number*</p>
                </div>
                <div className="col-md-8 mb-4">
                  <Form.Control
                    // placeholder="Sales Quotation Number"
                    onChange={(e) => setQuotationNumber(e.target.value)}
                    defaultValue={categoryObjects.QuotationNumber}
                  />
                </div>
              </div>
              <div className="row ">
                <div className="col-md-4">
                  <p className="colr-red textbld">Quotation Date*</p>
                </div>

                <TextField
                  className=" m-auto mb-4"
                  sx={{ width: "48ch" }}
                  size="small"
                  type="date"
                  onChange={(e) => setQuotationDate(e.target.value)}
                  defaultValue={categoryObjects.QuotationDate}
                />
              </div>
              <div className="row ">
                <div className="col-md-4">
                  <p className="textbld">Payment Terms</p>
                </div>
                <div className="col-md-8 mb-4">
                  <Form.Control
                    onChange={(e) => setPaymentTerms(e.target.value)}
                    defaultValue={categoryObjects.PaymentTerms}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <div className="d-flex">
                    <span className="colr-red  textbld">Address*</span>
                  </div>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-8 mb-4">
                  <Form.Control
                    onChange={(e) => setAddress(e.target.value)}
                    defaultValue={categoryObjects.Address}
                  />
                </div>
              </div>
              <div className="row ">
                <div className="col-md-4">
                  <p className="textbld">Phone Number</p>
                </div>
                <div className="col-md-8 mb-4">
                  <Form.Control
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    defaultValue={categoryObjects.PhoneNumber}
                  />
                </div>
              </div>
              <div className="row ">
                <div className="col-md-4">
                  <p className=" textbld">Delivery Method</p>
                </div>

                <div className="col-md-8 mb-4">
                  <Form.Control
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                    defaultValue={categoryObjects.DeliveryMethod}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <p className=" textbld">Sales Person</p>
                </div>

                <div className="col-md-8 mb-4">
                  <Form.Control
                    onChange={(e) => setSalesPerson(e.target.value)}
                    defaultValue={categoryObjects.SalesPerson}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <p className=" textbld">Contact Person Mobile</p>
                </div>

                <div className="col-md-8 mb-4">
                  <Form.Control
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
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
                onClick={editSalesItem}
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
                        // onChange={(e) => handleRateChange(e, index)}
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
                        // onChange={(e) => handleGstChange(e, index)}
                      />
                    </td>
                    <td className="td_S m-auto th_C p-4">
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
                        {
                          (console.log(
                            "ele.rate, ele.quantity, ele.discount, ele.tax ",
                            ele.rate,
                            ele.quantity,
                            ele.discount,
                            ele.tax
                          ),
                          calculateFinalAmount(
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
                    onClick={editSalesItem}
                  >
                    Done
                  </Button>{" "}
                  {/* </Link>{" "} */}
                </div>
                <Button
                  // onClick={() => setpullquotaion(false)}
                  className="col-md-5 textbld m-auto m-2"
                  variant="light"
                  onClick={() => setModifyITems(false)}
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

export default Quotations;
