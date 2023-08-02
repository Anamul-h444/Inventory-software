// Pagination code
export const getData = function (page, limit, data) {
  let array = [];
  const startIndex = (page - 1) * limit;
  const endIndex = Math.min(startIndex + limit, data.length);

  for (let i = startIndex; i < endIndex; i++) {
    array.push(data[i]);
  }

  return array;
};

import _ from "lodash";

export const paginationRange = (totalPage, page, limit, siblings) => {
  let totalPageNoInArray = 1 + siblings;
  if (totalPageNoInArray >= totalPage) {
    return _.range(1, totalPage + 1);
  }

  let leftSiblingsIndex = Math.max(page - siblings, 1);
  let rightSiblingsIndex = Math.min(page + siblings, totalPage);

  // let showLeftDots = leftSiblingsIndex > 2
  // let showRightDots = rightSiblingsIndex < totalPage -2
  let showLeftDots = leftSiblingsIndex > 3; // Adjusted this condition
  let showRightDots = rightSiblingsIndex < totalPage - 2; // Adjusted this condition

  if (!showLeftDots && showRightDots) {
    let leftItemsCount = 3 + 2 * siblings;
    let leftRange = _.range(1, leftItemsCount + 1);
    return [...leftRange, "...", totalPage];
  } else if (showLeftDots && !showRightDots) {
    let rightItemsCount = 3 + 2 * siblings;
    let rightRange = _.range(totalPage - rightItemsCount + 1, totalPage + 1);
    return [1, "...", ...rightRange];
  } else {
    let middleRange = _.range(leftSiblingsIndex, rightSiblingsIndex + 1);
    return [1, "...", ...middleRange, "...", totalPage];
  }
};

export const Pagination = ({
  totalPage,
  page,
  limit,
  siblings,
  onPageChange,
}) => {
  let arr = paginationRange(totalPage, page, limit, siblings);
  return (
    <nav className="flex items-center justify-center mt-8">
      <ul className="flex space-x-2">
        <li>
          <button
            onClick={() => onPageChange("first")}
            className="px-3 py-2 rounded-lg bg-white text-gray-700 font-semibold border border-gray-300"
          >
            {"<<"}
          </button>
        </li>
        <li>
          <button
            onClick={() => onPageChange("backward")}
            className="px-3 py-2 rounded-lg bg-white text-gray-700 font-semibold border border-gray-300"
          >
            {"<"}
          </button>
        </li>
        {arr.map((value, index) => {
          if (value === page) {
            return (
              <li>
                <button
                  onClick={() => onPageChange(value)}
                  key={index}
                  className="active active:bg-gray-400 px-3 py-2 rounded-lg bg-white text-gray-700 font-semibold border-t border-b border-gray-300"
                >
                  {value}
                </button>
              </li>
            );
          } else {
            return (
              <li>
                <button
                  onClick={() => onPageChange(value)}
                  key={value}
                  className="px-3 py-2 rounded-lg bg-white text-gray-700 font-semibold border-t border-b border-gray-300"
                >
                  {value}
                </button>
              </li>
            );
          }
        })}
        <li>
          <button
            onClick={() => onPageChange("forward")}
            className="px-3 py-2 rounded-lg bg-white text-gray-700 font-semibold border border-gray-300"
          >
            {">"}
          </button>
        </li>
        <li>
          <button
            onClick={() => onPageChange("last")}
            className="px-3 py-2 rounded-lg bg-white text-gray-700 font-semibold border border-gray-300"
          >
            {">>"}
          </button>
        </li>
      </ul>
    </nav>
  );
};
