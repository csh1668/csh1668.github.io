import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { baseStyle } from "./BaseStyle";
import ProblemElement from "./ProblemElement";
import { useEffect, useRef, useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import 'chart.js/auto';
import WhiteCard from "./WhiteCard";
import ProblemTable from "./ProblemTable";
import Chart, { plugins } from "chart.js/auto";
import api from "../ApiHandler";

/**
 * 메인 페이지
 */
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

/**
 * 통계를 보여주는 컴포넌트 카드
 */
function DailyStatus() {
    const [totalRank, setTotalRank] = useState(-1);
    const [schoolRank, setSchoolRank] = useState(-1);
    const [solvedCnt, setSolvedCnt] = useState(-1);
    const [totalCnt, setTotalCnt] = useState(-1);
    const [solvedPrevTotalCnt, setSolvedPrevTotalCnt] = useState(-1);
    const [solvedPrevUnivCnt, setSolvedPrevUnivCnt] = useState(-1);
    const [prevTotal, setPrevTotal] = useState('');
    const [prevUniv, setPrevUniv] = useState('');

    useEffect(() => {
        api.requestSchoolRanking().then((data) => {
            setTotalRank(data.total);
            setSchoolRank(data.univ);
            setSolvedCnt(data.solved);
            setSolvedPrevTotalCnt(data.prevTotal.solved);
            setSolvedPrevUnivCnt(data.prevUniv.solved);
            setPrevTotal(data.prevTotal.name);
            setPrevUniv(data.prevUniv.name);
        });
        api.requestSolvingStatus().then((data) => {
            setTotalCnt(data.total);
        })
    }, []);

    return (
        <WhiteCard icon="trophy-fill" title="충남대학교 학생들은 지금까지...">
            <p>전체 단체 랭킹: {totalRank}위</p>
            <p className="thin" style={{fontSize: 12}}>({totalRank - 1}위인 {prevTotal}와 {solvedPrevTotalCnt - solvedCnt}문제 차이)</p>
            <p>대학교 랭킹: {schoolRank}위</p>
            <p className="thin" style={{fontSize: 12}}>({schoolRank - 1}위인 {prevTotal}와 {solvedPrevUnivCnt - solvedCnt}문제 차이)</p>
            <DailyStatusChart solvedCnt={solvedCnt} totalCnt={totalCnt}/>
        </WhiteCard>
    );
}

/**
 * Daily Problem을 보여주는 컴포넌트 카드
 */
function DailyProblems() {

    const [problems, setProblems] = useState([
        // {id: 1000, name: "A+B", solved: 100, level: 1},
        // {id: 2839, name: "설탕 배달", solved: 50, level: 6},
        // {id: 7576, name: "토마토", solved: 30, level: 11},
        // {id: 6549, name: "히스토그램에서 가장 큰 직사각형", solved: 20, level: 16},
        // {id: 18185, name: "라면 사기 (Small)", solved: 10, level: 21},
    ]);

    const fillProblems = () => {
        const pushProblemSorted = (data) => {
            setProblems((prevProblems) => {
                let ret = [...prevProblems, data];
                ret.sort((a, b) => a.level - b.level);
                return ret;
            });
        }

        // 브론즈, 실버, 골드, 플래티넘, 다이아몬드 각 난이도 별로 문제를 하나씩 가져옴
        setProblems([]);
        api.requestSingleDailyProblem(1, 5).then(pushProblemSorted);
        api.requestSingleDailyProblem(6, 10).then(pushProblemSorted);
        api.requestSingleDailyProblem(11, 15).then(pushProblemSorted);
        api.requestSingleDailyProblem(16, 20).then(pushProblemSorted);
        api.requestSingleDailyProblem(21, 25).then(pushProblemSorted);
    }

    useEffect(() => { // 처음 로딩 시 문제들을 채움
        fillProblems();
    }, []);

    const headers = ["문제", "문제 이름", "푼 사람 수"];

    return (
        <WhiteCard icon="calendar-check-fill" title="오늘의 문제" rightHeader={
            <i className='bi bi-arrow-clockwise float-end fs-3 pointer' onClick={fillProblems}></i>
        }>
            <ProblemTable problems={problems} />
        </WhiteCard>
    )
}

/**
 * 충남대생들이 푼 문제와 못 푼 문제의 비율을 보여주는 원형 차트 컴포넌트
 */
function DailyStatusChart({ solvedCnt, totalCnt }) {
    const ref = useRef();

    const dataProblems = {
        labels: ['푼 문제', '못 푼 문제'],
        datasets: [
          {
            label: '문제 개수',
            data: [solvedCnt, totalCnt - solvedCnt],
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1,
          },
        ],
        hoverOffset: 4,
    };

    useEffect(() => {
        const centerTextPlugin = {
            id: 'centerText',
            beforeDraw(chart) {
                const { width } = chart;
                const { height } = chart;
                const ctx = chart.ctx;
        
                const percentage = ((solvedCnt / totalCnt) * 100).toFixed(2);
        
                ctx.save();
                ctx.font = 'bold 20px neo';
                ctx.fillStyle = '#5e5e5e';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(`전체 문제 중 ${percentage}% 해결`, width / 2, height / 2);
                ctx.restore();
            },
        };

        Chart.register(centerTextPlugin);

        const chartInstance = new Chart(ref.current, {
            type: 'doughnut',
            data: dataProblems,
            options: {
                plugins: {
                    centerText: true,
                },
            },
        });

        return () => {
            chartInstance.destroy();
            Chart.unregister(centerTextPlugin);
        };
    }, [solvedCnt, totalCnt]);

    return <canvas ref={ref}></canvas>;
}