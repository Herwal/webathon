import React, { useRef, useEffect } from "react";
import p5 from "p5";

const MillionGreatBalls: React.FC = () => {
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sketch = (p: p5) => {
      let gravity: p5.Vector;
      const balls: Ball[] = [];
      let ballCount = 0;

      class Ball {
        location: p5.Vector;
        velocity: p5.Vector;
        acceleration: p5.Vector;
        ballColor: p5.Color;

        constructor(x: number, y: number, vx: number, vy: number) {
          this.location = p.createVector(x, y);
          this.velocity = p.createVector(vx, vy);
          this.acceleration = p.createVector(0, gravity.y);
          this.ballColor = p.color(p.random(255), p.random(255), p.random(255));
        }

        update() {
          this.velocity.add(this.acceleration);
          this.location.add(this.velocity);

          // Bounce off edges (left and right)
          if (this.location.x > p.width || this.location.x < 0) {
            this.velocity.x *= -1.2; // Reverse and amplify horizontal velocity
          }

          // Bounce off the top
          if (this.location.y < 0) {
            this.velocity.y *= -0.95; // Reverse vertical velocity
            this.location.y = 0;
          }

          // Bounce off the bottom (ground)
          if (this.location.y > p.height - 24) {
            this.velocity.y *= -0.98; // Increase bounce factor
            this.velocity.x *= 1.1; // Amplify horizontal bounce
            this.location.y = p.height - 24;

            // Create a new ball each time it bounces
            balls.push(
              new Ball(p.random(p.width), 100, p.random(-4, 4), p.random(5, 7))
            );
            ballCount++;

            // Reset if 1000 balls have been created
            if (ballCount >= 1000) {
              balls.length = 0;
              ballCount = 0;
            }
          }
        }

        display() {
          p.stroke(255);
          p.strokeWeight(2);
          p.fill(this.ballColor);
          p.ellipse(this.location.x, this.location.y, 48, 48);
        }
      }

      p.setup = () => {
        p.createCanvas(600, 600);
        gravity = p.createVector(0, 0.2);
      };

      p.draw = () => {
        p.background(0);

        // Update and display all balls
        for (const ball of balls) {
          ball.update();
          ball.display();
        }

        // If there are no balls left, spawn one at the top
        if (balls.length === 0 && ballCount < 1000) {
          balls.push(
            new Ball(p.random(p.width), 100, p.random(-4, 4), p.random(5, 7))
          );
          ballCount++;
        }

        // Reset if 1000 balls have been created
        if (ballCount >= 1000) {
          balls.length = 0;
          ballCount = 0;
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

export default MillionGreatBalls;