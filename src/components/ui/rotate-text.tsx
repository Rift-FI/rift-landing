import { useEffect, useState } from "react";
import "../../styles/components/ui/rotate-text.scss";

export default function SlideRotator() {
    const words = ["Fast", "Secure", "Verified", "Premium"];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((i) => (i + 1) % words.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [words.length]);

    return (
        <span className="slide-container">
            <span
                className="slide-text"
                style={{ transform: `translateY(-${index * 100}%)` }}
            >
                {words.map((w, i) => (
                    <span className="word" key={i}>{w}</span>
                ))}
            </span>
        </span>
    );
}

