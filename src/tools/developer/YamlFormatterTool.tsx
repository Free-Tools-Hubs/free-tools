'use client';

import { useState } from 'react';
import { Copy, Trash2, Check, AlertCircle, Sparkles } from 'lucide-react';
import yaml from 'js-yaml';

export default function YamlFormatterTool() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [indentSize, setIndentSize] = useState(2);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const formatYaml = (val: string) => {
        setInput(val);
        if (!val.trim()) {
            setOutput('');
            setError(null);
            return;
        }
        try {
            const parsed = yaml.load(val);
            const formatted = yaml.dump(parsed, { indent: indentSize, noRefs: true });
            setOutput(formatted);
            setError(null);
        } catch (e: any) {
            setError(e.message);
            setOutput('');
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="p-6 md:p-10 flex flex-col gap-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <label className="text-sm font-black uppercase tracking-widest text-zinc-500">Input YAML</label>
                        {input && (
                            <button onClick={() => formatYaml('')} className="text-zinc-400 hover:text-rose-500 transition-colors">
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                    <textarea
                        className={`w-full h-96 p-6 rounded-3xl border-2 bg-white dark:bg-zinc-950 outline-none font-mono text-sm leading-relaxed ${error ? 'border-rose-500/50' : 'border-zinc-100 dark:border-zinc-900 border-dashed'}`}
                        placeholder="Paste messy YAML here..."
                        value={input}
                        onChange={(e) => formatYaml(e.target.value)}
                    />
                     {error && (
                        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 p-4 rounded-2xl flex items-start gap-3 transition-opacity">
                            <AlertCircle size={18} className="shrink-0 mt-0.5" />
                            <p className="text-sm font-semibold">{error}</p>
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-4">
                             <label className="text-sm font-black uppercase tracking-widest text-zinc-500">Formatted Output</label>
                             <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                {[2, 4].map(s => (
                                    <button
                                        key={s}
                                        onClick={() => { setIndentSize(s); if(input) formatYaml(input); }}
                                        className={`px-3 py-1 rounded-lg text-[10px] font-black tracking-widest transition-all ${indentSize === s ? 'bg-white dark:bg-zinc-800 text-brand-primary shadow-sm' : 'text-zinc-500'}`}
                                    >
                                        {s} spaces
                                    </button>
                                ))}
                             </div>
                        </div>
                        {output && (
                            <button
                                onClick={handleCopy}
                                className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-brand-primary"
                            >
                                {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                            </button>
                        )}
                    </div>
                    
                    <div className="relative h-96 group">
                        <pre className="w-full h-full p-8 rounded-3xl border-2 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-100 dark:border-zinc-900 font-mono text-sm leading-relaxed overflow-auto scrollbar-hide text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap selection:bg-brand-primary/20">
                             {output || <span className="text-zinc-400 italic opacity-30">Formatted result will appear here...</span>}
                        </pre>
                    </div>
                </div>
            </div>
             <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                <div className="flex gap-4">
                    <span>Lib: js-yaml (Strict Mode)</span>
                    <span className="hidden sm:inline">•</span>
                    <span>Validation: Auto-lint</span>
                </div>
                 <div className="flex items-center gap-2 text-brand-primary">
                    <Sparkles size={12} />
                    Valid YAML Schema
                </div>
            </div>
        </div>
    );
}
