import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { courses, newsAndEvents } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ImageGenerator from '@/components/image-generator';

export default function Home() {
  const featuredCourses = courses.slice(0, 2);
  const latestNews = newsAndEvents.slice(0, 2);

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <header>
        <h1 className="font-headline text-4xl font-bold tracking-tight">
          Welcome to EduPro Hub
        </h1>
        <p className="text-muted-foreground mt-2">
          Your central place for learning, teaching, and growing.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-headline">Latest News & Events</CardTitle>
                <CardDescription>Stay updated with our community.</CardDescription>
              </div>
              <Button variant="ghost" asChild>
                <Link href="/news-events">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="grid gap-4">
              {latestNews.map((item) => (
                <Link href="/news-events" key={item.id} className="group flex gap-4 items-start p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <Image
                      src={item.image.imageUrl}
                      alt={item.title}
                      width={120}
                      height={80}
                      className="rounded-md object-cover"
                      data-ai-hint={item.image.imageHint}
                    />
                  <div className="flex-1">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                    <p className="text-sm mt-1 line-clamp-2">{item.description}</p>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-headline">Featured Courses</CardTitle>
                <CardDescription>Explore our most popular courses.</CardDescription>
              </div>
              <Button variant="ghost" asChild>
                <Link href="/courses">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              {featuredCourses.map((course) => (
                <Link href="/courses" key={course.id} className="group">
                  <Card className="overflow-hidden transition-all group-hover:shadow-lg">
                    <Image
                      src={course.image.imageUrl}
                      alt={course.title}
                      width={400}
                      height={200}
                      className="w-full h-32 object-cover"
                      data-ai-hint={course.image.imageHint}
                    />
                    <CardHeader>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription>{course.instructor}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <ImageGenerator />
        </div>
      </div>
    </div>
  );
}
