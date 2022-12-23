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

import { columnsShop, headingsShop } from '../../utils/constants';

import './styles.css'

const ShopMapper = () => {
  const [products, setProducts] = useState([])
  const [listName, setListName] = useState([])
  const [pending, setPending] = useState<boolean>(true);

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
          setListName(addReference(rows));

        }
      }
      reader.readAsArrayBuffer(file)
    }
  }

  const addReference = (products:[]) => {
    const productsList: any[] = []
    products.map((item, index) => {
      productsList.push({
        id: item['Product ID'],
        url: item.Imagen,
        nombre: item.Nombre,
        categoria: item['CategorÃ­a'],
        precio:item['Precio (imp. incl.)'],
        cantidad: item.Cantidad,
        activo: !item.Estado,
        reference: item.Referencia,
        condition: 'new'
      })
    });
    setPending(false);
    return productsList;
  }

  const handleExport = () => {
    const headings = [headingsShop]
    const wb = utils.book_new()
    const ws = utils.json_to_sheet([])
    utils.sheet_add_aoa(ws, headings)
    utils.sheet_add_json(ws, productsList, { origin: 'A2', skipHeader: true })
    utils.book_append_sheet(wb, ws, 'Report')
    writeFile(wb, 'products_rg360.csv')
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

  console.log('%c listName', 'color: #007acc;', listName);
  
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
                    columns={columnsShop}
                    data={listName}
                    expandableRows 
                    expandableRowsComponent={ExpandedComponent}
                    highlightOnHover={true}
                    onSelectedRowsChange={handleChange}
                    pagination
                    paginationPerPage={100}
                    paginationRowsPerPageOptions={[100, 200, 500]}
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

export default ShopMapper;
