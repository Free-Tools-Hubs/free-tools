'use client';

import { useState } from 'react';
import { Copy, Trash2, Check, Layout, Sparkles } from 'lucide-react';
import TurndownService from 'turndown';

export default function HtmlToMarkdownTool() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);

    const convertHtmlToMarkdown = (htmlStr: string) => {
        setInput(htmlStr);
        if (!htmlStr.trim()) {
            setOutput('');
            return;
        }
        try {
            const turndownService = new TurndownService({
                headingStyle: 'atx',
                codeBlockStyle: 'fenced'
            });
            const md = turndownService.turndown(htmlStr);
            setOutput(md);
        } catch (e) {
            setOutput('Error converting HTML to Markdown');
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
                            HTML Source
                        </label>
                        {input && (
                            <button onClick={() => convertHtmlToMarkdown('')} className="text-zinc-400 hover:text-rose-500 transition-colors">
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                    <textarea
                        className="w-full h-[450px] p-6 rounded-3xl border-2 border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 focus:border-brand-primary outline-none transition-all resize-none font-mono text-sm leading-relaxed"
                        placeholder="<h1>Title</h1>\n<p>This is a <strong>bold</strong> paragraph.</p>"
                        value={input}
                        onChange={(e) => convertHtmlToMarkdown(e.target.value)}
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                         <label className="text-sm font-black uppercase tracking-widest text-zinc-500">Markdown Output</label>
                        {output && (
                            <button
                                onClick={handleCopy}
                                className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-brand-primary transition-all"
                                title="Copy Markdown"
                            >
                                {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                            </button>
                        )}
                    </div>
                    
                    <div className="relative h-[450px]">
                        <div className={`w-full h-full p-8 rounded-3xl border-2 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-100 dark:border-zinc-900 font-mono text-sm whitespace-pre-wrap overflow-auto scrollbar-hide`}>
                             {output || <span className="text-zinc-400 italic opacity-30">Cleaned Markdown will appear here...</span>}
                        </div>
                    </div>
                </div>
            </div>
             <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                <div className="flex gap-4">
                    <span>Library: Turndown 7.x</span>
                    <span className="hidden sm:inline">•</span>
                    <span>Format: GFM Syntax</span>
                </div>
                 <div className="flex items-center gap-2 text-brand-primary">
                    <Sparkles size={12} />
                    Auto-Formatted
                </div>
            </div>
        </div>
    );
}
