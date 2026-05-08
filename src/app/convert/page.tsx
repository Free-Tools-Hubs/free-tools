import conversions from '@/data/conversions';
import { Scale, Ruler, Weight, ArrowRightLeft } from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

import { JsonLd } from '@/components/seo/JsonLd';

export const metadata = {
    title: 'Free Unit Converter - Instant Weight, Length & Unit Conversion',
    description: 'Accurately convert weights (kg to lb), lengths (meters to feet), and other measurements with our free online unit converter. Fast, simple, and precise.',
    keywords: ['unit converter', 'weight conversion', 'length converter', 'kg to lb', 'metric to imperial'],
    openGraph: {
        title: 'Free Unit Converter - Instant Weight, Length & Unit Conversion',
        description: 'Accurately convert weights (kg to lb), lengths (meters to feet), and other measurements with our free online unit converter. Fast, simple, and precise.',
        type: 'website',
        url: 'https://freetoolshubs.com/convert',
        siteName: 'Free Tools',
        images: [
            {
                url: 'https://freetoolshubs.com/convert.png',
                width: 1200,
                height: 630,
                alt: 'Free Unit Converter - Instant Weight, Length & Unit Conversion',
            },
        ],
    },
    twitter: {
        title: 'Free Unit Converter - Instant Weight, Length & Unit Conversion',
        description: 'Accurately convert weights (kg to lb), lengths (meters to feet), and other measurements with our free online unit converter. Fast, simple, and precise.',
        card: 'summary_large_image',
        images: [
            {
                url: 'https://freetoolshubs.com/convert.png',
                width: 1200,
                height: 630,
                alt: 'Free Unit Converter - Instant Weight, Length & Unit Conversion',
            },
        ],
    },
    alternates: {
        canonical: '/convert'
    }
};

export default function ConversionHubPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <JsonLd data={{
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Unit Conversion Hub",
                "description": "Accurate online unit and measurement converter.",
                "url": "https://freetoolshubs.com/convert"
            }} />
            <Header />
            <main className="flex-grow pt-32 pb-20 container mx-auto px-4 max-w-5xl">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold mb-6">
                        <Scale size={14} />
                        <span>Precise measurement toolkit</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4 font-outfit">Unit Conversions Hub</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Quickly convert weight and length units with accuracy.
                        No more manual calculations for kilograms to pounds, or meters to feet.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {conversions.map(c => (
                        <Link
                            key={c.slug}
                            href={`/convert/${c.slug}`}
                            className="glass-card p-6 group hover:translate-y-[-4px] transition-all flex flex-col items-start gap-4 border"
                        >
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                {c.category === 'weight' ? <Weight size={20} /> : <Ruler size={20} />}
                            </div>
                            <div className="w-full">
                                <h2 className="text-xl font-bold font-outfit mb-2 flex items-center justify-between">
                                    <span>{c.fromName} to {c.toName}</span>
                                    <ArrowRightLeft size={14} className="opacity-40 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-500" />
                                </h2>
                                <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest bg-surface-100 dark:bg-surface-900 inline-block px-2 py-1 rounded-md mb-3">
                                    {c.category}
                                </p>
                                <div className="text-muted-foreground text-sm font-medium">
                                    Formula: 1 {c.fromUnit} ≈ {c.ratio} {c.toUnit}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}
