import { useState, useEffect, useRef } from "react";
import { Container, Form, Navbar, Overlay, Popover, Button } from "react-bootstrap";
import api from "../ApiHandler";
import { useNavigate } from "react-router-dom";
import { useOption } from "../OptionContext";

/**
 * 상단 네비게이션 바
 */
export default function MyNavbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState("");
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const navigate = useNavigate();

    const handleShow = (e) => {
        setShow(true);
        setTarget(e.target);
    }
    const handleClose = () => setShow(false);
    const handleLogin = (userId) => {
        api.login(userId);
        setUserId(userId);
        setIsLoggedIn(true);
        handleClose();
        navigate(0);
    }
    const handleLogout = () => {
        api.logout();
        setUserId("");
        setIsLoggedIn(false);
        navigate(0);
    }

    useEffect(() => {
        setIsLoggedIn(api.isLoggedIn());
        setUserId(api.userId);
    }, []);

    return (
        <>
        <Navbar className="box-shadow">
        <Container>
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    {isLoggedIn ? (
                        <>
                        <a href={`https://www.acmicpc.net/user/${userId}`} className="text-decoration-none text-highlight-color">{userId}</a>님 환영합니다. {' '}
                        <a href="#" className="text-decoration-none text-highlight-color" onClick={handleLogout}>로그아웃</a>
                        </>
                    ) : (
                        <a href="#" className="text-decoration-none text-highlight-color" onClick={handleShow}>로그인</a>
                    )}
                    <ViewOption />
                </Navbar.Text>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        {show && (
            <LoginPopover target={target} onClose={handleClose} onLogin={handleLogin} />
        )}
        </>
    );
}

/**
 * 로그인 버튼을 눌렀을 떄 표시되는 팝업
 */
function LoginPopover({ target, onClose, onLogin }) {
    const [userId, setUserId] = useState("");
    const popoverRef = useRef(null);

    const handleLogin = () => {
        if (userId.trim() === "") {
            alert("아이디를 입력해주세요.");
            return;
        }
        onLogin(userId);
    }

    return (
        <Overlay target={target} show placement="bottom" containerPadding={10} ref={popoverRef}>
            <Popover id="login-popover" className="box-shadow text-basic-color neo" style={{ width: '300px' }}>
                <Popover.Body className="bg-gray-color">
                    <Form>
                        <Form.Group className="mb-3 neo" controlId="formUserId">
                            <Form.Control type="text" placeholder="백준 아이디를 입력해주세요." value={userId} onChange={(e) => setUserId(e.target.value)} />
                        </Form.Group>
                        <div className="d-flex justify-content-end neo text-basic-color">
                            <div onClick={handleLogin} className="me-3 neo pointer"><span className="neo">로그인</span></div>
                            <div onClick={onClose} className="neo pointer">닫기</div>
                        </div>
                    </Form>
                </Popover.Body>
            </Popover>
        </Overlay>
    )
}

/**
 * 옵션 버튼
 */
function ViewOption() {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);

    const handleShow = (e) => {
        setShow(!show);
        setTarget(e.target);
    }
    const handleClose = () => setShow(false);

    return (
        <>
        <i className="bi bi-gear-fill pointer ms-2" onClick={handleShow}></i>
        {show && (
            <ViewOptionPopover target={target} onClose={handleClose} />
        )}
        </>
    );
}

/**
 * 옵션 버튼을 눌렀을 때 표시되는 팝업
 */
function ViewOptionPopover({ target, onClose }) {
    const { showProblemTier, setShowProblemTier, showUserTier, setShowUserTier } = useOption();
    const popoverRef = useRef(null);

    return (
        <Overlay target={target} show placement="bottom" containerPadding={10} ref={popoverRef} rootClose onHide={onClose}>
            <Popover id="login-popover" className="box-shadow text-basic-color neo" style={{ width: '300px' }}>
                <Popover.Body className="bg-gray-color">
                    <Form>
                        <Form.Group className="mb-3 neo" controlId="formUserId">
                            <Form.Check type="switch" id="showProblemTier" label="문제 티어 표시" checked={showProblemTier} onChange={(e) => setShowProblemTier(e.target.checked)} />
                            <Form.Check type="switch" id="showUserTier" label="사용자 티어 표시" checked={showUserTier} onChange={(e) => setShowUserTier(e.target.checked)} />
                        </Form.Group>
                        <div className="d-flex justify-content-end neo text-basic-color">
                            <div onClick={onClose} className="neo pointer">닫기</div>
                        </div>
                    </Form>
                </Popover.Body>
            </Popover>
        </Overlay>
    )
}