"use client";

import { useState, useCallback } from 'react';
import FileUploader from '@/components/tools/FileUploader';
import { Download, RotateCw, File as FileIcon, Loader2, RotateCcw, ArrowDownUp } from 'lucide-react';
import { PDFDocument, degrees } from 'pdf-lib';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
    rotationAngle: z.number(),
    targetPages: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function RotatePdfTool() {
    const [pdfFile, setPdfFile] = useState<{ id: string; file: File; totalPages?: number } | null>(null);
    const [isRotating, setIsRotating] = useState(false);
    const [resultUrl, setResultUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const { register, watch, setValue, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            rotationAngle: 90,
            targetPages: '',
        }
    });

    const rotationAngle = watch('rotationAngle');
    const targetPages = watch('targetPages');

    const onFilesAccepted = useCallback(async (files: File[]) => {
        if (files.length === 0) return;

        setIsRotating(true);
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
            setIsRotating(false);
        }
    }, []);

    const clearAll = () => {
        setPdfFile(null);
        setResultUrl(null);
        setError(null);
    };

    const parseRanges = (rangeStr: string, maxPages: number): number[] => {
        const pages = new Set<number>();
        const sections = rangeStr.split(',').map(s => s.trim()).filter(s => s);

        for (const section of sections) {
            if (section.includes('-')) {
                const [startStr, endStr] = section.split('-').map(s => s.trim());
                const start = parseInt(startStr);
                const end = parseInt(endStr);
                if (isNaN(start) || isNaN(end) || start < 1 || start > end) {
                    throw new Error(`Invalid range format: ${section}`);
                }
                for (let i = start; i <= Math.min(end, maxPages); i++) {
                    pages.add(i);
                }
            } else {
                const pageNum = parseInt(section);
                if (isNaN(pageNum) || pageNum < 1) {
                    throw new Error(`Invalid page number format: ${section}`);
                }
                if (pageNum <= maxPages) {
                    pages.add(pageNum);
                }
            }
        }
        return Array.from(pages).sort((a, b) => a - b);
    };

    const rotatePdf = async () => {
        if (!pdfFile || !pdfFile.totalPages) return;
        setIsRotating(true);
        setError(null);

        try {
            const sourceArrayBuffer = await pdfFile.file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(sourceArrayBuffer);
            const totalPages = pdfDoc.getPageCount();

            let pagesToRotate = new Set<number>();

            if (targetPages && targetPages.trim() !== '') {
                const parsed = parseRanges(targetPages, totalPages);
                if (parsed.length === 0) throw new Error("No valid pages found in the range.");
                parsed.forEach(p => pagesToRotate.add(p - 1)); // 0-based
            } else {
                // All pages
                for (let i = 0; i < totalPages; i++) pagesToRotate.add(i);
            }

            const pages = pdfDoc.getPages();

            for (let i = 0; i < pages.length; i++) {
                if (pagesToRotate.has(i)) {
                    const page = pages[i];
                    const currentRotation = page.getRotation().angle;
                    page.setRotation(degrees(currentRotation + rotationAngle));
                }
            }

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
            setResultUrl(URL.createObjectURL(blob));

        } catch (err: any) {
            setError(err.message || 'Failed to rotate PDF.');
        } finally {
            setIsRotating(false);
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
                    {/* Settings Sidebar */}
                    <div className="w-full xl:w-80 shrink-0 bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-6">
                        <div className="flex items-center justify-between border-b border-border pb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <RotateCw className="w-5 h-5 text-brand-primary" />
                                Rotate Settings
                            </h2>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1.5 focus-within:text-brand-primary">
                                <label className="text-sm font-semibold text-foreground">Direction</label>
                                <div className="grid grid-cols-3 gap-2">
                                    <button
                                        onClick={() => setValue('rotationAngle', 90)}
                                        className={`p-2 flex flex-col items-center justify-center gap-1 rounded border text-xs font-semibold transition-colors ${rotationAngle === 90 ? 'bg-brand-primary/10 border-brand-primary text-brand-primary' : 'bg-muted border-border hover:bg-muted/80 text-foreground'}`}
                                    >
                                        <RotateCw className="w-4 h-4" /> 90°
                                    </button>
                                    <button
                                        onClick={() => setValue('rotationAngle', -90)}
                                        className={`p-2 flex flex-col items-center justify-center gap-1 rounded border text-xs font-semibold transition-colors ${rotationAngle === -90 ? 'bg-brand-primary/10 border-brand-primary text-brand-primary' : 'bg-muted border-border hover:bg-muted/80 text-foreground'}`}
                                    >
                                        <RotateCcw className="w-4 h-4" /> Left
                                    </button>
                                    <button
                                        onClick={() => setValue('rotationAngle', 180)}
                                        className={`p-2 flex flex-col items-center justify-center gap-1 rounded border text-xs font-semibold transition-colors ${rotationAngle === 180 ? 'bg-brand-primary/10 border-brand-primary text-brand-primary' : 'bg-muted border-border hover:bg-muted/80 text-foreground'}`}
                                    >
                                        <ArrowDownUp className="w-4 h-4" /> 180°
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2">
                                <label className="text-sm font-semibold flex justify-between">
                                    Target Pages
                                    <span className="text-muted-foreground text-xs">Total: {pdfFile.totalPages} pages</span>
                                </label>
                                <input
                                    type="text"
                                    {...register('targetPages')}
                                    className="p-2 border border-border rounded-lg bg-background w-full outline-brand-primary text-sm"
                                    placeholder="e.g. 1, 3, 5-10"
                                />
                                <p className="text-xs text-muted-foreground">Leave blank to rotate all pages. Or specify individually.</p>
                            </div>
                        </div>

                        {resultUrl ? (
                            <div className="mt-auto flex flex-col gap-2">
                                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-sm text-green-700 dark:text-green-400 mb-2 font-semibold">
                                    PDF Rotated Successfully!
                                </div>
                                <a
                                    href={resultUrl}
                                    download={`${pdfFile.file.name.replace('.pdf', '')}_rotated.pdf`}
                                    className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 text-sm"
                                >
                                    <Download className="w-4 h-4" /> Download PDF
                                </a>
                                <button
                                    onClick={() => setResultUrl(null)}
                                    className="w-full py-2 text-muted-foreground hover:bg-muted font-bold rounded-lg transition-colors text-sm"
                                >
                                    Change Settings
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={rotatePdf}
                                disabled={isRotating}
                                className="w-full mt-auto py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary/90 transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isRotating ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</> : <><RotateCw className="w-4 h-4" /> Apply Rotation</>}
                            </button>
                        )}
                    </div>

                    {/* Preview Area */}
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

                        <div className="border border-border/50 bg-background/50 rounded-lg p-6 flex flex-col items-center justify-center text-center gap-4 py-16">
                            <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-xl flex items-center justify-center mb-2">
                                <FileIcon className="w-8 h-8" />
                            </div>
                            <div>
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
