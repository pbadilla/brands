import React, { FC, useState, useEffect } from 'react'

import { read, utils, writeFile } from 'xlsx'
import groupBy from 'lodash.groupby'
import _, { constant } from 'lodash'
import ScrollToTop from 'react-scroll-to-top'
import DataTable, { ExpanderComponentProps } from 'react-data-table-component';

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

import Loader from '../shared/Loader';

import { columnsRollerblade, headingsRollerblade } from '../../utils/constants';

import './styles.css'

const OtherMapper = () => {
  const [products, setProducts] = useState([])
  const [listName, setListName] = useState([])
	const [rows, setRows] = useState([]);
  const [pending, setPending] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const handleImport = ($event) => {
    const files = $event.target.files
    if (files.length) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = (event) => {
        const wb = read(event.target.result)

        const sheets = wb.SheetNames

        if (sheets.length > 0) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]])
          const finalProducts = addActiveStatus(rows);
          setProducts(groupProductsList(finalProducts));
          setListName(groupProductsList(finalProducts));
        }
      }
      reader.readAsArrayBuffer(file)
    }
  }

  const addActiveStatus = (products) => {
    const productsList = []
    products.map((item, index) => {
      productsList.push({
        ...item,
        id: index,
        active: 0
      })
    })
    return productsList;
  }

  const groupProductsList = (products) => {
    const productsList = [];
    const grouped = _.mapValues(_.groupBy(products, 'ArtCodigo')); 
    for (const [key, value] of Object.entries(grouped)) {
      productsList.push(value[0])
    }
    setPending(false);
    return productsList;
  }

  const handleExport = () => {
    const headings = [headingsRollerblade]
    const wb = utils.book_new()
    const ws = utils.json_to_sheet([])
    utils.sheet_add_aoa(ws, headings)
    utils.sheet_add_json(ws, products, { origin: 'A2', skipHeader: true })
    utils.book_append_sheet(wb, ws, 'Report')
    writeFile(wb, 'products_Rollerblade.csv')
  }

  type DataRow = {
    description: string;
    name: string;
    brand: string;
  };
  // data provides access to your row data
  const ExpandedComponent: FC<ExpanderComponentProps<DataRow>> = ({ data }) => {
    const unsortedMap = Object.entries(data);
    const unsortedArray = [...unsortedMap];
    const sortedArray = unsortedArray.sort();
    const sortedData = Object.fromEntries(sortedArray);
    return <pre>{JSON.stringify(sortedData, null, 2)}</pre>;
  };

  const handleChange = ({ selectedRows }) => {
    // You can set state or dispatch with something like Redux so we can use the retrieved data
    console.log('Selected Rows: ', selectedRows);
  };
  
  return (
    <>
      <Container fluid>
          <Row>
              <Col className="centerRow">
                  <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Cargar CSV</Form.Label>
                      <Form.Control type="file" required onChange={handleImport} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                  </Form.Group>
              </Col>
              { listName.length > 0 &&
                  <>
                      <Col>
                          <Button type="button" variant="outline-primary" onClick={handleExport}>
                              Export Products
                          </Button>
                      </Col>
                      <Col>
                          <Button type="button" variant="outline-primary" onClick={handleExport}>
                              Export Combinations
                          </Button>
                      </Col>
                  </>
              }
          </Row>
      </Container>
      <Container className="mt-4" fluid>
          <Row>
              <Col>
              { listName.length > 0 
              ? (
                <>
                  <DataTable
                    columns={columnsRollerblade}
                    data={listName}
                    expandableRows 
                    expandableRowsComponent={ExpandedComponent}
                    highlightOnHover={true}
                    onSelectedRowsChange={handleChange}
                    pagination
                    paginationPerPage={30}
                    paginationRowsPerPageOptions={[30, 50, 100]}
                    persistTableHead={true}
                    pointerOnHover={true}
                    progressComponent={<Loader />}
                    progressPending={pending}
                    selectableRows
                    striped={true}
                    title="ROLLERBLADE"

                  />
                  <ScrollToTop smooth />
                </>
              ) 
              : <span>En espera de que se carguen los datos ...</span>
              }
              </Col>
          </Row>
      </Container>
    </>
  )
}

export default OtherMapper
