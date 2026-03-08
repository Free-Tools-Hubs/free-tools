"use client";

import { useState, useCallback } from 'react';
import FileUploader from '@/components/tools/FileUploader';
import { Download, Scissors, File as FileIcon, Loader2 } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
    splitMode: z.enum(['extract-all', 'custom-range']),
    customRange: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function SplitPdfTool() {
    const [pdfFile, setPdfFile] = useState<{ id: string; file: File; totalPages?: number } | null>(null);
    const [isSplitting, setIsSplitting] = useState(false);
    const [resultUrl, setResultUrl] = useState<string | null>(null);
    const [resultFileName, setResultFileName] = useState<string>('split_documents.zip');
    const [error, setError] = useState<string | null>(null);

    const { register, watch, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            splitMode: 'extract-all',
            customRange: '',
        }
    });

    const splitMode = watch('splitMode');
    const customRange = watch('customRange');

    const onFilesAccepted = useCallback(async (files: File[]) => {
        if (files.length === 0) return;

        setIsSplitting(true);
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
            setIsSplitting(false);
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

    const splitPdf = async () => {
        if (!pdfFile || !pdfFile.totalPages) return;
        setIsSplitting(true);
        setError(null);

        try {
            const sourceArrayBuffer = await pdfFile.file.arrayBuffer();
            const sourcePdf = await PDFDocument.load(sourceArrayBuffer);
            const totalPages = sourcePdf.getPageCount();

            if (splitMode === 'extract-all') {
                const zip = new JSZip();

                for (let i = 0; i < totalPages; i++) {
                    const newPdf = await PDFDocument.create();
                    const [copiedPage] = await newPdf.copyPages(sourcePdf, [i]);
                    newPdf.addPage(copiedPage);
                    const pdfBytes = await newPdf.save();
                    const pageNum = i + 1;
                    zip.file(`Page_${pageNum}.pdf`, pdfBytes);
                }

                const zipBlob = await zip.generateAsync({ type: 'blob' });
                setResultUrl(URL.createObjectURL(zipBlob));
                setResultFileName(`${pdfFile.file.name.replace('.pdf', '')}_extracted.zip`);

            } else {
                // Custom range Extraction into ONE new PDF document
                if (!customRange) throw new Error("Please provide a custom range, e.g., 1, 3, 5-8.");

                const pageNumbersToExtract = parseRanges(customRange, totalPages);
                if (pageNumbersToExtract.length === 0) throw new Error("No valid pages found in the range.");

                const newPdf = await PDFDocument.create();
                // PDF-lib indices are 0-based
                const indices = pageNumbersToExtract.map(p => p - 1);

                const copiedPages = await newPdf.copyPages(sourcePdf, indices);
                copiedPages.forEach((page) => newPdf.addPage(page));

                const pdfBytes = await newPdf.save();
                const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
                setResultUrl(URL.createObjectURL(blob));
                setResultFileName(`${pdfFile.file.name.replace('.pdf', '')}_split.pdf`);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to split PDF.');
        } finally {
            setIsSplitting(false);
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
                                <Scissors className="w-5 h-5 text-brand-primary" />
                                Split Settings
                            </h2>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1.5 focus-within:text-brand-primary">
                                <label className="text-sm font-semibold text-foreground">Split Mode</label>
                                <select {...register('splitMode')} className="p-2 border border-border rounded-lg bg-background w-full outline-brand-primary text-sm">
                                    <option value="extract-all">Extract all pages (ZIP)</option>
                                    <option value="custom-range">Custom range (Combine to PDF)</option>
                                </select>
                            </div>

                            {splitMode === 'custom-range' && (
                                <div className="flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2">
                                    <label className="text-sm font-semibold flex justify-between">
                                        Custom Range
                                        <span className="text-muted-foreground text-xs">Total: {pdfFile.totalPages} pages</span>
                                    </label>
                                    <input
                                        type="text"
                                        {...register('customRange')}
                                        className="p-2 border border-border rounded-lg bg-background w-full outline-brand-primary text-sm"
                                        placeholder="e.g. 1, 3, 5-10"
                                    />
                                    <p className="text-xs text-muted-foreground">Select pages to extract into a single new PDF document.</p>
                                </div>
                            )}
                        </div>

                        {resultUrl ? (
                            <div className="mt-auto flex flex-col gap-2">
                                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-sm text-green-700 dark:text-green-400 mb-2">
                                    Successfully split PDF!
                                </div>
                                <a
                                    href={resultUrl}
                                    download={resultFileName}
                                    className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 text-sm"
                                >
                                    <Download className="w-4 h-4" /> Download Result
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
                                onClick={splitPdf}
                                disabled={isSplitting}
                                className="w-full mt-auto py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary/90 transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isSplitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</> : <><Scissors className="w-4 h-4" /> Split PDF</>}
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
