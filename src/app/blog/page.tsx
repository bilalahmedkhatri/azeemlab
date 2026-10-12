import React from 'react';
import Image from 'next/image';
import { articleVisuals } from '@/lib/visuals';
import Link from 'next/link';
import { Metadata } from 'next';
import { blogPosts, pageMetadata } from '@/lib/data';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  alternates: { canonical: '/blog' },
  title: 'Blog - Expert Insights on Web Design & Digital Growth | AzeemLab',
  description: 'Read our latest articles on responsive web design, front end development, and digital marketing strategies to grow your business online.',
};

export default function BlogListingPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-neutral-dark mb-6">
            Insights & <span className="text-accent">Expertise</span>
          </h1>
          <p className="text-xl text-gray-600">
            Deep dives into responsive web design, performance optimization, and digital strategy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group">
              <Card className="h-full hover:shadow-2xl transition-all duration-300 border-none bg-white overflow-hidden flex flex-col">
                <Image src={articleVisuals[post.slug].src} alt={articleVisuals[post.slug].alt} width={1200} height={800} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="w-full h-auto" />
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.publishDate).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold font-heading mb-4 group-hover:text-accent transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto pt-4 flex items-center text-accent font-semibold group/link">
                    Read Article 
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform" />
                  </div>
                </div>
                <div className="h-1.5 bg-gradient-to-r from-accent to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
