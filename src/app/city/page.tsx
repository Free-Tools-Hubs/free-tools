import { Suspense } from 'react';
import { topCities } from '@/lib/data-dictionaries';
import { MapPin, Info, CloudSun, Wind, Thermometer } from 'lucide-react';
import { ClientSearch } from '@/components/tools/ClientSearch';
import { ExplorerGrid } from '@/components/tools/ExplorerGrid';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { generateCityHubArticle } from '@/lib/seo-generator';

import { JsonLd } from '@/components/seo/JsonLd';

import { SITE_URL, SITE_NAME } from '@/lib/config';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export const metadata = {
    title: `City Weather Hub - Real-Time Forecasts for 2000+ Cities | ${SITE_NAME}`,
    description: 'Get accurate, real-time weather forecasts, humidity, wind speed, and daylight information for cities worldwide. Search any city for instant weather data.',
    keywords: ['city weather', 'weather forecast', 'real-time weather', 'global weather hub', 'weather tracker', 'world cities weather'],
    alternates: { canonical: '/city' },
    openGraph: {
        title: `City Weather Hub - Real-Time Forecasts for 2000+ Cities | ${SITE_NAME}`,
        description: 'Get accurate, real-time weather forecasts, humidity, wind speed, and daylight information for cities worldwide. Search any city for instant weather data.',
        type: 'website',
        url: `${SITE_URL}/city`,
        siteName: SITE_NAME,
    },
    twitter: {
        title: `City Weather Hub - Real-Time Forecasts for 2000+ Cities | ${SITE_NAME}`,
        description: 'Get accurate, real-time weather forecasts, humidity, wind speed, and daylight information for cities worldwide. Search any city for instant weather data.',
    }
};

export default function CityHubPage() {
    const article = generateCityHubArticle();

    return (
        <div className="min-h-screen flex flex-col bg-surface-50 dark:bg-surface-950">
            <JsonLd data={{
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": `City Weather Hub | ${SITE_NAME}`,
                "description": "Find real-time weather information for any city in the world.",
                "url": `${SITE_URL}/city`
            }} />
            <Header />

            <main className="flex-grow pt-32 pb-20 container mx-auto px-4 max-w-6xl">
                <Breadcrumbs 
                    items={[{ label: 'City Weather Hub', href: '/city' }]} 
                />
                {/* Hero Section */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-sm mb-6 border border-brand-primary/20 animate-fade-in">
                        <CloudSun size={16} />
                        <span>Live Global Meteorological Database</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 font-outfit tracking-tight leading-tight">
                        City Weather <span className="text-brand-primary">Hub</span>
                    </h1>
                    <p className="text-muted-foreground text-xl leading-relaxed">
                        Access real-time atmospheric data, temperature trends, and local forecasts for thousands of cities globally.
                    </p>
                </div>

                {/* Search Interaction */}
                <div className="mb-20">
                    <ClientSearch basePath="/city" placeholder="Search any city (e.g. Tokyo, London, Dubai...)" />
                </div>

                {/* Feature Cards for SEO content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    <div className="glass-card p-8 group hover:!border-brand-primary/50 transition-all">
                        <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Thermometer size={24} />
                        </div>
                        <h3 className="text-xl font-bold font-outfit mb-3">Live Temperature</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">Get accurate Celsius and Fahrenheit readings with real-time solar positioning data for every coordinate.</p>
                    </div>
                    <div className="glass-card p-8 group hover:!border-brand-primary/50 transition-all">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Wind size={24} />
                        </div>
                        <h3 className="text-xl font-bold font-outfit mb-3">Wind Dynamics</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">Monitor wind speed and atmospheric pressure variables to plan your travel and outdoor activities with precision.</p>
                    </div>
                    <div className="glass-card p-8 group hover:!border-brand-primary/50 transition-all">
                        <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <MapPin size={24} />
                        </div>
                        <h3 className="text-xl font-bold font-outfit mb-3">Global Tracking</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">Our programmatic database covers thousands of urban centers, from major world capitals to smaller regional districts.</p>
                    </div>
                </div>

                {/* The Alphabetical Explorer - Prevents Link Bloat */}
                <Suspense fallback={<div className="h-64 animate-pulse bg-muted rounded-xl" />}>
                    <ExplorerGrid
                        items={topCities.map(city => ({
                            label: city,
                            slug: city.toLowerCase().trim().replace(/\s+/g, '-')
                        }))}
                        basePath="/city"
                        title="City"
                        itemIcon={<MapPin size={14} />}
                    />
                </Suspense>

                {/* Rich SEO Content Section */}
                <div className="mt-20 border-t pt-20">
                    <div className="max-w-4xl mx-auto space-y-12">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-black font-outfit flex items-center gap-3">
                                <Info className="text-brand-primary" />
                                Comprehensive City Weather Guide
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

