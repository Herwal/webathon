"use client";

import { useState, useEffect } from "react";

const sketchNames = [
  "EatBalls",
  "CarCrash",
  "CrazyMouse",
  "FallingBalls",
  "Quiz",
  "Fireworks",
  "Flocking",
  "Piano",
  "PickTheDoor",
  "Roulette",
  "SolarSystem",
  "SortingVisualiser",
  "SpinningCubes",
  "StarWars",
];

const totalSketches = sketchNames.length;

// Function to dynamically preload all sketches
const importSketches = async (): Promise<React.FC[]> => {
  const modules = await Promise.all(
    sketchNames.map((name) => import(`./components/${name}`))
  );
  return modules.map((mod) => mod.default);
};

export default function Home() {
  const [currentSketch, setCurrentSketch] = useState(0);
  const [sketches, setSketches] = useState<React.FC[]>([]);
  const [isFading, setIsFading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Preload all sketches on mount
  useEffect(() => {
    importSketches()
      .then((loadedSketches) => {
        setSketches(loadedSketches);
        setIsLoading(false); // Set loading to false once sketches are loaded
      })
      .catch((error) => {
        console.error("Error loading sketches:", error);
        setIsLoading(false); // Ensure loading is set to false even if there's an error
      });
  }, []);

  const handleNextSketch = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentSketch((prev) => (prev + 1) % totalSketches);
      setIsFading(false);
    }, 300); // Smooth fade transition duration
  };

  // Add event listener for keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && !isLoading) {
        handleNextSketch();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLoading]);

  const CurrentSketchComponent = sketches[currentSketch];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="w-full bg-gray-800 p-2 text-center">
        <h1 className="text-2xl md:text-3xl font-bold">
          Welcome to the Brainrot Processing Showcase
        </h1>
        <p className="mt-2 text-base md:text-lg">
          Press <span className="font-bold">Enter</span> or click `Next Sketch` to cycle through the sketches.
        </p>
        <p className="mt-2 text-sm md:text-base">
          Current Sketch: <span className="font-mono">{sketchNames[currentSketch]}</span>
        </p>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-grow p-2 max-w-screen-md w-full">
        <div
          className={`transition-opacity duration-300 ${
            isFading ? "opacity-0" : "opacity-100"
          }`}
        >
          {CurrentSketchComponent ? (
            <CurrentSketchComponent />
          ) : (
            <p className="text-base md:text-lg">Loading sketches...</p>
          )}
        </div>

        {/* Next Button */}
        {!isLoading && (
          <button
            onClick={handleNextSketch}
            aria-label="Next Sketch"
            className="mt-2 px-6 py-3 bg-pink-500 text-white rounded-md text-base md:text-lg hover:bg-pink-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            Next Sketch
          </button>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-800 p-4 text-center">
        <p className="text-xs md:text-sm">
          © 2025 Brainrot Processing Showcase. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
