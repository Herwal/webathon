import React, { useRef, useEffect } from "react";
import p5 from "p5";

const Flocking: React.FC = () => {
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sketch = (p: p5) => {
      let flock: Flock;
      let glitchMode = false;
      let warpSpeed = false;

      class Flock {
        boids: Boid[];

        constructor() {
          this.boids = [];
        }

        run() {
          for (const boid of this.boids) {
            boid.run(this.boids);
          }
        }

        addBoid(boid: Boid) {
          this.boids.push(boid);
        }
      }

      class Boid {
        position: p5.Vector;
        velocity: p5.Vector;
        acceleration: p5.Vector;
        maxspeed: number;
        maxforce: number;

        constructor(x: number, y: number) {
          this.acceleration = p.createVector(0, 0);
          this.velocity = p5.Vector.random2D().mult(2);
          this.position = p.createVector(x, y);
          this.maxspeed = 3;
          this.maxforce = 0.2;
        }

        run(boids: Boid[]) {
          this.applyForces(boids);
          this.update();
          this.borders();
          this.render();
        }

        applyForces(boids: Boid[]) {
          if (glitchMode) {
            // RAVE MODE: Ignore rules, go nuts
            this.velocity.add(p5.Vector.random2D().mult(5)); // Extreme speed boost
            this.velocity.limit(this.maxspeed * 5); // Super fast
          } else {
            const separation = this.separate(boids).mult(1.5);
            const alignment = this.align(boids).mult(0.5);
            const cohesion = this.cohesion(boids).mult(0.5);

            this.applyForce(separation);
            this.applyForce(alignment);
            this.applyForce(cohesion);

            const cursor = p.createVector(p.mouseX, p.mouseY);
            const distToCursor = p.dist(this.position.x, this.position.y, cursor.x, cursor.y);

            if (distToCursor < 200) {
              const chase = this.seek(cursor).mult(1.2);
              this.applyForce(chase);
            }

            if (warpSpeed) this.velocity.mult(2);
          }
        }

        render() {
          p.push();
          p.translate(this.position.x, this.position.y);
          p.rotate(this.velocity.heading());
          p.fill(glitchMode ? p.color(p.random(255), p.random(255), p.random(255)) : p.color(255));
          p.beginShape();
          p.vertex(0, -5);
          p.vertex(-3, 5);
          p.vertex(3, 5);
          p.endShape(p.CLOSE);
          p.pop();
        }

        update() {
          this.velocity.add(this.acceleration);
          this.velocity.limit(this.maxspeed);
          this.position.add(this.velocity);
          this.acceleration.mult(0);
        }

        applyForce(force: p5.Vector) {
          this.acceleration.add(force);
        }

        borders() {
          if (this.position.x < 0) this.position.x = p.width;
          if (this.position.y < 0) this.position.y = p.height;
          if (this.position.x > p.width) this.position.x = 0;
          if (this.position.y > p.height) this.position.y = 0;
        }

        seek(target: p5.Vector) {
          const desired = p5.Vector.sub(target, this.position);
          const d = desired.mag();

          const speed = p.map(d, 0, p.width, 2, this.maxspeed * 2);
          desired.setMag(speed);

          const steer = p5.Vector.sub(desired, this.velocity);
          steer.limit(this.maxforce);
          return steer;
        }

        separate(boids: Boid[]) {
          const sum = p.createVector();
          let count = 0;
          for (const other of boids) {
            const d = p.dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (d > 0 && d < 25) {
              const diff = p5.Vector.sub(this.position, other.position);
              diff.normalize();
              diff.div(d);
              sum.add(diff);
              count++;
            }
          }
          if (count > 0) {
            sum.div(count);
            sum.setMag(this.maxspeed);
            sum.sub(this.velocity);
            sum.limit(this.maxforce);
          }
          return sum;
        }

        align(boids: Boid[]) {
          const sum = p.createVector();
          let count = 0;
          for (const other of boids) {
            const d = p.dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (d > 0 && d < 50) {
              sum.add(other.velocity);
              count++;
            }
          }
          if (count > 0) {
            sum.div(count);
            sum.setMag(this.maxspeed);
            sum.sub(this.velocity);
            sum.limit(this.maxforce);
          }
          return sum;
        }

        cohesion(boids: Boid[]) {
          const sum = p.createVector();
          let count = 0;
          for (const other of boids) {
            const d = p.dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (d > 0 && d < 50) {
              sum.add(other.position);
              count++;
            }
          }
          if (count > 0) {
            sum.div(count);
            return this.seek(sum);
          }
          return p.createVector();
        }
      }

      p.setup = () => {
        p.createCanvas(600, 600);
        flock = new Flock();
        for (let i = 0; i < 100; i++) {
          flock.addBoid(new Boid(p.random(p.width), p.random(p.height)));
        }
      };

      p.draw = () => {
        if (glitchMode) p.background(p.random(255), p.random(255), p.random(255));
        else p.background(20);

        flock.run();
      };

      p.keyPressed = () => {
        if (p.key === "g") glitchMode = !glitchMode;
        if (p.key === "w") warpSpeed = !warpSpeed;
      };
    };

    const p5Instance = new p5(sketch, sketchRef.current!);

    return () => {
      p5Instance.remove();
    };
  }, []);

  return <div ref={sketchRef}></div>;
};

export default Flocking;