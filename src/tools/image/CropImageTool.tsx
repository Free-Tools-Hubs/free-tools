"use client";

import { useState, useRef, useCallback } from 'react';
import FileUploader from '@/components/tools/FileUploader';
import { Download, Crop as CropIcon, Image as ImageIcon, Unlink, Link as LinkIcon, RefreshCcw } from 'lucide-react';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    )
}

export default function CropImageTool() {
    const [imgSrc, setImgSrc] = useState('');
    const [fileType, setFileType] = useState('');
    const [fileName, setFileName] = useState('');

    const imgRef = useRef<HTMLImageElement>(null);

    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

    const [aspect, setAspect] = useState<number | undefined>(undefined);
    const [croppedImageUrl, setCroppedImageUrl] = useState<string>('');
    const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null);

    const onFilesAccepted = useCallback((files: File[]) => {
        if (files && files.length > 0) {
            setCroppedImageUrl('');
            setCroppedBlob(null);
            setCrop(undefined);
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                setImgSrc(reader.result?.toString() || '');
                setFileType(files[0].type);
                setFileName(files[0].name);
            });
            reader.readAsDataURL(files[0]);
        }
    }, []);

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        const { width, height } = e.currentTarget;
        if (aspect) {
            setCrop(centerAspectCrop(width, height, aspect));
        } else {
            // default 90% crop
            setCrop({
                unit: '%',
                width: 90,
                height: 90,
                x: 5,
                y: 5
            });
        }
    }

    const handleToggleAspect = () => {
        if (aspect) {
            setAspect(undefined);
            if (imgRef.current) {
                setCrop(centerAspectCrop(imgRef.current.width, imgRef.current.height, 1)); // just to reset UI visually, though undefined aspect frees it
                setTimeout(() => setCrop(undefined), 0);
            }
        } else {
            setAspect(1);
            if (imgRef.current) {
                setCrop(centerAspectCrop(imgRef.current.width, imgRef.current.height, 1));
            }
        }
    };

    const setPresetAspect = (ratio: number) => {
        setAspect(ratio);
        if (imgRef.current) {
            setCrop(centerAspectCrop(imgRef.current.width, imgRef.current.height, ratio));
        }
    }

    const applyCrop = async () => {
        if (!completedCrop || !imgRef.current) return;

        const image = imgRef.current;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) return;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        canvas.width = completedCrop.width * scaleX;
        canvas.height = completedCrop.height * scaleY;

        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            completedCrop.x * scaleX,
            completedCrop.y * scaleY,
            completedCrop.width * scaleX,
            completedCrop.height * scaleY,
            0,
            0,
            completedCrop.width * scaleX,
            completedCrop.height * scaleY,
        );

        canvas.toBlob((blob) => {
            if (!blob) return;
            setCroppedBlob(blob);
            setCroppedImageUrl(URL.createObjectURL(blob));
        }, fileType || 'image/jpeg', 1);
    };

    const resetAll = () => {
        setImgSrc('');
        setCroppedImageUrl('');
        setCroppedBlob(null);
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
                    {/* Editor Area */}
                    <div className="flex-1 bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4 overflow-hidden">
                        <div className="flex items-center justify-between border-b border-border pb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <CropIcon className="w-5 h-5 text-brand-primary" />
                                Crop Image
                            </h2>
                            <button onClick={resetAll} className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground flex items-center gap-2 text-sm font-semibold">
                                <RefreshCcw className="w-4 h-4" /> Start Over
                            </button>
                        </div>

                        {/* Aspect Ratio Toolbar */}
                        <div className="flex flex-wrap gap-2 pt-2">
                            <button
                                onClick={handleToggleAspect}
                                className={`px-3 py-1.5 rounded-lg border text-sm font-semibold flex items-center gap-2 transition-colors ${aspect ? 'bg-brand-primary/10 border-brand-primary text-brand-primary' : 'bg-muted border-border text-muted-foreground hover:bg-muted/80'}`}
                            >
                                {aspect ? <LinkIcon className="w-4 h-4" /> : <Unlink className="w-4 h-4" />}
                                {aspect ? 'Aspect Linked' : 'Freeform Crop'}
                            </button>

                            <div className="h-8 w-px bg-border mx-2 self-center"></div>

                            <PresetButton label="1:1 (Square)" ratio={1} current={aspect} onClick={setPresetAspect} />
                            <PresetButton label="16:9 (Video)" ratio={16 / 9} current={aspect} onClick={setPresetAspect} />
                            <PresetButton label="4:3 (Photo)" ratio={4 / 3} current={aspect} onClick={setPresetAspect} />
                            <PresetButton label="9:16 (Story)" ratio={9 / 16} current={aspect} onClick={setPresetAspect} />
                        </div>

                        <div className="relative w-full max-h-[600px] bg-black/5 rounded-lg overflow-auto flex items-center justify-center border border-border mt-4 p-4">
                            <ReactCrop
                                crop={crop}
                                onChange={(_, percentCrop) => setCrop(percentCrop)}
                                onComplete={(c) => setCompletedCrop(c)}
                                aspect={aspect}
                                className="max-h-full max-w-full"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    ref={imgRef}
                                    alt="Crop me"
                                    src={imgSrc}
                                    onLoad={onImageLoad}
                                    className="max-h-[500px] w-auto object-contain"
                                />
                            </ReactCrop>
                        </div>

                        <button
                            onClick={applyCrop}
                            disabled={!completedCrop?.width || !completedCrop?.height}
                            className="w-full py-3 bg-brand-primary text-white font-bold rounded-lg mt-4 disabled:opacity-50 hover:bg-brand-primary/90 transition-colors"
                        >
                            Apply Crop
                        </button>
                    </div>

                    {/* Results Area */}
                    {croppedImageUrl && croppedBlob && (
                        <div className="w-full xl:w-80 bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4 animate-in fade-in slide-in-from-right-4">
                            <h2 className="text-xl font-bold mb-2 pb-2 border-b border-border flex items-center gap-2">
                                <ImageIcon className="w-5 h-5" /> Result
                            </h2>

                            <div className="w-full aspect-square bg-muted rounded-lg border border-border overflow-hidden flex items-center justify-center">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={croppedImageUrl} alt="Cropped" className="max-w-full max-h-full object-contain" />
                            </div>

                            <div className="flex flex-col gap-1 text-sm bg-muted/50 p-3 rounded-lg border border-border/50">
                                <p className="flex justify-between"><span className="text-muted-foreground">Original:</span> <span className="font-semibold truncate max-w-[120px]" title={fileName}>{fileName}</span></p>
                                <p className="flex justify-between"><span className="text-muted-foreground">Size:</span> <span className="font-semibold">{(croppedBlob.size / 1024).toFixed(1)} KB</span></p>
                                <p className="flex justify-between"><span className="text-muted-foreground">Format:</span> <span className="font-semibold">{fileType.split('/')[1]?.toUpperCase() || 'JPG'}</span></p>
                            </div>

                            <a
                                href={croppedImageUrl}
                                download={`cropped_${fileName}`}
                                className="mt-auto w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow transition-colors flex items-center justify-center gap-2 text-sm"
                            >
                                <Download className="w-4 h-4" /> Download Image
                            </a>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function PresetButton({ label, ratio, current, onClick }: { label: string, ratio: number, current?: number, onClick: (r: number) => void }) {
    const isActive = current === ratio;
    return (
        <button
            onClick={() => onClick(ratio)}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors border ${isActive ? 'bg-brand-primary text-white border-brand-primary' : 'bg-background hover:bg-muted text-foreground border-border'}`}
        >
            {label}
        </button>
    )
}
