'use client';

import { useState } from 'react';
import { Copy, Trash2, Check, Layout, Code, Eye } from 'lucide-react';
import { marked } from 'marked';

export default function MarkdownToHtmlTool() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);
    const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');

    const convertMarkdownToHtml = (mdStr: string) => {
        setInput(mdStr);
        if (!mdStr.trim()) {
            setOutput('');
            return;
        }
        try {
            // Marked returns a promise or a string depending on options
            // Basic synchronous usage:
            const html = marked.parse(mdStr) as string;
            setOutput(html);
        } catch (e) {
            setOutput('Error parsing markdown');
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
                            <Layout size={16} className="text-brand-primary" />
                            Markdown Editor
                        </label>
                        {input && (
                            <button onClick={() => convertMarkdownToHtml('')} className="text-zinc-400 hover:text-rose-500 transition-colors">
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                    <textarea
                        className="w-full h-[500px] p-6 rounded-3xl border-2 border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 focus:border-brand-primary outline-none transition-all resize-none font-mono text-sm leading-relaxed"
                        placeholder="# Hello World
This is **bold** and *italic*
- Item 1
- Item 2"
                        value={input}
                        onChange={(e) => convertMarkdownToHtml(e.target.value)}
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800">
                            <button
                                onClick={() => setViewMode('preview')}
                                className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${viewMode === 'preview' ? 'bg-white dark:bg-zinc-800 shadow-sm text-brand-primary' : 'text-zinc-500'}`}
                            >
                                <Eye size={12} />
                                Preview
                            </button>
                            <button
                                onClick={() => setViewMode('code')}
                                className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${viewMode === 'code' ? 'bg-white dark:bg-zinc-800 shadow-sm text-brand-primary' : 'text-zinc-500'}`}
                            >
                                <Code size={12} />
                                Raw Code
                            </button>
                        </div>
                        {output && (
                            <button
                                onClick={handleCopy}
                                className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-brand-primary transition-all"
                                title="Copy HTML"
                            >
                                {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                            </button>
                        )}
                    </div>
                    
                    <div className="relative h-[500px]">
                        <div className={`w-full h-full p-8 rounded-3xl border-2 bg-white dark:bg-zinc-950 overflow-auto scrollbar-hide border-zinc-100 dark:border-zinc-900`}>
                            {viewMode === 'preview' ? (
                                <div 
                                    className="prose dark:prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{ __html: output || '<p class="text-zinc-400 italic opacity-30">Rendered preview will appear here...</p>' }}
                                />
                            ) : (
                                <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                                    {output || <span className="text-zinc-400 italic opacity-30">Raw HTML will appear here...</span>}
                                </pre>
                            )}
                        </div>
                    </div>
                </div>
            </div>
             <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                <div className="flex gap-4">
                    <span>Library: Marked.js 14+</span>
                    <span className="hidden sm:inline">•</span>
                    <span>Spec: CommonMark / GFM</span>
                </div>
                 <div className="flex items-center gap-2 text-brand-primary">
                    <Check size={12} />
                    Ready for Publish
                </div>
            </div>
        </div>
    );
}
