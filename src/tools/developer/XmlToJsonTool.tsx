'use client';

import { useState } from 'react';
import { Copy, Trash2, Check, AlertCircle, Braces } from 'lucide-react';
import { xml2js } from 'xml-js';

export default function XmlToJsonTool() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const convertXmlToJson = (xmlStr: string) => {
        setInput(xmlStr);
        if (!xmlStr.trim()) {
            setOutput('');
            setError(null);
            return;
        }
        try {
            const result = xml2js(xmlStr, { compact: true });
            setOutput(JSON.stringify(result, null, 4));
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
                        <label className="text-sm font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                            <Braces size={16} className="text-brand-primary" />
                            XML Source
                        </label>
                        {input && (
                            <button onClick={() => convertXmlToJson('')} className="text-zinc-400 hover:text-rose-500 transition-colors">
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                    <textarea
                        className={`w-full h-96 p-6 rounded-3xl border-2 bg-white dark:bg-zinc-950 focus:border-brand-primary outline-none transition-all resize-none font-mono text-sm leading-relaxed ${error ? 'border-rose-500/50' : 'border-zinc-100 dark:border-zinc-900'}`}
                        placeholder='<root>\n  <name>Project</name>\n  <status>active</status>\n</root>'
                        value={input}
                        onChange={(e) => convertXmlToJson(e.target.value)}
                    />
                    {error && (
                        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 p-4 rounded-2xl flex items-start gap-3 transition-all">
                            <AlertCircle size={18} className="shrink-0 mt-0.5" />
                            <p className="text-sm font-semibold">{error}</p>
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                         <label className="text-sm font-black uppercase tracking-widest text-zinc-500">JSON Result</label>
                        {output && (
                            <button
                                onClick={handleCopy}
                                className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-brand-primary transition-all"
                            >
                                {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                            </button>
                        )}
                    </div>
                    
                    <div className="relative h-96 group">
                        <pre className="w-full h-full p-8 rounded-3xl border-2 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-100 dark:border-zinc-900 font-mono text-sm leading-relaxed overflow-auto scrollbar-hide text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap transition-opacity group-hover:opacity-90">
                            {output || <span className="text-zinc-400 italic opacity-30">JSON result will appear here...</span>}
                        </pre>
                    </div>
                </div>
            </div>
             <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                <div className="flex gap-4">
                    <span>Library: xml-js (Modern)</span>
                    <span className="hidden sm:inline">•</span>
                    <span>Format: Compact Mode</span>
                </div>
                 <div className="flex items-center gap-2 text-brand-primary">
                    <Check size={12} />
                    Auto-Formatted
                </div>
            </div>
        </div>
    );
}
