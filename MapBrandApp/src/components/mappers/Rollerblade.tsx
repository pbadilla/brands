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

import { columnsRollerblade, headersRlbCatalog, headingsRlbCatalog } from '../../utils/constants';

import './styles.css'

const RollerbladeMapper = () => {
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
        const sheets = wb.SheetNames;
        if (sheets.length > 0) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]], { header: headersRlbCatalog, range: 1 })

          const finalProducts = addActiveStatus(rows);
          setProducts(groupProductsList(finalProducts));
          setListName(groupProductsList(finalProducts));
        }
      }
      reader.readAsArrayBuffer(file)
    }
  }

  const addActiveStatus = (products: any[]) => {
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

  const changeFamily = (item: string) => {
    switch (item) {
      case 'ACCESORIOS TEXTIL':
      case 'CASCOS':
      case 'GUANTES':
      case 'MOCHILAS Y BOLSAS':
        return 'Accesorios'
        break;
      case 'PROTECCIONES':
        return 'Protecciones';
        break;
      case 'COMPONENTES Y RECAMB':
        return 'Recambios'
        break;
      case 'PATINES BLADERUNNER':
      case 'PATINES ROLLERBLADE':
        return 'Patines'
        break;
      default:
        break;
    }
  }

  function truncateString(str:string, max:number) {
    if(str && str.length > 0 ) {
      if(str.length > max) {
        return str.substring(0, length - 3);
      } else { 
        return str
      };
    } else {
      return '';
    };
  }

  const poductsToExport =(products) => {
    const productsList = [];
    products.map((item, index: number) => {
      productsList.push({
        id: index,
        activo: item.active,
        nombre: item.ArtNombre,
        categorias: changeFamily(item.Familia),
        pvpr: item.PVPR,
        referencia: item.VendorItemNo,
        marca: item.Marca,
        ean13: item.EAN,
        plazoEntrega: '2-4 dias',
        cantidad: item.Udsxpack,
        descricion: item.Descripcionlarga,
        sku: item.SKU,
        imagen: item.Foto,
        metaTitulo: item.ArtNombre,
        metaKeywords: changeFamily(item.Familia),  
        metaDescripcion: truncateString(item.Descripcionlarga, 450)
      })
    })
    return productsList;
  }

  const groupProductsList = (products) => {
    const productsList = [];
    const grouped = _.mapValues(_.groupBy(products, 'VendorItemNo')); 
    for (const [key, value] of Object.entries(grouped)) {
      productsList.push(value[0])
    }
    setPending(false);
    return productsList;
  }

  const handleExport = () => {
    const headings = [headingsRlbCatalog]
    const wb = utils.book_new()
    const ws = utils.json_to_sheet([])
    utils.sheet_add_aoa(ws, headings)
    utils.sheet_add_json(ws, poductsToExport(products), { origin: 'A2', skipHeader: true })
    utils.book_append_sheet(wb, ws, 'Report')
    writeFile(wb, 'products_rollerblade.csv')
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
                              Export Catalog Products
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
              :(
                <>
                  <p>Datos contenidos en el fichero: <strong>pricat_rollerblade_20221110.xlsx</strong></p>
                  <ul>
                    <li><p>Fichero de todo el catálogo de productos anuales de Rollerblade</p></li>
                  </ul>
                </>
              )}
              </Col>
          </Row>
      </Container>
    </>
  )
}

export default RollerbladeMapper
