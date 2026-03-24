import countdowns from '@/data/countdowns';
import { AlarmClock, Calendar, Hourglass, Timer } from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

import { JsonLd } from '@/components/seo/JsonLd';

export const metadata = {
    title: 'Live Countdown Timers - Days Until Holidays & Events',
    description: 'Track time remaining until Christmas, New Year, Halloween, and other major events. Accurate live countdown timers for holidays and milestones.',
    keywords: ['countdown timer', 'holiday countdown', 'days until christmas', 'live timer', 'event tracker'],
    openGraph: {
        title: 'Live Countdown Timers - Days Until Holidays & Events',
        description: 'Track time remaining until Christmas, New Year, Halloween, and other major events. Accurate live countdown timers for holidays and milestones.',
        type: 'website',
        url: 'https://freetoolshubs.com/countdown',
        siteName: 'Free Tools',
        images: [
            {
                url: 'https://freetoolshubs.com/countdown.png',
                width: 1200,
                height: 630,
                alt: 'Live Countdown Timers - Days Until Holidays & Events',
            },
        ],
    },
    twitter: {
        title: 'Live Countdown Timers - Days Until Holidays & Events',
        description: 'Track time remaining until Christmas, New Year, Halloween, and other major events. Accurate live countdown timers for holidays and milestones.',
        card: 'summary_large_image',
        images: [
            {
                url: 'https://freetoolshubs.com/countdown.png',
                width: 1200,
                height: 630,
                alt: 'Live Countdown Timers - Days Until Holidays & Events',
            },
        ],
    },
};

export default function CountdownHubPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <JsonLd data={{
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Countdown Timers Hub",
                "description": "Live countdown timers for world events and holidays.",
                "url": "https://freetoolshubs.com/countdown"
            }} />
            <Header />
            <main className="flex-grow pt-32 pb-20 container mx-auto px-4 max-w-5xl">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-xs font-bold mb-6">
                        <AlarmClock size={14} />
                        <span>Live Event Tracking</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4 font-outfit">Countdown Hub</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Track the time remaining until major world events, holidays, and milestones.
                        Precise live timers for your most anticipated dates.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {countdowns.map(c => (
                        <Link
                            key={c.slug}
                            href={`/countdown/${c.slug}`}
                            className="glass-card p-6 group hover:translate-y-[-4px] transition-all flex flex-col items-start gap-4 border"
                        >
                            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
                                {c.slug === 'christmas' ? <Calendar size={24} /> : (c.targetDateMethod === 'fixed' ? <Timer size={24} /> : <Hourglass size={24} />)}
                            </div>
                            <div className="w-full">
                                <h2 className="text-2xl font-bold font-outfit mb-2">{c.eventName}</h2>
                                <p className="text-muted-foreground leading-relaxed text-sm mb-4">{c.description}</p>
                            </div>
                            <div className="mt-auto text-orange-500 font-bold flex items-center gap-2 text-sm uppercase tracking-wide">
                                Check Timer
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
