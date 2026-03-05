import { Table } from 'react-bootstrap';
import ProblemElement from './ProblemElement';
import { useOption } from '../OptionContext';
import Tier from './Tier';

/**
 * 문제 목록을 보여주는 테이블
 */
export default function ProblemTable(props) {
    const { showProblemTier } = useOption(); // 문제 티어를 보여줄지 여부

    const headers = showProblemTier ? ["문제", (<Tier level={0} />), "문제 이름", "푼 사람 수"] : ["문제", "문제 이름", "푼 사람 수"];
    const headersMap = {"문제": "problemId", "문제 이름": "title", "푼 사람 수": "solvedCount"};

    const canSort = props.canSort; // 정렬 가능 여부
    const problems = props.problems; // 문제 목록
    const isAsc = props.isAsc, setIsAsc = props.setIsAsc; // 오름차순 여부
    const sort = props.sort, setSort = props.setSort; // 정렬 기준

    const handleHeaderClick = (h) => { // 헤더를 클릭했을 때 정렬 기준을 바꾸기 위해 사용되는 함수
        if (sort === h) {
            setIsAsc(!isAsc);
        } else {
            setSort(h);
            setIsAsc(true);
        }
    };

    return (
        <Table striped bordered hover className="text-basic-color box-shadow">
            <thead>
                <tr>
                    {headers.map((header) => {
                        return <th className="text-basic-color" onClick={(e) => {
                            if (canSort) {
                                handleHeaderClick(headersMap[header] || "level");
                            }
                        }}
                        {...(canSort ? {style: {cursor: "pointer"}} : {})}
                        >{header}{
                            canSort && (sort === (headersMap[header] || "level") ? (isAsc ? " ▲" : " ▼") : " 　")
                        }</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {problems.map((problem) => {
                    return <ProblemElement id={problem.problemId} name={problem.title} solved={problem.solvedCount} level={problem.level} />
                })}
            </tbody>
        </Table>
    );
}