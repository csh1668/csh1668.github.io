import { useState } from "react";
import ProblemModal from "./ProblemModal";
import Tier from "./Tier";

export default function ProblemElement(props) {
    const [show, setShow] = useState(false);

    const boj = `https://boj.kr/${props.id}`;

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
        <tr className="text-start">
            <td className="text-basic-color">{props.id}</td>
            {/* <td className="text-basic-color"><a href={boj} className="text-decoration-none"><img src={tier} alt="tier" style={tierStyle}></img>{props.name}</a></td> */}
            <td className="text-basic-color">
                <a className="text-decoration-none" href="#" onClick={handleShow}>
                    <Tier level={props.level} />{props.name}
                </a>
            </td>
            <td className="text-basic-color">{props.solved}</td>
        </tr>
        { show && ProblemModal({onClose: handleClose, problemId: props.id}) }
        </>
    );
}