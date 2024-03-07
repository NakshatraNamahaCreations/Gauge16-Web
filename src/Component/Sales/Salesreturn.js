import React, { useEffect, useState, useCallback } from "react";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/esm/Button";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { TextField } from "@mui/material";
import { Form, Table } from "react-bootstrap";
import axios from "axios";

function Salesreturn() {
  const [item, setItem] = useState(false);
  const [ModifyITems, setModifyITems] = useState(false);
  const [deliverychallanNumber, setdeliverychallanNumber] = useState(1);
  const [deliverychallanDate, setdeliverychallanDate] = useState("");
  const [vchno, setvchno] = useState("");
  const [challantype, setchallantype] = useState("");
  const [salestype, setsalestype] = useState("");
  const [series, setseries] = useState("");
  const [allSalesRetrun, setAllSalesreturn] = useState([]);
  const [searchsalesreturn, setsearchsalesreturn] = useState("");
  const [salesOrderNumber, setSalesOrderNumber] = useState(null);
  const [searchResultsOfSalesOrder, setsearchResultsOfSalesOrder] = useState(
    []
  );
  const [selectedRows, setSelectedRows] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [returnAmount, setReturnAmount] = useState(0);
  const [quantityOfReturns, setQuantityOfReturns] = useState({});
  const [ShowRemaning, setShowRemaning] = useState(false);
  const [totalAmount, setTotalAmount] = useState({});
  const [selectedRowsOrder, setSelectedRowsOrder] = useState([]);
  const [reasons, setReasons] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);

  const handleReasonChange = (e, row) => {
    const updatedReasons = { ...reasons, [row.itemId]: e.target.value };
    setReasons(updatedReasons);

    const updatedSelectedRows = selectedRows.map((selectedRow) => {
      if (selectedRow.itemId === row.itemId) {
        return {
          ...selectedRow,
          reason: e.target.value,
        };
      }
      return selectedRow;
    });

    setSelectedRows(updatedSelectedRows);
  };

  const handleItemSelect = (item) => {
    if (
      !selectedItems.some((selectedItem) => selectedItem.itemId === item.itemId)
    ) {
      setSelectedItems([...selectedItems, item]);
    } else {
      // Deselect item if already selected
      setSelectedItems(
        selectedItems.filter(
          (selectedItem) => selectedItem.itemId !== item.itemId
        )
      );
    }
  };

  const submitRequest = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9001/api/transaction/salesorder/searchsalesordernumber",
        {
          salesorderNumber: salesOrderNumber,
          salestype: "Sales",
        }
      );
      if (response.status === 200) {
        setsearchResultsOfSalesOrder(response.data.salesorder);
        setShowRemaning(true);
      }
    } catch (error) {
      console.error("Error searching quotations:", error);
      alert(error.response.data.message || "Internal Server Error");
    }
  };
  console.log("searchResultsOfSalesOrder objects", searchResultsOfSalesOrder);

  useEffect(() => {
    getAllreturnsales();
  }, []);

  const getAllreturnsales = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9001/api/transaction/return/getAllsalesreturn"
      );
      if (response.status === 200) {
        setAllSalesreturn(response.data.allchallan);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  console.log("allSalesRetrun", allSalesRetrun);
  useEffect(() => {
    const saleReturnNumber = allSalesRetrun.length + 1;
    setdeliverychallanNumber(saleReturnNumber);
  }, [allSalesRetrun]);

  const filterdata = allSalesRetrun.filter(
    (item) =>
      (item.salesreturnDate &&
        item.salesreturnDate
          .toLowerCase()
          .includes(searchsalesreturn.toLowerCase())) ||
      (item.customername[0]?.firstName &&
        item.customername[0]?.firstName
          .toLowerCase()
          .includes(searchsalesreturn.toLowerCase()))
  );

  const columns = [
    {
      selector: (row, index) => index + 1,
      name: "Sl.No",
    },
    {
      selector: (row) => row.salesreturnDate,
      name: "Date",
      sort: true,
    },
    {
      selector: (row) => row.salesreturnNumber,
      name: "Sales Return Number",
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
              return itemTotal + parseFloat(item.returnAmount || 0);
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
            onClick={() => deletesalesreturn(row)}
            style={{ color: "red", cursor: "pointer" }}
          ></i>
          <i
            title="Edit"
            class="fa-regular fa-pen-to-square ms-2"
            style={{ cursor: "pointer" }}
          ></i>
        </div>
      ),
    },
  ];

  const itemDetailsColumn = [
    {
      name: "Items Details",
      sort: true,
      selector: (row) => <div>{row.itemName}</div>,
    },

    {
      name: "Quantity",
      sort: true,
      selector: (row) => (
        <div>
          <input
            className="p-2"
            style={{ width: "100px" }}
            type="number"
            min={0}
            max={row.quantity}
            value={quantity[row.itemId] || 0}
            onChange={(e) => handleQuantityChanges(e, row)}
          />
        </div>
      ),
    },

    {
      name: "Selling Rate",
      sort: true,
      selector: (row) => <div>{row.rate || 0}</div>,
    },
    {
      name: "Sale Order Amount",
      sort: true,
      selector: (row) => <div>{row.discountAmount || 0}</div>,
    },
    {
      name: "Return Amount",
      sort: true,
      selector: (row) => <div>{calculateReturnAmount(row.itemId)}</div>,
    },

    {
      name: "Reason For Returing",
      sort: true,
      selector: (row) => (
        <div className="p-2">
          <textarea
            className="p-2"
            type="text"
            style={{ width: "100%" }}
            value={reasons[row.itemId] || ""}
            onChange={(e) => handleReasonChange(e, row)}
          />
        </div>
      ),
    },
  ];
  const [initialQuantity, setInitialQuantity] = useState({});

  useEffect(() => {
    const initialQuantities = {};
    searchResultsOfSalesOrder.itemDetails?.forEach((item) => {
      initialQuantities[item.itemId] = item.quantity;
    });
    setInitialQuantity(initialQuantities);
  }, [searchResultsOfSalesOrder.itemDetails]);

  const calculateReturnAmount = (itemId) => {
    // console.log(returnAmount, "itemId========");
    const returnAmountValue =
      returnAmount[itemId] !== undefined ? returnAmount[itemId] : 0;
    return returnAmountValue !== undefined ? returnAmountValue : 0;
  };

  const handleRowSelected = (currentRowsSelected) => {
    const selectedRowsObject = currentRowsSelected.selectedRows?.map((row) => {
      const itemId = row.itemId;
      const selectedQuantity = quantity[itemId] || 0;
      const quantityOfReturns =
        typeof selectedQuantity === "object"
          ? Object.values(selectedQuantity)[0]
          : selectedQuantity;

      const updatedStockInHand =
        row.stockInHand + parseInt(quantityOfReturns, 10) || 0;

      return {
        ...row,
        quantityOfReturns: quantityOfReturns || 0,
        returnAmount: returnAmount[itemId],
        stockInHand: updatedStockInHand,
        oldstockinhand: row.stockInHand,
      };
    });

    setSelectedRows(selectedRowsObject);
  };

  console.log("selected Row", JSON.stringify(selectedRows, null, 2));

  const handleQuantityChanges = (e, row) => {
    const enteredQuantity = parseInt(e.target.value, 10) || 0;

    const updatedQuantity = { ...quantity, [row.itemId]: enteredQuantity };
    setQuantity(updatedQuantity);

    const rate = row.rate || 0;
    const calculatedAmount = parseFloat(enteredQuantity * rate);
    const discountAmount = parseFloat(row.discountAmount) || 0;
    const returnAmountValue = Math.round(discountAmount - calculatedAmount);
    const stockInHand =
      row.stockInHand !== null && row.stockInHand !== undefined
        ? parseInt(row.stockInHand)
        : 0;

    const updatedStockInHand =
      stockInHand + enteredQuantity + (row.quantityOfReturns || 0);

    const updatedSelectedRows = selectedRows.map((selectedRow) => {
      if (selectedRow.itemId === row.itemId) {
        return {
          ...selectedRow,
          stockInHand: updatedStockInHand,
          quantityOfReturns: enteredQuantity,
          returnAmount: returnAmountValue,
        };
      }
      return selectedRow;
    });
    setReturnAmount((prevReturnAmount) => ({
      ...prevReturnAmount,
      [row.itemId]: returnAmountValue,
    }));
    setSelectedRows(updatedSelectedRows);
  };

  const addsalesreturn = async () => {
    try {
      let config = {
        url: "/transaction/return/addsalesreturn",
        method: "post",
        baseURL: "http://localhost:9001/api",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          customername: searchResultsOfSalesOrder.customername,
          salesreturnNumber: deliverychallanNumber,
          salesreturnDate: deliverychallanDate,
          vchno: vchno,
          challantype: challantype,
          salestype: salestype,
          itemDetails: selectedRows,
          series: series,
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

  const deletesalesreturn = async (data) => {
    try {
      const res = await axios.delete(
        `http://localhost:9001/api/transaction/return/deletesalesreturn/${data._id}`
      );

      if (res.status === 200) {
        console.log(res.data);
        alert(res.data.message);
        getAllreturnsales();
      }
    } catch (error) {
      console.log("Error", error);
      alert("Cannot perform the operation");
    }
  };

  return (
    <>
      {!item && !ModifyITems && (
        <>
          <div className="row mt-4  m-auto ">
            <div className="col-md-2 ">
              <h4>Sales Return</h4>
            </div>
            <div className="col-md-7"></div>
            <div className="col-md-3">
              <div className="d-flex">
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
                placeholder="Search Date Customer Name..."
                type="text"
                onChange={(e) => setsearchsalesreturn(e.target.value)}
              />
            </div>
            <div className="col-md-6 "></div>
          </div>
          <div className="row m-auto">
            <DataTable
              columns={columns}
              data={filterdata.reverse()}
              pagination
            />
          </div>
        </>
      )}
      {item && !ModifyITems && (
        <div className="container p-5">
          <p className="textbld f_20">New Sales return </p>
          <div className="row mt-5  ">
            <div className="col-md-8">
              <div className="row ">
                <div className="col-md-4">
                  <p className="colr-red textbld">Sales Order Number*</p>
                </div>
                <div className="col-md-8 mb-4 d-flex">
                  <Form.Control
                    placeholder="Sales Order Number"
                    onChange={(e) => setSalesOrderNumber(e.target.value)}
                  />
                  <Button className="ms-2" onClick={submitRequest}>
                    Submit
                  </Button>
                </div>
              </div>
              {ShowRemaning ? (
                <>
                  <div className="row ">
                    <div className="col-md-4">
                      <p className="colr-red textbld">Customer Name*</p>
                    </div>
                    <div className="col-md-8 mb-4">
                      <Form.Control
                        value={searchResultsOfSalesOrder.customername}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-4">
                      <p className="colr-red textbld">Sales Return Number*</p>
                    </div>
                    <div className="col-md-8 mb-4">
                      <Form.Control
                        value={deliverychallanNumber}
                        onChange={(e) =>
                          setdeliverychallanNumber(e.target.value)
                        }
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <p className="colr-red textbld">Sales Return Date*</p>
                    </div>

                    <div className="col-md-8 mb-4">
                      <Form.Control
                        type="date"
                        onChange={(e) => setdeliverychallanDate(e.target.value)}
                        value={deliverychallanDate}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <p className="textbld colr-red">Vch No *</p>
                    </div>
                    <div className="col-md-8 mb-4">
                      <Form.Control
                        onChange={(e) => setvchno(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <p className="textbld colr-red">Series *</p>
                    </div>
                    <div className="col-md-8 mb-4">
                      <Form.Control
                        onChange={(e) => setseries(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <p className="textbld colr-red">Challan Type *</p>
                    </div>
                    <div className="col-md-8 mb-4">
                      <Form.Control
                        onChange={(e) => setchallantype(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-4">
                      <p className=" textbld colr-red">Sales Type *</p>
                    </div>

                    <div className="col-md-8 mb-4">
                      <Form.Control
                        onChange={(e) => setsalestype(e.target.value)}
                      />
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          {ShowRemaning ? (
            <>
              <DataTable
                columns={itemDetailsColumn}
                data={searchResultsOfSalesOrder.itemDetails}
                pagination
                selectableRows={true}
                selectableRowsVisible={true}
                onSelectedRowsChange={handleRowSelected}
              />
              <div className="row  ">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <div className="row">
                    <div className="col-md-5">
                      <Button
                        className=" textbld m-auto m-2 bg_color"
                        onClick={addsalesreturn}
                      >
                        Done
                      </Button>
                    </div>
                    <Button
                      className="col-md-5 textbld m-auto m-2"
                      variant="light"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
                <div className="col-md-4"></div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
}

export default Salesreturn;
