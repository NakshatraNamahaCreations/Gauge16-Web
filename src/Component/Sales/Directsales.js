// import React, { useEffect, useState } from "react";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/esm/Button";
// import { Link } from "react-router-dom";
// import { Modal, Table } from "react-bootstrap";
// import axios from "axios";
// function DirectSales() {
//   const [allItems, setAllItems] = useState([]);
//   const [allSalesItems, setAllSalesItems] = useState([]);
//   const [allsalesorder, setallsalesorder] = useState([]);
//   const [customername, setcustomername] = useState("");
//   const [salesorderDate, setsalesorderDate] = useState("");
//   const [PaymentTerms, setPaymentTerms] = useState("");
//   const [Address, setAddress] = useState("");
//   const [PhoneNumber, setPhoneNumber] = useState("");
//   const [DeliveryMethod, setDeliveryMethod] = useState("");
//   const [SalesPerson, setSalesPerson] = useState("");
//   const [salesOrderNumber, setSalesOrderNumber] = useState(1);
//   const [allAccounts, setAllAccounts] = useState([]);
//   const [customerAddress, setCustomerAddress] = useState({});
//   const [contactPerson, setContactPerson] = useState("");
//   const [itemDetails, setitemDetails] = useState([
//     {
//       itemId: "",
//       itemName: "",
//       quantity: 0,
//       rate: 0.0,
//       discount: 0,
//       discountAmount: 0,
//       openingStock: 0,
//       oldstockinhand: 0,
//       markup: 0,
//     },
//   ]);

//   const addTableRow = () => {
//     const newRow = {
//       itemId: "",
//       itemName: "",
//       quantity: 0,
//       rate: 0.0,
//       discount: 0,
//       openingStock: 0,
//       oldstockinhand: 0,
//       markup: 0,
//     };
//     setitemDetails((prevTableSet) => [...prevTableSet, newRow]);
//   };

//   useEffect(() => {
//     getAllItems();
//     getAllSalesItems();
//   }, []);

//   useEffect(() => {
//     const salesLength = allsalesorder.filter(
//       (item) => item.salestype === "Sales"
//     ).length;
//     setSalesOrderNumber(salesLength + 1);
//   }, [allsalesorder]);

//   useEffect(() => {
//     getAllAccounts();
//   }, []);

//   const getAllAccounts = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:9001/api/master/accounts/getallaccounts"
//       );
//       if (response.status === 200) {
//         console.log("Account=====>", response.data);
//         setAllAccounts(response.data.allAccount);
//       }
//     } catch (error) {
//       console.warn(error);
//     }
//   };

//   useEffect(() => {
//     getallsalesorder();
//   }, []);

//   const getallsalesorder = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:9001/api/transaction/salesorder/getallsalesorder"
//       );
//       if (response.status === 200) {
//         // console.log("Account Group=====>", response.data);
//         setallsalesorder(response.data.salesorder);
//       }
//     } catch (error) {
//       console.warn(error);
//     }
//   };
//   // console.log("allsalesorder", allsalesorder);
//   const getAllItems = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:9001/api/master/items/getallitems"
//       );
//       if (response.status === 200) {
//         // console.log("AllItems=====>", response.data);
//         setAllItems(response.data.allItems);
//       }
//     } catch (error) {
//       console.warn(error);
//     }
//   };

//   const getAllSalesItems = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:9001/api/transaction/saleitems/getallsalesitems"
//       );
//       if (response.status === 200) {
//         console.log("AllItems=====>", response.data);
//         setAllSalesItems(response.data.allSalesData);
//       }
//     } catch (error) {
//       console.warn(error);
//     }
//   };

//   const addSalesItem = async () => {
//     try {
//       let config = {
//         url: "/transaction/salesorder/addsalesorder",
//         method: "post",
//         baseURL: "http://localhost:9001/api",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         data: {
//           customername: customername,
//           salesorderNumber: salesOrderNumber,
//           salesorderDate: salesorderDate,
//           PaymentTerms: PaymentTerms,
//           Address: Address,
//           PhoneNumber: PhoneNumber,
//           DeliveryMethod: DeliveryMethod,
//           SalesPerson: SalesPerson,
//           itemDetails: itemDetails,
//           contactPersonMobileNumber: contactPerson,
//           salestype: "Sales",
//         },
//       };
//       let response = await axios(config);
//       if (response.status === 200) {
//         alert("added successfully");
//         window.location.assign("/salesorder");
//       }
//     } catch (error) {
//       console.log("error", error);
//     }
//   };

