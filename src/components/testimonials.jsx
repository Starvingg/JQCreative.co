import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Andrew Cano",
    position: "Product Designer at Tokopedia",
    image: "/placeholder.svg?height=80&width=80",
    text: "I can now Delete the Other Apps. I've tried a lot of note taking and to-do list apps. This app is simply the best. Everything I need in one app and it works flawlessly. Everything I need is now in Nulls. Many thanks to the developer for a great app. The developer is very helpful with advice and there is a useful forum and introductory notes.",
    date: "Oct 29, 2022",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    position: "Marketing Manager at TechCorp",
    image: "/placeholder.svg?height=80&width=80",
    text: "Working with this creative agency has been a game-changer for our brand. Their innovative approach and attention to detail have significantly improved our online presence. Highly recommended!",
    date: "Nov 15, 2022",
  },
  {
    id: 3,
    name: "Michael Lee",
    position: "CEO of StartUp Inc.",
    image: "/placeholder.svg?height=80&width=80",
    text: "The team's expertise in web development and design is unparalleled. They delivered a website that not only looks great but also performs exceptionally well. Our conversion rates have skyrocketed!",
    date: "Dec 5, 2022",
  },
];

const TestimonialCard = ({ testimonial, index, currentIndex }) => (
  <motion.div
    initial={{ scale: 0.8, y: 100, opacity: 0 }}
    animate={{
      scale: index === currentIndex ? 1 : 0.8,
      y: (index - currentIndex) * 50,
      opacity: index === currentIndex ? 1 : 0.5,
      zIndex: testimonials.length - Math.abs(index - currentIndex),
    }}
    transition={{ duration: 0.5 }}
    className="bg-white p-6 rounded-lg shadow-lg absolute w-full"
  >
    <div className="flex items-center mb-4">
      <Image
        src={testimonial.image}
        alt={testimonial.name}
        width={50}
        height={50}
        className="rounded-full mr-4"
      />
      <div>
        <h4 className="font-semibold text-lg">{testimonial.name}</h4>
        <p className="text-sm text-gray-600">{testimonial.position}</p>
      </div>
    </div>
    <p className="text-gray-700 mb-2">{testimonial.text}</p>
    <p className="text-sm text-gray-500">{testimonial.date}</p>
  </motion.div>
);

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1,
      );
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Don't just take our word for it. Here's what our clients have to
              say about our services.
            </p>
          </div>
          <div className="lg:w-1/2 relative h-[400px]">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  index={index}
                  currentIndex={currentIndex}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
