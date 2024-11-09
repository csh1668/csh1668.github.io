import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { baseStyle } from "./BaseStyle";
import ProblemElement from "./ProblemElement";
import { useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import 'chart.js/auto';
import WhiteCard from "./WhiteCard";
import ProblemTable from "./ProblemTable";

export default function Home() {
    return (
        <>
        <Col style={baseStyle} className="text-basic-color">
            <h1 className="m-3">Home</h1>
            <Row className="m-4">
                <Col md={6}>
                    <DailyProblems />
                </Col>
                <Col md={6}>
                    <DailyStatus />
                </Col>
            </Row>
        </Col>
        </>
    );
}

function DailyStatus() {
    return (
        <WhiteCard icon="trophy-fill" title="충남대학교 학생들은 지금까지...">
            <p>오늘 푼 문제 수: 0</p>
            <p>전국 학교 랭킹: 0위</p>
            <DailyStatusChart />
        </WhiteCard>
    );
}

function DailyProblems() {

    const [problems, setProblems] = useState([
        {id: 1000, name: "A+B", solved: 100, level: 1},
        {id: 2839, name: "설탕 배달", solved: 50, level: 6},
        {id: 7576, name: "토마토", solved: 30, level: 11},
        {id: 6549, name: "히스토그램에서 가장 큰 직사각형", solved: 20, level: 16},
        {id: 18185, name: "라면 사기 (Small)", solved: 10, level: 21},
    ]);

    const headers = ["문제", "문제 이름", "푼 사람 수"];

    return (
        <WhiteCard icon="calendar-check-fill" title="오늘의 문제">
            <ProblemTable problems={problems} />
        </WhiteCard>
    )
}

function DailyStatusChart() {
    const ref = useRef();

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: '누적 푼 문제',
            data: [100, 150, 300, 430, 450, 600, 700, 800, 1000, 1050, 1100, 1400],
            fill: true,
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)'
          },
        ],
    };
    
    return (
        <Line ref={ref} data={data} options={{responsive: true}} />
    )
}