//   // const handleSelectChange = (e, index) => {
//   //   const selectedValue = e.target.value;
//   //   const selectedItem = allItems.find((item) => item._id === selectedValue);
//   //   console.log("selectedItem", selectedItem);
//   //   setitemDetails((prevTableSet) => {
//   //     const newTableSet = [...prevTableSet];
//   //     newTableSet[index] = {
//   //       ...newTableSet[index],
//   //       itemId: selectedItem?._id || "",
//   //       itemName: selectedItem?.itemName || "",
//   //       quantity: Number(1),
//   //       rate:
//   //         selectedItem?.sellingPrice !== undefined &&
//   //         selectedItem?.sellingPrice !== null
//   //           ? Number(selectedItem.sellingPrice)
//   //           : 0.0,
//   //       discount:
//   //         selectedItem?.discount !== undefined &&
//   //         selectedItem?.discount !== null
//   //           ? Number(selectedItem.discount)
//   //           : 0,
//   //       openingStock:
//   //         selectedItem?.openingStock !== undefined &&
//   //         selectedItem?.openingStock !== null
//   //           ? Number(selectedItem.openingStock)
//   //           : 0,
//   //       stockInHand:
//   //         (selectedItem?.stockInHand !== undefined &&
//   //         selectedItem?.stockInHand !== null
//   //           ? Number(selectedItem.stockInHand)
//   //           : 0) - newTableSet[index].quantity,
//   //     };

//   //     return newTableSet;
//   //   });
//   // };

//   // const handleSelectChange = (e, index) => {
//   //   const selectedValue = e.target.value;
//   //   const selectedItem = allItems.find((item) => item._id === selectedValue);

//   //   setitemDetails((prevTableSet) => {
//   //     const newTableSet = [...prevTableSet];

//   //     // const prevQuantity = newTableSet[index].quantity; // Previous quantity
//   //     // const currentStockInHand = newTableSet[index].stockInHand; // Previous stockInHand
//   //     const updatedStockInHand = selectedItem?.stockInHand || 0;
//   //     console.log("Selected Item:", selectedItem);
//   //     console.log("Current Stock In Hand:", updatedStockInHand);

//   //     newTableSet[index] = {
//   //       ...newTableSet[index],
//   //       itemId: selectedItem?._id || "",
//   //       itemName: selectedItem?.itemName || "",
//   //       quantity: Number(1),
//   //       rate:
//   //         selectedItem?.sellingPrice !== undefined &&
//   //         selectedItem?.sellingPrice !== null
//   //           ? Number(selectedItem.sellingPrice)
//   //           : 0.0,
//   //       discount:
//   //         selectedItem?.discount !== undefined &&
//   //         selectedItem?.discount !== null
//   //           ? Number(selectedItem.discount)
//   //           : 0,
//   //       openingStock:
//   //         selectedItem?.openingStock !== undefined &&
//   //         selectedItem?.openingStock !== null
//   //           ? Number(selectedItem.openingStock)
//   //           : 0,
//   //       stockInHand: updatedStockInHand,
//   //       // selectedItem?.stockInHand !== undefined &&
//   //       // selectedItem?.stockInHand !== null
//   //       //   ? Number(selectedItem.stockInHand)
//   //       //   : 0,
//   //     };
//   //     console.log("New Table Set:", newTableSet);
//   //     return newTableSet;
//   //   });
//   // };

//   useEffect(() => {
//     console.log("Updated itemDetails:", itemDetails);
//   }, [itemDetails]);

//   const handleSelectChange = (e, index) => {
//     const selectedValue = e.target.value;
//     const selectedItem = allItems.find((item) => item._id === selectedValue);

//     setitemDetails((prevTableSet) => {
//       const newTableSet = [...prevTableSet];
//       const updatedStockInHand = selectedItem?.stockInHand || 0;

//       console.log("Selected Item:", selectedItem);
//       console.log("Current Stock In Hand:", updatedStockInHand);

//       newTableSet[index] = {
//         ...newTableSet[index],
//         itemId: selectedItem?._id || "",
//         itemName: selectedItem?.itemName || "",
//         quantity: Number(0),
//         rate:
//           selectedItem?.sellingPrice !== undefined &&
//           selectedItem?.sellingPrice !== null
//             ? Number(selectedItem.sellingPrice)
//             : 0.0,
//         discount: Number(0),
//         oldstockinhand: updatedStockInHand,
//       };

