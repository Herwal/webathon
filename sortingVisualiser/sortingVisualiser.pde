int[] values1, values2, values3, values4; // Arrays for each sorting algorithm
boolean sorted1 = false, sorted2 = false, sorted3 = false, sorted4 = false;
int numBars = 50;
float barWidth;
int sortedIndex1 = 0, sortedIndex2 = 0, sortedIndex3 = 0, sortedIndex4 = 0; // Track how much of the array is sorted for each algorithm

void setup() {
  size(1000, 1000);  // Bigger canvas for the matrix
  noStroke();

  // Initialize the 4 arrays for each sorting algorithm
  values1 = new int[numBars];
  values2 = new int[numBars];
  values3 = new int[numBars];
  values4 = new int[numBars];
  
  // Calculate the bar width to fit bars in the grid layout
  barWidth = ((width / 2) - 110) / float(numBars); // Each algorithm will take up half of the available width
  
  randomizeArrays(); // Randomize all four arrays
}

void draw() {
  background(0);

  // Display each sorting algorithm in a grid
  displaySortingAlgorithm(values1, 0, 0, sortedIndex1, "Bubble Sort");
  displaySortingAlgorithm(values2, 1, 0, sortedIndex2, "Insertion Sort");
  displaySortingAlgorithm(values3, 0, 1, sortedIndex3, "Selection Sort");
  displaySortingAlgorithm(values4, 1, 1, sortedIndex4, "Quick Sort");

  if (!sorted1) {
    bubbleSort(values1);
  }
  if (!sorted2) {
    insertionSort(values2);
  }
  if (!sorted3) {
    selectionSort(values3);
  }
  if (!sorted4) {
    bogoSort(values4);
  }
  
  if (sorted1 && sorted2 && sorted3 && sorted4) {
      delay(10);  // Wait for a few seconds before resetting
      resetSortingState();  // Reset the sorting state to start over
    }
    
}


void randomizeArrays() {
  // Randomize the starting values for each sorting algorithm
  int[] randomValues = new int[numBars];
  for (int i = 0; i < numBars; i++) {
    randomValues[i] = int(random(50, height / 2 - 50));
  }
  
  // Copy the same randomized array to all sorting algorithms
  System.arraycopy(randomValues, 0, values1, 0, numBars);
  System.arraycopy(randomValues, 0, values2, 0, numBars);
  System.arraycopy(randomValues, 0, values3, 0, numBars);
  System.arraycopy(randomValues, 0, values4, 0, numBars);
}


void displaySortingAlgorithm(int[] values, int gridX, int gridY, int sortedIndex, String label) {
  int xOffset = gridX * (width / 2);
  int yOffset = gridY * (height / 2);
  int maxHeight = height / 2;  // Each square is half the height of the canvas

  // Draw a label
  fill(255);
  textSize(16);
  textAlign(CENTER, TOP);
  text(label, xOffset + (width / 4), yOffset + 10);

  // Display bars for the sorting algorithm
  for (int i = 0; i < values.length; i++) {
    if (i >= values.length - sortedIndex) {
      fill(0, 255, 0);  // Sorted elements in green
    } else {
      fill(255, 0, 0);  // Unsorted elements in red
    }
    rect(xOffset + i * (barWidth + 2), yOffset + maxHeight - values[i], barWidth, values[i]);
  }
}


void bubbleSort(int[] values) {
  // Bubble Sort - Process one pair per frame
  if (sortedIndex1 < values.length - 1) {
    for (int i = 0; i < values.length - 1 - sortedIndex1; i++) {
      if (values[i] > values[i + 1]) {
        int temp = values[i];
        values[i] = values[i + 1];
        values[i + 1] = temp;
      }
    }
    sortedIndex1++;  // Increment sortedIndex1 after each pass through the array
  } else {
    sorted1 = true;  // Mark as sorted when done
    sortedIndex1 = values.length;
  }
}


void insertionSort(int[] values) {
  // Insertion Sort - Process one insertion per frame
  if (sortedIndex2 < values.length) {
    int key = values[sortedIndex2];
    int j = sortedIndex2 - 1;
    
    while (j >= 0 && values[j] > key) {
      values[j + 1] = values[j];
      j = j - 1;
    }
    values[j + 1] = key;
    sortedIndex2++;  // Increment sortedIndex2 after each insertion
  } else {
    sorted2 = true;  // Mark as sorted when done
    sortedIndex2 = values.length;
  }
}


void selectionSort(int[] values) {
  // Selection Sort - Process one swap per frame
  if (sortedIndex3 < values.length - 1) {
    int minIdx = sortedIndex3;
    for (int j = sortedIndex3 + 1; j < values.length; j++) {
      if (values[j] < values[minIdx]) {
        minIdx = j;
      }
    }
    int temp = values[minIdx];
    values[minIdx] = values[sortedIndex3];
    values[sortedIndex3] = temp;
    sortedIndex3++;  // Increment sortedIndex3 after each swap
  } else {
    sorted3 = true;  // Mark as sorted when done
    sortedIndex3 = values.length;
  }
}


boolean bogoSortProcessing = false;
void bogoSort(int[] values) {
  // Bogo Sort - Process one shuffle per frame
  if (!bogoSortProcessing) {
    bogoSortProcessing = true;
    // Keep checking and shuffling the array until it is sorted
  }

  if (!isSorted(values)) {
    shuffleArray(values);
  } else {
    sorted4 = true;
    sortedIndex4 = values.length;
    bogoSortProcessing = false;  // End processing when sorted
  }
}


boolean isSorted(int[] values) {
  // Check if the array is sorted
  for (int i = 1; i < values.length; i++) {
    if (values[i] < values[i - 1]) {
      return false;
    }
  }
  return true;
}


void shuffleArray(int[] values) {
  // Shuffle the array randomly
  for (int i = 0; i < values.length; i++) {
    int j = int(random(values.length));
    int temp = values[i];
    values[i] = values[j];
    values[j] = temp;
  }
}


// Function to reset sorting state after a delay
void resetSortingState() {
  // Reset flags and indices
  sorted1 = false;
  sorted2 = false;
  sorted3 = false;
  sorted4 = false;
  
  sortedIndex1 = 0;
  sortedIndex2 = 0;
  sortedIndex3 = 0;
  sortedIndex4 = 0;

  randomizeArrays();  // Randomize the arrays again for the next round
}
