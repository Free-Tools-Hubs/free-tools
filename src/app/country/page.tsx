import { Suspense } from 'react';
import countries from '@/data/countries';
import { Globe, Map, Users, Coins, Info } from 'lucide-react';
import { ClientSearch } from '@/components/tools/ClientSearch';
import { ExplorerGrid } from '@/components/tools/ExplorerGrid';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { generateCountryHubArticle } from '@/lib/seo-generator';

import { JsonLd } from '@/components/seo/JsonLd';

import { SITE_URL, SITE_NAME } from '@/lib/config';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export const metadata = {
    title: `Country Facts & Information Hub - Global Database | ${SITE_NAME}`,
    description: 'Explore comprehensive data about every country: population, currency, languages, capital cities, and regional info. Your go-to guide for global information.',
    keywords: ['country facts', 'national information', 'global country database', 'world geography', 'country statistics', 'population data'],
    alternates: { canonical: '/country' },
    openGraph: {
        title: `Country Facts & Information Hub - Global Database | ${SITE_NAME}`,
        description: 'Explore comprehensive data about every country: population, currency, languages, capital cities, and regional info. Your go-to guide for global information.',
        type: 'website',
        url: `${SITE_URL}/country`,
        siteName: SITE_NAME,
    },
    twitter: {
        title: `Country Facts & Information Hub - Global Database | ${SITE_NAME}`,
        description: 'Explore comprehensive data about every country: population, currency, languages, capital cities, and regional info. Your go-to guide for global information.',
    }
};

export default function CountryHubPage() {
    const article = generateCountryHubArticle();
    const countryNames = countries.map(c => c.name);

    return (
        <div className="min-h-screen flex flex-col bg-surface-50 dark:bg-surface-950">
            <JsonLd data={{
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": `Country Information Hub | ${SITE_NAME}`,
                "description": "Comprehensive database of country facts and national information.",
                "url": `${SITE_URL}/country`
            }} />
            <Header />

            <main className="flex-grow pt-32 pb-20 container mx-auto px-4 max-w-6xl">
                <Breadcrumbs 
                    items={[{ label: 'Country Hub', href: '/country' }]} 
                />
                {/* Hero Section */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-sm mb-6 border border-brand-primary/20">
                        <Globe size={16} />
                        <span>Global Geographic & Demographic Data</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 font-outfit tracking-tight leading-tight">
                        Country <span className="text-brand-primary">Facts</span> Hub
                    </h1>
                    <p className="text-muted-foreground text-xl leading-relaxed">
                        An exhaustive programmatic database of nations across every continent, from population demographics to regional currencies.
                    </p>
                </div>

                {/* Search Interaction */}
                <div className="mb-20">
                    <ClientSearch basePath="/country" placeholder="Search a country (e.g. France, China, Brazil...)" />
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    <div className="glass-card p-8 group hover:!border-brand-primary/50 transition-all">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Users size={24} />
                        </div>
                        <h3 className="text-xl font-bold font-outfit mb-3">Population Data</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">Live demographic statistics helping you understand the scale and human density of any national region.</p>
                    </div>
                    <div className="glass-card p-8 group hover:!border-brand-primary/50 transition-all">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Coins size={24} />
                        </div>
                        <h3 className="text-xl font-bold font-outfit mb-3">Currency Info</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">Instantly verify primary economic mediums and financial standards used across different sovereign territories.</p>
                    </div>
                    <div className="glass-card p-8 group hover:!border-brand-primary/50 transition-all">
                        <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Map size={24} />
                        </div>
                        <h3 className="text-xl font-bold font-outfit mb-3">Regional Mapping</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">Explore geopolitical regions, capital cities, and linguistic distributions for every recognized country.</p>
                    </div>
                </div>

                {/* The Alphabetical Explorer */}
                <Suspense fallback={<div className="h-64 animate-pulse bg-muted rounded-xl" />}>
                    <ExplorerGrid
                        items={countries.map(c => ({
                            label: c.name,
                            slug: c.slug
                        }))}
                        basePath="/country"
                        title="Country"
                        itemIcon={<Globe size={14} />}
                    />
                </Suspense>

                {/* Rich SEO Content Section */}
                <div className="mt-20 border-t pt-20">
                    <div className="max-w-4xl mx-auto space-y-12">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-black font-outfit flex items-center gap-3">
                                <Info className="text-brand-primary" />
                                Analyzing the Global Geopolitical Landscape
                            </h2>
                            {article.map((para, i) => (
                                <p key={i} className="text-lg text-muted-foreground leading-relaxed text-justify">
                                    {para}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

