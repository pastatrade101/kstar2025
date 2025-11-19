
import {
  ArrowRight,
  Target,
  Eye,
  CheckCircle,
  HeartHandshake,
  Lightbulb,
  ThumbsUp,
  Scale,
  Users,
  Sparkles,
  Globe,
  TrendingUp,
  Award,
  Mail,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import HomeClient from './home-client';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import ContactForm from '@/components/contact-form';
import { initializeFirebase } from '@/firebase/server';
import { format } from 'date-fns';

type NewsEvent = {
    id: string;
    title: string;
    content: string;
    date: string;
    type: 'News' | 'Event';
    imageUrl: string;
  };
  
async function getRecentNewsAndEvents() {
    try {
      const { firestore } = initializeFirebase();
      const newsCollectionRef = firestore.collection('news_events');
      const newsQuery = newsCollectionRef.orderBy('date', 'desc').limit(3);
      const snapshot = await newsQuery.get();
  
      if (snapshot.empty) {
        return [];
      }
  
      const newsAndEvents = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
        } as NewsEvent;
      });
  
      return newsAndEvents;
    } catch (error) {
      console.error("Error fetching recent news and events:", error);
      return [];
    }
}


export default async function Home() {
  const currentYear = new Date().getFullYear();
  const recentNews = await getRecentNewsAndEvents();

  const coreValues = [
    { icon: Users, title: "Team Work", description: "We increase the ability to solve problems and obtain solutions in a more efficiently and effectively way." },
    { icon: HeartHandshake, title: "Trust", description: "Without trust there is no a firm foundation, realising this major value, Kstar is aiming at being reliable to the beneficiaries." },
    { icon: ThumbsUp, title: "Mutual Respect", description: "We respect the values, ideas and beliefs of others whilst not imposing our own on others." },
    { icon: Scale, title: "Integrity", description: "The company tells the truth, hence is accountable and reliable, and treats workers, stakeholders, and customers with respect and zeal." },
    { icon: Lightbulb, title: "Constructive Self-Criticism", description: "We are always looking for ways to improve and grow." },
    { icon: CheckCircle, title: "Honesty", description: "We believe in being truthful in all our endeavors." }
  ];

  const services = [
    { title: "Discovering & Promoting Creativity", icon: Sparkles, image: PlaceHolderImages.find(p => p.id === 'service-1'), description: "With the help of Kstar there would be a developmental model for promoting creative individuals as well as with their productivity in order to expand their concepts, talents, giftedness so as to include co-cognitive traits and to promote social capital." },
    { title: "Conducting Constructive Dialogues", icon: Users, image: PlaceHolderImages.find(p => p.id === 'service-2'), description: "This aims at general experience that suggests the best dialogues to unleash different views on the ongoing crosscutting issues within the nation as well as globally so as to gain different views and understanding." },
    { title: "Connecting People Globally", icon: Globe, image: PlaceHolderImages.find(p => p.id === 'service-3'), description: "The mutual aim is to connect people and the ideas from different parts of the world through global innovation plattforms for the current as well as the next generation and the forth coming ones." },
    { title: "Business Idea Competitions", icon: Lightbulb, image: PlaceHolderImages.find(p => p.id === 'service-4'), description: "These business ideas tend to attract investments, bring people with the same objectives and interests together, grow existing businesses." },
    { title: "Talent Development", icon: TrendingUp, image: PlaceHolderImages.find(p => p.id === 'service-5'), description: "Focusing on how average performance can become over achievers, this is done to the both created and borned talents because any talent can be developed and honed." },
    { title: "Event Production & Management", icon: Award, image: PlaceHolderImages.find(p => p.id === 'service-6'), description: "Any entertainment event should have a clear and a well understood master plan so as to be achieved smoothly. The most important is to brand the event to be conducted as well as the venue where it will be taking place." },
  ];

  return (
    <HomeClient>
      <main>
        {/* Hero Section */}
        <section
          id="home"
          className="relative pt-32 pb-20 flex items-center justify-center overflow-hidden min-h-[80vh]"
        >
          <div className="absolute inset-0 z-0">
             <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80"
              alt="Creative individuals working together"
              fill
              className="object-cover"
              priority
              data-ai-hint="creative team collaboration"
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>


          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <Badge
              variant="outline"
              className="mb-6 bg-white/10 text-white border-white/20 font-medium"
            >
              Welcome to Kstar International
            </Badge>

            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
              Turn Your Desires Into Reality
            </h1>

            <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-3xl mx-auto">
              Kstar International Limited is established to serve the creative individual to fullfil their Purpose, Passion and Plans. The company is the bridge and place of hope for all creative induviduals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="group">
                <Link href="#about">
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="#contact">
                  Contact Us
                </Link>
              </Button>
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
                Founded on 29th June, 2020 by Founder and CEO Mwacha, Joseph Alphonce and the Company Director Robert A. Mwacha. Our motto is "Turn your desires into reality" or "Badili matamanio yako kuwa kweli".
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
                    <p>To make a better life for the creative individuals.</p>
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
                   <p>To support people with creative approach and transformative ideas to contribute solutions and make impact to the community.</p>
                  </CardContent>
                </Card>
              </div>
               <div>
                 <Image src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80" alt="Our Team" width={800} height={600} className="rounded-2xl shadow-xl" data-ai-hint="professional team meeting"/>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 md:py-32 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <Badge>Our Services</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">What We Do</h2>
              <p className="text-lg text-muted-foreground">
                We offer a range of services designed to discover, promote, and support creative individuals and their ideas.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
              {services.map((service) => (
                <Card key={service.title} className="bg-card/50 border-border/50 overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-video overflow-hidden">
                    <Image
                      src={service.image?.imageUrl ?? ''}
                      alt={service.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      data-ai-hint={service.image?.imageHint}
                    />
                  </div>
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
        
        {/* Vimba na Kstar Section */}
        <section id="vimba-na-kstar" className="py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-video">
                  <Image src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&q=80" alt="Entrepreneurs working" fill className="object-cover rounded-2xl shadow-2xl" data-ai-hint="young entrepreneurs business"/>
              </div>
              <div>
                <Badge>Signature Program</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
                  Vimba Na Kstar (VK)
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  A Business Idea Challenge in Tanzania supporting youth aged 18-45. We provide financial support to initiated businesses, enabling young entrepreneurs to turn their desires into reality and stimulate urban-rural economies.
                </p>
                <Button asChild size="lg" variant="outline">
                    <Link href="#">Learn More about VK <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* News & Events Section */}
        {recentNews.length > 0 && (
            <section id="news" className="py-20 md:py-32 bg-secondary/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto">
                        <Badge>News & Events</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">Stay Updated</h2>
                        <p className="text-lg text-muted-foreground">
                            Check out the latest news and happenings from Kstar International.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                        {recentNews.map((item) => (
                            <Card key={item.id} className="flex flex-col overflow-hidden group">
                                <Link href="/news-events" className="block aspect-video overflow-hidden">
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.title}
                                        width={600}
                                        height={400}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </Link>
                                <CardHeader>
                                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                                        <span>{format(new Date(item.date as string), 'PPP')}</span>
                                        <Badge variant={item.type === 'Event' ? 'default' : 'secondary'}>
                                            {item.type}
                                        </Badge>
                                    </div>
                                    <CardTitle className="mt-2">{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-muted-foreground text-sm line-clamp-3">{item.content}</p>
                                </CardContent>
                                <div className="p-6 pt-0">
                                    <Button variant="link" asChild className="p-0">
                                        <Link href="/news-events">Read More <ArrowRight className="ml-2" /></Link>
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                    <div className="text-center mt-16">
                        <Button asChild size="lg">
                            <Link href="/news-events">View All News & Events</Link>
                        </Button>
                    </div>
                </div>
            </section>
        )}

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
      <footer className="bg-foreground text-background">
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
              <h3 className="font-semibold mb-4 text-white">
                Quick Links
              </h3>
              <ul className="space-y-2.5">
                {[
                  { href: '#home', label: 'Home' },
                  { href: '#about', label: 'About Us' },
                  { href: '#services', label: 'Services' },
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
                  <span className="text-muted-foreground">info@kstar.com</span>
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
                  { icon: Instagram, href: '#' },
                  { icon: Linkedin, href: '#' },
                  { icon: Youtube, href: '#' },
                ].map((social, i) => (
                  <Button asChild key={i} variant="outline" size="icon" className="bg-white/10 text-white hover:bg-white/20">
                    <a href={social.href}>
                      <social.icon className="h-5 w-5" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border/50">
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
