import React, { useState } from 'react'
import { read, utils, writeFile } from 'xlsx'
import groupBy from 'lodash.groupby'
import _, { constant } from 'lodash'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

import DataTable, { ExpanderComponentProps } from 'react-data-table-component';
import ScrollToTop from 'react-scroll-to-top'

import { columnsPower, headingsPower } from '../../utils/constants';

const PowerSlideMapper = () => {
  const [products, setProducts] = useState([])
  const [listName, setListName] = useState<any[]>([])

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
          productsMapped(rows)
        }
      }
      reader.readAsArrayBuffer(file)
    }
  }

  const groupProductsList = (products) => {
    const productsList = [];
    const grouped = _.mapValues(_.groupBy(products, 'Artikelnr')); 
    for (const [key, value] of Object.entries(grouped)) {
      productsList.push(value[0])
    }
    return productsList;
  }


  const productsMapped = (listParam: any) => {
    const mapped = listParam.map((item: any, index: Number) => ({
      ...item,
      description: '',
      stock: item.Bestand === 0 ? null : item.Bestand,
      pvp: null,
      active: 0
    }))

    const productList: any[] = []
    mapped.map((item: any, index: Number) => {
      if (item.stock !== null) {
        productList.push(item)
      }
    })
    setProducts(groupProductsList(productList));
    setListName(groupProductsList(productList));
  }

  const handleExport = () => {
    const headings = [headingsPower]
    const wb = utils.book_new()
    const ws = utils.json_to_sheet([])
    utils.sheet_add_aoa(ws, headings)
    utils.sheet_add_json(ws, products, { origin: 'A2', skipHeader: true })
    utils.book_append_sheet(wb, ws, 'Report')
    writeFile(wb, 'products_Powerslide.csv')
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
                    columns={columnsPower}
                    data={listName}
                    expandableRows 
                    expandableRowsComponent={ExpandedComponent}
                    highlightOnHover={true}
                    selectableRows
                    onSelectedRowsChange={handleChange}
                    pagination
                    paginationPerPage={100}
                    paginationRowsPerPageOptions={[100, 200, 500]}
                    persistTableHead={true}
                    pointerOnHover={true}
                    striped={true}
                    title="POWERSLIDE"
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

export default PowerSlideMapper
