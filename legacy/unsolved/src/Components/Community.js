import { Col, Container, Pagination, Row, Table } from "react-bootstrap";
import { baseStyle } from "./BaseStyle";
import WhiteCard from "./WhiteCard";
import { useEffect, useRef, useState } from "react";
import PostElement from "./PostElement";
import api from "../ApiHandler";
import PostModal from "./PostModal";
import PostModalWrite from "./PostModalWrite";

/**
 * 커뮤니티 페이지 페이지
 */
export default function Community() {
    return (
        <Col style={baseStyle} className="text-basic-color">
            <h1 className="m-3">Community</h1>
            <Row className="m-4">
                <Col>
                    <Board />
                </Col>
            </Row>
        </Col>
    );
}

function Board() {
    const headers = ["번호", "제목", "작성자", "날짜", "조회수", "추천 수"];
    const headersInternal = {"번호": "postId", "제목": "title", "작성자": "author", "날짜": "createdDate", "조회수": "viewCount", "추천 수": "likeCount"};

    const [sort, setSort] = useState("createdDate"); // 정렬 기준
    const [isAsc, setIsAsc] = useState(false); // 오름차순 정렬 여부
    const [page, setPage] = useState(0); // 현재 페이지
    const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
    const [count, setCount] = useState(-1); // 검색 결과 수
    const [searchTime, setSearchTime] = useState(-1); // 검색 시간

    const [posts, setPosts] = useState([
        // {id: 1, title: "안녕하세요", author: "tjgus1668", date: "2024-11-10", views: 10, comments: 5, likes: 3},
        // {id: 2, title: "질문입니다", author: "asdasd", date: "2024-11-11", views: 15, comments: 12, likes: 0},
    ]);
    const currentRequestId = useRef(0); // 마지막 요청만 처리하기 위한 변수
    const handleSearch = () => {
        const currentId = ++currentRequestId.current;
        const startTime = new Date().getTime();

        setPosts([]);
        setCount(-1);
        setSearchTime(-1);

        const handleSave = (data) => {
            if (currentId !== currentRequestId.current) return;
            // 마지막 요청만 처리
            setPosts(data.content);
            setTotalPages(data.totalPages);
            setCount(data.count);
            setSearchTime(new Date().getTime() - startTime);
        };

        api.requestPostList(page, sort, isAsc).then(handleSave);
    };

    useEffect(() => {
        // 정렬 기준이나 오름차순 여부가 변경되면 페이지를 0으로 초기화하고 검색
        setPage(0);
        handleSearch();
    }, [sort, isAsc]);

    useEffect(() => {
        handleSearch();
    }, [page]);

    // 페이지 이동 버튼
    function Item(props) {
        const page = props.page, active = props.active;
        return (
            <Pagination.Item key={page} onClick={() => setPage(page)} active={active}>{page + 1}</Pagination.Item>
        );
    }

    // 헤더 클릭 시 정렬 기준을 바꾸기 위한 함수
    const handleHeaderClick = (h) => {
        if (sort === h) {
            setIsAsc(!isAsc);
        } else {
            setSort(h);
            setIsAsc(false);
        }
    };

    return (
        <WhiteCard icon="people-fill" title="게시판">
            <Table striped bordered hover className="text-basic-color box-shadow">
                <thead>
                    <tr>
                        {headers.map((header) => {
                            return <th className="text-basic-color" role="button" onClick={(e) => {
                                handleHeaderClick(headersInternal[header]);
                            }}>{header}{
                                sort === headersInternal[header] ? (isAsc ? " ▲" : " ▼") : " 　"
                            }</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post => {
                        return (
                            <PostElement post={post} handleSearch={handleSearch} />
                        )
                    })}
                </tbody>
            </Table>
            <Container className="text-basic-color neo">
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Pagination>
                            {page > 1 && <Pagination.First key={0} onClick={() => setPage(0)} />}
                            {page > 2 && <Item page={page - 3} />}
                            {page > 1 && <Item page={page - 2} />}
                            {page > 0 && <Item page={page - 1} />}
                            <Item page={page} active={true} />
                            {page < totalPages - 1 && <Item page={page + 1} />}
                            {page < totalPages - 2 && <Item page={page + 2} />}
                            {page < totalPages - 3 && <Item page={page + 3} />}
                            {page < totalPages - 1 && <Pagination.Last key={totalPages - 1} onClick={() => setPage(totalPages - 1)} />}
                        </Pagination>
                    </Col>
                </Row>
                <Row>
                    <AddPostButton handleSearch={handleSearch} />
                    {count >= 0 && <Col className="d-flex justify-content-end">검색 결과: {count}개, 소요 시간: {searchTime}ms</Col>}
                </Row>
            </Container>
        </WhiteCard>
    )
}

/**
 * 글 작성 버튼
 */
function AddPostButton({ handleSearch }) {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        handleSearch();
    }

    if (!api.isLoggedIn()) return <></>;

    return (
        <>
        <Col className="d-flex justify-content-start">
            <div className="pointer" onClick={handleShow}>글 작성</div>
        </Col>
        {show && <PostModalWrite onClose={handleClose} />}
        </>
    )
}