"use client";

import React, { useState, useCallback } from 'react';
import FileUploader from '@/components/tools/FileUploader';
import { Download, Eraser, Image as ImageIcon, Loader2 } from 'lucide-react';
import { removeBackground } from '@imgly/background-removal';
import type { Config } from '@imgly/background-removal';

interface ConvertedImage {
    originalFile: File;
    convertedBlob: Blob | null;
    convertedUrl: string | null;
    status: 'pending' | 'converting' | 'success' | 'error';
    error?: string;
    progress?: number;
}

export default function BackgroundRemoverTool() {
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

    const handleRemoveBackground = async (imageIndex: number) => {
        setImages(prev => prev.map((img, i) => i === imageIndex ? { ...img, status: 'converting', progress: 0 } : img));
        const target = images[imageIndex];

        try {
            const config: Config = {
                progress: (key, current, total) => {
                    if (key.includes('model') || key.includes('onnx')) {
                        // Models take a bit to fetch the first time (around ~40MB), track progress
                        const pct = Math.round((current / total) * 100);
                        setImages(prev => prev.map((img, i) => i === imageIndex ? { ...img, progress: pct || 0 } : img));
                    }
                }
            };

            // @ts-ignore
            const finalBlob = await removeBackground(target.originalFile, config) as any;

            if (!finalBlob) throw new Error('Conversion failed');

            const convertedUrl = URL.createObjectURL(finalBlob);
            setImages(prev => prev.map((img, i) => i === imageIndex ? {
                ...img,
                status: 'success',
                convertedBlob: finalBlob,
                convertedUrl
            } : img));
        } catch (err: any) {
            setImages(prev => prev.map((img, i) => i === imageIndex ? {
                ...img,
                status: 'error',
                error: err.message || 'Error executing AI model. Please ensure you have a decent internet connection on the first run.'
            } : img));
        }
    };

    const convertAll = () => {
        images.forEach((img, index) => {
            if (img.status === 'pending' || img.status === 'error') {
                handleRemoveBackground(index);
            }
        });
    };

    const clearAll = () => setImages([]);
    const removeImage = (index: number) => setImages(prev => prev.filter((_, i) => i !== index));

    return (
        <div className="flex flex-col gap-8 w-full">
            <div className="bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-400 p-4 rounded-xl flex items-start gap-3 text-sm">
                <div className="p-1.5 bg-blue-500/20 rounded-full shrink-0">
                    <Eraser className="w-4 h-4" />
                </div>
                <div>
                    <p className="font-semibold mb-1">Local AI Processing</p>
                    <p>This tool uses a powerful AI model that runs entirely in your browser. The first image may take longer (up to 30-60 secs) to download the initial ~40MB model weights. No images are sent to any server!</p>
                </div>
            </div>

            <FileUploader
                onFilesAccepted={onFilesAccepted}
                maxFiles={1}
                accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] }}
                maxSizeMB={15}
            />

            {images.length > 0 && (
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4">
                    <div className="flex items-center justify-between border-b border-border pb-4">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <ImageIcon className="w-5 h-5" />
                            Selected Images ({images.length})
                        </h2>
                        <div className="flex gap-2">
                            <button onClick={clearAll} className="px-4 py-2 text-sm font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors">
                                Clear All
                            </button>
                            <button
                                onClick={convertAll}
                                className="px-4 py-2 text-sm font-bold text-white bg-brand-primary hover:bg-brand-primary/90 rounded-lg shadow-md transition-colors disabled:opacity-50 flex items-center gap-2"
                                disabled={images.some(i => i.status === 'converting')}
                            >
                                {images.some(i => i.status === 'converting') ? <><Loader2 className="w-4 h-4 animate-spin" /> Removing...</> : 'Remove Background'}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {images.map((img, idx) => (
                            <div key={`${img.originalFile.name}-${idx}`} className="border border-border/50 rounded-lg p-4 flex flex-col gap-3 relative group bg-background/50 checkerboard-bg transition-colors h-full min-h-[300px]">

                                <div className="w-full h-full rounded overflow-hidden flex items-center justify-center relative">
                                    {img.status === 'converting' && (
                                        <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center z-10 p-6 text-center gap-4">
                                            <Loader2 className="w-8 h-8 text-brand-primary animate-spin" />
                                            <p className="font-bold">Running AI Model...</p>
                                            {img.progress !== undefined && (
                                                <div className="w-full max-w-xs bg-muted rounded-full h-2">
                                                    <div className="bg-brand-primary h-2 rounded-full transition-all duration-300" style={{ width: `${img.progress}%` }}></div>
                                                </div>
                                            )}
                                            <p className="text-xs text-muted-foreground">{img.progress}%</p>
                                        </div>
                                    )}

                                    {img.convertedUrl ? (
                                        /* eslint-disable-next-line @next/next/no-img-element */
                                        <img src={img.convertedUrl} alt="Preview" className="max-w-full max-h-[350px] object-contain drop-shadow-xl" />
                                    ) : (
                                        // Preview original
                                        /* eslint-disable-next-line @next/next/no-img-element */
                                        <img src={URL.createObjectURL(img.originalFile)} alt="Original" className="max-w-full max-h-[350px] object-contain opacity-70" />
                                    )}
                                </div>

                                <div className="mt-auto pt-3 flex items-center justify-between border-t border-border/50 z-20 bg-card p-2 rounded shrink-0">
                                    <div className="flex flex-col min-w-0 mr-4">
                                        <p className="text-sm font-semibold truncate" title={img.originalFile.name}>{img.originalFile.name}</p>
                                        {img.status === 'error' ? (
                                            <span className="text-xs text-red-500 font-bold max-w-[200px] truncate" title={img.error}>{img.error}</span>
                                        ) : (
                                            <span className="text-xs text-muted-foreground">Original: {(img.originalFile.size / 1024).toFixed(1)} KB</span>
                                        )}
                                    </div>

                                    {img.status === 'success' && img.convertedUrl && (
                                        <a
                                            href={img.convertedUrl}
                                            download={img.originalFile.name.replace(/\.[^\.]+$/, '_transparent.png')}
                                            className="px-4 py-2 bg-brand-primary text-white font-bold rounded shadow hover:bg-brand-primary/90 transition-colors flex items-center gap-2 text-sm shrink-0"
                                            title="Download Transparent PNG"
                                        >
                                            <Download className="w-4 h-4" /> Download
                                        </a>
                                    )}
                                    {img.status === 'pending' && (
                                        <button
                                            onClick={() => handleRemoveBackground(idx)}
                                            className="text-sm font-bold text-brand-primary hover:underline"
                                        >
                                            Remove Background
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
