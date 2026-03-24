import { ConversionTemplate } from '@/components/tools/ConversionTemplate';
import conversions from '@/data/conversions';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    return conversions.map((c) => ({
        slug: c.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const conversion = conversions.find((c) => c.slug === slug);

    if (!conversion) return { title: 'Not Found' };

    return {
        title: `Convert ${conversion.fromName} to ${conversion.toName} (${conversion.fromUnit} to ${conversion.toUnit})`,
        description: `Free online converter for ${conversion.fromName} to ${conversion.toName}. Accurate results for ${conversion.category} conversions.`,
        keywords: `${conversion.fromName}, ${conversion.toName}, ${conversion.category} converter, online converter, free converter`,
        openGraph: {
            title: `Convert ${conversion.fromName} to ${conversion.toName} (${conversion.fromUnit} to ${conversion.toUnit})`,
            description: `Free online converter for ${conversion.fromName} to ${conversion.toName}. Accurate results for ${conversion.category} conversions.`,
            type: 'website',
            url: `https://freetoolshubs.com/convert/${conversion.slug}`,
            siteName: 'Free Tools',
            images: [
                {
                    url: `https://freetoolshubs.com/convert/${conversion.slug}.png`,
                    width: 1200,
                    height: 630,
                    alt: `Convert ${conversion.fromName} to ${conversion.toName} (${conversion.fromUnit} to ${conversion.toUnit})`,
                },
            ],
        },
        twitter: {
            title: `Convert ${conversion.fromName} to ${conversion.toName} (${conversion.fromUnit} to ${conversion.toUnit})`,
            description: `Free online converter for ${conversion.fromName} to ${conversion.toName}. Accurate results for ${conversion.category} conversions.`,
            card: 'summary_large_image',
            images: [
                {
                    url: `https://freetoolshubs.com/convert/${conversion.slug}.png`,
                    width: 1200,
                    height: 630,
                    alt: `Convert ${conversion.fromName} to ${conversion.toName} (${conversion.fromUnit} to ${conversion.toUnit})`,
                },
            ],
        },
    };
}

export default async function ConversionPage({ params }: PageProps) {
    const { slug } = await params;
    const conversion = conversions.find((c) => c.slug === slug);

    if (!conversion) notFound();

    return <ConversionTemplate {...conversion} />;
}
