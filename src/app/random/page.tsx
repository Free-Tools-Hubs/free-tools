import randoms from '@/data/randoms';
import { Sparkles, Dice5 } from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

import { JsonLd } from '@/components/seo/JsonLd';

export const metadata = {
    title: 'Free Online Generators - Random Numbers, Colors, & More',
    description: 'A comprehensive collection of free online random generators. Generate random numbers, hex colors, countries, movies, and strings instantly.',
    keywords: ['random generators', 'random number generator', 'random color picker', 'random choice maker', 'online utilities'],
    openGraph: {
        title: 'Free Online Generators - Random Numbers, Colors, & More',
        description: 'A comprehensive collection of free online random generators. Generate random numbers, hex colors, countries, movies, and strings instantly.',
        type: 'website',
        url: 'https://freetoolshubs.com/random',
        siteName: 'Free Tools',
        images: [
            {
                url: 'https://freetoolshubs.com/random.png',
                width: 1200,
                height: 630,
                alt: 'Free Online Generators - Random Numbers, Colors, & More',
            },
        ],
    },
    twitter: {
        title: 'Free Online Generators - Random Numbers, Colors, & More',
        description: 'A comprehensive collection of free online random generators. Generate random numbers, hex colors, countries, movies, and strings instantly.',
        card: 'summary_large_image',
        images: [
            {
                url: 'https://freetoolshubs.com/random.png',
                width: 1200,
                height: 630,
                alt: 'Free Online Generators - Random Numbers, Colors, & More',
            },
        ],
    },
};

export default function RandomHubPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <JsonLd data={{
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Random Generators Hub",
                "description": "Library of free online random generation tools.",
                "url": "https://freetoolshubs.com/random"
            }} />
            <Header />
            <main className="flex-grow pt-32 pb-20 container mx-auto px-4 max-w-5xl">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold mb-6">
                        <Sparkles size={14} />
                        <span>Randomness at your fingertips</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4 font-outfit">Random Generators</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Need a random number? A random color for your design? Or just a random movie to watch?
                        Explore our library of free random generation tools.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {randoms.map(item => (
                        <Link
                            key={item.slug}
                            href={`/random/${item.slug}`}
                            className="glass-card p-8 group hover:translate-y-[-4px] transition-all flex flex-col items-start gap-4 border"
                        >
                            <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
                                <Dice5 size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold font-outfit mb-2">{item.name}</h2>
                                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                            </div>
                            <div className="mt-auto text-brand-primary font-bold flex items-center gap-2">
                                Launch Tool
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}
