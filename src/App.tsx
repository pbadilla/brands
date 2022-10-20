import PowerSlideMapper from "./components/mappers/powerslide";
import RollerbladeMapper from "./components/mappers/Rollerblade"; 
import SebaMapper from "./components/mappers/Seba";
import OtherMapper from "./components/mappers/other";

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';w

function App() {
  return (
    <>
    <Container fluid>
      <Row>
        <Col>
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="seba" title="SEBA">
              <SebaMapper />
            </Tab>
            <Tab eventKey="powerslide" title="POWERSLIDE">
              <PowerSlideMapper />
            </Tab>
            <Tab eventKey="rollerblade" title="ROLLERBLADE">
              <RollerbladeMapper />
            </Tab>
            <Tab eventKey="other" title="OTHER">
              <OtherMapper />
            </Tab>
          </Tabs>       
        </Col>
      </Row>
    </Container>
  </>
  );
}

export default App;