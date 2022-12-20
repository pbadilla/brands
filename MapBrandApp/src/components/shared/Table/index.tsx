import React, { useState } from 'react'

import useTable from '../../../utils/hooks'
import './styles.css'
import Form from 'react-bootstrap/Form'
import TableFooter from '../TableFooter'

interface valuesTable {
  headers: string[]
  dataItems: string[]
  rowsPerPage: number
  data: string[]
}

const Table = ({ headers, dataItems, rowsPerPage, data }: valuesTable) => {
  const [page, setPage] = useState(1)
  const { slice, range } = useTable(data, page, rowsPerPage)

  return (
    <>
      <Form>
        <table className="table">
          <thead className="tableRowHeader">
            <tr>
              {headers.map(item => <th key={item} className="tableHeader">{item}</th>)}
            </tr>
          </thead>
          <tbody>
            {slice.map((el, index) => (
              <tr className="tableRowItems" key={index}>
                {dataItems.map((items) => (
                  <>
                    <td key={index} className="tableCell">
                      <Form.Control type="text" placeholder="" defaultValue={el[items]} />
                    </td>
                  </>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
      </Form>
    </>
  )
}

export default Table
