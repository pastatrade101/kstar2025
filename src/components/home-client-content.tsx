
'use client';

import ContactForm from '@/components/contact-form';
import RecentNews from '@/components/recent-news';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function HomeClientContent() {
  return (
    <>
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
    </>
  );
}