//       console.log("New Table Set:", newTableSet);
//       return newTableSet;
//     });
//   };

//   // current not correct
//   // const handleQuantityChange = (e, index) => {
//   //   const newQuantity = e.target.value;
//   //   console.log("newQuantity", newQuantity);

//   //   // Convert values to integers
//   //   const oldQuantity = parseInt(itemDetails[index].quantity);
//   //   const openingStock = parseInt(itemDetails[index].openingStock);

//   //   if (parseInt(newQuantity) > openingStock) {
//   //     alert("Quantity cannot be greater than opening stock!");
//   //     return;
//   //   }

//   //   // Calculate the remaining stock
//   //   const remainingStock = openingStock - parseInt(newQuantity);

//   //   setitemDetails((prevTableSet) => {
//   //     const newTableSet = prevTableSet.map((item, i) => {
//   //       if (i === index) {
//   //         return {
//   //           ...item,
//   //           quantity: newQuantity,
//   //           openingStock: remainingStock,
//   //           discountAmount: calculateFinalAmount(
//   //             item.rate,
//   //             newQuantity,
//   //             item.discount,
//   //             remainingStock
//   //           ),
//   //         };
//   //       }
//   //       return item;
//   //     });
//   //     return newTableSet;
//   //   });
//   // };

//   // const handleQuantityChange = (e, index) => {
//   //   const newQuantity = e.target.value;
//   //   console.log("newQuantity", newQuantity);

//   //   // Convert values to integers
//   //   const oldQuantity = parseInt(itemDetails[index].quantity);
//   //   const openingStock = parseInt(itemDetails[index].openingStock);

//   //   if (parseInt(newQuantity) > openingStock) {
//   //     alert("Quantity cannot be greater than opening stock!");
//   //     return;
//   //   }

//   //   // Calculate the remaining stock
//   //   const remainingStock = openingStock - parseInt(newQuantity);

//   //   setitemDetails((prevTableSet) => {
//   //     const newTableSet = [...prevTableSet];
//   //     newTableSet[index] = {
//   //       ...newTableSet[index],
//   //       quantity: newQuantity,
//   //       openingStock: remainingStock,
//   //       discountAmount: calculateFinalAmount(
//   //         newTableSet[index].rate,
//   //         newQuantity,
//   //         newTableSet[index].discount,
//   //         remainingStock
//   //       ),
//   //     };
//   //     return newTableSet;
//   //   });
//   // };

//   //old method=================================

//   console.log("itemDetails", itemDetails);

//   const handleQuantityChange = (e, index) => {
//     const newQuantity = Number(e.target.value);
//     if (isNaN(newQuantity)) {
//       // Handle invalid input (not a number)
//       alert("Please enter a valid quantity.");
//       return;
//     }
//     if (parseInt(newQuantity) > parseInt(itemDetails[index].oldstockinhand)) {
//       alert(
//         `Quantity cannot be more than ${parseInt(
//           itemDetails[index].oldstockinhand
//         )}!`
//       );
//       return;
//     }
//     setitemDetails((prevTableSet) => {
//       const newTableSet = [...prevTableSet];
//       const findOldStockInHand = parseInt(itemDetails[index].oldstockinhand);
//       const remainingStock = findOldStockInHand - newQuantity;

//       console.log("Old Stock In Hand:", findOldStockInHand);
//       console.log("New Quantity:", newQuantity);
//       console.log("Remaining Stock:", remainingStock);

//       newTableSet[index] = {
//         ...newTableSet[index],
//         quantity: newQuantity,
//         stockInHand: findOldStockInHand - parseInt(newQuantity),
//         discountAmount: calculateFinalAmount(
//           newTableSet[index].rate,
//           newQuantity,
//           newTableSet[index].discount,
//           remainingStock
//         ),
//       };
//       console.log("Updated Table Set:", newTableSet);
//       return newTableSet;
//     });
//   };

//   const handleRateChange = (e, index) => {
//     const newRate = e.target.value;
//     setitemDetails((prevTableSet) => {
//       const newTableSet = [...prevTableSet];
//       newTableSet[index] = {
//         ...newTableSet[index],
//         rate: newRate,
//         discountAmount: calculateFinalAmount(
//           newRate,
//           newTableSet[index].quantity,
//           newTableSet[index].discount
//         ),
//       };
//       return newTableSet;
//     });
//   };

