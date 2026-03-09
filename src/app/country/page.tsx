import countries from '@/data/countries';
import { Globe } from 'lucide-react';
import Link from 'next/link';
import { ClientSearch } from '@/components/tools/ClientSearch';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

import { JsonLd } from '@/components/seo/JsonLd';

export const metadata = {
    title: 'Country Facts & Information Hub - Global Database',
    description: 'Explore comprehensive data about every country: population, currency, languages, capital cities, and regional info. Your go-to guide for global information.',
    keywords: ['country facts', 'national information', 'global country database', 'world geography', 'country statistics'],
    openGraph: {
        title: 'Country Facts & Information Hub - Global Database',
        description: 'Explore comprehensive data about every country: population, currency, languages, capital cities, and regional info. Your go-to guide for global information.',
        type: 'website',
        url: 'https://free-tools-steel.vercel.app/country',
        siteName: 'Free Tools',
        images: [
            {
                url: 'https://free-tools-steel.vercel.app/country.png',
                width: 1200,
                height: 630,
                alt: 'Country Facts & Information Hub - Global Database',
            },
        ],
    },
    twitter: {
        title: 'Country Facts & Information Hub - Global Database',
        description: 'Explore comprehensive data about every country: population, currency, languages, capital cities, and regional info. Your go-to guide for global information.',
        card: 'summary_large_image',
        images: [
            {
                url: 'https://free-tools-steel.vercel.app/country.png',
                width: 1200,
                height: 630,
                alt: 'Country Facts & Information Hub - Global Database',
            },
        ],
    },
};

export default function CountryHubPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <JsonLd data={{
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Country Information Hub",
                "description": "Comprehensive database of country facts and national information.",
                "url": "https://free-tools-steel.vercel.app/country"
            }} />
            <Header />
            <main className="flex-grow pt-32 pb-20 container mx-auto px-4 max-w-5xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 font-outfit">Country Information Hub</h1>
                    <p className="text-muted-foreground text-lg">Search for a country or browse popular destinations below.</p>
                </div>

                <ClientSearch basePath="/country" placeholder="E.g. France, Japan, Brazil..." />

                <div className="mb-8 p-8 glass-card">
                    <h2 className="text-2xl font-bold mb-6 font-outfit text-center">Popular Countries</h2>
                    <div className="flex flex-wrap gap-4 justify-center">
                        {countries.map(country => (
                            <Link
                                key={country.slug}
                                href={`/country/${country.slug}`}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-background hover:bg-surface-50 dark:hover:bg-surface-900 !border-border hover:!border-brand-primary transition-all shadow-sm"
                            >
                                <Globe size={16} className="text-brand-primary" />
                                <span className="font-medium">{country.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
