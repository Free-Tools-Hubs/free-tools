import { topCities } from '@/lib/data-dictionaries';
import { MapPin } from 'lucide-react';
import Link from 'next/link';
import { ClientSearch } from '@/components/tools/ClientSearch';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

import { JsonLd } from '@/components/seo/JsonLd';

export const metadata = {
    title: 'City Weather Hub - Real-Time Forecasts for 1000+ Cities',
    description: 'Get accurate, real-time weather forecasts, humidity, wind speed, and daylight information for cities worldwide. Search any city for instant weather data.',
    keywords: ['city weather', 'weather forecast', 'real-time weather', 'global weather hub', 'weather tracker'],
    openGraph: {
        title: 'City Weather Hub - Real-Time Forecasts for 1000+ Cities',
        description: 'Get accurate, real-time weather forecasts, humidity, wind speed, and daylight information for cities worldwide. Search any city for instant weather data.',
        type: 'website',
        url: 'https://free-tools-steel.vercel.app/city',
        siteName: 'Free Tools',
        images: [
            {
                url: 'https://free-tools-steel.vercel.app/city.png',
                width: 1200,
                height: 630,
                alt: 'City Weather Hub - Real-Time Forecasts for 1000+ Cities',
            },
        ],
    },
    twitter: {
        title: 'City Weather Hub - Real-Time Forecasts for 1000+ Cities',
        description: 'Get accurate, real-time weather forecasts, humidity, wind speed, and daylight information for cities worldwide. Search any city for instant weather data.',
        card: 'summary_large_image',
        images: [
            {
                url: 'https://free-tools-steel.vercel.app/city.png',
                width: 1200,
                height: 630,
                alt: 'City Weather Hub - Real-Time Forecasts for 1000+ Cities',
            },
        ],
    },
};

export default function CityHubPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <JsonLd data={{
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "City Weather Hub",
                "description": "Find real-time weather information for any city in the world.",
                "url": "https://free-tools-steel.vercel.app/city"
            }} />
            <Header />
            <main className="flex-grow pt-32 pb-20 container mx-auto px-4 max-w-5xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 font-outfit">City Weather Hub</h1>
                    <p className="text-muted-foreground text-lg">Search for a city or browse popular destinations below.</p>
                </div>

                <ClientSearch basePath="/city" placeholder="E.g. Tokyo, Paris, New York..." />

                <div className="mb-8 p-8 glass-card">
                    <h2 className="text-2xl font-bold mb-6 font-outfit text-center">Popular Cities</h2>
                    <div className="flex flex-wrap gap-4 justify-center">
                        {topCities.map(city => (
                            <Link
                                key={city}
                                href={`/city/${city.toLowerCase().replace(/ /g, '-')}`}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-background hover:bg-surface-50 dark:hover:bg-surface-900 !border-border hover:!border-brand-primary transition-all shadow-sm"
                            >
                                <MapPin size={16} className="text-brand-primary" />
                                <span className="font-medium">{city.replace(/-/g, ' ')}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
