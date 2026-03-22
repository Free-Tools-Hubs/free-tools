'use client';

import { useState } from 'react';
import { Copy, Trash2, Check, AlertCircle, Braces } from 'lucide-react';
import yaml from 'js-yaml';

export default function YamlToJsonTool() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const convertYamlToJson = (yamlStr: string) => {
        setInput(yamlStr);
        setError('');

        if (!yamlStr.trim()) {
            setOutput('');
            return;
        }

        try {
            const data = yaml.load(yamlStr);
            setOutput(JSON.stringify(data, null, 4));
        } catch (e: any) {
            setError(`Invalid YAML: ${e.message}`);
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
                            Input YAML
                        </label>
                        {input && (
                            <button onClick={() => convertYamlToJson('')} className="text-zinc-400 hover:text-rose-500 transition-colors">
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                    <textarea
                        className="w-full h-[400px] p-6 rounded-3xl border-2 border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 focus:border-brand-primary outline-none transition-all resize-none font-mono text-sm leading-relaxed"
                        placeholder="server:
  port: 8080
  host: localhost
database:
  enabled: true"
                        value={input}
                        onChange={(e) => convertYamlToJson(e.target.value)}
                    />
                </div>

                <div className="space-y-4">
                     <div className="flex items-center justify-between px-2">
                        <label className="text-sm font-black uppercase tracking-widest text-zinc-500">JSON Output</label>
                        {output && (
                            <button
                                onClick={handleCopy}
                                className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-brand-primary transition-all"
                                title="Copy JSON"
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
                                    {output || <span className="text-zinc-400 italic opacity-30">The generated JSON will appear here...</span>}
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
                    <span>Spec: YAML 1.2</span>
                </div>
                 <div className="flex items-center gap-2 text-brand-primary">
                    <Check size={12} />
                    Verified Output
                </div>
            </div>
        </div>
    );
}
