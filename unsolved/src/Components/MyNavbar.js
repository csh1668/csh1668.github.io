import { Container, Navbar } from "react-bootstrap";

export default function MyNavbar() {
    return (
        <>
        <Navbar className="box-shadow">
        <Container>
            <Navbar.Collapse className="justify-content-end">
                <div className="text-basic-color">
                    <a href="https://www.acmicpc.net/user/tjgus1668" className="text-decoration-none text-highlight-color">tjgus1668</a>님 환영합니다.
                </div>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        </>
    )
}