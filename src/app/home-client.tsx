'use client';

import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  ArrowRight,
  Search,
  Mail,
  Phone,
  MessageSquare,
  Send,
  FileText,
  Calendar,
  CheckCircle,
  Home as HomeIcon,
  Info,
  Briefcase,
  Newspaper,
  MessageCircle as MessageCircleIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function HomeClient({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { toast } = useToast();

  const navLinks = [
    { id: 'nyumbani', label: 'Nyumbani', icon: HomeIcon },
    { id: 'historia', label: 'Kuhusu Sisi', icon: Info },
    { id: 'matukio', label: 'Matukio', icon: Briefcase },
    { id: 'ujumbe', label: 'Ujumbe', icon: Newspaper },
    { id: 'maoni', label: 'Wasiliana', icon: MessageCircleIcon },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const headerHeight = isScrolled ? 'h-16' : 'h-24';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 dark:from-gray-900 dark:via-blue-950/20 dark:to-gray-900">
      {/* Top Contact Bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-blue-950 text-white border-b border-blue-900 transition-transform duration-300 ${
          isScrolled ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-sm">
              <Phone size={16} className="text-blue-300" />
              <span className="hidden sm:inline">Hotline:</span>
              <a
                href="tel:1-001-234-5678"
                className="hover:text-blue-300 transition-colors font-medium"
              >
                1-001-234-5678
              </a>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm">
              <Mail size={16} className="text-blue-300" />
              <span className="hidden sm:inline">Email:</span>
              <a
                href="mailto:hello@dream-theme.com"
                className="hover:text-blue-300 transition-colors font-medium"
              >
                hello@dream-theme.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden lg:block">
              <Search
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search..."
                className="w-48 h-8 pl-9 pr-3 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder:text-gray-400 focus:outline-none focus:bg-white/20 focus:border-white/30 transition-all"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const value = (e.target as HTMLInputElement).value;
                    if (value.trim()) {
                      scrollToSection('search');
                      (e.target as HTMLInputElement).value = '';
                    }
                  }
                }}
              />
            </div>
            <button
              className="lg:hidden p-1.5 hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => scrollToSection('search')}
            >
              <Search size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-gray-800/50 translate-y-0'
            : 'bg-transparent translate-y-12'
        } ${headerHeight}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-gray-900 dark:text-white">
                  Taasisi Yetu
                </h1>
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  Mshirika wako wa kuaminika
                </p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`flex items-center gap-2 transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 text-gray-800 dark:text-gray-300`}
                >
                  <link.icon size={16} />
                  <span className="text-sm font-medium">{link.label}</span>
                </button>
              ))}
            </nav>

            <button
              className={`md:hidden ${
                isScrolled ? 'text-gray-700 dark:text-gray-300' : 'text-gray-800 dark:text-white'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800">
            <nav className="py-4 space-y-1 px-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="w-full flex items-center gap-3 text-left px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
                >
                  <link.icon size={16} />
                  <span>{link.label}</span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>
      {children}
    </div>
  );
}
