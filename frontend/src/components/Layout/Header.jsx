import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import profileImg from "../../assets/images/profileImg.jpg";
import ProfileDropdown from "../auth/ProfileDropdown";

const Header = ({ handleSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen);
  });
  return (
    <div className="h-[70px] bg-rose-500 flex items-center justify-between px-4">
      <div className="text-2xl font-bold text-white cursor-pointer">
        <AiOutlineMenu onClick={handleSidebar} />
      </div>
      <div className="relative pr-3 pb-4">
        <img
          src={profileImg}
          alt="profile"
          className="w-8 rounded-2xl bg-white cursor-pointer"
          onClick={handleToggle}
        />
        {isOpen && <ProfileDropdown />}
      </div>
    </div>
  );
};

export default Header;
