import React, { FC, useState, useEffect } from 'react'

import CsvDownloadButton from 'react-json-to-csv'

import { read, utils, writeFile } from 'xlsx'
import ScrollToTop from 'react-scroll-to-top'
import DataTable, { ExpanderComponentProps } from 'react-data-table-component';

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

import { columnsSeba, headingsSebaDiary, headingsSebaCombinations } from '../../utils/constants';
import { sizesAndColorOfProducts } from '../../utils/utils';

import './styles.css'

const SebaMapper = () => {
  const [products, setProducts] = useState([])
  const [productsForCombinations, setProductsForCombinations] = useState([])
  const [listName, setListName] = useState([])
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
          extractColorAndSizes(rows);
        }
      }
      reader.readAsArrayBuffer(file)
    }
  }

  const handleExport = () => {
    const headings = [headingsSebaDiary];
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, products, { origin: 'A2', skipHeader: true });
    utils.book_append_sheet(wb, ws, 'Report');
    utils.sheet_to_csv(ws, { FS: ";"})
    writeFile(wb, 'products_seba_diary.csv');
    handleExportCombinations();
  }

  const handleExportCombinations = () => {
    const headings = [headingsSebaCombinations]
    const wb = utils.book_new()
    const ws = utils.json_to_sheet([])
    utils.sheet_add_aoa(ws, headings)
    utils.sheet_add_json(ws, productsForCombinations, { origin: 'A2', skipHeader: true })
    utils.book_append_sheet(wb, ws, 'Report')
    utils.sheet_to_csv(ws, { FS: ";"})
    writeFile(wb, 'products_seba_diary_combinations.csv')
  }

  const normalizeReference = (reference:string) => {
    if(reference && reference.slice(-1) === "-" ) {
      return reference.slice(0, -1)
    } else {
      return reference;
    };
  }

  const extractColorAndSizes = (products: []) => {
    const productList: any[] = [];

    // Delete 0 from stock yo not process
    products.map((item, index:number) => {
      if (item.stock !== 0) {
        const originReference = normalizeReference(item?.refmere);
        productList.push({
          ...item,
          refmere: originReference
        })
      };
    }) 
    const productsWithoutTransform = productList.filter(item => item);
    const productsList = sizesAndColorOfProducts(productsWithoutTransform);
    
    setProducts(productsList.productsList);
    setProductsForCombinations(productsList.productsToExport);
    setListName(productsList.products);
  }

  useEffect(() => {
    listName.length > 0 ? setIsLoaded(true) : setIsLoaded(false)
  }, [listName])

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
                      <label>
                        Export Products: 
                        <CsvDownloadButton style={{ //pass other props, like styles
                          boxShadow:"inset 0px 1px 0px 0px #e184f3",
                          background:"linear-gradient(to bottom, #c123de 5%, #a20dbd 100%)",
                          backgroundColor:"#c123de",
                          borderRadius:"6px",
                          border:"1px solid #a511c0",
                          display:"inline-block",
                          cursor:"pointer","color":"#ffffff",
                          fontSize:"15px",
                          fontWeight:"bold",
                          padding:"6px 24px",
                          textDecoration:"none",
                          textShadow:"0px 1px 0px #9b14b3"
                          }}
                          data={products} filename="seba_products.csv" delimiter=";" />
                      </label>
                      </Col>
                      <Col>

                       <label>
                        Export Products: 
                        <CsvDownloadButton style={{ //pass other props, like styles
                          boxShadow:"inset 0px 1px 0px 0px #e184f3",
                          background:"linear-gradient(to bottom, #c123de 5%, #a20dbd 100%)",
                          backgroundColor:"#c123de",
                          borderRadius:"6px",
                          border:"1px solid #a511c0",
                          display:"inline-block",
                          cursor:"pointer","color":"#ffffff",
                          fontSize:"15px",
                          fontWeight:"bold",
                          padding:"6px 24px",
                          textDecoration:"none",
                          textShadow:"0px 1px 0px #9b14b3"
                          }}
                          data={productsForCombinations} filename="seba_products_combinations.csv" delimiter=";" />
                      </label>
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
                  <>;
                    <DataTable
                      columns={columnsSeba}
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
                      title="SEBA"
                    />
                    <ScrollToTop smooth />
                  </>
                ) 
                : (
                  <>
                    <p>Datos del FTP</p>
                    <ul>
                      <li>
                        <span>url : <a href="http://csvshops.universkate.com/UniverskateStock.csv">Enlace</a></span>
                      </li>
                      <li><span>Login:</span> <strong>csvuniverskate</strong></li>
                      <li><span>Password:</span> <strong>UdQ4SKATE7PytND</strong></li>
                    </ul>
                  </>
                )
              }
              </Col>
          </Row>
      </Container>
    </>
  )
}

export default SebaMapper
