"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  PenLine,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Globe,
  BarChart3,
  Cpu,
  ShoppingCart,
  Palette,
  ArrowRight,
  FileText,
  Clock,
  Send,
  Users,
  TrendingUp,
  Star,
  Link2,
} from "lucide-react";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/animations";
import { CTASection } from "@/components/sections/CTASection";
import { Input, TextArea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const benefits = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "Reach a Targeted Audience",
    description:
      "AzeemLab readers are business owners, founders, and digital decision-makers actively seeking web design, AI, and marketing insights.",
  },
  {
    icon: <Link2 className="w-6 h-6" />,
    title: "Earn a Dofollow Backlink",
    description:
      "Every accepted post includes one contextual dofollow link back to your site, directly supporting your domain authority and organic rankings.",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Grow Your Authority",
    description:
      "Publishing under the AzeemLab brand signals credibility to your audience and search engines alike.",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Global Distribution",
    description:
      "Your article is published across our multilingual platform reaching readers in the UK, US, Europe, and Asia.",
  },
];

const topicCategories = [
  {
    icon: <Globe className="w-7 h-7" />,
    category: "Web Design",
    ideas: [
      "Responsive design patterns for 2025",
      "Accessibility best practices for small businesses",
      "Performance optimization case studies",
      "Design system setup from scratch",
    ],
  },
  {
    icon: <Cpu className="w-7 h-7" />,
    category: "AI and Automation",
    ideas: [
      "Real-world AI chatbot implementation guides",
      "Workflow automation for agencies",
      "Prompt engineering for content teams",
      "AI tools comparison for business owners",
    ],
  },
  {
    icon: <BarChart3 className="w-7 h-7" />,
    category: "SEO and Growth",
    ideas: [
      "Technical SEO audit walkthroughs",
      "Local SEO strategies for service businesses",
      "Content strategy frameworks that convert",
      "Link building tactics with measurable results",
    ],
  },
  {
    icon: <ShoppingCart className="w-7 h-7" />,
    category: "E-commerce",
    ideas: [
      "Conversion rate optimization for product pages",
      "Headless commerce setup guides",
      "Mobile checkout UX improvements",
      "Shopify vs custom builds - real decisions",
    ],
  },
  {
    icon: <Palette className="w-7 h-7" />,
    category: "Branding and Strategy",
    ideas: [
      "Brand positioning for digital-first businesses",
      "Visual identity systems that scale",
      "Storytelling frameworks for agency pitches",
      "Rebranding without losing existing traction",
    ],
  },
];

const guidelines = {
  do: [
    "Write original, unpublished content (minimum 1,200 words)",
    "Include practical takeaways readers can act on immediately",
    "Use clear subheadings, short paragraphs, and examples",
    "Cite reputable sources with working URLs",
    "Submit a short author bio (2-3 sentences) with a headshot",
    "Provide one relevant internal link suggestion to existing AzeemLab content",
  ],
  dont: [
    "Submit AI-generated content presented as human writing",
    "Include more than one self-promotional link",
    "Pitch topics already covered in the past 6 months",
    "Submit content with spelling errors or grammatical issues",
    "Use keyword stuffing or thin filler content",
    "Republish content that appears elsewhere on the web",
  ],
};

const processSteps = [
  {
    number: "01",
    icon: <PenLine className="w-6 h-6" />,
    title: "Pitch Your Idea",
    description:
      "Submit your topic idea and a brief outline using the form below. We review all pitches within 3 business days.",
  },
  {
    number: "02",
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: "Pitch Review",
    description:
      "Our editorial team assesses your pitch for relevance, originality, and audience fit. We reply with approval or feedback.",
  },
  {
    number: "03",
    icon: <FileText className="w-6 h-6" />,
    title: "Write and Submit",
    description:
      "Once approved, write your article following our editorial guidelines and submit the draft for review.",
  },
  {
    number: "04",
    icon: <Star className="w-6 h-6" />,
    title: "Editorial Review",
    description:
      "We review for quality, accuracy, and editorial fit. Minor edits may be made for clarity and style consistency.",
  },
  {
    number: "05",
    icon: <Globe className="w-6 h-6" />,
    title: "Published",
    description:
      "Your article goes live on AzeemLab with your author profile, bio, and dofollow backlink.",
  },
];

const topicOptions = [
  { value: "", label: "Select a topic category" },
  { value: "web-design", label: "Web Design and Development" },
  { value: "ai-automation", label: "AI and Automation" },
  { value: "seo-growth", label: "SEO and Digital Growth" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "branding", label: "Branding and Strategy" },
  { value: "other", label: "Other (describe in outline)" },
];

interface FormState {
  name: string;
  email: string;
  website: string;
  topicTitle: string;
  topicCategory: string;
  outline: string;
  bio: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  topicTitle?: string;
  topicCategory?: string;
  outline?: string;
}

