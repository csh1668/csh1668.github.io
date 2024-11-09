import { Table } from 'react-bootstrap';
import ProblemElement from './ProblemElement';

export default function ProblemTable(props) {
    const headers = ["문제", "문제 이름", "푼 사람 수"];
    const problems = props.problems;

    return (
        <Table striped bordered hover className="text-basic-color">
            <thead>
                <tr>
                    {headers.map((header) => {
                        return <th className="text-basic-color">{header}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {problems.map((problem) => {
                    return <ProblemElement id={problem.id} name={problem.name} solved={problem.solved} level={problem.level} />
                })}
            </tbody>
        </Table>
    )
}