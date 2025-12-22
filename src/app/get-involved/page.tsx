'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useFirestore } from '@/firebase';
import { collection, serverTimestamp, addDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useMemoFirebase } from '@/firebase/provider';
import { Loader2, HeartHandshake } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phone: z.string().optional(),
  type: z.enum(['Volunteer', 'Partner', 'Supporter']),
  skills: z.string().optional(),
  availability: z.string().optional(),
});

export default function GetInvolvedPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();
  const registrationsCollectionRef = useMemoFirebase(
    () => (firestore ? collection(firestore, 'volunteer_registrations') : null),
    [firestore]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      type: 'Volunteer',
      skills: '',
      availability: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!registrationsCollectionRef) return;
    setIsSubmitting(true);
    try {
      const dataToSave = {
        ...values,
        registeredAt: serverTimestamp(),
      };
      await addDoc(registrationsCollectionRef, dataToSave);
      
      toast({
        title: 'Registration Successful!',
        description: "Thank you for your interest. We'll be in touch soon.",
      });
      form.reset();
    } catch (error) {
      console.error('Error submitting registration:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request. Please try again.',
      });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <div className="py-20 md:py-32 pt-40 md:pt-48">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge>Join Our Mission</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
                Get Involved
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Whether you're looking to volunteer your time, partner with us on a project, or support our cause, we welcome your contribution. Fill out the form below to get started.
            </p>
        </div>
        <div className="max-w-2xl mx-auto mt-12 px-4">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <HeartHandshake className="text-primary"/>
                        Registration Form
                    </CardTitle>
                    <CardDescription>Tell us a bit about yourself and how you'd like to contribute.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                        <Input type="email" placeholder="john@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number (Optional)</FormLabel>
                                        <FormControl>
                                        <Input placeholder="+1 234 567 890" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>I want to be a...</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select your role" />
                                                </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                <SelectItem value="Volunteer">Volunteer</SelectItem>
                                                <SelectItem value="Partner">Partner</SelectItem>
                                                <SelectItem value="Supporter">Supporter</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            
                            <FormField
                            control={form.control}
                            name="skills"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Skills & Interests (Optional)</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="e.g., Event planning, graphic design, fundraising..." {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="availability"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Availability (Optional)</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="e.g., Weekends, weekday evenings, specific dates..." {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />

                            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Submit Registration
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
