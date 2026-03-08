"use client";

import dynamic from 'next/dynamic';
import { Sparkles } from 'lucide-react';

// Dynamically import all tools with SSR disabled
const WordCounter = dynamic(() => import('@/tools/text/WordCounter'), { ssr: false });
const Base64Tool = dynamic(() => import('@/tools/developer/Base64Tool'), { ssr: false });
const CharacterCounterTool = dynamic(() => import('@/tools/text/CharacterCounterTool'), { ssr: false });
const CaseConverterTool = dynamic(() => import('@/tools/text/CaseConverterTool'), { ssr: false });
const RemoveDuplicateLinesTool = dynamic(() => import('@/tools/text/RemoveDuplicateLinesTool'), { ssr: false });
const SortTextLinesTool = dynamic(() => import('@/tools/text/SortTextLinesTool'), { ssr: false });
const TextDiffCheckerTool = dynamic(() => import('@/tools/text/TextDiffCheckerTool'), { ssr: false });
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
const MergePdfTool = dynamic(() => import('@/tools/pdf/MergePdfTool'), { ssr: false });
const SplitPdfTool = dynamic(() => import('@/tools/pdf/SplitPdfTool'), { ssr: false });
const RotatePdfTool = dynamic(() => import('@/tools/pdf/RotatePdfTool'), { ssr: false });
const CompressPdfTool = dynamic(() => import('@/tools/pdf/CompressPdfTool'), { ssr: false });
const AddWatermarkToPdfTool = dynamic(() => import('@/tools/pdf/AddWatermarkToPdfTool'), { ssr: false });
const UnlockPdfTool = dynamic(() => import('@/tools/pdf/UnlockPdfTool'), { ssr: false });
const ProtectPdfTool = dynamic(() => import('@/tools/pdf/ProtectPdfTool'), { ssr: false });
const PdfToWordTool = dynamic(() => import('@/tools/pdf/PdfToWordTool'), { ssr: false });
const WordToPdfTool = dynamic(() => import('@/tools/pdf/WordToPdfTool'), { ssr: false });
const ExcelToPdfTool = dynamic(() => import('@/tools/pdf/ExcelToPdfTool'), { ssr: false });
const PowerpointToPdfTool = dynamic(() => import('@/tools/pdf/PowerpointToPdfTool'), { ssr: false });

interface ToolRendererProps {
    slug: string;
    toolTitle: string;
}

export function ToolRenderer({ slug, toolTitle }: ToolRendererProps) {
    switch (slug) {
        case 'word-counter':
            return <WordCounter />;
        case 'character-counter':
            return <CharacterCounterTool />;
        case 'case-converter':
            return <CaseConverterTool />;
        case 'remove-duplicate-lines':
            return <RemoveDuplicateLinesTool />;
        case 'sort-text-lines':
            return <SortTextLinesTool />;
        case 'text-diff-checker':
            return <TextDiffCheckerTool />;
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
        case 'merge-pdf':
            return <MergePdfTool />;
        case 'split-pdf':
            return <SplitPdfTool />;
        case 'rotate-pdf':
            return <RotatePdfTool />;
        case 'compress-pdf':
            return <CompressPdfTool />;
        case 'add-watermark-to-pdf':
            return <AddWatermarkToPdfTool />;
        case 'unlock-pdf':
            return <UnlockPdfTool />;
        case 'protect-pdf':
            return <ProtectPdfTool />;
        case 'pdf-to-word':
            return <PdfToWordTool />;
        case 'word-to-pdf':
            return <WordToPdfTool />;
        case 'excel-to-pdf':
            return <ExcelToPdfTool />;
        case 'powerpoint-to-pdf':
            return <PowerpointToPdfTool />;
        default:
            return (
                <div className="p-8 flex flex-col items-center justify-center text-center gap-6 min-h-[400px]">
                    <div className="w-20 h-20 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary animate-pulse">
                        <span className="text-3xl font-black italic">!</span>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-2">Interface Coming Soon</h3>
                        <p className="text-muted-foreground max-w-md mx-auto">
                            We are currently building the specialized interface for <strong>{toolTitle}</strong>.
                            Stay tuned for a high-performance experience.
                        </p>
                    </div>
                    <button className="px-6 py-2 bg-primary text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-all flex items-center gap-2">
                        <Sparkles className="w-4 h-4" /> Notify Me
                    </button>
                </div>
            );
    }
}
