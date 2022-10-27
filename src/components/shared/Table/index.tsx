import React, { useState } from "react";

import useTable from "../../../utils/hooks";
import "./styles.css";
import TableFooter from "../TableFooter";

const Table = ({ data, rowsPerPage, headers, dataItems }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);

  return (
    <>
      <table className="table">
        <thead className="tableRowHeader">
          <tr>
            {headers.map(item => <th key={item} className="tableHeader">{item}</th>)}
          </tr>
        </thead>
        <tbody>
          {slice.map((el, index) => (
            <tr className="tableRowItems" key={index}>
              {/* <td>{`${index}-${page}-${range}`}</td> */}
              {dataItems.map((items) => (
                <>
                  <td key={index} className="tableCell">{el[items]}</td>
                </>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default Table;