//   const handleDiscountChange = (e, index) => {
//     const newDiscount = Number(e.target.value);
//     console.log("newDiscount", typeof newDiscount);
//     setitemDetails((prevTableSet) => {
//       const newTableSet = [...prevTableSet];
//       newTableSet[index] = {
//         ...newTableSet[index],
//         discount: newDiscount,
//         discountAmount: calculateFinalAmount(
//           newTableSet[index].rate,
//           newTableSet[index].quantity,
//           newDiscount,
//           newTableSet[index].markup
//           // 0
//         ),
//       };
//       return newTableSet;
//     });
//   };

//   const handleMarkupChange = (e, index) => {
//     const newMarkUp = e.target.value;
//     setitemDetails((prevTableSet) => {
//       const newTableSet = [...prevTableSet];
//       newTableSet[index] = {
//         ...newTableSet[index],
//         markup: newMarkUp,
//         discountAmount: calculateFinalAmount(
//           newTableSet[index].rate,
//           newTableSet[index].quantity,
//           newTableSet[index].discount,
//           newMarkUp
//         ),
//       };
//       return newTableSet;
//     });
//   };

//   // const calculateFinalAmount = (rate, quantity, discount,markup) => {
//   //   const stringToQuantity = parseFloat(quantity);
//   //   const stringToRate = parseFloat(rate);
//   //   const discountAmount = (
//   //     stringToRate *
//   //     stringToQuantity *
//   //     (1 - Number(discount) / 100)
//   //   ).toFixed(2);
//   //   return discountAmount;
//   // };

//   // const calculateFinalAmount = (rate, quantity, discount, markup) => {
//   //   const stringToQuantity = parseFloat(quantity);
//   //   const stringToRate = parseFloat(rate);
//   //   console.log(rate, "rate");
//   //   console.log(quantity, "quantity");
//   //   console.log(discount, "discount");
//   //   console.log(markup, "markup");
//   //   // Calculate amount before discount and markup
//   //   const baseAmount = stringToRate * stringToQuantity;
//   //   // Calculate the amount after applying discount
//   //   const discountedAmount = baseAmount * (1 - Number(discount) / 100);
//   //   // Calculate the amount after applying markup
//   //   const finalAmount = discountedAmount * (1 + Number(markup) / 100);

//   //   // console.log(finalAmount, "finalAmount");
//   //   // If both discount and markup are 0, the final amount is the base amount
//   //   if (discount !== 0 || markup !== 0) {
//   //     return Math.round(finalAmount);
//   //   } else {
//   //     return Math.round(baseAmount);
//   //   }
//   // };

//   // const calculateFinalAmount = (rate, quantity, discount, markup) => {
//   //   const stringToQuantity = parseFloat(quantity);
//   //   const stringToRate = parseFloat(rate);
//   //   const baseAmount = stringToRate * stringToQuantity;
//   //   if (!discount && markup) {
//   //     return baseAmount + (baseAmount * Number(markup)) / 100;
//   //   }
//   //   if (discount && !markup) {
//   //     return baseAmount - (baseAmount * Number(discount)) / 100;
//   //   }
//   //   if (!discount && !markup) {
//   //     return baseAmount;
//   //   }
//   //   let discountamout = baseAmount - (baseAmount * discount) / 100;

//   //   let finalval = baseAmount + (baseAmount * markup) / 100;
//   //   console.log(finalval, "finalval");
//   //   console.log(discountamout, "discountamout");
//   //   console.log(finalval - discountamout, "substa");
//   //   if (discount && markup) {
//   //     return finalval;
//   //   }
//   // };

//   const calculateFinalAmount = (rate, quantity, discount, markup) => {
//     const stringToQuantity = parseFloat(quantity);
//     const stringToRate = parseFloat(rate);
//     const baseAmount = stringToRate * stringToQuantity;

//     if (!discount && markup) {
//       // Apply markup only
//       console.log("Apply markup only");
//       return baseAmount + (baseAmount * Number(markup)) / 100;
//     }

//     if (discount && !markup) {
//       // Apply discount only
//       console.log("Apply discount only");
//       return baseAmount - (baseAmount * Number(discount)) / 100;
//     }

//     if (!discount && !markup) {
//       // No discount or markup
//       console.log(" No discount or markup");
//       return baseAmount;
//     }
//     // Apply both discount and markup
//     let discountedAmount = baseAmount - (baseAmount * discount) / 100;
//     let finalAmount = discountedAmount + (discountedAmount * markup) / 100;

//     return Math.abs(finalAmount.toFixed(2));
//   };

