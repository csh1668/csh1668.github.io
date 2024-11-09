import './App.scss';
import { Button, Col, Container, Row } from 'react-bootstrap';
import MySidebar from './Components/MySidebar';
import MyNavbar from './Components/MyNavbar';
import Home from './Components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Problems from './Components/Problems';
import Community from './Components/Community';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Container fluid className='g-0'>
          <Row className='g-0'>
            <MySidebar />
            <Col>
              <MyNavbar />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/problems' element={<Problems />} />
                <Route path='/community' element={<Community />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
