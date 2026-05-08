import { CountdownTemplate } from '@/components/tools/CountdownTemplate';
import countdowns from '@/data/countdowns';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

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

    return {
        title: `Countdown to ${countdown.eventName} | Live Timer`,
        description: countdown.description,
        keywords: `${countdown.eventName}, countdown, live timer, ${countdown.eventName} date, how many days until ${countdown.eventName}`,
        openGraph: {
            title: `Countdown to ${countdown.eventName} | Live Timer`,
            description: countdown.description,
            type: 'website',
            url: `https://freetoolshubs.com/countdown/${slug}`,
            siteName: 'Free Tools',
            images: [
                {
                    url: `https://freetoolshubs.com/countdown/${slug}.png`,
                    width: 1200,
                    height: 630,
                    alt: `Countdown to ${countdown.eventName} | Live Timer`,
                },
            ],
        },
        twitter: {
            title: `Countdown to ${countdown.eventName} | Live Timer`,
            description: countdown.description,
            card: 'summary_large_image',
            images: [
                {
                    url: `https://freetoolshubs.com/countdown/${slug}.png`,
                    width: 1200,
                    height: 630,
                    alt: `Countdown to ${countdown.eventName} | Live Timer`,
                },
            ],
        },
        alternates: {
            canonical: `/countdown/${slug}`
        }
    };
}

export default async function CountdownPage({ params }: PageProps) {
    const { slug } = await params;
    const countdown = countdowns.find((c) => c.slug === slug);

    if (!countdown) notFound();

    return <CountdownTemplate {...countdown} />;
}
