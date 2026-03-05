import { useState } from "react";
import api from "../ApiHandler";
import { Col, Container, Form, Modal, Row } from "react-bootstrap";
import WhiteCard from "./WhiteCard";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import Formmated from "./Formmated";

/**
 * 게시글 작성 Modal
 */
export default function PostModalWrite({ onClose }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleTitleChange = (e) => { setTitle(e.target.value); };
    const handleContentChange = (e) => { setContent(e.target.value); };
    const handleSubmit = () => { // 제출 버튼을 눌렀을 때 실행되는 함수
        if (title === '' || content === '') {
            alert("제목과 내용을 입력해주세요.");
            return;
        }
        api.addPost(title, content).then(() => {
            window.location.reload();
        })
    };

    return (
        <>
        <Modal show={true} onHide={onClose} animation={true} centered={true} size="xl" className="box-shadow">
            <Modal.Header closeButton>
                <Modal.Title className="text-basic-color w-100">
                    <Container className="w-100">
                        <Row>
                            <Col>
                            { /* 제목 입력란 */ }
                            <Form.Control type="text" placeholder="제목" value={title} onChange={handleTitleChange} />
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
                        <Col>
                            <WhiteCard>
                                { /* 내용 입력란 */ }
                                <Form.Control as="textarea" placeholder="내용" value={content} onChange={handleContentChange} style={{ height: "70vh" }}/>
                            </WhiteCard>
                        </Col>
                        <Col>
                            <WhiteCard>
                                미리보기
                                { /* 내용 미리보기 */ }
                                <div className="text-start">
                                    <Formmated>{content}</Formmated>
                                </div>
                            </WhiteCard>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <button className="pointer" onClick={handleSubmit}>작성</button>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
        </>
    )
}