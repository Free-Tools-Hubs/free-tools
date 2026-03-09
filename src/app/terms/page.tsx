import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Metadata } from 'next';
import { Scale, FileText, AlertTriangle, ShieldCheck, Mail } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Terms of Service - Usage Guidelines | FreeToolsHub',
    description: 'Review our Terms of Service to understand the rules, guidelines, legal liabilities, and user agreements for accessing and utilizing FreeToolsHub and its related services.',
    keywords: ['terms of service', 'terms and conditions', 'terms of service free tools hub', 'terms of service free-tools-steel'],
    openGraph: {
        title: 'Terms of Service - Usage Guidelines | FreeToolsHub',
        description: 'Review our Terms of Service to understand the rules, guidelines, legal liabilities, and user agreements for accessing and utilizing FreeToolsHub and its related services.',
        type: 'website',
        url: 'https://free-tools-steel.vercel.app/terms',
        siteName: 'Free Tools Hub',
    },
    twitter: {
        title: 'Terms of Service - Usage Guidelines | FreeToolsHub',
        description: 'Review our Terms of Service to understand the rules, guidelines, legal liabilities, and user agreements for accessing and utilizing FreeToolsHub and its related services.',
    }
};

export default function TermsPage() {
    return (
        <div className="min-h-screen flex flex-col bg-surface-50 dark:bg-surface-950">
            <Header />

            <main className="flex-grow pt-32 pb-20 container mx-auto px-4 max-w-4xl space-y-16">

                {/* Hero Section */}
                <section className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold mb-4 uppercase tracking-widest">
                        <Scale size={14} /> Legal Agreement
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black font-outfit tracking-tight">
                        Terms of Service
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        These Terms and Conditions govern your use of the FreeToolsHub platform. By accessing or utilizing any of our tools, you explicitly agree to comply with this agreement.
                    </p>
                    <p className="text-sm font-medium text-muted-foreground/60 italic mt-8">
                        Last Updated: March 2024
                    </p>
                </section>

                {/* Main Content */}
                <section className="glass-card p-8 md:p-12 space-y-12">

                    {/* Agreement to Terms */}
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                        <h2 className="text-2xl font-bold font-outfit text-foreground mb-4 flex items-center gap-3">
                            <FileText className="text-brand-primary" />
                            1. Agreement to Terms
                        </h2>
                        <p>
                            By accessing, viewing, exploring or utilizing the <Link href="/" className="text-brand-primary hover:underline">FreeToolsHub</Link> website, including any individual programmatic tool, calculator, data hub, or converter hosted under our domain, you inherently agree to be bound by these Terms of Service.
                        </p>
                        <p>
                            If you disagree with any part of these terms, you must not access or utilize our platform. Because our tools are provided entirely free of charge, we reserve the right to modify, suspend, or discontinue any feature without prior notice.
                        </p>
                    </div>

                    {/* Acceptable Use */}
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                        <h2 className="text-2xl font-bold font-outfit text-foreground mb-4 flex items-center gap-3">
                            <ShieldCheck className="text-emerald-500" />
                            2. Acceptable Use and Restrictions
                        </h2>
                        <p>
                            FreeToolsHub grants you a limited, non-exclusive, non-transferable, revocable license to use our platform strictly for personal, non-commercial, and educational purposes. You agree not to engage in any of the following restricted activities:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-sm font-medium">
                            <li><strong>Automated Scraping:</strong> Accessing or scraping our programmatic data hubs (e.g., dictionary, city weather, conversions) using unauthorized bots, spiders, or automated scripts without explicit written consent.</li>
                            <li><strong>Reverse Engineering:</strong> Attempting to decompile, reverse engineer, or extract the source code of any client-side tool, formatting algorithm, or generation logic we employ.</li>
                            <li><strong>Service Disruption:</strong> Launching denial-of-service attacks, overwhelming our edge servers, or attempting to compromise the security and stability of the platform.</li>
                            <li><strong>Malicious Uploads:</strong> Introducing viruses, trojans, worms, logic bombs, or other malicious material into our file converters or data inputs.</li>
                            <li><strong>Commercial Resale:</strong> Republishing, selling, renting, or sub-licensing material, tools, or data directly acquired from FreeToolsHub as your own standalone product or service.</li>
                        </ul>
                    </div>

                    {/* Accuracy and Liability */}
                    <div className="space-y-4 text-muted-foreground leading-relaxed bg-orange-500/5 dark:bg-orange-500/10 p-6 rounded-2xl border border-orange-500/20">
                        <h2 className="text-2xl font-bold font-outfit text-foreground mb-4 flex items-center gap-3">
                            <AlertTriangle className="text-orange-500" />
                            3. Disclaimer of Warranties & Liabilities
                        </h2>
                        <h3 className="text-lg font-bold text-foreground">A. "As Is" Provision</h3>
                        <p>
                            The materials, data, logic, and tools on FreeToolsHub are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
                        </p>
                        <h3 className="text-lg font-bold text-foreground mt-6">B. Data Accuracy and Calculations</h3>
                        <p>
                            While we strive for the utmost accuracy in all our programmatic converters, financial calculators, weather APIs, geographical databases, and vocabulary engines, <strong className="text-foreground">we do not warrant or make any representations concerning the absolute reliability, timeliness, or accuracy of the results provided.</strong>
                        </p>
                        <p>
                            Users undertaking critical calculations in fields such as engineering, medicine, finance (including currency conversion), aviation, or maritime navigation should not rely solely on our platform and must independently verify all results.
                        </p>
                        <p>
                            In no event shall FreeToolsHub, its developers, or its suppliers be liable for any consequential, incidental, direct, indirect, special, punitive, or other damages whatsoever (including, without limitation, damages for loss of profits, business interruption, or loss of information) arising out of the use or inability to use our tools.
                        </p>
                    </div>

                    {/* Intellectual Property */}
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                        <h2 className="text-2xl font-bold font-outfit text-foreground mb-4">
                            4. Intellectual Property Rights
                        </h2>
                        <p>
                            The website entirely (including its specific UI/UX design, custom frontend components, textual content, layouts, branding, algorithms, and logos) is the intellectual property of FreeToolsHub and is protected by applicable copyright and trademark laws. While the public facts, historical data, and international standards provided within the tools (e.g., dictionary definitions, country populations) are part of the public domain, the structured presentation, curation, and programmatic SEO articles generated are copyrighted.
                        </p>
                    </div>

                    {/* Links to Other Web Sites */}
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                        <h2 className="text-2xl font-bold font-outfit text-foreground mb-4">
                            5. Third-Party Links and Advertising
                        </h2>
                        <p>
                            FreeToolsHub relies on advertising networks such as Google AdSense to sustain its free model. Our service may contain links to third-party web sites or services that are not owned or controlled by us.
                        </p>
                        <p>
                            We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You acknowledge and agree that we shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites.
                        </p>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4 text-muted-foreground leading-relaxed border-t pt-8 mt-8">
                        <h2 className="text-2xl font-bold font-outfit text-foreground mb-4 flex items-center gap-3">
                            <Mail className="text-blue-500" />
                            6. Contact Information
                        </h2>
                        <p>
                            If you have questions referencing any point established in these Terms of Service, please contact our legal and support team at <a href="mailto:legal@freetoolshub.com" className="text-brand-primary font-bold hover:underline">legal@freetoolshub.com</a>.
                        </p>
                    </div>

                </section>
            </main>

            <Footer />
        </div>
    );
}
