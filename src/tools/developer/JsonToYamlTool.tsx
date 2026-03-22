'use client';

import { useState } from 'react';
import { Copy, Trash2, Check, AlertCircle, Braces } from 'lucide-react';
import yaml from 'js-yaml';

export default function JsonToYamlTool() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);
    const [indent, setIndent] = useState<2 | 4>(2);

    const convertJsonToYaml = (jsonStr: string, currentIndent: 2 | 4 = indent) => {
        setInput(jsonStr);
        setError('');

        if (!jsonStr.trim()) {
            setOutput('');
            return;
        }

        try {
            const data = JSON.parse(jsonStr);
            setOutput(yaml.dump(data, { indent: currentIndent }));
        } catch (e: any) {
            setError(`Invalid JSON: ${e.message}`);
            setOutput('');
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleIndentChange = (newIndent: 2 | 4) => {
        setIndent(newIndent);
        convertJsonToYaml(input, newIndent);
    };

    return (
        <div className="p-6 md:p-10 flex flex-col gap-8">
            <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 w-fit">
                <button
                    onClick={() => handleIndentChange(2)}
                    className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${indent === 2 ? 'bg-white dark:bg-zinc-800 shadow-sm text-brand-primary' : 'text-zinc-500'}`}
                >
                    2 Spaces
                </button>
                <button
                    onClick={() => handleIndentChange(4)}
                    className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${indent === 4 ? 'bg-white dark:bg-zinc-800 shadow-sm text-brand-primary' : 'text-zinc-500'}`}
                >
                    4 Spaces
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <label className="text-sm font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                            <Braces size={16} className="text-brand-primary" />
                            Input JSON
                        </label>
                        {input && (
                            <button onClick={() => convertJsonToYaml('')} className="text-zinc-400 hover:text-rose-500 transition-colors">
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                    <textarea
                        className="w-full h-[400px] p-6 rounded-3xl border-2 border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 focus:border-brand-primary outline-none transition-all resize-none font-mono text-sm leading-relaxed"
                        placeholder='{ "services": { "web": { "image": "nginx" } } }'
                        value={input}
                        onChange={(e) => convertJsonToYaml(e.target.value)}
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <label className="text-sm font-black uppercase tracking-widest text-zinc-500">YAML Output</label>
                        {output && (
                            <button
                                onClick={handleCopy}
                                className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-brand-primary transition-all"
                                title="Copy YAML"
                            >
                                {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                            </button>
                        )}
                    </div>
                    <div className="relative h-[400px]">
                        <div className={`w-full h-full p-6 rounded-3xl border-2 bg-zinc-50 dark:bg-zinc-900/50 font-mono text-sm leading-relaxed overflow-auto scrollbar-hide ${error ? 'border-rose-500/50' : 'border-zinc-100 dark:border-zinc-900'}`}>
                            {error ? (
                                <div className="flex flex-col items-center justify-center h-full text-rose-500 gap-3">
                                    <AlertCircle size={40} className="opacity-50" />
                                    <p className="font-bold">{error}</p>
                                </div>
                            ) : (
                                <pre className="whitespace-pre overflow-visible">
                                    {output || <span className="text-zinc-400 italic opacity-30">The generated YAML will appear here...</span>}
                                </pre>
                            )}
                        </div>
                    </div>
                </div>
            </div>
             <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                <div className="flex gap-4">
                    <span>Library: js-yaml 4.x</span>
                    <span className="hidden sm:inline">•</span>
                    <span>Indent: {indent}</span>
                </div>
                 <div className="flex items-center gap-2 text-brand-primary">
                    <Check size={12} />
                    Verified Output
                </div>
            </div>
        </div>
    );
}
