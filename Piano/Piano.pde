int maxHeight = 40;
int minHeight = 20;
int letterHeight = maxHeight; // Height of the letters

int numKeys = 9;      // Number of keys (for 'asdfghjkl')
char[] keyLetters = {'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'}; // Letters for the keys
color[] colors = new color[numKeys];

int beamLength = 200;  // Maximum length of the light beam

// Calculate letter width to fill the entire width of the canvas
int letterWidth = 1000 / numKeys;          // Width of each letter (key)

// To track the position of each beam
float[] beamYPos = new float[numKeys];
boolean[] beamActive = new boolean[numKeys];

// Store the key's x position
int[] keyXPos = new int[numKeys];

boolean newletter;             

void setup() {
  size(1000, 1000); // Set the canvas size to 1000x1000
  noFill();
  colorMode(HSB, 255); // Use HSB color mode for smoother color transitions
  background(0);

  // Set a hue value for each key and initial beam Y position
  for (int i = 0; i < numKeys; i++) {
    colors[i] = (i % 2 == 0) ? color(0) : color(255); // Alternate black and white for the keys
    beamYPos[i] = height; // Initially place the beam at the bottom of the screen
    keyXPos[i] = i * letterWidth; // Calculate the X position of each key
  }
}

void draw() {
  background(0);  // Clear the screen on each frame to avoid drawing the tail

  // Draw the keyboard keys at the bottom
  drawKeyboard();
  
  // Draw the "letter" and beam for each active key
  for (int i = 0; i < numKeys; i++) {
    if (beamActive[i]) {
      // Draw the light beam moving upwards as a rectangle
      drawLightBeam(keyXPos[i] + letterWidth / 2, beamYPos[i], i);
      
      // Move the light beam upwards (fixed speed)
      beamYPos[i] -= 15;  // Move the beam up (adjust speed)
      
      // Stop the beam after it moves off-screen
      if (beamYPos[i] + beamLength < 0) {
        beamActive[i] = false;  // Deactivate the beam once it's off-screen
      }
    }
  }
}

void keyPressed() {
  // If the key is in the range of 'a' to 'l'
  for (int i = 0; i < numKeys; i++) {
    if (key == keyLetters[i]) {
      letterHeight = maxHeight;
      fill(colors[i]);
      newletter = true;
      
      // Start the beam at the bottom of the screen
      beamActive[i] = true;
      beamYPos[i] = height;  // Reset the beam Y position to the bottom when a key is pressed
      break;
    }
  }
}

void drawLightBeam(float xStart, float yStart, int keyIndex) {
  // Draw the light beam as a moving rectangle
  float beamWidth = letterWidth * 0.9;  // Beam width is 90% of key width
  float beamXStart = xStart - beamWidth / 2;  // Adjust beam position to be centered
  
  // Set beam color to blue
  fill(0, 0, 255, 150);  // Blue color with transparency
  
  // Draw a moving rectangle that represents the beam, never longer than 200 pixels
  rect(beamXStart, yStart - beamLength, beamWidth, min(beamLength, 1000));  // Beam starts from the top of the key
}

void drawKeyboard() {
  int keyboardY = height - 100; // Position the keyboard at the bottom
  
  // Draw each key
  for (int i = 0; i < numKeys; i++) {
    fill(0, 0, 255);  // Set the key color (blue)
    stroke(0);        // Add a black stroke
    strokeWeight(2);  // Set the stroke weight
    rect(i * letterWidth, keyboardY, letterWidth, 100); // Draw keys at the bottom
    fill(0);          // Set text color to black
    textSize(50);
    textAlign(CENTER, CENTER);
    text(keyLetters[i], i * letterWidth + letterWidth / 2, keyboardY + letterHeight / 2); // Display letter
  }
}
