import { Trail } from "../logic/types";

type SliceTrail = {
    points: Trail[];
}

export default function SliceTrail({ points }: SliceTrail) {
    return (

        <svg
            className="trail-svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
        >
            <polyline
                points={points.map(p => `${p.position.x},${p.position.y}`).join(" ")}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}