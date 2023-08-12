import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { PiUserLight } from "react-icons/pi";
import profileImg from "../../assets/images/profileImg.jpg";
import { removeSessions } from "../../router/sessionHelper";

const ProfileDropdown = () => {
  const navigate = useNavigate();

  const handleSignout = () => {
    removeSessions();
  };

  return (
    <div className="w-48 h-56 bg-white rounded-md absolute top-11 right-0 shadow-md divide-y">
      <div className="flex flex-col justify-center items-center mt-3 space-y-3 mb-2 ">
        <img
          src={profileImg}
          alt="profile"
          className="w-12 rounded-2xl ring ring-rose-500"
        />
        <h1 className="font-bold text-gray-600">Anamul</h1>
      </div>
      <div className="flex flex-col p-4 space-y-4 ">
        <Link to="/profile">
          <div className="flex w-full items-center space-x-3 cursor-pointer hover:bg-slate-100 hover:rounded-sm p-[3px] transition">
            <span>
              <PiUserLight className="text-md" />
            </span>
            <p>Profile</p>
          </div>
        </Link>
        <div
          onClick={handleSignout}
          className="flex w-full items-center space-x-3 cursor-pointer  hover:bg-slate-100 hover:rounded-sm p-[3px] transition"
        >
          <span>
            <AiOutlineLogout />
          </span>
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;
