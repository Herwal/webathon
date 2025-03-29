int numBlobs = 50;
Blob[] blobs = new Blob[numBlobs];
PlayerBlob player;
boolean gameWon = false;
int gameWonTime = 0;

void setup() {
  size(1000, 1000);
  smooth();
  
  // Create player blob
  player = new PlayerBlob(width / 2, height / 2, 30); // Start in the middle with a size of 30

  // Create other blobs with random positions, speeds, and sizes
  for (int i = 0; i < numBlobs; i++) {
    blobs[i] = new Blob(random(width), random(height), random(10, 20));
  }
}

void draw() {
  background(0);  // Black background
  
  if (gameWon) {
    // Show "You won the game!" for 5 seconds
    int elapsedTime = millis() - gameWonTime;
    fill(255);
    textSize(48);
    textAlign(CENTER, CENTER);
    text("You won the game!", width / 2, height / 2);
    
    if (elapsedTime > 5000) {  // 5 seconds have passed
      resetGame();
    }
  } else {
    // Update and display the player blob
    player.update();
    player.display();
    
    // Check if player size exceeds 800
    if (player.size >= 1000) {
      gameWon = true;
      gameWonTime = millis();
    }
    
    // Update and display all the other blobs
    for (int i = 0; i < numBlobs; i++) {
      blobs[i].update();
      blobs[i].display();
      
      // Check for collisions with the player blob
      if (dist(player.x, player.y, blobs[i].x, blobs[i].y) < (player.size / 2 + blobs[i].size / 2)) {
        player.absorb(blobs[i]);  // Player absorbs the blob
        blobs[i].reset();  // Reset the absorbed blob
      }
    }
  }
}

void resetGame() {
  // Reset the player size and blobs
  player.size = 30;
  player.x = width / 2;
  player.y = height / 2;
  
  // Reset all blobs
  for (int i = 0; i < numBlobs; i++) {
    blobs[i].reset();
  }
  
  gameWon = false;  // Reset gameWon flag
}

class PlayerBlob {
  float x, y, size;
  color col;

  PlayerBlob(float x, float y, float size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.col = color(255, 0, 0);  // Red color for the player
  }

  void update() {
    // Follow the mouse position
    float angle = atan2(mouseY - y, mouseX - x);
    x += cos(angle) * 2;  // Move towards the mouse
    y += sin(angle) * 2;

    // Prevent player from going off-screen
    x = constrain(x, size / 2, width - size / 2);
    y = constrain(y, size / 2, height - size / 2);
  }

  void absorb(Blob b) {
    // Increase the player's size by the area of the absorbed blob
    size += b.size * 0.5;  // The player grows based on the size of the blob absorbed
  }

  void display() {
    fill(col);
    noStroke();
    ellipse(x, y, size, size);  // Draw the player blob
  }
}

class Blob {
  float x, y, size;
  color col;

  Blob(float x, float y, float size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.col = color(random(255), random(255), random(255));  // Random color for the blob
  }

  void update() {
    // Random movement for other blobs
    x += random(-1, 1);
    y += random(-1, 1);

    // Prevent blobs from going off-screen
    x = constrain(x, size / 2, width - size / 2);
    y = constrain(y, size / 2, height - size / 2);
  }

  void reset() {
    // Reset the blob's position and size after being absorbed
    x = random(width);
    y = random(height);
    size = random(10, 20);  // Small size after reset
    col = color(random(255), random(255), random(255));  // New random color
  }

  void display() {
    fill(col);
    noStroke();
    ellipse(x, y, size, size);  // Draw the blob
  }
}
