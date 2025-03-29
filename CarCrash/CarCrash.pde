int numCars = 20; // Number of cars
Car[] cars = new Car[numCars];
PImage carImg;  // Variable to hold the car image

void setup() {
  size(1000, 1000); // Set the size of the canvas
  carImg = loadImage("Car.png"); // Load the car image (make sure the image is in the correct path)
  
  for (int i = 0; i < numCars; i++) {
    cars[i] = new Car(random(width), random(height)); // Initialize each car with random positions
  }
}

void draw() {
  background(0);
  
  for (int i = 0; i < numCars; i++) {
    cars[i].move();  // Move the car
    cars[i].display();  // Display the car
  }

  // Check for collisions
  for (int i = 0; i < numCars; i++) {
    for (int j = i + 1; j < numCars; j++) {
      if (cars[i].checkCollision(cars[j])) {
        cars[i].explode();  // Explode car i
        cars[j].explode();  // Explode car j
      }
    }
  }
}

// Car class to represent a car object
class Car {
  float x, y;  // Position of the car
  float speedX, speedY; // Speed of the car in both X and Y directions
  boolean exploded = false; // Whether the car has exploded
  int explosionTime = 0; // Timer to track how long the explosion lasts
  float explosionRadius = 0; // Radius of the explosion effect
  int explosionMaxTime = 180; // How long the explosion lasts (in frames)

  Car(float x, float y) {
    this.x = x;
    this.y = y;
    this.speedX = random(2, 5) * (random(1) > 0.5 ? 1 : -1); // Random speed for each car in X
    this.speedY = random(2, 5) * (random(1) > 0.5 ? 1 : -1); // Random speed for each car in Y
  }
  
  void move() {
    if (!exploded) {
      x += speedX; // Move the car horizontally
      y += speedY; // Move the car vertically

      // Keep the cars inside the canvas
      if (x > width) x = 0;
      if (x < 0) x = width;
      if (y > height) y = 0;
      if (y < 0) y = height;
    } else {
      explosionTime++; // Increase the timer when exploded
      explosionRadius = map(explosionTime, 0, explosionMaxTime, 0, 100); // Increase the explosion radius
      
      if (explosionTime > explosionMaxTime) { // After 3 seconds (180 frames at 60fps)
        respawn(); // Respawn the car after 3 seconds
      }
    }
  }
  
  void display() {
    if (exploded) {
      drawExplosion();
    } else {
      // Draw the car image instead of the rectangle
      image(carImg, x, y, 50, 30); // Display the car image (resize it to fit)
    }
  }

  // Check for collision with another car
  boolean checkCollision(Car other) {
    float distX = other.x - x;
    float distY = other.y - y;
    float distance = sqrt(distX * distX + distY * distY);
    return distance < 50; // Collision if distance is less than the car's size
  }
  
  // Explode the car (show an explosion)
  void explode() {
    exploded = true;
    speedX = 0;
    speedY = 0;
  }
  
  // Draw dramatic explosion effect
  void drawExplosion() {
    // Explosion shockwave effect (growing circle)
    noFill();
    stroke(255, 0, 0, 150); // Red color for shockwave
    strokeWeight(4);
    ellipse(x + 25, y + 15, explosionRadius * 2, explosionRadius * 2); // Expanding circle

    // Flash effect (car color changes during explosion)
    fill(255, 255, 0, 150); // Yellow color for explosion flash
    noStroke();
    ellipse(x + 25, y + 15, explosionRadius * 2.5, explosionRadius * 2.5); // Flash around the car
  }

  // Respawn the car after explosion
  void respawn() {
    exploded = false; // Reset the car's explosion state
    explosionTime = 0; // Reset the explosion timer
    explosionRadius = 0; // Reset explosion radius
    x = random(width); // Set a new random position
    y = random(height); // Set a new random position
    speedX = random(2, 5) * (random(1) > 0.5 ? 1 : -1); // Random speed for the new car
    speedY = random(2, 5) * (random(1) > 0.5 ? 1 : -1); // Random speed for the new car
  }
}
