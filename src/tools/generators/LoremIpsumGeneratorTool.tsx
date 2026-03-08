"use client";

import { useState, useCallback, useEffect } from 'react';
import { Pilcrow, Copy, RefreshCcw, Check, Download } from 'lucide-react';

export default function LoremIpsumGeneratorTool() {
    const [text, setText] = useState('');
    const [length, setLength] = useState(5);
    const [type, setType] = useState<'paragraphs' | 'words' | 'sentences' | 'lists'>('paragraphs');
    const [includeHtml, setIncludeHtml] = useState(false);
    const [copied, setCopied] = useState(false);

    const LOREM_WORDS = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "in", "reprehenderit", "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"];

    const generateSentence = () => {
        const wordCount = Math.floor(Math.random() * 10) + 6;
        const sentenceWords = [];
        for (let j = 0; j < wordCount; j++) {
            sentenceWords.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
        }
        let s = sentenceWords.join(' ');
        return s.charAt(0).toUpperCase() + s.slice(1) + '.';
    };

    const generateParagraph = () => {
        const sentenceCount = Math.floor(Math.random() * 4) + 4;
        const sentences = [];
        for (let j = 0; j < sentenceCount; j++) {
            sentences.push(generateSentence());
        }
        return sentences.join(' ');
    };

    const generateLorem = useCallback(() => {
        let result = '';

        if (type === 'paragraphs') {
            const paragraphs = [];
            for (let i = 0; i < length; i++) {
                let p = generateParagraph();
                if (i === 0) p = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' + p;
                if (includeHtml) p = `<p>${p}</p>`;
                paragraphs.push(p);
            }
            result = paragraphs.join('\n\n');
        } else if (type === 'sentences') {
            const sentences = [];
            for (let i = 0; i < length; i++) {
                sentences.push(generateSentence());
            }
            result = sentences.join(' ');
        } else if (type === 'words') {
            const words = [];
            for (let i = 0; i < length; i++) {
                if (i === 0) words.push('Lorem', 'ipsum', 'dolor', 'sit', 'amet');
                else words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
            }
            if (length > 0) {
                result = words.slice(0, length).join(' ') + '.';
            }
        } else if (type === 'lists') {
            let ul = includeHtml ? '<ul>\n' : '';
            for (let i = 0; i < length; i++) {
                const li = generateSentence();
                if (includeHtml) ul += `  <li>${li}</li>\n`;
                else ul += `- ${li}\n`;
            }
            if (includeHtml) ul += '</ul>';
            result = ul;
        }

        setText(result);
    }, [type, length, includeHtml]);

    useEffect(() => {
        generateLorem();
    }, [generateLorem]);

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

    return (
        <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-8 shadow-sm flex flex-col gap-8">
                <div className="flex items-center justify-between border-b border-border pb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <Pilcrow className="w-6 h-6 text-brand-primary" />
                        Lorem Ipsum Generator
                    </h2>
                    <button
                        onClick={generateLorem}
                        className="px-4 py-2 text-sm font-bold text-white bg-brand-primary hover:bg-brand-primary/90 rounded-lg shadow-sm transition-colors flex items-center gap-2"
                    >
                        <RefreshCcw className="w-4 h-4" /> Generate
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                    <div className="col-span-1 flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-foreground">Type</label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value as any)}
                                className="w-full bg-background border border-border rounded-lg p-3 text-sm font-bold outline-brand-primary cursor-pointer"
                            >
                                <option value="paragraphs">Paragraphs</option>
                                <option value="sentences">Sentences</option>
                                <option value="words">Words</option>
                                <option value="lists">Lists Items</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-foreground">Length: {length}</label>
                            <input
                                type="number"
                                min="1"
                                max="200"
                                value={length}
                                onChange={(e) => setLength(Number(e.target.value) || 1)}
                                className="w-full bg-background border border-border rounded-lg p-3 text-sm font-bold outline-brand-primary"
                            />
                        </div>

                        <div className="flex flex-col gap-3 p-4 bg-muted border border-border rounded-lg mt-2">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={includeHtml}
                                    onChange={(e) => setIncludeHtml(e.target.checked)}
                                    className="w-5 h-5 text-brand-primary rounded border-border focus:ring-brand-primary accent-brand-primary cursor-pointer"
                                />
                                <span className="text-sm font-semibold group-hover:text-brand-primary transition-colors">Wrap in HTML Tags</span>
                            </label>
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-3 flex flex-col gap-2 relative">
                        <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground pb-2 border-b border-border flex justify-between">
                            Generated Placeholder
                            <div className="flex gap-2">
                                <button onClick={handleCopy} className="flex gap-1 items-center hover:text-brand-primary transition-colors px-2 rounded-md" title="Copy text">
                                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />} Copy text
                                </button>
                            </div>
                        </label>
                        <div className="relative group min-h-[400px]">
                            <textarea
                                value={text}
                                readOnly
                                className="w-full h-full min-h-[400px] bg-background border border-border rounded-lg p-6 font-serif text-lg leading-relaxed resize-y focus:outline-brand-primary/50 text-foreground"
                                spellCheck={false}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
