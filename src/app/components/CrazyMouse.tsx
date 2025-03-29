import React, { useRef, useEffect } from "react";
import p5 from "p5";

const CrazyMouse: React.FC = () => {
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sketch = (p: p5) => {
      let maxDistance: number;

      p.setup = () => {
        p.createCanvas(600, 600);
        p.noStroke();
        maxDistance = p.dist(0, 0, p.width, p.height) / 2; // Reduce max distance effect
      };

      p.draw = () => {
        p.background(0);

        for (let i = 0; i <= p.width; i += 20) {
          for (let j = 0; j <= p.height; j += 20) {
            let size = p.dist(p.mouseX, p.mouseY, i, j);
            size = (size / maxDistance) * 66;
            size = Math.max(size, 5); // Ensure a minimum size of 5

            const col = p.map(size, 5, 66, 255, 0);
            p.fill(col, p.random(50, 255), p.random(150, 255), 200);

            p.push();
            p.translate(i, j);
            p.rotate(p.frameCount * 0.01);
            p.ellipse(
              0,
              0,
              size * Math.sin(p.frameCount * 0.1) * 1.5,
              size * Math.cos(p.frameCount * 0.1) * 1.5
            );
            p.pop();
          }
        }
      };
    };

    const p5Instance = new p5(sketch, sketchRef.current!);

    return () => {
      p5Instance.remove();
    };
  }, []);

  return <div ref={sketchRef}></div>;
};

export default CrazyMouse;