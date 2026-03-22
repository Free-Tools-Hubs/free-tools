'use client';

import { useState } from 'react';
import { Sparkles, Copy, Check, Zap, Target, MessageSquare, RefreshCw } from 'lucide-react';

type PromptTemplate = 'chatgpt' | 'midjourney' | 'coding' | 'marketing';

const TEMPLATES = {
    chatgpt: {
        prefix: "Act as a senior expert in the field. Your goal is to provide a comprehensive, actionable, and deeply analytical response.",
        suffix: "Format the output using clear headings, bullet points, and highlight key takeaways. Avoid generic advice."
    },
    midjourney: {
        prefix: "A hyper-realistic masterpiece, 8k resolution, cinematic lighting, volumetric fog, Unreal Engine 5 render style.",
        suffix: "--ar 16:9 --v 6.0 --stylize 250"
    },
    coding: {
        prefix: "You are a world-class software architect. Focus on clean code, performance, and scalability. Use TypeScript and follow best modular practices.",
        suffix: "Provide a complete implementation with unit test examples and performance analysis."
    },
    marketing: {
        prefix: "Persona: A high-conversion copywriter. Objective: Create a compelling narrative that addresses pain points and drives immediate action.",
        suffix: "Include a strong hook, three key benefits, and a powerful call to action. Tone: Professional yet approachable."
    }
};

export default function PromptOptimizerTool() {
    const [input, setInput] = useState('');
    const [activeTemplate, setActiveTemplate] = useState<PromptTemplate>('chatgpt');
    const [optimized, setOptimized] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleOptimize = () => {
        if (!input.trim()) return;
        setIsGenerating(true);
        
        // Simulating enhancement logic
        setTimeout(() => {
            const template = TEMPLATES[activeTemplate];
            const enhanced = `${template.prefix}\n\nCORE REQUEST: ${input}\n\nCONSTRAINTS: ${template.suffix}`;
            setOptimized(enhanced);
            setIsGenerating(false);
        }, 800);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(optimized);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="p-6 md:p-10 flex flex-col gap-8">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2 space-y-6">
                    <div className="flex items-center gap-3 px-2">
                        <MessageSquare className="text-brand-primary" size={20} />
                        <label className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500">Your Base Idea</label>
                    </div>
                    <textarea
                        className="w-full h-80 p-8 rounded-[2.5rem] border-4 border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:border-brand-primary outline-none transition-all resize-none font-medium text-lg placeholder:text-zinc-300"
                        placeholder="e.g. Write a script for a travel video about Japan..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    
                    <div className="grid grid-cols-2 gap-3">
                        {Object.keys(TEMPLATES).map((t) => (
                            <button
                                key={t}
                                onClick={() => setActiveTemplate(t as PromptTemplate)}
                                className={`px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTemplate === t ? 'bg-brand-primary text-white shadow-xl shadow-brand-primary/20 scale-105' : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-400 hover:text-zinc-600'}`}
                            >
                                {t === 'chatgpt' && <Zap size={14} className="inline mr-2" />}
                                {t === 'midjourney' && <Target size={14} className="inline mr-2" />}
                                {t}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleOptimize}
                        disabled={!input.trim() || isGenerating}
                        className="w-full py-6 rounded-[2rem] bg-zinc-950 text-white font-black uppercase tracking-[0.3em] hover:bg-brand-primary transition-all active:scale-95 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-3 shadow-2xl"
                    >
                        {isGenerating ? <RefreshCw className="animate-spin" /> : <Sparkles size={20} />}
                        {isGenerating ? 'Engineering Prompt...' : 'Optimize Prompt'}
                    </button>
                </div>

                <div className="w-full md:w-1/2 space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-3">
                            <Sparkles className="text-amber-500" size={20} />
                            <label className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500">AI Engineered Prompt</label>
                        </div>
                        {optimized && (
                            <button
                                onClick={handleCopy}
                                className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-brand-primary transition-colors"
                            >
                                {copied ? <Check className="text-emerald-500" size={20} /> : <Copy size={20} />}
                            </button>
                        )}
                    </div>

                    <div className={`w-full h-[32rem] p-10 rounded-[2.5rem] border-4 bg-zinc-50 dark:bg-zinc-900/50 font-mono text-sm leading-relaxed overflow-auto relative ${optimized ? 'border-brand-primary/20' : 'border-dashed border-zinc-200 dark:border-zinc-800'}`}>
                        {optimized ? (
                            <div className="whitespace-pre-wrap text-zinc-700 dark:text-zinc-300 animate-in fade-in duration-500">
                                {optimized}
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-zinc-300 dark:text-zinc-700 gap-4">
                                <Sparkles size={48} strokeWidth={1} className="opacity-20" />
                                <p className="font-bold text-center italic max-w-[200px]">Your optimized prompt will appear here after generation.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-r from-brand-primary/10 to-transparent p-10 rounded-[3rem] border-2 border-brand-primary/10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="z-10 text-center md:text-left">
                    <h4 className="text-2xl font-black mb-1 tracking-tight">Prompt Engineering 2.0</h4>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Optimized for GPT-4, Claude 3, and Stable Diffusion</p>
                </div>
                <div className="flex gap-4">
                     <span className="px-4 py-2 bg-white dark:bg-zinc-800 rounded-xl text-[10px] font-black uppercase shadow-sm">Token Efficient</span>
                     <span className="px-4 py-2 bg-white dark:bg-zinc-800 rounded-xl text-[10px] font-black uppercase shadow-sm">Persona Injected</span>
                </div>
            </div>
        </div>
    );
}
