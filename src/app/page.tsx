"use client";

import { useState, useEffect, Suspense } from "react";

const sketchNames = [
  "CarCrash",
  "CrazyMouse",
  "EatBalls",
  "FallingBalls",
  "Fireworks",
  "Flocking",
  "Piano",
  "PickTheDoor",
  "Quiz",
  "Roulette",
  "SolarSystem",
  "SortingVisualiser",
  "SpinningCubes",
  "StarWars",
];

const totalSketches = sketchNames.length;

// Function to dynamically preload all sketches
const importSketches = async () => {
  const modules = await Promise.all(
    sketchNames.map((name) => import(`./components/${name}`))
  );
  return modules.map((mod) => mod.default);
};

export default function Home() {
  const [currentSketch, setCurrentSketch] = useState(0);
  const [sketches, setSketches] = useState<(React.FC | null)[]>([]);
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false); // For smooth transitions

  // Preload all sketches on mount
  useEffect(() => {
    importSketches().then(setSketches).finally(() => setLoading(false));
  }, []);

  const handleNextSketch = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentSketch((prev) => (prev + 1) % totalSketches);
      setFade(false);
    }, 200); // Delay for smooth fade transition
  };

  // Add event listener for keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleNextSketch();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const CurrentSketchComponent = sketches[currentSketch];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="w-full bg-gray-800 p-6 text-center">
        <h1 className="text-3xl font-bold">Welcome to the Brainrot Processing Showcase</h1>
        <p className="mt-2 text-lg">
          Press <span className="font-bold">Enter</span> or "Next Sketch" to cycle through the sketches.
        </p>
        <p className="mt-2 text-sm">
          Current Sketch: {sketchNames[currentSketch]}
        </p>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-grow p-4">
        <Suspense fallback={<p>Loading...</p>}>
          {loading ? (
            <p>Loading sketches...</p>
          ) : (
            <div className={`transition-opacity duration-200 ${fade ? "opacity-0" : "opacity-100"}`}>
              {CurrentSketchComponent && <CurrentSketchComponent />}
            </div>
          )}
        </Suspense>

        {/* Next Button */}
        <button
          onClick={handleNextSketch}
          className="mt-6 px-6 py-3 bg-pink-500 text-white rounded-md text-lg hover:bg-pink-600 transition duration-300"
        >
          Next Sketch
        </button>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-800 p-4 text-center">
        <p className="text-sm">© 2025 Brainrot Processing Showcase. All rights reserved.</p>
      </footer>
    </div>
  );
}
