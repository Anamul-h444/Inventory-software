import SideNav from "./SideNav";
import Header from "./Header";
import { useEffect, useState } from "react";

const MainLayout = ({ children, title = "Title" }) => {
  const [open, setOpen] = useState(true);
  const handleSidebar = () => {
    setOpen(!open);
  };
  useEffect(() => {
    document.title = title;
  }, []);
  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-64" : "w-0 "
        } bg-white h-screen duration-300 overflow-x-hidden`}
      >
        <SideNav />
      </div>
      <div className="h-screen flex-1 bg-red-100">
        {/* Header */}
        <Header handleSidebar={handleSidebar} />
        <div>{children}</div>
      </div>
    </div>
  );
};
export default MainLayout;
