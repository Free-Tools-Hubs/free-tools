import { TimeConversionTemplate } from '@/components/tools/TimeConversionTemplate';
import times from '@/data/times';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/config';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    return times.map((t) => ({
        slug: t.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const timeConversion = times.find((t) => t.slug === slug);

    if (!timeConversion) return { title: 'Not Found' };

    const canonical = `/time/${slug}`;

    return {
        title: `Convert ${timeConversion.fromName} to ${timeConversion.toName} Time | ${SITE_NAME}`,
        description: `Free online time converter for ${timeConversion.fromName} (${timeConversion.fromZone}) to ${timeConversion.toName} (${timeConversion.toZone}).`,
        keywords: `${timeConversion.fromName}, ${timeConversion.toName}, time converter, ${timeConversion.fromZone}, ${timeConversion.toZone}`,
        alternates: {
            canonical,
        },
        openGraph: {
            title: `Convert ${timeConversion.fromName} to ${timeConversion.toName} Time | ${SITE_NAME}`,
            description: `Free online time converter for ${timeConversion.fromName} (${timeConversion.fromZone}) to ${timeConversion.toName} (${timeConversion.toZone}).`,
            type: 'website',
            url: `${SITE_URL}${canonical}`,
            siteName: SITE_NAME,
            images: [
                {
                    url: '/og.png',
                    width: 1200,
                    height: 630,
                    alt: `Convert ${timeConversion.fromName} to ${timeConversion.toName} Time`,
                },
            ],
        },
        twitter: {
            title: `Convert ${timeConversion.fromName} to ${timeConversion.toName} Time | ${SITE_NAME}`,
            description: `Free online time converter for ${timeConversion.fromName} (${timeConversion.fromZone}) to ${timeConversion.toName} (${timeConversion.toZone}).`,
            card: 'summary_large_image',
            images: ['/og.png'],
        },
    };
}

export default async function TimeConversionPage({ params }: PageProps) {
    const { slug } = await params;
    const timeConversion = times.find((t) => t.slug === slug);

    if (!timeConversion) notFound();

    return <TimeConversionTemplate {...timeConversion} slug={slug} />;
}
