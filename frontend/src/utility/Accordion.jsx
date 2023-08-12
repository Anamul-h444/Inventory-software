import React, { useState } from "react";
import { FiLayers, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const Accordion = ({ items }) => {
  const [active, setActive] = useState(false);
  const handleActive = () => {
    setActive(!active);
  };

  return (
    <div
      className={`${
        active
          ? "overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
          : ""
      }`}
    >
      <div className="flex flex-col my-4 justify-center items-center w-full">
        <div
          className={` bg-white p-2 border border-[#c9c6c655] rounded-md w-[220px] group ${
            active ? "is-active" : ""
          }  duration-500`}
        >
          <div className="flex items-center">
            <div className="w-full text-sm group-[.is-active]:font-bold flex space-x-4 items-center">
              <span>{items.icon}</span> <p>{items.title}</p>
            </div>
            <div
              onClick={handleActive}
              className="text-xl rotate-90 group-[.is-active]:rotate-[270deg] duration-500 cursor-pointer"
            >
              <FiChevronRight />
            </div>
          </div>
          {items.subMenu.map((menus) => {
            return (
              <div
                className="overflow-hidden max-h-0 group-[.is-active]:max-h-[100px] duration-500 flex flex-col space-y-2 hover:bg-slate-200"
                key={menus.title}
              >
                <Link
                  to={menus.url}
                  className="flex items-center space-x-2 pl-5 my-2 cursor-pointer"
                >
                  <span>{menus.icon}</span>
                  <p className="text-sm">{menus.title}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Accordion;

{
  /* <div
            className={`overflow-hidden max-h-0 group-[.is-active]:max-h-[100px] duration-500 flex flex-col space-y-2 ${
              active ? "overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100" : ""
            }`}
          ></div> */
}
