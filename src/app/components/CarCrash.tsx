import React, { useRef, useEffect } from "react";
import p5 from "p5";

const CarCrash: React.FC = () => {
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sketch = (p: p5) => {
      const numCars = 20; // Number of cars
      const cars: Car[] = [];
      let carImg: p5.Image;

      class Car {
        x: number;
        y: number;
        speedX: number;
        speedY: number;
        exploded: boolean;
        explosionTime: number;
        explosionRadius: number;
        explosionMaxTime: number;

        constructor(x: number, y: number) {
          this.x = x;
          this.y = y;
          this.speedX = p.random(2, 5) * (p.random(1) > 0.5 ? 1 : -1);
          this.speedY = p.random(2, 5) * (p.random(1) > 0.5 ? 1 : -1);
          this.exploded = false;
          this.explosionTime = 0;
          this.explosionRadius = 0;
          this.explosionMaxTime = 180; // 3 seconds at 60fps
        }

        move() {
          if (!this.exploded) {
            this.x += this.speedX;
            this.y += this.speedY;

            // Keep the cars inside the canvas
            if (this.x > p.width) this.x = 0;
            if (this.x < 0) this.x = p.width;
            if (this.y > p.height) this.y = 0;
            if (this.y < 0) this.y = p.height;
          } else {
            this.explosionTime++;
            this.explosionRadius = p.map(
              this.explosionTime,
              0,
              this.explosionMaxTime,
              0,
              100
            );

            if (this.explosionTime > this.explosionMaxTime) {
              this.respawn();
            }
          }
        }

        display() {
          if (this.exploded) {
            this.drawExplosion();
          } else {
            p.image(carImg, this.x, this.y, 50, 30);
          }
        }

        checkCollision(other: Car) {
          const distX = other.x - this.x;
          const distY = other.y - this.y;
          const distance = p.sqrt(distX * distX + distY * distY);
          return distance < 50;
        }

        explode() {
          this.exploded = true;
          this.speedX = 0;
          this.speedY = 0;
        }

        drawExplosion() {
          // Explosion shockwave effect
          p.noFill();
          p.stroke(255, 0, 0, 150);
          p.strokeWeight(4);
          p.ellipse(
            this.x + 25,
            this.y + 15,
            this.explosionRadius * 2,
            this.explosionRadius * 2
          );

          // Flash effect
          p.fill(255, 255, 0, 150);
          p.noStroke();
          p.ellipse(
            this.x + 25,
            this.y + 15,
            this.explosionRadius * 2.5,
            this.explosionRadius * 2.5
          );
        }

        respawn() {
          this.exploded = false;
          this.explosionTime = 0;
          this.explosionRadius = 0;
          this.x = p.random(p.width);
          this.y = p.random(p.height);
          this.speedX = p.random(2, 5) * (p.random(1) > 0.5 ? 1 : -1);
          this.speedY = p.random(2, 5) * (p.random(1) > 0.5 ? 1 : -1);
        }
      }

      p.preload = () => {
        carImg = p.loadImage("Car.png"); // Ensure the image path is correct
      };

      p.setup = () => {
        p.createCanvas(600, 600);

        for (let i = 0; i < numCars; i++) {
          cars.push(new Car(p.random(p.width), p.random(p.height)));
        }
      };

      p.draw = () => {
        p.background(0);

        for (const car of cars) {
          car.move();
          car.display();
        }

        // Check for collisions
        for (let i = 0; i < numCars; i++) {
          for (let j = i + 1; j < numCars; j++) {
            if (cars[i].checkCollision(cars[j])) {
              cars[i].explode();
              cars[j].explode();
            }
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

export default CarCrash;