import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../utility/Loader";
import { setLoader } from "../../redux/slice-slate/loaderSlice";
import Input from "../../utility/Input";
import { getUserDetails, updateProfileRequest } from "../../api/ApiAuth";
import {
  isEmpty,
  isEmail,
  isMobile,
  isPassword,
} from "../../utility/formHelper";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loader.value);
  const userData = useSelector((state) => state.profile.value);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
  });
  const { firstName, lastName, email, password, mobile } = user;

  useEffect(() => {
    if (userData) {
      setUser({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        password: userData.password || "",
        mobile: userData.mobile || "",
      });
      dispatch(setLoader(false));
    }
  }, [userData]);

  useEffect(() => {
    (async () => {
      await getUserDetails();
    })();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(firstName)) {
      toast.error("First Name Required!");
    } else if (isEmpty(lastName)) {
      toast.error("Last Name Required!");
    } else if (isEmail(email)) {
      toast.error("Invalid Email!");
    } else if (isMobile(mobile)) {
      toast.error("Invalid Mobile No!");
    } else if (isPassword(password)) {
      toast.error(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
    } else {
      let result = await updateProfileRequest(userData && userData._id, user);
      if (result === true) {
        navigate("/");
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full mt-10 flex justify-center">
      <div className="w-[90%]  bg-white shadow-md rounded-md p-5 ">
        <h1 className="font-bold text-gray-500 text-center my-4">
          User Profile
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-9">
            <div className="grid grid-cols-3 gap-4">
              <Input
                type="text"
                label="First Name"
                name="firstName"
                onChange={handleChange}
                value={firstName}
              />
              <Input
                type="text"
                label="Last Name"
                name="lastName"
                onChange={handleChange}
                value={lastName}
              />
              <Input
                type="email"
                label="Email"
                name="email"
                onChange={handleChange}
                value={email}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Input
                type="password"
                label="Password"
                name="password"
                onChange={handleChange}
                value={password}
              />
              <Input
                type="text"
                label="Mobile No"
                name="mobile"
                onChange={handleChange}
                value={mobile}
              />
              <Input type="file" label="Photo" name="photo" />
            </div>

            <div className="w-full flex justify-center mt-12 pb-4 ">
              <button className="w-48 py-3 bg-rose-500 text-white mx-auto rounded-md hover:-translate-y-1 focus:translate-y-1 disabled:cursor-not-allowed">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
