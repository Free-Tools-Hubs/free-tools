'use client';

import { useState } from 'react';
import { Copy, Trash2, Check, Upload, Image as ImageIcon, Binary } from 'lucide-react';

export default function ImageToBase64Tool() {
    const [base64, setBase64] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [fileName, setFileName] = useState('');
    const [fileSize, setFileSize] = useState('');
    const [copied, setCopied] = useState(false);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFileName(file.name);
        setFileSize((file.size / 1024).toFixed(2) + ' KB');

        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result as string;
            setBase64(result);
            setImagePreview(result);
        };
        reader.readAsDataURL(file);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(base64);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const clearAll = () => {
        setBase64('');
        setImagePreview(null);
        setFileName('');
        setFileSize('');
    };

    return (
        <div className="p-6 md:p-10 flex flex-col gap-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-center sm:text-left">
                <div className="space-y-6">
                    <div className="flex flex-col gap-4">
                        <label className="text-sm font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2 justify-center sm:justify-start">
                            <Upload size={16} className="text-brand-primary" />
                            Upload Image
                        </label>
                        {!imagePreview ? (
                            <div className="relative group min-h-[300px] border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl flex flex-col items-center justify-center gap-4 transition-all hover:border-brand-primary hover:bg-brand-primary/5 cursor-pointer overflow-hidden">
                                <ImageIcon size={48} className="text-zinc-300 dark:text-zinc-700 group-hover:text-brand-primary transition-colors duration-500 group-hover:scale-110" />
                                <div className="space-y-1">
                                    <p className="text-sm font-bold text-zinc-500">Drag & Drop or Click</p>
                                    <p className="text-xs font-semibold text-zinc-400">PNG, JPG, SVG, WEBP up to 5MB</p>
                                </div>
                                <input
                                    type="file"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                />
                            </div>
                        ) : (
                            <div className="relative h-[300px] rounded-3xl overflow-hidden border-2 border-zinc-100 dark:border-zinc-900 group shadow-lg">
                                <img src={imagePreview} className="w-full h-full object-contain" alt="Preview" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                    <span className="text-xs font-bold text-white uppercase tracking-widest bg-zinc-900/80 px-4 py-2 rounded-full">Preview Loaded</span>
                                </div>
                                <button 
                                    onClick={clearAll}
                                    className="absolute top-4 right-4 p-2 bg-rose-500 text-white rounded-xl shadow-lg transform hover:scale-110 transition-all z-10"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        )}
                        {fileName && (
                           <div className="flex items-center justify-between p-4 bg-zinc-100 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                               <div className="flex flex-col">
                                   <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate max-w-[200px]">{fileName}</span>
                                   <span className="text-[10px] font-bold text-zinc-400 uppercase">{fileSize}</span>
                               </div>
                               <Binary size={20} className="text-brand-primary opacity-30" />
                           </div>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <label className="text-sm font-black uppercase tracking-widest text-zinc-500">Base64 Data URI</label>
                        {base64 && (
                            <button
                                onClick={handleCopy}
                                className="px-4 py-2 rounded-xl bg-brand-primary text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                            >
                                {copied ? <Check size={14} /> : <Copy size={14} />}
                                {copied ? 'Copied' : 'Copy string'}
                            </button>
                        )}
                    </div>
                    
                    <div className="relative h-[430px]">
                        <textarea
                            className="w-full h-full p-8 rounded-3xl border-2 border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/50 outline-none font-mono text-xs leading-relaxed resize-none text-zinc-500 pointer-events-auto selection:bg-brand-primary/20 cursor-auto"
                            placeholder="Data URI string will appear here after upload..."
                            value={base64}
                            readOnly
                        />
                    </div>
                </div>
            </div>
             <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                <div className="flex gap-4">
                    <span>Format: data:image/...;base64,...</span>
                    <span className="hidden sm:inline">•</span>
                    <span>Speed: Instant Local conversion</span>
                </div>
                 <div className="flex items-center gap-2 text-brand-primary">
                    <Check size={12} />
                    Ready for CSS/HTML
                </div>
            </div>
        </div>
    );
}
