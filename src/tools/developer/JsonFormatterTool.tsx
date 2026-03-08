"use client";

import { useState } from 'react';
import { Copy, Trash2, Code2, Braces, AlignLeft, CheckCircle2, XCircle } from 'lucide-react';

export default function JsonFormatterTool() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [indent, setIndent] = useState<number>(2);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const formatJson = () => {
        if (!input.trim()) return;
        try {
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed, null, indent));
            setError(null);
        } catch (err: any) {
            setError(err.message || 'Invalid JSON format');
            setOutput('');
        }
    };

    const minifyJson = () => {
        if (!input.trim()) return;
        try {
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed));
            setError(null);
        } catch (err: any) {
            setError(err.message || 'Invalid JSON format');
            setOutput('');
        }
    };

    const handleCopy = async () => {
        if (!output) return;
        await navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col xl:flex-row gap-6">
                <div className="flex-1 flex flex-col gap-4">
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4 h-full">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Code2 className="w-5 h-5 text-brand-primary" />
                                Input JSON
                            </h2>
                            <button
                                onClick={() => { setInput(''); setOutput(''); setError(null); }}
                                className="px-3 py-1.5 text-sm font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors flex items-center gap-1"
                            >
                                <Trash2 className="w-4 h-4" /> Clear
                            </button>
                        </div>

                        <textarea
                            value={input}
                            onChange={(e) => { setInput(e.target.value); setError(null); }}
                            placeholder='{"example": "Paste your JSON here..."}'
                            className="w-full flex-1 min-h-[300px] p-4 rounded-lg bg-background border border-border resize-y focus:outline-none focus:ring-2 focus:ring-brand-primary/50 font-mono text-sm leading-relaxed"
                            spellCheck={false}
                        />

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            <div className="flex items-center gap-2 border border-border p-1 rounded-lg bg-background">
                                <select
                                    value={indent}
                                    onChange={(e) => setIndent(Number(e.target.value))}
                                    className="bg-transparent text-sm font-semibold outline-none px-2 py-1"
                                >
                                    <option value={2}>2 Spaces</option>
                                    <option value={3}>3 Spaces</option>
                                    <option value={4}>4 Spaces</option>
                                    <option value={8}>8 Spaces</option>
                                </select>
                            </div>
                            <button
                                onClick={formatJson}
                                disabled={!input}
                                className="px-4 py-2 text-sm font-bold text-white bg-brand-primary hover:bg-brand-primary/90 rounded-lg shadow-md transition-colors flex items-center gap-2 disabled:opacity-50"
                            >
                                <Braces className="w-4 h-4" /> Format / Beautify
                            </button>
                            <button
                                onClick={minifyJson}
                                disabled={!input}
                                className="px-4 py-2 text-sm font-bold text-brand-primary bg-brand-primary/10 hover:bg-brand-primary/20 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                            >
                                <AlignLeft className="w-4 h-4" /> Minify
                            </button>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-500 font-semibold flex items-start gap-2 animate-in fade-in">
                                <XCircle className="w-5 h-5 shrink-0" />
                                <span className="break-all">{error}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-1 flex flex-col gap-4">
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4 h-full">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <CheckCircle2 className={`w-5 h-5 ${output ? 'text-green-500' : 'text-muted-foreground'}`} />
                                Output Result
                            </h2>
                            <button
                                onClick={handleCopy}
                                disabled={!output}
                                className="px-3 py-1.5 text-sm font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md transition-colors flex items-center gap-1 disabled:opacity-50"
                            >
                                <Copy className="w-4 h-4" /> {copied ? 'Copied!' : 'Copy JSON'}
                            </button>
                        </div>

                        <textarea
                            value={output}
                            readOnly
                            placeholder="Formatted output will appear here..."
                            className="w-full flex-1 min-h-[300px] p-4 rounded-lg bg-muted border border-border resize-y focus:outline-none font-mono text-sm leading-relaxed"
                            spellCheck={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
