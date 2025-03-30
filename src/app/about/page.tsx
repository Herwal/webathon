"use client";

import Image from "next/image";
import Link from "next/link";

const leftSidebarImage = "/hhw_ny_2.png";
const rightSidebarImage = "/pk_japan.png";
const centerImage = "/center_image.png";

export default function About() {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Left Sidebar */}
      <aside className="hidden md:flex flex-col w-50 bg-gray-800 p-4 gap-4 flex-shrink-0">
        <div className="w-full h-84 rounded-lg overflow-hidden">
          <Image
            src={leftSidebarImage}
            alt="Left Sidebar"
            layout="responsive"
            width={300}
            height={200}
            className="rounded-lg object-cover"
          />
        </div>
        <p className="text-center text-sm text-gray-300 mt-2">
          &quot;When I think about the future, I don’t just see tech—I see a world where big data, neural networks, and cloud-native automation make everything smarter, faster, and cooler than I ever imagined.&quot;
        </p>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        <header className="w-full bg-gray-800 p-4 text-center">
          <h1 className="text-3xl font-bold">About Us</h1>
          <div className="mt-4">
            <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm md:text-base hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
                Homepage
            </Link>
          </div>
        </header>

        <main className="flex flex-col items-center justify-center flex-grow p-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-screen-lg">
            {/* Text Section */}
            <div className="text-lg text-gray-300 text-center md:text-left space-y-4 flex-1">
              <p>
                Welcome to <span className="font-bold">Brainrot</span>—where innovation meets intelligence, speed, and scalability. Our <span className="font-bold">smart</span> showcase brings together cutting-edge AI and dynamic game mechanics, creating interactive experiences that learn and adapt, offering a personalized journey at every turn. With powerful algorithms that drive seamless performance, we’ve designed a platform that doesn’t just perform—it evolves, ensuring each user interaction is optimized for the future of gaming.
              </p>

              <p>
                When we say <span className="font-bold">fast</span>, we mean it. Our Brainrot Games Showcase is engineered for lightning-fast processing, delivering smooth, responsive gameplay with zero lag, even during complex interactions. Powered by advanced technology, our system scales effortlessly, handling high volumes of data without breaking a sweat.
              </p>

              <p>
                And with <span className="font-bold">many</span>, we’re building a thriving ecosystem. The Brainrot Games Showcase is a playground for creativity, hosting a diverse range of interactive sketches, games, and experiences that constantly expand, grow, and evolve. It’s not just a showcase—it’s a hub of limitless potential, where the next big innovation is always just around the corner.
              </p>
            </div>

            {/* Image Section */}
            <div className="w-full max-w-md flex-shrink-0 rounded-lg overflow-hidden">
              <Image
                src={centerImage}
                alt="Center Image"
                layout="responsive"
                width={400}
                height={300}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </main>

        <footer className="w-full bg-gray-800 p-4 text-center">
          <p className="text-xs md:text-sm">
            © 2025 Brainrot Processing Showcase. All rights reserved.
          </p>
        </footer>
      </div>

      {/* Right Sidebar */}
      <aside className="hidden md:flex flex-col w-50 bg-gray-800 p-4 gap-4 flex-shrink-0">
        <div className="w-full h-84 rounded-lg overflow-hidden">
          <Image
            src={rightSidebarImage}
            alt="Right Sidebar"
            layout="responsive"
            width={300}
            height={200}
            className="rounded-lg object-cover"
          />
        </div>
        <p className="text-center text-sm text-gray-300 mt-2">
          &quot;I’m not here to follow trends; I’m here to create them—combining AI, IoT, and blockchain to disrupt the way we think about everything from work to play.&quot;
        </p>
      </aside>
    </div>
  );
}