'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CopyButtonProps {
    value: string;
    label?: string;
    className?: string;
    variant?: 'default' | 'ghost' | 'card';
}

export default function CopyButton({ value, label, className, variant = 'default' }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    if (variant === 'card') {
        return (
            <button
                onClick={handleCopy}
                className={cn(
                    "w-full flex items-center justify-between p-4 rounded-xl border transition-all active:scale-[0.98]",
                    copied 
                        ? "bg-green-500/10 border-green-500/50 text-green-600 dark:text-green-400" 
                        : "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-brand-primary/50 text-zinc-900 dark:text-zinc-100",
                    className
                )}
            >
                <div className="flex flex-col items-start overflow-hidden">
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-1 font-bold">{label}</span>
                    <code className="text-sm font-mono truncate w-full block">{value}</code>
                </div>
                <div className="flex-shrink-0 ml-4">
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                </div>
            </button>
        );
    }

    return (
        <button
            onClick={handleCopy}
            className={cn(
                "inline-flex items-center gap-2 transition-all",
                variant === 'ghost' ? "p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800" : "bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:scale-105 active:scale-95",
                className
            )}
        >
            {label && <span>{label}</span>}
            {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
    );
}
