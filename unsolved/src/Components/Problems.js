import { useEffect, useRef, useState } from "react";
import { Col, Container, Form, Overlay, Pagination, Popover, Row } from "react-bootstrap";
import { baseStyle } from "./BaseStyle";
import WhiteCard from "./WhiteCard";
import ProblemTable from "./ProblemTable";
import api from "../ApiHandler";

/**
 * 문제 목록 페이지
 */
export default function Problems() {
    const [searchKeyword, setSearchKeyword] = useState("");
    // 필터 종류
    // 1: 전체
    // 2: 충남대 학생들이 풀지 못한 문제
    // 3: 단 한 명의 충남대 학생이 푼 문제
    // 4: 충남대에서 나만 푼 문제
    const [filterType, setFilterType] = useState(2);
    const [levelStart, setLevelStart] = useState(1); // 난이도 범위
    const [levelEnd, setLevelEnd] = useState(30);
    const [isAsc, setIsAsc] = useState(false); // 오름차순 정렬 여부
    const [sort, setSort] = useState("solvedCount"); // 정렬 기준: solvedCount, level, problemId
    const [page, setPage] = useState(0); // 현재 페이지
    const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
    const [count, setCount] = useState(-1); // 검색 결과 개수
    const [searchTime, setSearchTime] = useState(-1); // 검색 시간

    const [problems, setProblems] = useState([]); // 표시될 문제들

    const currentRequestId = useRef(0); // 마지막 요청만 처리하기 위한 변수
    const handleSearch = () => {
        currentRequestId.current++;
        const currentId = currentRequestId.current;
        const startTime = new Date().getTime();

        setProblems([]);
        setCount(-1);
        setSearchTime(-1);

        const handleSave = (data) => { // 검색 결과를 저장하는 함수
            if (currentId !== currentRequestId.current) return;
            setProblems(data.content);
            setTotalPages(data.totalPages);
            setCount(data.count);
            setSearchTime(new Date().getTime() - startTime);
        };

        switch (filterType) { // 필터에 따라 검색
            case 1: // 1: 전체
                api.requestProblemSearch(page, searchKeyword, levelStart, levelEnd, isAsc, "", sort).then(handleSave);
                break;
            case 2: // 2: 충남대 학생들이 풀지 못한 문제
                api.requestProblemSearch(page, searchKeyword, levelStart, levelEnd, isAsc, "$cnu", sort).then(handleSave);
                break;
            case 3: // 3: 단 한 명의 충남대 학생이 푼 문제
                api.requestProblemSearch(page, searchKeyword, levelStart, levelEnd, isAsc, "$onlyOneUser", sort).then(handleSave);
                break;
            case 4: // 4: 충남대에서 나만 푼 문제
                api.requestProblemSearch(page, searchKeyword, levelStart, levelEnd, isAsc, "$onlyOneUser_", sort).then(handleSave);
                break;
            case 5: // 5: 충남대에서 나만 못 푼 문제
                api.requestProblemSearch(page, searchKeyword, levelStart, levelEnd, isAsc, "$notMe_", sort).then(handleSave);
            default:
                console.error("Invalid filter type");
                break;
        }

    }

    useEffect(() => { // 검색 조건이 변경되면 페이지를 0으로 초기화하고 검색
        setPage(0);
        handleSearch();
    }, [levelStart, levelEnd, isAsc, sort, filterType, searchKeyword]);

    useEffect(() => { // 페이지가 변경되면 검색
        handleSearch();
    }, [page]);

    return (
        <>
        <Col style={baseStyle} className="text-basic-color">
            <h1 className="m-3">Unsolved Problems</h1>
            <Row className="m-4">
                <Col md={3}>
                    <Filters searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword}  levelLow={levelStart} setLevelLow={setLevelStart} levelHigh={levelEnd} setLevelHigh={setLevelEnd} filter={filterType} setFilter={setFilterType}/>
                </Col>
                <Col md={9}>
                    <ProblemList problems={problems} page={page} setPage={setPage} totalPages={totalPages} setTotalPages={setTotalPages} isAsc={isAsc} setIsAsc={setIsAsc} sort={sort} setSort={setSort} count={count} searchTime={searchTime} />
                </Col>
            </Row>
        </Col>
        </>
    );
}

/**
 * 필터 설정을 할 수 있는 WhiteCard
 */
