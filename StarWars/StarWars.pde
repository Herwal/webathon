PImage shipImage; // Declare a variable for the image
int numLines = 400; // Number of lines (representing stars)
float[] angle = new float[numLines]; // Angle for each line
float[] distance = new float[numLines]; // Distance from the center
float[] speed = new float[numLines]; // Speed for each line
float shipX, shipY;
float minRadius = 25; // Minimum radius to avoid spawning lines inside the circle

void setup() {
  size(1000, 1000);
  noStroke();
  smooth();
  
  // Load the image (make sure to place the image file in the "data" folder)
  shipImage = loadImage("ship.png"); // Replace with your image file name
  
  // Initialize lines in circular motion
  for (int i = 0; i < numLines; i++) {
    angle[i] = random(TWO_PI); // Random starting angle
    distance[i] = random(minRadius + 1, 100); // Ensure the starting distance is at least 25 + 1 unit from the center
    speed[i] = random(5, 10); // Faster random speed for each line
  }
  
  shipX = width / 2;
  shipY = height / 2;
  background(0);
}

void draw() {
  // Draw the background as black
  background(0);
  
  // Update and draw the streaking lines
  for (int i = 0; i < numLines; i++) {
    // Calculate the x, y position of the line based on polar coordinates
    float x = shipX + cos(angle[i]) * distance[i];
    float y = shipY + sin(angle[i]) * distance[i];
    
    // Update the distance to simulate the lines moving outward faster
    distance[i] += speed[i];
    
    // Draw the streak as a line moving outward if it's outside the central circle
    if (distance[i] > minRadius) {
      stroke(255, 255);  // White color with some opacity for trailing effect
      strokeWeight(2);
      line(shipX, shipY, x, y);
    }
    
    // Reset the line when it moves off the screen
    if (distance[i] > width) {
      distance[i] = minRadius + 1; // Start from the minimum radius again
      angle[i] = random(TWO_PI); // Randomize the angle for a new direction
    }
  }
  
  // Draw the ship in the center (if using an image, you can remove the ship ellipse)
  fill(255);
  ellipse(shipX, shipY, 10, 10); // Represent the ship with a small circle (optional)
  
  // Fill the entire central area from the center to the outer radius with black
  fill(0); // Set fill color to black
  noStroke(); // Remove the stroke
  ellipse(shipX, shipY, minRadius * 2, minRadius * 2); // Draw the filled circle
  
  // Place the PNG image in the center of the small circle
  float imgWidth = shipImage.width * 0.5; // Scale the image to fit
  float imgHeight = shipImage.height * 0.5;
  imageMode(CENTER); // Set image mode to CENTER to draw it from the center of the circle
  image(shipImage, shipX, shipY, imgWidth, imgHeight); // Draw the image at the center
}
