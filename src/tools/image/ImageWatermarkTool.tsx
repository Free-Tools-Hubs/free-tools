"use client";

import { useState, useRef, useCallback, useEffect } from 'react';
import FileUploader from '@/components/tools/FileUploader';
import { Download, Stamp, Image as ImageIcon, RefreshCcw, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
    text: z.string().min(1, 'Watermark text is required').max(100),
    color: z.string(),
    opacity: z.number().min(10).max(100),
    size: z.number().min(10).max(200),
    position: z.enum(['center', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'tile']),
});

type FormData = z.infer<typeof formSchema>;

export default function ImageWatermarkTool() {
    const [imgSrc, setImgSrc] = useState('');
    const [fileType, setFileType] = useState('');
    const [fileName, setFileName] = useState('');
    const [watermarkedUrl, setWatermarkedUrl] = useState('');

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const originalImgRef = useRef<HTMLImageElement | null>(null);

    const {
        register,
        watch,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            text: 'CONFIDENTIAL',
            color: '#ffffff',
            opacity: 50,
            size: 48,
            position: 'center'
        }
    });

    const text = watch('text');
    const color = watch('color');
    const opacity = watch('opacity');
    const size = watch('size');
    const position = watch('position');

    const onFilesAccepted = useCallback((files: File[]) => {
        if (files && files.length > 0) {
            setWatermarkedUrl('');
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                setImgSrc(reader.result?.toString() || '');
                setFileType(files[0].type);
                setFileName(files[0].name.replace(/\.[^\.]+$/, '')); // strip ext
            });
            reader.readAsDataURL(files[0]);
        }
    }, []);

    const drawWatermark = useCallback(() => {
        if (!originalImgRef.current || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const img = originalImgRef.current;

        canvas.width = img.width;
        canvas.height = img.height;

        // Draw original image
        ctx.drawImage(img, 0, 0);

        // Apply watermark logic
        ctx.globalAlpha = opacity / 100;
        ctx.fillStyle = color;
        ctx.font = `bold ${size}px Arial`;

        // Add shadow
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        const textMetrics = ctx.measureText(text);
        const textWidth = textMetrics.width;
        const textHeight = size; // rough approx height

        // Determine position
        let x = 0; let y = 0;
        const padding = 20;

        if (position === 'center') {
            x = (canvas.width - textWidth) / 2;
            y = (canvas.height + textHeight / 3) / 2;
        } else if (position === 'top-left') {
            x = padding;
            y = padding + textHeight;
        } else if (position === 'top-right') {
            x = canvas.width - textWidth - padding;
            y = padding + textHeight;
        } else if (position === 'bottom-left') {
            x = padding;
            y = canvas.height - padding;
        } else if (position === 'bottom-right') {
            x = canvas.width - textWidth - padding;
            y = canvas.height - padding;
        }

        if (position === 'tile') {
            // Rotate ctx and draw repeating
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(-Math.PI / 4);

            const stepX = textWidth + 100;
            const stepY = textHeight + 100;

            // Draw a grid of text
            for (let i = -canvas.width; i < canvas.width * 2; i += stepX) {
                for (let j = -canvas.height; j < canvas.height * 2; j += stepY) {
                    ctx.fillText(text, i, j);
                }
            }

            // Reset transform
            ctx.rotate(Math.PI / 4);
            ctx.translate(-canvas.width / 2, -canvas.height / 2);

        } else {
            ctx.fillText(text, x, y);
        }

        // Reset alpha
        ctx.globalAlpha = 1.0;

    }, [text, color, opacity, size, position]);

    useEffect(() => {
        if (imgSrc && originalImgRef.current) {
            drawWatermark();
        } else if (imgSrc) {
            const img = new Image();
            img.src = imgSrc;
            img.onload = () => {
                originalImgRef.current = img;
                drawWatermark();
            }
        }
    }, [imgSrc, drawWatermark]);

    const saveImage = () => {
        if (!canvasRef.current) return;
        setWatermarkedUrl(canvasRef.current.toDataURL(fileType || 'image/png'));
    };

    const resetAll = () => {
        setImgSrc('');
        setWatermarkedUrl('');
        originalImgRef.current = null;
    }

    return (
        <div className="flex flex-col gap-8 w-full">
            {!imgSrc ? (
                <FileUploader
                    onFilesAccepted={onFilesAccepted}
                    maxFiles={1}
                    accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] }}
                    maxSizeMB={20}
                />
            ) : (
                <div className="flex flex-col xl:flex-row gap-8">
                    {/* Settings Sidebar */}
                    <div className="w-full xl:w-80 shrink-0 bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-6">
                        <div className="flex items-center justify-between border-b border-border pb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Stamp className="w-5 h-5 text-brand-primary" />
                                Watermark Settings
                            </h2>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold">Watermark Text</label>
                                <input type="text" {...register('text')} className="p-2 border border-border rounded-lg bg-background w-full outline-brand-primary" placeholder="Copyright © 2024" />
                                {errors.text && <span className="text-xs text-red-500">{errors.text.message}</span>}
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold">Position</label>
                                <select {...register('position')} className="p-2 border border-border rounded-lg bg-background w-full outline-brand-primary cursor-pointer">
                                    <option value="center">Center</option>
                                    <option value="top-left">Top Left</option>
                                    <option value="top-right">Top Right</option>
                                    <option value="bottom-left">Bottom Left</option>
                                    <option value="bottom-right">Bottom Right</option>
                                    <option value="tile">Diagonal Tiled</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold flex justify-between">
                                    Size <span className="text-brand-primary">{size}px</span>
                                </label>
                                <input type="range" min="10" max="200" {...register('size', { valueAsNumber: true })} className="accent-brand-primary cursor-pointer" />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold flex justify-between">
                                    Opacity <span className="text-brand-primary">{opacity}%</span>
                                </label>
                                <input type="range" min="10" max="100" {...register('opacity', { valueAsNumber: true })} className="accent-brand-primary cursor-pointer" />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold flex justify-between">Color {color}</label>
                                <input type="color" {...register('color')} className="w-full h-10 border border-border p-1 rounded-lg cursor-pointer bg-background" />
                            </div>
                        </div>

                        <button
                            disabled={!canvasRef.current}
                            onClick={saveImage}
                            className="w-full mt-auto py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary/90 transition-colors shadow-md flex items-center justify-center gap-2"
                        >
                            <Save className="w-4 h-4" /> Get Downloadable Image
                        </button>

                        {watermarkedUrl && (
                            <a href={watermarkedUrl} download={`${fileName}_watermarked.png`} className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors shadow-md flex items-center justify-center gap-2 text-center text-sm">
                                <Download className="w-4 h-4" /> Download Watermarked Image
                            </a>
                        )}

                    </div>

                    {/* Preview Area */}
                    <div className="flex-1 bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4 overflow-hidden">
                        <div className="flex items-center justify-between border-b border-border pb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <ImageIcon className="w-5 h-5" />
                                Live Preview
                            </h2>
                            <button onClick={resetAll} className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground flex items-center gap-2 text-sm font-semibold">
                                <RefreshCcw className="w-4 h-4" /> Start Over
                            </button>
                        </div>

                        <div className="w-full relative min-h-[400px] bg-black/5 rounded-lg border border-border flex items-center justify-center overflow-auto p-4 custom-scrollbar">
                            <canvas
                                ref={canvasRef}
                                className="max-w-full max-h-[80vh] shadow-lg rounded object-contain bg-transparent checkerboard-bg"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
