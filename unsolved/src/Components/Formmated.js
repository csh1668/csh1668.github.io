import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import Markdown from "react-markdown";

/**
 * 텍스트를 마크다운 형식으로 렌더링하는 컴포넌트
 */
export default function Formmated(props) {
    return (
        <Markdown rehypePlugins={[rehypeKatex, rehypeHighlight]} remarkPlugins={remarkMath}>
            {props.children}
        </Markdown>
    )
}