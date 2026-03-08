"use client";

import { useState, useCallback, useEffect } from 'react';
import { Shuffle, Copy, RefreshCcw, Check, Download } from 'lucide-react';

export default function RandomTextGeneratorTool() {
    const [text, setText] = useState('');
    const [length, setLength] = useState(100);
    const [type, setType] = useState<'chars' | 'words' | 'sentences'>('chars');

    // Char options
    const [incUpper, setIncUpper] = useState(true);
    const [incLower, setIncLower] = useState(true);
    const [incNums, setIncNums] = useState(true);
    const [incSyms, setIncSyms] = useState(false);

    const [copied, setCopied] = useState(false);

    const wordsList = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'in', 'voluptate', 'velit', 'esse', 'cillum', 'dolore', 'eu', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'in', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'];

    const generateText = useCallback(() => {
        let result = '';

        if (type === 'chars') {
            let charset = '';
            if (incUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            if (incLower) charset += 'abcdefghijklmnopqrstuvwxyz';
            if (incNums) charset += '0123456789';
            if (incSyms) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

            if (!charset) {
                setText('');
                return;
            }

            for (let i = 0; i < length; i++) {
                result += charset.charAt(Math.floor(Math.random() * charset.length));
            }
        } else if (type === 'words') {
            const words = [];
            for (let i = 0; i < length; i++) {
                words.push(wordsList[Math.floor(Math.random() * wordsList.length)]);
            }
            result = words.join(' ');
        } else if (type === 'sentences') {
            const sentences = [];
            for (let i = 0; i < length; i++) {
                const wordCount = Math.floor(Math.random() * 8) + 5;
                const sentenceWords = [];
                for (let j = 0; j < wordCount; j++) {
                    sentenceWords.push(wordsList[Math.floor(Math.random() * wordsList.length)]);
                }
                let s = sentenceWords.join(' ');
                s = s.charAt(0).toUpperCase() + s.slice(1) + '.';
                sentences.push(s);
            }
            result = sentences.join(' ');
        }

        setText(result);
    }, [type, length, incUpper, incLower, incNums, incSyms]);

    useEffect(() => {
        generateText();
    }, [generateText]);

    const handleCopy = async () => {
        if (!text) return;
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };

    const handleDownload = () => {
        if (!text) return;
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `random_text.txt`;
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-8 shadow-sm flex flex-col gap-8">
                <div className="flex items-center justify-between border-b border-border pb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <Shuffle className="w-6 h-6 text-brand-primary" />
                        Random Text Generator
                    </h2>
                    <button
                        onClick={generateText}
                        className="px-4 py-2 text-sm font-bold text-white bg-brand-primary hover:bg-brand-primary/90 rounded-lg shadow-sm transition-colors flex items-center gap-2"
                    >
                        <RefreshCcw className="w-4 h-4" /> Generate
                    </button>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">

                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-foreground">Type</label>
                                <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value as any)}
                                    className="bg-background border border-border rounded-lg p-3 text-sm font-bold outline-brand-primary cursor-pointer w-full"
                                >
                                    <option value="chars">Characters</option>
                                    <option value="words">Words</option>
                                    <option value="sentences">Sentences</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-foreground">Count / Length: {length}</label>
                                <input
                                    type="number"
                                    min="1"
                                    max={type === 'chars' ? 10000 : 1000}
                                    value={length}
                                    onChange={(e) => setLength(Number(e.target.value) || 1)}
                                    className="bg-background border border-border rounded-lg p-3 text-sm font-bold outline-brand-primary"
                                />
                                <span className="text-xs text-muted-foreground w-full">
                                    Max {type === 'chars' ? '10,000' : '1,000'} limit.
                                </span>
                            </div>

                            {type === 'chars' && (
                                <div className="flex flex-col gap-3 p-4 bg-muted border border-border rounded-lg mt-2">
                                    <label className="font-semibold text-sm">Character Sets</label>
                                    <label className="flex flex-row items-center gap-3">
                                        <input type="checkbox" checked={incUpper} onChange={(e) => setIncUpper(e.target.checked)} className="accent-brand-primary" /> Upper (A-Z)
                                    </label>
                                    <label className="flex flex-row items-center gap-3">
                                        <input type="checkbox" checked={incLower} onChange={(e) => setIncLower(e.target.checked)} className="accent-brand-primary" /> Lower (a-z)
                                    </label>
                                    <label className="flex flex-row items-center gap-3">
                                        <input type="checkbox" checked={incNums} onChange={(e) => setIncNums(e.target.checked)} className="accent-brand-primary" /> Digits (0-9)
                                    </label>
                                    <label className="flex flex-row items-center gap-3">
                                        <input type="checkbox" checked={incSyms} onChange={(e) => setIncSyms(e.target.checked)} className="accent-brand-primary" /> Symbols
                                    </label>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-2 relative">
                            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground pb-2 border-b border-border flex justify-between">
                                Output Preview
                                <div className="flex gap-2">
                                    <button onClick={handleDownload} className="flex gap-1 items-center hover:text-brand-primary transition-colors text-xs" title="Download TXT">
                                        <Download className="w-4 h-4" /> Download
                                    </button>
                                    <button onClick={handleCopy} className="flex gap-1 items-center hover:text-brand-primary transition-colors text-xs" title="Copy text">
                                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />} Copy
                                    </button>
                                </div>
                            </label>
                            <textarea
                                value={text}
                                readOnly
                                className="w-full h-full min-h-[300px] bg-background border border-border rounded-lg p-4 font-mono text-sm leading-relaxed resize-y focus:outline-none"
                                spellCheck={false}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
