import { CountryTemplate } from '@/components/tools/CountryTemplate';
import countries from '@/data/countries';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    return countries.map((c) => ({
        slug: c.slug,
    }));
}

import { SITE_URL, SITE_NAME } from '@/lib/config';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const country = countries.find((c) => c.slug === slug);

    if (!country) return { title: 'Not Found' };

    const canonical = `/country/${slug}`;

    return {
        title: `${country.name} - Country Profile, Facts & Information`,
        description: `Explore facts about ${country.name}: capital (${country.capital}), population (${country.population}), currency (${country.currency}), calling code, and more.`,
        keywords: `${country.name}, country facts, ${country.capital}, ${country.population}, ${country.currency}, ${country.callingCode}`,
        alternates: { canonical },
        openGraph: {
            title: `${country.name} - Country Profile, Facts & Information`,
            description: `Explore facts about ${country.name}: capital (${country.capital}), population (${country.population}), currency (${country.currency}), calling code, and more.`,
            type: 'website',
            url: `${SITE_URL}${canonical}`,
            siteName: SITE_NAME,
            images: [
                {
                    url: `/og.png`,
                    width: 1200,
                    height: 630,
                    alt: `${country.name} - Country Profile, Facts & Information`,
                },
            ],
        },
        twitter: {
            title: `${country.name} - Country Profile, Facts & Information`,
            description: `Explore facts about ${country.name}: capital (${country.capital}), population (${country.population}), currency (${country.currency}), calling code, and more.`,
            card: 'summary_large_image',
            images: [`/og.png`],
        },
    };
}

export default async function CountryPage({ params }: PageProps) {
    const { slug } = await params;
    const country = countries.find((c) => c.slug === slug);

    if (!country) notFound();

    return (
        <>
            <JsonLd data={{
                "@context": "https://schema.org",
                "@type": "Country",
                "name": country.name,
                "description": `Facts and information about ${country.name}. Capital: ${country.capital}, Population: ${country.population}.`,
                "url": `${SITE_URL}/country/${slug}`
            }} />
            <CountryTemplate {...country} />
        </>
    );
}
