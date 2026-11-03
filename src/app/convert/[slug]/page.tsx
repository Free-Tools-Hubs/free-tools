import { ConversionTemplate } from '@/components/tools/ConversionTemplate';
import conversions from '@/data/conversions';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/config';

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

    const canonical = `/convert/${slug}`;

    return {
        title: `Convert ${conversion.fromName} to ${conversion.toName} (${conversion.fromUnit} to ${conversion.toUnit}) | ${SITE_NAME}`,
        description: `Free online converter for ${conversion.fromName} to ${conversion.toName}. Accurate results for ${conversion.category} conversions.`,
        keywords: `${conversion.fromName}, ${conversion.toName}, ${conversion.category} converter, online converter, free converter`,
        alternates: {
            canonical,
        },
        openGraph: {
            title: `Convert ${conversion.fromName} to ${conversion.toName} (${conversion.fromUnit} to ${conversion.toUnit}) | ${SITE_NAME}`,
            description: `Free online converter for ${conversion.fromName} to ${conversion.toName}. Accurate results for ${conversion.category} conversions.`,
            type: 'website',
            url: `${SITE_URL}${canonical}`,
            siteName: SITE_NAME,
            images: [
                {
                    url: '/og.png',
                    width: 1200,
                    height: 630,
                    alt: `Convert ${conversion.fromName} to ${conversion.toName} (${conversion.fromUnit} to ${conversion.toUnit})`,
                },
            ],
        },
        twitter: {
            title: `Convert ${conversion.fromName} to ${conversion.toName} (${conversion.fromUnit} to ${conversion.toUnit}) | ${SITE_NAME}`,
            description: `Free online converter for ${conversion.fromName} to ${conversion.toName}. Accurate results for ${conversion.category} conversions.`,
            card: 'summary_large_image',
            images: ['/og.png'],
        },
    };
}

export default async function ConversionPage({ params }: PageProps) {
    const { slug } = await params;
    const conversion = conversions.find((c) => c.slug === slug);

    if (!conversion) notFound();

    return <ConversionTemplate {...conversion} />;
}
