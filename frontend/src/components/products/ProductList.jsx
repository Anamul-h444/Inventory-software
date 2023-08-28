import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { productListService } from "../../api/ApiProduct";
import Loader from "../../utility/Loader";
import { Pagination } from "../../utility/PaginationService";
import { DeleteAlert } from "../../utility/DeleteAlert";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const navigate = useNavigate();
  //Supplier data state
  const [pageNo, setPageNo] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [searchKey, setSearchKey] = useState(0);

  //Data from redux store
  const isLoading = useSelector((state) => state.loader.value);
  const product = useSelector((state) => state.product.List);
  const totalProduct = useSelector((state) => state.product.ListTotal);

  //Call Api
  useEffect(() => {
    (async () => {
      await productListService(pageNo, perPage, searchKey);
    })();
  }, [pageNo]);

  //Update state with onChange
  const handlePerPage = async (e) => {
    setPerPage(e.target.value);
    await productListService(pageNo, e.target.value, searchKey);
  };
  const handleSearchKey = async (e) => {
    setSearchKey(e.target.value);
    if (e.target.value === 0) {
      await productListService(pageNo, perPage, searchKey);
    }
  };
  const clickSearch = async () => {
    await productListService(pageNo, perPage, searchKey);
  };

  //Pagination functionality
  const totalData = totalProduct ? totalProduct[0].total : 0;
  const total = Math.ceil(totalData / perPage);

  const onPageChange = (value) => {
    if (value === "first" || value === "...") {
      setPageNo(1);
    } else if (value === "backward") {
      if (pageNo !== 1) {
        setPageNo(pageNo - 1);
      }
    } else if (value === "forward") {
      if (pageNo !== total) {
        setPageNo(pageNo + 1);
      }
    } else if (value === "last" || value === "...") {
      setPageNo(total);
    } else {
      setPageNo(value);
    }
  };

  //Delete Supplier
  // const deleteHandler = async (id) => {
  //   let result = await DeleteAlert();
  //   if (result.isConfirmed) {
  //     let deleteResult = await deleteExpenseRequest(id);
  //     if (deleteResult) {
  //       await productListService(pageNo, perPage, searchKey);
  //     }
  //   }
  // };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="w-full h-full flex justify-center mt-10">
        <div className="w-[95%] bg-white rounded-md shadow-md p-4">
          <div className="flex items-center justify-between">
            <div className="font-bold text-gray-500 text-sm">
              <h1 className="text-lg font-[400] ">Products list</h1>{" "}
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
                  <th>Category</th>
                  <th>Brand</th>
                  <th>Product Name</th>
                  <th>Unit</th>
                  <th>Details</th>
                  <th>Action</th>
                </tr>
              </thead>
              {product.map((product, index) => (
                <tbody key={index}>
                  {console.log(product)}
                  <tr>
                    <th>{index + 1}</th>
                    <td>{product.category[0]["name"]}</td>
                    <td>{product.brand[0]["name"]}</td>
                    <td>{product.name}</td>
                    <td>{product.unit}</td>
                    <td>{product.details}</td>
                    <td className="flex space-x-3 items-center">
                      <span
                        className="bg-cyan-200 p-[3px] text-lg shadow-sm cursor-pointer tooltip tooltip-warning"
                        data-tip="Update"
                        onClick={() =>
                          navigate(`/product/update/${product._id}`)
                        }
                      >
                        <FaRegEdit />
                      </span>
                      <span
                        className="bg-rose-200 p-[3px] text-lg shadow-sm cursor-pointer tooltip tooltip-error"
                        data-tip="Delete"
                        onClick={() => deleteHandler(expense._id)}
                      >
                        <RiDeleteBinLine />
                      </span>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
            {/* pagination */}
            <Pagination
              totalPage={total}
              page={pageNo}
              limit={perPage}
              siblings={1}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
