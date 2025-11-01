import { Metadata } from "next";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { StatsCounter } from "@/components/sections/StatsCounter";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { 
  FaLaptopCode, 
  FaPalette, 
  FaRocket, 
  FaChartLine,
  FaUsers,
  FaTools,
  FaClock,
  FaHandshake
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "How We Work - Our Proven Process | Azeem Lab",
  description: "Discover our streamlined 4-step process that transforms your vision into powerful digital solutions. Transparent, collaborative, and results-driven.",
};

const processStats = [
  { value: 100, suffix: "%", label: "On-Time Delivery", icon: <FaClock /> },
  { value: 4, label: "Week Average Turnaround", icon: <FaRocket /> },
  { value: 98, suffix: "%", label: "Client Satisfaction", icon: <FaHandshake /> },
  { value: 15, suffix: "+", label: "Years Combined Experience", icon: <FaUsers /> },
];

const methodology = [
  {
    icon: <FaUsers className="w-8 h-8" />,
    title: "Agile & Collaborative",
    description: "We follow agile methodologies with 2-week sprints, daily standups, and continuous client feedback loops. You're part of the team, not just a client."
  },
  {
    icon: <FaTools className="w-8 h-8" />,
    title: "Modern Tech Stack",
    description: "We use cutting-edge technologies: Next.js, React, TypeScript, Tailwind CSS, Node.js, and cloud platforms like AWS and Azure for scalable, performant solutions."
  },
  {
    icon: <FaChartLine className="w-8 h-8" />,
    title: "Data-Driven Decisions",
    description: "Every design and development choice is backed by analytics, user research, and industry best practices. We optimize for measurable business outcomes."
  },
  {
    icon: <FaLaptopCode className="w-8 h-8" />,
    title: "Quality Assurance",
    description: "Rigorous testing protocols including unit tests, integration tests, cross-browser testing, and accessibility audits ensure flawless execution."
  },
];

const tools = [
  {
    category: "Design",
    tools: ["Figma", "Adobe XD", "Sketch", "Adobe Creative Suite", "Principle"]
  },
  {
    category: "Development",
    tools: ["Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS", "GraphQL"]
  },
  {
    category: "Project Management",
    tools: ["Jira", "Asana", "Notion", "Slack", "GitHub", "Linear"]
  },
  {
    category: "Testing & Deployment",
    tools: ["Jest", "Cypress", "Vercel", "AWS", "Azure", "Docker"]
  },
];

const processFAQs = [
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary based on scope, but most websites take 4-8 weeks, while complex web applications can take 12-16 weeks. We'll provide a detailed timeline during discovery."
  },
  {
    question: "What's your communication style?",
    answer: "We believe in transparent, frequent communication. You'll have access to our project management tool, weekly progress calls, and a dedicated Slack channel for real-time updates."
  },
  {
    question: "Do you offer post-launch support?",
    answer: "Yes! We offer 30 days of complimentary support after launch, plus ongoing maintenance packages including updates, security patches, and feature enhancements."
  },
  {
    question: "Can I be involved in the design process?",
    answer: "Absolutely! We encourage client collaboration. You'll review wireframes, provide feedback on designs, and approve all major milestones before we move to development."
  },
  {
    question: "What if I need changes after launch?",
    answer: "Minor tweaks are included in our post-launch support. For larger changes or new features, we'll provide a clear scope and quote. Our flexible retainer model makes ongoing improvements seamless."
  },
];

export default function ProcessPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-600 to-teal-800 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              How We Work
            </h1>
            <p className="text-xl md:text-2xl text-teal-100">
              A proven, transparent process that turns your vision into reality. 
              No surprises, just exceptional results.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Stats */}
      <StatsCounter 
        stats={processStats}
        title="Our Track Record"
        subtitle="Numbers that speak to our commitment to excellence"
      />

      {/* 4-Step Process */}
      <ProcessSection 
        steps={[
          {
            number: "1",
            title: "Discovery & Strategy",
            description: "We dive deep into your business goals, target audience, and competitive landscape. This phase includes stakeholder interviews, market research, and strategic planning to set the foundation for success."
          },
          {
            number: "2",
            title: "Design & Prototyping",
            description: "Our designers create wireframes and high-fidelity mockups that bring your vision to life. You'll see interactive prototypes before any code is written, ensuring alignment on every detail."
          },
          {
            number: "3",
            title: "Development & Testing",
            description: "Our developers build your solution using modern technologies and best practices. Rigorous QA testing ensures everything works flawlessly across all devices and browsers."
          },
          {
            number: "4",
            title: "Launch & Optimization",
            description: "We deploy your project to production with zero downtime. Post-launch, we monitor performance, gather user feedback, and make data-driven optimizations to maximize results."
          }
        ]}
      />

      {/* Methodology */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Methodology</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built on industry best practices, refined through years of experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {methodology.map((item, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-teal-600 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Technologies */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Tools & Technologies</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We leverage the best tools in the industry to deliver exceptional results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {tools.map((category, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-lg border-2 border-gray-100 hover:border-teal-500 transition-colors duration-300"
              >
                <h3 className="text-xl font-bold mb-4 text-teal-600">
                  {category.category}
                </h3>
                <ul className="space-y-2">
                  {category.tools.map((tool, toolIndex) => (
                    <li 
                      key={toolIndex}
                      className="text-gray-700 flex items-center"
                    >
                      <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Communication & Collaboration */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Communication & Collaboration</h2>
              <p className="text-xl text-gray-600">
                Stay in the loop every step of the way
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-teal-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUsers className="text-teal-600 w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold mb-2">Weekly Calls</h3>
                <p className="text-gray-600">
                  Regular sync meetings to review progress and align on next steps
                </p>
              </div>

              <div className="text-center">
                <div className="bg-teal-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaLaptopCode className="text-teal-600 w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold mb-2">Project Dashboard</h3>
                <p className="text-gray-600">
                  24/7 access to tasks, timelines, and deliverables in our PM tool
                </p>
              </div>

              <div className="text-center">
                <div className="bg-teal-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaHandshake className="text-teal-600 w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold mb-2">Dedicated Channel</h3>
                <p className="text-gray-600">
                  Direct Slack/Teams access to your project team for instant support
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection 
        faqs={processFAQs}
        title="Process FAQs"
        subtitle="Common questions about working with us"
        ctaText="Have more questions?"
        ctaLink="/contact"
      />

      {/* CTA */}
      <CTASection />
    </main>
  );
}