export default function GuestPostClientPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    website: "",
    topicTitle: "",
    topicCategory: "",
    outline: "",
    bio: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      e.name = "Please enter your full name.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email address.";
    if (!form.topicTitle.trim() || form.topicTitle.trim().length < 5)
      e.topicTitle = "Please provide a working title for your article.";
    if (!form.topicCategory)
      e.topicCategory = "Please select a topic category.";
    if (!form.outline.trim() || form.outline.trim().length < 50)
      e.outline = "Please provide at least a brief outline (3-5 bullet points).";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/guest-post/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Your pitch could not be delivered. Please email bilal.azeemlab@gmail.com.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Your pitch could not be delivered. Please email bilal.azeemlab@gmail.com.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-neutral-dark via-primary to-accent/80 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-6 relative">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/20">
              <PenLine className="w-4 h-4" />
              Write for AzeemLab
            </div>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Share Your Expertise.<br />
              <span className="text-white">Grow Your Reach.</span>
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Submit a guest post to AzeemLab and get published alongside expert content on web design, AI, SEO, and digital growth. Earn a dofollow backlink and reach a global audience of business owners and decision-makers.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-white/70 text-sm">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                3-day pitch review
              </span>
              <span className="flex items-center gap-2">
                <Link2 className="w-4 h-4" />
                Dofollow backlink included
              </span>
              <span className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Multilingual distribution
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-14"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl font-bold text-neutral-dark mb-4">
              Why Write for <span className="text-accent">AzeemLab</span>?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Beyond a backlink - contributing here positions you as a trusted voice in the digital industry.
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {benefits.map((b, i) => (
              <motion.div key={i} variants={staggerItem}>
                <Card className="p-6 h-full border border-gray-100 hover:border-accent/30 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-4">
                    {b.icon}
                  </div>
                  <h3 className="font-heading font-bold text-neutral-dark mb-2 text-lg">
                    {b.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{b.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Topic Categories */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-14"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Lightbulb className="w-4 h-4" />
              Topic Ideas
            </div>
            <h2 className="font-heading text-4xl font-bold text-neutral-dark mb-4">
              What We Publish
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We accept high-quality, original articles across these categories. Not seeing your angle? Pitch it anyway.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {topicCategories.map((cat, i) => (
              <motion.div key={i} variants={staggerItem}>
                <Card className="p-6 h-full border border-gray-100 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                      {cat.icon}
                    </div>
                    <h3 className="font-heading font-bold text-neutral-dark text-lg">
                      {cat.category}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {cat.ideas.map((idea, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                        <ArrowRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                        {idea}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Guidelines */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-14"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl font-bold text-neutral-dark mb-4">
              Editorial Guidelines
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We hold guest content to the same standard as our own. These guidelines keep the bar high for everyone.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="bg-green-50 border border-green-100 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                  <h3 className="font-heading text-xl font-bold text-green-800">What We Look For</h3>
                </div>
                <ul className="space-y-3">
                  {guidelines.do.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-green-900 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <div className="bg-red-50 border border-red-100 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <XCircle className="w-6 h-6 text-red-500" />
                  <h3 className="font-heading text-xl font-bold text-red-800">What Gets Rejected</h3>
                </div>
                <ul className="space-y-3">
                  {guidelines.dont.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-red-900 text-sm">
                      <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-neutral-dark">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-14"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl font-bold text-white mb-4">
              How the Process Works
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              From pitch to publication, here is exactly what to expect.
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-white shrink-0">
                    {step.icon}
                  </div>
                  {i < processSteps.length - 1 && (
                    <div className="w-px flex-1 bg-white/10 mt-3" />
                  )}
                </div>
                <div className="pb-8 last:pb-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-accent font-mono text-sm font-bold">{step.number}</span>
                    <h3 className="font-heading font-bold text-white text-lg">{step.title}</h3>
                  </div>
                  <p className="text-white/60 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Submission Form */}
      <section className="py-20 bg-white" id="submit">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Send className="w-4 h-4" />
              Submit Your Pitch
            </div>
            <h2 className="font-heading text-4xl font-bold text-neutral-dark mb-4">
              Ready to Contribute?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Fill in the form below with your pitch details. We respond to all submissions within 3 business days.
            </p>
          </motion.div>

          <motion.div
            className="max-w-2xl mx-auto"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {status === "success" ? (
              <div className="text-center py-16 px-8 bg-green-50 border border-green-200 rounded-2xl">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-green-900 mb-3">
                  Pitch Received
                </h3>
                <p className="text-green-700 leading-relaxed">
                  Thank you for submitting your guest post pitch. Our editorial team will review it and get back to you within 3 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 border border-gray-100 rounded-2xl p-8">
                <div className="grid sm:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    name="name"
                    id="gp-name"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange}
                    error={errors.name}
                    required
                  />
                  <Input
                    label="Email Address"
                    name="email"
                    id="gp-email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                  />
                </div>

                <Input
                  label="Your Website (optional)"
                  name="website"
                  id="gp-website"
                  type="url"
                  placeholder="https://yourwebsite.com"
                  value={form.website}
                  onChange={handleChange}
                />

                <Input
                  label="Proposed Article Title"
                  name="topicTitle"
                  id="gp-topic-title"
                  placeholder="e.g. How We Reduced Page Load Time by 60% for an E-commerce Client"
                  value={form.topicTitle}
                  onChange={handleChange}
                  error={errors.topicTitle}
                  required
                />

                <Select
                  label="Topic Category"
                  name="topicCategory"
                  id="gp-category"
                  options={topicOptions}
                  value={form.topicCategory}
                  onChange={handleChange}
                  error={errors.topicCategory}
                  required
                />

                <TextArea
                  label="Brief Outline"
                  name="outline"
                  id="gp-outline"
                  placeholder="Provide 3-5 bullet points covering the main sections of your article. Tell us what makes your angle unique and what the reader will take away."
                  value={form.outline}
                  onChange={handleChange}
                  error={errors.outline}
                  rows={6}
                  required
                />

                <TextArea
                  label="Author Bio (optional)"
                  name="bio"
                  id="gp-bio"
                  placeholder="2-3 sentences about yourself, your role, and your expertise."
                  value={form.bio}
                  onChange={handleChange}
                  rows={3}
                />

                {status === "error" && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                    {errorMsg}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full"
                >
                  {status === "submitting" ? (
                    <span className="flex items-center gap-2 justify-center">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending Pitch...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 justify-center">
                      <Send className="w-4 h-4" />
                      Submit Pitch
                    </span>
                  )}
                </Button>

                <p className="text-xs text-gray-400 text-center">
                  By submitting, you confirm this is original, unpublished content. We respond within 3 business days.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
