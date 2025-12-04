import { useState } from "react";

export function useLandscapeFormatCheck() {
    const [isLandscapeFormat, setLandscapeFormat] = useState(window.matchMedia("(orientation: landscape)").matches);

    window.matchMedia("(orientation: landscape)").addEventListener("change", e => setLandscapeFormat(e.matches));

    return {
        isLandscapeFormat
    };
}