
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  const lastUpdated = "July 31, 2024";
  const contactEmail = "info@kstar.com";
  
  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="sticky top-0 bg-background/80 backdrop-blur-lg border-b z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Privacy Policy</h1>
            <Button asChild variant="outline">
                <Link href="/">
                    <ArrowLeft className="mr-2" />
                    Back to Home
                </Link>
            </Button>
        </div>
      </header>

      <main className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg dark:prose-invert">
          <p className="text-muted-foreground">Last Updated: {lastUpdated}</p>
          
          <h2>Introduction</h2>
          <p>
            Welcome to Kstar (T) Group and its affiliated organizations: Kstar International, Kstar Malezi Foundation, and ClickData Tanzania. We are committed to protecting your privacy and handling your personal data in an open and transparent manner. This privacy policy explains how we collect, use, and share information when you use our website.
          </p>

          <h2>Information We Collect</h2>
          <p>
            We collect information that you provide to us directly, such as when you fill out our contact form. The types of personal information we may collect include:
          </p>
          <ul>
            <li><strong>Contact Information:</strong> Your name and email address.</li>
            <li><strong>Message Content:</strong> The subject and message you send to us, including any information you choose to provide.</li>
            <li><strong>Authentication Information:</strong> For administrative users, we collect and store credentials (email and password) for login purposes, managed securely through Firebase Authentication.</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect for the following purposes:</p>
          <ul>
            <li>To respond to your questions, comments, and inquiries submitted through our contact form.</li>
            <li>To manage and secure our website, including authenticating administrative users.</li>
            <li>To improve our website and services.</li>
            <li>To comply with legal obligations.</li>
          </ul>

          <h2>Information Sharing and Disclosure</h2>
          <p>
            We do not sell or rent your personal information to third parties. We may share your information only in the following limited circumstances:
          </p>
          <ul>
            <li><strong>Service Providers:</strong> We use third-party services like Firebase (provided by Google) to host our website and manage our data, including contact form submissions and user authentication. These service providers have access to your personal information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</li>
            <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information. We leverage Firebase's robust security features to protect data stored on its platform. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
          </p>

          <h2>Your Rights</h2>
          <p>
            You have certain rights regarding your personal information. Depending on your location, you may have the right to:
          </p>
          <ul>
            <li>Access the personal information we hold about you.</li>
            <li>Request that we correct any inaccurate personal information.</li>
            <li>Request that we delete your personal information.</li>
          </ul>
          <p>To exercise these rights, please contact us at <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.</p>

          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last Updated" date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at: <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
          </p>
        </div>
      </main>
    </div>
  );
}
