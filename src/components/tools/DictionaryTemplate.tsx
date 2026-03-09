'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AdPlaceholder } from '@/components/layout/AdPlaceholder';
import Link from 'next/link';
import { ChevronRight, Bookmark, Volume2, BookOpen, Quote, Target, HelpCircle, Info } from 'lucide-react';
import { generateDictionaryArticle } from '@/lib/seo-generator';

interface DictionaryTemplateProps {
    word: string;
    phonetic?: string;
    meanings: Array<{
        partOfSpeech: string;
        definitions: Array<{
            definition: string;
            example?: string;
        }>;
        synonyms: string[];
        antonyms: string[];
    }>;
}

export function DictionaryTemplate({ word, phonetic, meanings }: DictionaryTemplateProps) {
    return (
        <div className="min-h-screen flex flex-col bg-surface-50 dark:bg-surface-950">
            <Header />

            <main className="flex-grow pt-28 md:pt-32 pb-20 container mx-auto px-4 md:px-8 max-w-7xl">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-8">
                    <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
                    <ChevronRight size={12} />
                    <Link href="/tools" className="hover:text-brand-primary transition-colors">Tools</Link>
                    <ChevronRight size={12} />
                    <span className="capitalize">Definitions</span>
                    <ChevronRight size={12} />
                    <span className="text-foreground capitalize">{word}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 space-y-8">
                        {/* Hero / Definition Title */}
                        <section className="glass-card p-8 md:p-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 premium-gradient opacity-10 blur-3xl -mr-16 -mt-16" />

                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-brand-primary/10 rounded-xl text-brand-primary">
                                    <Bookmark size={28} />
                                </div>
                                <h1 className="font-outfit text-4xl md:text-5xl font-black capitalize tracking-tight">
                                    {word}
                                </h1>
                            </div>

                            {phonetic && (
                                <div className="flex items-center gap-3 text-brand-primary font-bold italic mb-6">
                                    <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center">
                                        <Volume2 size={16} />
                                    </div>
                                    {phonetic}
                                </div>
                            )}

                            <p className="text-muted-foreground font-medium text-lg leading-relaxed max-w-2xl">
                                Looking for the meaning of <strong className="text-foreground underline decoration-brand-primary underline-offset-4">{word}</strong>? Explore definitions, parts of speech, and usage examples below.
                            </p>
                        </section>

                        {/* Ad */}
                        <AdPlaceholder type="content" />

                        {/* Meanings */}
                        <section className="space-y-6">
                            {meanings.map((meaning, idx) => (
                                <div key={idx} className="glass-card p-8 md:p-12">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="text-xs font-black uppercase tracking-widest px-3 py-1 bg-surface-100 dark:bg-surface-800 rounded-lg border text-muted-foreground">
                                            {meaning.partOfSpeech}
                                        </span>
                                    </div>

                                    <div className="space-y-8">
                                        {meaning.definitions.map((def, defIdx) => (
                                            <div key={defIdx} className="space-y-4">
                                                <div className="flex gap-4">
                                                    <span className="text-brand-primary font-black opacity-30 mt-1">0{defIdx + 1}</span>
                                                    <div>
                                                        <p className="text-lg font-medium text-foreground leading-relaxed">
                                                            {def.definition}
                                                        </p>
                                                        {def.example && (
                                                            <p className="mt-3 pl-4 border-l-2 border-brand-primary/20 text-muted-foreground italic text-sm">
                                                                &ldquo;{def.example}&rdquo;
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {(meaning.synonyms.length > 0 || meaning.antonyms.length > 0) && (
                                        <div className="mt-12 pt-8 border-t space-y-4">
                                            {meaning.synonyms.length > 0 && (
                                                <div className="flex flex-wrap gap-2 items-center">
                                                    <span className="text-xs font-bold text-muted-foreground mr-2">SYNONYMS:</span>
                                                    {meaning.synonyms.slice(0, 5).map((syn) => (
                                                        <span key={syn} className="px-3 py-1 bg-brand-primary/5 text-brand-primary rounded-full text-xs font-bold border border-brand-primary/10">
                                                            {syn}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </section>

                        {/* SEO Guide */}
                        <section className="glass-card p-8 md:p-12 mb-8">
                            <h2 className="font-outfit text-2xl font-bold mb-6 italic flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                                    <Info size={18} />
                                </div>
                                Understanding &quot;{word}&quot;
                            </h2>
                            <div className="space-y-4">
                                {generateDictionaryArticle(word, meanings[0]?.partOfSpeech || 'word', phonetic || '').map((paragraph: string, idx: number) => (
                                    <p key={idx} className="text-muted-foreground leading-relaxed">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </section>

                        {/* FAQ Info */}
                        <section className="glass-card p-8 md:p-12">
                            <h2 className="font-outfit text-2xl font-bold mb-8 italic flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center">
                                    <HelpCircle size={18} />
                                </div>
                                Dictionary Helper
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold mb-2">How do I use {word} in a sentence?</h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        Refer to the usage examples above to see how &quot;{word}&quot; can be used in academic and casual conversations.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    <aside className="lg:col-span-4 space-y-8">
                        <AdPlaceholder type="sidebar" />
                        <div className="glass-card p-8">
                            <h3 className="font-outfit font-bold text-xl mb-6 italic">Trending Words</h3>
                            <div className="space-y-3">
                                <Link href="/define/productivity" className="block p-4 rounded-xl border bg-surface-50 dark:bg-surface-900/50 hover:border-brand-primary transition-all text-sm font-bold">
                                    Meaning of Productivity
                                </Link>
                                <Link href="/define/innovation" className="block p-4 rounded-xl border bg-surface-50 dark:bg-surface-900/50 hover:border-brand-primary transition-all text-sm font-bold">
                                    Meaning of Innovation
                                </Link>
                                <Link href="/define/epiphany" className="block p-4 rounded-xl border bg-surface-50 dark:bg-surface-900/50 hover:border-brand-primary transition-all text-sm font-bold">
                                    Meaning of Epiphany
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            <Footer />
        </div>
    );
}