//   const handleDeleteRow = (index) => {
//     setitemDetails((prevTableSet) => {
//       const updatedTableSet = [
//         ...prevTableSet.slice(0, index),
//         ...prevTableSet.slice(index + 1),
//       ];
//       console.log("Updated rows:", updatedTableSet);
//       return updatedTableSet;
//     });
//   };
//   // const editSalesItem = async (id) => {
//   //   try {
//   //     let config = {
//   //       url: `/transaction/saleitems/editsalesitems/${id}`,
//   //       method: "put",
//   //       baseURL: "http://localhost:9001/api",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       data: {},
//   //     };
//   //     let response = await axios(config);
//   //     if (response.status === 200) {
//   //       // alert("added");
//   //     }
//   //   } catch (error) {
//   //     console.log("error", error);
//   //   }
//   // };

//   // const deleteSalesItem = async (id) => {
//   //   try {
//   //     let res = await axios.delete(
//   //       `http://localhost:9001/api/transaction/saleitems/deletesalesitems/${id}`
//   //     );
//   //     if (res.status === 200) {
//   //       alert("Delete Successfully");
//   //       getAllSalesItems();
//   //     }
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };

//   const handleInputChanges = (e) => {
//     console.log("customerName", e.target.value);
//     const findAccount = allAccounts.find((item) => item._id === e.target.value);
//     setCustomerAddress(findAccount);
//     setcustomername(findAccount.accountName);
//     setAddress(findAccount.address);
//     setPhoneNumber(findAccount.mobileNo);
//   };
//   // console.log("customerAddress", customerAddress);

//   return (
//     <div className="container p-5">
//       <p className="textbld f_20">New Sales Order </p>
//       <div className="row mt-5  ">
//         <div className="col-md-8">
//           <div className="row ">
//             <div className="col-md-4">
//               <p className="colr-red textbld">Customer Name*</p>
//             </div>
//             <div className="col-md-8 mb-4">
//               <Form.Select
//                 className=""
//                 // value={ParentGroup}
//                 label="Customer"
//                 onChange={handleInputChanges}
//               >
//                 <option value="">Select Customer</option>
//                 {allAccounts.map((ele) => (
//                   <option value={ele._id}>{ele.accountName}</option>
//                 ))}
//               </Form.Select>
//             </div>
//           </div>
//           <div className="row ">
//             <div className="col-md-4">
//               <p className="colr-red textbld">Sales Order Number*</p>
//             </div>

//             <div className="col-md-8 mb-4">
//               <Form.Control
//                 placeholder="Sales Order Number"
//                 value={salesOrderNumber}
//                 readOnly
//                 onChange={(e) => setSalesOrderNumber(e.target.value)}
//               />
//             </div>
//           </div>
//           <div className="row ">
//             <div className="col-md-4">
//               <p className="colr-red textbld">Sales Order Date*</p>
//             </div>

//             <div className="col-md-8 mb-4">
//               <Form.Control
//                 type="date"
//                 onChange={(e) => setsalesorderDate(e.target.value)}
//               />
//             </div>
//           </div>
//           <div className="row ">
//             <div className="col-md-4">
//               <p className="textbld">Payment Terms</p>
//             </div>
//             <div className="col-md-8 mb-4">
//               <Form.Control
//                 value={PaymentTerms}
//                 onChange={(e) => setPaymentTerms(e.target.value)}
//               />
//             </div>
//           </div>
//           <div className="row ">
//             <div className="col-md-3">
//               <div className="d-flex">
//                 <span className="colr-red  textbld">Address*</span>
//               </div>{" "}
//             </div>
//             <div className="col-md-1"></div>
//             <div className="col-md-8 mb-4">
//               <Form.Control
//                 value={Address}
//                 onChange={(e) => setAddress(e.target.value)}
//               />
//             </div>
//           </div>
//           <div className="row ">
//             <div className="col-md-4">
//               <p className="textbld">Phone Number</p>
//             </div>
//             <div className="col-md-8 mb-4">
//               <Form.Control
//                 value={PhoneNumber}
//                 max={10}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//               />
//             </div>
//           </div>
//           <div className="row ">
//             <div className="col-md-4">
//               <p className=" textbld">Delivery Method</p>
//             </div>

//             <div className="col-md-8 mb-4">
//               <Form.Control
//                 value={DeliveryMethod}
//                 onChange={(e) => setDeliveryMethod(e.target.value)}
//               />
//             </div>
//           </div>
//           <div className="row ">
//             <div className="col-md-4">
//               <p className=" textbld">Sales Person</p>
//             </div>

