import { RandomTemplate } from '@/components/tools/RandomTemplate';
import randoms from '@/data/randoms';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

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

    return {
        title: `${randomItem.name} Generator | Free Online Tool`,
        description: randomItem.description,
        keywords: randomItem.name,
        openGraph: {
            title: `${randomItem.name} Generator | Free Online Tool`,
            description: randomItem.description,
            type: 'website',
            url: `https://free-tools-steel.vercel.app/random/${slug}`,
            siteName: 'Free Tools',
            images: [
                {
                    url: `https://free-tools-steel.vercel.app/random/${slug}.png`,
                    width: 1200,
                    height: 630,
                    alt: `${randomItem.name} Generator | Free Online Tool`,
                },
            ],
        },
        twitter: {
            title: `${randomItem.name} Generator | Free Online Tool`,
            description: randomItem.description,
            card: 'summary_large_image',
            images: [
                {
                    url: `https://free-tools-steel.vercel.app/random/${slug}.png`,
                    width: 1200,
                    height: 630,
                    alt: `${randomItem.name} Generator | Free Online Tool`,
                },
            ],
        },
    };
}

export default async function RandomPage({ params }: PageProps) {
    const { slug } = await params;
    const randomItem = randoms.find((r) => r.slug === slug);

    if (!randomItem) notFound();

    return <RandomTemplate {...randomItem} />;
}
