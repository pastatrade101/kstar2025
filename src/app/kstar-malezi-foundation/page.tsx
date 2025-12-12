import {
    ArrowRight,
    Target,
    Eye,
    Mail,
    HeartHandshake,
    Globe,
    Users,
    Search,
    Presentation,
  } from 'lucide-react';
  import { Button } from '@/components/ui/button';
  import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
  import Image from 'next/image';
  import Link from 'next/link';
  import { Badge } from '@/components/ui/badge';
  import ContactForm from '@/components/contact-form';
  import RecentNews from '@/components/recent-news';
  
  export default function KstarMaleziFoundationPage() {
  
    const objectives = [
      {
        icon: Search,
        title: "Identify Talent",
        description: "To screen and identify the gifted and talented people as early as possible."
      },
      {
        icon: Users,
        title: "Raise Awareness",
        description: "To enhance general public awareness and create a climate of acceptance that gifted, creative, and talented people are valuable global assets."
      },
      {
        icon: Globe,
        title: "Advocate for Recognition",
        description: "To persuade governments to recognize gifted people as a category for special attention in normal educational programmes."
      },
      {
        icon: Presentation,
        title: "Organize Programs",
        description: "To design, develop, and organize activities, forums, and programmes that bring together gifted, creative, and talented people worldwide."
      },
      {
        icon: HeartHandshake,
        title: "Provide Guidance",
        description: "To provide guidance, counselling, and consultation."
      }
    ];
  
    return (
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
                A Non-Profit Organization
                </Badge>

                <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                  <span className="bg-gradient-to-r from-k-star-red to-k-star-blue bg-clip-text text-transparent">Kstar Malezi Foundation</span>
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto lg:mx-0">
                  Nurturing the gifted, creative, and talented individuals of tomorrow.
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
                        Get Involved
                        </Link>
                    </Button>
                </div>
            </div>

              <div className="hidden lg:block relative h-[500px]">
                <Image
                    src="https://firebasestorage.googleapis.com/v0/b/studio-4061903538-cceaf.firebasestorage.app/o/73996.jpg?alt=media&token=887b0866-bea8-4499-84c3-ddb420e2db2d"
                    alt="Children in a learning environment"
                    fill
                    className="object-cover rounded-2xl shadow-xl"
                    priority
                    data-ai-hint="children learning charity"
                />
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="py-20 md:py-32 bg-secondary/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge>About The Foundation</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
                Our Purpose
              </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Kstar Malezi Foundation is a non-profit organization dedicated to fostering youth development through education, mentorship, and targeted programs for gifted individuals.
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
                    <p>A world where every talented and creative individual has the opportunity to reach their full potential.</p>
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
                    <p>To identify, nurture, and support gifted individuals from all backgrounds, providing them with the resources and guidance to succeed.</p>
                  </CardContent>
                </Card>
              </div>
                <div>
                <div className='rounded-2xl shadow-xl overflow-hidden'>
                  <Image src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&q=80" alt="Mentorship" width={800} height={600} className="w-full h-full object-cover" data-ai-hint="mentorship education"/>
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
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">Specific Objectives</h2>
              <p className="text-lg text-muted-foreground">
                Our work is guided by five key objectives to ensure we make a meaningful impact.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
              {objectives.map((service) => (
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
              <Card className="md:col-span-2 lg:col-span-3 bg-primary/5 border-primary/20">
                  <CardHeader>
                      <CardTitle>A Note on Our Scope</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <p className='text-muted-foreground'>These objectives cover our mission to support gifted individuals regardless of their background—be it disabled or able-bodied, from advantaged or disadvantaged families, or from developing or developed nations. We partner with national and international organizations to achieve these shared goals.</p>
                  </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Join Section */}
        <section id="join" className="py-20 md:py-32 bg-secondary/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge>Join The Foundation</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
              Become Part of Our Community
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Become part of a vibrant community dedicated to nurturing gifted, talented, and creative individuals. Together, we'll unlock your potential, ignite your passion, and build a strong path toward a bright and successful future.
            </p>
            <Button asChild size="lg">
              <Link href="#contact">Contact Us To Join</Link>
            </Button>
          </div>
        </section>
        
        <RecentNews />

        {/* Contact Section */}
        <section id="contact" className="py-20 md:py-32 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge>Get In Touch</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
              Contact the Foundation
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you want to join, partner, or learn more, we'd love to hear from you.
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
  );
}
