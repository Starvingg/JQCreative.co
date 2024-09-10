"use client"

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { CheckCircle } from 'lucide-react'

const designSteps = [
  {
    title: "Research",
    heading: "Understanding User Needs",
    content: "We begin by diving deep into user behavior, preferences, and pain points. This crucial phase sets the foundation for user-centered design decisions.",
    features: [
      "Conduct user interviews",
      "Analyze competitor products",
      "Create user personas",
      "Define problem statements"
    ],
    image: "/placeholder.svg?height=600&width=600"
  },
  {
    title: "Ideation",
    heading: "Generating Creative Solutions",
    content: "With insights in hand, we brainstorm a wide range of potential solutions. This phase is all about thinking outside the box and exploring innovative ideas.",
    features: [
      "Conduct brainstorming sessions",
      "Sketch initial concepts",
      "Create mind maps",
      "Develop user stories"
    ],
    image: "/placeholder.svg?height=600&width=600"
  },
  {
    title: "Prototyping",
    heading: "Bringing Ideas to Life",
    content: "We transform our best ideas into tangible prototypes. This allows us to visualize the solution and prepare for user testing.",
    features: [
      "Create low-fidelity wireframes",
      "Develop interactive mockups",
      "Build high-fidelity prototypes",
      "Conduct internal design reviews"
    ],
    image: "/placeholder.svg?height=600&width=600"
  },
  {
    title: "User Testing",
    heading: "Validating Design Decisions",
    content: "We put our prototypes in front of real users to gather valuable feedback. This phase helps us identify areas for improvement and validate our design decisions.",
    features: [
      "Recruit test participants",
      "Conduct usability testing sessions",
      "Analyze user feedback",
      "Iterate on designs based on insights"
    ],
    image: "/placeholder.svg?height=600&width=600"
  },
  {
    title: "Implementation",
    heading: "Bringing Designs to Life",
    content: "In the final phase, we work closely with developers to ensure our designs are implemented accurately and efficiently.",
    features: [
      "Create detailed design specifications",
      "Collaborate with development team",
      "Conduct design QA",
      "Prepare for product launch"
    ],
    image: "/placeholder.svg?height=600&width=600"
  }
]

export function DualViewDesignProcess() {
  const [activeSection, setActiveSection] = useState(0)
  const sectionRefs = useRef([])

  useEffect(() => {
    const handleScroll = () => {
      const pageTop = window.scrollY
      const pageBottom = pageTop + window.innerHeight
      const tags = sectionRefs.current

      for (let i = 0; i < tags.length; i++) {
        const tag = tags[i]
        if (tag) {
          const tagTop = tag.offsetTop
          const tagBottom = tagTop + tag.clientHeight

          if (tagTop < pageBottom && tagBottom > pageTop) {
            setActiveSection(i)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  return (
    (<div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Design Process</h1>
      {/* Desktop View */}
      <div className="hidden md:flex gap-8">
        <div className="w-1/2 sticky top-8 h-[calc(100vh-4rem)]">
          <Image
            src={designSteps[activeSection].image}
            alt={designSteps[activeSection].title}
            width={600}
            height={600}
            className="w-full h-full object-cover rounded-lg transition-opacity duration-300" />
        </div>
        <div className="w-1/2 space-y-24">
          {designSteps.map((step, index) => (
            <div
              key={index}
              ref={el => sectionRefs.current[index] = el}
              className={cn(
                "transition-all duration-300 p-6 rounded-lg",
                index === activeSection ? "bg-primary/10 shadow-lg" : "opacity-50"
              )}>
              <h2 className="text-3xl font-semibold mb-2">{step.title}</h2>
              <h3 className="text-xl font-medium mb-4 text-primary">{step.heading}</h3>
              <p className="mb-4">{step.content}</p>
              <ul className="space-y-2">
                {step.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* Mobile View */}
      <div className="md:hidden">
        <Accordion type="single" collapsible className="w-full">
          {designSteps.map((step, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-xl font-semibold">{step.title}</AccordionTrigger>
              <AccordionContent>
                <Image
                  src={step.image}
                  alt={step.title}
                  width={600}
                  height={600}
                  className="w-full aspect-square object-cover rounded-lg mb-4" />
                <h3 className="text-lg font-medium mb-2 text-primary">{step.heading}</h3>
                <p className="mb-4">{step.content}</p>
                <ul className="space-y-2">
                  {step.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>)
  );
}