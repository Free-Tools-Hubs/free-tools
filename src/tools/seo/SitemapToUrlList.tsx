'use client';

import { useState } from 'react';
import { Search, Loader2, Link as LinkIcon, FileText, Check, Copy, AlertCircle, List, Download } from 'lucide-react';

export default function SitemapToUrlList() {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [urls, setUrls] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const extractUrls = (xmlText: string) => {
        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, 'application/xml');
            
            const parserError = xmlDoc.querySelector('parsererror');
            if (parserError) {
                throw new Error('Invalid XML format. Please check your sitemap content.');
            }

            const locs = xmlDoc.querySelectorAll('loc');
            const extractedUrls = Array.from(locs)
                .map(loc => loc.textContent || '')
                .filter(url => url.trim().length > 0);

            if (extractedUrls.length === 0) {
                throw new Error('No URLs found in the provided XML.');
            }

            setUrls(extractedUrls);
            setError(null);
        } catch (err: any) {
            setError(err.message || 'An error occurred while extracting URLs.');
            setUrls([]);
        } finally {
            setLoading(false);
        }
    };

    const handleExtract = () => {
        if (!input.trim()) return;
        setLoading(true);
        setTimeout(() => extractUrls(input), 300);
    };

    const handleCopy = () => {
        if (urls.length === 0) return;
        navigator.clipboard.writeText(urls.join('\n'));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        if (urls.length === 0) return;
        const blob = new Blob([urls.join('\n')], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `sitemap-urls-${new Date().toISOString().split('T')[0]}.txt`;
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex flex-col gap-8 p-4 md:p-8">
            <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 border-4 border-zinc-100 dark:border-zinc-800 shadow-2xl">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4 text-brand-primary">
                        <div className="p-3 bg-brand-primary/10 rounded-2xl">
                            <List size={28} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black tracking-tight">Extract URL List</h2>
                            <p className="text-sm text-zinc-500 font-medium">Convert complex XML sitemaps into clean, line-by-line URL lists.</p>
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

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={handleExtract}
                            disabled={loading || !input.trim()}
                            className="flex-grow h-16 bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 shadow-xl"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <LinkIcon size={24} />}
                            Extract All URLs
                        </button>
                    </div>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-100 dark:border-red-900/30 p-6 rounded-3xl flex items-start gap-4 text-red-600">
                    <AlertCircle className="shrink-0 mt-1" />
                    <div>
                        <h4 className="font-bold">Error</h4>
                        <p className="text-sm">{error}</p>
                    </div>
                </div>
            )}

            {urls.length > 0 && (
                <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border-4 border-zinc-100 dark:border-zinc-800 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="p-8 border-b-2 border-zinc-50 dark:border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-brand-primary/5">
                        <div>
                            <div className="text-3xl font-black mb-1 flex items-center gap-3">
                                <span className="text-brand-primary">{urls.length.toLocaleString()}</span>
                                <span className="text-zinc-400">Total URLs</span>
                            </div>
                            <p className="text-sm font-medium text-zinc-500">Duplicate URLs are automatically identified in the list below.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={handleDownload}
                                className="flex-grow sm:flex-none flex items-center justify-center gap-2 px-6 h-12 bg-zinc-950 text-white dark:bg-zinc-50 dark:text-zinc-950 rounded-xl text-sm font-bold hover:scale-105 active:scale-95 transition-all shadow-lg"
                            >
                                <Download size={18} />
                                Download .txt
                            </button>
                            <button 
                                onClick={handleCopy}
                                className="flex-grow sm:flex-none flex items-center justify-center gap-2 px-6 h-12 bg-white dark:bg-zinc-800 border-2 border-zinc-100 dark:border-zinc-700 rounded-xl text-sm font-bold hover:border-brand-primary hover:text-brand-primary transition-all shadow-md"
                            >
                                {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                                {copied ? 'Copied!' : 'Copy List'}
                            </button>
                        </div>
                    </div>
                    <div className="p-8 bg-zinc-50/50 dark:bg-zinc-950/50">
                        <textarea
                            readOnly
                            value={urls.join('\n')}
                            className="w-full h-96 p-6 bg-white dark:bg-zinc-900 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 outline-none font-mono text-sm shadow-inner"
                        />
                        <div className="mt-6 flex flex-wrap gap-3">
                            {urls.slice(0, 10).map((url, i) => (
                                <div key={i} className="px-3 py-1 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-lg text-[10px] font-mono text-zinc-500 truncate max-w-[200px]">
                                    {url}
                                </div>
                            ))}
                            {urls.length > 10 && <div className="px-3 py-1 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">+ {urls.length - 10} more URLs</div>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
