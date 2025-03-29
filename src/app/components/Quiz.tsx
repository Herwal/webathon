import React, { useRef, useEffect } from "react";
import p5 from "p5";

const Quiz: React.FC = () => {
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sketch = (p: p5) => {
      let currentQuestion = 0;
      const questions = [
        "1. What is the largest desert in the world?",
        "2. Who was the first woman to win a Nobel Prize?",
        "3. What is the capital of Australia?",
        "4. Who wrote the novel '1984'?",
        "5. What is the smallest country in the world by area?",
        "6. Which element has the chemical symbol 'Au'?",
        "7. What is the name of the longest river in the world?",
        "8. Which planet is known as the Red Planet?",
        "9. Who painted the famous artwork 'The Persistence of Memory'?",
        "10. In what year did the Titanic sink?",
      ];

      const options = [
        ["Sahara", "Kalahari", "Gobi", "Atacama"],
        ["Marie Curie", "Rosalind Franklin", "Ada Lovelace", "Jane Goodall"],
        ["Canberra", "Sydney", "Melbourne", "Brisbane"],
        ["George Orwell", "Aldous Huxley", "Ray Bradbury", "J.R.R. Tolkien"],
        ["Vatican City", "Monaco", "San Marino", "Nauru"],
        ["Gold", "Silver", "Copper", "Lead"],
        ["Nile", "Amazon", "Yangtze", "Mississippi"],
        ["Mars", "Venus", "Jupiter", "Saturn"],
        ["Salvador Dali", "Pablo Picasso", "Claude Monet", "Vincent van Gogh"],
        ["1912", "1911", "1905", "1920"],
      ];

      const answers = [
        "Sahara",
        "Marie Curie",
        "Canberra",
        "George Orwell",
        "Vatican City",
        "Gold",
        "Nile",
        "Mars",
        "Salvador Dali",
        "1912",
      ];

      let score = 0;
      let selectedOption = -1;
      let isAnswered = false;
      let isQuizOver = false;

      const shuffleOptions = () => {
        const currentOptions = options[currentQuestion];
        const shuffled = p.shuffle([...currentOptions]);
        options[currentQuestion] = shuffled;
      };

      p.setup = () => {
        p.createCanvas(1000, 600);
        p.textAlign(p.CENTER);
        p.textSize(20);
        shuffleOptions();
      };

      p.draw = () => {
        p.background(0);

        if (!isQuizOver) {
          // Display score
          p.fill(255);
          p.textSize(18);
          p.text(`Score: ${score}`, p.width / 2, p.height * 0.1);

          // Display question
          p.textSize(24);
          p.text(questions[currentQuestion], p.width / 2, p.height * 0.2);

          // Display options
          p.textSize(18);
          const optionStartY = p.height * 0.4;
          for (let i = 0; i < options[currentQuestion].length; i++) {
            if (i === selectedOption) {
              p.fill(200, 0, 0); // Highlight selected option
            } else {
              p.fill(255);
            }
            p.rect(
              p.width * 0.2,
              optionStartY + i * 60,
              p.width * 0.6,
              50
            );
            p.fill(0);
            p.text(
              options[currentQuestion][i],
              p.width / 2,
              optionStartY + i * 60 + 30
            );
          }

          if (isAnswered) {
            // Check if the selected option is correct
            if (
              options[currentQuestion][selectedOption] ===
              answers[currentQuestion]
            ) {
              score++;
            }

            // Move to the next question
            currentQuestion++;
            if (currentQuestion < questions.length) {
              shuffleOptions();
            }
            isAnswered = false;
            selectedOption = -1;
          }

          if (currentQuestion >= questions.length) {
            isQuizOver = true;
          }
        } else {
          // Display final score
          p.textSize(24);
          p.fill(255);
          p.text(
            `Quiz Over! Final Score: ${score} / ${questions.length}`,
            p.width / 2,
            p.height * 0.4
          );

          p.textSize(16);
          p.text("Click to Restart", p.width / 2, p.height * 0.6);
        }
      };

      p.mousePressed = () => {
        if (isQuizOver) {
          // Restart the quiz
          currentQuestion = 0;
          score = 0;
          isQuizOver = false;
          selectedOption = -1;
          shuffleOptions();
        } else {
          // Check which option is clicked
          const optionStartY = p.height * 0.4;
          for (let i = 0; i < options[currentQuestion].length; i++) {
            if (
              p.mouseX > p.width * 0.2 &&
              p.mouseX < p.width * 0.8 &&
              p.mouseY > optionStartY + i * 60 &&
              p.mouseY < optionStartY + i * 60 + 50
            ) {
              selectedOption = i;
              isAnswered = true;
            }
          }
        }
      };

      p.keyPressed = () => {
        if (!isQuizOver && selectedOption !== -1) {
          isAnswered = true;
        }
      };
    };

    const p5Instance = new p5(sketch, sketchRef.current!);

    return () => {
      p5Instance.remove();
    };
  }, []);

  return <div ref={sketchRef}></div>;
};

export default Quiz;
