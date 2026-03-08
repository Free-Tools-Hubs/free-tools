"use client";

import React, { useState, useCallback } from 'react';
import FileUploader from '@/components/tools/FileUploader';
import { Download, FileOutput, Loader2 } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

// Setting up the worker for pdf.js. We use the unpkg CDN for simplicity in client-side Nextjs.
// Since pdfjsLib is version 3.11.174
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

interface ExtractedImage {
    id: string;
    url: string;
    blob: Blob;
    pageNumber: number;
}

export default function PdfToJpgTool() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [extractedImages, setExtractedImages] = useState<ExtractedImage[]>([]);
    const [error, setError] = useState<string | null>(null);

    const onFilesAccepted = useCallback(async (files: File[]) => {
        if (!files.length) return;

        setIsProcessing(true);
        setError(null);
        setExtractedImages([]);

        try {
            const file = files[0];
            const arrayBuffer = await file.arrayBuffer();

            const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
            const pdf = await loadingTask.promise;

            const totalPages = pdf.numPages;
            const newImages: ExtractedImage[] = [];

            for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
                const page = await pdf.getPage(pageNum);

                // Scale handles extraction resolution. 2 is usually good for images.
                const viewport = page.getViewport({ scale: 2.0 });

                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (!ctx) throw new Error('Could not get 2d context');

                canvas.width = viewport.width;
                canvas.height = viewport.height;

                // Render PDF page into canvas context
                const renderContext = {
                    canvasContext: ctx,
                    viewport: viewport,
                };

                await page.render(renderContext).promise;

                const blob = await new Promise<Blob>((resolve, reject) => {
                    canvas.toBlob((b) => {
                        if (b) resolve(b);
                        else reject(new Error(`Failed to convert page ${pageNum} to blob`));
                    }, 'image/jpeg', 0.9);
                });

                newImages.push({
                    id: Math.random().toString(36).substring(7),
                    url: URL.createObjectURL(blob),
                    blob,
                    pageNumber: pageNum
                });
            }

            setExtractedImages(newImages);
        } catch (err: any) {
            setError(err.message || 'Failed to extract images from PDF');
        } finally {
            setIsProcessing(false);
        }
    }, []);

    const clearAll = () => {
        setExtractedImages([]);
        setError(null);
    };

    return (
        <div className="flex flex-col gap-8 w-full">
            {extractedImages.length === 0 && !isProcessing && (
                <FileUploader
                    onFilesAccepted={onFilesAccepted}
                    maxFiles={1}
                    accept={{ 'application/pdf': ['.pdf'] }}
                    maxSizeMB={50}
                />
            )}

            {error && (
                <div className="bg-red-500/10 text-red-500 p-4 rounded-lg font-semibold border border-red-500/20">
                    {error}
                </div>
            )}

            {isProcessing && (
                <div className="flex flex-col items-center justify-center p-12 gap-4 bg-card rounded-xl border border-border">
                    <Loader2 className="w-12 h-12 text-brand-primary animate-spin" />
                    <p className="font-bold text-lg">Extracting Pages to JPG...</p>
                    <p className="text-muted-foreground text-sm">Large documents may take a few moments. Hang tight!</p>
                </div>
            )}

            {extractedImages.length > 0 && (
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-6">
                    <div className="flex items-center justify-between border-b border-border pb-4">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <FileOutput className="w-5 h-5 text-brand-primary" />
                            Extracted Pages ({extractedImages.length})
                        </h2>
                        <div className="flex gap-2">
                            <button onClick={clearAll} className="px-4 py-2 text-sm font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors">
                                Extract Another
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {extractedImages.map((img) => (
                            <div key={img.id} className="border border-border/50 rounded-lg p-4 flex flex-col gap-4 bg-background/50 hover:bg-background transition-colors group">
                                <div className="w-full aspect-[1/1.4] rounded overflow-hidden shadow-sm bg-white border border-border relative flex items-center justify-center p-2">
                                    <div className="absolute top-2 left-2 bg-black/60 text-white font-bold text-xs px-2 py-1 rounded">
                                        Page {img.pageNumber}
                                    </div>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={img.url} alt={`Page ${img.pageNumber}`} className="max-w-full max-h-full object-contain" />
                                </div>

                                <div className="flex flex-col gap-2 mt-auto">
                                    <div className="flex justify-between items-center text-xs text-muted-foreground font-semibold px-1">
                                        <span>Format: JPG</span>
                                        <span>{(img.blob.size / 1024 / 1024).toFixed(2)} MB</span>
                                    </div>
                                    <a
                                        href={img.url}
                                        download={`Page_${img.pageNumber}.jpg`}
                                        className="w-full py-2 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary/90 transition-colors flex items-center justify-center gap-2 text-sm"
                                    >
                                        <Download className="w-4 h-4" /> Download
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
