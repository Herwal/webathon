float max_distance;

void setup() {
  size(1000, 1000); 
  noStroke();
  max_distance = dist(0, 0, width, height) / 2; // Reduce max distance effect
}

void draw() {
  background(0);
  
  for(int i = 0; i <= width; i += 20) {
    for(int j = 0; j <= height; j += 20) {
      float size = dist(mouseX, mouseY, i, j);
      size = size/max_distance * 66;
      size = max(size, 5);  // Ensure a minimum size of 5
      
      float col = map(size, 5, 66, 255, 0);
      fill(col, random(50, 255), random(150, 255), 200);
      
      pushMatrix();
      translate(i, j);
      rotate(frameCount * 0.01);
      ellipse(0, 0, size * sin(frameCount * 0.1) * 1.5, size * cos(frameCount * 0.1) * 1.5);
      popMatrix();
    }
  }
}
