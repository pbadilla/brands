import React, { FC, useState, useEffect } from 'react'

import CsvDownloadButton from 'react-json-to-csv'

import { read, utils, writeFile } from 'xlsx'
import groupBy from 'lodash.groupby'
import _, { constant } from 'lodash'
import ScrollToTop from 'react-scroll-to-top'
import DataTable, { ExpanderComponentProps } from 'react-data-table-component';

import rbCatalog from '../../../assets/catalog'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

import Loader from '../shared/Loader';

import { columnsRlbDiary, headingsRlbDiary, headingsRlbDiaryCombinations } from '../../utils/constants';

import './styles.css'

const RollerbladeCatalog = () => {
  const [listName, setListName] = useState([])
  const [listSizes, setListSizes] = useState([])
  const [catalog, setCatalog] = useState([])

  const [listProductSizes, setListProductSizes] = useState([])
  const [pending, setPending] = useState<boolean>(true);


  useEffect(() => {
    setCatalog(groupProductsListCatalog(rbCatalog as any));
  }, [rbCatalog]);

    const handleImport = (event: any) => {
      const files = event.target.files
      if (files.length) {
        const file = files[0]
        const reader = new FileReader()
        reader.onload = (event) => {
          const wb = read(event?.target?.result)
          const sheets = wb.SheetNames

          if (sheets.length > 0) {
            const rows = utils.sheet_to_json(wb.Sheets[sheets[0]], {rawNumbers:false, raw:false});
            const finalProducts = changesFields(rows as any);
            setListName(groupProductsList(finalProducts as any));
            setListProductSizes(exportSizes(finalProducts));
          }
        }
        reader.readAsArrayBuffer(file)
      }
    }

  const changesFields = (products: []) => {
    const productsList: any[] = []
    products.map((item, index) => {
      productsList.push({
        ...item,
        id: index,
        activo: 1
      })
    })

    return productsList;
  }

  type prodExport = {
    id: string;
    activo: string;
    marca: string;
    description: string;
    pvp: string;
    stock: String;
  }

  type pushProducts = {
    id: string; 
    activo: boolean; 
    CodSuperior: string;
    Marca: string;
    Description: string;
    PVP: number;
    Stock: number;
  }

  type sizesExport = {
    code: string;
    attribute: string;
    value: string;
    quantity: number;
  }
 
  const exportProducts = (products: prodExport) => {
    const productsList: any[] = []
    products.map((item: pushProducts, index: any) => {
      productsList.push({
        id: item.id,
        activo: item.activo,
        reference: item.CodSuperior,
        marca: item.Marca,
        pvp: item.PVP,
        stock: item.Stock
      })
    })

    return productsList;
  }

  const exportSizesProducts = (products: prodExport) => {
    const productsListSizes: any[] = []
    products.map((item: pushProducts, index: any) => productsListSizes.push({
      talla: item.Talla,
      reference: item.CodSuperior,
      stock: parseInt(item.Stock)
    }))

    return productsListSizes;
  }

  const exportSizes = (products: sizesExport) => {
    const sizes: any[] = []
    products.map((item: sizesExport, index: any) => {
      sizes.push({
        code: item.CodSuperior,
        attribute: `Talla:select:0`,
        value: `${item.Talla}:0`,
        quantity: parseInt(item.Stock)
      })
    })
    return sizes;
  }

  const transformToSizes = listSizes.map( (item, index) => {
    return({
      codigo: item.codigo,
      attribute: joinAttributes(item.sizes).join(','),
      value: joinSizes(item.sizes, item.stock).join(',')
    })
  });

  const groupProductsListCatalog = (products) => {
    const productsList = [];

    products.map((item, index) => productsList.push({
      reference: item["Art. Codigo"],
      name: item["Art. Nombre"], "Año": "23",
      color: item["Color Base"],
      description: item["Descripcion larga"],
      ean: item["EAN"],
      familia: item["Familia"],
      photos: [item["Foto"], item["Foto2"], item["Foto3"], item["Foto4"], item["Foto5"], item["Foto6"]],
      brand: item["Marca"],
      pvpr: item["PVPR"].replace(",", "."),
      sku: item["SKU"],
      size: item["Talla EUR"]
    }))

    // console.log('%cRollerbladeCatalog.tsx line:164 productsList', 'color: #007acc;', productsList);
    return productsList;

  }

  const groupProductsList = (products) => {
    const productsList: Array<string> = [];

    const productsListSizes = exportSizesProducts(products);

    const listSizes = _(productsListSizes)
      .groupBy('reference')
      .map(function(items, value) {
        return {
          codigo: value,
          sizes: _.map(items, 'talla'),
          stock: _.map(items, 'stock'),
          quantity: _.sumBy(items, 'stock', _.partial(_.sumBy, items))
        };
      })
      .value();

    setListProductSizes(transformToSizes);

    const grouped = _.mapValues(_.groupBy(products, 'CodSuperior'));

    for (const [key, value] of Object.entries(grouped)) {
      productsList.push(value[0])
    }
    setPending(false);
    return changesFields(productsList);
  }

  const handleExport = () => {
    const headings = [headingsRlbDiary]
    const wb = utils.book_new()
    const ws = utils.json_to_sheet([])

    utils.sheet_add_aoa(ws, headings)
    utils.sheet_add_json(ws, exportProducts(listName), { origin: 'A2', skipHeader: true })
    utils.book_append_sheet(wb, ws, 'Report')
    utils.sheet_to_csv(wb, { FS: ";"})
    return ws;

    writeFile(wb, 'products_rollerblade_diary.csv');
    handleExportCombinations();
  }

  const handleExportCombinations = () => {
    const headings = [headingsRlbDiaryCombinations]
    const wb = utils.book_new()
    const ws = utils.json_to_sheet([])

    utils.sheet_add_aoa(ws, headings)
    utils.sheet_add_json(ws, listProductSizes, { origin: 'A2', skipHeader: true })
    utils.book_append_sheet(wb, ws, 'Report')
    utils.sheet_to_csv(wb, { FS: ";"})
    writeFile(wb, 'products_rollerblade_diary_combinations.csv')

    // return ws;
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
                      data={exportProducts(listName)} filename="rollerblade_products.csv" delimiter=";" />
                      </label>
                      </Col>
                      {/* <Col>
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
                          data={listProductSizes} filename="rollerblade_products_combinations.csv" delimiter=";" />
                      </label>
                      </Col> */}
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
                    columns={columnsRlbDiary}
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
              : (
                <>
                  {/* <p>Datos del FTP</p>
                  <p>Datos contenidos en el fichero CSV: <strong>rollergrind360_bm.csv</strong></p>
                    <ul>
                      <li>
                        <span>url : <a href="ftp://ftp.bmsportech.com/rollergrind360_bm.csv">Enlace</a></span>
                      </li>
                      <li><span>User:</span> <strong>cliente_rollergrind360</strong></li>
                      <li><span>Password:</span> <strong>aue9kpr@DPV.hgp7ufz</strong></li>
                    </ul> */}
                </>
              )}
              </Col>
          </Row>
      </Container>
    </>
  )
}

export default RollerbladeCatalog
