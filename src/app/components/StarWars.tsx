import React, { useRef, useEffect } from "react";
import p5 from "p5";

const StarWars: React.FC = () => {
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sketch = (p: p5) => {
      let shipImage: p5.Image;
      const numLines = 400;
      const angle: number[] = [];
      const distance: number[] = [];
      const speed: number[] = [];
      let shipX: number, shipY: number;
      const minRadius = 10;

      p.preload = () => {
        shipImage = p.loadImage("Falcon.png"); // Replace with your image file name
      };

      p.setup = () => {
        p.createCanvas(600, 600);
        p.noStroke();
        p.smooth();

        // Initialize lines in circular motion
        for (let i = 0; i < numLines; i++) {
          angle[i] = p.random(p.TWO_PI); // Random starting angle
          distance[i] = p.random(minRadius + 1, 100); // Ensure the starting distance is at least minRadius + 1
          speed[i] = p.random(40, 60); // Faster random speed for each line
        }

        shipX = p.width / 2;
        shipY = p.height / 2;
        p.background(0);
      };

      p.draw = () => {
        // Draw the background as black
        p.background(0);

        // Update and draw the streaking lines
        for (let i = 0; i < numLines; i++) {
          // Calculate the x, y position of the line based on polar coordinates
          const x = shipX + p.cos(angle[i]) * distance[i];
          const y = shipY + p.sin(angle[i]) * distance[i];

          // Update the distance to simulate the lines moving outward faster
          distance[i] += speed[i];

          // Draw the streak as a line moving outward if it's outside the central circle
          if (distance[i] > minRadius) {
            p.stroke(255, 255); // White color with some opacity for trailing effect
            p.strokeWeight(2);
            p.line(shipX, shipY, x, y);
          }

          // Reset the line when it moves off the screen
          if (distance[i] > p.width) {
            distance[i] = minRadius + 1; // Start from the minimum radius again
            angle[i] = p.random(p.TWO_PI); // Randomize the angle for a new direction
          }
        }

        // Draw the ship in the center (if using an image, you can remove the ship ellipse)
        p.fill(255);
        p.ellipse(shipX, shipY, 10, 10); // Represent the ship with a small circle (optional)

        // Fill the entire central area from the center to the outer radius with black
        p.fill(0); // Set fill color to black
        p.noStroke(); // Remove the stroke
        p.ellipse(shipX, shipY, minRadius * 2, minRadius * 2); // Draw the filled circle

        // Place the PNG image in the center of the small circle and make it larger
        const imgWidth = shipImage.width * 4.8; // Increase scale to make the image larger (adjust the factor as needed)
        const imgHeight = shipImage.height * 4.8; // Increase scale to make the image larger
        p.imageMode(p.CENTER); // Set image mode to CENTER to draw it from the center of the circle
        p.image(shipImage, shipX, shipY, imgWidth, imgHeight); // Draw the image at the center
      };
    };

    const p5Instance = new p5(sketch, sketchRef.current!);

    return () => {
      p5Instance.remove();
    };
  }, []);

  return <div ref={sketchRef}></div>;
};

export default StarWars;
