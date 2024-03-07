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

function Receipt() {
  const [item, setItem] = useState(false);
  const [ModifyITems, setModifyITems] = useState(false);
  const handleRowSelected = (rows) => {
    console.log("Selected Rows:", rows);
  };

  const handleRowClicked = (row) => {
    console.log("Clicked Row:", row);
  };

  const data = [
    {
      date: "2024-12-20",
      vch: "01",
      account: "Canara Bank",
      Debit: "Rs. 15,000",
      Credit: "Rs. 15,000",
    },
  ];

  const columns = [
    {
      selector: (row, index) => index + 1,
      name: "Sl.No",
    },
    {
      selector: (row) => row.date,
      name: "Date",
      sort: true,
    },

    {
      selector: (row) => row.vch,
      name: "Vch / Bill  No.",
      sort: true,
    },

    {
      selector: (row) => row.account,
      name: "Account",
      sort: true,
    },
    {
      selector: (row) => row.Debit,
      name: "Debit (Rs. )",
      sort: true,
    },
    {
      selector: (row) => row.Credit,
      name: "Credit (Rs. )",
      sort: true,
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

  const [customername, setcustomername] = useState("");
  const [QuotationNumber, setQuotationNumber] = useState("");
  const [QuotationDate, setQuotationDate] = useState("");
  const [PaymentTerms, setPaymentTerms] = useState("");
  const [Address, setAddress] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [DeliveryMethod, setDeliveryMethod] = useState("");
  const [SalesPerson, setSalesPerson] = useState("");
  const [additem, setadditem] = useState("");
  const [quantity, setquantity] = useState("1");
  const [rate, setrate] = useState("0.00");
  const [amount, setamount] = useState("0");
  const [discount, setdiscount] = useState("0");
  const [allItems, setAllItems] = useState([]);
  const [totalamount, settotalamount] = useState("");
  const [allquotation, setallquotation] = useState([]);
  const [allitem, setallitem] = useState([]);
  const [allcustomer, setallcustomer] = useState([]);
  const [searchquotation, setsearchquotation] = useState("");

  useEffect(() => {
    getAllquotation();
  }, []);

  useEffect(() => {
    getAllcustomer();
  }, []);

  const getAllquotation = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9001/api/transaction/salesorder/getallquotation"
      );
      if (response.status === 200) {
        console.log("Account Group=====>", response.data);
        setallquotation(response.data.quotationall);
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

  console.log("allquoitation", allquotation);

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
          // additem: additem,
          // quantity: quantity,
          // rate: rate,
          // amount: amount,
          // discount: discount,
          itemDetails: itemDetails,
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

  const handleChangeAccordian1 = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
    setExpanded(!expanded);
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

  const deletequotation = async (data) => {
    try {
      const response = await axios.delete(
        `http://localhost:9001/api/transaction/salesorder/deletesalesorder/${data._id}`
      );
      if (response.status === 200) {
        console.log(response.data);
        alert("Deleted Suceessfully");
        getAllquotation();
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <>
      {!item && !ModifyITems && (
        <>
          <div className="row mt-4  m-auto ">
            <div className="col-md-2 ">
              <h1>Reciept</h1>
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
                placeholder="Search Date..."
                type="text"
                // onChange={(e) => setsearchquotation(e.target.value)}
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
            <DataTable columns={columns} data={data} pagination />
          </div>
        </>
      )}
      {item && !ModifyITems && (
        <div className="container p-5">
          <p className="textbld f_20">Payments</p>
          <div className="row mt-5  ">
            <div className="col-md-8">
              <div className="row ">
                <div className="col-md-4">
                  <p className="colr-red textbld">Date*</p>
                </div>

                <TextField
                  className=" m-auto mb-4"
                  sx={{ width: "48ch" }}
                  size="small"
                  type="date"
                  //   onChange={(e) => setQuotationDate(e.target.value)}
                />
              </div>
              <div className="row ">
                <div className="col-md-4">
                  <p className="textbld colr-red">Vch No *</p>
                </div>
                <div className="col-md-8 mb-4">
                  <Form.Control
                    value={PaymentTerms}
                    // onChange={(e) => setPaymentTerms(e.target.value)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-3">
                  <div className="d-flex">
                    <span className="colr-red  textbld">Series *</span>
                  </div>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-8 mb-4">
                  <Form.Control
                  // value={Address}
                  // onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-5">
                  <Button
                    className=" textbld m-auto m-2 bg_color"
                    onClick={addSalesItem}
                  >
                    Done
                  </Button>
                </div>
                <Button className="col-md-5 textbld m-auto m-2" variant="light">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Receipt;
