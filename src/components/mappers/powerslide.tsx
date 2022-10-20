import React, { useState } from "react";  
import { read, utils, writeFile } from 'xlsx';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

const PowerSlideMapper = () => {
    const [products, setProducts] = useState([]);

    const handleImport = ($event) => {
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const wb = read(event.target.result);
                
                const sheets = wb.SheetNames;
                        
                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    setProducts(rows)
                }
            }
            reader.readAsArrayBuffer(file);
        }
        
    }

    const handleExport = () => {
        const headings = [[
            'name',
            'es',
            'en'
        ]];
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, products, { origin: 'A2', skipHeader: true });
        utils.book_append_sheet(wb, ws, 'Report');
        writeFile(wb, 'products_Powerslide.csv');
    }


    return (
        <>
        <Container fluid> 
            <Row>
                <Col>
                    <div className="input-group">
                        <div className="custom-file">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="file_input">Cargar CSV</label>
                            <input name="file" className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="inputGroupFile" type="file" required onChange={handleImport} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                        </div>
                    </div>
                </Col>
                <Col>
                    <Button type="button" variant="outline-primary" onClick={handleExport}>
                        Export 
                    </Button>
                </Col>
            </Row>
        </Container>
        <Container className="mt-4" fluid>
            <Row>
                <Col>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Art. Id</th>
                            <th>Art. Num</th>
                            <th>EAN18</th>
                            <th>Nombre</th>
                            <th>Talla</th>
                            <th>Color</th>
                            <th>Stock</th>
                            <th>PVP</th>
                        </tr>
                    </thead>
                <tbody>
                {
                    products.length
                    ?
                    products.map((product, index) => (
                        <tr key={index}>
                            <td>{ index + 1 }</td>
                            <td>{ product.ArtikelId }</td>
                            <td>{ product.Artikelnr }</td>
                            <td>{ product.EAN }</td>
                            <td>{ product.Artikelbezeichnung }</td>
                            <td>{ product.MM1 }</td>
                            <td>{ product.MM2 }</td>
                            <td>{ product.Bestand }</td>
                        </tr> 
                    ))
                    :
                    <tr>
                        <td colSpan="9">
                        { !products.length > 0 
                            ? <span>Esperando cargar datos</span>
                            : <span>Cargando datos...</span>
                        }
                        </td>
                    </tr>
            }
        </tbody>
    </Table>
</Col>
</Row>
</Container>

        </>

    );
};

export default PowerSlideMapper;
