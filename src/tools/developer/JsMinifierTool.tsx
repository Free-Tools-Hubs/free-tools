"use client";

import { useState } from 'react';
import { Copy, Trash2, FileJson, AlignLeft, CheckCircle2 } from 'lucide-react';

export default function JsMinifierTool() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);

    const minifyJs = () => {
        if (!input.trim()) return;

        // Very basic JS minify regex logic for lightweight client-side
        // Works for simple scripts. Complex production apps should use Webpack/Terser.
        const minified = input
            .replace(/\/\*[\s\S]*?\*\//g, '') // remove block comments
            .replace(/\/\/.*$/gm, '')       // remove line comments (unsafe if inside strings, but simple regex)
            .replace(/\s+/g, ' ')             // collapse spaces
            .replace(/\s*([\{\}\:\;\,\=\+\-\*\/\(\)\[\]\<\>])\s*/g, '$1') // remove spaces around punctuation
            .trim();

        setOutput(minified);
    };

    const clearAll = () => {
        setInput('');
        setOutput('');
    };

    const handleCopy = async () => {
        if (!output) return;
        await navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
            <div className="flex flex-col xl:flex-row gap-6">
                <div className="flex-1 flex flex-col gap-4">
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4 h-full">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <FileJson className="w-5 h-5 text-brand-primary" />
                                Input JS
                            </h2>
                            <button
                                onClick={clearAll}
                                className="px-3 py-1.5 text-sm font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors flex items-center gap-1"
                            >
                                <Trash2 className="w-4 h-4" /> Clear
                            </button>
                        </div>

                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder='function hello() { ... }'
                            className="w-full flex-1 min-h-[300px] p-4 rounded-lg bg-background border border-border resize-y focus:outline-none focus:ring-2 focus:ring-brand-primary/50 font-mono text-sm leading-relaxed"
                            spellCheck={false}
                        />

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            <button
                                onClick={minifyJs}
                                disabled={!input}
                                className="w-full px-4 py-3 text-lg font-bold text-white bg-brand-primary hover:bg-brand-primary/90 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                <AlignLeft className="w-5 h-5" /> Minify Javascript
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col gap-4">
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4 h-full">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <CheckCircle2 className={`w-5 h-5 ${output ? 'text-green-500' : 'text-muted-foreground'}`} />
                                Minified Output
                            </h2>
                            <button
                                onClick={handleCopy}
                                disabled={!output}
                                className="px-3 py-1.5 text-sm font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md transition-colors flex items-center gap-1 disabled:opacity-50"
                            >
                                <Copy className="w-4 h-4" /> {copied ? 'Copied!' : 'Copy'}
                            </button>
                        </div>

                        <textarea
                            value={output}
                            readOnly
                            placeholder="Minified code will appear here..."
                            className="w-full flex-1 min-h-[300px] p-4 rounded-lg bg-muted border border-border resize-y focus:outline-none font-mono text-sm leading-relaxed break-all"
                            spellCheck={false}
                        />

                        {output && (
                            <div className="mt-4 p-4 rounded-lg border border-brand-primary/20 bg-brand-primary/10 flex items-center justify-between text-sm font-bold text-brand-primary shadow-sm animate-in fade-in">
                                <span>Original Size: {new Blob([input]).size} bytes</span>
                                <span>New Size: {new Blob([output]).size} bytes</span>
                                <span className="text-green-600 dark:text-green-400 font-black">
                                    -{Math.round(100 - (new Blob([output]).size / new Blob([input]).size * 100))}% Saved!
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
