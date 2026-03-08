"use client";

import { useState } from 'react';
import { Copy, Trash2, SortAsc, SortDesc, ArrowDownUp, RefreshCcw } from 'lucide-react';

export default function SortTextLinesTool() {
    const [text, setText] = useState('');
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        if (!text) return;
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const loadExample = () => {
        setText("Lion\nZebra\nElephant\nApple\n100\n2");
    };

    const sortAlphabetical = (desc = false) => {
        const lines = text.split('\n');
        lines.sort((a, b) => {
            return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
        });
        if (desc) lines.reverse();
        setText(lines.join('\n'));
    };

    const sortLength = (desc = false) => {
        const lines = text.split('\n');
        lines.sort((a, b) => a.length - b.length);
        if (desc) lines.reverse();
        setText(lines.join('\n'));
    };

    const reverseList = () => {
        const lines = text.split('\n');
        lines.reverse();
        setText(lines.join('\n'));
    };

    const shuffleList = () => {
        const lines = text.split('\n');
        for (let i = lines.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [lines[i], lines[j]] = [lines[j], lines[i]];
        }
        setText(lines.join('\n'));
    };

    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-4 bg-card border border-border rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <SortAsc className="w-5 h-5 text-brand-primary" />
                        Input List
                    </h2>
                    <div className="flex gap-2">
                        <button
                            onClick={loadExample}
                            className="px-3 py-1.5 text-sm font-bold text-brand-primary bg-brand-primary/10 hover:bg-brand-primary/20 rounded-lg transition-colors"
                        >
                            Example
                        </button>
                        <button
                            onClick={() => setText('')}
                            disabled={!text}
                            className="px-3 py-1.5 text-sm font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors flex items-center gap-1 disabled:opacity-50"
                        >
                            <Trash2 className="w-4 h-4" /> Clear
                        </button>
                        <button
                            onClick={handleCopy}
                            disabled={!text}
                            className="px-3 py-1.5 text-sm font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center gap-1 disabled:opacity-50"
                        >
                            <Copy className="w-4 h-4" /> {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                </div>

                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste your list here (one item per line)..."
                    className="w-full h-80 p-4 rounded-lg bg-background border border-border resize-y focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-base"
                />

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-border">
                    <button
                        onClick={() => sortAlphabetical(false)}
                        disabled={!text}
                        className="flex flex-col items-center gap-2 p-3 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-lg font-bold hover:bg-brand-primary/20 transition-colors disabled:opacity-50"
                    >
                        <SortAsc className="w-5 h-5" /> A to Z
                    </button>
                    <button
                        onClick={() => sortAlphabetical(true)}
                        disabled={!text}
                        className="flex flex-col items-center gap-2 p-3 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-lg font-bold hover:bg-brand-primary/20 transition-colors disabled:opacity-50"
                    >
                        <SortDesc className="w-5 h-5" /> Z to A
                    </button>
                    <button
                        onClick={() => sortLength(false)}
                        disabled={!text}
                        className="flex flex-col items-center gap-2 p-3 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-lg font-bold hover:bg-brand-primary/20 transition-colors disabled:opacity-50 text-center leading-tight"
                    >
                        <SortAsc className="w-5 h-5" /> Length <br />(Short - Long)
                    </button>
                    <button
                        onClick={() => sortLength(true)}
                        disabled={!text}
                        className="flex flex-col items-center gap-2 p-3 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-lg font-bold hover:bg-brand-primary/20 transition-colors disabled:opacity-50 text-center leading-tight"
                    >
                        <SortDesc className="w-5 h-5" /> Length <br />(Long - Short)
                    </button>
                    <button
                        onClick={reverseList}
                        disabled={!text}
                        className="flex flex-col items-center gap-2 p-3 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-lg font-bold hover:bg-brand-primary/20 transition-colors disabled:opacity-50"
                    >
                        <ArrowDownUp className="w-5 h-5" /> Reverse
                    </button>
                    <button
                        onClick={shuffleList}
                        disabled={!text}
                        className="flex flex-col items-center gap-2 p-3 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-lg font-bold hover:bg-brand-primary/20 transition-colors disabled:opacity-50"
                    >
                        <RefreshCcw className="w-5 h-5" /> Shuffle
                    </button>
                </div>
            </div>
        </div>
    );
}
