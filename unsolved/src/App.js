import './App.scss';
import { Button, Col, Container, Row } from 'react-bootstrap';
import MySidebar from './Components/MySidebar';
import MyNavbar from './Components/MyNavbar';
import Home from './Components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Problems from './Components/Problems';
import Community from './Components/Community';
import { OptionProvider } from './OptionContext';
import "katex/dist/katex.min.css";

/**
 * 메인 웹페이지 컴포넌트 
 */
function App() {
  return (
    <div className="App">
      <OptionProvider> {/* 웹페이지 옵션을 제공 */}
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Container fluid className='g-0'>
            <Row className='g-0'>
              <MySidebar /> {/* 좌측 사이드바 */}
              <Col>
                <MyNavbar /> {/* 상단 네비게이션 바 */}
                <Routes>
                  <Route path='/' element={<Home />} /> {/* 메인 페이지 */}
                  <Route path='/problems' element={<Problems />} /> {/* 문제 페이지 */}
                  {/* <Route path='/community' element={<Community />} /> */}
                </Routes>
              </Col>
            </Row>
          </Container>
        </BrowserRouter>
      </OptionProvider>
    </div>
  );
}

export default App;
