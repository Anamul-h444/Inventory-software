import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";
import Loader from "../../utility/Loader";
import { customerListService } from "../../api/ApiCustomer";

const CustomerList = () => {
  const [pageNo, setPageNo] = useState(2);
  const [perPage, setPerPage] = useState(5);
  const [searchKey, setSearchKey] = useState(0);

  const customers = useSelector((state) => state.customer.List);
  const totalCustomer = useSelector((state) => state.customer.ListTotal);
  const isLoading = useSelector((state) => state.loader.value);

  useEffect(() => {
    customerListService(pageNo, perPage, searchKey);
  }, []);

  const handlePerPage = (e) => {
    setPerPage(e.target.value);
    customerListService(pageNo, e.target.value, searchKey);
  };
  const handleSearchKey = (e) => {
    setSearchKey(e.target.value);
    if (e.target.value === 0) {
      customerListService(pageNo, perPage, searchKey);
    }
  };
  const clickSearch = () => {
    customerListService(pageNo, perPage, searchKey);
  };

  // Pagination code
  const skipRow = function (page, limit) {
    let array = [];
    const startIndex = (page - 1) * limit;
    const endIndex = Math.min(startIndex + limit, customers.length);

    for (let i = startIndex; i < endIndex; i++) {
      array.push(customers[i]);
    }

    return array;
  };
  skipRow(pageNo, perPage);
  // Extract the total number of customers from the totalCustomer array
  const totalCustomersFromBackend =
    totalCustomer.length > 0 ? totalCustomer[0].total : 0;

  // Calculate the total number of pages based on the total number of customers from the backend and items per page.
  const totalPages = Math.ceil(totalCustomersFromBackend / perPage);
  console.log(totalCustomer);
  console.log(totalPages);

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
            {/* paginatio */}
            <div className="join">
              <button className="join-item btn">&laquo;</button>
              <button className="join-item btn">&lsaquo;</button>
              <button className="join-item btn">&rsaquo;</button>
              <button className="join-item btn">&raquo;</button>
            </div>
          </div>
        </div>
      </div>
      {isLoading && <Loader />}
    </>
  );
};

export default CustomerList;
