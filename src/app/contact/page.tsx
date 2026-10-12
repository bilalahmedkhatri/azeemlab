import React from 'react';
import ContactForm from './ContactForm';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-12">Let’s talk about your project</h1>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Column - Contact Form */}
            <div className="bg-card rounded-xl shadow-lg p-8 md:p-10">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Let&apos;s Start Your Project
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and we&apos;ll get back to you within 24 hours.
              </p>
              <ContactForm />
            </div>

            {/* Right Column - Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                  Get in <span className="text-primary">Touch</span>
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Have a project in mind? We&apos;d love to hear about it. Let&apos;s discuss how we can help your business grow.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <FaEnvelope className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-foreground mb-1">Email</h3>
                    <a href="mailto:bilalahmedkhatri@outlook.com" className="break-all text-primary hover:underline transition-colors">
                      bilalahmedkhatri@outlook.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <FaPhoneAlt className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-foreground mb-1">Phone</h3>
                    <a href="https://wa.me/923213009321" className="text-primary hover:underline transition-colors">
                      +92 (321) 300 9321
                    </a><br />
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <FaMapMarkerAlt className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-foreground mb-1">Location</h3>
                    <p className="text-muted-foreground">
                      Srednyaya Pereyaslavskaya Street, 14с1, Russia <br />
                      Shahray-e-Faisal Fortune Tower 1705 SQFT, Pakistan
                    </p>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-muted p-6 rounded-lg">
                <h3 className="font-heading font-bold text-foreground mb-3">Office Hours</h3>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="font-heading font-bold text-foreground mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="https://www.linkedin.com/company/azeem-lab/" aria-label="AzeemLab on LinkedIn" className="group bg-primary/10 p-3 rounded-lg text-primary transition-all">
                    <FaLinkedin className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                  </a>
                  <a href="https://www.facebook.com/azeemlab.0" aria-label="AzeemLab on Facebook" className="group bg-primary/10 p-3 rounded-lg text-primary transition-all">
                    <FaFacebook className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                  </a>
                  <a href="https://www.instagram.com/azeem.lab/" aria-label="AzeemLab on Instagram" className="group bg-primary/10 p-3 rounded-lg text-primary transition-all">
                    <FaInstagram className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
