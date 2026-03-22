'use client';

import { useState } from 'react';
import { User, Copy, Check, Instagram, Twitter, Linkedin, Briefcase, Globe } from 'lucide-react';

type Platform = 'insta' | 'twitter' | 'linkedin';

export default function SocialBioGeneratorTool() {
    const [name, setName] = useState('');
    const [keywords, setKeywords] = useState('');
    const [platform, setPlatform] = useState<Platform>('insta');
    const [results, setResults] = useState<string[]>([]);
    const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

    const generateBios = () => {
        if (!keywords.trim()) return;
        
        const kw = keywords.split(',').map(k => k.trim());
        const bios = {
            insta: [
                `✨ ${name || 'Creator'} | ${kw[0] || 'Visionary'}\n🚀 ${kw[1] || 'Digital Nomad'}\n📍 Based in Everywhere\n👇 Join the journey`,
                `Living life one ${kw[0] || 'pixel'} at a time.\nFocused on ${kw[1] || 'Impact'}.\n📩 DM for Collabs`,
            ],
            twitter: [
                `${name || 'User'} • ${kw[0] || 'Hustler'} • ${kw[1] || 'Lover of Life'} • Mostly tweeting about ${kw[2] || 'Tech'}`,
                `Building ${kw[0] || 'vibrant things'} in public. 🚢 | Passionate about ${kw[1] || 'Community'} | DMs open`,
            ],
            linkedin: [
                `Experienced ${kw[0] || 'Professional'} specializing in ${kw[1] || 'Strategy'} & ${kw[2] || 'Innovation'}. Helper of businesses to grow through ${kw[3] || 'modern solutions'}.`,
                `Passionate ${kw[0] || 'Leader'} | ${kw[1] || 'Operations'} | Driving growth through data-driven decisions and people-first culture.`
            ]
        };

        setResults(bios[platform]);
    };

    const handleCopy = (text: string, idx: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIdx(idx);
        setTimeout(() => setCopiedIdx(null), 2000);
    };

    return (
        <div className="p-6 md:p-10 flex flex-col gap-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-8">
                    <div className="p-10 rounded-[3rem] bg-zinc-950 text-white shadow-2xl relative overflow-hidden group">
                         <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-primary/20 blur-[80px] rounded-full group-hover:bg-brand-primary/40 transition-all duration-700" />
                         
                         <h3 className="text-sm font-black uppercase tracking-[0.4em] mb-10 flex items-center gap-3">
                            <User size={16} className="text-brand-primary" />
                            Identity Profile
                         </h3>

                         <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Display Name</label>
                                <input
                                    type="text"
                                    className="w-full h-16 bg-white/5 border-2 border-white/10 rounded-2xl px-6 font-bold outline-none focus:border-brand-primary transition-all text-white"
                                    placeholder="Enter your name..."
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Keywords & Traits</label>
                                <textarea
                                    className="w-full h-40 bg-white/5 border-2 border-white/10 rounded-3xl p-6 font-bold outline-none focus:border-brand-primary transition-all text-white resize-none"
                                    placeholder="e.g. Designer, Coffee Lover, Tech Enthusiast"
                                    value={keywords}
                                    onChange={(e) => setKeywords(e.target.value)}
                                />
                            </div>

                            <div className="flex gap-4">
                                {(['insta', 'twitter', 'linkedin'] as Platform[]).map(p => (
                                    <button
                                        key={p}
                                        onClick={() => setPlatform(p)}
                                        className={`flex-1 h-16 rounded-2xl border-2 transition-all flex items-center justify-center ${platform === p ? 'bg-brand-primary border-brand-primary text-white scale-105 shadow-lg' : 'border-white/10 text-zinc-500 hover:text-white hover:border-white/20'}`}
                                    >
                                        {p === 'insta' && <Instagram size={20} />}
                                        {p === 'twitter' && <Twitter size={20} />}
                                        {p === 'linkedin' && <Linkedin size={20} />}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={generateBios}
                                className="w-full py-6 rounded-[2rem] bg-white text-zinc-950 font-black uppercase tracking-[0.4em] hover:bg-brand-primary hover:text-white transition-all active:scale-95 shadow-xl"
                            >
                                Generate Options
                            </button>
                         </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {results.length > 0 ? (
                        <div className="space-y-6 h-full">
                            {results.map((bio, i) => (
                                <div key={i} className="group p-8 rounded-[2.5rem] bg-white dark:bg-zinc-900 border-4 border-zinc-100 dark:border-zinc-800 hover:border-brand-primary/30 transition-all relative">
                                    <div className="flex items-center gap-3 mb-6">
                                         <div className="px-3 py-1 bg-zinc-50 dark:bg-zinc-800 rounded-full text-[8px] font-black uppercase tracking-widest text-zinc-400">Variant {i+1}</div>
                                    </div>
                                    <p className="text-lg font-bold pr-16 whitespace-pre-wrap leading-relaxed italic text-zinc-600 dark:text-zinc-300">"{bio}"</p>
                                    <button
                                        onClick={() => handleCopy(bio, i)}
                                        className="absolute top-8 right-8 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800 text-zinc-500 hover:text-brand-primary transition-colors hover:scale-110 active:scale-90"
                                    >
                                        {copiedIdx === i ? <Check size={20} className="text-emerald-500" /> : <Copy size={20} />}
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="h-full min-h-[500px] flex flex-col items-center justify-center p-12 bg-zinc-50 dark:bg-zinc-950 rounded-[3rem] border-4 border-dashed border-zinc-100 dark:border-zinc-900 gap-8 grayscale">
                            <div className="relative">
                                <User size={80} className="text-brand-primary opacity-20" />
                                <div className="absolute -bottom-2 -right-2 p-3 bg-white dark:bg-zinc-800 rounded-2xl shadow-xl">
                                    <Briefcase size={20} className="text-zinc-400" />
                                </div>
                            </div>
                            <div className="text-center space-y-3">
                                <h4 className="text-2xl font-black tracking-tight text-zinc-500">Bio Design Hub</h4>
                                <p className="text-xs text-zinc-400 font-bold uppercase tracking-[0.2em] max-w-sm">Craft the perfect introduction. Your digital presence matters.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 p-8 flex flex-wrap gap-8 items-center justify-center">
                <div className="flex items-center gap-3">
                    <Globe size={18} className="text-brand-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Universal Formats</span>
                </div>
                <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800" />
                <div className="flex items-center gap-3">
                    <Linkedin size={18} className="text-brand-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Pro-Optimized</span>
                </div>
                <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800" />
                <div className="flex items-center gap-3">
                    <Instagram size={18} className="text-brand-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Emoji Injected</span>
                </div>
            </div>
        </div>
    );
}
