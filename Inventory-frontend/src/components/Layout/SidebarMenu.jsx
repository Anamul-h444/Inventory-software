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
        url: "/CustomerCreateUpdatePage",
      },
      {
        title: "Customer List",
        icon: <BsCircle size={12} className="side-bar-subitem-icon" />,
        url: "/CustomerListPage",
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
        url: "/SupplierCreateUpdatePage",
      },
      {
        title: "Supplier List",
        icon: <BsCircle size={12} className="side-bar-subitem-icon" />,
        url: "/SupplierListPage",
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
        url: "/ExpenseTypeCreateUpdatePage",
      },
      {
        title: "Expense Type List",
        icon: <BsCircle size={12} className="side-bar-subitem-icon" />,
        url: "/ExpenseTypeListPage",
      },
      {
        title: "New Expense",
        icon: <BsCircle size={12} className="side-bar-subitem-icon" />,
        url: "/ExpenseCreateUpdatePage",
      },
      {
        title: "Expense List",
        icon: <BsCircle size={12} className="side-bar-subitem-icon" />,
        url: "/ExpenseListPage",
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
        url: "/BrandCreateUpdatePage",
      },
      {
        title: "Brand List",
        icon: <BsCircle size={12} className="side-bar-subitem-icon" />,
        url: "/BrandListPage",
      },
      {
        title: "New Category",
        icon: <BsCircle size={12} className="side-bar-subitem-icon" />,
        url: "/CategoryCreateUpdatePage",
      },
      {
        title: "Category List",
        icon: <BsCircle size={12} className="side-bar-subitem-icon" />,
        url: "/CategoryListPage",
      },
      {
        title: "New Product",
        icon: <BsCircle size={12} className="side-bar-subitem-icon" />,
        url: "/ProductCreateUpdatePage",
      },
      {
        title: "Product List",
        icon: <BsCircle size={12} className="side-bar-subitem-icon" />,
        url: "/ProductListPage",
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
        url: "/PurchaseCreateUpdatePage",
      },
      {
        title: "Purchase List",
        icon: <BsCircle size={12} className="side-bar-subitem-icon" />,
        url: "/PurchaseListPage",
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
        url: "/SalesCreateUpdatePage",
      },
      {
        title: "Sale List",
        icon: <BsCircle size={12} className="side-bar-subitem-icon" />,
        url: "/SalesListPage",
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
        url: "/ReturnCreateUpdatePage",
      },
      {
        title: "Return List",
        icon: <BsCircle size={12} className="side-bar-subitem-icon" />,
        url: "/ReturnListPage",
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
