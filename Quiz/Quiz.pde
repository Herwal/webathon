import java.util.Collections;
import java.util.List;
import java.util.ArrayList;

int currentQuestion = 0;
String[] questions = {
  "1. What is the largest desert in the world?",
  "2. Who was the first woman to win a Nobel Prize?",
  "3. What is the capital of Australia?",
  "4. Who wrote the novel '1984'?",
  "5. What is the smallest country in the world by area?",
  "6. Which element has the chemical symbol 'Au'?",
  "7. What is the name of the longest river in the world?",
  "8. Which planet is known as the Red Planet?",
  "9. Who painted the famous artwork 'The Persistence of Memory'?",
  "10. In what year did the Titanic sink?"
};

String[][] options = {
  {"Sahara", "Kalahari", "Gobi", "Atacama"},
  {"Marie Curie", "Rosalind Franklin", "Ada Lovelace", "Jane Goodall"},
  {"Canberra", "Sydney", "Melbourne", "Brisbane"},
  {"George Orwell", "Aldous Huxley", "Ray Bradbury", "J.R.R. Tolkien"},
  {"Vatican City", "Monaco", "San Marino", "Nauru"},
  {"Gold", "Silver", "Copper", "Lead"},
  {"Nile", "Amazon", "Yangtze", "Mississippi"},
  {"Mars", "Venus", "Jupiter", "Saturn"},
  {"Salvador Dali", "Pablo Picasso", "Claude Monet", "Vincent van Gogh"},
  {"1912", "1911", "1905", "1920"}
};

String[] answers = {
  "Sahara",
  "Marie Curie",
  "Canberra",
  "George Orwell",
  "Vatican City",
  "Gold",
  "Nile",
  "Mars",
  "Salvador Dali",
  "1912"
};

int score = 0;
int selectedOption = -1;
boolean isAnswered = false;
boolean isQuizOver = false;
int correctOptionIndex = -1;

void setup() {
  size(1000, 1000);  // Set the frame size to 1000x1000
  textAlign(CENTER);
  textSize(20);
  shuffleOptions();
}

void draw() {
  background(0);
  
  if (!isQuizOver) {
    // Display the score continuously in white font while the quiz is active
    fill(255);
    textSize(18);
    text("Score: " + score, width / 2, height / 2 - 200 );
    
    // Display question
    fill(255);
    textSize(24);
    text(questions[currentQuestion], width / 2, height / 4);
    
    // Display options (move boxes lower)
    textSize(18);
    int optionStartY = height / 2 + 100; // Starting point for options, moved lower
    for (int i = 0; i < options[currentQuestion].length; i++) {
      if (i == selectedOption) {
        fill(200, 0, 0);  // Highlight selected option
      } else {
        fill(255);
      }
      rect(200, optionStartY + i * 60, 600, 50);  // Draw a box around each option
      fill(0);
      text(options[currentQuestion][i], width / 2, optionStartY + i * 60 + 30);  // Display option text
    }
    
    if (isAnswered) {
      // Check if the selected option is correct
      if (options[currentQuestion][selectedOption].equalsIgnoreCase(answers[currentQuestion])) {
        score++;
      }
      
      // Move to the next question
      currentQuestion++;
      if (currentQuestion < questions.length) {
        shuffleOptions();  // Shuffle options for the next question
      }
      isAnswered = false;
      selectedOption = -1;  // Reset selected option
    }
    
    if (currentQuestion >= questions.length) {
      isQuizOver = true;
    }
  } else {
    // Display the final score and reset message
    textSize(24);
    fill(255);  // Ensure text is white and visible
    text("Quiz Over! Final Score: " + score + " / 10", width / 2, height / 2 - 50);  // Display real score
    
    textSize(16);
    text("Click to Restart", width / 2, height / 2 + 50);
  }
}

void mousePressed() {
  if (isQuizOver) {
    // Restart the quiz when clicked
    currentQuestion = 0;
    score = 0;
    isQuizOver = false;
    selectedOption = -1;
    shuffleOptions();  // Shuffle the options at the start of the quiz
  } else {
    // Check which option is clicked
    for (int i = 0; i < options[currentQuestion].length; i++) {
      if (mouseX > 200 && mouseX < 800 && mouseY > (height / 2 + 100) + i * 60 && mouseY < (height / 2 + 100) + 50 + i * 60) {
        selectedOption = i;  // Select the clicked option
        isAnswered = true;    // Mark the question as answered
      }
    }
  }
}

void keyPressed() {
  // Skip to the next question if the user presses any key (optional)
  if (!isQuizOver && selectedOption != -1) {
    isAnswered = true;
  }
}

// Shuffle the options for the current question
void shuffleOptions() {
  // Get the list of options for the current question
  List<String> currentOptions = new ArrayList<String>();
  for (String option : options[currentQuestion]) {
    currentOptions.add(option);
  }
  
  // Shuffle the options randomly
  Collections.shuffle(currentOptions);
  
  // Update the options array with the shuffled options
  options[currentQuestion] = currentOptions.toArray(new String[0]);
  
  // Find the new correct answer's index in the shuffled options
  correctOptionIndex = -1;
  for (int i = 0; i < options[currentQuestion].length; i++) {
    if (options[currentQuestion][i].equals(answers[currentQuestion])) {
      correctOptionIndex = i;
      break;
    }
  }
}
