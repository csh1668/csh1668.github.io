import { Col, Container, Pagination, Row, Table } from "react-bootstrap";
import { baseStyle } from "./BaseStyle";
import WhiteCard from "./WhiteCard";
import { useState } from "react";
import PostElement from "./PostElement";

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
    const [posts, setPosts] = useState([
        {id: 1, title: "안녕하세요", author: "tjgus1668", date: "2024-11-10", views: 10, comments: 5, likes: 3},
        {id: 2, title: "질문입니다", author: "asdasd", date: "2024-11-11", views: 15, comments: 12, likes: 0},
    ])
    const headers = ["번호", "제목", "작성자", "날짜", "조회수", "추천 수"];
    const headersInternal = {"번호": "id", "제목": "title", "작성자": "author", "날짜": "date", "조회수": "views", "추천 수": "likes"};
    const [sort, setSort] = useState("id");
    const [sortType, setSortType] = useState("desc");
    const [page, setPage] = useState(1);
    let pages = [];
    for (let i = 1; i <= 5; ++i) {
        pages.push(
            <Pagination.Item key={i} active={i === page} onClick={() => setPage(i)} className="text-basic-color">{i}</Pagination.Item>
        )
    }

    const handleHeaderClick = (h) => {
        if (sort === h) {
            if (sortType === "asc") {
                setSortType("desc");
            } else {
                setSortType("asc");
            }
        } else {
            setSort(h);
            setSortType("desc");
        }
    }

    const orderPosts = (a, b) => {
        if (sortType === "asc") {
            if (a[sort] < b[sort]) {
                return -1;
            } else if (a[sort] > b[sort]) {
                return 1;
            } else {
                return 0;
            }
        } else {
            if (a[sort] < b[sort]) {
                return 1;
            } else if (a[sort] > b[sort]) {
                return -1;
            } else {
                return 0;
            }
        }
    }

    return (
        <WhiteCard icon="people-fill" title="게시판">
            <Table striped bordered hover className="text-basic-color box-shadow">
                <thead>
                    <tr>
                        {headers.map((header) => {
                            return <th className="text-basic-color" role="button" onClick={(e) => {
                                handleHeaderClick(headersInternal[header]);
                            }}>{header}{
                                sort === headersInternal[header] ? (sortType === "asc" ? " ▲" : " ▼") : " 　"
                            }</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {posts.sort(orderPosts).map(post => {
                        return (
                            <PostElement post={post} />
                        )
                    })}
                </tbody>
            </Table>
            <Container className="d-flex justify-content-center">
                <Pagination>{pages}</Pagination>
            </Container>
        </WhiteCard>
    )
}