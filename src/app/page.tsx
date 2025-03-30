"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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

const leftSidebarImage = "/hhw_ny.jpg";
const rightSidebarImage = "/pk_ny.png";

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
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading sketches:", error);
        setIsLoading(false);
      });
  }, []);

  const handleNextSketch = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentSketch((prev) => (prev + 1) % totalSketches);
      setIsFading(false);
    }, 300);
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
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Left Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-800 p-4 gap-4 flex-shrink-0">
        <div className="w-full h-84 rounded-lg overflow-hidden">
          <img src={leftSidebarImage} alt="Left Sidebar" className="w-full h-full object-cover" />
        </div>
        <p className="text-center text-sm text-gray-300 mt-2">
          "Pushing boundaries, rewriting the rules—because the future is now."
        </p>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        {/* Header */}
        <header className="w-full bg-gray-800 p-2 text-center">
          <h1 className="text-2xl md:text-3xl font-bold">Brainrot Processing Showcase</h1>
          <p className="mt-2 text-base md:text-lg">
            Press <span className="font-bold">Enter</span> or click `Next Sketch` to cycle through the sketches.
          </p>
          <p className="mt-2 text-sm md:text-base">
            Current Sketch: <span className="font-mono">{sketchNames[currentSketch]}</span>
          </p>
          <div className="mt-4">
            <Link
              href="/about"
              className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm md:text-base hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              About Us
            </Link>
          </div>
        </header>

        {/* Sketch Display */}
        <main className="flex flex-col items-center justify-center flex-grow p-4">
          <div className={`transition-opacity duration-300 ${isFading ? "opacity-0" : "opacity-100"}`}>
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
              className="mt-4 px-6 py-3 bg-pink-500 text-white rounded-md text-base md:text-lg hover:bg-pink-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              Next Sketch
            </button>
          )}
        </main>

        {/* Footer */}
        <footer className="w-full bg-gray-800 p-4 text-center">
          <p className="text-xs md:text-sm">© 2025 Brainrot Processing Showcase. All rights reserved.</p>
        </footer>
      </div>

      {/* Right Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-800 p-4 gap-4 flex-shrink-0">
        <div className="w-full h-84 rounded-lg overflow-hidden">
          <img src={rightSidebarImage} alt="Legend, entrepenour, capital venturist" className="w-full h-full object-cover" />
        </div>
        <p className="text-center text-sm text-gray-300 mt-2">
          "Transforming bold ideas into game-changing innovations, because the future won’t wait, and neither will I."
        </p>
      </aside>
    </div>
  );
}