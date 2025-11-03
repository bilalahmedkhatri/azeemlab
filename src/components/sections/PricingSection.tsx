'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Button } from '../ui/Button';
import { Check } from 'lucide-react';

const pricingPlans = [
	{
		name: 'Starter',
		price: 500,
		description: 'For individuals and small teams getting started.',
		features: [
			'Custom Landing Page',
			'Responsive Design',
			'Basic SEO Setup',
			'Standard Support',
		],
		isPopular: false,
	},
	{
		name: 'Business',
		price: 1200,
		description: 'For growing businesses that need more power and features.',
		features: [
			'5-Page Custom Website',
			'Advanced SEO & Analytics',
			'CMS Integration',
			'AI-Powered Content Suggestions',
			'Priority Support',
		],
		isPopular: true,
	},
	{
		name: 'Enterprise',
		price: 2000,
		description: 'For large-scale applications and dedicated support.',
		features: [
			'Full-Stack Web Application',
			'E-commerce Functionality',
			'Dedicated AI Chatbot',
			'24/7 Premium Support',
			'Cloud Hosting Setup',
		],
		isPopular: false,
	},
];

const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const itemVariants: Variants = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			type: 'spring',
			stiffness: 100,
		},
	},
};

export const PricingSection: React.FC = () => {
	return (
		<section className="py-20 bg-background">
			<div className="container mx-auto px-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
						Flexible Plans for Every Need
					</h2>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
						Choose the perfect plan to launch and grow your digital presence.
					</p>
          <div className="mt-8">
            <Button href="/pricing" variant="outline">View Detailed Comparison</Button>
          </div>
				</motion.div>

				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
				>
					{pricingPlans.map((plan) => (
						<motion.div
							key={plan.name}
							className={`relative border rounded-2xl p-8 flex flex-col ${
								plan.isPopular ? 'border-primary shadow-2xl' : 'border-border'
							}`}
							variants={itemVariants}
						>
							{plan.isPopular && (
								<div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
									<span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
										Most Popular
									</span>
								</div>
							)}
							<h3 className="text-2xl font-bold font-heading mb-2">
								{plan.name}
							</h3>
							<p className="text-muted-foreground mb-6 h-12">
								{plan.description}
							</p>

              <div className="mb-8">
                <span className="text-5xl font-bold">${plan.price}</span>
                <span className="text-muted-foreground"> one-time</span>
              </div>							<ul className="space-y-4 mb-8 flex-grow">
								{plan.features.map((feature, index) => (
									<li key={index} className="flex items-center gap-3">
										<Check className="w-5 h-5 text-primary" />
										<span>{feature}</span>
									</li>
								))}
							</ul>

							<Button
								href={`/pricing/plan_detail/${plan.name.toLowerCase()}`}
								variant={plan.isPopular ? 'default' : 'outline'}
								className="w-full"
								size="lg"
							>
								View Details
							</Button>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
};
