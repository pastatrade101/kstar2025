import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { newsAndEvents } from '@/lib/data';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

export default function NewsAndEventsPage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <header>
        <h1 className="font-headline text-4xl font-bold tracking-tight">
          News & Events
        </h1>
        <p className="text-muted-foreground mt-2">
          Stay up-to-date with everything happening at EduPro Hub.
        </p>
      </header>

      <div className="space-y-8">
        {newsAndEvents.map((item) => (
          <Card key={item.id} className="overflow-hidden md:flex md:flex-row">
            <div className="md:w-1/3">
              <Image
                src={item.image.imageUrl}
                alt={item.title}
                width={600}
                height={400}
                className="w-full h-48 md:h-full object-cover"
                data-ai-hint={item.image.imageHint}
              />
            </div>
            <div className="md:w-2/3">
              <CardHeader>
                <div className='flex items-center justify-between'>
                    <CardDescription>{item.date}</CardDescription>
                    <Badge variant={item.type === 'Event' ? 'default' : 'secondary'}>
                        {item.type}
                    </Badge>
                </div>
                <CardTitle className="font-headline text-2xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">{item.description}</p>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
