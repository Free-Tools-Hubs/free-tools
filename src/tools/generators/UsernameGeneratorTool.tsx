"use client";

import { useState } from 'react';
import { UserCircle, Copy, RefreshCcw, Check } from 'lucide-react';

const ADJECTIVES = ['Silent', 'Dark', 'Golden', 'Furious', 'Crystal', 'Shadow', 'Crimson', 'Azure', 'Neon', 'Cosmic', 'Lunar', 'Solar', 'Quantum', 'Mystic', 'Iron', 'Velvet', 'Frost', 'Blazing', 'Electric', 'Phantom'];
const NOUNS = ['Ninja', 'Dragon', 'Phoenix', 'Wolf', 'Tiger', 'Eagle', 'Knight', 'Wizard', 'Ghost', 'Rider', 'Hunter', 'Samurai', 'Viper', 'Raven', 'Panda', 'Shark', 'Falcon', 'Reaper', 'Titan', 'Cyborg'];

export default function UsernameGeneratorTool() {
    const [keyword, setKeyword] = useState('');
    const [usernames, setUsernames] = useState<string[]>([]);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    // Options
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [style, setStyle] = useState<'random' | 'keyword-first' | 'keyword-last'>('random');

    const generateUsernames = () => {
        const newNames: string[] = [];

        for (let i = 0; i < 10; i++) {
            let name = '';
            const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
            const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
            const num = includeNumbers ? Math.floor(Math.random() * 999) + 1 : '';

            if (keyword.trim()) {
                const cleanKey = keyword.trim().replace(/\s+/g, '');
                if (style === 'keyword-first') {
                    name = `${cleanKey}${noun}${num}`;
                } else if (style === 'keyword-last') {
                    name = `${adj}${cleanKey}${num}`;
                } else {
                    name = Math.random() > 0.5 ? `${cleanKey}${noun}${num}` : `${adj}${cleanKey}${num}`;
                }
            } else {
                name = `${adj}${noun}${num}`;
            }

            newNames.push(name);
        }

        setUsernames(newNames);
        setCopiedIndex(null);
    };

    const handleCopy = async (text: string, index: number) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };

    // Generate initial list on mount
    useState(() => {
        generateUsernames();
    });

    return (
        <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-8 shadow-sm flex flex-col gap-8">
                <div className="flex items-center justify-between border-b border-border pb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <UserCircle className="w-6 h-6 text-brand-primary" />
                        Username Generator
                    </h2>
                    <button
                        onClick={generateUsernames}
                        className="px-4 py-2 text-sm font-bold text-white bg-brand-primary hover:bg-brand-primary/90 rounded-lg transition-colors flex items-center gap-2"
                    >
                        <RefreshCcw className="w-4 h-4" /> Generate
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-foreground">
                                Base Keyword <span className="text-muted-foreground font-normal">(Optional)</span>
                            </label>
                            <input
                                type="text"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder="e.g. Alex, Player1"
                                className="w-full text-lg font-bold bg-background border border-border rounded-lg p-3 outline-brand-primary"
                            />
                        </div>

                        <div className="flex flex-col gap-4 bg-muted/30 p-4 rounded-xl border border-border">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={includeNumbers}
                                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                                    className="w-5 h-5 text-brand-primary rounded border-border focus:ring-brand-primary accent-brand-primary cursor-pointer"
                                />
                                <span className="text-sm font-semibold group-hover:text-brand-primary transition-colors">Include Numbers</span>
                            </label>

                            <div className="flex flex-col gap-2 mt-2">
                                <span className="text-sm font-semibold text-muted-foreground">Placement Style:</span>
                                <select
                                    value={style}
                                    onChange={(e) => setStyle(e.target.value as any)}
                                    className="w-full bg-background border border-border rounded-lg p-3 text-sm font-bold outline-brand-primary cursor-pointer"
                                >
                                    <option value="random">Randomize</option>
                                    <option value="keyword-first">Keyword First (Keyword+Noun)</option>
                                    <option value="keyword-last">Keyword Last (Adj+Keyword)</option>
                                </select>
                            </div>
                        </div>

                        <div className="p-4 border-2 border-dashed border-border rounded-xl text-center flex flex-col gap-2 opacity-70">
                            <UserCircle className="w-12 h-12 mx-auto text-muted-foreground opacity-50" />
                            <p className="text-sm font-semibold text-muted-foreground">
                                Generates unique handle combinations for gaming, social media, and more.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4">
                        <div className="flex justify-between items-center px-2">
                            <span className="text-sm font-black uppercase tracking-widest text-brand-primary">Generated Ideas</span>
                        </div>

                        <div className="flex flex-col gap-2">
                            {usernames.map((name, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-card border-2 border-border rounded-xl shadow-sm hover:border-brand-primary/50 group transition-all">
                                    <span className="font-bold text-lg text-foreground truncate max-w-[200px] select-all">
                                        {name}
                                    </span>
                                    <button
                                        onClick={() => handleCopy(name, idx)}
                                        className="px-4 py-2 bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white rounded-lg transition-colors font-bold text-sm shrink-0 flex items-center gap-2"
                                    >
                                        {copiedIndex === idx ? (
                                            <>
                                                <Check className="w-4 h-4" /> Copied
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-4 h-4" /> Copy
                                            </>
                                        )}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
