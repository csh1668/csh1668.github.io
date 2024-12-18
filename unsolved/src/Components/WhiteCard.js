import { Card } from "react-bootstrap";

/**
 * 흰색 카드 컴포넌트
 * @param {*} props 
 * @param {string} props.title Card의 제목
 * @param {string} props.icon Card의 제목 왼쪽에 붙을 아이콘
 * @param {*} props.children Card의 내용
 * @returns 
 */
export default function WhiteCard(props) {
    return (
        <Card className="m-2 text-basic-color box-shadow" bg="light" style={{
            overflow: "scroll",
        }}>
            {props.title ? 
            <Card.Header className="bg-white-color">
                {props.icon ? <i className={`bi bi-${props.icon} float-start fs-3`}></i> : null}
                {props.rightHeader ? props.rightHeader : null}
                <span><h3>{props.title}</h3></span>
            </Card.Header> : null}
            <Card.Body className="bg-white-color">
                {props.children}
            </Card.Body>
        </Card>
    );
}