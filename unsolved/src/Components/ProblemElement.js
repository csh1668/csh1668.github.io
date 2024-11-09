export default function ProblemElement(props) {
    const boj = `https://boj.kr/${props.id}`;
    const tier = `https://static.solved.ac/tier_small/${props.level}.svg`;

    const tierStyle = {
        width: "20px",
        height: "20px",
        marginRight: "5px",
    };

    return (
        <tr className="text-start">
            <td className="text-basic-color">{props.id}</td>
            <td className="text-basic-color"><a href={boj} className="text-decoration-none"><img src={tier} alt="tier" style={tierStyle}></img>{props.name}</a></td>
            <td className="text-basic-color">{props.solved}</td>
        </tr>
    );
}