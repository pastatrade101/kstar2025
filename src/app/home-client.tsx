'use client';

import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomeClient({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'values', label: 'Values' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80; // Approximate height of the sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setIsMenuOpen(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground">
       <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-xl border-b`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-bold">
                K
              </div>
              <span className="font-bold text-lg">
                Kstar International
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => (
                <Button key={link.id} variant="ghost" asChild>
                  <Link href={`#${link.id}`} onClick={scrollToSection(link.id)}>
                    {link.label}
                  </Link>
                </Button>
              ))}
            </nav>
            
            <div className="flex items-center gap-4">
              <Button asChild className="hidden md:flex">
                <Link href="#contact" onClick={scrollToSection('contact')}>
                  Get In Touch
                </Link>
              </Button>

              <button
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-background border-t border-border">
            <nav className="py-4 space-y-1 px-4">
              {navLinks.map((link) => (
                 <Button key={link.id} variant="ghost" className="w-full justify-start" asChild>
                    <Link href={`#${link.id}`} onClick={scrollToSection(link.id)}>
                      {link.label}
                    </Link>
                  </Button>
              ))}
              <Button asChild className="w-full mt-2">
                <Link href="#contact" onClick={scrollToSection('contact')}>Get In Touch</Link>
              </Button>
            </nav>
          </div>
        )}
      </header>
      {children}
    </div>
  );
}
