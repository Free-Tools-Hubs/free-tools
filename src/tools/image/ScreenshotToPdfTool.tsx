"use client";

import { useState, useCallback } from 'react';
import FileUploader from '@/components/tools/FileUploader';
import { Download, Monitor, Trash2 } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

interface SelectedImage {
    id: string;
    file: File;
    previewUrl: string;
}

export default function ScreenshotToPdfTool() {
    const [images, setImages] = useState<SelectedImage[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const onFilesAccepted = useCallback((files: File[]) => {
        setImages(prev => {
            const newImages = files.map(file => ({
                id: Math.random().toString(36).substring(7),
                file,
                previewUrl: URL.createObjectURL(file),
            }));
            return [...prev, ...newImages];
        });
        setPdfUrl(null);
    }, []);

    const removeImage = (id: string) => {
        setImages(prev => prev.filter(img => img.id !== id));
        setPdfUrl(null);
    };

    const clearAll = () => {
        setImages([]);
        setPdfUrl(null);
        setError(null);
    };

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
            }, 'image/jpeg', 0.95); // High quality for screenshots
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

                // Exact fit page to the screenshot bounds
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
                            <Monitor className="w-5 h-5" />
                            Screenshots ({images.length})
                        </h2>
                        <div className="flex gap-2">
                            <button onClick={clearAll} className="px-4 py-2 text-sm font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors">
                                Clear All
                            </button>
                            {pdfUrl ? (
                                <a
                                    href={pdfUrl}
                                    download={`Screenshots_${new Date().getTime()}.pdf`}
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {images.map((img) => (
                            <div key={img.id} className="border border-border/50 rounded-lg p-3 flex flex-col gap-2 bg-background/50 hover:bg-background transition-colors relative group">
                                <div className="w-full aspect-video rounded overflow-hidden shrink-0 border border-border bg-muted">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={img.previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                </div>

                                <div className="flex-1 min-w-0 flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <p className="font-semibold text-sm truncate max-w-[150px]" title={img.file.name}>{img.file.name}</p>
                                        <p className="text-xs text-muted-foreground">{(img.file.size / 1024 / 1024).toFixed(2)} MB</p>
                                    </div>
                                    <button
                                        onClick={() => removeImage(img.id)}
                                        className="p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors flex-shrink-0"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
