import OtherMapper from './components/mappers/other'
import PowerSlideMapper from './components/mappers/powerslide'
import RollerbladeMapper from './components/mappers/Rollerblade'
import RollerbladeMapperDiary from './components/mappers/RollerbladeDiary'
import SebaMapper from './components/mappers/Seba'

import Intro from './components/pages/Intro'

import 'bootstrap/dist/css/bootstrap.min.css'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

function App () {
  return (
    <>
    <Container fluid>
      <Row>
        <Col>
          <Tabs
            defaultActiveKey="intro"
            id="uncontrolled-tab-example"
            className="mb-3"
            fill
            justify
          >
            <Tab eventKey="intro" title="INTRO">
              <Intro />
            </Tab>
            <Tab eventKey="seba" title="SEBA">
              <SebaMapper />
            </Tab>
            <Tab eventKey="powerslide" title="POWERSLIDE">
              <PowerSlideMapper />
            </Tab>
            <Tab eventKey="rollerblade" title="RLB_catalog">
              <RollerbladeMapper />
            </Tab>
            <Tab eventKey="rollerblade_diary" title="RLB_Diary">
              <RollerbladeMapperDiary />
            </Tab>
            <Tab eventKey="other" title="OTHER">
              <OtherMapper />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  </>
  )
}

export default App
