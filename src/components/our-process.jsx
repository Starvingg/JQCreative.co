"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Lightbulb,
  Cpu,
  TestTube,
  Code,
} from "lucide-react";
import Image from "next/image";

const contentItems = {
  Research: {
    title: "Research",
    heading: "Understanding User Needs",
    content:
      "We begin by diving deep into user behavior, preferences, and pain points. This crucial phase sets the foundation for user-centered design decisions.",
    features: [
      "Conduct user interviews",
      "Analyze competitor products",
      "Create user personas",
      "Define problem statements",
    ],
    image: "/placeholder.svg?height=400&width=600",
    icon: <Search className="h-6 w-6" />,
  },
  Ideation: {
    title: "Ideation",
    heading: "Generating Creative Solutions",
    content:
      "With insights in hand, we brainstorm a wide range of potential solutions. This phase is all about thinking outside the box and exploring innovative ideas.",
    features: [
      "Conduct brainstorming sessions",
      "Sketch initial concepts",
      "Create mind maps",
      "Develop user stories",
    ],
    image: "/placeholder.svg?height=400&width=600",
    icon: <Lightbulb className="h-6 w-6" />,
  },
  Prototyping: {
    title: "Prototyping",
    heading: "Bringing Ideas to Life",
    content:
      "We transform our best ideas into tangible prototypes. This allows us to visualize the solution and prepare for user testing.",
    features: [
      "Create low-fidelity wireframes",
      "Develop interactive mockups",
      "Build high-fidelity prototypes",
      "Conduct internal design reviews",
    ],
    image: "/placeholder.svg?height=400&width=600",
    icon: <Cpu className="h-6 w-6" />,
  },
  "User Testing": {
    title: "User Testing",
    heading: "Validating Design Decisions",
    content:
      "We put our prototypes in front of real users to gather valuable feedback. This phase helps us identify areas for improvement and validate our design decisions.",
    features: [
      "Recruit test participants",
      "Conduct usability testing sessions",
      "Analyze user feedback",
      "Iterate on designs based on insights",
    ],
    image: "/placeholder.svg?height=400&width=600",
    icon: <TestTube className="h-6 w-6" />,
  },
  Implementation: {
    title: "Implementation",
    heading: "Bringing Designs to Life",
    content:
      "In the final phase, we work closely with developers to ensure our designs are implemented accurately and efficiently.",
    features: [
      "Create detailed design specifications",
      "Collaborate with development team",
      "Conduct design QA",
      "Prepare for product launch",
    ],
    image: "/placeholder.svg?height=400&width=600",
    icon: <Code className="h-6 w-6" />,
  },
};

export default function OurProcess() {
  const [activeTab, setActiveTab] = useState("Research");

  return (
    <section className="bg-light py-16 overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <h2 className="text-4xl font-bold mb-8 text-gray-900">
          Our Design Process
        </h2>
        <p className="text-xl mb-12 text-gray-700">
          A comprehensive approach to creating user-centered designs
        </p>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            {Object.keys(contentItems).map((item) => (
              <button
                key={item}
                className={`block w-full text-left py-2 px-4 rounded-lg mb-2 transition-colors ${
                  activeTab === item
                    ? "bg-muted text-daker"
                    : "text-dark hover:text-primary hover:ring-1 ring-muted "
                }`}
                onClick={() => setActiveTab(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="md:w-3/4 relative">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white to-transparent pointer-events-none" />
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-muted shadow-md rounded-lg p-8 relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-muted mr-4">
                    {contentItems[activeTab].icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-darker">
                    {contentItems[activeTab].heading}
                  </h3>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2">
                  <p className="text-gray-700 mb-6">
                    {contentItems[activeTab].content}
                  </p>
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-2 text-gray-900">
                      Key Features:
                    </h4>
                    <ul className="list-disc list-inside text-gray-700">
                      {contentItems[activeTab].features.map(
                        (feature, index) => (
                          <li key={index}>{feature}</li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <Image
                    src={contentItems[activeTab].image}
                    alt={contentItems[activeTab].title}
                    width={600}
                    height={400}
                    className="rounded-lg w-full h-auto"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
