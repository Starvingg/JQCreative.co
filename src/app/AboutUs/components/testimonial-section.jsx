import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function TestimonialSection() {
  return (
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
  )
}