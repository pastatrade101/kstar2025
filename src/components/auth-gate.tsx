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
import { initiateEmailSignIn, signUpWithEmailAndPassword } from '@/firebase/non-blocking-login';
import { Loader2, UserPlus, LogIn } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

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
    initiateEmailSignIn(auth, values.email, values.password)
      .then(() => {
        // onAuthStateChanged in the provider will handle redirect
        // We can optionally show a success toast here
        toast({
          title: "Signed In Successfully!",
        });
        router.refresh(); // This helps ensure the page re-evaluates user state
      })
      .catch((error) => {
        toast({
            variant: "destructive",
            title: "Sign In Failed",
            description: error.message || "An unknown error occurred.",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function onRegisterSubmit(values: z.infer<typeof registerSchema>) {
    setIsLoading(true);
    try {
        await signUpWithEmailAndPassword(auth, values.email, values.password, values.name);
        toast({
            title: "Account Created!",
            description: "You have been successfully signed up and logged in.",
        });
        router.refresh(); // This helps ensure the page re-evaluates user state
    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Sign Up Failed",
            description: error.message || "An unknown error occurred.",
        });
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <Card>
        <CardHeader>
            <CardTitle>{isLoginView ? 'Sign In' : 'Create an Account'}</CardTitle>
            <CardDescription>
                {isLoginView ? "Welcome back! Please enter your details." : "An account is required to proceed. It's free!"}
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
                                    <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
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
                                    <FormControl><Input type="text" placeholder="John Doe" {...field} /></FormControl>
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
                                    <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
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
