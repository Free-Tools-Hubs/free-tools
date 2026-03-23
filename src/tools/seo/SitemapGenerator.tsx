'use client';

import { useState } from 'react';
import { Search, Loader2, Link as LinkIcon, FileText, Check, Copy, AlertCircle, Zap, Download } from 'lucide-react';

export default function SitemapGenerator() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const generateSitemap = (urlText: string) => {
        const urls = urlText.split('\n')
            .map(u => u.trim())
            .filter(u => u.length > 0 && (u.startsWith('http://') || u.startsWith('https://')));

        if (urls.length === 0) {
            setOutput('No valid URLs found. Please ensure URLs start with http:// or https://');
            return;
        }

        const date = new Date().toISOString().split('T')[0];
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
        
        urls.forEach(url => {
            // Basic escaping for XML
            const escapedUrl = url.replace(/&/g, '&amp;')
                                 .replace(/</g, '&lt;')
                                 .replace(/>/g, '&gt;')
                                 .replace(/"/g, '&quot;')
                                 .replace(/'/g, '&apos;');
            
            xml += '  <url>\n';
            xml += `    <loc>${escapedUrl}</loc>\n`;
            xml += `    <lastmod>${date}</lastmod>\n`;
            xml += '    <changefreq>monthly</changefreq>\n';
            xml += '    <priority>0.5</priority>\n';
            xml += '  </url>\n';
        });

        xml += '</urlset>';
        setOutput(xml);
        setLoading(false);
    };

    const handleGenerate = () => {
        if (!input.trim()) return;
        setLoading(true);
        setTimeout(() => generateSitemap(input), 400);
    };

    const handleCopy = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        if (!output) return;
        const blob = new Blob([output], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'sitemap.xml';
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex flex-col gap-8 p-4 md:p-8">
            <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 border-4 border-zinc-100 dark:border-zinc-800 shadow-2xl">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4 text-brand-primary">
                        <div className="p-3 bg-brand-primary/10 rounded-2xl">
                            <Zap size={28} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black tracking-tight">Sitemap XML Generator</h2>
                            <p className="text-sm text-zinc-500 font-medium">Quickly turn a list of URLs into a valid XML sitemap for Google Search Console.</p>
                        </div>
                    </div>

                    <div className="relative">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder='Enter one URL per line (e.g., https://example.com/page1)...'
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

                    <button
                        onClick={handleGenerate}
                        disabled={loading || !input.trim()}
                        className="h-16 bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : < Zap size={24} />}
                        Build Sitemap XML
                    </button>
                </div>
            </div>

            {output && (
                <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border-4 border-zinc-100 dark:border-zinc-800 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="p-8 border-b-2 border-zinc-50 dark:border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-emerald-50/50 dark:bg-emerald-950/10">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
                                <Check size={24} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black tracking-tight">Sitemap Ready!</h3>
                                <p className="text-sm text-zinc-500 font-medium">Your XML sitemap has been generated successfully.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={handleDownload}
                                className="flex-grow sm:flex-none flex items-center justify-center gap-2 px-6 h-12 bg-zinc-950 text-white dark:bg-zinc-50 dark:text-zinc-950 rounded-xl text-sm font-bold hover:scale-105 active:scale-95 transition-all shadow-lg"
                            >
                                <Download size={18} />
                                Download XML
                            </button>
                            <button 
                                onClick={handleCopy}
                                className={`flex-grow sm:flex-none flex items-center justify-center gap-2 px-6 h-12 rounded-xl text-sm font-bold transition-all border-2 ${
                                    copied ? 'border-emerald-500 text-emerald-500 shadow-emerald-50' : 'border-zinc-200 dark:border-zinc-700 hover:border-brand-primary hover:text-brand-primary'
                                } shadow-md`}
                            >
                                {copied ? <Check size={18} /> : <Copy size={18} />}
                                {copied ? 'Copied!' : 'Copy to Clipboard'}
                            </button>
                        </div>
                    </div>
                    <div className="p-8">
                        <textarea
                            readOnly
                            value={output}
                            className="w-full h-96 p-8 bg-zinc-50 dark:bg-zinc-950 rounded-3xl border-2 border-zinc-100 dark:border-zinc-800 outline-none font-mono text-xs leading-relaxed shadow-inner"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
