import React, { useState } from 'react'
import { read, utils, writeFile } from 'xlsx'
import ScrollToTop from 'react-scroll-to-top'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Table from '../shared/Table'

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
      };
    })
    setProducts(productList)
    setListName(productList)
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
      'Desxcription',
      'Color',
      'Sizes',
      'active'
    ]]
    const wb = utils.book_new()
    const ws = utils.json_to_sheet([])
    utils.sheet_add_aoa(ws, headings)
    utils.sheet_add_json(ws, products, { origin: 'A2', skipHeader: true })
    utils.book_append_sheet(wb, ws, 'Report')
    writeFile(wb, 'products_Powerslide.csv')
  }

  const headers = [
    'Art. Id',
    'Art. Num',
    'EAN13',
    'Nombre',
    'Description',
    'Talla',
    'Color',
    'Stock',
    'PVP',
    'active'
  ]

  const dataItems = [
    'ArtikelId',
    'Artikelnr',
    'EAN',
    'Artikelbezeichnung',
    'description',
    'MM1',
    'MM2',
    'Bestand',
    'pvp',
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

export default PowerSlideMapper
