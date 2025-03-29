import React, { useRef, useEffect } from "react";
import p5 from "p5";

const Fireworks: React.FC = () => {
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sketch = (p: p5) => {
      const fireworks: Firework[] = [];

      class Particle {
        pos: p5.Vector;
        vel: p5.Vector;
        acc: p5.Vector;
        isFirework: boolean;
        lifespan: number;
        color: p5.Color;

        constructor(x: number, y: number, isFirework: boolean) {
          this.pos = p.createVector(x, y);
          this.isFirework = isFirework;
          this.lifespan = 255;

          if (isFirework) {
            this.vel = p.createVector(0, p.random(-10, -15)); // Shoot up
          } else {
            this.vel = p5.Vector.random2D().mult(p.random(4, 10)); // Explode in random directions
          }

          this.acc = p.createVector(0, 0.1); // Gravity

          // Random colors for particles
          this.color = isFirework
            ? p.color(p.random(255), p.random(255), p.random(255))
            : p.color(p.random(255), p.random(255), p.random(255), this.lifespan);
        }

        applyForce(force: p5.Vector) {
          this.acc.add(force);
        }

        update() {
          this.vel.add(this.acc);
          this.pos.add(this.vel);
          this.acc.mult(0);

          if (!this.isFirework) {
            this.lifespan -= 5; // Fade out
          }
        }

        done() {
          return this.lifespan <= 0;
        }

        show() {
          p.stroke(this.color);
          p.strokeWeight(this.isFirework ? 8 : 5);
          p.point(this.pos.x, this.pos.y);
        }
      }

      class Firework {
        core: Particle;
        particles: Particle[];
        exploded: boolean;

        constructor() {
          // Constrain the initial x position to stay within bounds
          const x = p.random(p.width * 0.1, p.width * 0.9);
          // Constrain the initial y position to start between halfway and 80% of the height
          const y = p.random(p.height * 0.5, p.height * 0.8);
          this.core = new Particle(x, y, true);
          this.particles = [];
          this.exploded = false;
        }

        update() {
          if (!this.exploded) {
            this.core.update();
            if (this.core.vel.y >= 0) {
              this.explode();
              this.exploded = true;
            }
          }

          for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].update();
            if (this.particles[i].done()) {
              this.particles.splice(i, 1);
            }
          }
        }

        explode() {
          for (let i = 0; i < 150; i++) {
            this.particles.push(new Particle(this.core.pos.x, this.core.pos.y, false));
          }
        }

        done() {
          return this.exploded && this.particles.length === 0;
        }

        show() {
          if (!this.exploded) {
            this.core.show();
          }
          for (const particle of this.particles) {
            particle.show();
          }
        }
      }

      p.setup = () => {
        p.createCanvas(600, 600);
      };

      p.draw = () => {
        p.background(0);

        if (p.random(1) < 0.05) {
          fireworks.push(new Firework());
        }

        for (let i = fireworks.length - 1; i >= 0; i--) {
          fireworks[i].update();
          fireworks[i].show();
          if (fireworks[i].done()) {
            fireworks.splice(i, 1);
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

export default Fireworks;