// Same setup as before
float[] planetDistancesX = {50, 100, 150, 200, 300, 400, 500, 600};
float[] planetDistancesY = {30, 60, 90, 120, 180, 240, 300, 360};
float[] planetSizes = {5, 10, 15, 12, 30, 25, 20, 18};
float[] speeds = {0.07, 0.04, 0.03, 0.07, 0.03, 0.04, 0.03, 0.06};
float[] planetMasses = {10, 20, 15, 25, 30, 40, 50, 60};
float[] angle = new float[8];
float[] velocityX = new float[8];
float[] velocityY = new float[8];
float[] velocityZ = new float[8];
float[][] planetTrailX = new float[8][20]; // Only store the last 20 positions for the trace
float[][] planetTrailY = new float[8][20];
float[][] planetTrailZ = new float[8][20];
int[] trailIndex = new int[8];

float sunX = 0;
float sunY = 0;
float sunSize = 50;
float sunMass = 50;

float cameraAngleX = 0;
float cameraAngleY = 0;
float cameraDistance = 1500;
float prevMouseX, prevMouseY;
boolean isDragging = false;
float startAngleX, startAngleY;

void setup() {
  size(1000, 1000, P3D);
  prevMouseX = mouseX;
  prevMouseY = mouseY;
}

void draw() {
  background(0);
  lights(); // Add lighting for better 3D effect

  // Only start rotating if dragging
  if (isDragging) {
    float mouseDeltaX = mouseX - prevMouseX;
    float mouseDeltaY = mouseY - prevMouseY;
    cameraAngleY = startAngleY + mouseDeltaX * 0.005;
    cameraAngleX = startAngleX - mouseDeltaY * 0.005;
  }

  // Update camera position
  float cameraX = cos(cameraAngleY) * cos(cameraAngleX) * cameraDistance;
  float cameraY = sin(cameraAngleX) * cameraDistance;
  float cameraZ = sin(cameraAngleY) * cos(cameraAngleX) * cameraDistance;
  camera(cameraX, cameraY, cameraZ, sunX, sunY, 0, 0, 1, 0);

  // Draw the Sun (fixed in the center of the screen)
  pushMatrix();
  translate(sunX, sunY, 0);
  fill(255, 255, 0);
  noStroke();
  sphere(sunSize);
  popMatrix();

  // Draw the planets first
  for (int i = 0; i < planetDistancesX.length; i++) {
    float x = cos(angle[i]) * planetDistancesX[i];
    float y = sin(angle[i]) * planetDistancesY[i];
    float z = sin(angle[i] * 1.5) * 50;

    // Apply color based on planet
    if (i == 0) fill(169, 169, 169); // Mercury
    if (i == 1) fill(255, 255, 204); // Venus
    if (i == 2) fill(0, 102, 204); // Earth
    if (i == 3) fill(204, 51, 51); // Mars
    if (i == 4) fill(255, 102, 0); // Jupiter
    if (i == 5) fill(255, 204, 0); // Saturn
    if (i == 6) fill(0, 255, 255); // Uranus
    if (i == 7) fill(0, 0, 255); // Neptune

    // Draw the planet
    pushMatrix();
    translate(x, y, z);
    sphere(planetSizes[i]);
    noStroke();
    popMatrix();

    // Store the current position of the planet in the trail arrays
    planetTrailX[i][trailIndex[i]] = x;
    planetTrailY[i][trailIndex[i]] = y;
    planetTrailZ[i][trailIndex[i]] = z;

    // Update the angle for each planet
    angle[i] += speeds[i];

    // Update trail index (loop around after reaching max length)
    trailIndex[i] = (trailIndex[i] + 1) % 20; // Now only store 20 positions
  }

  // Draw the trace as small points (instead of a line)
  for (int i = 0; i < planetDistancesX.length; i++) {
    for (int j = 0; j < 20; j++) {
      if (planetTrailX[i][j] != 0 && planetTrailY[i][j] != 0) {
        float alpha = map(j, 0, 20, 50, 255); // Fade effect for the trace
        fill(150, 150, 255, alpha);
        noStroke();
        pushMatrix();
        translate(planetTrailX[i][j], planetTrailY[i][j], planetTrailZ[i][j]);
        sphere(2); // Use a small sphere for the trace points
        popMatrix();
      }
    }
  }
}

// Mouse Pressed Function to start dragging
void mousePressed() {
  isDragging = true;
  startAngleX = cameraAngleX; // Record the starting angle
  startAngleY = cameraAngleY; // Record the starting angle
}

// Mouse Released Function to stop dragging
void mouseReleased() {
  isDragging = false;
}
