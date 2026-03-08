"use client";

import { useState } from 'react';
import { Copy, Trash2, ListFilter, Play, Settings } from 'lucide-react';

export default function RemoveDuplicateLinesTool() {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [copied, setCopied] = useState(false);

    // Settings
    const [caseSensitive, setCaseSensitive] = useState(false);
    const [trimLines, setTrimLines] = useState(true);
    const [removeEmpty, setRemoveEmpty] = useState(true);

    const [stats, setStats] = useState({ original: 0, removed: 0, final: 0 });

    const handleCopy = async () => {
        if (!outputText) return;
        await navigator.clipboard.writeText(outputText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const processText = () => {
        let lines = inputText.split('\n');
        const originalCount = lines.length;

        if (trimLines) {
            lines = lines.map(line => line.trim());
        }

        if (removeEmpty) {
            lines = lines.filter(line => line.length > 0);
        }

        const seen = new Set();
        const result = [];

        for (const line of lines) {
            const checkLine = caseSensitive ? line : line.toLowerCase();
            if (!seen.has(checkLine)) {
                seen.add(checkLine);
                result.push(line);
            }
        }

        setOutputText(result.join('\n'));

        setStats({
            original: originalCount,
            final: result.length,
            removed: originalCount - (removeEmpty ? lines.length : originalCount) + (lines.length - result.length)
        });
    };

    const loadExample = () => {
        setInputText("Apple\nBanana\napple\nOrange\nBANANA\n\nGrape\napple\nApple");
    };

    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col xl:flex-row gap-6">
                <div className="flex-1 flex flex-col gap-4">
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <ListFilter className="w-5 h-5 text-brand-primary" />
                                Original List
                            </h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={loadExample}
                                    className="px-3 py-1.5 text-sm font-bold text-brand-primary bg-brand-primary/10 hover:bg-brand-primary/20 rounded-lg transition-colors"
                                >
                                    Example
                                </button>
                                <button
                                    onClick={() => setInputText('')}
                                    disabled={!inputText}
                                    className="px-3 py-1.5 text-sm font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors flex items-center gap-1 disabled:opacity-50"
                                >
                                    <Trash2 className="w-4 h-4" /> Clear
                                </button>
                            </div>
                        </div>

                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Paste your original list here..."
                            className="w-full h-64 p-4 rounded-lg bg-background border border-border resize-y focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-base"
                        />
                    </div>
                </div>

                <div className="w-full xl:w-80 shrink-0 flex flex-col gap-4">
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-6">
                        <div className="flex items-center justify-between border-b border-border pb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Settings className="w-5 h-5 text-brand-primary" />
                                Settings
                            </h2>
                        </div>

                        <div className="flex flex-col gap-3">
                            <label className="flex items-center justify-between gap-2 p-3 border border-border rounded-lg bg-background cursor-pointer hover:border-brand-primary/50 transition-colors">
                                <span className="text-sm font-semibold">Case Sensitive</span>
                                <div className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} />
                                    <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                                </div>
                            </label>
                            <p className="text-xs text-muted-foreground px-1">If enabled, 'Apple' and 'apple' are treated as unique lines.</p>

                            <label className="flex items-center justify-between gap-2 p-3 border border-border rounded-lg bg-background cursor-pointer hover:border-brand-primary/50 transition-colors mt-2">
                                <span className="text-sm font-semibold">Trim Whitespace</span>
                                <div className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" checked={trimLines} onChange={(e) => setTrimLines(e.target.checked)} />
                                    <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                                </div>
                            </label>
                            <p className="text-xs text-muted-foreground px-1">Removes spaces at the beginning and end of each line.</p>

                            <label className="flex items-center justify-between gap-2 p-3 border border-border rounded-lg bg-background cursor-pointer hover:border-brand-primary/50 transition-colors mt-2">
                                <span className="text-sm font-semibold">Remove Empty Lines</span>
                                <div className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" checked={removeEmpty} onChange={(e) => setRemoveEmpty(e.target.checked)} />
                                    <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                                </div>
                            </label>
                        </div>

                        <button
                            onClick={processText}
                            disabled={!inputText}
                            className="w-full mt-auto py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary/90 transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            <Play className="w-4 h-4 fill-white" /> Remove Duplicates
                        </button>
                    </div>
                </div>
            </div>

            {outputText && (
                <div className="flex flex-col gap-4 bg-card border border-border rounded-xl p-6 shadow-sm animate-in fade-in slide-in-from-bottom-4 relative">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-primary text-white text-xs font-bold px-4 py-1 rounded-full shadow-md">
                        Results
                    </div>
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            Unique List
                        </h2>
                        <button
                            onClick={handleCopy}
                            className="px-4 py-2 text-sm font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md transition-colors flex items-center gap-2"
                        >
                            <Copy className="w-4 h-4" /> {copied ? 'Copied!' : 'Copy Results'}
                        </button>
                    </div>

                    <div className="flex items-center gap-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-700 dark:text-green-400 text-sm font-semibold mb-2">
                        <span>Original Lines: {stats.original}</span> •
                        <span>Unique Lines: {stats.final}</span> •
                        <span>Duplicates Removed: {stats.original - stats.final}</span>
                    </div>

                    <textarea
                        value={outputText}
                        readOnly
                        className="w-full h-64 p-4 rounded-lg bg-muted border border-border resize-y focus:outline-none font-mono text-sm"
                    />
                </div>
            )}
        </div>
    );
}
