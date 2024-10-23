'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Zap, Users, Sparkles, ArrowRight } from "lucide-react"

export default function ColorUpdatedAboutUs() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    { icon: Code, title: "Cutting-edge Tech", description: "We leverage the latest technologies to build robust, scalable solutions." },
    { icon: Zap, title: "Rapid Development", description: "Our agile approach ensures quick turnarounds without compromising quality." },
    { icon: Users, title: "Collaborative Process", description: "We work closely with you, ensuring your vision comes to life." },
    { icon: Sparkles, title: "Innovative Solutions", description: "We don't just follow trends, we set them with our forward-thinking approach." },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-darker via-primary/10 to-darker text-light">
      <section className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h1 
              className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-accent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Redefining Digital Landscapes
            </motion.h1>
            <motion.p 
              className="text-xl text-muted mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              We're not just another software agency. We're the architects of your digital future.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button size="lg" className="mr-4 bg-primary text-light hover:bg-secondary">
                Our Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-darker">
                Meet the Team
              </Button>
            </motion.div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full filter blur-3xl"></div>
            <motion.img 
              src="/placeholder.svg?height=400&width=400" 
              alt="Abstract representation of digital innovation" 
              className="relative z-10 w-full h-auto rounded-lg shadow-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </section>

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

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-accent">Our Stellar Team</h2>
        <Tabs defaultValue="developers" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-dark">
            <TabsTrigger value="developers" className="data-[state=active]:bg-primary data-[state=active]:text-light">Developers</TabsTrigger>
            <TabsTrigger value="designers" className="data-[state=active]:bg-primary data-[state=active]:text-light">Designers</TabsTrigger>
            <TabsTrigger value="managers" className="data-[state=active]:bg-primary data-[state=active]:text-light">Managers</TabsTrigger>
          </TabsList>
          <TabsContent value="developers">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "Alex Johnson", role: "Lead Developer", image: "/placeholder.svg?height=300&width=300" },
                { name: "Jamie Lee", role: "Full-stack Developer", image: "/placeholder.svg?height=300&width=300" },
                { name: "Chris Patel", role: "DevOps Engineer", image: "/placeholder.svg?height=300&width=300" },
              ].map((member, index) => (
                <Card key={index} className="overflow-hidden bg-dark">
                  <img src={member.image} alt={member.name} className="w-full h-48 object-cover" />
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-light">{member.name}</h3>
                    <p className="text-sm text-muted">{member.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="designers">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "Sam Lee", role: "UX Designer", image: "/placeholder.svg?height=300&width=300" },
                { name: "Taylor Swift", role: "UI Designer", image: "/placeholder.svg?height=300&width=300" },
                { name: "Jordan Patel", role: "Motion Designer", image: "/placeholder.svg?height=300&width=300" },
              ].map((member, index) => (
                <Card key={index} className="overflow-hidden bg-dark">
                  <img src={member.image} alt={member.name} className="w-full h-48 object-cover" />
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-light">{member.name}</h3>
                    <p className="text-sm text-muted">{member.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="managers">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "Emily Chen", role: "Project Manager", image: "/placeholder.svg?height=300&width=300" },
                { name: "Michael Brown", role: "Product Owner", image: "/placeholder.svg?height=300&width=300" },
                { name: "Sophia Rodriguez", role: "Scrum Master", image: "/placeholder.svg?height=300&width=300" },
              ].map((member, index) => (
                <Card key={index} className="overflow-hidden bg-dark">
                  <img src={member.image} alt={member.name} className="w-full h-48 object-cover" />
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-light">{member.name}</h3>
                    <p className="text-sm text-muted">{member.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 bg-primary text-light p-8">
            <CardContent className="space-y-4">
              <Badge className="mb-4 bg-light text-primary">Client Success Story</Badge>
              <blockquote className="text-2xl font-medium">
                "Their innovative approach and technical expertise transformed our business. We've seen a 200% increase in user engagement since launching our new platform."
              </blockquote>
              <p className="font-semibold">- Sarah Thompson, CEO of InnovateTech</p>
            </CardContent>
          </Card>
          <Card className="bg-dark p-8 flex flex-col justify-center">
            <CardContent className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-accent">Ready to Innovate?</h3>
              <p className="text-muted">Let's turn your ideas into reality.</p>
              <Button size="lg" className="w-full bg-primary text-light hover:bg-secondary">
                Start Your Project
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}