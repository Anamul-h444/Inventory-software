import React from "react";
import { FiLayers } from "react-icons/fi";
import { RiDashboardLine } from "react-icons/ri";
import Accordion from "../../utility/Accordion";
import { sidebarItems } from "../../components/Layout/SidebarMenu";
import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <div className="h-full w-60 ">
      {/* Logo Start */}
      <div className="flex justify-center items-center mx-auto h-[70px]">
        <div className="bg-rose-500 rounded-full inline-block p-3">
          <span className="text-4xl text-white">
            <FiLayers />
          </span>
        </div>
      </div>
      {/* Logo End */}

      {/* NavLink Start */}
      <div className="pl-4 mt-10">
        <div className="flex items-center space-x-4 border p-[6px] rounded-md">
          <span>
            <RiDashboardLine className="text-lg" />
          </span>
          <Link to="/layout">
            <span className="text-sm">Dashboard</span>
          </Link>
        </div>
        {sidebarItems.map((items) => (
          <Accordion key={items.title} items={items} />
        ))}
      </div>
      {/* NavLink End */}
    </div>
  );
};

export default SideNav;
