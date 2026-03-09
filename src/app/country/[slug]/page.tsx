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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const country = countries.find((c) => c.slug === slug);

    if (!country) return { title: 'Not Found' };

    return {
        title: `${country.name} - Country Profile, Facts & Information`,
        description: `Explore facts about ${country.name}: capital (${country.capital}), population (${country.population}), currency (${country.currency}), calling code, and more.`,
        keywords: `${country.name}, country facts, ${country.capital}, ${country.population}, ${country.currency}, ${country.callingCode}`,
        openGraph: {
            title: `${country.name} - Country Profile, Facts & Information`,
            description: `Explore facts about ${country.name}: capital (${country.capital}), population (${country.population}), currency (${country.currency}), calling code, and more.`,
            type: 'website',
            url: `https://free-tools-steel.vercel.app/country/${slug}`,
            siteName: 'Free Tools',
            images: [
                {
                    url: `https://free-tools-steel.vercel.app/country/${slug}.png`,
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
            images: [
                {
                    url: `https://free-tools-steel.vercel.app/country/${slug}.png`,
                    width: 1200,
                    height: 630,
                    alt: `${country.name} - Country Profile, Facts & Information`,
                },
            ],
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
                "url": `https://free-tools-steel.vercel.app/country/${slug}`
            }} />
            <CountryTemplate {...country} />
        </>
    );
}
