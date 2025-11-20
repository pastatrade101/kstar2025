

import {
  ArrowRight,
  Target,
  Eye,
  CheckCircle,
  Lightbulb,
  Award,
  Mail,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Star,
  Zap,
  Users,
  BarChart,
  Repeat
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import HomeClient from './home-client';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import ContactForm from '@/components/contact-form';
import RecentNews from '@/components/recent-news';

export default function Home() {
  const currentYear = new Date().getFullYear();

  const coreValues = [
    { icon: Lightbulb, title: "Innovation", description: "We embrace creativity and new ideas to solve challenges." },
    { icon: Award, title: "Excellence", description: "We strive for the highest standards in performance and results." },
    { icon: Zap, title: "Empowerment", description: "We inspire and support people to reach their full potential." },
    { icon: Users, title: "Collaboration", description: "We believe teamwork and sharing knowledge leads to greater success." },
    { icon: BarChart, title: "Data-Driven Decisions", description: "We use insights and analytics to make informed choices." },
    { icon: Repeat, title: "Resilience", description: "We overcome obstacles and keep moving forward toward our goals." }
  ];

  const departments = [
    { title: "Department of Creativity", icon: Lightbulb, image: PlaceHolderImages.find(p => p.id === 'dept-creativity'), description: "Fostering new ideas and artistic expression to solve challenges and inspire change." },
    { title: "Department of Sports", icon: Award, image: PlaceHolderImages.find(p => p.id === 'dept-sports'), description: "Developing athletic talent and promoting physical excellence through dedicated programs." },
    { title: "Department of Music", icon: Star, image: PlaceHolderImages.find(p => p.id === 'dept-music'), description: "Nurturing musical talent and providing a platform for artists to create and perform." },
  ];

  const kstarGroupLinks = [
    { href: "/kstar-international", label: "Kstar International" },
    { href: "/kstar-malezi-foundation", label: "Kstar Malezi Foundation" },
    { href: "/clickdata-tanzania", label: "ClickData Tanzania" },
  ];

  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-main');

  return (
    <HomeClient>
      <main>
        {/* Hero Section */}
        <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div>
                  <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                    <span className="text-sm font-medium">Kstar (T) Group</span>
                  </div>
                  
                  <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                    Turning Passion into{' '}
                    <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                      Performance
                    </span>{' '}
                    Through Insight
                  </h1>

                  <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                    Our mission is to connect passion with purpose through creativity, sports, and innovation.
                  </p>

                  <div className="flex flex-wrap gap-4 mb-12">
                    <Button size="lg" className="bg-gradient-to-r from-primary to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-xl shadow-primary/20 group">
                      Learn More
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button size="lg" variant="outline" className="border-2 border-slate-300 hover:border-primary/80 hover:text-primary">
                      Contact Us
                    </Button>
                  </div>

                  {/* Quick Links */}
                  <div className="flex flex-wrap gap-6">
                    {kstarGroupLinks.map((org, index) => (
                      <Link
                        key={index}
                        href={org.href}
                        className="group flex items-center gap-2 text-slate-600 hover:text-primary transition-colors"
                      >
                        <span className="text-sm font-medium">{org.label}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Right Content - Image */}
                <div className="relative">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <Image 
                      src={heroImage?.imageUrl ?? ''}
                      alt={heroImage?.description ?? 'Professional workspace'}
                      width={1080}
                      height={1200}
                      className="w-full h-full md:h-[600px] object-cover"
                      data-ai-hint={heroImage?.imageHint}
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                  </div>
                  
                  <div
                    className="absolute -bottom-8 -left-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-6"
                  >
                    <div className="text-4xl font-bold text-primary mb-1">3</div>
                    <div className="text-sm text-slate-600">Organizations</div>
                  </div>
                  
                  <div
                    className="absolute -top-8 -right-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-6"
                  >
                    <div className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent mb-1">100%</div>
                    <div className="text-sm text-slate-600">Committed</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        {/* About Us Section */}
        <section id="about" className="py-20 md:py-32 bg-secondary/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge>About Us</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
                Our Story, Mission, and Vision
              </h2>
               <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Founded in 2025, we are driven by a passion for creativity, sports and data. Our mission is to help people fulfill their dreams by turning passion into performance through insight.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <Card className="bg-background border-border/50">
                  <CardHeader className="flex-row gap-4 items-center">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                      <Eye className="w-6 h-6" />
                    </div>
                    <CardTitle>Our Vision</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Helping People Turn Their Dreams into Reality.</p>
                  </CardContent>
                </Card>
                <Card className="bg-background border-border/50">
                  <CardHeader className="flex-row gap-4 items-center">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6" />
                    </div>
                    <CardTitle>Our Mission</CardTitle>
                  </CardHeader>
                  <CardContent>
                   <p>To Connect Passion with Purpose Through Creativity, Sports, And Innovation.</p>
                  </CardContent>
                </Card>
              </div>
               <div>
                <div className='rounded-2xl shadow-xl overflow-hidden'>
                  <Image src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80" alt="Our Team" width={800} height={600} className="w-full h-full object-cover" data-ai-hint="professional team meeting"/>
                </div>
              </div>
            </div>
             <div className="mt-16 text-center max-w-3xl mx-auto">
                <p className="text-lg text-muted-foreground">
                    Though young, we are committed to innovation, excellence and empowerment, providing tools, knowledge and inspiration that help individuals and teams reach their full potential.
                </p>
             </div>
          </div>
        </section>

        {/* Departments Section */}
        <section id="services" className="py-20 md:py-32 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <Badge>Our Departments</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">Where Passion Meets Purpose</h2>
              <p className="text-lg text-muted-foreground">
                We empower talent through specialized departments focused on creativity, sports, and innovation.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {departments.map((dept) => (
                <Card key={dept.title} className="bg-card/50 border-border/50 overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-video overflow-hidden">
                    <Image
                      src={dept.image?.imageUrl ?? ''}
                      alt={dept.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      data-ai-hint={dept.image?.imageHint}
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 mt-1 bg-primary/10 text-primary rounded-md flex items-center justify-center">
                        <dept.icon className="w-5 h-5" />
                      </div>
                      <span className="flex-1">{dept.title}</span>
                    </CardTitle>
                  </CardHeader>
                   <CardContent>
                    <p className="text-muted-foreground text-sm">{dept.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section id="values" className="py-20 md:py-32 bg-secondary/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <Badge>Core Values</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">The Principles That Guide Us</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
              {coreValues.map((value) => (
                <div key={value.title} className="bg-background p-6 rounded-lg text-center shadow-sm hover:shadow-lg transition-shadow">
                  <div className="inline-block bg-primary/10 text-primary p-3 rounded-full mb-4">
                    <value.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <RecentNews />

        {/* Contact Section */}
        <section id="contact" className="py-20 md:py-32 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge>Get In Touch</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
              Let's Build Together
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We welcome your questions, feedback, and collaboration ideas. Contact us today to learn more about our work.
            </p>
          </div>
          <div className="max-w-2xl mx-auto mt-12 px-4">
            <Card>
              <CardContent className="p-8">
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-100 text-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-xl flex items-center justify-center font-bold">
                  K
                </div>
                <span className="font-bold text-lg">
                  Kstar International
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Thank you for visiting Kstar International. We feel proud to serve you.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-foreground">
                Quick Links
              </h3>
              <ul className="space-y-2.5">
                {[
                  { href: '#home', label: 'Home' },
                  { href: '#about', label: 'About Us' },
                  { href: '#services', label: 'Departments' },
                  { href: '#values', label: 'Core Values' },
                  { href: '#contact', label: 'Contact' },
                ].map(link => (
                    <li key={link.href}>
                        <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                        >
                        {link.label}
                        </Link>
                    </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-foreground">Contact Us</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    S.L.P 12345, Dar es Salaam, Tanzania
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">+255 123 456 789</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">info@kstar.com</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-foreground">
                Follow Us
              </h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Stay connected on social media.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, href: '#' },
                  { icon: Twitter, href: '#' },
                  { icon: Instagram, href: 'https://www.instagram.com/kstar_international/' },
                  { icon: Linkedin, href: '#' },
                  { icon: Youtube, href: '#' },
                ].map((social, i) => (
                  <a href={social.href} key={i} className="text-muted-foreground hover:text-primary transition-colors">
                      <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
              <p className="text-muted-foreground">
                © {currentYear} Kstar International Limited. All rights reserved.
              </p>
              <div className="flex gap-6">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Use
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </HomeClient>
  );
}
