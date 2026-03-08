import { tools } from '@/data/tools';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const WordCounter = dynamic(() => import('@/tools/text/WordCounter'), { ssr: false });
const Base64Tool = dynamic(() => import('@/tools/developer/Base64Tool'), { ssr: false });
const PngToJpgTool = dynamic(() => import('@/tools/image/PngToJpgTool'), { ssr: false });
const JpgToPngTool = dynamic(() => import('@/tools/image/JpgToPngTool'), { ssr: false });
const ImageToPdfTool = dynamic(() => import('@/tools/image/ImageToPdfTool'), { ssr: false });
const CompressImageTool = dynamic(() => import('@/tools/image/CompressImageTool'), { ssr: false });
const ResizeImageTool = dynamic(() => import('@/tools/image/ResizeImageTool'), { ssr: false });
const WebpToJpgTool = dynamic(() => import('@/tools/image/WebpToJpgTool'), { ssr: false });
const HeicToJpgTool = dynamic(() => import('@/tools/image/HeicToJpgTool'), { ssr: false });
const CropImageTool = dynamic(() => import('@/tools/image/CropImageTool'), { ssr: false });
const ImageWatermarkTool = dynamic(() => import('@/tools/image/ImageWatermarkTool'), { ssr: false });
const ScreenshotToPdfTool = dynamic(() => import('@/tools/image/ScreenshotToPdfTool'), { ssr: false });
const PdfToJpgTool = dynamic(() => import('@/tools/image/PdfToJpgTool'), { ssr: false });
const BackgroundRemoverTool = dynamic(() => import('@/tools/image/BackgroundRemoverTool'), { ssr: false });

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

    const renderTool = () => {
        switch (slug) {
            case 'word-counter':
                return <WordCounter />;
            case 'base64-encode-decode':
                return <Base64Tool />;
            case 'png-to-jpg':
                return <PngToJpgTool />;
            case 'jpg-to-png':
                return <JpgToPngTool />;
            case 'image-to-pdf':
                return <ImageToPdfTool />;
            case 'compress-image':
                return <CompressImageTool />;
            case 'resize-image':
                return <ResizeImageTool />;
            case 'webp-to-jpg':
                return <WebpToJpgTool />;
            case 'heic-to-jpg':
                return <HeicToJpgTool />;
            case 'crop-image':
                return <CropImageTool />;
            case 'image-watermark':
                return <ImageWatermarkTool />;
            case 'screenshot-to-pdf':
                return <ScreenshotToPdfTool />;
            case 'pdf-to-jpg':
                return <PdfToJpgTool />;
            case 'background-remover':
                return <BackgroundRemoverTool />;
            default:
                return (
                    <div className="p-8 flex flex-col items-center justify-center text-center gap-6 min-h-[400px]">
                        <div className="w-20 h-20 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary animate-pulse">
                            <span className="text-3xl font-black italic">!</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Interface Coming Soon</h3>
                            <p className="text-muted-foreground max-w-md mx-auto">
                                We are currently building the specialized interface for <strong>{tool.title}</strong>.
                                Stay tuned for a high-performance experience.
                            </p>
                        </div>
                        <button className="px-6 py-2 bg-primary text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-all">
                            Notify Me
                        </button>
                    </div>
                );
        }
    };

    return (
        <ToolPageLayout tool={tool}>
            {renderTool()}
        </ToolPageLayout>
    );
}
