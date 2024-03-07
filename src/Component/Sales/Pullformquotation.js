import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import { InputAdornment, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import { Table } from "react-bootstrap";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import axios from "axios";

function Pullformquotation() {
  const [pullquotaion, setpullquotaion] = useState(false);
  const [EditQuotationNumber, setEditQuotationNumber] = useState("Q0-002");
  const [EditQuotationDate, setEditQuotationDate] = useState("11/15/2023");
  const [ModifyCustomer, setModifyCustomer] = useState("Nike");

  const [QuotationNumber, setQuotationNumber] = useState("");
  const [QuotationDate, setQuotationDate] = useState("");
  const [quotations, setQuotations] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const [customername, setcustomername] = useState("");
  const [salesorderNumber, setsalesorderNumber] = useState("");
  const [salesorderDate, setsalesorderDate] = useState("");
  const [PaymentTerms, setPaymentTerms] = useState("");
  const [Address, setAddress] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [DeliveryMethod, setDeliveryMethod] = useState("");
  const [SalesPerson, setSalesPerson] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9001/api/transaction/salesorder/filterquotation",
        {
          QuotationNumber,
          QuotationDate,
        }
      );
      if (response.status === 200) {
        // console.log("retrived qoutation data", response.data.quotations);
        setQuotations(response.data.quotations);
        setpullquotaion(true);
      }
    } catch (error) {
      console.error("Error searching quotations:", error);
      alert(error.response.data.message || "Internal Server Error");
    }
  };

  const editSalesItem = async () => {
    try {
      let config = {
        url: `/transaction/salesorder/editSalesorder/${quotations._id}`,
        method: "put",
        baseURL: "http://localhost:9001/api",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          customername: customername,
          salesorderNumber: salesorderNumber,
          salesorderDate: salesorderDate,
          PaymentTerms: PaymentTerms,
          Address: Address,
          PhoneNumber: PhoneNumber,
          DeliveryMethod: DeliveryMethod,
          SalesPerson: SalesPerson,
          // itemDetails: itemDetails,
          salestype: "Sales",
        },
      };
      let response = await axios(config);
      if (response.status === 200) {
        alert("added successfully");
        window.location.assign("/salesorder");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log("quotations", quotations);

  // const discountAmount =
  //   Math.round(data.discountAmount * 100) / 100;
  return (
    <>
      {/*====================== search quotatioon ================ */}
      {!pullquotaion ? (
        <div className="container p-4">
          <h2 className="textbld  mt-3 ">Modify Sales Order</h2>
          <div className="d-flex" style={{ justifyContent: "center" }}>
            <Box
              className="col-md-6 text-center mb-4"
              sx={{
                // boxShadow: 1,
                borderRadius: 4,
                p: 4,
                backgroundColor: "antiquewhite",
              }}
            >
              <p className="textbld">
                Please provide the quotation number for which you wish create a
                sales order
              </p>
              <div className="row mb-3">
                <div className="col-md-5 ">
                  <p className="textbld colr-red">Quotation Number*</p>
                </div>

                <div className="col-md-7 ">
                  <Form.Control
                    value={QuotationNumber}
                    onChange={(e) => setQuotationNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-5">
                  <p className="textbld ">Quotation Date</p>
                </div>
                <div className="col-md-7 ">
                  <Form.Control
                    value={QuotationDate}
                    onChange={(e) => setQuotationDate(e.target.value)}
                  />
                </div>
              </div>
            </Box>
          </div>

          <div className="row mb-4  m-auto">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <div className="row">
                <Button
                  // onClick={() => setpullquotaion(true)}
                  onClick={handleSearch}
                  className="col-md-5 textbld m-auto m-2 bg_color"
                >
                  Done
                </Button>
                <Button className="col-md-5 textbld m-auto m-2" variant="light">
                  <Link className="anchore_Tag bordernone" to="/salesorder">
                    Cancel
                  </Link>
                </Button>{" "}
              </div>
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
      ) : (
        // ======================openming after Quotation Number and date search========================
        <div className="container p-5">
          <p className="textbld f_20">Modify Sales Order </p>
          <div className="row mt-5  ">
            <div className="col-md-9">
              <div className="row ">
                <div className="col-md-4">
                  <p className="colr-red  textbld">Quotation Number*</p>
                </div>

                <div className="col-md-8 mb-4">
                  <Form.Control
                    value={quotations.QuotationNumber}
                    onChange={(e) => setEditQuotationNumber(e.target.value)}
                    readOnly
                  />
                </div>
              </div>
              <div className="row ">
                <div className="col-md-4">
                  <p className=" textbld">Quotation Date</p>
                </div>
                <div className="col-md-8 mb-4">
                  <Form.Control
                    className=" m-auto mb-4"
                    type="date"
                    value={quotations.QuotationDate}
                    onChange={(e) => setQuotationDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="row ">
                <div className="col-md-4">
                  <p className="colr-red textbld">Customer*</p>
                </div>
                <div className="col-md-8 mb-4">
                  <Form.Control
                    defaultValue={quotations.customername}
                    onChange={(e) => setcustomername(e.target.value)}
                  />
                </div>
              </div>
              <div className="row ">
                <div className="col-md-4">
                  <p className="colr-red textbld">Sales Order Number*</p>
                </div>

                <div className="col-md-8 mb-4">
                  <Form.Control
                    //  defaultValue={QuotationNumber.customername}
                    onChange={(e) => setsalesorderNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="row ">
                <div className="col-md-4">
                  <p className="colr-red textbld">Sales Order Date*</p>
                </div>

                <div className="col-md-8 mb-4">
                  <Form.Control
                    // defaultValue={Quo}
                    type="date"
                    onChange={(e) => setsalesorderDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="row ">
                <div className="col-md-4">
                  <p className="textbld">Payment Terms</p>
                </div>
                <div className="col-md-8 mb-4">
                  <Form.Control
                    defaultValue={quotations.PaymentTerms}
                    onChange={(e) => setPaymentTerms(e.target.value)}
                  />
                </div>
              </div>
              <div className="row ">
                <div className="col-md-2">
                  <div className="d-flex">Address*</div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4"></div>

                <div className="col-md-8 mb-4">
                  <Form.Control
                    as="textarea"
                    defaultValue={quotations.Address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
              <div className="row ">
                <div className="col-md-4">
                  <p className=" textbld">Delivery Method</p>
                </div>

                <div className="col-md-8 mb-4">
                  <Form.Control
                    defaultValue={quotations.DeliveryMethod}
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
                    defaultValue={quotations.SalesPerson}
                    onChange={(e) => setSalesPerson(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row  ">
            <div className="col-md-12 mb-2  ">
              <div className="row ">
                <div className="col-md-10 m-auto "></div>
                <div className="col-md-2 text-end textbld bulkupload">
                  Bulk Update
                </div>
              </div>
            </div>
            <Table className="col-md-12">
              <thead>
                <th className="td_S th_C p-2">Items Details</th>
                <th className="td_S th_C p-2">Quantity</th>
                <th className="td_S th_C p-2">Rate</th>
                <th className="td_S th_C p-2">Discount</th>
                <th className="td_S th_C p-2">Amount</th>
              </thead>
              <tbody>
                {quotations.itemDetails.map((data) => (
                  <tr>
                    <td className="td_S m-auto ">
                      {/* <div className="row "> */}
                      {/* <div className="col-md-2 ">
                      <img
                        className="product_img x"
                        src="../Images/cermaiccups.avif"
                        alt=""
                        width={60}
                        height={60}
                      />{" "}
                    </div> */}
                      {/* <div className="col-md-8 "> */}
                      {/* <p className="textbld"> */}
                      {data.itemName}
                      {/* </p> */}
                      {/* <p>SKU : 003</p>
                      <p>Sales Description:</p> */}
                      {/* </div> */}
                      {/* </div> */}
                    </td>
                    <td className="td_S m-auto th_C">
                      {/* 100.00/pcs */}
                      {data.quantity}
                      {/* <div className="row mt-5  m-auto">
                    <FormControl
                      // sx={{ width: "15ch" }}
                      size="small"
                      // InputProps={{
                      //   endAdornment: (
                      //     <InputAdornment position="end">unit</InputAdornment>
                      //   ),
                      // }}
                    >
                      <InputLabel>Convert to:</InputLabel>
                      <Select
                        className="mt-3 "
                        value={unitTo}
                        onChange={handleDropdownToggle3}
                      >
                        <MenuItem value={"Kg"}>Kg</MenuItem>
                        <MenuItem value={"Pieces"}>Pieces</MenuItem>
                        <MenuItem value={"Dozen"}>Dozen</MenuItem>
                      </Select>
                    </FormControl>
                  </div> */}
                    </td>
                    <td className="td_S m-auto th_C">{data.rate}</td>
                    <td className="td_S m-auto th_C">{data.discount}</td>
                    <td className="td_S m-auto th_C">
                      {data.discountAmount}
                      {/* {discountAmount} */}
                      {/* <div className="row   mt-5">
                    <p className="col-md-4 m-auto">
                      <OverlayTrigger
                        placement="top"
                        trigger="hover"
                        overlay={<Tooltip color="white">clone</Tooltip>}
                      >
                        <ContentCopyIcon />
                      </OverlayTrigger>
                    </p>
                    <p className="col-md-4 m-auto">
                      <HighlightOffIcon className="colr-red" />
                    </p>{" "}
                  </div> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>{" "}
          </div>
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
                  onClick={() => window.location.assign("/salesorder")}
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
export default Pullformquotation;
