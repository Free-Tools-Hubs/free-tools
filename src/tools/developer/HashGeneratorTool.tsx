'use client';

import { useState } from 'react';
import { Copy, Trash2, Check, ShieldCheck, Zap, Lock } from 'lucide-react';

export default function HashGeneratorTool() {
    const [input, setInput] = useState('');
    const [hashes, setHashes] = useState({
        sha256: '',
        sha512: '',
        sha1: ''
    });
    const [copied, setCopied] = useState<string | null>(null);

    const generateHashes = async (text: string) => {
        setInput(text);
        if (!text) {
            setHashes({ sha256: '', sha512: '', sha1: '' });
            return;
        }

        const encoder = new TextEncoder();
        const data = encoder.encode(text);

        const getHash = async (algo: 'SHA-256' | 'SHA-512' | 'SHA-1') => {
            const hashBuffer = await crypto.subtle.digest(algo, data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        };

        const [sha256, sha512, sha1] = await Promise.all([
            getHash('SHA-256'),
            getHash('SHA-512'),
            getHash('SHA-1')
        ]);

        setHashes({ sha256, sha512, sha1 });
    };

    const handleCopy = (val: string, label: string) => {
        navigator.clipboard.writeText(val);
        setCopied(label);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="p-6 md:p-10 flex flex-col gap-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <label className="text-sm font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                            <Zap size={16} className="text-amber-500" />
                            Input String
                        </label>
                        {input && (
                            <button onClick={() => generateHashes('')} className="text-zinc-400 hover:text-rose-500 transition-colors">
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                    <textarea
                        className="w-full h-80 p-6 rounded-3xl border-2 border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 focus:border-brand-primary outline-none transition-all resize-none font-mono text-sm leading-relaxed"
                        placeholder="Enter text to hash..."
                        value={input}
                        onChange={(e) => generateHashes(e.target.value)}
                    />
                </div>

                <div className="space-y-6">
                    <label className="text-sm font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2 px-2">
                        <ShieldCheck size={16} className="text-emerald-500" />
                        Generated Hashes
                    </label>
                    <div className="space-y-4">
                        {[
                            { name: 'SHA-256', val: hashes.sha256, icon: <Lock size={12} /> },
                            { name: 'SHA-512', val: hashes.sha512, icon: <ShieldCheck size={12} /> },
                            { name: 'SHA-1', val: hashes.sha1, icon: <Zap size={12} /> }
                        ].map(({ name, val, icon }) => (
                            <div key={name} className="group relative">
                                <div className="flex items-center justify-between mb-2 px-1">
                                    <span className="text-[10px] font-black uppercase tracking-tighter text-zinc-400 flex items-center gap-1">
                                        {icon} {name}
                                    </span>
                                    {val && (
                                        <button
                                            onClick={() => handleCopy(val, name)}
                                            className="text-[10px] font-bold text-brand-primary hover:underline transition-all"
                                        >
                                            {copied === name ? 'Copied!' : 'Copy'}
                                        </button>
                                    )}
                                </div>
                                <div className="w-full p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 font-mono text-[10px] break-all text-zinc-600 dark:text-zinc-400 min-h-[50px] flex items-center group-hover:border-brand-primary/30 transition-colors">
                                    {val || <span className="text-zinc-300 dark:text-zinc-700 italic">Waiting for input...</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
             <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                <div className="flex gap-4">
                    <span>Engine: Web Crypto API</span>
                    <span className="hidden sm:inline">•</span>
                    <span>Security: Client-side Only</span>
                </div>
                 <div className="flex items-center gap-2 text-brand-primary">
                    <ShieldCheck size={12} />
                    Secure Local Hashing
                </div>
            </div>
        </div>
    );
}
