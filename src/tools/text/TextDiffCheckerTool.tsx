"use client";

import { useState } from 'react';
import { Copy, Trash2, FileDiff, ArrowRightLeft } from 'lucide-react';
import { diffLines, diffChars, Change } from 'diff';

export default function TextDiffCheckerTool() {
    const [originalText, setOriginalText] = useState('');
    const [modifiedText, setModifiedText] = useState('');
    const [diffMode, setDiffMode] = useState<'lines' | 'chars'>('lines');
    const [diffResult, setDiffResult] = useState<Change[] | null>(null);

    const computeDiff = () => {
        if (diffMode === 'lines') {
            const diff = diffLines(originalText, modifiedText);
            setDiffResult(diff);
        } else {
            const diff = diffChars(originalText, modifiedText);
            setDiffResult(diff);
        }
    };

    const clearAll = () => {
        setOriginalText('');
        setModifiedText('');
        setDiffResult(null);
    };

    const swapTexts = () => {
        setOriginalText(modifiedText);
        setModifiedText(originalText);
        setDiffResult(null);
    };

    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col xl:flex-row gap-6">
                <div className="flex-1 bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold">Original Text</h2>
                        <button
                            onClick={() => setOriginalText('')}
                            disabled={!originalText}
                            className="px-3 py-1.5 text-sm font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors flex items-center gap-1 disabled:opacity-50"
                        >
                            <Trash2 className="w-4 h-4" /> Clear
                        </button>
                    </div>
                    <textarea
                        value={originalText}
                        onChange={(e) => { setOriginalText(e.target.value); setDiffResult(null); }}
                        placeholder="Paste the original text here..."
                        className="w-full h-80 p-4 rounded-lg bg-background border border-border resize-y focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-base"
                    />
                </div>

                <div className="flex items-center justify-center -my-2 xl:my-0 xl:-mx-2 z-10">
                    <button
                        onClick={swapTexts}
                        className="p-3 bg-brand-primary text-white rounded-full shadow-lg hover:bg-brand-primary/90 transition-transform hover:scale-110"
                        title="Swap Texts"
                    >
                        <ArrowRightLeft className="w-5 h-5 xl:rotate-0 rotate-90" />
                    </button>
                </div>

                <div className="flex-1 bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold">Modified Text</h2>
                        <button
                            onClick={() => setModifiedText('')}
                            disabled={!modifiedText}
                            className="px-3 py-1.5 text-sm font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors flex items-center gap-1 disabled:opacity-50"
                        >
                            <Trash2 className="w-4 h-4" /> Clear
                        </button>
                    </div>
                    <textarea
                        value={modifiedText}
                        onChange={(e) => { setModifiedText(e.target.value); setDiffResult(null); }}
                        placeholder="Paste the modified text here..."
                        className="w-full h-80 p-4 rounded-lg bg-background border border-border resize-y focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-base"
                    />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card border border-border rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">Diff Mode:</span>
                    <select
                        value={diffMode}
                        onChange={(e) => { setDiffMode(e.target.value as 'lines' | 'chars'); setDiffResult(null); }}
                        className="p-2 border border-border rounded-lg bg-background outline-brand-primary text-sm font-semibold"
                    >
                        <option value="lines">Line-by-Line</option>
                        <option value="chars">Character-by-Character</option>
                    </select>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                    <button
                        onClick={clearAll}
                        disabled={!originalText && !modifiedText && !diffResult}
                        className="px-6 py-2.5 text-sm font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 w-full sm:w-auto"
                    >
                        Clear All
                    </button>
                    <button
                        onClick={computeDiff}
                        disabled={(!originalText && !modifiedText) || !!diffResult}
                        className="px-6 py-2.5 text-sm font-bold text-white bg-brand-primary hover:bg-brand-primary/90 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50 w-full sm:w-auto"
                    >
                        <FileDiff className="w-4 h-4" /> Find Differences
                    </button>
                </div>
            </div>

            {diffResult && (
                <div className="flex flex-col gap-4 bg-card border border-border rounded-xl p-6 shadow-sm animate-in fade-in slide-in-from-bottom-4 relative">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-primary text-white text-xs font-bold px-4 py-1 rounded-full shadow-md">
                        Diff Results
                    </div>

                    <div className="flex items-center gap-4 text-sm font-semibold mb-2">
                        <span className="flex items-center gap-2 border px-3 py-1 rounded bg-green-500/10 text-green-600 border-green-500/20">
                            <span className="w-3 h-3 bg-green-500 rounded-sm inline-block"></span> Added
                        </span>
                        <span className="flex items-center gap-2 border px-3 py-1 rounded bg-red-500/10 text-red-600 border-red-500/20">
                            <span className="w-3 h-3 bg-red-500 rounded-sm inline-block"></span> Removed
                        </span>
                    </div>

                    <div className="w-full min-h-[300px] p-4 rounded-lg bg-background border border-border font-mono text-sm whitespace-pre-wrap break-all overflow-y-auto">
                        {diffResult.map((part, index) => {
                            let colorClass = 'text-foreground';
                            let bgClass = '';

                            if (part.added) {
                                colorClass = 'text-green-700 dark:text-green-400';
                                bgClass = 'bg-green-500/20';
                            } else if (part.removed) {
                                colorClass = 'text-red-700 dark:text-red-400 line-through opacity-80';
                                bgClass = 'bg-red-500/20';
                            }

                            return (
                                <span key={index} className={`${colorClass} ${bgClass} rounded-sm px-0.5 whitespace-pre-wrap`}>
                                    {part.value}
                                </span>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
