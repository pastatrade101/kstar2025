
import {
    ArrowRight,
    Target,
    Eye,
    Mail,
    MapPin,
    Phone,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Youtube,
    BookOpen,
    BrainCircuit,
    DatabaseZap
  } from 'lucide-react';
  import { Button } from '@/components/ui/button';
  import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
  import Image from 'next/image';
  import Link from 'next/link';
  import HomeClient from '../home-client';
  import { Badge } from '@/components/ui/badge';
  import ContactForm from '@/components/contact-form';
  import RecentNews from '@/components/recent-news';
  
  export default function ClickDataTanzaniaPage() {
    const currentYear = new Date().getFullYear();
  
    const services = [
      {
        icon: BookOpen,
        title: "Build Data Literacy Skills",
        description: "Equip individuals with practical skills to understand, interpret and use data and statistics in decision-making, problem-solving and daily activities."
      },
      {
        icon: BrainCircuit,
        title: "Promote Evidence-Based Thinking",
        description: "Encourage learners and communities to rely on factual, data-driven insights when planning, evaluating progress and addressing challenges."
      },
      {
        icon: DatabaseZap,
        title: "Strengthen Capacity to Generate and Use Quality Data",
        description: "Train users in basic data collection, analysis, visualization and reporting techniques to ensure they can produce reliable information and apply it to improve services and outcomes."
      }
    ];
  
    return (
      <HomeClient>
        <main>
          {/* Hero Section */}
          <section
            id="home"
            className="relative pt-32 md:pt-40"
          >
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 lg:gap-12 lg:items-center">
              <div className="py-12 lg:py-20 text-center lg:text-left">
                  <Badge
                  variant="outline"
                  className="mb-6 bg-secondary text-secondary-foreground"
                  >
                  Harnessing the Power of Data
                  </Badge>
  
                  <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                    ClickData Tanzania
                  </h1>
  
                  <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto lg:mx-0">
                    Providing innovative analytics and business solutions through data.
                  </p>
  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                      <Button asChild size="lg" className="group">
                          <Link href="#about">
                          Learn More
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                          </Link>
                      </Button>
                      <Button asChild size="lg" variant="secondary">
                          <Link href="#contact">
                          Get In Touch
                          </Link>
                      </Button>
                  </div>
              </div>
  
               <div className="hidden lg:block relative h-[500px]">
                  <Image
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80"
                      alt="Data analytics dashboard"
                      fill
                      className="object-cover rounded-2xl shadow-xl"
                      priority
                      data-ai-hint="data analytics charts"
                  />
              </div>
            </div>
          </section>
  
          {/* About Us Section */}
          <section id="about" className="py-20 md:py-32 bg-secondary/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <Badge>About ClickData</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
                  Our Data-Driven Purpose
                </h2>
                 <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    ClickData Tanzania is committed to empowering organizations and individuals by turning raw data into actionable insights and strategic advantages.
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
                      <p>To be the leading catalyst for data-driven transformation in Tanzania and beyond.</p>
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
                     <p>To provide innovative analytics, build data literacy, and foster a culture of evidence-based decision-making for our clients and community.</p>
                    </CardContent>
                  </Card>
                </div>
                 <div>
                  <div className='rounded-2xl shadow-xl overflow-hidden'>
                    <Image src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80" alt="Team analyzing data" width={800} height={600} className="w-full h-full object-cover" data-ai-hint="team data analysis"/>
                  </div>
                </div>
              </div>
            </div>
          </section>
  
          {/* What we do Section */}
          <section id="services" className="py-20 md:py-32 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto">
                <Badge>What We Do</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">Our Core Services</h2>
                <p className="text-lg text-muted-foreground">
                  We empower our partners through three key data-focused services.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                {services.map((service) => (
                  <Card key={service.title} className="bg-card/50 border-border/50 overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 mt-1 bg-primary/10 text-primary rounded-md flex items-center justify-center">
                          <service.icon className="w-5 h-5" />
                        </div>
                        <span className="flex-1">{service.title}</span>
                      </CardTitle>
                    </CardHeader>
                     <CardContent>
                      <p className="text-muted-foreground text-sm">{service.description}</p>
                    </CardContent>
                  </Card>
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
                Contact ClickData
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Have a data challenge? Let's talk about how we can help you unlock its potential.
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
        <footer className="bg-foreground text-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid md:grid-cols-4 gap-10 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-xl flex items-center justify-center font-bold">
                    C
                  </div>
                  <span className="font-bold text-lg">
                    ClickData Tanzania
                  </span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Transforming data into decisions.
                </p>
              </div>
  
              <div>
                <h3 className="font-semibold mb-4 text-white">
                  Quick Links
                </h3>
                <ul className="space-y-2.5">
                  {[
                    { href: '#home', label: 'Home' },
                    { href: '#about', label: 'About Us' },
                    { href: '#services', label: 'Our Services' },
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
                <h3 className="font-semibold mb-4 text-white">Contact Us</h3>
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
                    <span className="text-muted-foreground">info@clickdata.tz</span>
                  </li>
                </ul>
              </div>
  
              <div>
                <h3 className="font-semibold mb-4 text-white">
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
  
            <div className="pt-8 border-t border-border/50">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                <p className="text-muted-foreground">
                  © {currentYear} ClickData Tanzania. All rights reserved.
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
  