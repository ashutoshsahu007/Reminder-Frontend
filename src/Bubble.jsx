import { useEffect } from "react";

export default function Bubbles() {
  useEffect(() => {
    const numBubbles = 105;
    const container = document.getElementById("bubble-container");

    for (let i = 0; i < numBubbles; i++) {
      const bubble = document.createElement("div");
      bubble.className = "bubble absolute rounded-full pointer-events-none";
      bubble.style.background = "rgba(255, 255, 255, 0.4)";
      bubble.style.animation = `float linear infinite`;

      const size = Math.random() * 6 + 2;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;

      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * window.innerHeight;
      bubble.style.left = `${startX}px`;
      bubble.style.top = `${startY}px`;

      const moveX = (Math.random() - 0.5) * window.innerWidth;
      const moveY = (Math.random() - 0.5) * window.innerHeight;
      bubble.style.setProperty("--x", `${moveX}px`);
      bubble.style.setProperty("--y", `${moveY}px`);

      const duration = Math.random() * 30 + 30;
      bubble.style.animationDuration = `${duration}s`;

      container.appendChild(bubble);
    }
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden bg-[#461f7f]"
      id="bubble-container"
    >
      <style>
        {`
          @keyframes float {
            from {
              transform: translate(0, 0);
            }
            to {
              transform: translate(var(--x), var(--y));
            }
          }

          .bubble {
            animation-name: float;
          }
        `}
      </style>
    </div>
  );
}
