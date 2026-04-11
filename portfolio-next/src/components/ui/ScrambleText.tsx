"use client";

import { useRef, useState } from "react";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface ScrambleTextProps {
  initialText: string;
  targetText: string;
  className?: string;
}

export default function ScrambleText({ initialText, targetText, className }: ScrambleTextProps) {
  const [text, setText] = useState(initialText);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseOver = () => {
    let iteration = 0;
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      setText((prev) => {
        return prev
          .split("")
          .map((_, index) => {
            if (index < iteration) {
              // Ensure we don't go out of bounds of the target string
              return targetText[index] || ""; 
            }
            return LETTERS[Math.floor(Math.random() * 26)];
          })
          .join("");
      });
      
      if (iteration >= targetText.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      
      iteration += 1 / 2;
    }, 30);
  };

  return (
    <h2 
      className={className} 
      onMouseOver={handleMouseOver}
      title={initialText} // Tooltip helper
    >
      {text}
    </h2>
  );
}
