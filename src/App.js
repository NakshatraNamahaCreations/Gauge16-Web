import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Login } from "./Component/Login";
import { Signup } from "./Component/Signup";
import Dashboard from "./Component/Dashboard";
import Items from "./Component/Master/Items";
import ItemGroup from "./Component/Master/ItemGroup";
import Customer from "./Component/Master/Customer";
import Account from "./Component/Master/Account";
import Layout from "./Component/Layout";
import AccountGroup from "./Component/Master/AccountGroup";
import Vendor from "./Component/Master/Vendor";
import Saleinvoices from "./Component/Sales/Saleinvoices";
import Quotations from "./Component/Sales/Quotations";
import Salesreturn from "./Component/Sales/Salesreturn";
import Salesorder from "./Component/Sales/Salesorder";
import Creditnote from "./Component/Sales/Creditnote";
import Deliverychallans from "./Component/Sales/Deliverychallans";
import Purchaseinvoice from "./Component/Purchases/Purchaseinvoice";
import Purchasereturn from "./Component/Purchases/Purchasereturn";
import Purchaseorder from "./Component/Purchases/Purchaseorder";
import Debit from "./Component/Purchases/Debit";
import Itemgroupdetails from "./Component/Master/Itemgroupdetails";
import Acountgroupdetails from "./Component/Master/Acountgroupdetails";
import Directsales from "./Component/Sales/Directsales";
import Pullformquotation from "./Component/Sales/Pullformquotation";
import Invoicedirect from "./Component/Sales/Invoicedirect";
import InvoicePullformquotation from "./Component/Sales/InvoicePullformquotation";
import Payment from "./Component/Payment";
import Receipt from "./Component/Reciept";
import Newjournal from "./Component/Newjournal";
import Contravoucher from "./Component/Contravoucher";
import Daybook from "./Component/Ledger/Daybook";
import Displaycashbalance from "./Component/Ledger/Displaycashbalance";
import Accountledger from "./Component/Ledger/Accountledger";
import Cashbankbook from "./Component/Ledger/Cashbankbook";
import Partdaybook from "./Component/Ledger/Partdaybook";
import Inventory from "./Component/Inventory";
import ReportHome from "./Component/Reports/ReportHome";
import Skucode from "./Component/Skuode";
import Deliverychallangroup from "./Component/Sales/Deliverychallangroup";
import Deliverychallangroupdetails from "./Component/Sales/Deliverychallangroupdetails";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        {/* Master */}
        <Route
          exact
          path="/dashboard"
          element={
            <Layout
              Children={
                <>
                  <Dashboard />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="/Items"
          element={
            <Layout
              Children={
                <>
                  <Items />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="/ItemGroup"
          element={
            <Layout
              Children={
                <>
                  <ItemGroup />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="/Customer"
          element={
            <Layout
              Children={
                <>
                  <Customer />
                </>
              }
            />
          }
        />{" "}
        <Route
          exact
          path="/Account"
          element={
            <Layout
              Children={
                <>
                  <Account />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="/AccountGroup"
          element={
            <Layout
              Children={
                <>
                  <AccountGroup />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="/Vendor"
          element={
            <Layout
              Children={
                <>
                  <Vendor />
                </>
              }
            />
          }
        />
        {/* Sales */}
        <Route
          exact
          path="/salesinvoices"
          element={
            <Layout
              Children={
                <>
                  <Saleinvoices />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="/quotations"
          element={
            <Layout
              Children={
                <>
                  <Quotations />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="/skucode"
          element={
            <Layout
              Children={
                <>
                  <Skucode />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="/salesreturn"
          element={
            <Layout
              Children={
                <>
                  <Salesreturn />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="/salesorder"
          element={
            <Layout
              Children={
                <>
                  <Salesorder />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="/creditnote"
          element={
            <Layout
              Children={
                <>
                  <Creditnote />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="/deliverychallans"
          element={
            <Layout
              Children={
                <>
                  <Deliverychallans />
                </>
              }
            />
          }
        />
        {/* Purchase Invoice */}
        <Route
          exact
          path="/purchaseinvoice"
          element={
            <Layout
              Children={
                <>
                  <Purchaseinvoice />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="/purchasereturn"
          element={
            <Layout
              Children={
                <>
                  <Purchasereturn />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="/purchaseorder"
          element={
            <Layout
              Children={
                <>
                  <Purchaseorder />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="/debit"
          element={
            <Layout
              Children={
                <>
                  <Debit />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="/itemgroupdetails/:id"
          element={
            <Layout
              Children={
                <>
                  <Itemgroupdetails />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="/accountgroupdetail/:id"
          element={
            <Layout
              Children={
                <>
                  <Acountgroupdetails />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="/directsales"
          element={
            <Layout
              Children={
                <>
                  <Directsales />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="/pullformquotation"
          element={
            <Layout
              Children={
                <>
                  <Pullformquotation />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="/quotation"
          element={
            <Layout
              Children={
                <>
                  <Quotations />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="/salesinvoice"
          element={
            <Layout
              Children={
                <>
                  <Invoicedirect />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="/invoicepullformquotation"
          element={
            <Layout
              Children={
                <>
                  <InvoicePullformquotation />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="/payment"
          element={
            <Layout
              Children={
                <>
                  <Payment />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="/reciept"
          element={
            <Layout
              Children={
                <>
                  <Receipt />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="/newjournal"
          element={
            <Layout
              Children={
                <>
                  <Newjournal />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="/contra"
          element={
            <Layout
              Children={
                <>
                  <Contravoucher />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="/daybook"
          element={
            <Layout
              Children={
                <>
                  <Daybook />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="/displaycashbalance"
          element={
            <Layout
              Children={
                <>
                  <Displaycashbalance />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="/accountledger"
          element={
            <Layout
              Children={
                <>
                  <Accountledger />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="/cashbook"
          element={
            <Layout
              Children={
                <>
                  <Cashbankbook />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="/partydaybook"
          element={
            <Layout
              Children={
                <>
                  <Partdaybook />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="/inventory"
          element={
            <Layout
              Children={
                <>
                  <Inventory />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="/report/home"
          element={
            <Layout
              Children={
                <>
                  <ReportHome />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="/deliverychallangroupdetail/:id"
          element={
            <Layout
              Children={
                <>
                  <Deliverychallangroupdetails />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="deliverychallangroup"
          element={
            <Layout
              Children={
                <>
                  <Deliverychallangroup />
                </>
              }
            />
          }
        />
      </Routes>
    </>
  );
}
