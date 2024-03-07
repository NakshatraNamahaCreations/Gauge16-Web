import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/esm/Button";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import { TextField } from "@mui/material";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";

function Displaycashbalance() {
  const [Salesorder, setSalesorder] = useState(false);
  const [allinvoice, setallinvoice] = useState([]);
  const [searchinvoice, setsearchinvoice] = useState("");

  const data = [
    {
      particulars: "2024-12-20",
      type: "purc",
      CashAmount: "01",
      amount: "Canara Bank",
      receipt: "Rs. 15,000",
    },
  ];

  const columns = [
    {
      selector: (row, index) => index + 1,
      name: "Sl.No",
    },
    {
      selector: (row) => row.particulars,
      name: "Particulars",
      sort: true,
    },
    {
      selector: (row) => row.type,
      name: "Type",
      sort: true,
    },

    {
      selector: (row) => row.CashAmount,
      name: "Cash Amount",
      sort: true,
    },

    {
      selector: (row) => row.amount,
      name: "Amount",
      sort: true,
    },
    {
      selector: (row) => row.receipt,
      name: "Receipt",
      sort: true,
    },
  ];

  return (
    <>
      <div className="row mt-4  m-auto">
        <div className="col-md-4 m-auto">
          <h4>Day Book</h4>
        </div>
        <div className="col-md-4"></div>
        <div className="col-md-3 m-auto">
          <div className="d-flex ">
            <span className="me-2">
              <img width={30} height={30} src="../Images/sort.png" alt="" />
            </span>

            <Dropdown className="m-0 border1 bordernone  text-center">
              <Dropdown.Toggle className="bgcolr bordernone">
                <span>Cash Balance</span>
              </Dropdown.Toggle>

              <Dropdown.Menu className="p-4">
                <Dropdown.Item
                  href="/invoicepullformquotation"
                  className="list_inner"
                >
                  Not Showing Cash Balance
                </Dropdown.Item>
                <Dropdown.Item
                  href="/displaycashbalance"
                  // onClick={() => setDirectSale(true)}
                  className="list_inner"
                >
                  Displaying Cash Balance
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
      {/* <div className="row mt-3 m-auto">
        <div className="col-md-4 ">
          <Form.Control
            className="col-md-4 mb-3"
            placeholder="Search Customer Name Date..."
            type="text"
            onChange={(e) => setsearchinvoice(e.target.value)}
          />
        </div>

        <div className="col-md-8"></div>
      </div> */}
      <div className="row m-auto pt-4">
        <DataTable columns={columns} data={data} pagination />
      </div>
    </>
  );
}
export default Displaycashbalance;
