"use client";

import { useState } from 'react';
import { Link2, Copy, Check, RefreshCcw } from 'lucide-react';

export default function SlugGeneratorTool() {
    const [input, setInput] = useState('');
    const [slug, setSlug] = useState('');
    const [copied, setCopied] = useState(false);

    // Options
    const [removeSpecialChars, setRemoveSpecialChars] = useState(true);
    const [separator, setSeparator] = useState<'-' | '_'>('-');
    const [lowercase, setLowercase] = useState(true);

    const generateSlug = (text: string, sep: string, lw: boolean, scrub: boolean) => {
        let result = text;

        if (lw) result = result.toLowerCase();

        if (scrub) {
            // Remove accents
            result = result.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            // Replace spaces and special characters
            result = result.replace(/[^a-zA-Z0-9\s]/g, "");
        } else {
            // Just remove explicitly bad URL chars and let normal strings pass
            result = result.replace(/[&?=#\/\\%]/g, "");
        }

        // Replace multiple spaces with a single space, then replace spaces with separator
        result = result.trim().replace(/\s+/g, sep);

        setSlug(result);
    };

    const handleInputChange = (val: string) => {
        setInput(val);
        generateSlug(val, separator, lowercase, removeSpecialChars);
    };

    const handleCopy = async () => {
        if (!slug) return;
        try {
            await navigator.clipboard.writeText(slug);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };

    const clearAll = () => {
        setInput('');
        setSlug('');
    };

    return (
        <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-8 shadow-sm flex flex-col gap-8">
                <div className="flex items-center justify-between border-b border-border pb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <Link2 className="w-6 h-6 text-brand-primary" />
                        Slug Generator
                    </h2>
                    <button
                        onClick={clearAll}
                        className="px-4 py-2 text-sm font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors flex items-center gap-2"
                    >
                        <RefreshCcw className="w-4 h-4" /> Clear
                    </button>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-foreground">
                            Original Title / Text
                        </label>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => handleInputChange(e.target.value)}
                            placeholder="Enter a long title or sentence here..."
                            className="w-full p-4 border border-border rounded-lg outline-brand-primary bg-background font-medium text-lg"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-xl border border-border">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={lowercase}
                                onChange={(e) => {
                                    setLowercase(e.target.checked);
                                    generateSlug(input, separator, e.target.checked, removeSpecialChars);
                                }}
                                className="w-4 h-4 text-brand-primary rounded border-border focus:ring-brand-primary accent-brand-primary"
                            />
                            <span className="text-sm font-semibold">Force Lowercase</span>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={removeSpecialChars}
                                onChange={(e) => {
                                    setRemoveSpecialChars(e.target.checked);
                                    generateSlug(input, separator, lowercase, e.target.checked);
                                }}
                                className="w-4 h-4 text-brand-primary rounded border-border focus:ring-brand-primary accent-brand-primary"
                            />
                            <span className="text-sm font-semibold">Remove Special Chars</span>
                        </label>

                        <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold">Separator:</span>
                            <select
                                value={separator}
                                onChange={(e) => {
                                    const sep = e.target.value as '-' | '_';
                                    setSeparator(sep);
                                    generateSlug(input, sep, lowercase, removeSpecialChars);
                                }}
                                className="bg-background border border-border rounded p-1 text-sm font-bold outline-brand-primary cursor-pointer w-24"
                            >
                                <option value="-">Hyphen (-)</option>
                                <option value="_">Underscore (_)</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 animate-in fade-in">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-bold uppercase tracking-widest text-brand-primary">
                                Generated URL Slug
                            </label>
                            {slug && (
                                <span className="text-xs font-bold px-2 py-1 bg-brand-primary/10 text-brand-primary rounded-full">
                                    {slug.length} chars
                                </span>
                            )}
                        </div>

                        <div className="relative group">
                            <div className="w-full min-h-[80px] p-6 bg-brand-primary/5 hover:bg-brand-primary/10 border-2 border-brand-primary/20 hover:border-brand-primary/50 transition-colors rounded-xl font-mono text-xl text-foreground break-all cursor-text select-all flex items-center shadow-sm">
                                {slug || <span className="opacity-30 text-base">your-generated-slug-will-appear-here</span>}
                            </div>

                            <button
                                onClick={handleCopy}
                                disabled={!slug}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-brand-primary text-white hover:bg-brand-primary/90 shadow-md rounded-lg transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed group-hover:block"
                            >
                                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
