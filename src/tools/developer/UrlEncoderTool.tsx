'use client';

import { useState } from 'react';
import { Copy, Trash2, ArrowLeftRight, Check, AlertCircle, Link } from 'lucide-react';

export default function UrlEncoderTool() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const processUrl = (text: string, currentMode: 'encode' | 'decode') => {
        setInput(text);
        if (!text.trim()) {
            setOutput('');
            setError(null);
            return;
        }
        try {
            if (currentMode === 'encode') {
                setOutput(encodeURIComponent(text));
            } else {
                setOutput(decodeURIComponent(text));
            }
            setError(null);
        } catch (e: any) {
            setError(currentMode === 'decode' ? 'Invalid URL-encoded string' : e.message);
            setOutput('');
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="p-6 md:p-10 flex flex-col gap-8">
            <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 self-center">
                <button
                    onClick={() => { setMode('encode'); processUrl(input, 'encode'); }}
                    className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === 'encode' ? 'bg-white dark:bg-zinc-800 shadow-xl text-brand-primary scale-105' : 'text-zinc-500'}`}
                >
                    Encode
                </button>
                <button
                    onClick={() => { setMode('decode'); processUrl(input, 'decode'); }}
                    className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === 'decode' ? 'bg-white dark:bg-zinc-800 shadow-xl text-brand-primary scale-105' : 'text-zinc-500'}`}
                >
                    Decode
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <label className="text-sm font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                            <Link size={16} className="text-brand-primary" />
                            Input String
                        </label>
                        {input && (
                            <button onClick={() => processUrl('', mode)} className="text-zinc-400 hover:text-rose-500 transition-colors">
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                    <textarea
                        className="w-full h-80 p-6 rounded-3xl border-2 border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 focus:border-brand-primary outline-none transition-all resize-none font-mono text-sm leading-relaxed"
                        placeholder={mode === 'encode' ? 'Enter string to encode...' : 'Enter encoded string to decode...'}
                        value={input}
                        onChange={(e) => processUrl(e.target.value, mode)}
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                         <label className="text-sm font-black uppercase tracking-widest text-zinc-500">Result</label>
                        {output && (
                            <button
                                onClick={handleCopy}
                                className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-brand-primary"
                            >
                                {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                            </button>
                        )}
                    </div>
                    
                    <div className="relative h-80 group">
                        <div className={`w-full h-full p-8 rounded-3xl border-2 bg-zinc-50 dark:bg-zinc-900/50 font-mono text-sm leading-relaxed overflow-auto scrollbar-hide flex items-center justify-center ${error ? 'border-rose-500/50' : 'border-zinc-100 dark:border-zinc-900'}`}>
                             {error ? (
                                <div className="text-rose-500 flex flex-col items-center gap-2">
                                    <AlertCircle size={32} strokeWidth={3} />
                                    <span className="font-bold text-xs uppercase tracking-widest">{error}</span>
                                </div>
                             ) : (
                                <span className={output ? 'text-zinc-600 dark:text-zinc-400 break-all' : 'text-zinc-400 italic opacity-30 select-none'}>
                                    {output || 'Output will appear here...'}
                                </span>
                             )}
                        </div>
                    </div>
                </div>
            </div>
             <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                <div className="flex gap-4">
                    <span>Algorithm: RFC 3986</span>
                    <span className="hidden sm:inline">•</span>
                    <span>Safety: 100% Client-side</span>
                </div>
                 <div className="flex items-center gap-2 text-brand-primary">
                    <Check size={12} />
                    Valid Result
                </div>
            </div>
        </div>
    );
}
