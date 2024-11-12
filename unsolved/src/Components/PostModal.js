import { Col, Container, Modal, Row } from "react-bootstrap";
import UserElement from "./UserElement";
import { useState } from "react";
import WhiteCard from "./WhiteCard";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

export default function PostModal(props) {
    const [post, setPost] = useState({
        id: 1,
        title: "Dummy Title",
        author: {id: 1, name: "tjgus1668", level: 25},
        date: (new Date()).toLocaleString(),
    });

    return (
        <>
        <Modal show={true} onHide={props.onClose} animation={true} centered={true} size="xl" className="box-shadow">
            <Modal.Header closeButton>
                <Modal.Title className="text-basic-color w-100">
                    <Container className="w-100">
                        <Row>
                            <Col>
                            {post.id}: {post.title}
                            </Col>
                            <Col>
                            <span className="float-end me-3 justify-contents-bottom" style={{fontSize: 16}}>{post.date}</span>
                            </Col>
                        </Row>
                        <Row style={{fontSize: 16}}>
                            <Col>
                            <UserElement user={post.author} size={16} />
                            </Col>
                            <Col>
                            <span className="float-end me-3">조회수: 0</span>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="bg-gray-color text-center">
                <Container style={{
                    height: "60vh", overflowY: "auto"
                }}>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <PostContents />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <CommentContents />
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
        </>
    );
}

function PostContents(props) {
    const content = `
## 마크다운 테스트
이 글은 **마크다운**으로 \`작성\`되었습니다.

링크 테스트 [#](https://velog.io/@tjgus1668/%EB%B0%B1%EC%A4%80-13927-%EC%88%98%EC%97%B4%EA%B3%BC-%EC%BF%BC%EB%A6%AC-14)

#### 리스트
1. 첫 번째
2. 두 번째
3. 세 번째

#### 코드 테스트
Python 테스트
\`\`\`python
import sys
from collections import deque

N = int(sys.stdin.readline())
q = deque()
while 1:
    x = int(sys.stdin.readline())
    if x == -1: break
    elif x == 0: q.popleft()
    else:
        if len(q) < N: q.append(x)

print(*q if q else 'empty')
\`\`\`

C++ 테스트
\`\`\`cpp
#include <bits/stdc++.h>
#include <ext/rope>

using namespace std;
using namespace __gnu_cxx;

int main(){
    ios_base::sync_with_stdio(0); cin.tie(0); cout.tie(0);

    int n, q; cin >> n >> q;
    string s; cin >> s;
    rope<char> rp(s.c_str());

    while (q--){
        int op; cin >> op;
        if (op == 1){
            char c; int i; cin >> c >> i; i--;
            rp.insert(i, c);
        } else {
            int l, r; cin >> l >> r; l--, r--;
            cout << rp.substr(l, r - l + 1) << '\n';
            rp.erase(l, r - l + 1);
        }
    }
}
\`\`\`
  `;

    return (
        <div style={{width: "60%"}}>
            <WhiteCard>
                <Container>
                    <div className="text-start">
                    <Markdown rehypePlugins={rehypeHighlight}>{content}</Markdown>
                    </div>
                </Container>
            </WhiteCard>
        </div>
    )
}

function CommentContents(props) {
    const comments = [
        {
            id: 1, author: {id: 1, name: "tjgus1668", level: 25}, date: (new Date()).toLocaleString(),
            content: "댓글 테스트입니다."
        },
        {
            id: 2, author: {id: 2, name: "brian951862", level: 15}, date: (new Date()).toLocaleString(),
            content: "ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇ"
        }
    ]

    return (
        <div style={{width: "60%"}}>
            <WhiteCard title="댓글">
                <Container>
                    <div className="text-start">
                    {comments.map((comment) => {
                        return (
                            <div key={comment.id}>
                                <span><UserElement user={comment.author} size={16} /><span className="float-end ms-3">{comment.date}</span></span>
                                <div>{comment.content}</div>
                                <hr className="hr" />
                            </div>
                        )
                    })}
                    </div>
                </Container>
            </WhiteCard>
        </div>
    )
}