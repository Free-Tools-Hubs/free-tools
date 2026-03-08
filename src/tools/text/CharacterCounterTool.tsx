"use client";

import { useState, useEffect } from 'react';
import { Copy, Trash2, Hash, Twitter, MessageSquare, Linkedin, Search } from 'lucide-react';

export default function CharacterCounterTool() {
    const [text, setText] = useState('');
    const [charCount, setCharCount] = useState(0);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setCharCount(text.length);
    }, [text]);

    const handleCopy = async () => {
        if (!text) return;
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const platforms = [
        { name: 'Twitter (X) Post', limit: 280, icon: Twitter, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
        { name: 'LinkedIn Post', limit: 3000, icon: Linkedin, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { name: 'Instagram Caption', limit: 2200, icon: MessageSquare, color: 'text-pink-500', bg: 'bg-pink-500/10' },
        { name: 'Google Meta Description', limit: 160, icon: Search, color: 'text-green-500', bg: 'bg-green-500/10' },
        { name: 'Google Title Tag', limit: 60, icon: Search, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    ];

    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col xl:flex-row gap-6">
                <div className="flex-1 bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Hash className="w-5 h-5 text-brand-primary" />
                            Input Text
                        </h2>
                        <div className="flex gap-2">
                            <button
                                onClick={handleCopy}
                                disabled={!text}
                                className="px-3 py-1.5 text-sm font-bold text-card-foreground bg-muted hover:bg-muted/80 rounded-lg transition-colors flex items-center gap-1 disabled:opacity-50"
                            >
                                <Copy className="w-4 h-4" /> {copied ? 'Copied!' : 'Copy'}
                            </button>
                            <button
                                onClick={() => setText('')}
                                disabled={!text}
                                className="px-3 py-1.5 text-sm font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors flex items-center gap-1 disabled:opacity-50"
                            >
                                <Trash2 className="w-4 h-4" /> Clear
                            </button>
                        </div>
                    </div>

                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Type or paste your text here to count characters..."
                        className="w-full h-80 p-4 rounded-lg bg-background border border-border resize-y focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-base"
                    />

                    <div className="p-4 bg-brand-primary/10 border border-brand-primary/20 rounded-lg flex items-center justify-between">
                        <span className="font-semibold text-foreground">Total Characters:</span>
                        <span className="text-3xl font-black text-brand-primary">{charCount}</span>
                    </div>
                </div>

                <div className="w-full xl:w-80 shrink-0 flex flex-col gap-4">
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                        <h2 className="text-xl font-bold mb-4">Platform Limits</h2>
                        <div className="flex flex-col gap-3">
                            {platforms.map(platform => {
                                const isOver = charCount > platform.limit;
                                const percentage = Math.min((charCount / platform.limit) * 100, 100);

                                return (
                                    <div key={platform.name} className="flex flex-col gap-2 p-3 border border-border rounded-lg bg-background/50">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className={`p-1.5 rounded-md ${platform.bg} ${platform.color}`}>
                                                    <platform.icon className="w-4 h-4" />
                                                </div>
                                                <span className="text-sm font-semibold">{platform.name}</span>
                                            </div>
                                            <span className={`text-sm font-bold ${isOver ? 'text-red-500' : 'text-muted-foreground'}`}>
                                                {charCount} / {platform.limit}
                                            </span>
                                        </div>
                                        <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all duration-300 ${isOver ? 'bg-red-500' : platform.color.replace('text-', 'bg-')}`}
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                        {isOver && <p className="text-xs text-red-500 font-medium">Character limit exceeded by {charCount - platform.limit}</p>}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
