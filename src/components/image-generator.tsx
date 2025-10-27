'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Image as ImageIcon, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateContentImage } from '@/ai/flows/generate-content-images';
import Image from 'next/image';
import { Skeleton } from './ui/skeleton';

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please enter a prompt to generate an image.',
      });
      return;
    }

    setIsLoading(true);
    setImageUrl('');

    try {
      const result = await generateContentImage({ prompt });
      setImageUrl(result.imageUrl);
    } catch (error) {
      console.error('Image generation error:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate image. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <ImageIcon />
          Content Creator Toolkit
        </CardTitle>
        <CardDescription>
          Generate images for your content using AI.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="aspect-video w-full overflow-hidden rounded-lg border bg-muted">
            {isLoading ? (
              <Skeleton className="h-full w-full" />
            ) : imageUrl ? (
              <Image
                src={imageUrl}
                alt={prompt}
                width={500}
                height={281}
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                <ImageIcon className="h-16 w-16" />
              </div>
            )}
          </div>
          <Textarea
            placeholder="e.g., 'A futuristic university campus at sunset, digital art'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            disabled={isLoading}
          />
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Generate Image
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
