'use client';

import { ThemeProvider } from '@/components/theme-provider';
import { FirebaseClientProvider } from '@/firebase';
import AppShell from '@/components/AppShell';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <FirebaseClientProvider>
        <AppShell>
          {children}
        </AppShell>
      </FirebaseClientProvider>
    </ThemeProvider>
  );
}
