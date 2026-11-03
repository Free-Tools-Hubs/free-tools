import { CountdownTemplate } from '@/components/tools/CountdownTemplate';
import countdowns from '@/data/countdowns';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/config';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    return countdowns.map((c) => ({
        slug: c.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const countdown = countdowns.find((c) => c.slug === slug);

    if (!countdown) return { title: 'Not Found' };

    const canonical = `/countdown/${slug}`;

    return {
        title: `Countdown to ${countdown.eventName} | Live Timer | ${SITE_NAME}`,
        description: countdown.description,
        keywords: `${countdown.eventName}, countdown, live timer, ${countdown.eventName} date, how many days until ${countdown.eventName}`,
        alternates: {
            canonical,
        },
        openGraph: {
            title: `Countdown to ${countdown.eventName} | Live Timer | ${SITE_NAME}`,
            description: countdown.description,
            type: 'website',
            url: `${SITE_URL}${canonical}`,
            siteName: SITE_NAME,
            images: [
                {
                    url: '/og.png',
                    width: 1200,
                    height: 630,
                    alt: `Countdown to ${countdown.eventName} | Live Timer`,
                },
            ],
        },
        twitter: {
            title: `Countdown to ${countdown.eventName} | Live Timer | ${SITE_NAME}`,
            description: countdown.description,
            card: 'summary_large_image',
            images: ['/og.png'],
        },
    };
}

export default async function CountdownPage({ params }: PageProps) {
    const { slug } = await params;
    const countdown = countdowns.find((c) => c.slug === slug);

    if (!countdown) notFound();

    return <CountdownTemplate {...countdown} />;
}
