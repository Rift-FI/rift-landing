import { useState, useEffect, useRef } from 'react'
import "../../styles/components/ui/rotate-text.scss";

interface Props {
    words: string[];
    interval?: number;
}

export const RotateText = ({ words, interval = 3000 }: Props) => {
    const [index, setIndex] = useState<number>(0);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const wordRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const id = setInterval(() => {
            setIndex((i) => (i + 1) % words.length);
        }, interval);

        return () => clearInterval(id);
    }, [words.length, interval]);

    useEffect(() => {
        if (containerRef.current && wordRef.current) {
            const h = wordRef.current.clientHeight;
            containerRef.current.style.height = `${h}px`;
        }
    }, [index, words]);

    return (
        <div
            ref={containerRef}
            className="rotator-container"
            aria-live="polite"
            style={{ display: "inline-block", overflow: "hidden" }}
        >
            <div
                key={index}
                ref={wordRef}
                className="rotator-word anim-slide-up"
                style={{ display: "inline-block" }}
            >
                {words[index]}
            </div>
        </div>
    );
}
