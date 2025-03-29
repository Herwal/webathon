import React, { useRef, useEffect } from "react";
import p5 from "p5";

const SpinningCubes: React.FC = () => {
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sketch = (p: p5) => {
      let a = 0; // The angle that makes everything spin
      const offset = p.PI / 20.0; // A whimsical offset for box rotations
      const num = 50; // More boxes, more madness

      p.setup = () => {
        p.createCanvas(800, 600, p.WEBGL); // Adjusted canvas size to 800x800
        p.noStroke(); // No sharp edges, just curves of madness
      };

      p.draw = () => {
        p.lights(); // Let there be light… in the chaos
        p.background(0, 0, 50); // Deep space is always the best backdrop for madness

        for (let i = 0; i < num; i++) {
          const gray = p.map(i, 0, num - 1, 50, 255); // A little greyscale twist

          p.push();
          p.fill(gray, p.random(100, 255), p.random(100, 255)); // Colors of the cosmos!

          p.rotateY(a + offset * i); // Twisting in space like a cosmic dance
          p.rotateX(a * 0.5 + offset * i); // Adding more rotation for that disorienting effect
          p.rotateZ(a * 2.0 + offset * i); // Rotating around Z too? Why not!

          p.box(300 + p.sin(a * i) * 50); // Adjusted box size for better fit in 800x800
          p.pop();
        }

        a += 0.02; // Speed up the madness just a little bit
      };
    };

    const p5Instance = new p5(sketch, sketchRef.current!);

    return () => {
      p5Instance.remove();
    };
  }, []);

  return <div ref={sketchRef}></div>;
};

export default SpinningCubes;
