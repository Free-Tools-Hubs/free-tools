'use client';

import { useState } from 'react';
import { Youtube, Copy, Check, Tags, Info, Search, List } from 'lucide-react';

export default function YoutubeMetadataTool() {
    const [topic, setTopic] = useState('');
    const [keywords, setKeywords] = useState('');
    const [results, setResults] = useState<{ title: string; description: string; tags: string[] } | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const generateMetadata = () => {
        if (!topic.trim()) return;
        setIsGenerating(true);

        // Simulation of analysis logic
        setTimeout(() => {
            const mainKeyword = keywords.split(',')[0] || topic;
            setResults({
                title: `${topic} | Ultimate Guide for ${mainKeyword} (2026)`,
                description: `Looking for details on ${topic}? This comprehensive video covers everything you need to know about ${mainKeyword}. \n\nWe deep dive into:\n- Best practices\n- Essential tips\n- Step-by-step walkthrough\n\nDon't forget to like and subscribe for more content! \n\n#${mainKeyword.replace(/\s+/g, '')} #YoutubeTips #NewVideo`,
                tags: [topic, mainKeyword, 'tutorial', 'guide', '2026', 'howto', 'explained']
            });
            setIsGenerating(false);
        }, 1200);
    };

    const handleCopy = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    return (
        <div className="p-6 md:p-10 flex flex-col gap-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-8">
                    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-zinc-900 border-4 border-zinc-100 dark:border-zinc-800 shadow-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <Search className="text-brand-primary" size={20} />
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500">Video Blueprint</h3>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Main Topic</label>
                                <input
                                    type="text"
                                    className="w-full h-16 bg-zinc-50 dark:bg-zinc-800 px-6 rounded-2xl font-bold outline-none focus:ring-4 ring-brand-primary/20 border-2 border-zinc-100 dark:border-zinc-700 transition-all"
                                    placeholder="e.g. How to grow a garden"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Target Keywords (comma separated)</label>
                                <textarea
                                    className="w-full h-32 bg-zinc-50 dark:bg-zinc-800 p-6 rounded-2xl font-bold outline-none focus:ring-4 ring-brand-primary/20 border-2 border-zinc-100 dark:border-zinc-700 transition-all resize-none"
                                    placeholder="e.g. gardening, plants, organic, eco-friendly"
                                    value={keywords}
                                    onChange={(e) => setKeywords(e.target.value)}
                                />
                            </div>

                            <button
                                onClick={generateMetadata}
                                disabled={!topic.trim() || isGenerating}
                                className="w-full py-6 rounded-2xl bg-zinc-950 text-white font-black uppercase tracking-[0.3em] hover:bg-[#FF0000] transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-30"
                            >
                                <Youtube size={20} />
                                {isGenerating ? 'Analyzing Trends...' : 'Optimize Content'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {results ? (
                        <div className="space-y-6 animate-in slide-in-from-right-10 duration-500">
                             <div className="p-8 bg-zinc-50 dark:bg-zinc-900 rounded-[2.5rem] border-2 border-zinc-100 dark:border-zinc-800 relative">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-4 block">SEO Optimized Title</label>
                                <h4 className="text-xl font-black mb-4 pr-12 line-clamp-2">{results.title}</h4>
                                <button
                                    onClick={() => handleCopy(results.title, 'title')}
                                    className="absolute top-8 right-8 p-3 rounded-xl bg-white dark:bg-zinc-800 shadow-sm hover:text-brand-primary transition-colors"
                                >
                                    {copiedField === 'title' ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                                </button>
                             </div>

                             <div className="p-8 bg-zinc-50 dark:bg-zinc-900 rounded-[2.5rem] border-2 border-zinc-100 dark:border-zinc-800 relative">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-4 block">Description Template</label>
                                <div className="text-sm font-medium pr-12 whitespace-pre-wrap text-zinc-600 dark:text-zinc-400">{results.description}</div>
                                <button
                                    onClick={() => handleCopy(results.description, 'desc')}
                                    className="absolute top-8 right-8 p-3 rounded-xl bg-white dark:bg-zinc-800 shadow-sm hover:text-brand-primary transition-colors"
                                >
                                    {copiedField === 'desc' ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                                </button>
                             </div>

                             <div className="p-8 bg-zinc-50 dark:bg-zinc-900 rounded-[2.5rem] border-2 border-zinc-100 dark:border-zinc-800 relative">
                                <div className="flex items-center gap-2 mb-4">
                                    <Tags size={16} className="text-zinc-400" />
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Generated Tags</label>
                                </div>
                                <div className="flex flex-wrap gap-2 pr-12">
                                    {results.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-white dark:bg-zinc-800 rounded-lg text-xs font-bold text-zinc-500 border border-zinc-100 dark:border-zinc-700">#{tag}</span>
                                    ))}
                                </div>
                                <button
                                    onClick={() => handleCopy(results.tags.join(', '), 'tags')}
                                    className="absolute top-8 right-8 p-3 rounded-xl bg-white dark:bg-zinc-800 shadow-sm hover:text-brand-primary transition-colors"
                                >
                                    {copiedField === 'tags' ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                                </button>
                             </div>
                        </div>
                    ) : (
                        <div className="h-full min-h-[500px] flex flex-col items-center justify-center p-12 bg-zinc-50 dark:bg-zinc-950 rounded-[3rem] border-4 border-dashed border-zinc-100 dark:border-zinc-900 gap-6 grayscale">
                            <div className="w-24 h-24 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400">
                                <List size={40} />
                            </div>
                            <div className="text-center space-y-2">
                                <h4 className="text-xl font-black tracking-tight text-zinc-500">Waitlist Generation</h4>
                                <p className="text-sm text-zinc-400 font-bold uppercase tracking-widest max-w-xs">Enter your topic to unlock SEO-optimized metadata.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="p-10 bg-[#FF0000] text-white rounded-[3.5rem] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group shadow-2xl shadow-red-500/20">
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 blur-[100px] rounded-full group-hover:bg-white/20 transition-all duration-1000" />
                <div className="z-10 text-center md:text-left">
                    <h4 className="text-3xl font-black mb-1 tracking-tighter">Content Hub Pro</h4>
                    <p className="font-bold opacity-80 uppercase text-[10px] tracking-[0.4em]">Advanced Ranking Algorithms</p>
                </div>
                <div className="flex gap-4 z-10">
                    <div className="px-8 py-4 bg-white/10 rounded-3xl backdrop-blur-xl border border-white/20 flex flex-col items-center">
                        <span className="text-2xl font-black">1.4s</span>
                        <span className="text-[10px] font-black uppercase opacity-60">Avg Speed</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
