import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Metadata } from 'next';
import { Shield, Eye, Database, GlobeLock, BookOpen } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Privacy Policy - Data Protection & Security | FreeToolsHubs',
    description: 'Our comprehensive Privacy Policy explains how FreeToolsHubs collects, utilizes, and protects your personal information and browsing data.',
    keywords: ['privacy policy', 'data protection', 'security', 'privacy policy free tools hubs', 'privacy policy free-tools-steel'],
    openGraph: {
        title: 'Privacy Policy - Data Protection & Security | FreeToolsHubs',
        description: 'Our comprehensive Privacy Policy explains how FreeToolsHubs collects, utilizes, and protects your personal information and browsing data.',
        type: 'website',
        url: 'https://freetoolshubs.com/privacy',
        siteName: 'Free Tools Hubs',
    },
    twitter: {
        title: 'Privacy Policy - Data Protection & Security | FreeToolsHubs',
        description: 'Our comprehensive Privacy Policy explains how FreeToolsHubs collects, utilizes, and protects your personal information and browsing data.',
    },
    alternates: {
        canonical: '/privacy'
    },
    robots: {
        index: false,
        follow: true
    }
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen flex flex-col bg-surface-50 dark:bg-surface-950">
            <Header />

            <main className="flex-grow pt-32 pb-20 container mx-auto px-4 max-w-4xl space-y-16">

                {/* Hero Section */}
                <section className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold mb-4 uppercase tracking-widest">
                        <Shield size={14} /> Data Protection Protocol
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black font-outfit tracking-tight">
                        Privacy Policy
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        Your privacy is critically important to us. This document outlines the types of information we collect, how it is used, and the exhaustive measures we take to safeguard your data.
                    </p>
                    <p className="text-sm font-medium text-muted-foreground/60 italic mt-8">
                        Last Updated: March 2024
                    </p>
                </section>

                {/* Main Content */}
                <section className="glass-card p-8 md:p-12 space-y-12">

                    {/* Introduction */}
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                        <h2 className="text-2xl font-bold font-outfit text-foreground mb-4 flex items-center gap-3">
                            <Eye className="text-orange-500" />
                            1. Introduction and Scope
                        </h2>
                        <p>
                            Welcome to FreeToolsHubs (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We operate the <Link href="/" className="text-brand-primary hover:underline">FreeToolsHubs</Link> website, providing a suite of online utilities ranging from format converters to programmatic generators. We respect your privacy and are committed to protecting it through compliance with this Privacy Policy.
                        </p>
                        <p>
                            This policy applies to information we collect directly on this website, in email, text, and other electronic messages between you and this Website, and via any mobile and desktop applications you download from this Website.
                        </p>
                    </div>

                    {/* Data Collection */}
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                        <h2 className="text-2xl font-bold font-outfit text-foreground mb-4 flex items-center gap-3">
                            <Database className="text-blue-500" />
                            2. Information We Collect
                        </h2>
                        <h3 className="text-lg font-bold text-foreground">A. Client-Side Processing Assurance</h3>
                        <p>
                            We pride ourselves on an architecture that prioritizes your privacy. The vast majority of the tools available on FreeToolsHubs (such as calculators, generators, formatters, and image converters) execute their functions entirely within your browser utilizing <strong className="text-foreground">client-side scripting</strong>.
                        </p>
                        <p>
                            When you upload an image to convert, type text into a box, or calculate a formula, <strong className="text-rose-500">that data is never transmitted to, stored on, or processed by our servers</strong>. It remains securely on your local device.
                        </p>

                        <h3 className="text-lg font-bold text-foreground mt-6">B. Automated Data Logs</h3>
                        <p>
                            Like almost every website on the internet, our hosting providers and analytics partners automatically collect certain non-personally identifiable information when you visit. This may include your IP address, browser type, operating system, referring URLs, device information, and geographic location (at a city or state level). We use this data purely to optimize the site&apos;s performance, fix bugs, and analyze aggregate traffic trends.
                        </p>
                    </div>

                    {/* Third Party Services */}
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                        <h2 className="text-2xl font-bold font-outfit text-foreground mb-4 flex items-center gap-3">
                            <GlobeLock className="text-emerald-500" />
                            3. Third-Party Services and Advertising
                        </h2>
                        <p>
                            To keep FreeToolsHubs completely free for global users, we rely on third-party advertising networks, such as Google AdSense.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4 text-sm font-medium">
                            <li><strong>Google Ads:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to our website or other websites.</li>
                            <li><strong>Personalized Advertising:</strong> Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.</li>
                            <li><strong>Opt-Out:</strong> Users may opt out of personalized advertising by visiting <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Ads Settings</a>. Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting <a href="https://aboutads.info" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">www.aboutads.info</a>.</li>
                        </ul>
                        <p>
                            We also utilize standard web analytics platforms to understand how visitors engage with our site. These tools do not collect personally identifying information beyond what standard server logs provide.
                        </p>
                    </div>

                    {/* Cookies */}
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                        <h2 className="text-2xl font-bold font-outfit text-foreground mb-4 flex items-center gap-3">
                            <BookOpen className="text-purple-500" />
                            4. Use of Cookies and Tracking
                        </h2>
                        <p>
                            Cookies are small data files stored on your local device by your web browser. FreeToolsHubs utilizes cookies to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-sm font-medium">
                            <li>Remember your application state (e.g., maintaining Dark Mode vs Light Mode preference).</li>
                            <li>Compile aggregate data about site traffic and site interactions in order to offer better site experiences in the future.</li>
                            <li>Enable trusted third-party advertising partners to deliver relevant advertisements.</li>
                        </ul>
                        <p>
                            You have full control over these cookies. You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies via your browser settings. Be aware that disabling cookies may affect the visual presentation of our site (such as theme preferences) but will not prevent our tools from functioning.
                        </p>
                    </div>

                    {/* User Rights */}
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                        <h2 className="text-2xl font-bold font-outfit text-foreground mb-4">
                            5. Children&apos;s Privacy (COPPA)
                        </h2>
                        <p>
                            We do not specifically market to children under the age of 13, and our services are designed for a general audience. We do not knowingly collect personal information from individuals under the age of 13.
                        </p>
                    </div>

                    {/* Changes to policy */}
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                        <h2 className="text-2xl font-bold font-outfit text-foreground mb-4">
                            6. Policy Updates and Contact
                        </h2>
                        <p>
                            We reserve the right to continually update, modify, or amend this Privacy Policy at any time to reflect changing legal requirements or alterations to our network architecture. Any changes will be posted prominently on this page with an updated &quot;Last Updated&quot; timestamp.
                        </p>
                        <p>
                            If you have any questions, concerns, or requests regarding this Privacy Policy or your data, please contact us at <a href="mailto:privacy@FreeToolsHubs.com" className="text-brand-primary font-bold hover:underline">privacy@FreeToolsHubs.com</a>.
                        </p>
                    </div>

                </section>

            </main>

            <Footer />
        </div>
    );
}
