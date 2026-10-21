"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Layers,
  TrendingUp,
  ShieldCheck,
  DollarSign,
  Code,
  ClipboardCheck,
  MessageSquare,
  Rocket,
  Star,
  Lock,
  CheckCircle2,
  ArrowUpRight,
  Globe,
  Slack,
  FileText,
  BarChart3,
  Headphones,
  HandshakeIcon,
} from "lucide-react";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/animations";
import { StatsCounter } from "@/components/sections/StatsCounter";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { Input, TextArea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const partnerStats = [
  { value: 40, suffix: "%", label: "Max Referral Commission", icon: <DollarSign /> },
  { value: 100, suffix: "%", label: "White-Label and NDA Protected", icon: <Lock /> },
  { value: 24, suffix: "h", label: "Discovery Turnaround", icon: <ClipboardCheck /> },
  { value: 4, suffix: "+", label: "Years Delivering Results", icon: <Star /> },
];

const tracks = [
  {
    id: "agency",
    icon: <Users className="w-8 h-8" />,
    number: "01",
    title: "Agency and White-Label Partner",
    target: "Design studios, marketing agencies, and freelance teams lacking in-house development capacity.",
    how: "You handle the client relationship and project direction. We deliver complete web and AI development under your brand with full NDA protection.",
    benefits: [
      "Fixed sprint pricing and transparent scopes",
      "Dedicated project manager on every engagement",
      "Zero client poaching guarantee in writing",
      "White-label ready code repository handover",
      "Staging previews for your client approval",
    ],
  },
  {
    id: "referral",
    icon: <DollarSign className="w-8 h-8" />,
    number: "02",
    title: "Referral and Affiliate Partner",
    target: "Business consultants, advisors, startup founders, and connectors who encounter businesses needing web or AI development.",
    how: "Introduce a qualified lead to AzeemLab. When the project contract is signed, you earn up to 40% of the project value as a milestone commission.",
    benefits: [
      "Up to 40% commission on signed contracts",
      "No sales skills required, we handle proposals",
      "Real-time milestone notifications",
      "Transparent accounting per contract",
      "Payouts via bank transfer or wire",
    ],
  },
  {
    id: "tech",
    icon: <Globe className="w-8 h-8" />,
    number: "03",
    title: "Technology and Integration Partner",
    target: "SaaS platforms, AI model providers, cloud hosting companies, and API vendors.",
    how: "We integrate your product into our client builds, write co-branded case studies, and mutually refer enterprise opportunities to your sales team.",
    benefits: [
      "Listed as a verified implementation partner",
      "Co-branded case study collaboration",
      "Technical webinar and content collaboration",
      "Early access to AzeemLab client pipeline",
      "Developer documentation feedback loops",
    ],
  },
];

const methodologySteps = [
  {
    icon: <MessageSquare className="w-7 h-7" />,
    number: "01",
    title: "Application and Alignment",
    duration: "Day 1",
    description:
      "Fill out our partner form or schedule a direct introductory call. We run a 20-minute alignment session to confirm shared values, tech expectations, and collaboration standards before moving forward.",
  },
  {
    icon: <FileText className="w-7 h-7" />,
    number: "02",
    title: "Agreement and SLA",
    duration: "Day 2 to 3",
    description:
      "We sign a bilateral NDA and formal partner agreement. Commission schedule, white-label communication protocols, and project handover workflows are agreed in writing.",
  },
  {
    icon: <Slack className="w-7 h-7" />,
    number: "03",
    title: "Enablement and Onboarding",
    duration: "Day 4",
    description:
      "You receive an invitation to a dedicated private Slack channel plus our Partner Kit: capability decks, case studies, sample scopes, and pitch templates ready to use with your clients.",
  },
  {
    icon: <Rocket className="w-7 h-7" />,
    number: "04",
    title: "Joint Execution and Payouts",
    duration: "Ongoing",
    description:
      "Projects kick off seamlessly or referral leads are introduced. You receive milestone progress updates, transparent accounting, and prompt commission disbursement on every signed contract.",
  },
];

const principles = [
  {
    icon: <ShieldCheck className="w-7 h-7" />,
    title: "Zero Channel Conflict",
    description:
      "Your clients stay your clients, unconditionally. We honor non-compete clauses and never approach your clients directly.",
  },
  {
    icon: <Code className="w-7 h-7" />,
    title: "Sprint-Driven Execution",
    description:
      "Predictable 2-week agile sprint cadences with automated CI/CD, staging previews, and weekly progress reports.",
  },
  {
    icon: <Layers className="w-7 h-7" />,
    title: "Modern Tech Stack",
    description:
      "Next.js, TypeScript, Tailwind CSS, Python, FastAPI, and production-tested AI integrations. We never use outdated frameworks.",
  },
  {
    icon: <TrendingUp className="w-7 h-7" />,
    title: "Transparent Accounting",
    description:
      "Itemized milestone breakdowns, no hidden fees, and on-time commission disbursement every time.",
  },
];

const partnerTestimonials = [
  {
    quote:
      "Working with AzeemLab on a white-label basis has been seamless. They delivered exactly what we promised our client, on time and with zero visibility into the arrangement. Our client was delighted.",
    author: "Sophia R.",
    position: "Founder",
    company: "Creative Digital Studio, UK",
    rating: 5,
  },
  {
    quote:
      "I referred two clients to AzeemLab and earned significant commission on both contracts. The whole process was transparent and my clients love the results.",
    author: "Marcus T.",
    position: "Independent Business Consultant",
    company: "Berlin, Germany",
    rating: 5,
  },
  {
    quote:
      "As a SaaS provider, co-building solutions with AzeemLab has opened new enterprise accounts we could not have reached alone. A true partnership.",
    author: "Ayesha M.",
    position: "Head of Partnerships",
    company: "TechScale AI, UAE",
    rating: 5,
  },
];

const portalFeatures = [
  { icon: <Slack className="w-5 h-5" />, label: "Dedicated Slack Channel" },
  { icon: <FileText className="w-5 h-5" />, label: "Partner Capability Deck" },
  { icon: <BarChart3 className="w-5 h-5" />, label: "Commission Dashboard" },
  { icon: <Headphones className="w-5 h-5" />, label: "Priority Support SLA" },
];

const partnerFaqs = [
  {
    question: "Does AzeemLab sign NDAs and non-compete agreements?",
    answer:
      "Yes. Every agency and white-label partnership begins with a signed mutual NDA and a non-compete clause protecting your client relationships. We treat confidentiality as a foundational requirement, not an afterthought.",
  },
  {
    question: "How does white-label work when client communication is needed?",
    answer:
      "You manage all direct client communication. We operate strictly behind the scenes under your brand. Staging previews, deliverables, and code repositories are handed to you for your own client review process.",
  },
  {
    question: "What are the payout terms for referral partners?",
    answer:
      "Referral commissions of up to 40% are disbursed on signed contract milestones. You receive a notification when each milestone is invoiced and payment is processed within 5 business days of collection.",
  },
  {
    question: "Can AzeemLab join client pitch calls as part of our internal team?",
    answer:
      "Yes for agency partners. We can join pitch calls under your brand if required, presenting as your internal development team with full NDA protection in place.",
  },
  {
    question: "What is the typical project scope AzeemLab undertakes?",
    answer:
      "We handle web design and development, AI chatbots, business automation, and e-commerce builds ranging from focused 4-week engagements to multi-month enterprise projects. Visit our portfolio to see examples.",
  },
  {
    question: "Is there a cost to become a partner?",
    answer:
      "No. Joining the AzeemLab Partner Ecosystem is free. We invest in our partners through onboarding resources, Partner Kits, and dedicated communication channels.",
  },
];

export default function PartnersClientPage() {
  const [formData, setFormData] = useState({
    name: "",
    agency: "",
    email: "",
    phone: "",
    website: "",
    partnerType: "",
    scope: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");
    try {
      const response = await fetch("/api/partners/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        setErrorMessage(result?.error || "Your application could not be delivered. Please email bilal.azeemlab@gmail.com.");
        setSubmitStatus("error");
        return;
      }
      setSubmitStatus("success");
      setFormData({ name: "", agency: "", email: "", phone: "", website: "", partnerType: "", scope: "", message: "" });
    } catch {
      setErrorMessage("Your application could not be delivered. Please email bilal.azeemlab@gmail.com.");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">

      {/* Hero */}
      <section className="relative text-center py-16 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-block bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
              AzeemLab Partner Ecosystem
            </span>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-6">
              Grow Further, Faster.
              <br />
              <span className="text-secondary">Together.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Expand your delivery capacity, monetize your client network, and co-build modern AI and web solutions with AzeemLab as your trusted engineering backbone.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#apply"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-base hover:opacity-90 transition-opacity"
              >
                Apply for Partnership <ArrowUpRight size={18} />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-4 rounded-full font-semibold text-base hover:bg-muted transition-colors"
              >
                Schedule Alignment Call
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <StatsCounter
        stats={partnerStats}
        title="Why Partner With AzeemLab"
        subtitle="Built on trust, transparency, and shared growth."
      />

      {/* 3 Partnership Tracks */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading mb-4">Choose Your Partnership Track</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three distinct ways to collaborate with AzeemLab, each designed for a specific type of partner.
            </p>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {tracks.map((track) => (
              <motion.div
                key={track.id}
                variants={staggerItem}
                className="bg-card border border-border/70 rounded-xl p-8 hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="bg-primary/10 text-primary p-3 rounded-xl">
                    {track.icon}
                  </div>
                  <span className="text-5xl font-bold text-border/60 font-heading">{track.number}</span>
                </div>
                <h3 className="text-xl font-bold font-heading mb-3">{track.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  <strong className="text-foreground">Who it is for:</strong> {track.target}
                </p>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  <strong className="text-foreground">How it works:</strong> {track.how}
                </p>
                <ul className="space-y-2 mt-auto">
                  {track.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4-Step Methodology */}
      <section className="py-20 bg-neutral-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading mb-4">How We Work Together</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A clear, predictable onboarding and collaboration process from day one.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {methodologySteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative bg-card rounded-xl p-6 border border-border/70 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 text-primary p-2 rounded-lg flex-shrink-0">
                    {step.icon}
                  </div>
                  <span className="text-3xl font-bold text-border/50 font-heading">{step.number}</span>
                </div>
                <h3 className="text-lg font-bold font-heading mb-1">{step.title}</h3>
                <p className="text-xs font-semibold text-secondary mb-3 uppercase tracking-wide">{step.duration}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Principles */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading mb-4">Our Partnership Principles</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The core methodology and standards that govern every partnership we form.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                className="bg-card p-8 rounded-lg border border-border/70 shadow-sm"
              >
                <div className="text-primary mb-4">{principle.icon}</div>
                <h3 className="text-2xl font-bold font-heading mb-3">{principle.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{principle.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <TestimonialCarousel
        testimonials={partnerTestimonials}
        title="From Our Partners"
        subtitle="Real experiences from agencies, referral partners, and technology collaborators."
      />

      {/* Partner Portal Preview */}
      <section className="py-20 bg-neutral-light">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold font-heading mb-4">Your Partner Portal</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                After onboarding, every partner receives a dedicated set of resources and tools to start collaborating immediately.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {portalFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="bg-card border border-border/70 rounded-xl p-6 text-center hover:shadow-md transition-shadow"
                >
                  <div className="bg-primary/10 text-primary p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <p className="text-sm font-semibold text-foreground">{feature.label}</p>
                </motion.div>
              ))}
            </div>
            <div className="bg-card border border-border/70 rounded-xl p-8 text-center">
              <HandshakeIcon className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold font-heading mb-3">Ready to access your partner portal?</h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Complete the application form below. Approved partners receive portal access within 24 hours of agreement signing.
              </p>
              <a
                href="#apply"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-base hover:opacity-90 transition-opacity"
              >
                Apply Now <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold font-heading mb-4">Apply for Partnership</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Tell us about your business and which partnership track interests you. We respond within 24 hours.
              </p>
            </div>
            <div className="bg-card rounded-xl shadow-lg p-8 md:p-10 border border-border/70">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Your Full Name"
                    name="name"
                    autoComplete="name"
                    maxLength={120}
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Jane Smith"
                  />
                  <Input
                    label="Agency or Business Name"
                    name="agency"
                    maxLength={120}
                    value={formData.agency}
                    onChange={handleChange}
                    required
                    placeholder="Creative Studio Ltd"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Business Email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    maxLength={254}
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="jane@youragency.com"
                  />
                  <Input
                    label="Phone or WhatsApp (optional)"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    maxLength={60}
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+44 7700 900000"
                  />
                </div>
                <Input
                  label="Website or Portfolio URL"
                  name="website"
                  type="url"
                  maxLength={300}
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://youragency.com"
                />
                <Select
                  label="Partnership Track"
                  name="partnerType"
                  value={formData.partnerType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a partnership track...</option>
                  <option value="agency-white-label">Agency and White-Label Fulfillment</option>
                  <option value="referral-affiliate">Referral and Affiliate Partner (up to 40%)</option>
                  <option value="tech-integration">Technology and Integration Partner</option>
                </Select>
                <Input
                  label="Estimated Monthly Volume or Referral Frequency"
                  name="scope"
                  maxLength={200}
                  value={formData.scope}
                  onChange={handleChange}
                  placeholder="e.g. 2 to 3 projects per month, or 1 to 2 referrals per quarter"
                />
                <TextArea
                  label="Tell us about your partnership goals"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  minLength={10}
                  maxLength={2000}
                  rows={5}
                  placeholder="Share what you are looking to achieve through this partnership and any specific requirements..."
                />

                {submitStatus === "success" && (
                  <div role="status" className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                    <strong>Application received.</strong> Our team will review your application and be in touch within 24 hours.
                  </div>
                )}
                {submitStatus === "error" && (
                  <div role="alert" className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                    <strong>Application not delivered.</strong> {errorMessage} <a className="underline font-semibold" href="mailto:bilal.azeemlab@gmail.com">Email us directly</a>.
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting application..." : "Submit Partnership Application"}
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  No commitment required. We will review your application and reach out to schedule an alignment call.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection
        faqs={partnerFaqs}
        title="Partner Questions Answered"
        subtitle="Common questions about how partnerships work with AzeemLab."
        ctaText="Have a question not listed here?"
        ctaLink="/contact"
      />

      {/* CTA */}
      <CTASection />
    </main>
  );
}
