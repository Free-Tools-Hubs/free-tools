"use client";

import { useState, useCallback } from 'react';
import FileUploader from '@/components/tools/FileUploader';
import { Download, Image as ImageIcon, Trash2 } from 'lucide-react';

interface ConvertedImage {
    originalFile: File;
    convertedBlob: Blob | null;
    convertedUrl: string | null;
    status: 'pending' | 'converting' | 'success' | 'error';
    error?: string;
}

export default function JpgToPngTool() {
    const [images, setImages] = useState<ConvertedImage[]>([]);

    const onFilesAccepted = useCallback((files: File[]) => {
        const newImages = files.map(file => ({
            originalFile: file,
            convertedBlob: null,
            convertedUrl: null,
            status: 'pending' as const,
        }));
        setImages(prev => [...prev, ...newImages]);
    }, []);

    const convertToPng = async (imageIndex: number) => {
        setImages(prev => prev.map((img, i) => i === imageIndex ? { ...img, status: 'converting' } : img));
        const target = images[imageIndex];

        try {
            const url = URL.createObjectURL(target.originalFile);
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

            ctx.drawImage(img, 0, 0);

            const blob = await new Promise<Blob | null>((resolve) => {
                canvas.toBlob(resolve, 'image/png');
            });

            if (!blob) throw new Error('Conversion failed');

            const convertedUrl = URL.createObjectURL(blob);
            setImages(prev => prev.map((img, i) => i === imageIndex ? {
                ...img,
                status: 'success',
                convertedBlob: blob,
                convertedUrl
            } : img));
        } catch (err: any) {
            setImages(prev => prev.map((img, i) => i === imageIndex ? {
                ...img,
                status: 'error',
                error: err.message || 'Unknown error'
            } : img));
        }
    };

    const convertAll = () => {
        images.forEach((img, index) => {
            if (img.status === 'pending' || img.status === 'error') {
                convertToPng(index);
            }
        });
    };

    const clearAll = () => setImages([]);
    const removeImage = (index: number) => setImages(prev => prev.filter((_, i) => i !== index));

    return (
        <div className="flex flex-col gap-8 w-full">
            {/* Uploader */}
            <FileUploader
                onFilesAccepted={onFilesAccepted}
                maxFiles={20}
                accept={{ 'image/jpeg': ['.jpg', '.jpeg'] }}
                maxSizeMB={10}
            />

            {/* Results List */}
            {images.length > 0 && (
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4">
                    <div className="flex items-center justify-between border-b border-border pb-4">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <ImageIcon className="w-5 h-5" />
                            Selected Files ({images.length})
                        </h2>
                        <div className="flex gap-2">
                            <button onClick={clearAll} className="px-4 py-2 text-sm font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors">
                                Clear All
                            </button>
                            <button
                                onClick={convertAll}
                                className="px-4 py-2 text-sm font-bold text-white bg-brand-primary hover:bg-brand-primary/90 rounded-lg shadow-md transition-colors"
                                disabled={images.some(i => i.status === 'converting')}
                            >
                                Convert Pending
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {images.map((img, idx) => (
                            <div key={`${img.originalFile.name}-${idx}`} className="border border-border/50 rounded-lg p-4 flex flex-col gap-3 relative group bg-background/50 hover:bg-background transition-colors">
                                <button
                                    onClick={() => removeImage(idx)}
                                    className="absolute top-2 right-2 p-1.5 text-muted-foreground hover:text-red-500 bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>

                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center shrink-0 overflow-hidden">
                                        {img.convertedUrl ? (
                                            /* eslint-disable-next-line @next/next/no-img-element */
                                            <img src={img.convertedUrl} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <ImageIcon className="w-6 h-6 text-muted-foreground" />
                                        )}
                                    </div>
                                    <div className="flex flex-col min-w-0 flex-1">
                                        <p className="text-sm font-semibold truncate" title={img.originalFile.name}>{img.originalFile.name}</p>
                                        <p className="text-xs text-muted-foreground">{(img.originalFile.size / 1024).toFixed(1)} KB JPG</p>
                                    </div>
                                </div>

                                <div className="mt-auto pt-2 flex items-center justify-between border-t border-border/50">
                                    {img.status === 'pending' && <span className="text-xs font-medium text-orange-500 px-2 py-1 bg-orange-500/10 rounded">Pending</span>}
                                    {img.status === 'converting' && <span className="text-xs font-medium text-blue-500 px-2 py-1 bg-blue-500/10 rounded animate-pulse">Converting...</span>}
                                    {img.status === 'error' && <span className="text-xs font-medium text-red-500 px-2 py-1 bg-red-500/10 rounded">Error: {img.error}</span>}
                                    {img.status === 'success' && img.convertedBlob && (
                                        <span className="text-xs font-medium text-green-500 px-2 py-1 bg-green-500/10 rounded">
                                            Ready ({(img.convertedBlob.size / 1024).toFixed(1)} KB)
                                        </span>
                                    )}

                                    {img.status === 'success' && img.convertedUrl && (
                                        <a
                                            href={img.convertedUrl}
                                            download={img.originalFile.name.replace(/\.(jpe?g)$/i, '.png')}
                                            className="p-1.5 text-brand-primary hover:bg-brand-primary/10 rounded transition-colors flex gap-1 items-center font-semibold text-xs py-1 px-3"
                                            title="Download PNG"
                                        >
                                            <Download className="w-4 h-4" /> Download
                                        </a>
                                    )}
                                    {img.status === 'pending' && (
                                        <button
                                            onClick={() => convertToPng(idx)}
                                            className="text-xs font-bold text-brand-primary hover:underline ml-auto"
                                        >
                                            Convert
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
