'use client';

import { useState, useEffect } from 'react';
import { Search, Loader2, Link as LinkIcon, FileText, Check, Copy, AlertCircle, Send, Globe, Key, FileJson, Terminal } from 'lucide-react';

export default function IndexNowGenerator() {
    const [host, setHost] = useState('');
    const [key, setKey] = useState('');
    const [keyLocation, setKeyLocation] = useState('');
    const [urls, setUrls] = useState('');
    const [output, setOutput] = useState('');
    const [curlOutput, setCurlOutput] = useState('');
    const [winCurlOutput, setWinCurlOutput] = useState('');
    const [shell, setShell] = useState<'bash' | 'cmd'>('bash');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState<string | null>(null);

    const generatePayload = () => {
        setLoading(true);
        setTimeout(() => {
            const urlList = urls.split('\n')
                .map(u => u.trim())
                .filter(u => u.length > 0 && (u.startsWith('http://') || u.startsWith('https://')));

            const payload = {
                host: host.trim() || 'www.example.org',
                key: key.trim() || 'your-key-here',
                keyLocation: keyLocation.trim() || `https://${host.trim() || 'www.example.org'}/${key.trim() || 'your-key'}.txt`,
                urlList: urlList.length > 0 ? urlList : ['https://www.example.org/url1']
            };

            const json = JSON.stringify(payload, null, 2);
            setOutput(json);

            // Generate Bash Curl command
            const bashCurl = `curl -i -X POST "https://api.indexnow.org/indexnow" \\
-H "Content-Type: application/json; charset=utf-8" \\
-d '${JSON.stringify(payload)}'`;

            // Generate Windows CMD Curl command
            const winCurl = `curl -i -X POST "https://api.indexnow.org/indexnow" ^
-H "Content-Type: application/json; charset=utf-8" ^
-d @indexnow_payload.json`;

            setCurlOutput(bashCurl);
            setWinCurlOutput(winCurl);
            setLoading(false);
        }, 300);
    };

    const handleDownloadJson = () => {
        if (!output) return;
        const blob = new Blob([output], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'indexnow_payload.json';
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleCopy = (text: string, type: string) => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    const extractFromSitemap = (xmlText: string) => {
        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, 'application/xml');
            const locs = xmlDoc.querySelectorAll('loc');
            const extracted = Array.from(locs).map(loc => loc.textContent || '').join('\n');
            setUrls(extracted);

            // Auto-detect host if possible
            if (extracted.length > 0) {
                try {
                    const firstUrl = new URL(extracted.split('\n')[0]);
                    if (!host) setHost(firstUrl.hostname);
                } catch (e) { }
            }
        } catch (e) {
            alert('Failed to parse sitemap XML. Please paste valid XML content.');
        }
    };

    // Auto-clean host domain
    useEffect(() => {
        if (host.includes('://')) {
            try {
                const url = new URL(host);
                setHost(url.hostname);
            } catch (e) { }
        } else if (host.includes('/')) {
            setHost(host.split('/')[0]);
        }
    }, [host]);

    return (
        <div className="flex flex-col gap-8 p-4 md:p-8">
            <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 border-4 border-zinc-100 dark:border-zinc-800 shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none transform translate-x-12 -translate-y-12">
                    <Send size={240} className="text-brand-primary rotate-45" />
                </div>

                <div className="flex flex-col gap-8 relative z-10">
                    <div className="flex items-center gap-4 text-brand-primary">
                        <div className="p-3 bg-brand-primary/10 rounded-2xl">
                            <Send size={28} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black tracking-tight uppercase tracking-[0.05em]">IndexNow Payload Builder</h2>
                            <p className="text-sm text-zinc-500 font-medium">Generate instant indexing requests for Bing and Yandex APIs.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2 mb-2 ml-2">
                                <Globe size={14} className="text-brand-primary" />
                                Host Domain
                            </label>
                            <input
                                type="text"
                                value={host}
                                onChange={(e) => setHost(e.target.value)}
                                placeholder="www.example.org"
                                className="w-full h-14 px-5 bg-zinc-50 dark:bg-zinc-800 border-2 border-zinc-100 dark:border-zinc-700 rounded-2xl outline-none focus:ring-4 ring-brand-primary/10 transition-all font-medium italic"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2 mb-2 ml-2">
                                <Key size={14} className="text-brand-primary" />
                                API Key (Host Key)
                            </label>
                            <input
                                type="text"
                                value={key}
                                onChange={(e) => setKey(e.target.value)}
                                placeholder="59f9c6d8f693..."
                                className="w-full h-14 px-5 bg-zinc-50 dark:bg-zinc-800 border-2 border-zinc-100 dark:border-zinc-700 rounded-2xl outline-none focus:ring-4 ring-brand-primary/10 transition-all font-mono text-sm leading-none"
                            />
                        </div>
                        <div className="space-y-2 lg:col-span-1 md:col-span-2">
                            <label className="text-xs font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2 mb-2 ml-2">
                                <FileText size={14} className="text-brand-primary" />
                                Key Location (Optional)
                            </label>
                            <input
                                type="text"
                                value={keyLocation}
                                onChange={(e) => setKeyLocation(e.target.value)}
                                placeholder="https://www.example.org/key.txt"
                                className="w-full h-14 px-5 bg-zinc-50 dark:bg-zinc-800 border-2 border-zinc-100 dark:border-zinc-700 rounded-2xl outline-none focus:ring-4 ring-brand-primary/10 transition-all font-medium overflow-hidden"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between px-2">
                            <label className="text-xs font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                                <LinkIcon size={14} className="text-brand-primary" />
                                URL List (One per line)
                            </label>
                            <button
                                onClick={() => {
                                    const xml = prompt('Paste your Sitemap XML to extract URLs:');
                                    if (xml) extractFromSitemap(xml);
                                }}
                                className="text-[10px] bg-brand-primary/5 text-brand-primary px-3 py-1 rounded-full font-black border border-brand-primary/10 hover:bg-brand-primary hover:text-white transition-all uppercase"
                            >
                                Import from Sitemap
                            </button>
                        </div>
                        <textarea
                            value={urls}
                            onChange={(e) => setUrls(e.target.value)}
                            placeholder="Enter the URLs you want to index (must belong to the host)..."
                            className="w-full h-48 p-6 bg-zinc-50 dark:bg-zinc-800 border-2 border-zinc-100 dark:border-zinc-700 rounded-3xl outline-none focus:ring-4 ring-brand-primary/10 font-mono text-sm shadow-inner transition-all"
                        />
                    </div>

                    <button
                        onClick={generatePayload}
                        disabled={loading}
                        className="h-16 bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-2xl font-black text-lg flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-xl disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <FileJson size={24} />}
                        Build IndexNow Payload
                    </button>
                </div>
            </div>

            {output && (
                <div className="grid grid-cols-1 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border-4 border-zinc-100 dark:border-zinc-800 shadow-2xl overflow-hidden">
                        <div className="p-6 bg-brand-primary/5 border-b-2 border-zinc-50 dark:border-zinc-800 flex items-center justify-between">
                            <h3 className="font-black text-sm flex items-center gap-2 uppercase tracking-widest">
                                <FileJson size={18} className="text-brand-primary" />
                                JSON Payload
                            </h3>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleDownloadJson}
                                    className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-xl text-xs font-bold hover:scale-105 active:scale-95 transition-all shadow-lg"
                                >
                                    <FileJson size={14} />
                                    Download JSON
                                </button>
                                <button
                                    onClick={() => handleCopy(output, 'json')}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${copied === 'json' ? 'bg-emerald-500 text-white' : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                                        }`}
                                >
                                    {copied === 'json' ? <Check size={14} /> : <Copy size={14} />}
                                    {copied === 'json' ? 'Copied' : 'Copy'}
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <pre className="bg-zinc-50 dark:bg-zinc-950 p-6 rounded-2xl text-[11px] font-mono leading-relaxed overflow-x-auto h-80 shadow-inner border border-zinc-100 dark:border-zinc-800">
                                {output}
                            </pre>
                            <p className="mt-4 text-[10px] text-zinc-500 font-bold uppercase tracking-widest text-center">
                                Save this as <strong>indexnow_payload.json</strong> to use with the Win CMD command.
                            </p>
                        </div>
                    </div>

                    <div className="bg-zinc-950 rounded-[2.5rem] border-4 border-zinc-800 shadow-2xl overflow-hidden">
                        <div className="p-6 bg-white/5 border-b-2 border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <h3 className="font-black text-sm flex items-center gap-2 text-white uppercase tracking-widest whitespace-nowrap">
                                    <Terminal size={18} className="text-brand-primary" />
                                    cURL Command
                                </h3>
                                <div className="flex bg-white/10 p-1 rounded-xl shrink-0">
                                    <button
                                        onClick={() => setShell('bash')}
                                        className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase transition-all ${shell === 'bash' ? 'bg-white text-zinc-950 shadow-lg' : 'text-white/40 hover:text-white'}`}
                                    >
                                        Bash
                                    </button>
                                    <button
                                        onClick={() => setShell('cmd')}
                                        className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase transition-all ${shell === 'cmd' ? 'bg-white text-zinc-950 shadow-lg' : 'text-white/40 hover:text-white'}`}
                                    >
                                        Win CMD
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={() => handleCopy(shell === 'bash' ? curlOutput : winCurlOutput, 'curl')}
                                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${copied === 'curl' ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white hover:bg-brand-primary'
                                    }`}
                            >
                                {copied === 'curl' ? <Check size={14} /> : <Copy size={14} />}
                                {copied === 'curl' ? 'Copied' : 'Copy Command'}
                            </button>
                        </div>
                        <div className="p-6">
                            <pre className="text-[11px] font-mono leading-relaxed text-zinc-300 p-6 bg-black/40 rounded-2xl h-80 overflow-x-auto shadow-inner whitespace-pre-wrap break-all">
                                {shell === 'bash' ? curlOutput : winCurlOutput}
                            </pre>
                            <p className="mt-4 text-[10px] text-zinc-500 font-bold uppercase tracking-widest text-center px-4">
                                {shell === 'bash' ? 'Direct command for Linux, macOS, and Git Bash.' : 'Windows CMD: Download JSON first and run this command in the same folder.'}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border-2 border-blue-100 dark:border-blue-900/20 flex gap-6 items-start">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl shrink-0">
                    <AlertCircle size={28} />
                </div>
                <div>
                    <h4 className="text-xl font-black mb-2 tracking-tight">How to use IndexNow?</h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                        IndexNow is a simple way for websites to inform search engines in real-time about URL additions, updates, and deletions.
                        Once search engines receive the notification, they quickly reflect the changes in their search results.
                    </p>
                    <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-2">
                        <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                            Generate a <strong>Key</strong> (long random string).
                        </li>
                        <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                            Host the key at your domain: <strong>example.org/your-key.txt</strong>.
                        </li>
                        <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                            The file content must match the key exactly.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
