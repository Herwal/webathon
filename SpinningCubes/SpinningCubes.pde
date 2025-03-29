/**
 * Twisted Rotating Prism Parade
 * 
 * This is no ordinary rotating stack of boxes. Here, every box has a mind of its own. 
 * They rotate in different dimensions and keep throwing themselves into the chaos of space, 
 * following their own quirky rules. Brace yourself.
 */

float a;                // The angle that makes everything spin
float offset = PI/20.0; // A more whimsical offset for box rotations
int num = 50;           // More boxes, more madness

void setup() { 
  size(1000, 1000, P3D); 
  noStroke();           // We don't need sharp edges, just curves of madness
} 

void draw() {
  
  lights(); // Let there be light… in the chaos

  background(0, 0, 50); // Deep space is always the best backdrop for madness
  
  translate(width / 2, height / 2); // Center the vortex of insanity

  for (int i = 0; i < num; i++) {
    float gray = map(i, 0, num - 1, 50, 255); // A little greyscale twist
    
    pushMatrix(); 
    
    fill(gray, random(100, 255), random(100, 255)); // Colors of the cosmos!
    
    rotateY(a + offset * i);   // Twisting in space like a cosmic dance
    rotateX(a * 0.5 + offset * i);  // Adding more rotation for that disorienting effect
    rotateZ(a * 2.0 + offset * i);  // What? We’re rotating around Z too? Why not!
    
    box(400 + sin(a * i) * 50); // Size shifts with sin, just to mess with perspective
    popMatrix(); 
    
    // Let each box rotate at its own pace
  }
  
  a += 0.02; // Speed up the madness just a little bit
}
