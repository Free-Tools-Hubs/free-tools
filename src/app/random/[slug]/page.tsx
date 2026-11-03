import { RandomTemplate } from '@/components/tools/RandomTemplate';
import randoms from '@/data/randoms';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/config';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    return randoms.map((r) => ({
        slug: r.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const randomItem = randoms.find((r) => r.slug === slug);

    if (!randomItem) return { title: 'Not Found' };

    const canonical = `/random/${slug}`;

    return {
        title: `${randomItem.name} Generator | Free Online Tool | ${SITE_NAME}`,
        description: randomItem.description,
        keywords: randomItem.name,
        alternates: {
            canonical,
        },
        openGraph: {
            title: `${randomItem.name} Generator | Free Online Tool | ${SITE_NAME}`,
            description: randomItem.description,
            type: 'website',
            url: `${SITE_URL}${canonical}`,
            siteName: SITE_NAME,
            images: [
                {
                    url: '/og.png',
                    width: 1200,
                    height: 630,
                    alt: `${randomItem.name} Generator | Free Online Tool`,
                },
            ],
        },
        twitter: {
            title: `${randomItem.name} Generator | Free Online Tool | ${SITE_NAME}`,
            description: randomItem.description,
            card: 'summary_large_image',
            images: ['/og.png'],
        },
    };
}

export default async function RandomPage({ params }: PageProps) {
    const { slug } = await params;
    const randomItem = randoms.find((r) => r.slug === slug);

    if (!randomItem) notFound();

    return <RandomTemplate {...randomItem} />;
}
