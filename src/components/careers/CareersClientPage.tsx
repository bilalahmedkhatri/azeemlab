"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import {
    MapPin,
    Clock,
    Briefcase,
    Users,
    Coffee,
    Trophy,
    Heart,
    Zap,
    Code,
    Palette,
    TrendingUp,
    ChevronRight,
    CheckCircle2,
    Upload,
    X,
    Send
} from 'lucide-react';

interface JobListing {
    id: string;
    title: string;
    department: string;
    location: string;
    type: string;
    description: string;
    responsibilities: string[];
    requirements: string[];
    benefits: string[];
}

const jobListings: JobListing[] = [
    {
        id: 'fullstack-dev',
        title: 'Senior Full-Stack Developer',
        department: 'Engineering',
        location: 'Remote',
        type: 'Full-time',
        description: 'We\'re looking for an experienced full-stack developer to build scalable web applications using modern technologies.',
        responsibilities: [
            'Develop and maintain web applications using Next.js, React, and Node.js',
            'Design and implement RESTful APIs and microservices',
            'Collaborate with designers and product managers to deliver exceptional user experiences',
            'Write clean, maintainable, and well-documented code',
            'Mentor junior developers and contribute to code reviews',
        ],
        requirements: [
            '5+ years of experience in full-stack development',
            'Expert knowledge of React, Next.js, TypeScript, and Node.js',
            'Experience with cloud platforms (AWS, Azure, or Vercel)',
            'Strong understanding of database design (PostgreSQL, MongoDB)',
            'Excellent problem-solving and communication skills',
        ],
        benefits: [
            'Competitive salary ($80k - $120k based on experience)',
            'Fully remote work',
            'Flexible working hours',
            'Health insurance',
            'Professional development budget',
            '20 days paid vacation',
        ],
    },
    {
        id: 'ui-ux-designer',
        title: 'UI/UX Designer',
        department: 'Design',
        location: 'Remote',
        type: 'Full-time',
        description: 'Join our design team to create beautiful, intuitive interfaces that users love.',
        responsibilities: [
            'Design user interfaces for web and mobile applications',
            'Create wireframes, prototypes, and high-fidelity mockups',
            'Conduct user research and usability testing',
            'Collaborate with developers to ensure design implementation',
            'Maintain and evolve our design system',
        ],
        requirements: [
            '3+ years of UI/UX design experience',
            'Proficiency in Figma, Adobe XD, or Sketch',
            'Strong portfolio demonstrating your design process',
            'Understanding of responsive design principles',
            'Excellent visual design skills',
        ],
        benefits: [
            'Competitive salary ($60k - $90k)',
            'Remote-first culture',
            'Latest design tools and software',
            'Creative freedom',
            'Collaborative team environment',
            'Growth opportunities',
        ],
    },
    {
        id: 'project-manager',
        title: 'Project Manager',
        department: 'Operations',
        location: 'Remote',
        type: 'Full-time',
        description: 'Lead our projects from inception to delivery, ensuring client satisfaction and team success.',
        responsibilities: [
            'Manage multiple client projects simultaneously',
            'Create project timelines and manage resources',
            'Communicate with clients and stakeholders',
            'Ensure projects are delivered on time and within budget',
            'Identify and mitigate project risks',
        ],
        requirements: [
            '4+ years of project management experience',
            'Experience with Agile/Scrum methodologies',
            'Excellent organizational and leadership skills',
            'Strong client communication abilities',
            'PMP or similar certification is a plus',
        ],
        benefits: [
            'Competitive salary ($70k - $100k)',
            'Flexible schedule',
            'Remote work options',
            'Professional certifications support',
            'Performance bonuses',
            'Team building activities',
        ],
    },
    {
        id: 'ai-specialist',
        title: 'AI/ML Specialist',
        department: 'Engineering',
        location: 'Remote',
        type: 'Full-time',
        description: 'Help us integrate cutting-edge AI solutions into our client projects.',
        responsibilities: [
            'Integrate AI APIs (OpenAI, Gemini, Claude) into applications',
            'Build custom chatbots and AI-powered features',
            'Research and implement latest AI technologies',
            'Train and fine-tune machine learning models',
            'Collaborate with development team on AI integrations',
        ],
        requirements: [
            '3+ years of AI/ML experience',
            'Experience with OpenAI, LangChain, or similar frameworks',
            'Strong Python programming skills',
            'Knowledge of FastAPI, Django, or Flask',
            'Understanding of prompt engineering',
        ],
        benefits: [
            'Competitive salary ($85k - $130k)',
            'Work with latest AI technologies',
            'Remote flexibility',
            'Conference and training budget',
            'Equity options',
            'Innovation time',
        ],
    },
];

