import React, { useRef, useEffect } from "react";
import p5 from "p5";

//TODO: må kanskje være større enn 600x600 for å se hele effekten

const Piano: React.FC = () => {
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sketch = (p: p5) => {
      const maxHeight = 40;
      let letterHeight = maxHeight;

      const numKeys = 9;
      const keyLetters = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
      const colors: p5.Color[] = [];
      const beamLength = 200;

      const letterWidth = 1000 / numKeys;
      const beamYPos: number[] = Array(numKeys).fill(0);
      const beamActive: boolean[] = Array(numKeys).fill(false);
      const keyXPos: number[] = Array(numKeys).fill(0);

      p.setup = () => {
        p.createCanvas(1000, 600);
        p.noFill();
        p.colorMode(p.HSB, 255);
        p.background(0);

        for (let i = 0; i < numKeys; i++) {
          colors[i] = i % 2 === 0 ? p.color(0) : p.color(255);
          beamYPos[i] = p.height;
          keyXPos[i] = i * letterWidth;
        }
      };

      p.draw = () => {
        p.background(0);

        // Draw the keyboard keys at the bottom
        drawKeyboard();

        // Draw the "letter" and beam for each active key
        for (let i = 0; i < numKeys; i++) {
          if (beamActive[i]) {
            drawLightBeam(keyXPos[i] + letterWidth / 2, beamYPos[i]);

            // Move the light beam upwards
            beamYPos[i] -= 15;

            // Stop the beam after it moves off-screen
            if (beamYPos[i] + beamLength < 0) {
              beamActive[i] = false;
            }
          }
        }
      };

      p.keyPressed = () => {
        const pressedKey = p.key.toLowerCase();
        for (let i = 0; i < numKeys; i++) {
          if (pressedKey === keyLetters[i]) {
            letterHeight = maxHeight;

            // Start the beam at the bottom of the screen
            beamActive[i] = true;
            beamYPos[i] = p.height;
            break;
          }
        }
      };

      const drawLightBeam = (xStart: number, yStart: number) => {
        const beamWidth = letterWidth * 0.9;
        const beamXStart = xStart - beamWidth / 2;

        p.fill(0, 0, 255, 150); // Blue color with transparency
        p.rect(beamXStart, yStart - beamLength, beamWidth, Math.min(beamLength, 1000));
      };

      const drawKeyboard = () => {
        const keyboardY = p.height - 100;

        for (let i = 0; i < numKeys; i++) {
          p.fill(0, 0, 255); // Blue color for keys
          p.stroke(0);
          p.strokeWeight(2);
          p.rect(i * letterWidth, keyboardY, letterWidth, 100);

          p.fill(0); // Black color for text
          p.textSize(50);
          p.textAlign(p.CENTER, p.CENTER);
          p.text(
            keyLetters[i],
            i * letterWidth + letterWidth / 2,
            keyboardY + letterHeight / 2
          );
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

export default Piano;