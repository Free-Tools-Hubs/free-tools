import { CurrencyConverterTemplate } from '@/components/tools/CurrencyConverterTemplate';
import { currencies, commonCurrencyPairs } from '@/data/currencies';
import { getExchangeRate } from '@/lib/currency-api';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    // Top 8 common pairs to build statically at build time
    return commonCurrencyPairs.map((pair) => ({
        slug: `${pair.from.toLowerCase()}-to-${pair.to.toLowerCase()}`,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const match = slug.match(/^([a-z]{3})-to-([a-z]{3})$/);
    if (!match) return { title: 'Not Found' };

    const fromCode = match[1].toUpperCase();
    const toCode = match[2].toUpperCase();

    const fromCurrency = currencies.find(c => c.code === fromCode);
    const toCurrency = currencies.find(c => c.code === toCode);

    if (!fromCurrency || !toCurrency) return { title: 'Not Found' };

    return {
        title: `Convert ${fromCurrency.name} (${fromCode}) to ${toCurrency.name} (${toCode}) | Live Rates`,
        description: `Get real-time exchange rates for ${fromCurrency.name} to ${toCurrency.name}. Accurate ${fromCode} to ${toCode} converter for personal and educational use.`,
        keywords: `${fromCurrency.name}, ${toCurrency.name}, currency converter, exchange rate, ${fromCode}, ${toCode}`,
        openGraph: {
            title: `Convert ${fromCurrency.name} (${fromCode}) to ${toCurrency.name} (${toCode}) | Live Rates`,
            description: `Get real-time exchange rates for ${fromCurrency.name} to ${toCurrency.name}. Accurate ${fromCode} to ${toCode} converter for personal and educational use.`,
            type: 'website',
            url: `https://freetoolshubs.com/currency/${slug}`,
            siteName: 'Free Tools',
            images: [
                {
                    url: `https://freetoolshubs.com/currency/${slug}.png`,
                    width: 1200,
                    height: 630,
                    alt: `Convert ${fromCurrency.name} (${fromCode}) to ${toCurrency.name} (${toCode}) | Live Rates`,
                },
            ],
        },
        twitter: {
            title: `Convert ${fromCurrency.name} (${fromCode}) to ${toCurrency.name} (${toCode}) | Live Rates`,
            description: `Get real-time exchange rates for ${fromCurrency.name} to ${toCurrency.name}. Accurate ${fromCode} to ${toCode} converter for personal and educational use.`,
            card: 'summary_large_image',
            images: [
                {
                    url: `https://freetoolshubs.com/currency/${slug}.png`,
                    width: 1200,
                    height: 630,
                    alt: `Convert ${fromCurrency.name} (${fromCode}) to ${toCurrency.name} (${toCode}) | Live Rates`,
                },
            ],
        },
    };
}

export default async function CurrencyPage({ params }: PageProps) {
    const { slug } = await params;
    const match = slug.match(/^([a-z]{3})-to-([a-z]{3})$/);
    if (!match) notFound();

    const fromCode = match[1].toUpperCase();
    const toCode = match[2].toUpperCase();

    const fromCurrency = currencies.find(c => c.code === fromCode);
    const toCurrency = currencies.find(c => c.code === toCode);

    if (!fromCurrency || !toCurrency) notFound();

    const rate = await getExchangeRate(fromCode, toCode);
    if (!rate) notFound();

    return (
        <>
            <JsonLd data={{
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": `Convert ${fromCurrency.name} to ${toCurrency.name}`,
                "description": `Real-time exchange rate for ${fromCode} to ${toCode}.`,
                "mainEntity": {
                    "@type": "ExchangeRateSpecification",
                    "currency": toCode,
                    "currentExchangeRate": {
                        "@type": "UnitPriceSpecification",
                        "price": rate,
                        "priceCurrency": toCode
                    }
                }
            }} />
            <CurrencyConverterTemplate
                from={fromCode}
                to={toCode}
                fromName={fromCurrency.name}
                toName={toCurrency.name}
                rate={rate}
                lastUpdate={new Date().toISOString()}
            />
        </>
    );
}
