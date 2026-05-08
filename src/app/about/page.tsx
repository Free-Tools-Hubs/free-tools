import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Metadata } from 'next';
import { Shield, Target, Users, Code, Award, Globe } from 'lucide-react';

export const metadata: Metadata = {
    title: 'About Us - Our Mission & Vision | FreeToolsHubs',
    description: 'Learn about FreeToolsHubs, our mission to democratize digital utilities, and the passionate team dedicated to building accessible, high-performance online tools.',
    keywords: ['about free tools hubs', 'free tools hubs mission', 'free tools hubs vision', 'about us', 'our story', 'our mission', 'our vision', 'free tools', 'online tools', 'digital utilities', 'privacy by design', 'modern architecture', 'accuracy first', 'commitment to users', 'open accessibility', 'web development', 'tech company', 'startup', 'team', 'values', 'principles', 'free tools hub', 'free-tools-steel'],
    openGraph: {
        title: 'About Us - Our Mission & Vision | FreeToolsHubs',
        description: 'Learn about FreeToolsHubs, our mission to democratize digital utilities, and the passionate team dedicated to building accessible, high-performance online tools.',
        type: 'website',
        url: 'https://freetoolshubs.com/about',
        siteName: 'Free Tools Hubs',
    },
    twitter: {
        title: 'About Us - Our Mission & Vision | FreeToolsHubs',
        description: 'Learn about FreeToolsHubs, our mission to democratize digital utilities, and the passionate team dedicated to building accessible, high-performance online tools.',
    },
    alternates: {
        canonical: '/about'
    }
};

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col bg-surface-50 dark:bg-surface-950">
            <Header />

            <main className="flex-grow pt-32 pb-20 container mx-auto px-4 max-w-4xl space-y-16">

                {/* Hero Section */}
                <section className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold mb-4 uppercase tracking-widest">
                        <Users size={14} /> Who we are
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black font-outfit tracking-tight">
                        Empowering Your Digital Workflow
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        We believe that essential digital utilities should be seamlessly accessible, incredibly fast, and entirely free. FreeToolsHubs was built to solve everyday problems without the friction of paywalls or cluttered interfaces.
                    </p>
                </section>

                {/* The Story Section */}
                <section className="glass-card p-8 md:p-12 space-y-6">
                    <h2 className="text-3xl font-bold font-outfit mb-4 flex items-center gap-3">
                        <Globe className="text-blue-500" />
                        Our Story
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                        <p>
                            FreeToolsHubs began as a passion project born out of frustration. As web developers and digital professionals, we found ourselves constantly jumping between dozens of different websites just to perform simple, everyday tasks: converting an image format, double-checking a CSS gradient, calculating a time zone difference, or finding a quick hex code.
                        </p>
                        <p>
                            The existing tools on the market were often plagued by intrusive advertisements, slow loading times, confusing interfaces, or unexpected paywalls just when you needed the result most. We realized there had to be a better way—a unified platform where the user experience is the primary focus.
                        </p>
                        <p>
                            Driven by our commitment to open accessibility and modern web architecture, we set out to build the ultimate collection of online utilities. Leveraging state-of-the-art technologies like React and edge computing, we engineered a platform that doesn't just work, but works instantly. What started as a small personal toolkit has rapidly expanded into a dynamic hub serving thousands of users across the globe.
                        </p>
                    </div>
                </section>

                {/* Core Values Grid */}
                <section className="grid md:grid-cols-3 gap-6">
                    <div className="glass-card p-8 text-center space-y-4 hover:border-brand-primary transition-colors">
                        <div className="w-16 h-16 mx-auto bg-emerald-500/10 text-emerald-500 flex items-center justify-center rounded-2xl">
                            <Target size={32} />
                        </div>
                        <h3 className="text-xl font-bold font-outfit">Accuracy First</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Whether it's a critical currency conversion, a complex geographical calculation, or a deep CSS optimization, we prioritize extreme precision in every tool we build.
                        </p>
                    </div>

                    <div className="glass-card p-8 text-center space-y-4 hover:border-brand-primary transition-colors">
                        <div className="w-16 h-16 mx-auto bg-blue-500/10 text-blue-500 flex items-center justify-center rounded-2xl">
                            <Shield size={32} />
                        </div>
                        <h3 className="text-xl font-bold font-outfit">Privacy by Design</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Your data belongs to you. We execute almost all of our utility logic entirely on your device (client-side), ensuring your sensitive files and inputs never leave your browser.
                        </p>
                    </div>

                    <div className="glass-card p-8 text-center space-y-4 hover:border-brand-primary transition-colors">
                        <div className="w-16 h-16 mx-auto bg-purple-500/10 text-purple-500 flex items-center justify-center rounded-2xl">
                            <Code size={32} />
                        </div>
                        <h3 className="text-xl font-bold font-outfit">Modern Architecture</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Built entirely on cutting-edge web frameworks, our tools load instantly, work seamlessly on mobile, and leverage global edge networks for uncompromised speed.
                        </p>
                    </div>
                </section>

                {/* Commitment */}
                <section className="glass-card p-8 md:p-12 space-y-6">
                    <h2 className="text-3xl font-bold font-outfit mb-4 flex items-center gap-3">
                        <Award className="text-orange-500" />
                        Our Commitment to You
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                        <p>
                            We are continuously updating, refining, and expanding our directory of tools based entirely on community feedback. Web technologies change rapidly, and we ensure our calculators, generators, and formatters are always compliant with the latest global standards.
                        </p>
                        <p>
                            By remaining free to use, we hope to support students, educators, developers, designers, and everyday internet users in their pursuit of efficiency. We sustain this platform through unobtrusive, highly vetted advertising partnerships that respect your browsing experience and privacy.
                        </p>
                        <p>
                            If you have a suggestion, a feature request, or just want to say hello, we encourage you to reach out. Thank you for making FreeToolsHubs your preferred digital utility provider.
                        </p>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}
