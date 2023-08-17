import {
  AiOutlineBank,
  AiOutlineLogout,
  AiOutlineMenu,
  AiOutlineUser,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import {
  BsBagPlus,
  BsBagX,
  BsBox,
  BsCartPlus,
  BsCircle,
  BsGraphUp,
  BsPeople,
} from "react-icons/bs";
import { RiDashboardLine } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";

export const sidebarItems = [
  // {
  //   title: "Dashboard",
  //   icon: <RiDashboardLine className="text-lg" />,
  //   url: "/user/dashboard",
  //   subMenu: [],
  // },
  {
    title: "Customer",
    icon: <BsPeople className="text-lg" />,
    url: "/Customer",
    subMenu: [
      {
        title: "New Customer",
        icon: <BsCircle size={12} className="side-bar-subitem-icon" />,
        url: "/customer/create",
      },
      {
        title: "Customer List",
        icon: <BsCircle size={12} className="side-bar-subitem-icon" />,
        url: "/customer/list",
      },
    ],
  },
  {
    title: "Supplier",
    icon: <TbTruckDelivery className="text-lg" />,
    url: "/Supplier",
    subMenu: [
      {
        title: "New Supplier",
        icon: <BsCircle size={12} className="side-bar-subitem-icon" />,
        url: "/supplier/create",
      },
      {
        title: "Supplier List",
        icon: <BsCircle size={12} className="side-bar-subitem-icon" />,
        url: "/supplier/list",
      },
    ],
  },
  {
    title: "Expense",
    icon: <AiOutlineBank className="text-lg" />,
    url: "/Expense",
    subMenu: [
      {
        title: "New Expense Type",
        icon: <BsCircle size={12} className="side-bar-subitem-icon" />,
        url: "/expenseType/create",
      },
      {
        title: "Expense Type List",
        icon: <BsCircle size={12} className="side-bar-subitem-icon" />,
        url: "/expenseType/list",
      },
      {
        title: "New Expense",
        icon: <BsCircle size={12} className="side-bar-subitem-icon" />,
        url: "/expense/create",
      },
      {
        title: "Expense List",
        icon: <BsCircle size={12} className="side-bar-subitem-icon" />,
        url: "/expense/list",
      },
    ],
  },
  {
    title: "Product",
    icon: <BsBox className="text-lg" />,
    url: "/Product",
    subMenu: [
      {
        title: "New Brand",
        icon: <BsCircle size={12} className="side-bar-subitem-icon" />,
        url: "/brand/create",
      },
      {
        title: "Brand List",
        icon: <BsCircle size={12} className="side-bar-subitem-icon" />,
        url: "/brand/list",
      },
      {
        title: "New Category",
        icon: <BsCircle size={12} className="side-bar-subitem-icon" />,
        url: "/category/create",
      },
      {
        title: "Category List",
        icon: <BsCircle size={12} className="side-bar-subitem-icon" />,
        url: "/category/list",
      },
      {
        title: "New Product",
        icon: <BsCircle size={12} className="side-bar-subitem-icon" />,
        url: "/product/create",
      },
      {
        title: "Product List",
        icon: <BsCircle size={12} className="side-bar-subitem-icon" />,
        url: "/product/list",
      },
    ],
  },
  {
    title: "Purchase",
    icon: <BsBagPlus className="text-lg" />,
    url: "/Purchase",
    subMenu: [
      {
        title: "New Purchase",
        icon: <BsCircle size={12} />,
        url: "/purchase/create",
      },
      {
        title: "Purchase List",
        icon: <BsCircle size={12} className="side-bar-subitem-icon" />,
        url: "/purchase/list",
      },
    ],
  },
  {
    title: "Sale",
    icon: <BsCartPlus className="text-lg" />,
    url: "/Sale",
    subMenu: [
      {
        title: "New Sale",
        icon: <BsCircle size={12} className="side-bar-subitem-icon" />,
        url: "/sale/create",
      },
      {
        title: "Sale List",
        icon: <BsCircle size={12} className="side-bar-subitem-icon" />,
        url: "/sale/list",
      },
    ],
  },
  {
    title: "Return",
    icon: <BsBagX className="text-lg" />,
    url: "/Return",
    subMenu: [
      {
        title: "New Return",
        icon: <BsCircle size={12} className="side-bar-subitem-icon" />,
        url: "/return/create",
      },
      {
        title: "Return List",
        icon: <BsCircle size={12} className="side-bar-subitem-icon" />,
        url: "/return/list",
      },
    ],
  },
  {
    title: "Report",
    icon: <BsGraphUp className="text-lg" />,
    url: "/Report",
    subMenu: [
      {
        title: "Sale Report",
        icon: <BsCircle size={12} className="side-bar-subitem-icon" />,
        url: "/SaleReportPage",
      },
      {
        title: "Return Report",
        icon: <BsCircle size={12} className="side-bar-subitem-icon" />,
        url: "/ReturnReportPage",
      },
      {
        title: "Purchase Report",
        icon: <BsCircle size={12} className="side-bar-subitem-icon" />,
        url: "/PurchaseReportPage",
      },
      {
        title: "Expense Report",
        icon: <BsCircle size={12} className="side-bar-subitem-icon" />,
        url: "/ExpenseReportPage",
      },
    ],
  },
];