//             <div className="col-md-8 mb-4">
//               <Form.Control
//                 value={SalesPerson}
//                 onChange={(e) => setSalesPerson(e.target.value)}
//               />
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-md-4">
//               <p className=" textbld">Contact Person Mobile</p>
//             </div>

//             <div className="col-md-8 mb-4">
//               <Form.Control
//                 value={contactPerson}
//                 max={10}
//                 onChange={(e) => setContactPerson(e.target.value)}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="row mb-2">
//         <div className="col-md-2 text-start">
//           <button
//             className="sale-order-add-item-btn"
//             style={{
//               padding: "3px 7px",
//               border: "1px solid #f9f9fb",
//               borderRadius: "5px",
//             }}
//             onClick={addTableRow}
//           >
//             <i class="fa-solid fa-circle-plus" style={{ color: "#188dfa" }}></i>{" "}
//             Add Row
//           </button>
//         </div>
//         <div className="col-md-8 m-auto "></div>
//         {/* <div className="col-md-2 text-end textbld bulkupload">Bulk Update</div> */}
//       </div>
//       <Table className="col-md-12">
//         <thead>
//           <th className="td_S th_C p-2">Items Details</th>
//           <th className="td_S th_C p-2">Quantity</th>
//           <th className="td_S th_C p-2">Rate</th>
//           <th className="td_S th_C p-2">Discount</th>
//           <th className="td_S th_C p-2">Markup</th>
//           <th className="td_S th_C p-2">Amount</th>
//           <th className="td_S th_C p-2"></th>
//         </thead>
//         <tbody>
//           {itemDetails.map((ele, index) => {
//             // console.log("Rendering index:", index, ele);
//             return (
//               <tr>
//                 {/* {console.log("ele", ele)} */}
//                 <td className="td_S m-auto th_C">
//                   <select
//                     style={{
//                       border: "1px solid #dee2e6",
//                       padding: "11px",
//                       outline: 0,
//                       borderRadius: "8px",
//                       width: "170px",
//                     }}
//                     onChange={(e) => handleSelectChange(e, index)}
//                   >
//                     <option value="">Select an item</option>;
//                     {allItems?.map((items) => {
//                       return (
//                         <option key={items._id} value={items._id}>
//                           {items.itemName} / SKU:{items.skuCode} / Rate: Rs.
//                           {items.sellingPrice}
//                         </option>
//                       );
//                     })}
//                   </select>
//                 </td>{" "}
//                 <td className="td_S m-auto th_C">
//                   <Form.Control
//                     placeholder="Quantity"
//                     type="number"
//                     min={0}
//                     style={{
//                       border: "1px solid #dee2e6",
//                       padding: "11px",
//                       outline: 0,
//                       borderRadius: "8px",
//                     }}
//                     value={ele.quantity}
//                     onChange={(e) => handleQuantityChange(e, index)}
//                   />
//                 </td>
//                 <td className="td_S m-auto th_C">
//                   <Form.Control
//                     placeholder="Rate"
//                     type="number"
//                     min={0}
//                     style={{
//                       border: "1px solid #dee2e6",
//                       padding: "11px",
//                       outline: 0,
//                       borderRadius: "8px",
//                     }}
//                     value={ele.rate}
//                     onChange={(e) => handleRateChange(e, index)}
//                   />
//                 </td>
//                 <td className="td_S m-auto th_C">
//                   <Form.Control
//                     placeholder="discount"
//                     type="number"
//                     style={{
//                       border: "1px solid #dee2e6",
//                       padding: "11px",
//                       outline: 0,
//                       borderRadius: "8px",
//                     }}
//                     min={0}
//                     value={ele.discount}
//                     onChange={(e) => handleDiscountChange(e, index)}
//                   />
//                 </td>
//                 <td className="td_S m-auto th_C">
//                   <Form.Control
//                     placeholder="Markup"
//                     type="number"
//                     style={{
//                       border: "1px solid #dee2e6",
//                       padding: "11px",
//                       outline: 0,
//                       borderRadius: "8px",
//                     }}
//                     min={0}
//                     value={ele.markup}
//                     onChange={(e) => handleMarkupChange(e, index)}
//                   />
//                 </td>
//                 <td className="td_S m-auto th_C">
//                   <div
//                     className="mt-2"
//                     style={{
//                       // boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
//                       // border: "1px solid #dee2e6",
//                       // padding: "11px",
//                       // outline: 0,
//                       // borderRadius: "8px",
//                       fontWeight: 700,
//                     }}
//                   >
//                     {calculateFinalAmount(
//                       ele.rate,
//                       ele.quantity,
//                       ele.discount,
//                       ele.markup
//                     )}
//                   </div>
//                 </td>
//                 <td className="td_S m-auto th_C">
//                   <button
//                     onClick={() => handleDeleteRow(index)}
//                     className="delete-row-button"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </Table>

