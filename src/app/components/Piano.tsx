import React, { useRef, useEffect } from "react";
import p5 from "p5";

const Piano: React.FC = () => {
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sketch = (p: p5) => {
      const maxHeight = 40;
      let letterHeight = maxHeight;

      const numKeys = 9;
      const keyLetters = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
      const soundFiles = ["E1.mp3", "E2.mp3", "E3.mp3", "E4.mp3", "E5.mp3", "E6.mp3", "E7.mp3", "F1.mp3", "F2.mp3"];
      const sounds: HTMLAudioElement[] = soundFiles.map(file => new Audio(file));

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
        drawKeyboard();
        for (let i = 0; i < numKeys; i++) {
          if (beamActive[i]) {
            drawLightBeam(keyXPos[i] + letterWidth / 2, beamYPos[i]);
            beamYPos[i] -= 15;
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
            beamActive[i] = true;
            beamYPos[i] = p.height;
            if (sounds[i]) {
              sounds[i].currentTime = 0; // Restart the sound if already playing
              sounds[i].play();
            }
            break;
          }
        }
      };

      const drawLightBeam = (xStart: number, yStart: number) => {
        const beamWidth = letterWidth * 0.9;
        const beamXStart = xStart - beamWidth / 2;
        p.fill(0, 0, 255, 150);
        p.rect(beamXStart, yStart - beamLength, beamWidth, Math.min(beamLength, 1000));
      };

      const drawKeyboard = () => {
        const keyboardY = p.height - 100;
        for (let i = 0; i < numKeys; i++) {
          p.fill(0, 0, 255);
          p.stroke(0);
          p.strokeWeight(2);
          p.rect(i * letterWidth, keyboardY, letterWidth, 100);

          p.fill(0);
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
