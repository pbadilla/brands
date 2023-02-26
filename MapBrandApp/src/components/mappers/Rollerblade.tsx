import React, { FC, useState, useEffect } from 'react'

import Papa from "papaparse";

import { read, utils, writeFile } from 'xlsx'
import groupBy from 'lodash.groupby'
import _, { constant } from 'lodash'
import ScrollToTop from 'react-scroll-to-top'
import DataTable, { ExpanderComponentProps } from 'react-data-table-component';
import CsvDownloadButton from 'react-json-to-csv';

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
        id: index
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


const fotoIsValid = (photos: []) => {

  const existPhotos = photos.filter(item => item);

  const withoutQuotes = JSON.stringify(existPhotos).replace (/"/g,'').replace ("[",'').replace ("]",'') ;

  if (typeof withoutQuotes !== 'undefined' && withoutQuotes.length > 0) {
    return withoutQuotes
  } else return '';
}

  const productsToExport =(products) => {
    const productsList = [];
    products.map((item, index: number) => {

      const photos = fotoIsValid ([item.Foto3, item.Foto4, item.Foto5, item.Foto6, item.Foto7, item.Foto8]);

      console.log('photos', photos);

      productsList.push({
        id: item.id,
        active: 0,
        name: item.ArtNombre,
        SKU: item.SKU,
        pvp: item.PVPR,
        taxRulesID: 1,
        reference: item.VendorItemNo,
        brand: item.Marca,
        ean13: item.EAN,
        plazoEntrega: '2-4 dias',
        description: item.FEDAS,
        images: photos,
        metaTitle: item.ArtNombre,
        metaKeywords: changeFamily(item.Familia),  
        metaDescription: truncateString(item.FEDAS, 500)
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
    utils.sheet_add_json(ws, productsToExport(products), { origin: 'A2', skipHeader: true })
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

  async function handleImportCSV() {
    const res = await fetch('../../../assets/json/rb_products.json')
    const data = await res.json()
    console.log('%crbProductsFromJson', 'color: #007acc;', data);
    setProducts(groupProductsList(data));
    setListName(groupProductsList(data));
  }
  
  return (
    <>
      <Container fluid>
          <Row>
              <Col> 
                <p>Datos extraídos del servidor FTPS de BMSportech: <strong>stocks.csv</strong></p>
                <ul>
                  <li><p>Fichero de todo el catálogo de productos diarios de Rollerblade</p></li>
                </ul>                       
                <Button type="button" variant="outline-primary" onClick={handleImportCSV}>
                      Importar Datos Diarios
                </Button>
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
                          data={productsToExport(products)} filename="rollerblade_catalog.csv" delimiter=";" />
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
                  <p>Esperando cargar los datos</p>
                </>
              )}
              </Col>
          </Row>
      </Container>
    </>
  )
}

export default RollerbladeMapper
