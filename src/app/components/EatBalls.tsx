import React, { useRef, useEffect } from "react";
import p5 from "p5";

const EatBalls: React.FC = () => {
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sketch = (p: p5) => {
      const numBlobs = 50;
      const blobs: Blob[] = [];
      let player: PlayerBlob;
      let gameWon = false;
      let gameWonTime = 0;

      class PlayerBlob {
        x: number;
        y: number;
        size: number;
        col: p5.Color;

        constructor(x: number, y: number, size: number) {
          this.x = x;
          this.y = y;
          this.size = size;
          this.col = p.color(255, 0, 0); // Red color for the player
        }

        update() {
          const angle = p.atan2(p.mouseY - this.y, p.mouseX - this.x);
          this.x += p.cos(angle) * 2;
          this.y += p.sin(angle) * 2;

          // Prevent player from going off-screen
          this.x = p.constrain(this.x, this.size / 2, p.width - this.size / 2);
          this.y = p.constrain(this.y, this.size / 2, p.height - this.size / 2);
        }

        absorb(blob: Blob) {
          this.size += blob.size * 0.5; // The player grows based on the size of the blob absorbed
        }

        display() {
          p.fill(this.col);
          p.noStroke();
          p.ellipse(this.x, this.y, this.size, this.size);
        }
      }

      class Blob {
        x: number;
        y: number;
        size: number;
        col: p5.Color;

        constructor(x: number, y: number, size: number) {
          this.x = x;
          this.y = y;
          this.size = size;
          this.col = p.color(p.random(255), p.random(255), p.random(255)); // Random color for the blob
        }

        update() {
          this.x += p.random(-1, 1);
          this.y += p.random(-1, 1);

          // Prevent blobs from going off-screen
          this.x = p.constrain(this.x, this.size / 2, p.width - this.size / 2);
          this.y = p.constrain(this.y, this.size / 2, p.height - this.size / 2);
        }

        reset() {
          this.x = p.random(p.width);
          this.y = p.random(p.height);
          this.size = p.random(10, 20); // Small size after reset
          this.col = p.color(p.random(255), p.random(255), p.random(255)); // New random color
        }

        display() {
          p.fill(this.col);
          p.noStroke();
          p.ellipse(this.x, this.y, this.size, this.size);
        }
      }

      const resetGame = () => {
        player.size = 30;
        player.x = p.width / 2;
        player.y = p.height / 2;

        for (const blob of blobs) {
          blob.reset();
        }

        gameWon = false;
      };

      p.setup = () => {
        p.createCanvas(600, 600);
        p.smooth();

        // Create player blob
        player = new PlayerBlob(p.width / 2, p.height / 2, 30);

        // Create other blobs
        for (let i = 0; i < numBlobs; i++) {
          blobs.push(new Blob(p.random(p.width), p.random(p.height), p.random(10, 20)));
        }
      };

      p.draw = () => {
        p.background(0);

        if (gameWon) {
          const elapsedTime = p.millis() - gameWonTime;
          p.fill(255);
          p.textSize(48);
          p.textAlign(p.CENTER, p.CENTER);
          p.text("You won the game!", p.width / 2, p.height / 2);

          if (elapsedTime > 5000) {
            resetGame();
          }
        } else {
          // Update and display the player blob
          player.update();
          player.display();

          // Check if player size exceeds 1000
          if (player.size >= 1000) {
            gameWon = true;
            gameWonTime = p.millis();
          }

          // Update and display all the other blobs
          for (const blob of blobs) {
            blob.update();
            blob.display();

            // Check for collisions with the player blob
            if (p.dist(player.x, player.y, blob.x, blob.y) < player.size / 2 + blob.size / 2) {
              player.absorb(blob);
              blob.reset();
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

export default EatBalls;