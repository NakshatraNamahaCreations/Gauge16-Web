// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
// import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
// import HomeIcon from "@mui/icons-material/Home";
// import InventoryIcon from "@mui/icons-material/Inventory";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
// import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
// import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
// import FolderIcon from "@mui/icons-material/Folder";
// import ArrowRightIcon from "@mui/icons-material/ArrowRight";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import { useLocation } from "react-router-dom";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
// const navData1 = [
//   {
//     id: 0,
//     icon: <HomeIcon />,
//     text: "Dashboard",
//     link: "/dashboard",
//   },
//   {
//     id: 1,
//     icon: <InventoryIcon />,
//     text: "Master",

//     subcategories: [
//       {
//         id: 0,
//         text: "Item Group",
//         link: "/ItemGroup",
//       },
//       {
//         id: 1,
//         text: "Items",
//         link: "/Items",
//       },

//       {
//         id: 2,
//         text: "Account Group",
//         link: "/AccountGroup",
//       },

//       {
//         id: 3,
//         text: "Account",
//         link: "/Account",
//       },

//       // {
//       //   id: 4,
//       //   text: "Customers",
//       //   link: "/Customer",
//       // },

//       // {
//       //   id: 5,
//       //   text: "Vendor",
//       //   link: "/Vendor",
//       // },
//     ],
//   },
//   {
//     id: 2,
//     // icon: <ShoppingCartIcon />,
//     icon: <ReceiptLongIcon />,
//     text: "Sales",
//     // link: "/Sales",
//     subcategories: [
//       // {
//       //   id: 0,
//       //   text: "Customers",
//       //   link: "/Customer",
//       // },
//       {
//         id: 1,
//         text: "Sale Invoices",
//         link: "/salesinvoices",
//       },
//       {
//         id: 2,
//         text: "Quotations ",
//         link: "/quotation",
//       },
//       {
//         id: 3,
//         text: "Sale Returns ",
//         link: "/salesreturn",
//       },
//       {
//         id: 4,
//         text: "Sale Orders ",
//         link: "/salesorder",
//       },
//       {
//         id: 5,
//         text: "Credit Note ",
//         link: "/creditnote",
//       },
//       {
//         id: 6,
//         text: "Delivery Challans ",
//         link: "/deliverychallans",
//       },
//     ],
//   },
//   {
//     id: 3,
//     icon: <ShoppingBagIcon />,
//     text: "Purchases",
//     // link: "/Purchase",
//     subcategories: [
//       {
//         id: 0,
//         text: "Vendors",
//         link: "/Vendor",
//       },
//       {
//         id: 1,
//         text: "Purchase Invoices",
//         link: "/purchaseinvoice",
//       },
//       {
//         id: 2,
//         text: "Purchase Returns",
//         link: "/purchasereturn",
//       },
//       {
//         id: 3,
//         text: "  Purchase Order",
//         link: "/purchaseorder",
//       },
//       {
//         id: 4,
//         text: "Debit Note",
//         link: "/debit",
//       },
//     ],
//   },
//   // {
//   //   id: 4,
//   //   icon: <ElectricalServicesIcon className="clr" />,
//   //   text: "Payments",
//   //   link: "/payment",
//   // },
//   // {
//   //   id: 5,
//   //   icon: <ElectricalServicesIcon className="clr" />,
//   //   text: "Reciept",
//   //   link: "/reciept",
//   // },
//   // {
//   //   id: 6,
//   //   icon: <ElectricalServicesIcon className="clr" />,
//   //   text: "Journal",
//   //   link: "/newjournal",
//   // },
//   // {
//   //   id: 7,
//   //   icon: <ElectricalServicesIcon className="clr" />,
//   //   text: "Contra",
//   //   link: "/contra",
//   // },
//   // {
//   //   id: 8,
//   //   icon: <ElectricalServicesIcon className="clr" />,
//   //   text: "Integrations",
//   //   link: "/Intigration",
//   // },
//   {
//     id: 9,
//     icon: <ShoppingBagIcon />,
//     text: "Ledger",
//     // link: "/Purchase",
//     subcategories: [
//       {
//         id: 0,
//         text: "Day Book",
//         link: "/daybook",
//       },
//       {
//         id: 1,
//         text: "Account Ledger",
//         link: "/accountledger",
//       },
//       {
//         id: 1,
//         text: "Cash / Bank Book",
//         link: "/cashbook",
//       },
//       {
//         id: 2,
//         text: "Party / Day Book",
//         link: "/partydaybook",
//       },
//     ],
//   },

//   {
//     id: 10,
//     icon: <SignalCellularAltIcon />,
//     text: "Reports",
//     link: "/report/home",
//   },

