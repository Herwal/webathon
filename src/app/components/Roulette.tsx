import React, { useRef, useEffect } from "react";
import p5 from "p5";

//TODO: må kanskje være større enn 600x600 for å se hele effekten

const Roulette: React.FC = () => {
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sketch = (p: p5) => {
      const wheelRadius = 200;
      const numSections = 37; // 36 numbers + 1 for 0 (roulette wheel)
      const outerRadius = wheelRadius + 30; // Outer circle radius (wooden circle)
      let angleStep: number;
      let ballAngle = 0;
      let isSpinning = false;
      let spinSpeed = 0;
      let winnerNumber = -1;

      p.setup = () => {
        p.createCanvas(600, 600);
        angleStep = p.TWO_PI / numSections;
        p.smooth();
      };

      p.draw = () => {
        p.background(255);

        // Draw wooden outer circle
        p.translate(p.width / 2, p.height / 2);
        p.stroke(139, 69, 19); // Brown color for the wooden circle
        p.strokeWeight(15); // Make the outer circle thick
        p.noFill();
        p.ellipse(0, 0, outerRadius * 2, outerRadius * 2); // Wooden outer circle

        // Draw wheel
        p.stroke(0);
        p.strokeWeight(2);
        p.fill(255, 204, 0); // Yellow center
        p.ellipse(0, 0, wheelRadius * 2, wheelRadius * 2);

        // Draw sections (numbers)
        for (let i = 0; i < numSections; i++) {
          const startAngle = i * angleStep;
          const endAngle = (i + 1) * angleStep;

          // Set section color
          if (i === 0) {
            p.fill(0, 128, 0); // Green for 0
          } else if (i % 2 === 0) {
            p.fill(0); // Black for even numbers
          } else {
            p.fill(255, 0, 0); // Red for odd numbers
          }

          p.arc(0, 0, wheelRadius * 2, wheelRadius * 2, startAngle, endAngle, p.PIE);

          p.push();
          p.rotate(startAngle + angleStep / 2);

          // Set text color based on the number
          if (i === 0) {
            p.fill(255); // White for 0
          } else if (i % 2 === 0) {
            p.fill(255); // White for even numbers
          } else {
            p.fill(0); // Black for odd numbers
          }

          // Display the number
          p.textSize(16);
          p.textAlign(p.CENTER, p.CENTER);
          p.text(i.toString(), wheelRadius / 2, 0);
          p.pop();
        }

        // Draw ball
        const ballX = wheelRadius * p.cos(ballAngle);
        const ballY = wheelRadius * p.sin(ballAngle);
        p.fill(255, 0, 0);
        p.ellipse(ballX, ballY, 20, 20);

        // Handle spinning
        if (isSpinning) {
          ballAngle += spinSpeed;
          spinSpeed *= 0.99; // Gradually slow down the wheel
          if (spinSpeed < 0.01) {
            isSpinning = false;
            // Determine the winner based on the final ball position
            winnerNumber = Math.floor((ballAngle / p.TWO_PI) * numSections) % numSections;
            if (winnerNumber < 0) winnerNumber += numSections; // Handle negative modulo
          }
        }

        // Display winner number if the wheel has stopped
        if (!isSpinning && winnerNumber !== -1) {
          p.fill(0);
          p.textSize(24);
          p.textAlign(p.CENTER, p.CENTER);
          p.text(`Winner: ${winnerNumber}`, 0, outerRadius + 30); // Show the winner below the wheel
        }
      };

      p.mousePressed = () => {
        if (!isSpinning) {
          spinSpeed = p.random(0.1, 0.3); // Set random spin speed
          isSpinning = true;
          winnerNumber = -1; // Reset winner number when a new spin starts
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

export default Roulette;
