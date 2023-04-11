import { useState } from "react";
import { read, utils, writeFile } from 'xlsx';
import { columnsRollerblade, headersRlbCatalog, headingsRlbCatalog } from '../../utils/constants';

import groupBy from 'lodash.groupby';
import _, { constant } from 'lodash';
import ScrollToTop from 'react-scroll-to-top';

import {
    withStepProgress,
    useStepProgress,
    Step,
    StepProgressBar
  } from "react-stepz";
import "react-stepz/dist/index.css";

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
  
  const StepsDemo = () => {
    const [isValid, setIsValid] = useState(false);
  
    const steps = [
      {
        label: "Cargar CSV ROLLERBLADE",
        name: "step 1",
        validator: () => isValid
      },
      {
        label: "Cargar CSV SEBA",
        name: "step 2",
        validator: () => isValid
      },
      {
        label: "Cargar CSV TIENDA",
        name: "step 3",
        validator: () => isValid
      },
      {
        label: "Unificar y Descargar CSV",
        name: "step 4"
      }
    ];
  
    const { stepForward, stepBackwards, currentIndex } = useStepProgress({
      steps,
      startingStep: 0
    });

    const handleImportRb = ($event) => {
        const files = $event.target.files
        if (files.length) {
            const file = files[0]
            const reader = new FileReader()
            reader.onload = (event) => {
            const wb = read(event.target.result)
            const sheets = wb.SheetNames;
            if (sheets.length > 0) {
                const rows = utils.sheet_to_json(wb.Sheets[sheets[0]], { 
                    header: headersRlbCatalog, range: 1 })

                setIsValid(true);

                const finalProducts = addActiveStatus(rows);
                console.log('%c', 'color: #007acc;', finalProducts);
                setProducts(groupProductsList(finalProducts));
                setListName(groupProductsList(finalProducts));
            }
            }
            reader.readAsArrayBuffer(file)
        }
    }

    const handleImportSeba = ($event) => {
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
  
    return (
      <div>
        <StepProgressBar steps={steps} />
            <Step step={0}>
                <Container fluid>
                    <Row>
                        <Col className="centerRow">
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Control type="file" required onChange={handleImportRb} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                            </Form.Group>
                        </Col>
                    </Row>
                </Container>
            </Step>
            <Step step={1}>
                <Container fluid>
                    <Row>
                        <Col className="centerRow">
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Control type="file" required onChange={handleImportSeba} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                            </Form.Group>
                        </Col>
                    </Row>
                </Container>
            </Step>
            <Step step={2}>
            <h1>Third Step</h1>
            </Step>
        <Button onClick={stepBackwards}>Back</Button>
        <Button onClick={stepForward}>Next</Button>
      </div>
    );
  };
  
  export default withStepProgress(StepsDemo);
  