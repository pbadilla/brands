import React, { useState } from "react";  
import { useEffect } from "react";
import { read, utils, writeFile } from 'xlsx';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';;

const RollerbladeMapper = () => {
    const [products, setProducts] = useState([]);
    const [listName, setListName] = useState([]);
    const [sizeProducts, setSizeProducts] = useState([]);
    const [colorProducts, setColorProducts] = useState([]);

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
                    sameProduct(rows);
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
        writeFile(wb, 'products_Rollerblade.csv');
    }

    const findFirstDiff = (str1, str2) => str2[[...str1].findIndex((el, index) => el !== str2[index])];

    const sameProduct = (arrayReferences) => {
        const allReferences = [];
        const allTitles = [];

        arrayReferences.map((item)=> {
            console.log(item);
            allReferences.push(item.reference);
            allTitles.push(item.nom)
        })

        sizeOfProducts(allReferences, arrayReferences);
        extractSizeFromTitle(allTitles)
    }

    const extractSizeFromTitle = (arrayReferences) => {
        const allColors= [];
        const allSizes= [];
        arrayReferences.map(item => {
            if(item.includes("Black") || item.includes("Orange") || item.includes("Blue") || item.includes("White")) {
                allColors.push(item)
            } else{
                allColors.push("")
            }

            if(item.includes("34-37") || item.includes("38-42") || item.includes("43-47")) {
                allSizes.push(item)
            } else{
                allSizes.push("")
            }
        });
    }


    const sizeOfProducts = (arrayReferences, allReferences) => {
        const allSizes = [];
        const allColors = [];
        arrayReferences.map(item => {
            const pieces = item.split("-");
            if (pieces.length === 1) {
                allColors.push("");
                allSizes.push("");
            } else if(pieces.length === 2) {
                const last = pieces[pieces.length - 1];
                allColors.push(last);
                allSizes.push("");
            } else if(pieces.length === 3) {
                const beforeLast = pieces[pieces.length - 2];
                const last = pieces[pieces.length - 1];
                allColors.push(last);
                allSizes.push(beforeLast);
            } else if(pieces.length === 4) {
                const beforeLast = pieces[pieces.length - 2];
                const last = pieces[pieces.length - 1];
                allColors.push(beforeLast);
                allSizes.push(last);
            } else if(pieces.length === 5) {
                const middle = pieces[pieces.length - 3];
                const beforeLast = pieces[pieces.length - 2];
                const last = pieces[pieces.length - 1];
                allColors.push(middle);
                allSizes.push(`${beforeLast} - ${last}`);
            } else {
                allColors.push("");
                allSizes.push("");
            }
        })

        setSizeProducts(allSizes);
        setColorProducts(allColors);

        const mapped = allReferences.map((item, index) => ({
            ...item,
            pvp: parseFloat(item.prix * 2.01).toFixed(2),
            color: allColors[index],
            size: allSizes[index]
          }));

        console.log("mapped >", mapped);
        setListName(mapped);
    }

    useEffect(() => {
        console.log("ListName", listName);
    }, [listName])

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
                            <th>Id</th>
                            <th>Ref Mere</th>
                            <th>reference</th>
                            <th>ean18</th>
                            <th>prix</th>
                            <th>pvp</th>
                            <th>stock</th>
                            <th>nom</th>
                            <th>color</th>
                            <th>sizes</th>
                        </tr>
                    </thead>
                    <tbody>      
                        {
                            listName.length
                            ?
                            listName.map((product, index) => (
                                <tr key={index}>
                                    <td>{ index + 1 }</td>
                                    <td>{ product.refmere }</td>
                                    <td>{ product.reference }</td>
                                    <td>{ product.ean }</td>
                                    <td>{ product.prix }</td>
                                    <td>{ product.pvp }</td>
                                    <td>{ product.stock }</td>
                                    <td>{ product.nom }</td>
                                    <td>{ product.color }</td>
                                    <td>{ product.size }</td>
                                </tr> 
                            ))
                            :
                            <tr>
                                <td colSpan="11">
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

export default RollerbladeMapper;