function Filters(props) {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [target, setTarget] = useState(null);

    const searchKeyword = props.searchKeyword, setSearchKeyword = props.setSearchKeyword;
    const levelLow = props.levelLow, setLevelLow = props.setLevelLow;
    const levelHigh = props.levelHigh, setLevelHigh = props.setLevelHigh;
    const filter = props.filter, setFilter = props.setFilter;


    const handleSearch = props.handleSearch;
    const handleShowSuggestions = (e) => { // 검색어 입력란을 클릭했을 때 검색 입력 기능을 보여줌
        setShowSuggestions(true);
        setTarget(e.target);
    }

    const filters = [
        {id: 1, name: "전체", selected: filter === 1},
        {id: 2, name: "충남대 학생들이 풀지 못한 문제", selected: filter === 2},
        {id: 3, name: "단 한 명의 충남대 학생이 푼 문제", selected: filter === 3},
        {id: 4, name: "충남대에서 나만 푼 문제", selected: filter === 4, loginRequired: true},
        {id: 5, name: "충남대에서 내가 못 푼 문제", selected: filter === 5, loginRequired: true},
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
            <span className="ms-3">{getImg(levelLow)}</span>
            <span className="ms-3">~</span>
            <span className="ms-3">{getImg(levelHigh)}</span>
            </>
        )
    };

    const handleDiff = (e, isLow) => {
        const level = parseInt(e.target.value);
        // console.log(isLow, diff, difficultyLow, difficultyHigh);
        if (isLow) {
            setLevelLow(level);
            if (level > levelHigh) {
                setLevelHigh(level);
            }
        } else {
            setLevelHigh(level);
            if (level < levelLow) {
                setLevelLow(level);
            }
        }
    };

    return (
        <>
        <WhiteCard icon="filter-square-fill" title="검색 필터">
            <Form className="text-start">
                <Form.Group className="mb-3" controlId="formSearch">
                    <Form.Control type="text" placeholder="검색" value={searchKeyword} onChange={(e) => {
                        setSearchKeyword(e.target.value);
                    }} onClick={handleShowSuggestions} className="text-basic-color" autoComplete="off"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formFilter">
                    <Form.Select aria-label="검색 필터" className="text-basic-color" onChange={
                        (e) => {
                            setFilter(parseInt(e.target.value));
                        }
                    }>
                        {filters.map((filter) => {
                            if (filter.loginRequired && !api.isLoggedIn()) 
                                return <option value={filter.id} disabled>{filter.name} (로그인 필요)</option>
                            else
                                return <option value={filter.id} selected={filter.selected}>{filter.name}</option>
                        })}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDifficulty">
                    <Form.Label>난이도: {displayDiff()}</Form.Label>
                    <Form.Range min="0" max="30" step="1" value={levelLow} onChange={(e) => {handleDiff(e, true)}}/>
                    <Form.Range min="0" max="30" step="1" value={levelHigh} onChange={(e) => {handleDiff(e, false)}}/>
                </Form.Group>
            </Form>
        </WhiteCard>
        {showSuggestions && <SearchSuggestions target={target} onClose={() => {setShowSuggestions(false)}} />}
        </>
    )
}

/**
 * 검색어 입력 때 사용할 수 있는 기능을 보여주는 팝업
 */
function SearchSuggestions({ target, onClose }) {
    const popoverRef = useRef(null);

    return (
        <Overlay target={target} show placement="bottom" containerPadding={10} ref={popoverRef} rootClose onHide={onClose}>
            <Popover id="search-suggestions" className="box-shadow text-basic-color neo" style={{ width: '300px' }}>
                <Popover.Body className="bg-gray-color">
                    <Container>
                        <Row>
                            <Col className="text-basic-color neo">
                                <div>검색 기능들 (혼용 가능)</div>
                                <div><span className="thin">문제 이름</span></div>
                                <div><span className="thin">문제 번호</span></div>
                                <div>#<span className="thin ms-2">알고리즘 태그</span></div>
                            </Col>
                        </Row>
                    </Container>
                </Popover.Body>
            </Popover>
        </Overlay>
    )
}

/**
 * 문제 목록을 보여주는 WhiteCard
 */
function ProblemList(props) {
    const problems = props.problems, setProblems = props.setProblems;
    const page = props.page, setPage = props.setPage;
    const totalPages = props.totalPages, setTotalPages = props.setTotalPages;
    const isAsc = props.isAsc, setIsAsc = props.setIsAsc;
    const sort = props.sort, setSort = props.setSort;
    const count = props.count;
    const searchTime = props.searchTime;
    
    // 페이지 이동 버튼
    function Item(props) {
        const page = props.page, active = props.active;
        return (
            <Pagination.Item key={page} onClick={() => {setPage(page)}} active={active} >{page + 1}</Pagination.Item>
        )
    }

    return (
        <WhiteCard icon="binoculars-fill" title="문제 목록">
            <ProblemTable problems={problems} isAsc={isAsc} setIsAsc={setIsAsc} sort={sort} setSort={setSort} canSort={true}/>
            <Container className="text-basic-color neo" fluid>
                <Row>
                    <Col className="d-flex justify-content-center">
                    <Pagination className="float-start">
                        {page > 1 && <Pagination.First key={0} onClick={() => {setPage(0)}} />}
                        {page > 2 && <Item page={page - 3} />}
                        {page > 1 && <Item page={page - 2} />}
                        {page > 0 && <Item page={page - 1} />}
                        {<Item page={page} active={true} />}
                        {page < totalPages - 1 && <Item page={page + 1} />}
                        {page < totalPages - 2 && <Item page={page + 2} />}
                        {page < totalPages - 3 && <Item page={page + 3} />}
                        {page < totalPages - 1 && <Pagination.Last key={totalPages + 2} onClick={() => {setPage(totalPages - 1)}} />}
                    </Pagination>
                    </Col>
                </Row>
                <Row>
                    {count >= 0 && <Col className="d-flex justify-content-end">
                        <div>검색 결과: {count}개, 소요 시간: {searchTime}ms</div>
                    </Col>}
                </Row>
            </Container>
        </WhiteCard>
    )
}