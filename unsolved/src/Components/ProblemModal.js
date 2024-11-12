import { useState } from "react";
import { Col, Modal, Container, Row, Table } from "react-bootstrap";
import Tier from "./Tier";
import Spoiler from "./Spoiler";
import WhiteCard from "./WhiteCard";
import UserElement from "./UserElement";

/**
 * 
 * @param {*} props 
 * @param {*} props.onClose
 * @param {*} props.problemId
 * @returns 
 */
export default function ProblemModal(props) {
    const bojIcon = "https://static.solved.ac/misc/boj-icon.svg";
    const boj = `https://boj.kr/${props.problemId}`;

    const bojIconStyle = {
        width: "30px",
        height: "40px",
        filter: "brightness(0) invert(1)",
        marginLeft: "4px",
        marginRight: "4px",
    };
    const bojIconBackgroundStyle = {
        backgroundColor: "#0479c7",
        borderRadius: "4px",
    }

    return (
        <>
        <Modal show={true} onHide={props.onClose} animation={true} centered={true} size="xl" className="box-shadow">
            <Modal.Header closeButton>
                <Modal.Title className="text-basic-color w-100">
                    {props.problemId}번: <Tier level={0} size={30} />Dummy Title
                    <span className="float-end me-3" style={bojIconBackgroundStyle}>
                        <a href={boj} title="백준 문제 페이지로 이동">
                            <img src={bojIcon} alt="bojIcon" style={bojIconStyle}></img>
                        </a>
                    </span>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="bg-gray-color text-center">
                <Container style={
                    {height: "50vh", overflowY: "auto"}
                }>
                    <Row>
                        <Col md={6}>
                            <ProblemInfomation />
                        </Col>
                        <Col md={6}>
                            <SchoolInfomation />
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
        </>
    )
}

function ProblemInfomation(props) {
    return (
        <WhiteCard icon="info-circle" title="문제 정보">
            <Container>
                <Table striped bordered hover className="text-basic-color box-shadow">
                    <thead>
                        <tr>
                            <th>맞은 사람 수</th>
                            <th>정답률</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1000</td>
                            <td>100%</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
            <hr className="hr" />
            <Container>
                <h5 className="text-basic-color">알고리즘 분류</h5>
                <ul className="overflow-y-auto text-basic-color text-start">
                    <li><Spoiler>수학</Spoiler></li>
                    <li><Spoiler>구현</Spoiler></li>
                    <li><Spoiler>춤추는 링크</Spoiler></li>
                </ul>
            </Container>
        </WhiteCard>
    )
}

function SchoolInfomation(props) {
    const [students, setStudents] = useState([
        {id: 1, name: "tjgus1668", level:25},
    ])

    return (
        <WhiteCard icon="check-circle-fill" title="이 문제를 푼 충남대생">
            <Table striped bordered hover className="text-basic-color box-shadow">
                <thead>
                    <tr>
                        <th>이름</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => {
                        return (
                            <UserElement user={student} />
                        )
                    }) ?? <tr><td>이 문제를 푼 충남대생이 없습니다.</td></tr>}
                </tbody>
            </Table>
        </WhiteCard>
    )
}