"use client";

import { useState, useCallback } from 'react';
import FileUploader from '@/components/tools/FileUploader';
import { Download, FileText, Trash2, ArrowUp, ArrowDown, GripVertical } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

interface SelectedImage {
    id: string;
    file: File;
    previewUrl: string;
    order: number;
}

export default function ImageToPdfTool() {
    const [images, setImages] = useState<SelectedImage[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const onFilesAccepted = useCallback((files: File[]) => {
        setImages(prev => {
            const newImages = files.map((file, idx) => ({
                id: Math.random().toString(36).substring(7),
                file,
                previewUrl: URL.createObjectURL(file),
                order: prev.length + idx,
            }));
            return [...prev, ...newImages];
        });
        setPdfUrl(null); // Reset pdf on new input
    }, []);

    const moveUp = (index: number) => {
        if (index === 0) return;
        setImages(prev => {
            const copy = [...prev];
            [copy[index - 1], copy[index]] = [copy[index], copy[index - 1]];
            return copy;
        });
        setPdfUrl(null);
    };

    const moveDown = (index: number) => {
        if (index === images.length - 1) return;
        setImages(prev => {
            const copy = [...prev];
            [copy[index], copy[index + 1]] = [copy[index + 1], copy[index]];
            return copy;
        });
        setPdfUrl(null);
    };

    const removeImage = (id: string) => {
        setImages(prev => {
            const filtered = prev.filter(img => img.id !== id);
            return filtered.map((img, i) => ({ ...img, order: i })); // Reindex
        });
        setPdfUrl(null);
    };

    const clearAll = () => {
        setImages([]);
        setPdfUrl(null);
        setError(null);
    };

    // Helper to normalize any image into a JPG ArrayBuffer for PDF
    const getImageArrayBuffer = async (file: File): Promise<ArrayBuffer> => {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.src = url;
        await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
        });

        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not get 2d context');

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        return new Promise((resolve, reject) => {
            canvas.toBlob(async (blob) => {
                if (!blob) return reject(new Error('Canvas to Blob failed'));
                resolve(await blob.arrayBuffer());
            }, 'image/jpeg', 0.9);
        });
    };

    const generatePDF = async () => {
        if (images.length === 0) return;
        setIsGenerating(true);
        setError(null);
        try {
            const pdfDoc = await PDFDocument.create();

            for (const imgData of images) {
                const jpgBuffer = await getImageArrayBuffer(imgData.file);
                const embeddedImg = await pdfDoc.embedJpg(jpgBuffer);

                // A4 layout max bounds
                const A4_WIDTH = 595.28;
                const A4_HEIGHT = 841.89;

                // Scale image to fit A4 if larger, otherwise keep original size or fit to page exactly
                // For simplicity: Add page size of the image so it fits exactly without weird margins
                const page = pdfDoc.addPage([embeddedImg.width, embeddedImg.height]);
                page.drawImage(embeddedImg, {
                    x: 0,
                    y: 0,
                    width: embeddedImg.width,
                    height: embeddedImg.height,
                });
            }

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
            setPdfUrl(URL.createObjectURL(blob));
        } catch (err: any) {
            setError(err.message || 'Failed to generate PDF');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="flex flex-col gap-8 w-full">
            <FileUploader
                onFilesAccepted={onFilesAccepted}
                maxFiles={50}
                accept={{
                    'image/jpeg': ['.jpg', '.jpeg'],
                    'image/png': ['.png'],
                    'image/webp': ['.webp']
                }}
                maxSizeMB={20}
            />

            {error && (
                <div className="bg-red-500/10 text-red-500 p-4 rounded-lg font-semibold border border-red-500/20">
                    {error}
                </div>
            )}

            {images.length > 0 && (
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4">
                    <div className="flex items-center justify-between border-b border-border pb-4">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            Images to Convert ({images.length})
                        </h2>
                        <div className="flex gap-2">
                            <button onClick={clearAll} className="px-4 py-2 text-sm font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors">
                                Clear All
                            </button>
                            {pdfUrl ? (
                                <a
                                    href={pdfUrl}
                                    download={`Images_To_PDF_${new Date().getTime()}.pdf`}
                                    className="px-4 py-2 text-sm font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md transition-colors flex items-center gap-2"
                                >
                                    <Download className="w-4 h-4" /> Download PDF
                                </a>
                            ) : (
                                <button
                                    onClick={generatePDF}
                                    disabled={isGenerating}
                                    className="px-4 py-2 text-sm font-bold text-white bg-brand-primary hover:bg-brand-primary/90 rounded-lg shadow-md transition-colors disabled:opacity-50 disabled:animate-pulse"
                                >
                                    {isGenerating ? 'Generating...' : 'Generate PDF'}
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        {images.map((img, idx) => (
                            <div key={img.id} className="border border-border/50 rounded-lg p-3 flex items-center gap-4 bg-background/50 hover:bg-background transition-colors">
                                <div className="flex flex-col items-center gap-1 shrink-0">
                                    <button
                                        onClick={() => moveUp(idx)}
                                        disabled={idx === 0}
                                        className="p-1 text-muted-foreground hover:text-brand-primary disabled:opacity-20 transition-colors"
                                    >
                                        <ArrowUp className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => moveDown(idx)}
                                        disabled={idx === images.length - 1}
                                        className="p-1 text-muted-foreground hover:text-brand-primary disabled:opacity-20 transition-colors"
                                    >
                                        <ArrowDown className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="w-16 h-16 rounded overflow-hidden shrink-0 border border-border bg-muted">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={img.previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-sm truncate" title={img.file.name}>{img.file.name}</p>
                                    <p className="text-xs text-muted-foreground">{(img.file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>

                                <button
                                    onClick={() => removeImage(img.id)}
                                    className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors flex-shrink-0"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
