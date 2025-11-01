'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useScrolled } from '@/hooks/useAnimations';

export const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const isScrolled = useScrolled(50);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/services', label: 'Services' },
        { href: '/portfolio', label: 'Portfolio' },
        { href: '/process', label: 'Process' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
    ];

    const isActiveLink = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
                    : 'bg-white shadow-sm py-4'
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <nav className="container mx-auto px-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className={`font-heading font-bold text-neutral-dark hover:text-accent transition-all duration-300 ${isScrolled ? 'text-xl' : 'text-2xl'
                            }`}
                    >
                        AzeemLab
                    </Link>
                    

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative text-neutral-dark hover:text-accent transition-colors font-medium ${isActiveLink(link.href) ? 'text-accent' : ''
                                    }`}
                            >
                                {link.label}
                                {isActiveLink(link.href) && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}
                        <ThemeToggle />
                        <Button href="/contact" size="sm">
                            Start Project
                        </Button>
                    </div>

                    {/* Mobile Controls */}
                    <div className="lg:hidden flex items-center gap-3">
                        <ThemeToggle />
                        <motion.button
                            className="text-neutral-dark focus:outline-none z-50 relative"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                            whileTap={{ scale: 0.9 }}
                        >
                            <div className="w-6 h-5 flex flex-col justify-between">
                                <motion.span
                                    className="w-full h-0.5 bg-current origin-center"
                                    animate={
                                        isMenuOpen
                                            ? { rotate: 45, y: 9 }
                                            : { rotate: 0, y: 0 }
                                    }
                                    transition={{ duration: 0.3 }}
                                />
                                <motion.span
                                    className="w-full h-0.5 bg-current"
                                    animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                />
                                <motion.span
                                    className="w-full h-0.5 bg-current origin-center"
                                    animate={
                                        isMenuOpen
                                            ? { rotate: -45, y: -9 }
                                            : { rotate: 0, y: 0 }
                                    }
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                        </motion.button>
                    </div>

                    {/* Mobile Menu */}
                    <AnimatePresence>
                        {isMenuOpen && (
                            <>
                                {/* Backdrop */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden"
                                    onClick={() => setIsMenuOpen(false)}
                                    style={{ top: 0 }}
                                />

                                {/* Menu Panel */}
                                <motion.div
                                    initial={{ x: '100%' }}
                                    animate={{ x: 0 }}
                                    exit={{ x: '100%' }}
                                    transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                                    className="fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl lg:hidden overflow-y-auto"
                                >
                                    <div className="flex flex-col h-full p-8 pt-24">
                                        {/* Navigation Links */}
                                        <nav className="flex-1 space-y-2">
                                            {navLinks.map((link, index) => (
                                                <motion.div
                                                    key={link.href}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.05 }}
                                                >
                                                    <Link
                                                        href={link.href}
                                                        className={`block py-3 px-4 rounded-lg font-medium transition-colors ${isActiveLink(link.href)
                                                                ? 'bg-accent text-white'
                                                                : 'text-neutral-dark hover:bg-neutral-light'
                                                            }`}
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        {link.label}
                                                    </Link>
                                                </motion.div>
                                            ))}
                                        </nav>

                                        {/* CTA Button */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: navLinks.length * 0.05 }}
                                            className="pt-6 border-t border-gray-200"
                                        >
                                            <Button
                                                href="/contact"
                                                size="lg"
                                                className="w-full"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Start Project
                                            </Button>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </nav>
        </motion.header>
    );
};