//       <div className="row">
//         <div className="col-md-4"></div>
//         <div className="col-md-4">
//           <div className="row">
//             <div className="col-md-5">
//               {/* <Link className="row anchore_Tag" to="/Sales"> */}
//               <Button
//                 className=" textbld m-auto m-2 bg_color"
//                 onClick={addSalesItem}
//               >
//                 Done
//               </Button>{" "}
//               {/* </Link>{" "} */}
//             </div>
//             <Button
//               onClick={() => window.location.assign("/salesorder")}
//               className="col-md-5 textbld m-auto m-2"
//               variant="light"
//             >
//               Cancel
//             </Button>{" "}
//           </div>
//         </div>
//         <div className="col-md-4"></div>
//       </div>
//     </div>
//   );
// }
// export default DirectSales;
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import { Modal, Table } from "react-bootstrap";
import axios from "axios";
import { Autocomplete, TextField } from "@mui/material";
function DirectSales() {
  const [allItems, setAllItems] = useState([]);
  const [allSalesItems, setAllSalesItems] = useState([]);
  const [allsalesorder, setallsalesorder] = useState([]);
  const [customername, setcustomername] = useState("");
  const [salesorderDate, setsalesorderDate] = useState("");
  const [PaymentTerms, setPaymentTerms] = useState("");
  const [Address, setAddress] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [DeliveryMethod, setDeliveryMethod] = useState("");
  const [SalesPerson, setSalesPerson] = useState("");
  const [salesOrderNumber, setSalesOrderNumber] = useState(1);
  const [allAccounts, setAllAccounts] = useState([]);
  const [customerAddress, setCustomerAddress] = useState({});
  const [contactPerson, setContactPerson] = useState("");
  const [hoveredItem, setHoveredItem] = useState(null);
  const [itemDetails, setitemDetails] = useState([
    {
      itemId: "",
      itemName: "",
      quantity: 0,
      rate: 0.0,
      discount: 0,
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
      openingStock: 0,
      oldstockinhand: 0,
      markup: 0,
    };
    setitemDetails((prevTableSet) => [...prevTableSet, newRow]);
  };

  useEffect(() => {
    getAllItems();
    getAllSalesItems();
  }, []);

  useEffect(() => {
    const salesLength = allsalesorder.filter(
      (item) => item.salestype === "Sales"
    ).length;
    setSalesOrderNumber(salesLength + 1);
  }, [allsalesorder]);

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

  useEffect(() => {
    getallsalesorder();
  }, []);

  const getallsalesorder = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9001/api/transaction/salesorder/getallsalesorder"
      );
      if (response.status === 200) {
        setallsalesorder(response.data.salesorder);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const getAllItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9001/api/master/items/getallitems"
      );
      if (response.status === 200) {
        setAllItems(response.data.allItems);
      }
    } catch (error) {
      console.warn(error);
    }
  };

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

  const addSalesItem = async () => {
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
          salesorderNumber: salesOrderNumber,
          salesorderDate: salesorderDate,
          PaymentTerms: PaymentTerms,
          Address: Address,
          PhoneNumber: PhoneNumber,
          DeliveryMethod: DeliveryMethod,
          SalesPerson: SalesPerson,
          itemDetails: itemDetails,
          contactPersonMobileNumber: contactPerson,
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

  // const handleSelectChange = (e,newValue, index) => {
  //   const selectedValue = e.target.value;
  //   const selectedItem = allItems.find((item) => item._id === selectedValue);

  //   setitemDetails((prevTableSet) => {
  //     const newTableSet = [...prevTableSet];
  //     const updatedStockInHand = selectedItem?.stockInHand || 0;

  //     console.log("Selected Item:", selectedItem);
  //     console.log("Current Stock In Hand:", updatedStockInHand);

  //     newTableSet[index] = {
  //       ...newTableSet[index],
  //       itemId: selectedItem?._id || "",
  //       itemName: selectedItem?.itemName || "",
  //       quantity: Number(0),
  //       rate:
  //         selectedItem?.sellingPrice !== undefined &&
  //         selectedItem?.sellingPrice !== null
  //           ? Number(selectedItem.sellingPrice)
  //           : 0.0,
  //       discount: Number(0),
  //       oldstockinhand: updatedStockInHand,
  //     };

  //     console.log("New Table Set:", newTableSet);
  //     return newTableSet;
  //   });
  // };

  //old method=================================

  console.log("itemDetails", itemDetails);

  const handleQuantityChange = (e, index) => {
    const newQuantity = e.target.value;
    if (parseInt(newQuantity) > parseInt(itemDetails[index].oldstockinhand)) {
      alert(
        `Quantity cannot be more than ${parseInt(
          itemDetails[index].oldstockinhand
        )}!`
      );
      return;
    }
    setitemDetails((prevTableSet) => {
      const newTableSet = [...prevTableSet];
      const findOldStockInHand = parseInt(itemDetails[index].oldstockinhand);
      const remainingStock = findOldStockInHand - parseInt(newQuantity);

      newTableSet[index] = {
        ...newTableSet[index],
        quantity: newQuantity,
        stockInHand: remainingStock,
        discountAmount: calculateFinalAmount(
          newTableSet[index].rate,
          newQuantity,
          newTableSet[index].discount,
          newTableSet[index].markup
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

  const handleInputChanges = (e) => {
    console.log("customerName", e.target.value);
    const findAccount = allAccounts.find((item) => item._id === e.target.value);
    setCustomerAddress(findAccount);
    setcustomername(findAccount.accountName);
    setAddress(findAccount.address);
    setPhoneNumber(findAccount.mobileNo);
  };

  return (
    <div className="container p-5">
      <p className="textbld f_20">New Sales Order </p>
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
              <p className="colr-red textbld">Sales Order Number*</p>
            </div>

            <div className="col-md-8 mb-4">
              <Form.Control
                placeholder="Sales Order Number"
                value={salesOrderNumber}
                readOnly
                onChange={(e) => setSalesOrderNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="row ">
            <div className="col-md-4">
              <p className="colr-red textbld">Sales Order Date*</p>
            </div>

            <div className="col-md-8 mb-4">
              <Form.Control
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
                value={PaymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
              />
            </div>
          </div>
          <div className="row ">
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
                max={10}
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
            <i class="fa-solid fa-circle-plus" style={{ color: "#188dfa" }}></i>
            Add Row
          </button>
        </div>
        <div className="col-md-8 m-auto "></div>
        {/* <div className="col-md-2 text-end textbld bulkupload">Bulk Update</div> */}
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
            // console.log("Rendering index:", index, ele);
            return (
              <tr>
                {/* {console.log("ele", ele)} */}
                <td className="td_S m-auto th_C">
                  {/* <select
                    style={{
                      border: "1px solid #dee2e6",
                      padding: "11px",
                      outline: 0,
                      borderRadius: "8px",
                      width: "170px",
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
                <td className="td_S m-auto th_C">
                  <Form.Control
                    placeholder="Quantity"
                    type="number"
                    min={0}
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
                <td className="td_S m-auto th_C">
                  <Form.Control
                    placeholder="Rate"
                    type="number"
                    min={0}
                    readOnly
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
                <td className="td_S m-auto th_C">
                  <Form.Control
                    placeholder="discount"
                    type="number"
                    style={{
                      border: "1px solid #dee2e6",
                      padding: "11px",
                      outline: 0,
                      borderRadius: "8px",
                    }}
                    min={0}
                    value={ele.discount}
                    onChange={(e) => handleDiscountChange(e, index)}
                  />
                </td>
                <td className="td_S m-auto th_C">
                  <Form.Control
                    placeholder="Markup"
                    type="number"
                    style={{
                      border: "1px solid #dee2e6",
                      padding: "11px",
                      outline: 0,
                      borderRadius: "8px",
                    }}
                    min={0}
                    value={ele.markup}
                    onChange={(e) => handleMarkupChange(e, index)}
                  />
                </td>
                <td className="td_S m-auto th_C">
                  <div
                    className="mt-2"
                    style={{
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
                <td className="td_S m-auto th_C">
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
            <Button
              onClick={() => window.location.assign("/salesorder")}
              className="col-md-5 textbld m-auto m-2"
              variant="light"
            >
              Cancel
            </Button>
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
}
export default DirectSales;
