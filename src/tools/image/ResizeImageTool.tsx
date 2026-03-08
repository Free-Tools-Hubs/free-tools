"use client";

import React, { useState, useCallback, useEffect } from 'react';
import FileUploader from '@/components/tools/FileUploader';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Download, Maximize, Image as ImageIcon, Trash2, Link as LinkIcon, Unlink } from 'lucide-react';

const formSchema = z.object({
    width: z.number().min(1).max(8192).optional(),
    height: z.number().min(1).max(8192).optional(),
});

type FormData = z.infer<typeof formSchema>;

interface ConvertedImage {
    originalFile: File;
    convertedBlob: Blob | null;
    convertedUrl: string | null;
    status: 'pending' | 'resizing' | 'success' | 'error';
    error?: string;
}

export default function ResizeImageTool() {
    const [images, setImages] = useState<ConvertedImage[]>([]);
    const [maintainRatio, setMaintainRatio] = useState(true);
    const [imgDims, setImgDims] = useState<{ w: number, h: number } | null>(null);

    const {
        register,
        watch,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const watchWidth = watch('width');
    const watchHeight = watch('height');

    // Load dimensions of the first image to initialize
    useEffect(() => {
        if (images.length === 1 && images[0].status === 'pending' && !imgDims) {
            const url = URL.createObjectURL(images[0].originalFile);
            const img = new Image();
            img.src = url;
            img.onload = () => {
                setImgDims({ w: img.width, h: img.height });
                setValue('width', img.width);
                setValue('height', img.height);
            };
        } else if (images.length === 0) {
            setImgDims(null);
            setValue('width', undefined);
            setValue('height', undefined);
        }
    }, [images, setValue, imgDims]);

    // Handle ratio lock
    useEffect(() => {
        if (!maintainRatio || !imgDims) return;
        const ratio = imgDims.w / imgDims.h;

        // We only want to run this if user actually changed something, to prevent infinite loops, 
        // react-hook-form handles changes nicely but let's be careful.
        // For simplicity, we can calculate the ratio when one field changes in the form directly or via onChange.
    }, [maintainRatio, imgDims]);

    const onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        setValue('width', isNaN(val) ? undefined : val);
        if (maintainRatio && imgDims && !isNaN(val)) {
            const ratio = imgDims.h / imgDims.w;
            setValue('height', Math.round(val * ratio));
        }
    };

    const onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        setValue('height', isNaN(val) ? undefined : val);
        if (maintainRatio && imgDims && !isNaN(val)) {
            const ratio = imgDims.w / imgDims.h;
            setValue('width', Math.round(val * ratio));
        }
    };


    const onFilesAccepted = useCallback((files: File[]) => {
        const newImages = files.map(file => ({
            originalFile: file,
            convertedBlob: null,
            convertedUrl: null,
            status: 'pending' as const,
        }));
        setImages(prev => [...prev, ...newImages]);
    }, []);

    const resizeImage = async (imageIndex: number) => {
        const w = watchWidth;
        const h = watchHeight;

        if (!w || !h) {
            alert('Please put in a width and height.');
            return;
        }

        setImages(prev => prev.map((img, i) => i === imageIndex ? { ...img, status: 'resizing' } : img));
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
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext('2d');
            if (!ctx) throw new Error('Could not get 2d context');

            // if PNG, preserve transparency by leaving background alone. 
            // if JPG, fill white just in case (though JPG doesn't have transparency anyway)
            if (target.originalFile.type === 'image/jpeg') {
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, w, h);

            const outType = target.originalFile.type;

            const blob = await new Promise<Blob | null>((resolve) => {
                canvas.toBlob(resolve, outType, 0.9); // preserve high quality
            });

            if (!blob) throw new Error('Resize failed');

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

    const resizeAll = () => {
        images.forEach((img, index) => {
            if (img.status === 'pending' || img.status === 'error') {
                resizeImage(index);
            }
        });
    };

    const clearAll = () => setImages([]);
    const removeImage = (index: number) => setImages(prev => prev.filter((_, i) => i !== index));

    return (
        <div className="flex flex-col gap-8 w-full">
            {/* Settings Panel */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4">
                <div className="flex items-center gap-2 mb-2 border-b border-border pb-4">
                    <Maximize className="w-5 h-5 text-brand-primary" />
                    <h2 className="text-xl font-bold">Resize Settings</h2>
                </div>

                <div className="flex flex-wrap gap-8 items-end">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold">Width (px)</label>
                        <input
                            type="number"
                            className="p-2 border border-border rounded-lg bg-background w-32 focus:ring-2 focus:ring-brand-primary outline-none"
                            placeholder="e.g. 1920"
                            {...register('width', { valueAsNumber: true })}
                            onChange={onWidthChange}
                        />
                        {errors.width && <span className="text-xs text-red-500">{errors.width.message}</span>}
                    </div>

                    <button
                        type="button"
                        onClick={() => setMaintainRatio(!maintainRatio)}
                        className={`p-2 rounded-lg border flex items-center justify-center transition-colors mb-2 ${maintainRatio ? 'bg-brand-primary/10 border-brand-primary text-brand-primary' : 'bg-muted border-border text-muted-foreground'}`}
                        title={maintainRatio ? "Unlock Aspect Ratio" : "Lock Aspect Ratio"}
                    >
                        {maintainRatio ? <LinkIcon className="w-5 h-5" /> : <Unlink className="w-5 h-5" />}
                    </button>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold">Height (px)</label>
                        <input
                            type="number"
                            className="p-2 border border-border rounded-lg bg-background w-32 focus:ring-2 focus:ring-brand-primary outline-none"
                            placeholder="e.g. 1080"
                            {...register('height', { valueAsNumber: true })}
                            onChange={onHeightChange}
                        />
                        {errors.height && <span className="text-xs text-red-500">{errors.height.message}</span>}
                    </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Maximum allowed dimensions: 8192px.</p>
            </div>

            {/* Uploader */}
            <FileUploader
                onFilesAccepted={onFilesAccepted}
                maxFiles={20}
                accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'image/webp': ['.webp'] }}
                maxSizeMB={20}
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
                                onClick={resizeAll}
                                className="px-4 py-2 text-sm font-bold text-white bg-brand-primary hover:bg-brand-primary/90 rounded-lg shadow-md transition-colors"
                                disabled={images.some(i => i.status === 'resizing')}
                            >
                                Resize Pending
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        {images.map((img, idx) => {
                            const baseName = img.originalFile.name;
                            let outExt = img.originalFile.name.match(/\.[^\.]+$/)?.[0] || '.jpg';
                            // just suffix it
                            const outFilename = baseName.replace(outExt, `_resized${outExt}`);

                            return (
                                <div key={`${img.originalFile.name}-${idx}`} className="border border-border/50 rounded-lg p-4 flex items-center justify-between gap-4 bg-background/50 hover:bg-background transition-colors">

                                    <div className="flex items-center gap-4 flex-1 min-w-0">
                                        <div className="w-16 h-16 rounded-md bg-muted flex items-center justify-center shrink-0 overflow-hidden border border-border">
                                            {img.convertedUrl ? (
                                                /* eslint-disable-next-line @next/next/no-img-element */
                                                <img src={img.convertedUrl} alt="Preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <ImageIcon className="w-6 h-6 text-muted-foreground" />
                                            )}
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <p className="font-semibold truncate" title={img.originalFile.name}>{img.originalFile.name}</p>
                                            <div className="flex gap-2 items-center text-sm">
                                                <span className="text-muted-foreground">Type: {img.originalFile.type.replace('image/', '').toUpperCase()} | {(img.originalFile.size / 1024).toFixed(1)}KB</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 shrink-0">
                                        {img.status === 'pending' && <span className="text-xs font-medium text-orange-500 px-3 py-1 bg-orange-500/10 rounded-full">Pending</span>}
                                        {img.status === 'resizing' && <span className="text-xs font-medium text-blue-500 px-3 py-1 bg-blue-500/10 rounded-full animate-pulse">Resizing...</span>}
                                        {img.status === 'error' && <span className="text-xs font-medium text-red-500 px-3 py-1 bg-red-500/10 rounded-full truncate max-w-[100px]" title={img.error}>Error</span>}

                                        {img.status === 'pending' && (
                                            <button onClick={() => resizeImage(idx)} className="text-sm font-bold text-brand-primary hover:underline px-2">
                                                Resize
                                            </button>
                                        )}

                                        {img.status === 'success' && img.convertedUrl && (
                                            <a
                                                href={img.convertedUrl}
                                                download={outFilename}
                                                className="px-4 py-2 text-sm font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md transition-colors flex items-center gap-2"
                                                title="Download Resized Image"
                                            >
                                                <Download className="w-4 h-4" /> Download
                                            </a>
                                        )}

                                        <button
                                            onClick={() => removeImage(idx)}
                                            className="p-2 text-muted-foreground hover:text-red-500 bg-muted hover:bg-red-500/10 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
