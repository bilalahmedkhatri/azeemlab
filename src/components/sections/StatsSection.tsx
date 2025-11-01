'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CountUpComponent as CountUp } from '../ui/CountUp';

const stats = [
	{ value: 10, suffix: '+', label: 'Happy Clients' },
	{ value: 170, suffix: '%', label: 'Average ROI' },
	{ value: 98, suffix: '%', label: 'Client Satisfaction' },
	{ value: 12, suffix: '+', label: 'Projects Completed' },
];

const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
			delayChildren: 0.3,
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

export const StatsSection = () => {
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	return (
		<section ref={ref} className="py-16 sm:py-24 bg-muted/50">
			<div className="container mx-auto px-6">
				<motion.div
					className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
					variants={containerVariants}
					initial="hidden"
					animate={inView ? 'visible' : 'hidden'}
				>
					{stats.map((stat, index) => (
						<motion.div
							key={index}
							className="p-6 bg-card rounded-xl shadow-lg"
							variants={itemVariants}
						>
							<h3 className="text-4xl sm:text-5xl font-bold text-primary">
								{inView && <CountUp end={stat.value} />}
								{stat.suffix}
							</h3>
							<p className="mt-2 text-sm sm:text-base text-muted-foreground font-medium">
								{stat.label}
							</p>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
};
