import { useState } from "react";

/**
 * 한 번 클릭해야 내용이 보이는 스포일러 컴포턴트
 */
export default function Spoiler(props) {
    const spoilerText = "**스포일러**";
    const [text, setText] = useState(spoilerText);
    const [spoilerStyle, setSpoilerStyle] = useState({
        cursor: "pointer",
    });

    const toggleVisibility = () => {
        if (text === spoilerText) {
            setText(props.children);
            setSpoilerStyle({
                cursor: "text",
            });
        }
    };
    return (
        <>
        <div onClick={toggleVisibility} className="text-basic-color" style={spoilerStyle}>
            {text}
        </div>
        </>
    )
}