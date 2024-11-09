import { useState } from "react";
import { Col, Container, Form, Pagination, Row } from "react-bootstrap";
import { baseStyle } from "./BaseStyle";
import WhiteCard from "./WhiteCard";
import ProblemTable from "./ProblemTable";

export default function Problems() {
    return (
        <>
        <Col style={baseStyle} className="text-basic-color">
            <h1 className="m-3">Unsolved Problems</h1>
            <Row className="m-4">
                <Col md={3}>
                    <Filters />
                </Col>
                <Col md={9}>
                    <ProblemList />
                </Col>
            </Row>
        </Col>
        </>
    );
}

function Filters() {
    const [difficultyLow, setDifficultyLow] = useState(1);
    const [difficultyHigh, setDifficultyHigh] = useState(30);

    const filters = [
        {id: 1, name: "전체"},
        {id: 2, name: "충남대 학생들이 풀지 못한 문제", selected: true},
        {id: 3, name: "단 한 명의 충남대 학생이 푼 문제"},
        {id: 4, name: "충남대 학생이 많이 푼 문제"},
        {id: 5, name: "충남대 학생이 출제한 문제"},
    ];

    const displayDiff = () => {
        const getImg = (diff) => {
            const tierStyle = {
                width: "20px",
                height: "20px",
                marginRight: "5px",
            }
            const url = `https://static.solved.ac/tier_small/${diff}.svg`;
            return (
                <img src={url} alt="tier" style={tierStyle}></img>
            );
        }
        return (
            <>
            <span className="ms-3">{getImg(difficultyLow)}</span>
            <span className="ms-3">~</span>
            <span className="ms-3">{getImg(difficultyHigh)}</span>
            </>
        )
    };

    const handleDiff = (e, isLow) => {
        const diff = parseInt(e.target.value);
        console.log(isLow, diff, difficultyLow, difficultyHigh);
        if (isLow) {
            setDifficultyLow(diff);
            if (diff > difficultyHigh) {
                setDifficultyHigh(diff);
            }
        } else {
            setDifficultyHigh(diff);
            if (diff < difficultyLow) {
                setDifficultyLow(diff);
            }
        }
    };

    return (
        <WhiteCard icon="filter-square-fill" title="검색 필터">
            <Form className="text-start">
                <Form.Group className="mb-3" controlId="formSearch">
                    <Form.Control type="text" placeholder="검색" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formFilter">
                    <Form.Select aria-label="검색 필터" className="text-basic-color">
                        {filters.map((filter) => {
                            return <option value={filter.id} selected={filter.selected}>{filter.name}</option>
                        })}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDifficulty">
                    <Form.Label>난이도: {displayDiff()}</Form.Label>
                    <Form.Range min="0" max="30" step="1" value={difficultyLow} onChange={(e) => {handleDiff(e, true)}}/>
                    <Form.Range min="0" max="30" step="1" value={difficultyHigh} onChange={(e) => {handleDiff(e, false)}}/>
                </Form.Group>
            </Form>
        </WhiteCard>
    )
}

function ProblemList() {
    const [problems, setProblems] = useState([
        {id: 32399, name: "햄버거 정렬", solved: 359, level: 3},
        {id: 32400, name: "다트판", solved: 191, level: 4},
        {id: 32401, name: "ANA는 회문이야", solved: 174, level: 4},
        {id: 32402, name: "TPS", solved: 82, level: 9},
        {id: 32403, name: "전구 주기 맞추기", solved: 140, level: 6},
        {id: 32404, name: "일이 커졌어", solved: 108, level: 11},
        {id: 32405, name: "배틀 로얄", solved: 61, level: 12},
        {id: 32406, name: "의좋은 형제", solved: 57, level: 11},
        {id: 32407, name: "식물 기르기", solved: 57, level: 12},
        {id: 32408, name: "대전 도시철도 2호선", solved: 38, level: 12},
        {id: 32409, name: "멜로디", solved: 29, level: 16},
        {id: 32410, name: "용감한 용사 수호", solved: 26, level: 15},
        {id: 32411, name: "계단 수열과 쿼리", solved: 20, level: 20},
        {id: 32412, name: "카드 뒤집기 1", solved: 19, level: 17},
        {id: 32413, name: "카드 뒤집기 2", solved: 13, level: 22}
    ]);
    const [page, setPage] = useState(1);
    let pages = [];
    for (let i = 1; i <= 5; i++) {
        pages.push(
            <Pagination.Item key={i} active={i === page} onClick={() => {setPage(i)}}
                className="text-basic-color"
            >{i}</Pagination.Item>,
        );
    }

    return (
        <WhiteCard icon="binoculars-fill" title="문제 목록">
            <ProblemTable problems={problems} />
            <Container className="d-flex justify-content-center">
                <Pagination>{pages}</Pagination>
            </Container>
        </WhiteCard>
    )
}