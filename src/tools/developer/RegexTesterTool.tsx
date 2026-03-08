"use client";

import { useState, useMemo } from 'react';
import { Copy, Trash2, Search, Slash, AlertTriangle } from 'lucide-react';

export default function RegexTesterTool() {
    const [pattern, setPattern] = useState('');
    const [flags, setFlags] = useState('g');
    const [text, setText] = useState('');

    const { matchSpans, matchesCount, error: regexError } = useMemo(() => {
        const spans: { text: string; isMatch: boolean; isGroup?: boolean }[] = [];
        let count = 0;
        let errStr: string | null = null;
        let regex: RegExp | null = null;

        try {
            if (pattern) {
                // Only compile if valid
                regex = new RegExp(pattern, flags);

                if (text) {
                    let lastIndex = 0;
                    let m;

                    // If global, we can loop. If not, we just find one or zero.
                    const isGlobal = flags.includes('g');

                    if (isGlobal) {
                        while ((m = regex.exec(text)) !== null) {
                            if (m.index === regex.lastIndex) {
                                regex.lastIndex++;
                            }
                            if (m[0].length === 0 && lastIndex === m.index) continue; // prevent infinite loops with empty matches

                            if (m.index > lastIndex) {
                                spans.push({ text: text.substring(lastIndex, m.index), isMatch: false });
                            }
                            spans.push({ text: m[0], isMatch: true });
                            count++;
                            lastIndex = m.index + m[0].length;
                        }
                        if (lastIndex < text.length) {
                            spans.push({ text: text.substring(lastIndex), isMatch: false });
                        }
                    } else {
                        m = regex.exec(text);
                        if (m) {
                            if (m.index > 0) {
                                spans.push({ text: text.substring(0, m.index), isMatch: false });
                            }
                            spans.push({ text: m[0], isMatch: true });
                            count++;
                            if (m.index + m[0].length < text.length) {
                                spans.push({ text: text.substring(m.index + m[0].length), isMatch: false });
                            }
                        } else {
                            spans.push({ text, isMatch: false });
                        }
                    }
                } else {
                    spans.push({ text: '', isMatch: false }); // If no text, but pattern exists, show empty non-match
                }
            } else {
                spans.push({ text, isMatch: false }); // If no pattern, show all text as non-match
            }
        } catch (err: any) {
            errStr = err.message;
            spans.push({ text, isMatch: false });
        }

        return { matchSpans: spans, matchesCount: count, error: errStr };
    }, [pattern, flags, text]);

    const loadExample = () => {
        setPattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
        setFlags('g');
        setText('You can reach out to support@example.com for help, or email admin@free-tools.com direct.');
    };

    return (
        <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Slash className="w-5 h-5 text-brand-primary" />
                        Regular Expression
                    </h2>
                    <div className="flex gap-2">
                        <button
                            onClick={loadExample}
                            className="px-3 py-1.5 text-sm font-bold text-brand-primary bg-brand-primary/10 hover:bg-brand-primary/20 rounded-lg transition-colors"
                        >
                            Example
                        </button>
                        <button
                            onClick={() => { setPattern(''); setText(''); setFlags('g'); }}
                            className="px-3 py-1.5 text-sm font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors flex items-center gap-1"
                        >
                            <Trash2 className="w-4 h-4" /> Clear
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-2 relative">
                    <div className="flex border border-border overflow-hidden rounded-lg focus-within:ring-2 focus-within:ring-brand-primary/50 transition-shadow">
                        <span className="bg-muted px-4 py-3 font-mono text-muted-foreground font-bold border-r border-border">/</span>
                        <input
                            type="text"
                            value={pattern}
                            onChange={(e) => setPattern(e.target.value)}
                            placeholder="Enter regex pattern... (e.g. \b[A-Za-z]+\b)"
                            className="flex-1 px-4 py-3 bg-background outline-none font-mono text-sm"
                            spellCheck={false}
                        />
                        <span className="bg-muted px-4 py-3 font-mono text-muted-foreground font-bold border-l border-border">/</span>
                        <input
                            type="text"
                            value={flags}
                            onChange={(e) => setFlags(e.target.value)}
                            placeholder="gmi"
                            className="w-16 px-3 py-3 bg-muted outline-none font-mono text-sm tracking-widest text-brand-primary font-bold"
                            spellCheck={false}
                        />
                    </div>
                    {regexError && (
                        <div className="text-red-500 text-sm font-semibold flex items-center gap-1 mt-1 bg-red-500/10 p-2 rounded">
                            <AlertTriangle className="w-4 h-4" /> {regexError}
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs md:text-sm font-semibold p-4 bg-muted/50 rounded-lg border border-border">
                    <label className="flex items-center gap-2 cursor-pointer hover:text-brand-primary transition-colors">
                        <input type="checkbox" checked={flags.includes('g')} onChange={(e) => setFlags(e.target.checked ? flags + 'g' : flags.replace('g', ''))} className="accent-brand-primary" />
                        Global (g)
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer hover:text-brand-primary transition-colors">
                        <input type="checkbox" checked={flags.includes('i')} onChange={(e) => setFlags(e.target.checked ? flags + 'i' : flags.replace('i', ''))} className="accent-brand-primary" />
                        Case Insensitive (i)
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer hover:text-brand-primary transition-colors">
                        <input type="checkbox" checked={flags.includes('m')} onChange={(e) => setFlags(e.target.checked ? flags + 'm' : flags.replace('m', ''))} className="accent-brand-primary" />
                        Multiline (m)
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer hover:text-brand-primary transition-colors">
                        <input type="checkbox" checked={flags.includes('s')} onChange={(e) => setFlags(e.target.checked ? flags + 's' : flags.replace('s', ''))} className="accent-brand-primary" />
                        Dot All (s)
                    </label>
                </div>

                <div className="flex flex-col gap-2 mt-4 relative">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Search className="w-5 h-5 text-brand-primary" />
                            Test String
                        </h2>
                        <span className={`text-sm font-bold px-3 py-1 rounded-full ${matchesCount > 0 ? 'bg-green-500/10 text-green-600' : 'bg-muted text-muted-foreground'}`}>
                            {matchesCount} {matchesCount === 1 ? 'Match' : 'Matches'}
                        </span>
                    </div>

                    <div className="relative min-h-[300px] border border-border rounded-lg bg-background w-full">
                        {/* The hidden highly-transparent textarea handles user input perfectly aligned with the visual overlay */}
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Paste your test text here..."
                            className="absolute inset-0 w-full h-full p-4 bg-transparent outline-none focus:ring-2 focus:ring-brand-primary/50 text-base font-mono leading-relaxed z-10 text-transparent caret-foreground resize-none"
                            spellCheck={false}
                        />
                        <div className="absolute inset-0 w-full h-full p-4 pointer-events-none font-mono text-base leading-relaxed whitespace-pre-wrap break-all overflow-y-auto">
                            {text === '' ? (
                                <span className="text-muted-foreground opacity-50">Paste your test text here...</span>
                            ) : (
                                matchSpans.map((span, i) => (
                                    <span
                                        key={i}
                                        className={`${span.isMatch ? 'bg-brand-primary/20 text-brand-primary bg-yellow-200 dark:bg-yellow-900/40 rounded-sm' : 'text-foreground'}`}
                                    >
                                        {span.text}
                                    </span>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
