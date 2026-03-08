"use client";

import { useState } from 'react';
import { Fingerprint, Copy, RefreshCcw, Check } from 'lucide-react';

export default function UuidGeneratorTool() {
    const [count, setCount] = useState<number>(5);
    const [uuids, setUuids] = useState<string[]>([]);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const generateUuids = () => {
        const newUuids = Array.from({ length: Math.min(count, 100) }, () => {
            // crypto.randomUUID is available in modern browsers
            if (typeof crypto !== 'undefined' && crypto.randomUUID) {
                return crypto.randomUUID();
            }
            // Fallback
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                const r = Math.random() * 16 | 0;
                const v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        });
        setUuids(newUuids);
        setCopiedIndex(null);
    };

    const copyToClipboard = async (text: string, index: number) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };

    const copyAll = async () => {
        try {
            await navigator.clipboard.writeText(uuids.join('\n'));
            setCopiedIndex(-1);
            setTimeout(() => setCopiedIndex(null), 2000);
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };

    // Generate initial UUIDs
    useState(() => {
        generateUuids();
    });

    return (
        <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-8 shadow-sm flex flex-col gap-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <Fingerprint className="w-6 h-6 text-brand-primary" />
                        UUID Generator v4
                    </h2>
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-semibold text-muted-foreground whitespace-nowrap">How many?</label>
                            <input
                                type="number"
                                min="1"
                                max="100"
                                value={count}
                                onChange={(e) => setCount(Number(e.target.value) || 1)}
                                className="w-20 p-2 border border-border rounded outline-brand-primary bg-background text-center font-bold"
                            />
                        </div>
                        <button
                            onClick={generateUuids}
                            className="px-4 py-2 text-sm font-bold text-white bg-brand-primary hover:bg-brand-primary/90 rounded-lg transition-colors flex items-center gap-2 shrink-0"
                        >
                            <RefreshCcw className="w-4 h-4" /> Generate
                        </button>
                    </div>
                </div>

                {uuids.length > 0 && (
                    <div className="flex flex-col gap-4 animate-in fade-in">
                        <div className="flex justify-between items-center px-2">
                            <span className="text-sm font-semibold text-muted-foreground">{uuids.length} UUID(s) generated</span>
                            <button
                                onClick={copyAll}
                                className="text-sm font-bold text-brand-primary hover:underline flex items-center gap-1"
                            >
                                {copiedIndex === -1 ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                {copiedIndex === -1 ? 'Copied All' : 'Copy All'}
                            </button>
                        </div>

                        <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto p-1 rounded-xl scrollbar-custom">
                            {uuids.map((uuid, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 hover:bg-muted border border-border rounded-lg group transition-colors">
                                    <span className="font-mono text-base tracking-wider text-foreground break-all pr-4 select-all">
                                        {uuid}
                                    </span>
                                    <button
                                        onClick={() => copyToClipboard(uuid, idx)}
                                        className="p-2 text-muted-foreground hover:text-brand-primary hover:bg-brand-primary/10 rounded-md transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 shrink-0"
                                        title="Copy UUID"
                                    >
                                        {copiedIndex === idx ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-brand-primary" />}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
