import React, { useRef, useEffect } from "react";
import p5 from "p5";

//TODO: Få alle søyler til å bli grønne når ferdig sortert, og add en reset knapp

const SortingVisualiser: React.FC = () => {
  const sketchRef = useRef<HTMLDivElement>(null);
  const previousMillisRef = useRef(0); // Use useRef to persist the value
  const interval = 1000; // interval in milliseconds (1 second)

  useEffect(() => {
    const sketch = (p: p5) => {
      let values1: number[], values2: number[], values3: number[], values4: number[];
      let sorted1 = false,
        sorted2 = false,
        sorted3 = false,
        sorted4 = false;
      const numBars = 50;
      let barWidth: number;
      let sortedIndex1 = 0,
        sortedIndex2 = 0,
        sortedIndex3 = 0,
        sortedIndex4 = 0;
      let bogoSortProcessing = false;

      p.setup = () => {
        p.createCanvas(600, 600);
        p.noStroke();

        // Initialize arrays
        values1 = Array(numBars).fill(0);
        values2 = Array(numBars).fill(0);
        values3 = Array(numBars).fill(0);
        values4 = Array(numBars).fill(0);

        // Calculate bar width
        barWidth = (p.width / 2 - 110) / numBars;

        randomizeArrays();
      };

      p.draw = () => {
        p.background(0);
        const currentMillis = p.millis();

        // Display sorting algorithms
        displaySortingAlgorithm(values1, 0, 0, sortedIndex1, "Bubble Sort");
        displaySortingAlgorithm(values2, 1, 0, sortedIndex2, "Insertion Sort");
        displaySortingAlgorithm(values3, 0, 1, sortedIndex3, "Selection Sort");
        displaySortingAlgorithm(values4, 1, 1, sortedIndex4, "Bogo Sort");

        // Perform sorting
        if (!sorted1) bubbleSort(values1);
        if (!sorted2) insertionSort(values2);
        if (!sorted3) selectionSort(values3);
        if (!sorted4) bogoSort(values4);

        // Reset sorting state if all algorithms are done
        if (sorted1 && sorted2 && sorted3 && sorted4) {
          if (currentMillis - previousMillisRef.current >= interval) {
            resetSortingState();
            previousMillisRef.current = currentMillis; // Update the ref value
          }
        }
      };

      const randomizeArrays = () => {
        const randomValues = Array.from({ length: numBars }, () =>
          Math.floor(p.random(50, p.height / 2 - 50))
        );

        values1 = [...randomValues];
        values2 = [...randomValues];
        values3 = [...randomValues];
        values4 = [...randomValues];
      };

      const displaySortingAlgorithm = (
        values: number[],
        gridX: number,
        gridY: number,
        sortedIndex: number,
        label: string
      ) => {
        const xOffset = gridX * (p.width / 2);
        const yOffset = gridY * (p.height / 2);
        const maxHeight = p.height / 2;

        // Draw label
        p.fill(255);
        p.textSize(16);
        p.textAlign(p.CENTER, p.TOP);
        p.text(label, xOffset + p.width / 4, yOffset + 10);

        // Draw bars
        for (let i = 0; i < values.length; i++) {
          p.fill(i >= values.length - sortedIndex ? "green" : "red");
          p.rect(
            xOffset + i * (barWidth + 2),
            yOffset + maxHeight - values[i],
            barWidth,
            values[i]
          );
        }
      };

      const bubbleSort = (values: number[]) => {
        if (sortedIndex1 < values.length - 1) {
          for (let i = 0; i < values.length - 1 - sortedIndex1; i++) {
            if (values[i] > values[i + 1]) {
              [values[i], values[i + 1]] = [values[i + 1], values[i]];
            }
          }
          sortedIndex1++;
        } else {
          sorted1 = true;
        }
      };

      const insertionSort = (values: number[]) => {
        if (sortedIndex2 < values.length) {
          const key = values[sortedIndex2];
          let j = sortedIndex2 - 1;

          while (j >= 0 && values[j] > key) {
            values[j + 1] = values[j];
            j--;
          }
          values[j + 1] = key;
          sortedIndex2++;
        } else {
          sorted2 = true;
        }
      };

      const selectionSort = (values: number[]) => {
        if (sortedIndex3 < values.length - 1) {
          let minIdx = sortedIndex3;
          for (let j = sortedIndex3 + 1; j < values.length; j++) {
            if (values[j] < values[minIdx]) {
              minIdx = j;
            }
          }
          [values[minIdx], values[sortedIndex3]] = [values[sortedIndex3], values[minIdx]];
          sortedIndex3++;
        } else {
          sorted3 = true;
        }
      };

      const bogoSort = (values: number[]) => {
        if (!bogoSortProcessing) {
          bogoSortProcessing = true;
        }

        if (!isSorted(values)) {
          shuffleArray(values);
        } else {
          sorted4 = true;
          bogoSortProcessing = false;
        }
      };

      const isSorted = (values: number[]) => {
        for (let i = 1; i < values.length; i++) {
          if (values[i] < values[i - 1]) {
            return false;
          }
        }
        return true;
      };

      const shuffleArray = (values: number[]) => {
        for (let i = 0; i < values.length; i++) {
          const j = Math.floor(p.random(values.length));
          [values[i], values[j]] = [values[j], values[i]];
        }
      };

      const resetSortingState = () => {
        sorted1 = false;
        sorted2 = false;
        sorted3 = false;
        sorted4 = false;

        sortedIndex1 = 0;
        sortedIndex2 = 0;
        sortedIndex3 = 0;
        sortedIndex4 = 0;

        randomizeArrays();
      };
    };

    const p5Instance = new p5(sketch, sketchRef.current!);

    return () => {
      p5Instance.remove();
    };
  }, []);

  return <div ref={sketchRef}></div>;
};

export default SortingVisualiser;
