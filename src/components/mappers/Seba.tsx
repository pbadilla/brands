import React, { useState, useEffect } from 'react'

import { read, utils, writeFile } from 'xlsx'
import ScrollToTop from 'react-scroll-to-top'
import DataTable from 'react-data-table-component'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

import { sliceData, calculateRange } from './utils'

import { changeColor, changeSize, columnsSeba, headingsSeba } from '../../utils/constants'

import './styles.css'

const SebaMapper = () => {
  const [products, setProducts] = useState([])
  const [listName, setListName] = useState([])
  const [basicData, setBasicData] = useState({})
  const [sizeProducts, setSizeProducts] = useState([])
  const [colorProducts, setColorProducts] = useState([])
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
          sameProduct(rows)
        }
      }
      reader.readAsArrayBuffer(file)
    }
  }

  const handleExport = () => {
    const headings = [headingsSeba]
    const wb = utils.book_new()
    const ws = utils.json_to_sheet([])
    utils.sheet_add_aoa(ws, headings)
    utils.sheet_add_json(ws, products, { origin: 'A2', skipHeader: true })
    utils.book_append_sheet(wb, ws, 'Report')
    writeFile(wb, 'products_Seba.csv')
  }

  const sameProduct = (arrayReferences: Object) => {
    const allReferences: any[] = []
    const refsMere: any[] = []
    const references: any[] = []

    arrayReferences.map((item) => {
      allReferences.push(item.reference)
      refsMere.push(item.refmere)
      references.push(item.reference)
    })
    sizeOfProducts(allReferences, arrayReferences)
    extractSameProduct(refsMere, references)
  }

  const extractSameProduct = (refsMere: any[], references: any[]) => {
    const tempReference = ''
    const colors = []
    const sizes = []
    references.map((item, index) => {
      const piecesReferences = item.split('-')
      const piecesRefeMere = refsMere[index].split('-')
      if (piecesReferences.length === 1) {
        // allColors.push('')
        // allSizes.push('')
      } else if (piecesReferences.length === 2) {
        // const last = pieces[pieces.length - 1]
        // allColors.push(changeColor(last))
        // allSizes.push('')
      } else if (piecesReferences.length === 3) {
        // const beforeLast = pieces[pieces.length - 2]
        // const last = pieces[pieces.length - 1]
        // allColors.push(changeColor(beforeLast));
        // allSizes.push(changeSize(last));
      } else if (piecesReferences.length === 4) {
        // BRK-RUB-JR-2734
        // const beforeLast = pieces[pieces.length - 2]
        // const last = pieces[pieces.length - 1]
        // allColors.push(changeColor(last))
        // allSizes.push(changeSize(beforeLast));
      } else if (piecesReferences.length === 5) {
        if (piecesRefeMere.length === 2) {
          const middle = piecesReferences[piecesReferences.length - 3]
          const beforeLast = piecesReferences[piecesReferences.length - 2]
          const last = piecesReferences[piecesReferences.length - 1]
          colors.push(changeColor(middle))
          sizes.push(changeSize(`${beforeLast} - ${last}`))
        }
      } else {

        // allColors.push('')
        // allSizes.push('')
      }
    })
  }

  interface iSizeProducts {
    arrayReferences: string[]
    allReferences: string[]
  }

  // enum SizesArrays {
  //   allSizes = [],
  //   allColors = []
  // };

  const sizeOfProducts = (arrayReferences: string[], allReferences: string[]) => {
    const allSizes = []
    const allColors = []
    arrayReferences.map(item => {
      const pieces = item.split('-')
      if (pieces.length === 1) {
        allColors.push('')
        allSizes.push('')
      } else if (pieces.length === 2) {
        const last = pieces[pieces.length - 1]
        allColors.push(changeColor(last))
        allSizes.push(changeSize(last))
      } else if (pieces.length === 3) {
        const beforeLast = pieces[pieces.length - 2]
        const last = pieces[pieces.length - 1]
        if (last === 'S' || last === 'M' || last === 'L' || last === 'XL' || last === 'XXL' || last === 'XXXL' ||
        last === '36' || last === '37' || last === '38' || last === '39' || last === '40' ||
        last === '4' || last === '5' || last === '6' || last === '7' || last === '8' || last === '9' || last === '10' || last === '11' || last === '12' || last === '13') {
          allColors.push(changeColor(beforeLast))
          allSizes.push(changeSize(last))
        } else {
          allColors.push(changeColor(last))
          allSizes.push(changeSize(last) || changeSize(beforeLast))
        }
      } else if (pieces.length === 4) {
        const beforeLast = pieces[pieces.length - 2]
        const last = pieces[pieces.length - 1]
        if (last === 'BK' || last === 'BL' || last === 'WH' || last === 'R' || last === 'BLK' || last === 'GW') {
          if (beforeLast === 'YE' || beforeLast === 'BK' || beforeLast === 'BLK' || beforeLast === 'PK' ||
          beforeLast === 'BL' || beforeLast === 'GR' || beforeLast === 'RD' || beforeLast === 'WH' ||
          beforeLast === 'NA' || beforeLast === 'PU' || beforeLast === 'OR' || beforeLast === 'CO' ||
          beforeLast === 'DA'
          ) {
            allSizes.push(changeSize(''))
            allColors.push(changeColor(beforeLast))
          } else {
            allSizes.push(changeColor(beforeLast))
            allColors.push(changeSize(last))
          }
        } else if (last === '4' || last === '5' || last === '6' || last === '7' || last === '8' || last === '9' || last === '10' || last === '11' || last === '12' || last === '13') {
          allColors.push(changeColor(beforeLast))
          allSizes.push(changeSize(last))
        } else {
          allColors.push(changeColor(beforeLast))
          allSizes.push(changeSize(last))
        }
      } else if (pieces.length === 5) {
        const middle = pieces[pieces.length - 3]
        const beforeLast = pieces[pieces.length - 2]
        const last = pieces[pieces.length - 1]
        if (last === 'XS' || last === 'S' || last === 'M' || last === 'L' || last === 'XL' || last === 'XXL' || last === 'XXXL' ||
           last === '2730' || last === '3134' || last === '3740' || last === '3336' ||
           last === '36' || last === '37' || last === '38' || last === '39' || last === '40' || last === '41' ||
           last === '355' || last === '365' || last === '375' || last === '385' || last === '395' || last === '405' || last === '415' || last === '425' || last === '435' || last === '445' ||
           last === '42' || last === '43' || last === '44' || last === '45' || last === '46' || last === '47' || last === '48' ||
           last === '202' || last === 'MER' ||
           last === '17' || last === '170' || last === '18' || last === '180') {
          allColors.push(changeColor(beforeLast))
          allSizes.push(changeSize(last))
        } else if (last === 'BK' || last === 'SV') {
          allColors.push(changeColor(last))
          allSizes.push(changeSize(`${beforeLast} - ${last}`))
        } else {
          allColors.push(changeColor(middle))
          allSizes.push('')
        }
      } else if (pieces.length === 6) {
        const middle = pieces[pieces.length - 3]
        const beforeLast = pieces[pieces.length - 2]
        const last = pieces[pieces.length - 1]
        if (last === '32' || last === '36') {
          allColors.push(changeColor(middle))
          allSizes.push(changeSize(`${beforeLast} - ${last}`))
        } else {
          allColors.push(changeColor(beforeLast))
          allSizes.push(changeSize(last))
        }
      } else {
        allColors.push(null)
        allSizes.push(null)
      }
    })

    setSizeProducts(allSizes)
    setColorProducts(allColors)

    const mapped = allReferences.map((item, index) => ({
      ...item,
      description: '',
      stock: item.stock === 0 ? null : item.stock,
      pvp: parseFloat(item.prix * 2.01).toFixed(2),
      color: allColors[index],
      size: allSizes[index],
      active: 0
    }))

    const productList: any[] = []
    mapped.map((item, index) => {
      if (item.stock !== null) {
        productList.push(item)
      };
    })

    const testArray = productList.filter(item => item)
    setProducts(productList)
    setListName(productList)
  }

  useEffect(() => {
    listName.length > 0 ? setIsLoaded(true) : setIsLoaded(false)
  }, [listName])

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
                  <DataTable
                    title="SEBA"
                    columns={columnsSeba}
                    data={listName}
                    pagination
                    highlightOnHover={true}
                    persistTableHead={true}
                    paginationPerPage={30}
                    paginationRowsPerPageOptions={[30, 50, 100]}
                    pointerOnHover={true}
                    striped={true}
                  />
                  <ScrollToTop smooth />
                </Col>
            </Row>
        </Container>
        </>
  )
}

export default SebaMapper
