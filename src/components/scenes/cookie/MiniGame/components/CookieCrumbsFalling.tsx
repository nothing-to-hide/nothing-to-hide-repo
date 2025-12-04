
type CookieCrumbs = {
    left: number;
    top: number;
    size: number;
    image: string;
}

export default function CookieCrumbsFalling({
    left,
    top,
    size,
    image
}: CookieCrumbs) {
    return (
        <img
            className="cookie-crumb"
            src={image}
            style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `${size}px`,
                height: `${size}px`,
                transformOrigin: 'center',
            }}
        />
    );
}
