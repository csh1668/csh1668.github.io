import { Card } from "react-bootstrap";

/**
 * 
 * @param {*} props 
 * @param {string} props.title Card의 제목
 * @param {string} props.icon Card의 제목 왼쪽에 붙을 아이콘
 * @param {*} props.children Card의 내용
 * @returns 
 */
export default function WhiteCard(props) {
    return (
        <Card className="m-2 text-basic-color" bg="light">
            <Card.Header className="bg-white-color">
                {props.icon ? <i className={`bi bi-${props.icon} float-start fs-3`}></i> : null}
                <span><h3>{props.title}</h3></span>
            </Card.Header>
            <Card.Body className="bg-white-color">
                {props.children}
            </Card.Body>
        </Card>
    );
}