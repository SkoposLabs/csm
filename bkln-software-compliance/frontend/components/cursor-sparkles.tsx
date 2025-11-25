"use client";

import { useEffect, useState } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  char: string;
}

export default function CursorSparkles() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const sparkleChars = ["✨", "⭐", "✦", "★", "✧", "⋆", "∗"];

  useEffect(() => {
    let sparkleId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Only create sparkle occasionally (not every pixel)
      if (Math.random() > 0.7) {
        const char =
          sparkleChars[Math.floor(Math.random() * sparkleChars.length)];
        const newSparkle: Sparkle = {
          id: sparkleId++,
          x: e.clientX,
          y: e.clientY,
          char,
        };

        setSparkles((prev) => [...prev, newSparkle]);

        // Remove sparkle after animation completes
        setTimeout(() => {
          setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
        }, 1000);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="cursor-sparkles-container">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="sparkle"
          style={{
            left: sparkle.x,
            top: sparkle.y,
          }}
        >
          {sparkle.char}
        </div>
      ))}

      <style jsx>{`
        .cursor-sparkles-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9999;
        }

        .sparkle {
          position: fixed;
          font-size: 16px;
          pointer-events: none;
          animation: sparkleAnimation 1s ease-out forwards;
          transform-origin: center;
        }

        @keyframes sparkleAnimation {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.2) rotate(180deg);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5) rotate(360deg)
              translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}
