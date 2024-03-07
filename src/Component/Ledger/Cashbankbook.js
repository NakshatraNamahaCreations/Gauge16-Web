import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/esm/Button";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import { TextField } from "@mui/material";

import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";

function Cashbankbook() {
  const [Salesorder, setSalesorder] = useState(false);
  const [allinvoice, setallinvoice] = useState([]);
  const [searchinvoice, setsearchinvoice] = useState("");

  const data = [
    {
      date: "2024-12-20",
      type: "purc",
      vch: "01",
      account: "Canara Bank",
      Debit: "Rs. 15,000",
      Credit: "Rs. 15,000",
      balance: "Rs. 10,000",
      shortnarraition: "Test NNC",
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
      selector: (row) => row.type,
      name: "Type",
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

    {
      selector: (row) => row.balance,
      name: "Balance (Rs. )",
      sort: true,
    },
    {
      selector: (row) => row.shortnarraition,
      name: "Short Narraition",
      sort: true,
    },
  ];

  return (
    <>
      <div className="row mt-4  m-auto ">
        <div className="col-md-4 m-auto ">
          <h4>Cash / Bank Book</h4>
        </div>
        <div className="col-md-4"></div>
        <div className="col-md-3 m-auto">
          <div className="d-flex ">
            <span className="me-2">
              <img width={30} height={30} src="../Images/sort.png" alt="" />
            </span>
          </div>
        </div>
      </div>

      <div className="row m-auto pt-4">
        <DataTable columns={columns} data={data} pagination />
      </div>
    </>
  );
}
export default Cashbankbook;
