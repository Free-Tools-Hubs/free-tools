'use client';

import { useState, useRef } from 'react';
import { Copy, Trash2, Check, Download, Braces, Image as ImageIcon } from 'lucide-react';

export default function Base64ToImageTool() {
    const [input, setInput] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const downloadRef = useRef<HTMLAnchorElement>(null);

    const handleInputChange = (val: string) => {
        setInput(val);
        if (!val.trim()) {
            setImagePreview(null);
            return;
        }
        // Basic check for data URI format
        if (val.startsWith('data:image/')) {
            setImagePreview(val);
        } else if (val.match(/^[A-Za-z0-9+/=]+$/)) {
            // Raw base64, guess PNG for preview but might be risky
            setImagePreview(`data:image/png;base64,${val}`);
        } else {
            setImagePreview(null);
        }
    };

    const handleDownload = () => {
        if (!imagePreview) return;
        const link = downloadRef.current;
        if (link) {
            link.href = imagePreview;
            link.download = `reconstructed-image-${Date.now()}.png`;
            link.click();
        }
    };

    return (
        <div className="p-6 md:p-10 flex flex-col gap-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <label className="text-sm font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                            <Braces size={16} className="text-brand-primary" />
                            Base64 String
                        </label>
                        {input && (
                            <button onClick={() => handleInputChange('')} className="text-zinc-400 hover:text-rose-500 transition-colors">
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                    <textarea
                        className="w-full h-[400px] p-6 rounded-3xl border-2 border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 focus:border-brand-primary outline-none transition-all resize-none font-mono text-[10px] leading-relaxed break-all"
                        placeholder="Paste data:image/...;base64,... string here"
                        value={input}
                        onChange={(e) => handleInputChange(e.target.value)}
                    />
                </div>

                <div className="space-y-4 text-center sm:text-left">
                    <div className="flex items-center justify-between px-2">
                         <label className="text-sm font-black uppercase tracking-widest text-zinc-500">Image Preview</label>
                        {imagePreview && (
                            <button
                                onClick={handleDownload}
                                className="px-5 py-2 rounded-xl bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                            >
                                <Download size={14} />
                                Download PNG
                            </button>
                        )}
                    </div>
                    
                    <div className="relative h-[400px] rounded-3xl border-2 border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/50 flex items-center justify-center overflow-auto group">
                         {imagePreview ? (
                             <img src={imagePreview} className="max-w-[90%] max-h-[90%] object-contain rounded-lg drop-shadow-2xl" alt="Decoded" />
                         ) : (
                             <div className="flex flex-col items-center gap-4 opacity-20">
                                 <ImageIcon size={64} className="text-zinc-400" />
                                 <p className="text-xs font-black uppercase tracking-widest text-zinc-400">Preview will appear here</p>
                             </div>
                         )}
                         <a ref={downloadRef} className="hidden" />
                    </div>
                </div>
            </div>
             <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                <div className="flex gap-4">
                    <span>Supports: Data URIs & Raw Base64</span>
                    <span className="hidden sm:inline">•</span>
                    <span>Action: Browser-side rendering</span>
                </div>
                 <div className="flex items-center gap-2 text-brand-primary">
                    <Download size={12} />
                    One-click extraction
                </div>
            </div>
        </div>
    );
}
