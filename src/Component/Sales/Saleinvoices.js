import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/esm/Button";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import { TextField } from "@mui/material";

import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";

function Saleinvoices() {
  const [Salesorder, setSalesorder] = useState(false);
  const [allinvoice, setallinvoice] = useState([]);
  const [searchinvoice, setsearchinvoice] = useState("");

  useEffect(() => {
    getallsalesorder();
  }, []);

  const getallsalesorder = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9001/api/transaction/salesorder/getallinvoice"
      );
      if (response.status === 200) {
        console.log("Account Group=====>", response.data);
        setallinvoice(response.data.invoiceall);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  console.log("allinvoice====", allinvoice);

  const filterdata = allinvoice.filter(
    (item) =>
      (item.Invoicedate &&
        item.Invoicedate.toLowerCase().includes(searchinvoice.toLowerCase())) ||
      (item.customername &&
        item.customername.toLowerCase().includes(searchinvoice.toLowerCase()))
  );

  const handleRowSelected = (rows) => {
    console.log("Selected Rows:", rows);
  };

  const handleRowClicked = (row) => {
    console.log("Clicked Row:", row);
  };

  const quotationsWithData = allinvoice.map((quotation) => {
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

  const totalDiscountAmount = allinvoice.reduce((acc, quotation) => {
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

  const roundedTotalDiscountAmount = Math.round(totalDiscountAmount);

  console.log("totalDiscountAmount", roundedTotalDiscountAmount);

  const deletesalesinvoice = async (data) => {
    try {
      const response = await axios.delete(
        `http://localhost:9001/api/transaction/salesorder/deletesalesorder/${data._id}`
      );
      if (response.status === 200) {
        console.log(response.data);
        alert("Deleted Suceessfully");
        // window.location.reload();
        getallsalesorder();
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
      selector: (row) => row.salesorderDate,
      name: "Date",
      sort: true,
    },

    {
      selector: (row) => row.salesorderNumber,
      name: "Invoice Number",
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
            onClick={() => deletesalesinvoice(row)}
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

  return (
    <>
      <div className="row mt-4  m-auto ">
        <div className="col-md-4 m-auto ">
          <h4>Sales Invoices</h4>
        </div>
        <div className="col-md-4"></div>
        <div className="col-md-3 m-auto">
          <div className="d-flex ">
            <span className="me-2">
              <img width={30} height={30} src="../Images/sort.png" alt="" />
            </span>

            <Dropdown className="m-0 border1 bordernone  text-center">
              <Dropdown.Toggle className="bgcolr bordernone">
                <span>Select Types Of Sales Order</span>
              </Dropdown.Toggle>

              <Dropdown.Menu className="p-4">
                <Dropdown.Item
                  href="/invoicepullformquotation"
                  className="list_inner"
                >
                  Pull From Quotation
                </Dropdown.Item>
                <Dropdown.Item
                  href="/salesinvoice"
                  // onClick={() => setDirectSale(true)}
                  className="list_inner"
                >
                  Direct Sales Invoice
                </Dropdown.Item>
                <Dropdown.Item className="list_inner">Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>

      <div className="row mt-3 m-auto">
        <div className="col-md-4 ">
          <Form.Control
            className="col-md-4 mb-3"
            placeholder="Search Customer Name Date..."
            type="text"
            onChange={(e) => setsearchinvoice(e.target.value)}
          />
        </div>

        <div className="col-md-8"></div>
      </div>
      <div className="row m-auto">
        <DataTable columns={columns} data={filterdata.reverse()} pagination />
      </div>
    </>
  );
}
export default Saleinvoices;
