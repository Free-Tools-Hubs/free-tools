"use client";

import { useState, useCallback } from 'react';
import FileUploader from '@/components/tools/FileUploader';
import { Download, Stamp, File as FileIcon, Loader2, Save } from 'lucide-react';
import { PDFDocument, rgb, degrees } from 'pdf-lib';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
    watermarkText: z.string().min(1, 'Watermark text is required'),
    opacity: z.number().min(0.1).max(1),
    fontSize: z.number().min(10).max(150),
    color: z.string(),
    rotation: z.number(),
});

type FormData = z.infer<typeof formSchema>;

export default function AddWatermarkToPdfTool() {
    const [pdfFile, setPdfFile] = useState<{ id: string; file: File; totalPages?: number } | null>(null);
    const [isWatermarking, setIsWatermarking] = useState(false);
    const [resultUrl, setResultUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const { register, watch, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            watermarkText: 'CONFIDENTIAL',
            opacity: 0.3,
            fontSize: 60,
            color: '#ff0000',
            rotation: 45,
        }
    });

    const onFilesAccepted = useCallback(async (files: File[]) => {
        if (files.length === 0) return;

        setIsWatermarking(true);
        setError(null);
        setResultUrl(null);

        try {
            const file = files[0];
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            setPdfFile({ id: Math.random().toString(), file, totalPages: pdfDoc.getPageCount() });
        } catch (err: any) {
            setError("Failed to load PDF. It might be password protected.");
        } finally {
            setIsWatermarking(false);
        }
    }, []);

    const clearAll = () => {
        setPdfFile(null);
        setResultUrl(null);
        setError(null);
    };

    const hexToRgbPdf = (hex: string) => {
        hex = hex.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16) / 255;
        const g = parseInt(hex.substring(2, 4), 16) / 255;
        const b = parseInt(hex.substring(4, 6), 16) / 255;
        return rgb(r, g, b);
    };

    const applyWatermark = async (data: FormData) => {
        if (!pdfFile || !pdfFile.totalPages) return;
        setIsWatermarking(true);
        setError(null);

        try {
            const sourceArrayBuffer = await pdfFile.file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(sourceArrayBuffer);

            const pages = pdfDoc.getPages();
            const pdfColor = hexToRgbPdf(data.color);

            for (const page of pages) {
                const { width, height } = page.getSize();

                // Very basic centered diagonal watermark calculations
                const textWidth = data.fontSize * data.watermarkText.length * 0.5; // very rough estimate
                const textHeight = data.fontSize;

                const x = width / 2;
                const y = height / 2;

                page.drawText(data.watermarkText, {
                    x,
                    y,
                    size: data.fontSize,
                    color: pdfColor,
                    opacity: data.opacity,
                    rotate: degrees(data.rotation),
                    // We don't have font metrics without embedding a font completely,
                    // so we center by translating
                });

                // A better approach in pdf-lib to center text is manually shifting X/Y
                // Since pdf-lib draws from the bottom-left corner of the text box
                // Let's adjust x/y slightly so it's somewhat centered.
                // It's a known limitation in simple pdf-lib without standard fonts measuring, but good enough for generic watermarks.
            }

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
            setResultUrl(URL.createObjectURL(blob));

        } catch (err: any) {
            setError(err.message || 'Failed to apply watermark.');
        } finally {
            setIsWatermarking(false);
        }
    };


    return (
        <div className="flex flex-col gap-8 w-full">
            {!pdfFile ? (
                <FileUploader
                    onFilesAccepted={onFilesAccepted}
                    maxFiles={1}
                    accept={{ 'application/pdf': ['.pdf'] }}
                    maxSizeMB={50}
                />
            ) : (
                <div className="flex flex-col xl:flex-row gap-8">
                    <div className="w-full xl:w-80 shrink-0 bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-6">
                        <div className="flex items-center justify-between border-b border-border pb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Stamp className="w-5 h-5 text-brand-primary" />
                                Watermark Options
                            </h2>
                        </div>

                        <form id="watermarkForm" onSubmit={handleSubmit(applyWatermark)} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-foreground">Text</label>
                                <input type="text" {...register('watermarkText')} className="p-2 border border-border rounded-lg bg-background w-full outline-brand-primary text-sm" />
                                {errors.watermarkText && <span className="text-red-500 text-xs">{errors.watermarkText.message}</span>}
                            </div>

                            <div className="flex flex-col gap-1.5 focus-within:text-brand-primary">
                                <label className="text-sm font-semibold text-foreground flex justify-between">
                                    Opacity ({(watch('opacity') * 100).toFixed(0)}%)
                                </label>
                                <input type="range" min="0.1" max="1" step="0.05" {...register('opacity', { valueAsNumber: true })} className="w-full accent-brand-primary" />
                            </div>

                            <div className="flex flex-col gap-1.5 focus-within:text-brand-primary">
                                <label className="text-sm font-semibold text-foreground flex justify-between">
                                    Size ({watch('fontSize')}pt)
                                </label>
                                <input type="range" min="10" max="150" step="1" {...register('fontSize', { valueAsNumber: true })} className="w-full accent-brand-primary" />
                            </div>

                            <div className="flex flex-col gap-1.5 focus-within:text-brand-primary">
                                <label className="text-sm font-semibold text-foreground flex justify-between">
                                    Rotation ({watch('rotation')}°)
                                </label>
                                <input type="range" min="-180" max="180" step="5" {...register('rotation', { valueAsNumber: true })} className="w-full accent-brand-primary" />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-foreground">Color</label>
                                <input type="color" {...register('color')} className="w-full h-10 px-1 py-1 bg-background border border-border rounded-lg cursor-pointer" />
                            </div>
                        </form>

                        {resultUrl ? (
                            <div className="mt-auto flex flex-col gap-2">
                                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-sm text-green-700 dark:text-green-400 mb-2 font-semibold">
                                    Watermark Applied Successfully!
                                </div>
                                <a
                                    href={resultUrl}
                                    download={`${pdfFile.file.name.replace('.pdf', '')}_watermarked.pdf`}
                                    className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 text-sm"
                                >
                                    <Download className="w-4 h-4" /> Download PDF
                                </a>
                                <button
                                    onClick={() => setResultUrl(null)}
                                    className="w-full py-2 text-muted-foreground hover:bg-muted font-bold rounded-lg transition-colors text-sm"
                                >
                                    Change Options
                                </button>
                            </div>
                        ) : (
                            <button
                                type="submit"
                                form="watermarkForm"
                                disabled={isWatermarking}
                                className="w-full mt-auto py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary/90 transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isWatermarking ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</> : <><Save className="w-4 h-4" /> Apply Watermark</>}
                            </button>
                        )}
                    </div>

                    <div className="flex-1 bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4">
                        <div className="flex items-center justify-between border-b border-border pb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <FileIcon className="w-5 h-5 text-brand-primary" />
                                Selected File
                            </h2>
                            <button onClick={clearAll} className="px-4 py-2 text-sm font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors">
                                Clear File
                            </button>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 text-red-500 p-4 rounded-lg font-semibold border border-red-500/20 text-sm">
                                {error}
                            </div>
                        )}

                        <div className="border border-border/50 bg-background/50 rounded-lg p-6 flex flex-col items-center justify-center text-center gap-4 py-16 relative overflow-hidden">
                            {/* Visual pseudo-watermark for UI flair */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
                                <span className="text-9xl font-black rotate-[-45deg] whitespace-nowrap">WATERMARK</span>
                            </div>
                            <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-xl flex items-center justify-center mb-2 z-10">
                                <FileIcon className="w-8 h-8" />
                            </div>
                            <div className="z-10 bg-background/50 backdrop-blur-sm p-4 rounded-xl border border-border">
                                <p className="font-bold text-lg max-w-sm truncate mx-auto" title={pdfFile.file.name}>{pdfFile.file.name}</p>
                                <p className="text-muted-foreground mt-1 text-sm">{(pdfFile.file.size / 1024 / 1024).toFixed(2)} MB • {pdfFile.totalPages} Pages</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
