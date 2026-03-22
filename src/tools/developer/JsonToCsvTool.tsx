'use client';

import { useState } from 'react';
import { Copy, Trash2, Download, Check, AlertCircle, FileJson } from 'lucide-react';
import Papa from 'papaparse';

export default function JsonToCsvTool() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const convertJsonToCsv = (jsonStr: string) => {
        setInput(jsonStr);
        setError('');

        if (!jsonStr.trim()) {
            setOutput('');
            return;
        }

        try {
            const jsonData = JSON.parse(jsonStr);
            
            // PapaParse expects an array of objects
            const dataArray = Array.isArray(jsonData) ? jsonData : [jsonData];
            
            const csv = Papa.unparse(dataArray);
            setOutput(csv);
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

    const downloadCsv = () => {
        const blob = new Blob([output], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'converted_data.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="p-6 md:p-10 flex flex-col gap-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <label className="text-sm font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                            <FileJson size={16} className="text-brand-primary" />
                            Input JSON Array
                        </label>
                        {input && (
                            <button 
                                onClick={() => convertJsonToCsv('')}
                                className="text-zinc-400 hover:text-rose-500 transition-colors"
                                title="Clear Input"
                            >
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                    <div className="relative group">
                        <textarea
                            className="w-full h-[400px] p-6 rounded-3xl border-2 border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 focus:border-brand-primary outline-none transition-all resize-none font-mono text-sm leading-relaxed shadow-sm"
                            placeholder='[{"id": 1, "name": "John"}, {"id": 2, "name": "Jane"}]'
                            value={input}
                            onChange={(e) => convertJsonToCsv(e.target.value)}
                        />
                    </div>
                </div>

                {/* Output Section */}
                <div className="space-y-4">
                     <div className="flex items-center justify-between px-2">
                        <label className="text-sm font-black uppercase tracking-widest text-zinc-500">CSV Output</label>
                        <div className="flex gap-2">
                             {output && (
                                <>
                                    <button
                                        onClick={downloadCsv}
                                        className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-brand-primary transition-all"
                                        title="Download CSV"
                                    >
                                        <Download size={18} />
                                    </button>
                                    <button
                                        onClick={handleCopy}
                                        className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-brand-primary transition-all"
                                        title="Copy to Clipboard"
                                    >
                                        {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                    
                    <div className="relative h-[400px]">
                        <div className={`w-full h-full p-6 rounded-3xl border-2 bg-zinc-50 dark:bg-zinc-900/50 font-mono text-sm leading-relaxed overflow-auto scrollbar-hide ${error ? 'border-rose-500/50' : 'border-zinc-100 dark:border-zinc-900'}`}>
                            {error ? (
                                <div className="flex flex-col items-center justify-center h-full text-rose-500 gap-3 text-center px-4">
                                    <AlertCircle size={40} className="opacity-50" />
                                    <p className="font-bold">{error}</p>
                                </div>
                            ) : (
                                <pre className="whitespace-pre overflow-visible">
                                    {output || <span className="text-zinc-400 italic opacity-30">The converted CSV will appear here...</span>}
                                </pre>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Info */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                <div className="flex gap-4">
                    <span>Format: CSV (RFC 4180)</span>
                    <span className="hidden sm:inline">•</span>
                    <span>Safe: Client-side Only</span>
                </div>
                <div className="flex items-center gap-2 text-brand-primary">
                    <Check size={12} />
                    Verified Output
                </div>
            </div>
        </div>
    );
}
