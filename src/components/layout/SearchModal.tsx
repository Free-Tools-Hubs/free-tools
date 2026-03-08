'use client';

import { useState, useEffect } from 'react';
import { Search as SearchIcon, X, ArrowRight, Zap } from 'lucide-react';
import { tools } from '@/data/tools';
import Link from 'next/link';

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState(tools);

    useEffect(() => {
        if (!query) {
            setResults(tools.slice(0, 5));
            return;
        }

        const lowerQuery = query.toLowerCase();
        const filtered = tools.filter(
            (t) =>
                t.title.toLowerCase().includes(lowerQuery) ||
                t.description.toLowerCase().includes(lowerQuery) ||
                t.keywords.some((k) => k.toLowerCase().includes(lowerQuery))
        );
        setResults(filtered);
    }, [query]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-2xl bg-background rounded-3xl shadow-2xl overflow-hidden border animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b flex items-center gap-4">
                    <SearchIcon size={24} className="text-brand-primary" />
                    <input
                        autoFocus
                        className="flex-grow bg-transparent text-xl font-medium outline-none placeholder:text-muted-foreground"
                        placeholder="What do you want to do? (e.g. compress image)"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button onClick={onClose} className="p-2 hover:bg-surface-100 rounded-xl transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="max-h-[60vh] overflow-y-auto p-4">
                    <div className="mb-4 px-2">
                        <span className="text-[10px] uppercase tracking-widest font-black text-muted-foreground">Results</span>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                        {results.length > 0 ? (
                            results.map((tool) => (
                                <Link
                                    key={tool.id}
                                    href={`/tools/${tool.category}/${tool.slug}`}
                                    onClick={onClose}
                                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-surface-100 dark:hover:bg-surface-900 border border-transparent hover:border-brand-primary/20 transition-all group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center group-hover:bg-brand-primary/10 group-hover:text-brand-primary transition-colors">
                                        <Zap size={20} />
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="font-bold text-sm mb-0.5">{tool.title}</h4>
                                        <p className="text-xs text-muted-foreground line-clamp-1">{tool.description}</p>
                                    </div>
                                    <ArrowRight size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            ))
                        ) : (
                            <div className="py-12 text-center">
                                <p className="text-muted-foreground">No tools found for "{query}"</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-4 bg-surface-50 dark:bg-surface-950 border-t flex justify-between items-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    <span>{results.length} Tools found</span>
                    <div className="flex gap-4">
                        <span>↑↓ Navigate</span>
                        <span>↵ Select</span>
                        <span>ESC Close</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
