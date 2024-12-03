import { Col, Container, Form, FormGroup, Modal, Row } from "react-bootstrap";
import UserElement from "./UserElement";
import { useEffect, useState } from "react";
import WhiteCard from "./WhiteCard";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import api from "../ApiHandler";
import Formmated from "./Formmated";

/**
 * 게시글을 상세하게 보여주는 Modal
 */
export default function PostModal(props) {
    const handleSearch = props.handleSearch;

    const [post, setPost] = useState({
        postId: -1,
        title: '',
        content: '',
        author: '',
        viewCount: -1,
        likeCount: -1,
        comments: [],
        createdAt: ''
    });

    const handleLoad = async () => { // 게시글 정보를 불러오는 함수
        return await api.requestPost(props.postId).then(setPost);
    };
    const handleLike = () => { // 게시글을 추천하는 함수
        alert("추천하였습니다.");
        api.likePost(props.postId).then(() => {
            handleLoad();
        });
    };
    const handleDelete = () => { // 게시글을 삭제하는 함수
        if (window.confirm("정말 삭제하시겠습니까?")) {
            api.deletePost(props.postId).then(() => {
                props.onClose();
                handleSearch();
            });
        }
    };
    
    useEffect(() => {
        handleLoad();
    }, [props.postId]);

    return (
        <>
        <Modal show={true} onHide={props.onClose} animation={true} centered={true} size="xl" className="box-shadow">
            <Modal.Header closeButton>
                <Modal.Title className="text-basic-color w-100">
                    <Container className="w-100">
                        <Row>
                            <Col>
                            {post.postId}: {post.title}
                            </Col>
                            <Col>
                            <span className="float-end me-3 justify-contents-bottom" style={{fontSize: 16}}>
                                {post.createdAt}</span>
                            </Col>
                        </Row>
                        <Row style={{fontSize: 16}}>
                            <Col>
                            {/* <UserElement user={post.author} size={16} /> */}
                            <span>{post.author}</span>
                            <span className="ms-2">
                                {/* <i className="bi bi-pencil-fill pointer" onClick={handleLike}></i> */}
                                {api.userId === post.author && <i className="bi bi-trash-fill pointer" onClick={handleDelete}></i>}
                            </span>
                            </Col>
                            <Col>
                            <span className="float-end me-3">
                                <i className="bi bi-hand-thumbs-up-fill pointer" onClick={handleLike}></i>
                                <span className="me-3">{post.likeCount}</span>
                                조회수: {post.viewCount}
                            </span>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="bg-gray-color text-center">
                <Container style={{
                    height: "80vh", overflowY: "auto"
                }}>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <PostContents content={post.content} />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <CommentContents comments={post.comments} postId={post.postId} handleLoad={handleLoad} />
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
        </>
    );
}

/**
 * 게시글 내용을 보여주는 WhiteCard
 */
function PostContents(props) {
    const content = props.content;

    return (
        <div style={{width: "60%"}}>
            <WhiteCard>
                <Container>
                    <div className="text-start">
                    <Formmated>{content}</Formmated>
                    </div>
                </Container>
            </WhiteCard>
        </div>
    )
}

/**
 * 댓글을 보여주는 WhiteCard
 */
function CommentContents(props) {
    const comments = props.comments;
    const postId = props.postId;
    const handleLoad = props.handleLoad;

    const [commentValue, setCommentValue] = useState('');

    const handleAddComment = () => { // 댓글을 추가하는 함수
        api.addComment(postId, commentValue).then(() => {
            handleLoad();
            setCommentValue('');
        });
    };

    return (
        <div style={{width: "60%"}}>
            <WhiteCard title={`댓글 (${comments.length})`}>
                <Container>
                    {api.isLoggedIn() && // 로그인 상태일 때만 댓글 작성 가능
                    <>
                    <Row>
                        <Col lg={10}>
                        <Form.Control as="textarea" placeholder="댓글을 입력하세요." value={commentValue} onChange={(e) => setCommentValue(e.target.value)} />
                        </Col>
                        <Col lg={2} className="d-flex justify-content-center m-0 fluid">
                        <button onClick={handleAddComment}>작성</button>
                        </Col>
                    </Row>
                    <hr className="hr" /></>}

                    <div className="text-start">
                    {comments.map((comment) => { // 댓글들을 표시
                        return (
                            <>
                            <div key={comment.commentId} style={{backgroundColor: "#f7f7f7"}}>
                                <span ><span>{comment.author}</span><span className="float-end ms-3">{comment.createdAt}</span></span>
                                
                            </div>
                            <div>{comment.content}</div>
                            <hr className="hr" />
                            </>
                        )
                    })}
                    </div>
                </Container>
            </WhiteCard>
        </div>
    )
}

// function CommentEnter