"use client";

import { StatsCounter } from "@/components/sections/StatsCounter";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { 
  Search, 
  Paintbrush, 
  Code, 
  Rocket,
  Users,
  Layers,
  TrendingUp,
  ShieldCheck,
  Timer,
  HeartHandshake,
  GitMerge,
  Figma,
  Slack,
  BrainCircuit,
  Database,
  Server,
  Wind,
//   Vercel
} from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

const processStats = [
  { value: 98, suffix: "%", label: "Client Satisfaction", icon: <HeartHandshake /> },
  { value: 4, label: "Week Average Turnaround", icon: <Timer /> },
  { value: 100, suffix: "%", label: "On-Time Delivery", icon: <Rocket /> },
  { value: 15, suffix: "+", label: "Years Combined Experience", icon: <Users /> },
];

const processSteps = [
  {
    icon: <Search className="w-10 h-10" />,
    title: "1. Discovery & Strategy",
    description: "We start by diving deep into your business. Through collaborative workshops, we define project goals, identify your target audience, and analyze the competitive landscape. This ensures we're building the right solution for the right people."
  },
  {
    icon: <Paintbrush className="w-10 h-10" />,
    title: "2. Design & Prototyping",
    description: "Next, we translate strategy into a tangible user experience. We create wireframes, user flows, and high-fidelity mockups. You'll get to see and interact with a prototype, allowing for feedback before development begins."
  },
  {
    icon: <Code className="w-10 h-10" />,
    title: "3. Development & Testing",
    description: "Our expert developers bring the designs to life using clean, efficient code and modern technologies. We conduct rigorous testing throughout this phase—from unit tests to full end-to-end testing—to ensure a flawless final product."
  },
  {
    icon: <Rocket className="w-10 h-10" />,
    title: "4. Launch & Optimization",
    description: "Deployment is just the beginning. We manage the entire launch process for a smooth transition. Post-launch, we monitor performance, gather user data, and suggest data-driven optimizations to ensure continued growth and success."
  }
];

const methodology = [
  {
    icon: <Users className="w-8 h-8" />,
    title: "Agile & Collaborative",
    description: "We follow agile methodologies with 2-week sprints, daily standups, and continuous client feedback loops. You're part of the team, not just a client."
  },
  {
    icon: <Layers className="w-8 h-8" />,
    title: "Modern Tech Stack",
    description: "We use cutting-edge technologies: Next.js, React, TypeScript, and cloud platforms like Vercel and AWS for scalable, performant solutions."
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Data-Driven Decisions",
    description: "Every design and development choice is backed by analytics, user research, and industry best practices. We optimize for measurable business outcomes."
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Quality Assurance",
    description: "Rigorous testing protocols including unit tests, integration tests, cross-browser testing, and accessibility audits ensure flawless execution."
  },
];

const tools = [
    // { name: "Next.js", icon: <Vercel /> },
    { name: "React", icon: <Code /> },
    { name: "Tailwind", icon: <Wind /> },
    { name: "Figma", icon: <Figma /> },
    { name: "Git", icon: <GitMerge /> },
    { name: "Node.js", icon: <Server /> },
    { name: "Python", icon: <Code /> },
    { name: "Django", icon: <Layers /> },
    { name: "FastAPI", icon: <Rocket /> },
    { name: "PostgreSQL", icon: <Database /> },
    { name: "OpenAI", icon: <BrainCircuit /> },
    { name: "Gemini", icon: <BrainCircuit /> },
];

