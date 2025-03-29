import React, { useRef, useEffect } from "react";
import p5 from "p5";

const SolarSystem: React.FC = () => {
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sketch = (p: p5) => {
      const planetDistancesX = [50, 100, 150, 200, 300, 400, 500, 600];
      const planetDistancesY = [30, 60, 90, 120, 180, 240, 300, 360];
      const planetSizes = [5, 10, 15, 12, 30, 25, 20, 18];
      const speeds = [0.07, 0.04, 0.03, 0.07, 0.03, 0.04, 0.03, 0.06];
      const angle = Array(8).fill(0);
      const planetTrailX = Array.from({ length: 8 }, () => Array(20).fill(0));
      const planetTrailY = Array.from({ length: 8 }, () => Array(20).fill(0));
      const planetTrailZ = Array.from({ length: 8 }, () => Array(20).fill(0));
      const trailIndex = Array(8).fill(0);

      const sunX = 0;
      const sunY = 0;
      const sunSize = 50;

      let cameraAngleX = 0;
      let cameraAngleY = 0;
      const cameraDistance = 1500;
      let prevMouseX = 0;
      let prevMouseY = 0;
      let isDragging = false;
      let startAngleX = 0;
      let startAngleY = 0;

      p.setup = () => {
        p.createCanvas(600, 600, p.WEBGL);
        prevMouseX = p.mouseX;
        prevMouseY = p.mouseY;
      };

      p.draw = () => {
        p.background(0);
        p.lights();

        // Handle camera rotation
        if (isDragging) {
          const mouseDeltaX = p.mouseX - prevMouseX;
          const mouseDeltaY = p.mouseY - prevMouseY;
          cameraAngleY = startAngleY + mouseDeltaX * 0.005;
          cameraAngleX = startAngleX - mouseDeltaY * 0.005;
        }

        // Update camera position
        const cameraX = Math.cos(cameraAngleY) * Math.cos(cameraAngleX) * cameraDistance;
        const cameraY = Math.sin(cameraAngleX) * cameraDistance;
        const cameraZ = Math.sin(cameraAngleY) * Math.cos(cameraAngleX) * cameraDistance;
        p.camera(cameraX, cameraY, cameraZ, sunX, sunY, 0, 0, 1, 0);

        // Draw the Sun
        p.push();
        p.translate(sunX, sunY, 0);
        p.fill(255, 255, 0);
        p.noStroke();
        p.sphere(sunSize);
        p.pop();

        // Draw the planets
        for (let i = 0; i < planetDistancesX.length; i++) {
          const x = Math.cos(angle[i]) * planetDistancesX[i];
          const y = Math.sin(angle[i]) * planetDistancesY[i];
          const z = Math.sin(angle[i] * 1.5) * 50;

          // Set planet colors
          if (i === 0) p.fill(169, 169, 169); // Mercury
          if (i === 1) p.fill(255, 255, 204); // Venus
          if (i === 2) p.fill(0, 102, 204); // Earth
          if (i === 3) p.fill(204, 51, 51); // Mars
          if (i === 4) p.fill(255, 102, 0); // Jupiter
          if (i === 5) p.fill(255, 204, 0); // Saturn
          if (i === 6) p.fill(0, 255, 255); // Uranus
          if (i === 7) p.fill(0, 0, 255); // Neptune

          // Draw the planet
          p.push();
          p.translate(x, y, z);
          p.sphere(planetSizes[i]);
          p.noStroke();
          p.pop();

          // Store the current position in the trail arrays
          planetTrailX[i][trailIndex[i]] = x;
          planetTrailY[i][trailIndex[i]] = y;
          planetTrailZ[i][trailIndex[i]] = z;

          // Update the angle for each planet
          angle[i] += speeds[i];

          // Update trail index (loop around after reaching max length)
          trailIndex[i] = (trailIndex[i] + 1) % 20;
        }

        // Draw the trails
        for (let i = 0; i < planetDistancesX.length; i++) {
          for (let j = 0; j < 20; j++) {
            if (planetTrailX[i][j] !== 0 && planetTrailY[i][j] !== 0) {
              const alpha = p.map(j, 0, 20, 50, 255); // Fade effect for the trail
              p.fill(150, 150, 255, alpha);
              p.noStroke();
              p.push();
              p.translate(planetTrailX[i][j], planetTrailY[i][j], planetTrailZ[i][j]);
              p.sphere(2); // Small sphere for the trail points
              p.pop();
            }
          }
        }
      };

      p.mousePressed = () => {
        isDragging = true;
        startAngleX = cameraAngleX;
        startAngleY = cameraAngleY;
      };

      p.mouseReleased = () => {
        isDragging = false;
      };
    };

    const p5Instance = new p5(sketch, sketchRef.current!);

    return () => {
      p5Instance.remove();
    };
  }, []);

  return <div ref={sketchRef}></div>;
};

export default SolarSystem;
