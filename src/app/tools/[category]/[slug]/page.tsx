import { tools } from '@/data/tools';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ToolRenderer } from '@/components/tools/ToolRenderer';

interface PageProps {
    params: Promise<{
        category: string;
        slug: string;
    }>;
}

export async function generateStaticParams() {
    return tools.map((tool) => ({
        category: tool.category,
        slug: tool.slug,
    }));
}

import { SITE_URL, SITE_NAME } from '@/lib/config';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug, category } = await params;
    const tool = tools.find((t) => t.slug === slug);

    if (!tool) return { title: 'Tool Not Found' };

    const canonical = `/tools/${category}/${slug}`;

    return {
        title: `${tool.title} | ${SITE_NAME}`,
        description: tool.description,
        keywords: tool.keywords.join(', '),
        alternates: { canonical },
        openGraph: {
            title: tool.title,
            description: tool.description,
            type: 'website',
            url: `${SITE_URL}${canonical}`,
            siteName: SITE_NAME,
            images: [
                {
                    url: `${SITE_URL}/og-api?title=${encodeURIComponent(tool.title)}`,
                    width: 1200,
                    height: 630,
                    alt: tool.title,
                },
            ],
        },
        twitter: {
            title: tool.title,
            description: tool.description,
            card: 'summary_large_image',
            images: [`${SITE_URL}/og-api?title=${encodeURIComponent(tool.title)}`],
        },
    };
}

export default async function ToolPage({ params }: PageProps) {
    const { slug } = await params;
    const tool = tools.find((t) => t.slug === slug);

    if (!tool) notFound();

    return (
        <ToolPageLayout tool={tool}>
            <ToolRenderer slug={slug} toolTitle={tool.title} />
        </ToolPageLayout>
    );
}
