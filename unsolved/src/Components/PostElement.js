import { useState } from "react";
import PostModal from "./PostModal";

export default function PostElement(props) {
    const post = props.post;

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
        <tr>
            <td className="text-basic-color">{post.id}</td>
            <td className="text-basic-color" width="50%">
                <a className="text-decoration-none" href="#" onClick={handleShow}>
                    {post.title} <span style={{fontSize: 12}}>[{post.comments}]</span>
                </a>
            </td>
            <td className="text-basic-color">{post.author}</td>
            <td className="text-basic-color">{post.date}</td>
            <td className="text-basic-color">{post.views}</td>
            <td className="text-basic-color">{post.likes}</td>
        </tr>
        {show && <PostModal onClose={handleClose} postId={post.id} />}
        </>
    )
}