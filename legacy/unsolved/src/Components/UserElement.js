import { useEffect, useState } from "react";
import Tier from "./Tier";
import { useOption } from "../OptionContext";

/**
 * 유저 정보 + 티어를 표시하는 컴포넌트
 */
export default function UserElement(props) {
    const { showProblemTier, setShowProblemTier, showUserTier, setShowUserTier } = useOption();

    const user = props.user;
    const size = props.size ?? 20;

    const bojUrl = `https://www.acmicpc.net/user/${user.name}`;
    const solvedUrl = `https://solved.ac/profile/${user.name}`;

    return (
        <>
        <tr className="text-start" key={user.id}>
            <td>
                {showUserTier && <a href={solvedUrl}><Tier level={user.level} size={size}/></a>}
                <a href={bojUrl} className="text-decoration-none">{user.name}</a>
            </td>
        </tr>
        </>
    )
}