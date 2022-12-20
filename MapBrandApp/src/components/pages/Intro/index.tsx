import React, { FC, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';

const Intro = () => {
    return(
        <Container>
            <Row>
                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="../../../assets/images/logo.png" />
                        <Card.Body>
                            <Card.Title>MapBrandApp: Mapeo de datos de las marcas</Card.Title>
                            <Card.Text>
                                <span>Herramienta para la importación/exportación de productos al e-commerce de rg360 mediante ficheros tanto de csv como de excel de las marcas.</span>  
                            </Card.Text>
                            <Button variant="primary">Ir a la Tienda</Button>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>Documentación</ListGroup.Item>
                            <ListGroup.Item>Instalación</ListGroup.Item>
                            <ListGroup.Item>Uso</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Intro