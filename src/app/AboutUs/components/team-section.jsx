import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

const teamMembers = {
  developers: [
    { name: "Alex Johnson", role: "Lead Developer", image: "/placeholder.svg?height=300&width=300" },
    { name: "Jamie Lee", role: "Full-stack Developer", image: "/placeholder.svg?height=300&width=300" },
    { name: "Chris Patel", role: "DevOps Engineer", image: "/placeholder.svg?height=300&width=300" },
  ],
  designers: [
    { name: "Sam Lee", role: "UX Designer", image: "/placeholder.svg?height=300&width=300" },
    { name: "Taylor Swift", role: "UI Designer", image: "/placeholder.svg?height=300&width=300" },
    { name: "Jordan Patel", role: "Motion Designer", image: "/placeholder.svg?height=300&width=300" },
  ],
  managers: [
    { name: "Emily Chen", role: "Project Manager", image: "/placeholder.svg?height=300&width=300" },
    { name: "Michael Brown", role: "Product Owner", image: "/placeholder.svg?height=300&width=300" },
    { name: "Sophia Rodriguez", role: "Scrum Master", image: "/placeholder.svg?height=300&width=300" },
  ],
}

export function TeamSection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12 text-accent">Our Stellar Team</h2>
      <Tabs defaultValue="developers" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8 bg-dark">
          <TabsTrigger value="developers" className="data-[state=active]:bg-primary data-[state=active]:text-light">Developers</TabsTrigger>
          <TabsTrigger value="designers" className="data-[state=active]:bg-primary data-[state=active]:text-light">Designers</TabsTrigger>
          <TabsTrigger value="managers" className="data-[state=active]:bg-primary data-[state=active]:text-light">Managers</TabsTrigger>
        </TabsList>
        {Object.entries(teamMembers).map(([category, members]) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {members.map((member, index) => (
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
        ))}
      </Tabs>
    </section>
  )
}