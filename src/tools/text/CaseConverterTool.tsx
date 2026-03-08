"use client";

import { useState } from 'react';
import { Copy, Trash2, Type, ArrowDown, ArrowUp, Type as TypeIcon, Pilcrow } from 'lucide-react';

export default function CaseConverterTool() {
    const [text, setText] = useState('');
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        if (!text) return;
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const toSentenceCase = () => {
        const newText = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase());
        setText(newText);
    };

    const toTitleCase = () => {
        const newText = text.toLowerCase().replace(/\b(\w+)/g, (c) => c.toUpperCase());
        setText(newText);
    };

    const toUpperCase = () => setText(text.toUpperCase());
    const toLowerCase = () => setText(text.toLowerCase());

    const toAlternatingCase = () => {
        let isLower = true;
        const newText = text.split('').map(c => {
            if (/[a-zA-Z]/.test(c)) {
                const ret = isLower ? c.toLowerCase() : c.toUpperCase();
                isLower = !isLower;
                return ret;
            }
            return c;
        }).join('');
        setText(newText);
    };

    const toInverseCase = () => {
        const newText = text.split('').map(c => {
            return c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase();
        }).join('');
        setText(newText);
    };

    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-4 bg-card border border-border rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Type className="w-5 h-5 text-brand-primary" />
                        Input Text
                    </h2>
                    <div className="flex gap-2">
                        <button
                            onClick={handleCopy}
                            disabled={!text}
                            className="px-3 py-1.5 text-sm font-bold text-card-foreground bg-muted hover:bg-muted/80 rounded-lg transition-colors flex items-center gap-1 disabled:opacity-50"
                        >
                            <Copy className="w-4 h-4" /> {copied ? 'Copied!' : 'Copy Result'}
                        </button>
                        <button
                            onClick={() => setText('')}
                            disabled={!text}
                            className="px-3 py-1.5 text-sm font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors flex items-center gap-1 disabled:opacity-50"
                        >
                            <Trash2 className="w-4 h-4" /> Clear
                        </button>
                    </div>
                </div>

                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type or paste your text here..."
                    className="w-full h-80 p-4 rounded-lg bg-background border border-border resize-y focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-base"
                />

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    <button
                        onClick={toSentenceCase}
                        disabled={!text}
                        className="flex flex-col items-center gap-2 p-3 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-lg font-bold hover:bg-brand-primary/20 transition-colors disabled:opacity-50"
                    >
                        <Pilcrow className="w-5 h-5" /> Sentence case
                    </button>
                    <button
                        onClick={toLowerCase}
                        disabled={!text}
                        className="flex flex-col items-center gap-2 p-3 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-lg font-bold hover:bg-brand-primary/20 transition-colors disabled:opacity-50"
                    >
                        <ArrowDown className="w-5 h-5" /> lower case
                    </button>
                    <button
                        onClick={toUpperCase}
                        disabled={!text}
                        className="flex flex-col items-center gap-2 p-3 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-lg font-bold hover:bg-brand-primary/20 transition-colors disabled:opacity-50"
                    >
                        <ArrowUp className="w-5 h-5" /> UPPER CASE
                    </button>
                    <button
                        onClick={toTitleCase}
                        disabled={!text}
                        className="flex flex-col items-center gap-2 p-3 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-lg font-bold hover:bg-brand-primary/20 transition-colors disabled:opacity-50"
                    >
                        <TypeIcon className="w-5 h-5" /> Title Case
                    </button>
                    <button
                        onClick={toAlternatingCase}
                        disabled={!text}
                        className="flex flex-col items-center gap-2 p-3 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-lg font-bold hover:bg-brand-primary/20 transition-colors disabled:opacity-50"
                    >
                        <TypeIcon className="w-5 h-5" /> aLtErNaTiNg
                    </button>
                    <button
                        onClick={toInverseCase}
                        disabled={!text}
                        className="flex flex-col items-center gap-2 p-3 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-lg font-bold hover:bg-brand-primary/20 transition-colors disabled:opacity-50"
                    >
                        <TypeIcon className="w-5 h-5" /> InVeRsE CaSe
                    </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground justify-between">
                    <span><b>Characters:</b> {text.length}</span>
                    <span><b>Words:</b> {text.trim() === '' ? 0 : text.trim().split(/\s+/).length}</span>
                    <span><b>Lines:</b> {text === '' ? 0 : text.split('\n').length}</span>
                </div>
            </div>
        </div>
    );
}
