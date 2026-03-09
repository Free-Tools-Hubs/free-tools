'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AdPlaceholder } from '@/components/layout/AdPlaceholder';
import Link from 'next/link';
import { ChevronRight, Shuffle, Hash, Palette, Globe, Film, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import type { RandomGenerator } from '@/data/randoms';

const countriesList = ['Japan', 'Brazil', 'Sri Lanka', 'United States', 'Canada', 'Australia', 'Germany', 'France', 'India', 'South Africa'];
const moviesList = ['The Matrix', 'Inception', 'Interstellar', 'The Godfather', 'Pulp Fiction', 'Forrest Gump', 'Fight Club', 'The Dark Knight', 'Goodfellas', 'Gladiator'];

export function RandomTemplate({ name, description, type, slug }: RandomGenerator) {
    const [result, setResult] = useState<string>('');
    const [color, setColor] = useState<string>('');

    const generateRandom = () => {
        if (type === 'number') {
            const num = Math.floor(Math.random() * 100) + 1;
            setResult(num.toString());
            setColor('');
        } else if (type === 'color') {
            const hex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
            setResult(hex);
            setColor(hex);
        } else if (type === 'country') {
            const country = countriesList[Math.floor(Math.random() * countriesList.length)];
            setResult(country);
            setColor('');
        } else if (type === 'movie') {
            const movie = moviesList[Math.floor(Math.random() * moviesList.length)];
            setResult(movie);
            setColor('');
        }
    };

    const getIcon = () => {
        if (type === 'number') return <Hash size={24} />;
        if (type === 'color') return <Palette size={24} />;
        if (type === 'country') return <Globe size={24} />;
        if (type === 'movie') return <Film size={24} />;
        return <Shuffle size={24} />;
    };

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
                    <span className="capitalize">Random Generators</span>
                    <ChevronRight size={12} />
                    <span className="text-foreground">{name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 space-y-8">
                        {/* Hero / Tool Area */}
                        <section className="glass-card p-8 md:p-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 premium-gradient opacity-10 blur-3xl -mr-16 -mt-16" />

                            <h1 className="font-outfit text-3xl md:text-5xl font-black mb-4 tracking-tight">
                                Generate a {name}
                            </h1>
                            <p className="text-muted-foreground mb-12 font-medium">
                                {description}
                            </p>

                            <div className="bg-surface-100 dark:bg-surface-900 rounded-3xl p-8 md:p-12 border shadow-inner flex flex-col items-center">

                                <button
                                    onClick={generateRandom}
                                    className="flex items-center gap-2 bg-brand-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity active:scale-95 mb-12 shadow-md"
                                >
                                    {getIcon()}
                                    Generate {name.split(' ')[1]}
                                </button>

                                {result && (
                                    <div
                                        className="w-full max-w-md rounded-3xl border-2 border-surface-200 dark:border-surface-800 p-8 flex flex-col items-center justify-center min-h-[160px] shadow-sm relative overflow-hidden bg-background"
                                        style={color ? { backgroundColor: color, borderColor: color } : {}}
                                    >
                                        <div className={`text-4xl md:text-5xl font-black text-center ${color ? 'text-white drop-shadow-md' : 'text-brand-primary'}`}>
                                            {result}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Ad */}
                        <AdPlaceholder type="content" />

                        {/* FAQ */}
                        <section className="glass-card p-8 md:p-12">
                            <h2 className="font-outfit text-2xl font-bold mb-8 italic flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center">
                                    <HelpCircle size={18} />
                                </div>
                                About the {name} Generator
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold mb-2">How truly random is this?</h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        Our robust client-side generator uses mathematically sound pseudo-random algorithms built into modern browsers to ensure a fair and scattered distribution of results, perfect for everyday use cases.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    <aside className="lg:col-span-4 space-y-8">
                        <AdPlaceholder type="sidebar" />
                        <div className="glass-card p-8">
                            <h3 className="font-outfit font-bold text-xl mb-6 italic">More Random Tools</h3>
                            <div className="space-y-3">
                                <Link href="/random/number" className="block p-4 rounded-xl border bg-surface-50 dark:bg-surface-900/50 hover:border-brand-primary transition-all text-sm font-bold">
                                    Random Number
                                </Link>
                                <Link href="/random/color" className="block p-4 rounded-xl border bg-surface-50 dark:bg-surface-900/50 hover:border-brand-primary transition-all text-sm font-bold">
                                    Random Color
                                </Link>
                                <Link href="/random/country" className="block p-4 rounded-xl border bg-surface-50 dark:bg-surface-900/50 hover:border-brand-primary transition-all text-sm font-bold">
                                    Random Country
                                </Link>
                                <Link href="/random/movie" className="block p-4 rounded-xl border bg-surface-50 dark:bg-surface-900/50 hover:border-brand-primary transition-all text-sm font-bold">
                                    Random Movie
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
