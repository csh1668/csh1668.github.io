import { useState } from "react";
import PostModal from "./PostModal";

/**
 * 게시글 목록에서 하나의 게시글 Row를 나타내는 컴포넌트 + 클릭하면 Modal 표시
 */
export default function PostElement(props) {
    const post = props.post;
    const handleSearch = props.handleSearch;

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        handleSearch();
    }

    return (
        <>
        <tr className="link-element">
            <td className="text-basic-color">{post.postId}</td>
            <td className="text-basic-color" width="50%">
                <a className="text-decoration-none" href="#" onClick={handleShow}>
                    {post.title}
                    {/* <span style={{fontSize: 12}}>[{post.comments}]</span> */}
                </a>
            </td>
            <td className="text-basic-color">{post.author}</td>
            <td className="text-basic-color">{post.createdAt}</td>
            <td className="text-basic-color">{post.viewCount}</td>
            <td className="text-basic-color">{post.likeCount}</td>
        </tr>
        {show && <PostModal onClose={handleClose} postId={post.postId} handleSearch={handleSearch} />}
        </>
    )
}