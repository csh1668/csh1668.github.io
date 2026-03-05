import { useState } from "react";
import ProblemModal from "./ProblemModal";
import Tier from "./Tier";
import { useOption } from "../OptionContext";
import Formmated from "./Formmated";

/**
 * 문제 목록에서 하나의 문제 Row를 표시하는 컴포넌트 + 클릭하면 표시되는 Modal창
 */
export default function ProblemElement(props) {
    const { showProblemTier } = useOption();
    const [show, setShow] = useState(false);

    const boj = `https://boj.kr/${props.id}`;

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
        <tr className="text-start link-element" id={props.id}>
            <td className="text-basic-color">{props.id}</td>
            {/* <td className="text-basic-color"><a href={boj} className="text-decoration-none"><img src={tier} alt="tier" style={tierStyle}></img>{props.name}</a></td> */}
            {showProblemTier && <td width="20px"><Tier level={props.level} /></td>}
            
            <td className="text-basic-color" height="10px" style={{overflow: "hidden"}}>
                <a className="text-decoration-none" href="#" onClick={handleShow}><Formmated>{props.name}</Formmated></a>
            </td>
            <td className="text-basic-color">{props.solved}</td>
        </tr>
        {/* 클릭하면 Modal창이 뜸 */}
        { show && <ProblemModal problemId={props.id} onClose={handleClose} />}
        </>
    );
}