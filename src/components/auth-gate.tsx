'use client';
import { useState } from 'react';
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
import { Input } from '@/components/ui/input';
import { useAuth } from '@/firebase';
import { initiateEmailSignIn, initiateEmailSignUp } from '@/firebase/non-blocking-login';
import { Loader2, UserPlus, LogIn } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { updateProfile } from 'firebase/auth';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export function AuthGate() {
  const [isLoginView, setIsLoginView] = useState(true);
  const auth = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  function onLoginSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    initiateEmailSignIn(auth, values.email, values.password);
    // The onAuthStateChanged listener will handle success/failure redirects and state changes.
    // We can add a timeout to reset loading state in case of silent failures.
    setTimeout(() => setIsLoading(false), 5000); 
  }

  function onRegisterSubmit(values: z.infer<typeof registerSchema>) {
    setIsLoading(true);
    initiateEmailSignUp(auth, values.email, values.password);
    
    // After sign-up is initiated, we listen for the new user to be created,
    // and then update their profile with the name.
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        updateProfile(user, { displayName: values.name })
          .then(() => {
            toast({ title: "Account Created!", description: "You are now logged in."});
            setIsLoading(false);
          })
          .catch((error) => {
            toast({ variant: 'destructive', title: "Profile Update Failed", description: error.message });
            setIsLoading(false);
          });
        unsubscribe(); // Unsubscribe after we've handled the user creation
      }
    });

    // Timeout to prevent loading forever
    setTimeout(() => {
        setIsLoading(false);
        unsubscribe();
    }, 10000);
  }

  return (
    <Card>
        <CardHeader>
            <CardTitle>{isLoginView ? 'Sign In to Apply' : 'Create an Account'}</CardTitle>
            <CardDescription>
                {isLoginView ? 'Welcome back! Please log in.' : 'A free account is required to apply.'}
            </CardDescription>
        </CardHeader>
        <CardContent>
            {isLoginView ? (
                <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                        <FormField
                            control={loginForm.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl><Input placeholder="you@example.com" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={loginForm.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl><Input type="password" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 animate-spin" /> : <LogIn className="mr-2" />}
                            Sign In
                        </Button>
                    </form>
                </Form>
            ) : (
                <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                        <FormField
                            control={registerForm.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={registerForm.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl><Input placeholder="you@example.com" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={registerForm.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl><Input type="password" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 animate-spin" /> : <UserPlus className="mr-2" />}
                            Create Account
                        </Button>
                    </form>
                </Form>
            )}
             <Button variant="link" size="sm" className="w-full mt-4" onClick={() => setIsLoginView(!isLoginView)}>
                {isLoginView ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </Button>
        </CardContent>
    </Card>
  );
}

    