const perks = [
    {
        icon: <MapPin className="w-8 h-8" />,
        title: 'Work From Anywhere',
        description: 'Choose your workspace. Whether it\'s home, a café, or the beach.',
    },
    {
        icon: <Clock className="w-8 h-8" />,
        title: 'Flexible Hours',
        description: 'Work when you\'re most productive. We value output, not hours.',
    },
    {
        icon: <TrendingUp className="w-8 h-8" />,
        title: 'Career Growth',
        description: 'Continuous learning, mentorship, and advancement opportunities.',
    },
    {
        icon: <Users className="w-8 h-8" />,
        title: 'Amazing Team',
        description: 'Collaborate with talented, supportive colleagues who inspire you.',
    },
    {
        icon: <Coffee className="w-8 h-8" />,
        title: 'Work-Life Balance',
        description: 'Take time for yourself. We encourage healthy balance.',
    },
    {
        icon: <Trophy className="w-8 h-8" />,
        title: 'Competitive Pay',
        description: 'Fair compensation, bonuses, and comprehensive benefits.',
    },
];

export default function CareersClientPage() {
    const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
    const [jobForApplication, setJobForApplication] = useState<JobListing | null>(null);
    const [showApplicationForm, setShowApplicationForm] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        linkedIn: '',
        portfolio: '',
        experience: '',
        availability: '',
        expectedSalary: '',
        whyJoin: '',
        resume: null as File | null,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, resume: e.target.files![0] }));
        }
    };

    const handleApplyClick = () => {
        setJobForApplication(selectedJob); // Store the job being applied for
        setSelectedJob(null); // Close job details modal
        setShowApplicationForm(true); // Open application form
    };

    const handleSubmitApplication = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Prepare form data
            const applicationData = {
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                linkedIn: formData.linkedIn,
                portfolio: formData.portfolio,
                experience: formData.experience,
                availability: formData.availability,
                expectedSalary: formData.expectedSalary,
                whyJoin: formData.whyJoin,
                position: jobForApplication?.title || '',
                department: jobForApplication?.department || '',
                resumeFileName: formData.resume?.name,
            };

            // Submit to API
            const response = await fetch('/api/careers/apply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(applicationData),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.details || 'Failed to submit application');
            }

            setIsSubmitting(false);
            setSubmitSuccess(true);

            // Reset form after 3 seconds
            setTimeout(() => {
                setShowApplicationForm(false);
                setJobForApplication(null);
                setSubmitSuccess(false);
                setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    linkedIn: '',
                    portfolio: '',
                    experience: '',
                    availability: '',
                    expectedSalary: '',
                    whyJoin: '',
                    resume: null,
                });
            }, 3000);
        } catch (error) {
            console.error('Error submitting application:', error);
            setIsSubmitting(false);
            alert('Failed to submit application. Please try again or contact support.');
        }
    };

    const closeApplicationForm = () => {
        setShowApplicationForm(false);
        setJobForApplication(null);
        setSubmitSuccess(false);
    };

    const handleBackToJobDetails = () => {
        setShowApplicationForm(false);
        setSelectedJob(jobForApplication); // Restore the job details
        setJobForApplication(null);
    };

    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-20 md:py-30 bg-gradient-to-br from-accent to-accent-dark text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h1 className="font-heading text-4xl md:text-7xl font-bold mb-6">
                            Build Your Career With Us
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 opacity-90">
                            Join a team that values creativity, innovation, and your personal growth.
                            Work on exciting projects that make a real difference.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                href="#openings"
                                variant="secondary"
                                size="lg"
                                className="text-lg px-8"
                            >
                                View Open Positions
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Why Join Us */}
            <section id="culture" className="py-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-neutral-dark mb-4">
                            Why Join SooooLab?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            We believe in creating an environment where you can do your best work
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {perks.map((perk, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-6">
                                    {perk.icon}
                                </div>
                                <h3 className="font-heading text-xl font-bold mb-3">{perk.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{perk.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Work Environment Images */}
            <section className="py-20 bg-gradient-to-b from-neutral-light to-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-neutral-dark mb-4">
                            Life at SooooLab
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            A glimpse into our culture, workspace, and team collaboration
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {[
                            { title: 'Collaborative Workspace', gradient: 'from-blue-500 to-purple-600', icon: <Users className="w-12 h-12" /> },
                            { title: 'Modern Tools & Tech', gradient: 'from-teal-500 to-cyan-600', icon: <Code className="w-12 h-12" /> },
                            { title: 'Creative Freedom', gradient: 'from-pink-500 to-rose-600', icon: <Palette className="w-12 h-12" /> },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative h-80 rounded-2xl overflow-hidden shadow-xl"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-90 group-hover:opacity-100 transition-all duration-500`}></div>
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                                    <div className="mb-4 transform group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </div>
                                    <h3 className="font-heading text-2xl font-bold text-center">{item.title}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section id="openings" className="py-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-neutral-dark mb-4">
                            Open Positions
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Find your next role and start making an impact
                        </p>
                    </motion.div>

                    <div className="max-w-5xl mx-auto space-y-6">
                        {jobListings.map((job, index) => (
                            <motion.div
                                key={job.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-accent/30 hover:-translate-y-1"
              >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                                    <div>
                                        <h3 className="font-heading text-2xl font-bold text-neutral-dark mb-2">
                                            {job.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                                            <span className="flex items-center gap-1">
                                                <Briefcase className="w-4 h-4" />
                                                {job.department}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" />
                                                {job.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {job.type}
                                            </span>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() => setSelectedJob(job)}
                                        className="whitespace-nowrap"
                                    >
                                        View Details
                                        <ChevronRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                                <p className="text-gray-600 leading-relaxed">{job.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Job Details Modal */}
            <AnimatePresence>
                {selectedJob && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
                        onClick={() => setSelectedJob(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="bg-white rounded-2xl max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start">
                            <div>
                                <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-2">
                                    {selectedJob.title}
                                </h2>
                                <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                                    <span className="flex items-center gap-1">
                                        <Briefcase className="w-4 h-4" />
                                        {selectedJob.department}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        {selectedJob.location}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {selectedJob.type}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedJob(null)}
                                className="text-gray-400 hover:text-gray-600 text-3xl leading-none transition-all hover:rotate-90 hover:scale-110"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-6 space-y-8">
                            <div>
                                <h3 className="font-heading text-xl font-bold mb-4">About the Role</h3>
                                <p className="text-gray-600 leading-relaxed">{selectedJob.description}</p>
                            </div>

                            <div>
                                <h3 className="font-heading text-xl font-bold mb-4">Responsibilities</h3>
                                <ul className="space-y-3">
                                    {selectedJob.responsibilities.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-600">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-heading text-xl font-bold mb-4">Requirements</h3>
                                <ul className="space-y-3">
                                    {selectedJob.requirements.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-600">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-heading text-xl font-bold mb-4">Benefits</h3>
                                <ul className="space-y-3">
                                    {selectedJob.benefits.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <Heart className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-600">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button
                                    onClick={handleApplyClick}
                                    size="lg"
                                    className="flex-1 transition-all hover:scale-105"
                                >
                                    Apply for This Position
                                </Button>
                                <Button
                                    onClick={() => setSelectedJob(null)}
                                    variant="outline"
                                    size="lg"
                                    className="flex-1 transition-all hover:scale-105"
                                >
                                    Close
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
                )}
            </AnimatePresence>

            {/* Application Form Modal */}
            <AnimatePresence mode="wait">
                {showApplicationForm && jobForApplication && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto"
                        onClick={closeApplicationForm}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="bg-white rounded-2xl max-w-3xl w-full my-8 max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                                    {submitSuccess ? (
                                        <div className="p-12 text-center">
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring", duration: 0.5 }}
                                            >
                                                <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
                                            </motion.div>
                                            <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-4">
                                                Application Submitted!
                                            </h2>
                                            <p className="text-xl text-gray-600 mb-2">
                                                Thank you for applying to the {jobForApplication.title} position.
                                            </p>
                                            <p className="text-gray-500">
                                                We'll review your application and get back to you within 5-7 business days.
                                            </p>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start rounded-t-2xl">
                                                <div className="flex items-center gap-4">
                                                    <button
                                                        onClick={handleBackToJobDetails}
                                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                                        title="Back to job details"
                                                    >
                                                        <ChevronRight className="w-6 h-6 rotate-180" />
                                                    </button>
                                                    <div>
                                                        <h2 className="font-heading text-2xl font-bold text-neutral-dark mb-2">
                                                            Apply for {jobForApplication.title}
                                                        </h2>
                                                        <p className="text-gray-600">Fill out the form below to submit your application</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={closeApplicationForm}
                                                    className="text-gray-400 hover:text-gray-600 text-3xl leading-none"
                                                >
                                                    ×
                                                </button>
                                            </div>

                                            <form onSubmit={handleSubmitApplication} className="p-6 space-y-6">
                                                {/* Personal Information */}
                                                <div>
                                                    <h3 className="font-heading text-lg font-bold mb-4 text-neutral-dark">Personal Information</h3>
                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                Full Name <span className="text-red-500">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="fullName"
                                                                value={formData.fullName}
                                                                onChange={handleInputChange}
                                                                required
                                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                                                                placeholder="John Doe"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                Email Address <span className="text-red-500">*</span>
                                                            </label>
                                                            <input
                                                                type="email"
                                                                name="email"
                                                                value={formData.email}
                                                                onChange={handleInputChange}
                                                                required
                                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                                                                placeholder="john@example.com"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                Phone Number <span className="text-red-500">*</span>
                                                            </label>
                                                            <input
                                                                type="tel"
                                                                name="phone"
                                                                value={formData.phone}
                                                                onChange={handleInputChange}
                                                                required
                                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                                                                placeholder="+1 (555) 123-4567"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                LinkedIn Profile
                                                            </label>
                                                            <input
                                                                type="url"
                                                                name="linkedIn"
                                                                value={formData.linkedIn}
                                                                onChange={handleInputChange}
                                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                                                                placeholder="linkedin.com/in/johndoe"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Professional Information */}
                                                <div>
                                                    <h3 className="font-heading text-lg font-bold mb-4 text-neutral-dark">Professional Information</h3>
                                                    <div className="space-y-4">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                Portfolio / Website
                                                            </label>
                                                            <input
                                                                type="url"
                                                                name="portfolio"
                                                                value={formData.portfolio}
                                                                onChange={handleInputChange}
                                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                                                                placeholder="https://yourportfolio.com"
                                                            />
                                                        </div>
                                                        <div className="grid md:grid-cols-2 gap-4">
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                    Years of Experience <span className="text-red-500">*</span>
                                                                </label>
                                                                <select
                                                                    name="experience"
                                                                    value={formData.experience}
                                                                    onChange={handleInputChange}
                                                                    required
                                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                                                                >
                                                                    <option value="">Select...</option>
                                                                    <option value="0-1">0-1 years</option>
                                                                    <option value="1-3">1-3 years</option>
                                                                    <option value="3-5">3-5 years</option>
                                                                    <option value="5-10">5-10 years</option>
                                                                    <option value="10+">10+ years</option>
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                    When can you start? <span className="text-red-500">*</span>
                                                                </label>
                                                                <select
                                                                    name="availability"
                                                                    value={formData.availability}
                                                                    onChange={handleInputChange}
                                                                    required
                                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                                                                >
                                                                    <option value="">Select...</option>
                                                                    <option value="immediately">Immediately</option>
                                                                    <option value="2-weeks">2 weeks notice</option>
                                                                    <option value="1-month">1 month notice</option>
                                                                    <option value="2-months">2 months notice</option>
                                                                    <option value="flexible">Flexible</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                Expected Salary Range (Annual)
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="expectedSalary"
                                                                value={formData.expectedSalary}
                                                                onChange={handleInputChange}
                                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                                                                placeholder="e.g., $80,000 - $100,000"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Upload Resume */}
                                                <div>
                                                    <h3 className="font-heading text-lg font-bold mb-4 text-neutral-dark">Resume / CV</h3>
                                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-accent transition-colors">
                                                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                                        <label className="cursor-pointer">
                                                            <span className="text-accent font-semibold hover:underline">
                                                                Click to upload
                                                            </span>
                                                            <span className="text-gray-600"> or drag and drop</span>
                                                            <input
                                                                type="file"
                                                                onChange={handleFileChange}
                                                                accept=".pdf,.doc,.docx"
                                                                className="hidden"
                                                                required
                                                            />
                                                        </label>
                                                        <p className="text-sm text-gray-500 mt-2">PDF, DOC, DOCX up to 10MB</p>
                                                        {formData.resume && (
                                                            <p className="mt-3 text-sm text-green-600 flex items-center justify-center gap-2">
                                                                <CheckCircle2 className="w-4 h-4" />
                                                                {formData.resume.name}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Why Join Us */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Why do you want to join SooooLab? <span className="text-red-500">*</span>
                                                    </label>
                                                    <textarea
                                                        name="whyJoin"
                                                        value={formData.whyJoin}
                                                        onChange={handleInputChange}
                                                        required
                                                        rows={4}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent resize-none"
                                                        placeholder="Tell us what excites you about this opportunity and why you'd be a great fit for our team..."
                                                    />
                                                </div>

                                                {/* Submit Buttons */}
                                                <div className="flex gap-4 pt-4">
                                                    <button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className="flex-1 bg-accent hover:bg-accent-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                                    >
                                                        {isSubmitting ? (
                                                            <>
                                                                <motion.div
                                                                    animate={{ rotate: 360 }}
                                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                                >
                                                                    <Send className="w-5 h-5" />
                                                                </motion.div>
                                                                Submitting...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Send className="w-5 h-5" />
                                                                Submit Application
                                                            </>
                                                        )}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={closeApplicationForm}
                                                        className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-accent to-accent-dark text-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <Zap className="w-16 h-16 mx-auto mb-6" />
                        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                            Don't See a Perfect Fit?
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            We're always interested in meeting talented people. Send us your resume and
                            tell us why you'd be a great addition to our team.
                        </p>
                        <Button href="/contact" variant="secondary" size="lg" className="text-lg px-8">
                            Get in Touch
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}
