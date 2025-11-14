import {
  ArrowRight,
  Target,
  Eye,
  CheckCircle,
  Quote,
  MessageSquare,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Phone,
  Sparkles,
  Users,
  TrendingUp,
  MapPin,
  HeartHandshake,
  Lightbulb,
  ThumbsUp,
  Scale,
  Goal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import HomeClient from './home-client';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default async function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <HomeClient>
      <main className="pt-36">
        {/* Hero Section */}
        <section
          id="home"
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80"
              alt="Creative individuals working together"
              layout="fill"
              objectFit="cover"
              className="w-full h-full object-cover scale-110"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950/95 via-blue-900/90 to-indigo-900/85"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center text-white mb-16">
              <div className="inline-block mb-6">
                <Badge
                  variant="outline"
                  className="px-5 py-2.5 bg-white/10 backdrop-blur-md border-white/20 text-sm font-medium shadow-xl"
                >
                  ✨ Kstar International Limited
                </Badge>
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                Turn Your Desires Into Reality
              </h1>

              <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
                Kstar International is the bridge and place of hope for all
                creative individuals. Discover your life purpose, fulfill your
                passion, and make the community proud.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
                <Link href="#about">
                  <Button
                    size="lg"
                    className="bg-white text-blue-900 hover:bg-blue-50 shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 group px-8 py-6 text-base"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="#contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 hover:border-white/50 shadow-2xl transition-all duration-300 hover:scale-105 px-8 py-6 text-base"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
            
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 p-8">
                <CardContent className='p-0'>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Why Work With Kstar International?</h3>
                <p className="text-blue-200 text-center leading-relaxed">
                "Kstar International wants to turn your desires into reality. Every activity conducted by the company aims at meeting every individual's dream. The company has honest people who are well-organized to carry out their duties professionally. In addition, it has strong systems in place to manage and carry out all activities without compromising the grievances of the beneficiaries. Welcome to Kstar International, we feel proud to work with you"
                </p>
                </CardContent>
            </Card>
          </div>
        </section>

        {/* About Us Section */}
        <section
          id="about"
          className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-950/20"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4">
                About Us
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
                Our Story &amp; Purpose
              </h2>
              <div className="max-w-3xl mx-auto text-gray-600 dark:text-gray-400 space-y-4">
                <p className="text-lg">
                  Kstar International Limited was founded on 29th June, 2020 by
                  Founder and CEO Mwacha, Joseph Alphonce and the Company
                  Director Robert A. Mwacha.
                </p>
                <p>
                  Our motto is "Turn your desires into reality" or "Badili
                  matamanio yako kuwa kweli".
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-500 hover:shadow-2xl group relative overflow-hidden">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Our Vision
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    To make a better life for the creative individuals.
                  </p>
                </div>
              </Card>

              <Card className="p-8 h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-100 dark:border-gray-800 hover:border-green-200 dark:hover:border-green-800 transition-all duration-500 hover:shadow-2xl group relative overflow-hidden">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Our Mission
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    To support people with creative approach and transformative
                    ideas to contribute solutions and make impact to the
                    community.
                  </p>
                </div>
              </Card>

              <Card className="p-8 h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-100 dark:border-gray-800 hover:border-purple-200 dark:hover:border-purple-800 transition-all duration-500 hover:shadow-2xl group relative overflow-hidden">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Our Motto
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    "Turn your desires into reality"
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-slate-50 dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
                What We Do
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                We offer a range of services designed to discover, promote, and support creative individuals and their ideas.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    { title: "Discovering & Promoting Creativity", description: "A developmental model to expand concepts, talents, and social capital." },
                    { title: "Conducting Constructive Dialogues", description: "Unleashing diverse views on cross-cutting issues to gain new understanding." },
                    { title: "Connecting People Globally", description: "Building global innovation platforms for cross-sector collaboration." },
                    { title: "Organizing Business Idea Competitions", description: "Attracting investment and bringing like-minded people together." },
                    { title: "Promoting Talent Development", description: "Helping individuals realize their potential and develop skills for excellence." },
                    { title: "Organizing Fitness Competitions", description: "Growing the fitness community and fostering a competitive spirit." },
                    { title: "Recognizing and Awarding Excellence", description: "Motivating individuals and teams by acknowledging their contributions." },
                    { title: "Event Production & Management", description: "Planning and promoting small to large-scale entertainment events." },
                    { title: "Logistics & Transport Services", description: "Helping people and businesses move goods and services efficiently." },
                    { title: "IT & Computer Services", description: "Providing outstanding IT support to increase productivity and satisfaction." },
                ].map((service, index) => (
                    <Card key={index} className="bg-white dark:bg-gray-800/50">
                        <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </div>
        </section>
        
        {/* Core Values Section */}
        <section
          id="values"
          className="py-24 bg-white dark:bg-gray-900"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
                Our Core Values
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
              {[
                  { icon: Users, title: "Team Work", description: "We increase the ability to solve problems efficiently and effectively." },
                  { icon: HeartHandshake, title: "Trust", description: "We aim to be reliable to our beneficiaries, building a firm foundation." },
                  { icon: ThumbsUp, title: "Mutual Respect", description: "We respect the values, ideas, and beliefs of others." },
                  { icon: Scale, title: "Integrity", description: "We tell the truth, and treat everyone with respect and zeal." },
                  { icon: Lightbulb, title: "Constructive Self-Criticism", description: "We are always looking for ways to improve and grow." },
                  { icon: CheckCircle, title: "Honesty", description: "We believe in being truthful in all our endeavors." }
              ].map((value, index) => (
                <div key={index}>
                    <div className="inline-block bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mb-4">
                        <value.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Objectives Section */}
        <section id="objectives" className="py-24 bg-slate-50 dark:bg-gray-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
                    Our Objectives
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-lg">
                    We are committed to a wide range of objectives aimed at fostering creativity, talent, and entrepreneurship within the community and beyond.
                </p>
                </div>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                    {[
                        "Discover and promote creative individuals in diverse fields.",
                        "Conduct constructive dialogues on contentious issues.",
                        "Connect people globally to develop entrepreneurial skills.",
                        "Organize business idea competitions for students and the community.",
                        "Promote talent development and create professional opportunities.",
                        "Organise fitness and wellness competitions to improve lives.",
                        "Recognize and award the best individuals and groups in key areas.",
                        "Plan, promote, and produce entertainment events.",
                        "Perform information technology and computer service activities.",
                        "Help people and businesses move their goods and services.",
                    ].map((objective, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <Goal className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                            <p className="text-gray-700 dark:text-gray-300">{objective}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>


        {/* Contact Section */}
        <section id="contact" className="py-24 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl mb-6 shadow-2xl">
                <MessageSquare className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                Get In Touch
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                We welcome your questions, feedback, and collaboration ideas.
                Contact us today to learn more about our work.
              </p>
            </div>

            <div>
              <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-100 dark:border-gray-700 shadow-2xl">
                <CardContent className="p-8">
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="john@example.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="Question about your services" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Your message here..." rows={5} />
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <span className="font-bold text-white text-lg">
                  Kstar International
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Thank you for visiting Kstar International. We feel proud to serve you.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2.5">
                {[
                  { href: '#home', label: 'Home' },
                  { href: '#about', label: 'About Us' },
                  { href: '#services', label: 'Services' },
                  { href: '#objectives', label: 'Objectives' },
                  { href: '#contact', label: 'Contact' },
                ].map(link => (
                    <li key={link.href}>
                        <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                        >
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        {link.label}
                        </Link>
                    </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">
                    S.L.P 12345, Dar es Salaam, Tanzania
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                  <span className="text-gray-400">+255 123 456 789</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                  <span className="text-gray-400">info@kstar.com</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">
                Follow Us
              </h3>
              <p className="text-gray-400 mb-4 text-sm">
                Stay connected on social media.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, color: 'hover:bg-blue-600' },
                  { icon: Twitter, color: 'hover:bg-sky-500' },
                  { icon: Instagram, color: 'hover:bg-pink-600' },
                  { icon: Linkedin, color: 'hover:bg-blue-700' },
                  { icon: Youtube, color: 'hover:bg-red-600' },
                ].map((social, i) => (
                  <a
                    key={i}
                    href="#"
                    className={`w-11 h-11 bg-gray-800 rounded-xl flex items-center justify-center ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
              <p className="text-gray-400">
                © {currentYear} Kstar International Limited. All rights reserved.
              </p>
              <div className="flex gap-6">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Use
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </HomeClient>
  );
}