//   {
//     id: 11,
//     icon: <SignalCellularAltIcon />,
//     text: "Reports",
//     link: "/report/home",
//   },
//   // {
//   //   id: 11,
//   //   icon: <FolderIcon />,
//   //   text: "Documents",
//   //   link: "/Documents",
//   // },
//   {
//     id: 12,
//     icon: <ExitToAppIcon />,
//     text: "Logout",
//     link: "/",
//   },
// ];
// const Sidenav1 = () => {
//   const [open, setOpen] = useState(true);
//   const [navData, setNavData] = useState(navData1);

//   const location = useLocation();

//   const isActive1 = (path) => {
//     return window.location.pathname === path;
//   };
//   const toggleOpen = () => {
//     setOpen(!open);
//   };

//   const toggleCategory = (categoryId) => {
//     setNavData((prevNavData) => {
//       return prevNavData.map((item) => {
//         if (item.id === categoryId) {
//           return {
//             ...item,
//             isExpanded: !item.isExpanded,
//           };
//         }
//         return item;
//       });
//     });
//   };

//   return (
//     <div className="row m-auto mt-2">
//       <div className="ul_sty ">
//         {navData.map((item) => (
//           <li key={item.id}>
//             {item.subcategories && open ? (
//               <div>
//                 <NavLink
//                   className={
//                     isActive1(item.link) ? "sideitem active1" : "sideitem"
//                   }
//                   activeClassName="active1"
//                   to={item.link}
//                   onClick={() => toggleCategory(item.id)}
//                 >
//                   <span onClick={toggleOpen}>{item.icon}</span>
//                   <span className={open ? "linkText" : "linkTextClosed"}>
//                     {item.text}
//                     {item.isExpanded ? (
//                       <ArrowDropDownIcon />
//                     ) : (
//                       <ArrowRightIcon />
//                     )}
//                   </span>
//                 </NavLink>
//                 {item.isExpanded && (
//                   <ul className="pt-2">
//                     {item.subcategories.map((subcategory) => (
//                       <li key={subcategory.id}>
//                         <NavLink
//                           className={
//                             isActive1(subcategory.link)
//                               ? "sideitem active1"
//                               : "sideitem"
//                           }
//                           activeClassName="active1"
//                           to={subcategory.link}
//                         >
//                           <span
//                             className={
//                               open ? "subLinkText" : "subLinkTextClosed"
//                             }
//                           >
//                             {subcategory.text}
//                           </span>
//                         </NavLink>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             ) : (
//               <NavLink
//                 className={
//                   isActive1(item.link) ? "sideitem active1" : "sideitem"
//                 }
//                 activeClassName="active1"
//                 to={item.link}
//               >
//                 {item.icon}
//                 <span className={open ? "linkText" : "linkTextClosed"}>
//                   {item.text}
//                 </span>
//               </NavLink>
//             )}
//           </li>
//         ))}{" "}
//       </div>
//     </div>
//   );
// };

