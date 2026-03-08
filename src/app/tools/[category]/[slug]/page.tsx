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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const tool = tools.find((t) => t.slug === slug);

    if (!tool) return { title: 'Tool Not Found' };

    return {
        title: `${tool.title} | FreeToolsHub`,
        description: tool.description,
        keywords: tool.keywords.join(', '),
        openGraph: {
            title: tool.title,
            description: tool.description,
            type: 'website',
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
