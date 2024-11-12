/**
 * 
 * @param {*} props 
 * @param {*} props.level 0 ~ 30
 * @param {*} props.size
 * @param {*} props.margin
 * @returns 
 */
export default function Tier(props) {
    const tier = `https://static.solved.ac/tier_small/${props.level}.svg`;

    const tierStyle = {
        width: `${props.size ?? 20}px`,
        height: `${props.size ?? 20}px`,
        marginRight: `${props.margin ?? 5}px`,
    };

    return (
        <img src={tier} alt="tier" style={tierStyle}></img>
    );
}