import Tier from "./Tier";

export default function UserElement(props) {
    const user = props.user;
    const size = props.size ?? 20;

    return (
        <>
        <tr className="text-start" key={user.id}>
            <td><a href={`https://www.acmicpc.net/user/${user.name}`} className="text-decoration-none"><Tier level={user.level} size={size}/>{user.name}</a></td>
        </tr>
        </>
    )
}