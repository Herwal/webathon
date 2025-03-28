int wheelRadius = 200;
int numSections = 37; // 36 numbers + 1 for 0 (roulette wheel)
float angleStep;
float ballAngle = 0;
boolean isSpinning = false;
float spinSpeed = 0;
int outerRadius = wheelRadius + 30;  // Outer circle radius (wooden circle)
int winnerNumber = -1;  // Variable to store the winning number

void setup() {
  size(1000, 1000);
  angleStep = TWO_PI / numSections;
  smooth();
}

void draw() {
  background(255);
  
  // Draw wooden outer circle
  translate(width / 2, height / 2);
  stroke(139, 69, 19);  // Brown color for the wooden circle
  strokeWeight(15);  // Make the outer circle thick
  noFill();
  ellipse(0, 0, outerRadius * 2, outerRadius * 2);  // Wooden outer circle
  
  // Draw wheel
  stroke(0);
  strokeWeight(2);
  fill(255, 204, 0);  // Yellow center
  ellipse(0, 0, wheelRadius * 2, wheelRadius * 2);
  
  // Draw sections (numbers)
  for (int i = 0; i < numSections; i++) {
    float startAngle = i * angleStep;
    float endAngle = (i + 1) * angleStep;
    
    // Set section color
    if (i == 0) {
      fill(0, 128, 0); // Green for 0
    } else if (i % 2 == 0) {
      fill(0);  // Black for even numbers
    } else {
      fill(255, 0, 0);  // Red for odd numbers
    }
    
    arc(0, 0, wheelRadius * 2, wheelRadius * 2, startAngle, endAngle, PIE);
    
    pushMatrix();
    rotate(startAngle + angleStep / 2);
    
    // Set text color based on the number
    if (i == 0) {
      fill(255);  // White for 0
    } else if (i % 2 == 0) {
      fill(255);  // White for even numbers
    } else {
      fill(0);  // Black for odd numbers
    }
    
    // Display the number
    textSize(16);
    textAlign(CENTER, CENTER);
    text(str(i), wheelRadius / 2, 0);
    popMatrix();
  }
  
  // Draw ball
  float ballX = wheelRadius * cos(ballAngle);
  float ballY = wheelRadius * sin(ballAngle);
  fill(255, 0, 0);
  ellipse(ballX, ballY, 20, 20);
  
  // Handle spinning
  if (isSpinning) {
    ballAngle += spinSpeed;
    spinSpeed *= 0.99;  // Gradually slow down the wheel
    if (spinSpeed < 0.01) {
      isSpinning = false;
      // Determine the winner based on the final ball position
      winnerNumber = (int) floor((ballAngle / TWO_PI) * numSections) % numSections;
    }
  }
  
  // Display winner number if the wheel has stopped
  if (!isSpinning && winnerNumber != -1) {
    fill(0);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("Winner: " + winnerNumber, 0, outerRadius + 30);  // Show the winner below the wheel
  }
}

void mousePressed() {
  if (!isSpinning) {
    spinSpeed = random(0.1, 0.3);  // Set random spin speed
    isSpinning = true;
    winnerNumber = -1;  // Reset winner number when a new spin starts
  }
}
