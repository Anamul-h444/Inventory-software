import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";
import Loader from "../../utility/Loader";
import { customerListService } from "../../api/ApiCustomer";

const CustomerList = () => {
  const [perPage, setPerPage] = useState(5);
  const [searchKey, setSearchKey] = useState(0);

  const customers = useSelector((state) => state.customer.List);
  const totalCustomer = useSelector((state) => state.customer.ListTotal);
  const isLoading = useSelector((state) => state.loader.value);

  useEffect(() => {
    customerListService(1, perPage, searchKey);
  }, []);

  const handlePerPage = (e) => {
    console.log(e);
    setPerPage(e.target.value);
    customerListService(1, e.target.value, searchKey);
  };
  const handleSearchKey = (e) => {
    setSearchKey(e.target.value);
    if (e.target.value === 0) {
      customerListService(1, perPage, searchKey);
    }
  };
  const clickSearch = () => {
    customerListService(1, perPage, searchKey);
  };
  return (
    <>
      <div className="w-full h-full flex justify-center mt-10">
        <div className="w-[95%] bg-white rounded-md shadow-md p-4">
          <div className="flex items-center justify-between">
            <div className="font-bold text-gray-500 text-sm">
              <h1 className="text-lg font-[400] ">Customer list</h1>{" "}
              {/* Updated heading style */}
            </div>
            <div className="flex space-x-3 items-center">
              <div>
                <button className="p-3 border border-gray-300 rounded-md cursor-auto text-[15px] font-[400] text-slate-500">
                  Text Filter
                </button>
              </div>
              <div>
                <select
                  className="select border border-gray-300 w-full max-w-xs text-[15px] font-[400] text-slate-500 "
                  onChange={handlePerPage}
                >
                  <option disabled value="disabled">
                    Select Per Pages
                  </option>
                  <option value="5">05 Per Page</option>
                  <option value="10">10 Per Page</option>
                  <option value="20">20 Per Page</option>
                  <option value="30">30 Per Page</option>
                  <option value="40">40 Per Page</option>
                  <option value="50">50 Per Page</option>
                </select>
              </div>
              <div>
                <div className="form-control relative">
                  <input
                    type="text"
                    placeholder="Search"
                    className="input input-bordered w-24 md:w-auto font-[400] text-[15px]"
                    onChange={handleSearchKey}
                  />
                  <button
                    onClick={clickSearch}
                    className="absolute top-0 right-0 bg-rose-500 h-[46px] w-12 rounded-r-md hover:bg-rose-400 transition duration-300 "
                  >
                    <BsSearch className="text-lg ml-3 text-white font-extrabold" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Table Start */}
          <div className="overflow-x-auto mt-10">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone No</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              {customers.map((customer, index) => (
                <tbody key={customer._id}>
                  {/* row 1 */}
                  <tr>
                    <th>{index + 1}</th>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.address}</td>
                    <td className="flex space-x-3 items-center">
                      <span
                        className="bg-cyan-200 p-[3px] text-lg shadow-sm cursor-pointer tooltip tooltip-warning"
                        data-tip="Update"
                      >
                        <FaRegEdit />
                      </span>
                      <span
                        className="bg-rose-200 p-[3px] text-lg shadow-sm cursor-pointer tooltip tooltip-error"
                        data-tip="Delete"
                      >
                        <RiDeleteBinLine />
                      </span>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
      {isLoading && <Loader />}
    </>
  );
};

export default CustomerList;