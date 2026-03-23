'use client';

import { useState } from 'react';
import { Search, Loader2, Link as LinkIcon, FileText, Check, Copy, AlertCircle, FileCode, Wand2, Minimize2 } from 'lucide-react';

export default function SitemapFormatter() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const formatSitemap = (xml: string, mode: 'beautify' | 'minify') => {
        try {
            if (mode === 'minify') {
                // Minify: Remove comments, spaces between tags, and tabs/newlines
                const minified = xml
                    .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
                    .replace(/>\s+</g, '><') // Remove spaces between tags
                    .trim();
                setOutput(minified);
            } else {
                // Beautify: Use XMLSerializer and DOMParser
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xml, 'application/xml');
                
                const parserError = xmlDoc.querySelector('parsererror');
                if (parserError) {
                    throw new Error('Invalid XML format. Cannot beautify malformed content.');
                }

                // Simple recursive formatter as DOMParser/XMLSerializer doesn't natively beautify
                const beautify = (node: Node, level: number = 0): string => {
                    const indent = '  '.repeat(level);
                    let result = '';

                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const element = node as Element;
                        result += `${indent}<${element.tagName}`;
                        
                        // Add attributes
                        for (let i = 0; i < element.attributes.length; i++) {
                            const attr = element.attributes[i];
                            result += ` ${attr.name}="${attr.value}"`;
                        }

                        if (element.childNodes.length === 0) {
                            result += ' />\n';
                        } else {
                            result += '>\n';
                            for (let i = 0; i < element.childNodes.length; i++) {
                                result += beautify(element.childNodes[i], level + 1);
                            }
                            result += `${indent}</${element.tagName}>\n`;
                        }
                    } else if (node.nodeType === Node.TEXT_NODE) {
                        const content = node.textContent?.trim();
                        if (content) {
                            result += `${indent}${content}\n`;
                        }
                    } else if (node.nodeType === Node.PROCESSING_INSTRUCTION_NODE) {
                        result += `${indent}<?xml ${node.nodeValue} ?>\n`;
                    }

                    return result;
                };

                let beautified = '<?xml version="1.0" encoding="UTF-8"?>\n';
                beautified += beautify(xmlDoc.documentElement);
                setOutput(beautified);
            }
            setError(null);
        } catch (err: any) {
            setError(err.message || 'Error occurred during formatting.');
            setOutput('');
        } finally {
            setLoading(false);
        }
    };

    const handleFormat = (mode: 'beautify' | 'minify') => {
        if (!input.trim()) return;
        setLoading(true);
        setTimeout(() => formatSitemap(input, mode), 300);
    };

    const handleCopy = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col gap-8 p-4 md:p-8">
            <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 border-4 border-zinc-100 dark:border-zinc-800 shadow-2xl">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4 text-brand-primary">
                        <div className="p-3 bg-brand-primary/10 rounded-2xl">
                            <FileCode size={28} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black tracking-tight">Beautify & Minify Sitemap</h2>
                            <p className="text-sm text-zinc-500 font-medium">Instantly format your XML sitemap for audits or production performance.</p>
                        </div>
                    </div>

                    <div className="relative">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder='Paste your sitemap XML here...'
                            className="w-full h-64 p-6 bg-zinc-50 dark:bg-zinc-800 border-2 border-zinc-100 dark:border-zinc-700 rounded-3xl outline-none focus:ring-4 ring-brand-primary/10 font-mono text-sm transition-all shadow-inner"
                        />
                         {input && (
                            <button 
                                onClick={() => setInput('')}
                                className="absolute right-4 top-4 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-red-500 transition-colors"
                            >
                                Clear
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button
                            onClick={() => handleFormat('beautify')}
                            disabled={loading || !input.trim()}
                            className="h-16 bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <Wand2 size={24} />}
                            Beautify (Format)
                        </button>
                        <button
                            onClick={() => handleFormat('minify')}
                            disabled={loading || !input.trim()}
                            className="h-16 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border-2 border-zinc-100 dark:border-zinc-700 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <Minimize2 size={24} />}
                            Minify (Shrink)
                        </button>
                    </div>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-100 dark:border-red-900/30 p-6 rounded-3xl flex items-start gap-4 text-red-600">
                    <AlertCircle className="shrink-0 mt-1" />
                    <div>
                        <h4 className="font-bold">Formatting Error</h4>
                        <p className="text-sm">{error}</p>
                    </div>
                </div>
            )}

            {output && (
                <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border-4 border-zinc-100 dark:border-zinc-800 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="p-8 border-b-2 border-zinc-50 dark:border-zinc-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                                <Check size={20} />
                            </div>
                            <h3 className="text-xl font-black tracking-tighter uppercase tracking-[0.1em]">Result Code</h3>
                        </div>
                        <button 
                            onClick={handleCopy}
                            className={`flex items-center gap-2 px-6 h-12 rounded-xl text-sm font-bold transition-all ${
                                copied ? 'bg-emerald-500 text-white shadow-emerald-200' : 'bg-brand-primary text-white shadow-brand-primary/20'
                            } shadow-lg hover:scale-105 active:scale-95`}
                        >
                            {copied ? <Check size={18} /> : <Copy size={18} />}
                            {copied ? 'Copied XML!' : 'Copy to Clipboard'}
                        </button>
                    </div>
                    <div className="p-8 bg-zinc-50/50 dark:bg-zinc-950/50">
                        <textarea
                            readOnly
                            value={output}
                            className="w-full h-96 p-6 bg-white dark:bg-zinc-900 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 outline-none font-mono text-sm shadow-inner"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
