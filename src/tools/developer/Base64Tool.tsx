'use client';

import { useState } from 'react';
import { Copy, Trash2, ArrowLeftRight, Check, AlertCircle } from 'lucide-react';

export default function Base64Tool() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const processText = (text: string, currentMode: 'encode' | 'decode') => {
        setInput(text);
        setError('');

        if (!text) {
            setOutput('');
            return;
        }

        try {
            if (currentMode === 'encode') {
                setOutput(btoa(text));
            } else {
                setOutput(atob(text));
            }
        } catch (e) {
            setError(currentMode === 'decode' ? 'Invalid Base64 string' : 'Encoding error');
            setOutput('');
        }
    };

    const toggleMode = () => {
        const newMode = mode === 'encode' ? 'decode' : 'encode';
        setMode(newMode);
        processText(input, newMode);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="p-6 md:p-10 flex flex-col gap-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex bg-surface-100 dark:bg-surface-800 p-1 rounded-xl border">
                    <button
                        onClick={() => { setMode('encode'); processText(input, 'encode'); }}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'encode' ? 'bg-background shadow-sm text-brand-primary' : 'text-muted-foreground'}`}
                    >
                        Encode
                    </button>
                    <button
                        onClick={() => { setMode('decode'); processText(input, 'decode'); }}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'decode' ? 'bg-background shadow-sm text-brand-primary' : 'text-muted-foreground'}`}
                    >
                        Decode
                    </button>
                </div>

                <button
                    onClick={toggleMode}
                    className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-brand-primary transition-colors"
                >
                    <ArrowLeftRight size={14} />
                    Switch Direction
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-2">Input Text</label>
                    <div className="relative">
                        <textarea
                            className="w-full h-[300px] p-6 rounded-2xl border-2 border-surface-200 dark:border-surface-800 bg-background focus:border-brand-primary outline-none transition-all resize-none font-mono text-sm leading-relaxed"
                            placeholder={mode === 'encode' ? 'Type or paste text to encode...' : 'Paste Base64 here to decode...'}
                            value={input}
                            onChange={(e) => processText(e.target.value, mode)}
                        />
                        {input && (
                            <button
                                onClick={() => processText('', mode)}
                                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-muted-foreground hover:text-rose-500"
                            >
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-2">Output</label>
                    <div className="relative">
                        <div className={`w-full h-[300px] p-6 rounded-2xl border-2 bg-surface-50 dark:bg-surface-950 font-mono text-sm leading-relaxed overflow-auto flex flex-col ${error ? 'border-rose-500/50' : 'border-surface-200 dark:border-surface-800'}`}>
                            {error ? (
                                <div className="flex flex-col items-center justify-center flex-grow text-rose-500 gap-2">
                                    <AlertCircle size={32} />
                                    <span className="font-bold">{error}</span>
                                </div>
                            ) : (
                                <div className="whitespace-pre-wrap break-all">
                                    {output || <span className="text-muted-foreground/30 italic">Output will appear here...</span>}
                                </div>
                            )}
                        </div>
                        {output && (
                            <button
                                onClick={handleCopy}
                                className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background border shadow-sm text-xs font-bold hover:border-brand-primary active:scale-95 transition-all"
                            >
                                {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                                {copied ? 'Copied' : 'Copy'}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-2">
                <span>Base64 {mode}ing</span>
                <span>Client-side only • No data sent to server</span>
            </div>
        </div>
    );
}
