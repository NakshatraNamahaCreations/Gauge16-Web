import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";

function Salesorder() {
  const [allsalesorder, setallsalesorder] = useState([]);
  const [searchsalesorder, setsearchsalesorder] = useState("");

  useEffect(() => {
    getallsalesorder();
  }, []);

  const getallsalesorder = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9001/api/transaction/salesorder/getallsalesorder"
      );
      if (response.status === 200) {
        console.log("allsalesorder=====>", response.data);
        setallsalesorder(response.data.salesorder.reverse());
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const filterdata = allsalesorder.filter(
    (item) =>
      (item.salesorderDate &&
        item.salesorderDate
          .toLowerCase()
          .includes(searchsalesorder.toLowerCase())) ||
      (item.customername &&
        item.customername
          .toLowerCase()
          .includes(searchsalesorder.toLowerCase()))
  );

  const quotationsWithData = allsalesorder.map((quotation) => {
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

  const totalDiscountAmount = allsalesorder.reduce((acc, quotation) => {
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

  // console.log("totalDiscountAmount", roundedTotalDiscountAmount);

  const deletegroupitem = async (data) => {
    try {
      const res = await axios.delete(
        `http://localhost:9001/api/transaction/salesorder/deletesalesorder/${data._id}`
      );

      if (res.status === 200) {
        console.log(res.data);
        alert(res.data.message);
        getallsalesorder();
      }
    } catch (error) {
      console.log("Error", error);
      alert("Cannot perform the operation");
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
      name: "Sales Order Number",
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

        // const roundedTotalDiscountAmountForRow = Math.round(
        //   totalDiscountAmountForRow
        // );

        return totalDiscountAmountForRow.toFixed(2);
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
            onClick={() => deletegroupitem(row)}
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
          <h4>Sales Order</h4>
        </div>
        <div className="col-md-4"></div>
        <div className="col-md-3 m-auto">
          <div className="d-flex ">
            <Dropdown className="m-0 border1 bordernone  text-center">
              <Dropdown.Toggle className="bgcolr bordernone">
                <span>Select Types Of Sales Order</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="px-4">
                <Dropdown.Item href="/pullformquotation" className="list_inner">
                  Pull From Quotation
                </Dropdown.Item>
                <Dropdown.Item href="/directsales" className="list_inner">
                  Direct Sales Order
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>

      <div className="row mt-3 m-auto">
        <div className="col-md-4 ">
          <Form.Control
            className="col-md-4 mb-3"
            placeholder="Search Date Customer Name..."
            type="text"
            onChange={(e) => setsearchsalesorder(e.target.value)}
          />
        </div>

        <div className="col-md-8"></div>
      </div>
      <div className="row m-auto">
        <DataTable columns={columns} data={filterdata} pagination />
      </div>
    </>
  );
}
export default Salesorder;
