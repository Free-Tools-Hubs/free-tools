'use client';

import { useState } from 'react';
import { Search, Loader2, Link as LinkIcon, FileText, Check, Copy, AlertCircle, ShieldCheck, XCircle, Info } from 'lucide-react';

interface ValidationError {
    type: 'error' | 'warning' | 'info';
    message: string;
    line?: number;
}

export default function SitemapValidator() {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<{ errors: ValidationError[]; valid: boolean } | null>(null);

    const validateSitemap = (xmlText: string) => {
        const errors: ValidationError[] = [];
        let isValid = true;

        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, 'application/xml');
            
            // 1. Check for basic XML parsing errors
            const parserError = xmlDoc.querySelector('parsererror');
            if (parserError) {
                errors.push({ type: 'error', message: 'The XML is malformed and could not be parsed. Check for missing closing tags or invalid characters.' });
                isValid = false;
            }

            if (isValid) {
                const sitemapIndex = xmlDoc.querySelector('sitemapindex');
                const urlset = xmlDoc.querySelector('urlset');

                // 2. Check for root element
                if (!sitemapIndex && !urlset) {
                    errors.push({ type: 'error', message: 'Root element must be either <urlset> or <sitemapindex>.' });
                    isValid = false;
                }

                // 3. Namespace check
                const defaultNS = xmlDoc.documentElement.namespaceURI;
                if (defaultNS !== 'http://www.sitemaps.org/schemas/sitemap/0.9') {
                    errors.push({ type: 'warning', message: 'The namespace should be "http://www.sitemaps.org/schemas/sitemap/0.9".' });
                }

                // 4. URL Count Check
                const locs = xmlDoc.querySelectorAll('loc');
                if (locs.length > 50000) {
                    errors.push({ type: 'error', message: `Sitemaps must not contain more than 50,000 URLs. Found ${locs.length}.` });
                    isValid = false;
                }

                // 5. File Size Check (Rough Estimate)
                const sizeInMB = new Blob([xmlText]).size / (1024 * 1024);
                if (sizeInMB > 50) {
                    errors.push({ type: 'error', message: `Sitemaps must not exceed 50MB in size. Estimated: ${sizeInMB.toFixed(2)}MB.` });
                    isValid = false;
                }

                // 6. Data checks for <loc> and <lastmod>
                locs.forEach((loc, i) => {
                    const url = loc.textContent || '';
                    if (!url.startsWith('http://') && !url.startsWith('https://')) {
                        errors.push({ type: 'error', message: `Invalid URL at index ${i + 1}: Must start with http:// or https://.` });
                        isValid = false;
                    }
                });

                const lastmods = xmlDoc.querySelectorAll('lastmod');
                lastmods.forEach((lastmod, i) => {
                    const dateStr = lastmod.textContent || '';
                    if (!/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}([+-]\d{2}:\d{2}|Z))?$/.test(dateStr)) {
                        errors.push({ type: 'warning', message: `Non-standard date format in <lastmod> at index ${i + 1}. Expected W3C ISO 8601.` });
                    }
                });
            }

            setResults({ errors, valid: isValid && errors.filter(e => e.type === 'error').length === 0 });
        } catch (err: any) {
            setResults({ errors: [{ type: 'error', message: err.message || 'Critical validation error.' }], valid: false });
        } finally {
            setLoading(false);
        }
    };

    const handleValidate = () => {
        if (!input.trim()) return;
        setLoading(true);
        setTimeout(() => validateSitemap(input), 400);
    };

    return (
        <div className="flex flex-col gap-8 p-4 md:p-8">
            <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 border-4 border-zinc-100 dark:border-zinc-800 shadow-2xl">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4 text-brand-primary">
                        <div className="p-3 bg-brand-primary/10 rounded-2xl">
                            <ShieldCheck size={28} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black tracking-tight">Sitemap Validator</h2>
                            <p className="text-sm text-zinc-500 font-medium">Scan your sitemap for errors, size violations, and protocol issues.</p>
                        </div>
                    </div>

                    <div className="relative">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder='Paste sitemap XML for validation...'
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
                        onClick={handleValidate}
                        disabled={loading || !input.trim()}
                        className="h-16 bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <ShieldCheck size={24} />}
                        Run Security & Format Check
                    </button>
                </div>
            </div>

            {results && (
                <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className={`p-8 rounded-[2.5rem] flex items-center gap-6 border-4 ${results.valid ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-800/30 text-emerald-700' : 'bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-800/30 text-red-700'}`}>
                        <div className={`p-4 rounded-ful rounded-2xl ${results.valid ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                            {results.valid ? <Check size={32} /> : <XCircle size={32} />}
                        </div>
                        <div>
                            <h3 className="text-3xl font-black tracking-tighter">
                                {results.valid ? 'Valid Sitemap' : 'Validation Failed'}
                            </h3>
                            <p className="font-medium opacity-80">
                                {results.valid 
                                    ? 'Your sitemap follows all critical protocols and is ready for submission.'
                                    : `Found ${results.errors.filter(e => e.type === 'error').length} error(s) and ${results.errors.filter(e => e.type === 'warning').length} warning(s).`}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        {results.errors.map((err, i) => (
                            <div 
                                key={i} 
                                className={`p-6 rounded-3xl border-2 flex items-start gap-4 ${
                                    err.type === 'error' ? 'bg-white dark:bg-zinc-900 border-red-100 dark:border-red-900/20 shadow-sm' :
                                    err.type === 'warning' ? 'bg-white dark:bg-zinc-900 border-amber-100 dark:border-amber-900/20 shadow-sm' :
                                    'bg-white dark:bg-zinc-900 border-blue-100 dark:border-blue-900/20 shadow-sm'
                                }`}
                            >
                                <div className={`shrink-0 mt-1 ${
                                    err.type === 'error' ? 'text-red-500' :
                                    err.type === 'warning' ? 'text-amber-500' :
                                    'text-blue-500'
                                }`}>
                                    {err.type === 'error' ? <XCircle size={20} /> :
                                     err.type === 'warning' ? <AlertCircle size={20} /> :
                                     <Info size={20} />}
                                </div>
                                <div>
                                    <div className={`font-black uppercase tracking-[0.2em] text-[10px] mb-1 ${
                                        err.type === 'error' ? 'text-red-400' :
                                        err.type === 'warning' ? 'text-amber-400' :
                                        'text-blue-400'
                                    }`}>
                                        {err.type}
                                    </div>
                                    <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                        {err.message}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {results.valid && results.errors.length === 0 && (
                            <div className="p-12 text-center text-zinc-400 font-bold border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-[2.5rem]">
                                No issues detected. Clear scan.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
