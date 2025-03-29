ArrayList<Firework> fireworks;

void setup() {
  size(1000, 1000);
  fireworks = new ArrayList<Firework>();
}

void draw() {
  background(0);
  
  if (random(1) < 0.05) { // Increased chance to launch a new firework
    fireworks.add(new Firework());
  }
  
  for (int i = fireworks.size() - 1; i >= 0; i--) {
    Firework f = fireworks.get(i);
    f.update();
    f.show();
    if (f.done()) {
      fireworks.remove(i);
    }
  }
}

// Firework class
class Firework {
  Particle core;
  ArrayList<Particle> particles;
  boolean exploded = false;
  
  Firework() {
    core = new Particle(random(width), height, true);
    particles = new ArrayList<Particle>();
  }
  
  void update() {
    if (!exploded) {
      core.update();
      if (core.vel.y >= 0) { // Explode when it reaches peak
        explode();
        exploded = true;
      }
    }
    for (Particle p : particles) {
      p.update();
    }
  }
  
  void explode() {
    for (int i = 0; i < 150; i++) { // More particles for crazier effect
      particles.add(new Particle(core.pos.x, core.pos.y, false));
    }
  }
  
  void show() {
    if (!exploded) {
      core.show();
    }
    for (Particle p : particles) {
      p.show();
    }
  }
  
  boolean done() {
    return exploded && particles.size() == 0;
  }
}

// Particle class
class Particle {
  PVector pos, vel, acc;
  boolean isFirework;
  int lifespan = 255;
  color c;
  
  Particle(float x, float y, boolean firework) {
    pos = new PVector(x, y);
    isFirework = firework;
    
    if (firework) {
      vel = new PVector(0, random(-10, -15)); // Shoot up with higher speed
    } else {
      vel = PVector.random2D().mult(random(4, 10)); // Exploding in random directions
    }
    
    acc = new PVector(0, 0.1); // Gravity
    
    // Random colors for explosion particles
    if (isFirework) {
      c = color(random(255), random(255), random(255)); // Random firework color
    } else {
      c = color(random(255), random(255), random(255), lifespan); // Fading explosion colors
    }
  }
  
  void update() {
    vel.add(acc);
    pos.add(vel);
    if (!isFirework) {
      lifespan -= 5; // Faster fading
    }
  }
  
  void show() {
    stroke(c);
    strokeWeight(isFirework ? 8 : 5); // Thicker fireworks
    point(pos.x, pos.y);
  }
}
