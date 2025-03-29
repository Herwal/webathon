PImage door1, door2, door3;
PImage lion, gold;
int chosenDoor = -1;
boolean gameOver = false;
int goldDoor;
boolean showLionFullScreen = false;
long lionStartTime;

void setup() {
  size(1000, 1000);
  
  door1 = loadImage("door1.png");
  door2 = loadImage("door2.png");
  door3 = loadImage("door3.png");
  lion = loadImage("lion.png");
  gold = loadImage("gold.png");
  
  startNewGame();
}

void draw() {
  background(255);
  
  if (showLionFullScreen) {
    if (millis() - lionStartTime < 5000) {
      image(lion, 0, 0, width, height);
      return;
    } else {
      showLionFullScreen = false;
    }
  }
  
  textAlign(CENTER, TOP);
  textSize(40);
  fill(0);
  text("Pick the Door Game, do not pick the door with a lion :)", width / 2, 50);
  
  image(door1, 100, 300, 200, 400);
  image(door2, 400, 300, 200, 400);
  image(door3, 700, 300, 200, 400);

  if (gameOver) {
    displayResult();
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(0);
    text("Press any key to play again!", width / 2, 950);
  }
}

void mousePressed() {
  if (!gameOver) {
    if (mouseX > 100 && mouseX < 300 && mouseY > 300 && mouseY < 700) {
      chosenDoor = 0;
    } else if (mouseX > 400 && mouseX < 600 && mouseY > 300 && mouseY < 700) {
      chosenDoor = 1;
    } else if (mouseX > 700 && mouseX < 900 && mouseY > 300 && mouseY < 700) {
      chosenDoor = 2;
    }
    
    gameOver = true;
    if (chosenDoor != goldDoor) {
      showLionFullScreen = true;
      lionStartTime = millis();
    }
  }
}

void keyPressed() {
  if (gameOver && !showLionFullScreen) {
    startNewGame();
  }
}

void startNewGame() {
  chosenDoor = -1;
  gameOver = false;
  showLionFullScreen = false;
  goldDoor = int(random(3));
}

void displayResult() {
  if (chosenDoor == goldDoor) {
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(0, 255, 0);
    text("You found the gold!", width / 2, 850);
    if (chosenDoor == 0) {
      image(gold, 150, 350, 100, 100);
    } else if (chosenDoor == 1) {
      image(gold, 450, 350, 100, 100);
    } else if (chosenDoor == 2) {
      image(gold, 750, 350, 100, 100);
    }
  } else {
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(255, 0, 0);
    text("You got a lion!", width / 2, 850);
    if (chosenDoor == 0) {
      image(lion, 150, 350, 100, 100);
    } else if (chosenDoor == 1) {
      image(lion, 450, 350, 100, 100);
    } else if (chosenDoor == 2) {
      image(lion, 750, 350, 100, 100);
    }
  }
}
