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
            this.vel = p.createVector(0, p.random(-12, -18)); // Shoot up
          } else {
            this.vel = p5.Vector.random2D().mult(p.random(2, 7)); // Explode in random directions
          }

          this.acc = p.createVector(0, 0.1); // Gravity

          // Random colors for particles
          this.color = p.color(p.random(255), p.random(255), p.random(255));
        }

        applyForce(force: p5.Vector) {
          this.acc.add(force);
        }

        update() {
          this.vel.add(this.acc);
          this.pos.add(this.vel);
          this.acc.mult(0);

          if (!this.isFirework) {
            this.lifespan -= 4; // Fade out effect
          }
        }

        done() {
          return this.lifespan <= 0;
        }

        show() {
          p.stroke(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.lifespan);
          p.strokeWeight(this.isFirework ? 8 : 3);
          p.point(this.pos.x, this.pos.y);
        }
      }

      class Firework {
        core: Particle;
        particles: Particle[];
        exploded: boolean;

        constructor() {
          this.core = new Particle(p.random(p.width * 0.2, p.width * 0.8), p.height, true);
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
          for (let i = 0; i < 100; i++) {
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
        p.createCanvas(sketchRef.current!.offsetWidth, sketchRef.current!.offsetHeight);
      };

      p.draw = () => {
        p.background(0, 25); // Light trail effect

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

      p.windowResized = () => {
        p.resizeCanvas(sketchRef.current!.offsetWidth, sketchRef.current!.offsetHeight);
      };
    };

    const p5Instance = new p5(sketch, sketchRef.current!);

    return () => {
      p5Instance.remove();
    };
  }, []);

  return <div ref={sketchRef} style={{ width: "100%", height: "100vh" }} />;
};

export default Fireworks;