// export default Sidenav1;

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import FolderIcon from "@mui/icons-material/Folder";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useLocation } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
const navData1 = [
  {
    id: 0,
    icon: <HomeIcon />,
    text: "Dashboard",
    link: "/dashboard",
  },
  {
    id: 1,
    icon: <InventoryIcon />,
    text: "Master",

    subcategories: [
      {
        id: 0,
        text: "Item Group",
        link: "/ItemGroup",
      },
      {
        id: 1,
        text: "Items",
        link: "/Items",
      },

      {
        id: 2,
        text: "Account Group",
        link: "/AccountGroup",
      },

      {
        id: 3,
        text: "Account",
        link: "/Account",
      },
      {
        id: 4,
        text: "Vendors",
        link: "/Vendor",
      },
      {
        id: 5,
        text: "skucode",
        link: "/skucode",
      },

      // {
      //   id: 4,
      //   text: "Customers",
      //   link: "/Customer",
      // },

      // {
      //   id: 5,
      //   text: "Vendor",
      //   link: "/Vendor",
      // },
    ],
  },
  {
    id: 2,
    // icon: <ShoppingCartIcon />,
    icon: <ReceiptLongIcon />,
    text: "Sales",
    // link: "/Sales",
    subcategories: [
      // {
      //   id: 0,
      //   text: "Customers",
      //   link: "/Customer",
      // },
      {
        id: 1,
        text: "Sale Invoices",
        link: "/salesinvoices",
      },
      {
        id: 2,
        text: "Quotations ",
        link: "/quotation",
      },
      {
        id: 3,
        text: "Sale Returns ",
        link: "/salesreturn",
      },
      {
        id: 4,
        text: "Sale Orders ",
        link: "/salesorder",
      },
      {
        id: 5,
        text: "Credit Note ",
        link: "/creditnote",
      },
      {
        id: 6,
        text: "Delivery Challan Group",
        link: "/deliverychallangroup",
      },
      {
        id: 7,
        text: "Delivery Challans ",
        link: "/deliverychallans",
      },
    ],
  },
  {
    id: 3,
    icon: <ShoppingBagIcon />,
    text: "Purchases",
    // link: "/Purchase",
    subcategories: [
      {
        id: 0,
        text: "Purchase Invoices",
        link: "/purchaseinvoice",
      },
      {
        id: 1,
        text: "Purchase Returns",
        link: "/purchasereturn",
      },
      {
        id: 2,
        text: "  Purchase Order",
        link: "/purchaseorder",
      },
      {
        id: 3,
        text: "Debit Note",
        link: "/debit",
      },
    ],
  },
  // {
  //   id: 4,
  //   icon: <ElectricalServicesIcon className="clr" />,
  //   text: "Payments",
  //   link: "/payment",
  // },
  // {
  //   id: 5,
  //   icon: <ElectricalServicesIcon className="clr" />,
  //   text: "Reciept",
  //   link: "/reciept",
  // },
  // {
  //   id: 6,
  //   icon: <ElectricalServicesIcon className="clr" />,
  //   text: "Journal",
  //   link: "/newjournal",
  // },
  // {
  //   id: 7,
  //   icon: <ElectricalServicesIcon className="clr" />,
  //   text: "Contra",
  //   link: "/contra",
  // },
  // {
  //   id: 8,
  //   icon: <ElectricalServicesIcon className="clr" />,
  //   text: "Integrations",
  //   link: "/Intigration",
  // },
  {
    id: 9,
    icon: <ShoppingBagIcon />,
    text: "Ledger",
    // link: "/Purchase",
    subcategories: [
      {
        id: 0,
        text: "Day Book",
        link: "/daybook",
      },
      {
        id: 1,
        text: "Account Ledger",
        link: "/accountledger",
      },
      {
        id: 1,
        text: "Cash / Bank Book",
        link: "/cashbook",
      },
      {
        id: 2,
        text: "Party / Day Book",
        link: "/partydaybook",
      },
    ],
  },

  {
    id: 10,
    icon: <SignalCellularAltIcon />,
    text: "Reports",
    link: "/report/home",
  },

  // {
  //   id: 11,
  //   icon: <SignalCellularAltIcon />,
  //   text: "Reports",
  //   link: "/report/home",
  // },
  // {
  //   id: 11,
  //   icon: <FolderIcon />,
  //   text: "Documents",
  //   link: "/Documents",
  // },
  {
    id: 12,
    icon: <ExitToAppIcon />,
    text: "Logout",
    link: "/",
  },
];
const Sidenav1 = () => {
  const [open, setOpen] = useState(true);
  const [navData, setNavData] = useState(navData1);

  const location = useLocation();

  const isActive1 = (path) => {
    return window.location.pathname === path;
  };
  const toggleOpen = () => {
    setOpen(!open);
  };

  const toggleCategory = (categoryId) => {
    setNavData((prevNavData) => {
      return prevNavData.map((item) => {
        if (item.id === categoryId) {
          return {
            ...item,
            isExpanded: !item.isExpanded,
          };
        }
        return item;
      });
    });
  };

  return (
    <div className="row m-auto mt-2">
      <div className="ul_sty ">
        {navData.map((item) => (
          <li key={item.id}>
            {item.subcategories && open ? (
              <div>
                <NavLink
                  className={
                    isActive1(item.link) ? "sideitem active1" : "sideitem"
                  }
                  activeClassName="active1"
                  to={item.link}
                  onClick={() => toggleCategory(item.id)}
                >
                  <span onClick={toggleOpen}>{item.icon}</span>
                  <span className={open ? "linkText" : "linkTextClosed"}>
                    {item.text}
                    {item.isExpanded ? (
                      <ArrowDropDownIcon />
                    ) : (
                      <ArrowRightIcon />
                    )}
                  </span>
                </NavLink>
                {item.isExpanded && (
                  <ul className="pt-2">
                    {item.subcategories.map((subcategory) => (
                      <li key={subcategory.id}>
                        <NavLink
                          className={
                            isActive1(subcategory.link)
                              ? "sideitem active1"
                              : "sideitem"
                          }
                          activeClassName="active1"
                          to={subcategory.link}
                        >
                          <span
                            className={
                              open ? "subLinkText" : "subLinkTextClosed"
                            }
                          >
                            {subcategory.text}
                          </span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <NavLink
                className={
                  isActive1(item.link) ? "sideitem active1" : "sideitem"
                }
                activeClassName="active1"
                to={item.link}
              >
                {item.icon}
                <span className={open ? "linkText" : "linkTextClosed"}>
                  {item.text}
                </span>
              </NavLink>
            )}
          </li>
        ))}{" "}
      </div>
    </div>
  );
};

export default Sidenav1;
