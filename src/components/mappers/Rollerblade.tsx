import React, { useState, useEffect } from 'react'

import { read, utils, writeFile } from 'xlsx'
import ScrollToTop from 'react-scroll-to-top'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Table from '../shared/Table'

const RollerbladeMapper = () => {
  const [products, setProducts] = useState([])
  const [listName, setListName] = useState([])
  const [sizeProducts, setSizeProducts] = useState([])
  const [colorProducts, setColorProducts] = useState([])

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
          setProducts(rows)
          sameProduct(rows)
        }
      }
      reader.readAsArrayBuffer(file)
    }
  }

  const handleExport = () => {
    const headings = [[
      'Id',
      'EAN13',
      'Reference',
      'Prix',
      'PVP',
      'Stock',
      'Nom',
      'Color',
      'Sizes',
      'Active'
    ]]
    const wb = utils.book_new()
    const ws = utils.json_to_sheet([])
    utils.sheet_add_aoa(ws, headings)
    utils.sheet_add_json(ws, products, { origin: 'A2', skipHeader: true })
    utils.book_append_sheet(wb, ws, 'Report')
    writeFile(wb, 'products_Rollerblade.csv')
  }

  const findFirstDiff = (str1, str2) => str2[[...str1].findIndex((el, index) => el !== str2[index])]

  const sameProduct = (arrayReferences) => {
    const allReferences = []
    const allTitles = []

    arrayReferences.map((item) => {
      allReferences.push(item.reference)
      allTitles.push(item.nom)
    })

    sizeOfProducts(allReferences, arrayReferences)
    extractSizeFromTitle(allTitles)
  }

  const extractSizeFromTitle = (arrayReferences) => {
    const allColors = []
    const allSizes = []
    arrayReferences.map(item => {
      if (item.includes('Black') || item.includes('Orange') || item.includes('Blue') || item.includes('White')) {
        allColors.push(item)
      } else {
        allColors.push('')
      }

      if (item.includes('34-37') || item.includes('38-42') || item.includes('43-47')) {
        allSizes.push(item)
      } else {
        allSizes.push('')
      }
    })
  }

  const sizeOfProducts = (arrayReferences, allReferences) => {
    const allSizes = []
    const allColors = []
    arrayReferences.map(item => {
      const pieces = item.split('-')
      if (pieces.length === 1) {
        allColors.push('')
        allSizes.push('')
      } else if (pieces.length === 2) {
        const last = pieces[pieces.length - 1]
        allColors.push(last)
        allSizes.push('')
      } else if (pieces.length === 3) {
        const beforeLast = pieces[pieces.length - 2]
        const last = pieces[pieces.length - 1]
        allColors.push(last)
        allSizes.push(beforeLast)
      } else if (pieces.length === 4) {
        const beforeLast = pieces[pieces.length - 2]
        const last = pieces[pieces.length - 1]
        allColors.push(beforeLast)
        allSizes.push(last)
      } else if (pieces.length === 5) {
        const middle = pieces[pieces.length - 3]
        const beforeLast = pieces[pieces.length - 2]
        const last = pieces[pieces.length - 1]
        allColors.push(middle)
        allSizes.push(`${beforeLast} - ${last}`)
      } else {
        allColors.push('')
        allSizes.push('')
      }
    })

    setSizeProducts(allSizes)
    setColorProducts(allColors)

    const mapped = allReferences.map((item, index) => ({
      ...item,
      description: '',
      pvp: parseFloat(item.prix * 2.01).toFixed(2),
      color: allColors[index],
      size: allSizes[index],
      active: 0
    }))

    setListName(mapped)
  }

  const headers = [
    'Ref Mere',
    'Reference',
    'EAN13',
    'Nom',
    'Descripción',
    'Color',
    'Sizes',
    'Prix',
    'PVP',
    'Stock',
    'Active'
  ]

  const dataItems = [
    'refmere',
    'reference',
    'ean',
    'nom',
    'description',
    'color',
    'size',
    'prix',
    'pvp',
    'stock',
    'active'
  ]

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
                    <Table data={listName} page={1} rowsPerPage={50} headers= {headers} dataItems={dataItems} />
                    <ScrollToTop smooth />
                </Col>
            </Row>
        </Container>
        </>

  )
}

export default RollerbladeMapper
