import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { courses } from '@/lib/data';
import Image from 'next/image';
import { Clock, User } from 'lucide-react';

export default function CoursesPage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <header>
        <h1 className="font-headline text-4xl font-bold tracking-tight">
          Course Catalog
        </h1>
        <p className="text-muted-foreground mt-2">
          Explore our wide range of courses and find your passion.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="flex flex-col overflow-hidden">
            <Image
              src={course.image.imageUrl}
              alt={course.title}
              width={600}
              height={400}
              className="w-full h-48 object-cover"
              data-ai-hint={course.image.imageHint}
            />
            <CardHeader>
              <CardTitle className="font-headline text-2xl">{course.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{course.instructor}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{course.schedule}</span>
              </div>
              <p className="text-foreground/80">{course.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
