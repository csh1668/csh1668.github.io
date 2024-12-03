import { useEffect, useState } from "react";
import { Col, Modal, Container, Row, Table } from "react-bootstrap";
import Tier from "./Tier";
import Spoiler from "./Spoiler";
import WhiteCard from "./WhiteCard";
import UserElement from "./UserElement";
import api from "../ApiHandler";
import { useOption } from "../OptionContext";
import Formmated from "./Formmated";

/**
 * 문제에 대한 상세 정보를 보여주는 Modal
 */
export default function ProblemModal(props) {
    const bojIcon = "https://static.solved.ac/misc/boj-icon.svg";
    const boj = `https://boj.kr/${props.problemId}`;

    const [problem, setProblem] = useState(null);
    const { showProblemTier } = useOption();

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

    useEffect(() => { // 최초 렌더링 시 문제 정보를 불러옴
        api.requestProblem(props.problemId).then((data) => {
            setProblem(data);
            console.log(data);
        })
    }, [props.problemId]);

    return (
        <>
        <Modal show={true} onHide={props.onClose} animation={true} centered={true} size="xl" className="box-shadow">
            <Modal.Header closeButton>
                <Modal.Title className="text-basic-color w-100">
                    {props.problemId}번: {
                        showProblemTier && <Tier level={problem?.level ?? 0} size={30} />
                    }{problem?.title}
                    <span className="float-end me-3" style={bojIconBackgroundStyle}>
                        <a href={boj} title="백준 문제 페이지로 이동" target="_blank">
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
                            <ProblemInfomation problem={problem} />
                        </Col>
                        <Col md={6}>
                            <SchoolInfomation problemId={props.problemId}/>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
        </>
    )
}

/**
 * 문제 정보를 보여주는 WhiteCard
 */
function ProblemInfomation({ problem }) {
    return (
        <WhiteCard icon="info-circle" title="문제 정보">
            <Container>
                <Table striped bordered hover className="text-basic-color box-shadow">
                    <thead>
                        <tr>
                            <th>맞은 사람 수</th>
                            <th>평균 시도 횟수</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{problem?.solvedCount ?? '　'}</td>
                            <td>{problem?.averageTries ?? '　'}</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
            <hr className="hr" />
            <Container>
                <h5 className="text-basic-color">알고리즘 분류</h5>
                <ul className="overflow-y-auto text-basic-color text-start">
                    {/* <li><Spoiler>수학</Spoiler></li>
                    <li><Spoiler>구현</Spoiler></li>
                    <li><Spoiler>춤추는 링크</Spoiler></li> */}
                    {problem?.tags.map((tag) => {
                        return <li><Spoiler>{tag.displayName}</Spoiler></li>
                    })}
                </ul>
            </Container>
        </WhiteCard>
    )
}

/**
 * 이 문제를 푼 충남대생 리스트를 보여주는 WhiteCard
 */
function SchoolInfomation(props) {
    const [students, setStudents] = useState([
        // {id: 1, name: "tjgus1668", level:25},
    ]);
    const [totalCnt, setTotalCnt] = useState(0);
    const [page, setPage] = useState(0);

    useEffect(() => { // 최초 렌더링 시 이 문제를 푼 학생 정보를 불러옴
        api.requestProblemUsers(props.problemId).then((data) => {
            let cnt = 0;
            setStudents(data.users.map((student) => {
                return {
                    id: cnt++,
                    name: student.userId,
                    level: student.level,
                }
            }));
            setTotalCnt(data.totalCnt);
        });
    }, []);

    // 더 불러오기 버튼을 눌렀을 때 실행되는 함수
    const handleLoadMore = () => {
        api.requestProblemUsers(props.problemId, page + 1).then((data) => {
            let cnt = 0;
            setStudents((prevStudents) => [
                ...prevStudents,
                ...data.users.map((student) => {
                    return {
                        id: cnt++,
                        name: student.userId,
                        level: student.level,
                    }
                })
            ]);
            setTotalCnt(data.totalCnt);
            setPage((prevPage) => prevPage + 1);
        });
    }

    return (
        <WhiteCard icon="check-circle-fill" title="이 문제를 푼 충남대생">
            <Table striped bordered hover className="text-basic-color box-shadow">
                <thead>
                    <tr>
                        <th>이름</th>
                    </tr>
                </thead>
                <tbody>
                    {students.length > 0 && <tr><td>총 {totalCnt}명의 충남대생이 이 문제를 풀었습니다.</td></tr>}
                    {students.length > 0 ? students.map((student) => {
                        return (
                            <UserElement user={student} />
                        )
                    }
                    ) : <tr><td>이 문제를 푼 충남대생이 없습니다.</td></tr>}
                    {students.length < totalCnt && <tr><td onClick={handleLoadMore} className="pointer">더 불러오기</td></tr>}
                </tbody>
            </Table>
        </WhiteCard>
    )
}