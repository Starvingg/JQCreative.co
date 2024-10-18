import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from "@radix-ui/react-icons";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import {
  CheckCircle,
  ChevronDown,
  Menu,
  X,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Zap,
  Shield,
  Target,
  TrendingUp,
  Building,
  Cpu,
} from "lucide-react";
const features = [
  {
    Icon: Zap,
    name: "Quality",
    description:
      "We prioritize excellence in every pixel, line of code, and user interaction.",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: Shield,
    name: "Reliability",
    description: "Count on us for consistent, dependable solutions.",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: Target,
    name: "Strategy",
    description: "Our approach is rooted in data-driven strategies.",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: TrendingUp,
    name: "ROI-Focused",
    description:
      "We're committed to delivering tangible returns on your investment.",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: Building,
    name: "Built To Last",
    description:
      "We create scalable, future-proof solutions that grow with your business.",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3",
  },
  {
    Icon: Cpu,
    name: "Performance",
    description:
      "Speed and efficiency are at the core of our development process.",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-3 lg:row-end-4",
  },
];
export async function BentoDemo() {
  return (
    <BentoGrid className="lg:grid-rows-3 container mx-auto py-20">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
}
