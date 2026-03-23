'use client';

import { useState } from 'react';
import { Search, Loader2, Link as LinkIcon, FileText, Check, Copy, AlertCircle, Hash, Layers } from 'lucide-react';

interface SitemapStats {
    totalUrls: number;
    isIndex: boolean;
    lastmod?: string;
    nestedSitemaps: string[];
    urls: string[];
}

export default function SitemapUrlCounter() {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState<SitemapStats | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const parseSitemap = (xmlText: string) => {
        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, 'application/xml');
            
            // Check for parsing errors
            const parserError = xmlDoc.querySelector('parsererror');
            if (parserError) {
                throw new Error('Invalid XML format. Please check your sitemap content.');
            }

            const sitemapIndex = xmlDoc.querySelector('sitemapindex');
            const urlset = xmlDoc.querySelector('urlset');

            if (!sitemapIndex && !urlset) {
                throw new Error('Not a valid XML sitemap. Could not find <sitemapindex> or <urlset> tags.');
            }

            const stats: SitemapStats = {
                totalUrls: 0,
                isIndex: !!sitemapIndex,
                nestedSitemaps: [],
                urls: []
            };

            if (sitemapIndex) {
                const sitemaps = xmlDoc.querySelectorAll('sitemap > loc');
                stats.nestedSitemaps = Array.from(sitemaps).map(loc => loc.textContent || '');
                stats.totalUrls = stats.nestedSitemaps.length;
            } else if (urlset) {
                const locs = xmlDoc.querySelectorAll('url > loc');
                stats.urls = Array.from(locs).map(loc => loc.textContent || '');
                stats.totalUrls = stats.urls.length;
                
                const lastmods = xmlDoc.querySelectorAll('url > lastmod');
                if (lastmods.length > 0) {
                    stats.lastmod = lastmods[0].textContent || undefined;
                }
            }

            setStats(stats);
            setError(null);
        } catch (err: any) {
            setError(err.message || 'An error occurred while parsing the sitemap.');
            setStats(null);
        } finally {
            setLoading(false);
        }
    };

    const handleAnalyze = () => {
        if (!input.trim()) return;
        setLoading(true);
        // Simulate a tiny delay for UX
        setTimeout(() => parseSitemap(input), 300);
    };

    const handleCopyList = () => {
        if (!stats) return;
        const list = stats.isIndex ? stats.nestedSitemaps.join('\n') : stats.urls.join('\n');
        navigator.clipboard.writeText(list);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col gap-8 p-4 md:p-8">
            <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 border-4 border-zinc-100 dark:border-zinc-800 shadow-2xl">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4 text-brand-primary">
                        <div className="p-3 bg-brand-primary/10 rounded-2xl">
                            <Search size={28} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black tracking-tight">Paste Sitemap XML</h2>
                            <p className="text-sm text-zinc-500 font-medium">Analyze your sitemap structure and URL count instantly.</p>
                        </div>
                    </div>

                    <div className="relative">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder='<?xml version="1.0" encoding="UTF-8"?>...'
                            className="w-full h-64 p-6 bg-zinc-50 dark:bg-zinc-800 border-2 border-zinc-100 dark:border-zinc-700 rounded-3xl outline-none focus:ring-4 ring-brand-primary/10 font-mono text-sm transition-all"
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

                    <button
                        onClick={handleAnalyze}
                        disabled={loading || !input.trim()}
                        className="h-16 bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <Hash size={24} />}
                        Analyze Sitemap
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-100 dark:border-red-900/30 p-6 rounded-3xl flex items-start gap-4 text-red-600">
                    <AlertCircle className="shrink-0 mt-1" />
                    <div>
                        <h4 className="font-bold">Parsing Error</h4>
                        <p className="text-sm opacity-90">{error}</p>
                    </div>
                </div>
            )}

            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border-2 border-zinc-100 dark:border-zinc-800 shadow-xl flex flex-col items-center text-center gap-4">
                        <div className="w-16 h-16 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center">
                            <Hash size={32} />
                        </div>
                        <div>
                            <div className="text-4xl font-black tracking-tighter mb-1">{stats.totalUrls.toLocaleString()}</div>
                            <div className="text-xs font-bold uppercase tracking-widest text-zinc-400">Total {stats.isIndex ? 'Sitemaps' : 'URLs'}</div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border-2 border-zinc-100 dark:border-zinc-800 shadow-xl flex flex-col items-center text-center gap-4">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${stats.isIndex ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>
                            {stats.isIndex ? <Layers size={32} /> : <FileText size={32} />}
                        </div>
                        <div>
                            <div className="text-2xl font-black tracking-tight mb-1">{stats.isIndex ? 'Sitemap Index' : 'Standard Sitemap'}</div>
                            <div className="text-xs font-bold uppercase tracking-widest text-zinc-400">Sitemap Type</div>
                        </div>
                    </div>

                    <div className="bg-zinc-950 text-white p-8 rounded-3xl shadow-xl flex flex-col items-center text-center gap-4">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                            <Check size={32} className="text-emerald-400" />
                        </div>
                        <div>
                            <div className="text-2xl font-black tracking-tight mb-1">
                                {stats.totalUrls <= 50000 ? 'Safe' : 'Too Large'}
                            </div>
                            <div className="text-xs font-bold uppercase tracking-widest text-white/40">Google Limit (50k)</div>
                        </div>
                    </div>

                    <div className="md:col-span-2 lg:col-span-3 bg-white dark:bg-zinc-900 rounded-3xl border-2 border-zinc-100 dark:border-zinc-800 shadow-xl overflow-hidden">
                        <div className="p-6 border-b-2 border-zinc-50 dark:border-zinc-800 flex items-center justify-between">
                            <h3 className="font-black flex items-center gap-2">
                                <LinkIcon size={20} className="text-brand-primary" />
                                {stats.isIndex ? 'Included Sitemaps' : 'Extracted URLs'}
                            </h3>
                            <button 
                                onClick={handleCopyList}
                                className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-xs font-bold hover:bg-brand-primary hover:text-white transition-all"
                            >
                                {copied ? <Check size={14} /> : <Copy size={14} />}
                                {copied ? 'Copied!' : 'Copy List'}
                            </button>
                        </div>
                        <div className="max-h-96 overflow-y-auto p-4 bg-zinc-50/50 dark:bg-zinc-950/50">
                            <div className="flex flex-col gap-2">
                                {(stats.isIndex ? stats.nestedSitemaps : stats.urls).map((url, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-xs font-mono group">
                                        <span className="text-zinc-400 w-8">{i + 1}</span>
                                        <span className="truncate flex-grow">{url}</span>
                                        <a href={url} target="_blank" rel="noopener noreferrer" className="opacity-0 group-hover:opacity-100 text-brand-primary">
                                            <LinkIcon size={14} />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
