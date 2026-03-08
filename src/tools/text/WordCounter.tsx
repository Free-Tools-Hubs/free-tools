'use client';

import { useState, useEffect } from 'react';
import { Copy, Trash2, FileText, Hash, AlignLeft, Type } from 'lucide-react';

export default function WordCounter() {
    const [text, setText] = useState('');
    const [stats, setStats] = useState({
        words: 0,
        characters: 0,
        charactersNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0,
    });

    useEffect(() => {
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const characters = text.length;
        const charactersNoSpaces = text.replace(/\s/g, '').length;
        const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
        const paragraphs = text.trim() ? text.split(/\n+/).filter(Boolean).length : 0;
        const readingTime = Math.ceil(words / 200);

        setStats({
            words,
            characters,
            charactersNoSpaces,
            sentences,
            paragraphs,
            readingTime,
        });
    }, [text]);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
    };

    const handleClear = () => {
        setText('');
    };

    return (
        <div className="p-6 md:p-10 flex flex-col gap-8 h-full">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                    { label: 'Words', value: stats.words, icon: FileText, color: 'text-indigo-500' },
                    { label: 'Chars', value: stats.characters, icon: Hash, color: 'text-cyan-500' },
                    { label: 'No Spaces', value: stats.charactersNoSpaces, icon: AlignLeft, color: 'text-emerald-500' },
                    { label: 'Sentences', value: stats.sentences, icon: Type, color: 'text-orange-500' },
                    { label: 'Paragraphs', value: stats.paragraphs, icon: AlignLeft, color: 'text-rose-500' },
                    { label: 'Read Time', value: `${stats.readingTime}m`, icon: FileText, color: 'text-amber-500' },
                ].map((item, i) => (
                    <div key={i} className="bg-surface-50 dark:bg-surface-900 border rounded-2xl p-4 flex flex-col items-center justify-center text-center group hover:border-brand-primary transition-all">
                        <item.icon size={20} className={item.color + " mb-2"} />
                        <span className="text-2xl font-black italic">{item.value}</span>
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">{item.label}</span>
                    </div>
                ))}
            </div>

            <div className="relative flex-grow min-h-[300px]">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste your text here..."
                    className="w-full h-full min-h-[300px] p-6 rounded-2xl border-2 border-surface-200 dark:border-surface-800 bg-background text-lg leading-relaxed focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 transition-all outline-none resize-none font-medium"
                />

                <div className="absolute top-4 right-4 flex gap-2">
                    <button
                        onClick={handleCopy}
                        className="w-10 h-10 rounded-xl bg-background border shadow-sm flex items-center justify-center hover:text-brand-primary transition-all active:scale-95"
                        title="Copy Text"
                    >
                        <Copy size={18} />
                    </button>
                    <button
                        onClick={handleClear}
                        className="w-10 h-10 rounded-xl bg-background border shadow-sm flex items-center justify-center hover:text-rose-500 transition-all active:scale-95"
                        title="Clear Text"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            <div className="flex justify-between items-center text-xs text-muted-foreground font-medium px-2">
                <span>Processing locally in your browser</span>
                <span>Word Counter v1.0</span>
            </div>
        </div>
    );
}
