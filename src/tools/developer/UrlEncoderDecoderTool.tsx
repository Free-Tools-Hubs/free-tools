"use client";

import { useState } from 'react';
import { Copy, Trash2, Link, ArrowRightLeft, ShieldAlert } from 'lucide-react';

export default function UrlEncoderDecoderTool() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const processUrl = () => {
        if (!input.trim()) return;
        setError(null);
        try {
            if (mode === 'encode') {
                // encodeURI encodes full URL, encodeURIComponent encodes params. We will use encodeURIComponent to be thorough
                setOutput(encodeURIComponent(input));
            } else {
                setOutput(decodeURIComponent(input));
            }
        } catch (err: any) {
            setError(err.message || 'Invalid URL components');
            setOutput('');
        }
    };

    const processFullUrlSafe = () => {
        if (!input.trim()) return;
        setError(null);
        try {
            if (mode === 'encode') {
                setOutput(encodeURI(input));
            } else {
                setOutput(decodeURI(input));
            }
        } catch (err: any) {
            setError(err.message || 'Invalid URI');
            setOutput('');
        }
    };

    const handleCopy = async () => {
        if (!output) return;
        await navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const toggleMode = () => {
        setMode(m => m === 'encode' ? 'decode' : 'encode');
        setOutput('');
        setError(null);
    };

    const loadExample = () => {
        setInput(mode === 'encode' ? 'https://example.com/search?q=hello world & stuff' : 'https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world%20%26%20stuff');
    };

    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col xl:flex-row gap-6">
                <div className="flex-1 bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Link className="w-5 h-5 text-brand-primary" />
                            Input String
                        </h2>
                        <div className="flex gap-2">
                            <button
                                onClick={loadExample}
                                className="px-3 py-1.5 text-sm font-bold text-brand-primary bg-brand-primary/10 hover:bg-brand-primary/20 rounded-lg transition-colors"
                            >
                                Example
                            </button>
                            <button
                                onClick={() => { setInput(''); setOutput(''); setError(null); }}
                                className="px-3 py-1.5 text-sm font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors flex items-center gap-1 disabled:opacity-50"
                            >
                                <Trash2 className="w-4 h-4" /> Clear
                            </button>
                        </div>
                    </div>

                    <textarea
                        value={input}
                        onChange={(e) => { setInput(e.target.value); setError(null); }}
                        placeholder={mode === 'encode' ? "Enter text or URL to encode..." : "Enter encoded URL to decode..."}
                        className="w-full h-80 p-4 rounded-lg bg-background border border-border resize-y focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-base font-mono break-all"
                        spellCheck={false}
                    />
                </div>

                <div className="w-full xl:w-80 shrink-0 flex flex-col gap-4">
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-6">
                        <div className="flex items-center justify-between border-b border-border pb-4">
                            <h2 className="text-xl font-bold">Action</h2>
                        </div>

                        <div className="flex p-1 bg-muted rounded-lg border border-border">
                            <button
                                onClick={() => { setMode('encode'); setOutput(''); }}
                                className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${mode === 'encode' ? 'bg-background shadow text-brand-primary' : 'text-muted-foreground hover:bg-background/50'}`}
                            >
                                Encode
                            </button>
                            <button
                                onClick={() => { setMode('decode'); setOutput(''); }}
                                className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${mode === 'decode' ? 'bg-background shadow text-brand-primary' : 'text-muted-foreground hover:bg-background/50'}`}
                            >
                                Decode
                            </button>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={processUrl}
                                disabled={!input}
                                className="w-full py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary/90 transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {mode === 'encode' ? 'Full Encode (encodeURIComponent)' : 'Full Decode (decodeURIComponent)'}
                            </button>

                            <button
                                onClick={processFullUrlSafe}
                                disabled={!input}
                                className="w-full py-3 bg-brand-primary/10 text-brand-primary font-bold rounded-lg border border-brand-primary/20 hover:bg-brand-primary/20 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {mode === 'encode' ? 'URL Safe (encodeURI)' : 'URL Safe (decodeURI)'}
                            </button>
                            <p className="text-xs text-muted-foreground text-center">
                                <strong>Full:</strong> Encodes/Decodes everything including ?, =, &, / <br />
                                <strong>Safe:</strong> Leaves valid URL characters intact.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 font-semibold flex items-center gap-3 animate-in fade-in">
                    <ShieldAlert className="w-6 h-6 shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            {output && !error && (
                <div className="flex flex-col gap-4 bg-card border border-border rounded-xl p-6 shadow-sm animate-in fade-in slide-in-from-bottom-4 relative">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-primary text-white text-xs font-bold px-4 py-1 rounded-full shadow-md">
                        Result
                    </div>
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            Output String
                        </h2>
                        <button
                            onClick={handleCopy}
                            className="px-4 py-2 text-sm font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md transition-colors flex items-center gap-2"
                        >
                            <Copy className="w-4 h-4" /> {copied ? 'Copied!' : 'Copy Result'}
                        </button>
                    </div>

                    <textarea
                        value={output}
                        readOnly
                        className="w-full h-40 p-4 rounded-lg bg-muted border border-border resize-y focus:outline-none font-mono text-sm break-all"
                    />
                </div>
            )}
        </div>
    );
}
