import times from '@/data/times';
import { Clock, Clock4, Globe } from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

import { JsonLd } from '@/components/seo/JsonLd';

export const metadata = {
    title: 'World Time Converter - Live Global Timezone Conversion',
    description: 'Convert time between PST, IST, EST, GMT, and other global timezones. Accurate world clock and timezone comparison tool for international scheduling.',
    keywords: ['world time converter', 'timezone conversion', 'pst to ist', 'est to pst', 'global time clock'],
    openGraph: {
        title: 'World Time Converter - Live Global Timezone Conversion',
        description: 'Convert time between PST, IST, EST, GMT, and other global timezones. Accurate world clock and timezone comparison tool for international scheduling.',
        type: 'website',
        url: 'https://freetoolshubs.com/time',
        siteName: 'Free Tools',
        images: [
            {
                url: 'https://freetoolshubs.com/time.png',
                width: 1200,
                height: 630,
                alt: 'World Time Converter - Live Global Timezone Conversion',
            },
        ],
    },
    twitter: {
        title: 'World Time Converter - Live Global Timezone Conversion',
        description: 'Convert time between PST, IST, EST, GMT, and other global timezones. Accurate world clock and timezone comparison tool for international scheduling.',
        card: 'summary_large_image',
        images: [
            {
                url: 'https://freetoolshubs.com/time.png',
                width: 1200,
                height: 630,
                alt: 'World Time Converter - Live Global Timezone Conversion',
            },
        ],
    },
    alternates: {
        canonical: '/time'
    }
};

export default function TimeHubPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <JsonLd data={{
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "World Time Converter Hub",
                "description": "Professional tool for global timezone and time conversions.",
                "url": "https://freetoolshubs.com/time"
            }} />
            <Header />
            <main className="flex-grow pt-32 pb-20 container mx-auto px-4 max-w-5xl">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold mb-6">
                        <Clock size={14} />
                        <span>Live Global Time Tracking</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4 font-outfit">World Time Converter</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Quickly convert time across timezones like PST, IST, EST, and GMT.
                        No more time calculation confusion for international meetings or events.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {times.map(t => (
                        <Link
                            key={t.slug}
                            href={`/time/${t.slug}`}
                            className="glass-card p-10 group hover:translate-x-1 transition-all flex flex-col items-center gap-6 border text-center"
                        >
                            <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                                <Clock4 size={32} />
                            </div>
                            <div className="w-full">
                                <div className="flex items-center justify-center gap-4 mb-2 text-3xl font-black font-outfit">
                                    <span>{t.fromName}</span>
                                    <div className="w-8 h-px bg-border group-hover:w-12 transition-all" />
                                    <span>{t.toName}</span>
                                </div>
                                <div className="text-muted-foreground font-medium flex items-center justify-center gap-2">
                                    <Globe size={14} />
                                    {t.fromZone.split('/')[1].replace('_', ' ')} to {t.toZone.split('/')[1].replace('_', ' ')}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-16 p-8 rounded-3xl bg-surface-100 dark:bg-surface-900 border border-dashed border-border text-center">
                    <h3 className="font-bold text-xl mb-2">Need a different conversion?</h3>
                    <p className="text-muted-foreground">We are constantly adding more timezone pairs and city conversions to this toolkit.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
