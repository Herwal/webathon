PVector gravity;   // Gravity acts at the shape's acceleration
ArrayList<Ball> balls = new ArrayList<Ball>();
int ballCount = 0;  // Keep track of the number of balls

void setup() {
  size(1000, 1000);  // Set the frame size to 1000x1000
  gravity = new PVector(0, 0.2); // Gravity
}

void draw() {
  background(0);
  
  // Loop through all balls to update and display them
  for (int i = 0; i < balls.size(); i++) {
    Ball b = balls.get(i);
    b.update();
    b.display();
  }
  
  // If there are no balls left, spawn one at the top with a random velocity and color
  if (balls.isEmpty() && ballCount < 1000) {
    balls.add(new Ball(random(width), 100, random(-4, 4), random(5, 7)));  // Higher starting velocity for more bounce
    ballCount++;  // Increment the ball count
  }

  // Reset if 1000 balls have been created
  if (ballCount >= 1000) {
    balls.clear();
    ballCount = 0;
  }
}

class Ball {
  PVector location;
  PVector velocity;
  PVector acceleration;
  color ballColor;  // Random color for the ball

  Ball(float x, float y, float vx, float vy) {
    location = new PVector(x, y);
    velocity = new PVector(vx, vy);
    acceleration = new PVector(0, gravity.y);  // Apply gravity acceleration to the y-axis
    ballColor = color(random(255), random(255), random(255)); // Random color for each ball
  }

  void update() {
    velocity.add(acceleration);   // Update velocity with acceleration (gravity)
    location.add(velocity);       // Update location with velocity
    
    // Bounce off edges (left and right) with more sideways motion
    if (location.x > width || location.x < 0) {
      velocity.x *= -1.2;  // Reverse and amplify horizontal velocity to make more sideways bounce
    }

    // Bounce off the top
    if (location.y < 0) {
      velocity.y *= -0.95;  // Reverse the vertical velocity for a bounce from the top
      location.y = 0;       // Keep the ball at the top
    }

    // Bounce off the bottom (ground)
    if (location.y > height - 24) {  // Ensure the ball stays above the ground (half the diameter)
      velocity.y *= -0.98;  // Increase the bounce factor for more bounciness (bounce more)
      velocity.x *= 1.1;     // Amplify horizontal bounce to make it move sideways more
      location.y = height - 24;  // Keep the ball on the ground
      // Create a new ball each time it bounces
      balls.add(new Ball(random(width), 100, random(-4, 4), random(5, 7)));
      ballCount++;  // Increment the ball count on each bounce

      // Reset if 1000 balls have been created
      if (ballCount >= 1000) {
        balls.clear();
        ballCount = 0;
      }
    }
  }

  void display() {
    stroke(255);
    strokeWeight(2);
    fill(ballColor);  // Use random color
    ellipse(location.x, location.y, 48, 48);  // Draw the ball
  }
}
