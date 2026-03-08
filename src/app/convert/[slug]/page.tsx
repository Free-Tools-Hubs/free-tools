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
    };
}

export default async function ConversionPage({ params }: PageProps) {
    const { slug } = await params;
    const conversion = conversions.find((c) => c.slug === slug);

    if (!conversion) notFound();

    return <ConversionTemplate {...conversion} />;
}
