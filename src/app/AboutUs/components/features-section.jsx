import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Code, Zap, Users, Sparkles } from "lucide-react"

const features = [
  { icon: Code, title: "Cutting-edge Tech", description: "We leverage the latest technologies to build robust, scalable solutions." },
  { icon: Zap, title: "Rapid Development", description: "Our agile approach ensures quick turnarounds without compromising quality." },
  { icon: Users, title: "Collaborative Process", description: "We work closely with you, ensuring your vision comes to life." },
  { icon: Sparkles, title: "Innovative Solutions", description: "We don't just follow trends, we set them with our forward-thinking approach." },
]

export function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(0)

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12 text-accent">Why We're Different</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`cursor-pointer transition-all duration-300 ${activeFeature === index ? 'bg-primary text-light' : 'bg-dark hover:bg-primary/10'}`}
              onClick={() => setActiveFeature(index)}
            >
              <CardContent className="p-6 flex items-center space-x-4">
                <feature.icon className="h-8 w-8" />
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className={`text-sm ${activeFeature === index ? 'text-light/80' : 'text-muted'}`}>
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="relative h-[400px] bg-dark rounded-lg overflow-hidden">
          <motion.div 
            className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-accent"
            key={activeFeature}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {features[activeFeature].title}
          </motion.div>
        </div>
      </div>
    </section>
  )
}