const processFAQs = [
    { question: "How long does a typical project take?", answer: "Project timelines vary based on scope. A standard marketing website usually takes 4-8 weeks, while a complex web application might take 3-6 months. We provide a detailed, phase-by-phase timeline after the initial discovery session." },
    { question: "How much does a project cost?", answer: "Cost is directly tied to the project's complexity, features, and timeline. We provide a detailed, itemized proposal after the discovery phase. Our goal is to offer transparent pricing with no hidden fees. Visit our pricing page for general estimates." },
    { question: "What is your communication process?", answer: "We believe in transparent and frequent communication. You'll have a dedicated project manager, access to a shared Slack channel for real-time updates, and scheduled weekly or bi-weekly sync calls to review progress and gather feedback." },
    { question: "Can I be involved in the design process?", answer: "Absolutely! Your input is crucial. We conduct collaborative workshops and you'll review and approve wireframes, mockups, and prototypes at every stage. We use tools like Figma that allow you to leave comments directly on the designs." },
    { question: "What if I need to make changes during the project?", answer: "We use an agile approach, which is designed to accommodate changes. Minor adjustments can be handled within the current sprint. For significant scope changes, we'll discuss the impact on timeline and budget and create a change order." },
    { question: "Do you offer post-launch support and maintenance?", answer: "Yes. We provide 30 days of complimentary support to fix any bugs after launch. We also offer ongoing monthly retainer plans for maintenance, security updates, performance monitoring, and feature enhancements." },
    { question: "Who will be on my project team?", answer: "Your core team will typically include a Project Manager, a UI/UX Designer, and one or more Developers. Depending on the project, we may also include a QA Specialist, a DevOps Engineer, or a Content Strategist." },
    { question: "What technologies do you specialize in?", answer: "Our primary stack includes Next.js, React, TypeScript, and Tailwind CSS for the frontend. For the backend, we often use Node.js, and we deploy on modern cloud platforms like Vercel and AWS for optimal performance and scalability." },
    { question: "Do I get ownership of the code?", answer: "Yes, upon final payment, you receive full ownership of the source code and all intellectual property. We can transfer the codebase to your GitHub repository or provide it as a downloadable archive." },
    { question: "How do you handle project management?", answer: "We use tools like Jira, Asana, or Notion to manage our projects. You will have full access to our project board to track tasks, timelines, and progress in real-time." },
    { question: "What makes you different from other agencies?", answer: "We focus on being a true partner, not just a vendor. Our strengths lie in our senior-level talent, our commitment to transparent communication, and our focus on delivering measurable business results, not just pretty designs." },
    { question: "Do you work with startups?", answer: "Yes, we love working with startups! We can adapt our process to be more lean and agile, focusing on getting a Minimum Viable Product (MVP) to market quickly so you can start gathering user feedback and iterating." },
    { question: "How do you ensure the quality of your work?", answer: "Quality is built into our process. It includes peer code reviews, automated testing, manual QA across different devices and browsers, and adherence to strict coding standards and accessibility guidelines (WCAG)." },
    { question: "Can you integrate with our existing systems?", answer: "Yes. We have extensive experience with API integrations, connecting with third-party services like CRMs (e.g., Salesforce, HubSpot), payment gateways (e.g., Stripe, PayPal), and other marketing or analytics tools." },
    { question: "What's the first step to start a project?", answer: "The first step is to schedule a free, no-obligation discovery call with us. You can do this through our contact page. We'll discuss your ideas, goals, and see if we're a good fit to work together." },
    { question: "Do you provide content or do we need to supply it?", answer: "We can work either way. We recommend you provide the final content, but we also have content strategists and copywriters who can help you craft compelling messaging as an add-on service." },
    { question: "Will my website be SEO-friendly?", answer: "Absolutely. We build all our websites with SEO best practices in mind from the start. This includes clean code, fast load times, mobile-first design, and proper use of HTML tags. We also offer advanced SEO services for ongoing optimization." },
    { question: "What kind of analytics will I have?", answer: "We typically integrate Google Analytics 4 (GA4) and can set up custom event tracking and dashboards to monitor key performance indicators (KPIs) that are important to your business." },
    { question: "Can you help with hosting?", answer: "While we don't provide hosting services directly, we will deploy your site to a modern, reliable platform like Vercel or AWS and ensure it's configured for optimal performance and security. We'll then transfer ownership to you." },
    { question: "What happens if I'm not happy with the design?", answer: "Our process is designed to prevent this. With multiple feedback loops during the wireframing and mockup stages, we ensure the design is aligned with your vision before we ever write a line of code. We offer a set number of revision rounds to get it just right." }
];

export default function ProcessClientPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative text-center py-15 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-6">
              Our Blueprint for Success
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              A proven, transparent process that turns your vision into reality. 
              No surprises, just exceptional results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4-Step Process */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 border border-border/70 rounded-xl bg-card hover:shadow-lg transition-shadow"
              >
                <div className="inline-block bg-primary/10 text-primary p-4 rounded-full mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold font-heading mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsCounter 
        stats={processStats}
        title="Our Track Record"
        subtitle="Numbers that speak to our commitment to excellence"
      />

      {/* Methodology */}
      <section className="py-20 bg-neutral-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading mb-4">Our Core Methodology</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built on industry best practices, refined through years of experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {methodology.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                className="bg-card p-8 rounded-lg shadow-sm"
              >
                <div className="text-primary mb-4">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold font-heading mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Technologies */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading mb-4">Tools of Our Trade</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We leverage the best tools in the industry to build, test, and deploy.
            </p>
          </div>

          <div className="flex justify-center items-center flex-wrap gap-8 md:gap-12 max-w-5xl mx-auto">
            {tools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center gap-3 text-muted-foreground"
              >
                <span className="text-5xl">{tool.icon}</span>
                <span className="font-semibold text-sm">{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection 
        faqs={processFAQs}
        title="Your Questions, Answered"
        subtitle="Common questions about our process and how we work together."
      />

      {/* CTA */}
      <CTASection />
    </main>
  );
}
