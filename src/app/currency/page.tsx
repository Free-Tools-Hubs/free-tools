import { currencies, commonCurrencyPairs } from '@/data/currencies';
import { Banknote, TrendingUp, RefreshCw, ArrowRightLeft } from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

import { JsonLd } from '@/components/seo/JsonLd';

export const metadata = {
    title: 'Live Currency Exchange Rates - Global Forex Hub',
    description: 'Get real-time exchange rates for USD, EUR, GBP, INR, and other world currencies. Accurate currency converter for international exchange data.',
    keywords: ['currency exchange', 'live forex rates', 'usd to eur', 'currency converter', 'global money exchange'],
    openGraph: {
        title: 'Live Currency Exchange Rates - Global Forex Hub',
        description: 'Get real-time exchange rates for USD, EUR, GBP, INR, and other world currencies. Accurate currency converter for international exchange data.',
        type: 'website',
        url: 'https://free-tools-steel.vercel.app/currency',
        siteName: 'Free Tools',
        images: [
            {
                url: 'https://free-tools-steel.vercel.app/currency.png',
                width: 1200,
                height: 630,
                alt: 'Live Currency Exchange Rates - Global Forex Hub',
            },
        ],
    },
    twitter: {
        title: 'Live Currency Exchange Rates - Global Forex Hub',
        description: 'Get real-time exchange rates for USD, EUR, GBP, INR, and other world currencies. Accurate currency converter for international exchange data.',
        card: 'summary_large_image',
        images: [
            {
                url: 'https://free-tools-steel.vercel.app/currency.png',
                width: 1200,
                height: 630,
                alt: 'Live Currency Exchange Rates - Global Forex Hub',
            },
        ],
    },
};

export default function CurrencyHubPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <JsonLd data={{
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Currency Exchange Hub",
                "description": "Real-time global currency exchange rates and converter.",
                "url": "https://free-tools-steel.vercel.app/currency"
            }} />
            <Header />
            <main className="flex-grow pt-32 pb-20 container mx-auto px-4 max-w-5xl">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 text-xs font-bold mb-6">
                        <Banknote size={14} />
                        <span>Live Global Exchange Rates</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4 font-outfit">Currency Exchange Hub</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Track foreign exchange rates for major world currencies.
                        Live data for USD, EUR, GBP, and many more.
                    </p>
                </div>

                <div className="mb-16 glass-card p-10 relative overflow-hidden text-center bg-indigo-600 text-white border-none shadow-2xl shadow-indigo-500/20">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl -mr-32 -mt-32 rounded-full" />
                    <TrendingUp className="mx-auto mb-6 text-indigo-200" size={48} />
                    <h2 className="text-3xl font-black mb-4 font-outfit">Most Popular Currency Pairs</h2>
                    <p className="text-indigo-100 mb-10 max-w-xl mx-auto font-medium">
                        Instantly check live conversion rates for the world's most traded currency combinations.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center relative z-10">
                        {commonCurrencyPairs.map(pair => (
                            <Link
                                key={`${pair.from}-${pair.to}`}
                                href={`/currency/${pair.from.toLowerCase()}-to-${pair.to.toLowerCase()}`}
                                className="px-6 py-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105 transition-all flex items-center gap-3 font-bold text-lg"
                            >
                                <span>{pair.from}</span>
                                <ArrowRightLeft size={16} className="text-indigo-200" />
                                <span>{pair.to}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="p-10 glass-card">
                    <h2 className="text-2xl font-bold mb-8 font-outfit text-center flex items-center justify-center gap-3">
                        <RefreshCw size={24} className="text-indigo-500" />
                        Explore All Currencies
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-center">
                        {currencies.map(c => (
                            <div
                                key={c.code}
                                className="flex flex-col items-center justify-center p-6 rounded-2xl border bg-background hover:border-indigo-500 hover:shadow-lg transition-all text-center group"
                            >
                                <span className="font-black text-2xl mb-1 text-indigo-600 group-hover:scale-110 transition-all font-outfit uppercase">
                                    {c.code}
                                </span>
                                <span className="text-xs text-muted-foreground font-bold line-clamp-1">{c.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
