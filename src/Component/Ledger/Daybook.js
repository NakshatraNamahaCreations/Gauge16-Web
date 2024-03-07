import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/esm/Button";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import { TextField } from "@mui/material";

import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";

function Daybook() {
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

  const data = [
    {
      date: "2024-12-20",
      type: "purc",
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
  ];

  return (
    <>
      <div className="row mt-4  m-auto ">
        <div className="col-md-4 m-auto ">
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
      <div className="row m-auto pt-4">
        <DataTable columns={columns} data={data} pagination />
      </div>
    </>
  );
}
export default Daybook;
