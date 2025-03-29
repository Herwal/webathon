import React, { useRef, useEffect } from "react";
import p5 from "p5";

const PickTheDoor: React.FC = () => {
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sketch = (p: p5) => {
      let door: p5.Image[] = []; // Array to hold the door images
      let lion: p5.Image, gold: p5.Image;
      let chosenDoor = -1;
      let gameOver = false;
      let goldDoor: number;
      let showLionFullScreen = false;
      let lionStartTime = 0;

      const startNewGame = () => {
        chosenDoor = -1;
        gameOver = false;
        showLionFullScreen = false;
        goldDoor = Math.floor(p.random(3)); // Randomly select the door with gold
      };

      const displayResult = () => {
        const doorX = [p.width * 0.1, p.width * 0.4, p.width * 0.7];
        const imageOffset = p.width * 0.045;

        if (chosenDoor === goldDoor) {
          p.textAlign(p.CENTER, p.CENTER);
          p.textSize(32);
          p.fill(0, 255, 0);
          p.text("You found the gold!", p.width / 2, p.height * 0.85);

          p.image(
            gold,
            doorX[chosenDoor] + imageOffset,
            p.height * 0.4,
            p.width * 0.1,
            p.height * 0.2
          );
        } else {
          p.textAlign(p.CENTER, p.CENTER);
          p.textSize(32);
          p.fill(255, 0, 0);
          p.text("You got a lion!", p.width / 2, p.height * 0.85);

          p.image(
            lion,
            doorX[chosenDoor] + imageOffset,
            p.height * 0.4,
            p.width * 0.1,
            p.height * 0.2
          );
        }
      };

      p.preload = () => {
        // Load the door images into the array
        door[0] = p.loadImage("door1.png");
        door[1] = p.loadImage("door2.png");
        door[2] = p.loadImage("door3.png");
        lion = p.loadImage("lion.png");
        gold = p.loadImage("gold.png");
      };

      p.setup = () => {
        p.createCanvas(1000, 600);
        startNewGame();
      };

      p.draw = () => {
        p.background(255);

        if (showLionFullScreen) {
          if (p.millis() - lionStartTime < 2000) {
            p.image(lion, 0, 0, p.width, p.height);
            return;
          } else {
            showLionFullScreen = false;
          }
        }

        p.textAlign(p.CENTER, p.TOP);
        p.textSize(30);
        p.fill(0);
        p.text(
          "Pick the Door Game, do not pick the door with a lion :)",
          p.width / 2,
          p.height * 0.05
        );

        const doorX = [p.width * 0.1, p.width * 0.4, p.width * 0.7];
        for (let i = 0; i < 3; i++) {
          p.image(door[i], doorX[i], p.height * 0.3, p.width * 0.2, p.height * 0.5);
        }

        if (gameOver) {
          displayResult();
          p.textAlign(p.CENTER, p.CENTER);
          p.textSize(24);
          p.fill(0);
          p.text("Press any key to play again!", p.width / 2, p.height * 0.95);
        }
      };

      p.mousePressed = () => {
        if (!gameOver) {
          const doorX = [p.width * 0.1, p.width * 0.4, p.width * 0.7];
          for (let i = 0; i < 3; i++) {
            if (
              p.mouseX > doorX[i] &&
              p.mouseX < doorX[i] + p.width * 0.2 &&
              p.mouseY > p.height * 0.3 &&
              p.mouseY < p.height * 0.8
            ) {
              chosenDoor = i;
              break;
            }
          }

          gameOver = true;
          if (chosenDoor !== goldDoor) {
            showLionFullScreen = true;
            lionStartTime = p.millis();
          }
        }
      };

      p.keyPressed = () => {
        if (gameOver && !showLionFullScreen) {
          startNewGame();
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

export default PickTheDoor;
