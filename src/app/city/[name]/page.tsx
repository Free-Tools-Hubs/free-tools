import { CityWeatherTemplate } from '@/components/tools/CityWeatherTemplate';
import { fetchWeatherData } from '@/lib/weather-api';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';

interface PageProps {
    params: Promise<{
        name: string;
    }>;
}

import { topCities } from '@/lib/data-dictionaries';

// Pre-build all discovered cities
export async function generateStaticParams() {
    return topCities.map(city => ({
        name: city.toLowerCase().replace(/ /g, '-')
    }));
}

import { SITE_URL, SITE_NAME } from '@/lib/config';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { name } = await params;
    const weather = await fetchWeatherData(name);

    if (!weather) return { title: 'Weather Information Not Found' };

    const cityName = weather.name;
    const canonical = `/city/${name}`;

    return {
        title: `Weather in ${cityName}: Current Forecast & Information`,
        description: `Everything about the weather in ${cityName} right now. Current temperature is ${Math.round(weather.main?.temp)}°C, with ${weather.weather?.[0]?.description}.`,
        keywords: `${cityName}, weather, forecast, ${weather.weather?.[0]?.description}, ${weather.main?.temp}°C, ${weather.main?.humidity}%, ${weather.wind?.speed} m/s`,
        alternates: { canonical },
        openGraph: {
            title: `Weather in ${cityName}: Current Forecast & Information`,
            description: `Everything about the weather in ${cityName} right now. Current temperature is ${Math.round(weather.main?.temp)}°C, with ${weather.weather?.[0]?.description}.`,
            type: 'website',
            url: `${SITE_URL}${canonical}`,
            siteName: SITE_NAME,
            images: [
                {
                    url: `${SITE_URL}/og-api?title=${encodeURIComponent(`Weather in ${cityName}`)}`,
                    width: 1200,
                    height: 630,
                    alt: `Weather in ${cityName}: Current Forecast & Information`,
                },
            ],
        },
        twitter: {
            title: `Weather in ${cityName}: Current Forecast & Information`,
            description: `Everything about the weather in ${cityName} right now. Current temperature is ${Math.round(weather.main?.temp)}°C, with ${weather.weather?.[0]?.description}.`,
            card: 'summary_large_image',
            images: [`${SITE_URL}/og-api?title=${encodeURIComponent(`Weather in ${cityName}`)}`],
        },
    };
}

export default async function CityPage({ params }: PageProps) {
    const { name } = await params;
    const weather = await fetchWeatherData(name);

    if (!weather) notFound();

    return (
        <>
            <JsonLd data={{
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": `Current Weather in ${weather.name}`,
                "description": `Live weather conditions for ${weather.name}, ${weather.sys?.country}.`,
                "mainEntity": {
                    "@type": "Place",
                    "name": weather.name,
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": weather.name,
                        "addressCountry": weather.sys?.country
                    }
                }
            }} />
            <CityWeatherTemplate
                city={weather.name}
                description={weather.weather?.[0]?.description || 'clear sky'}
                temp={weather.main?.temp}
                feelsLike={weather.main?.feels_like}
                humidity={weather.main?.humidity}
                windSpeed={weather.wind?.speed}
                country={weather.sys?.country}
                sunrise={weather.sys?.sunrise}
                sunset={weather.sys?.sunset}
            />
        </>
    );
}
