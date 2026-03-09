'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AdPlaceholder } from '@/components/layout/AdPlaceholder';
import Link from 'next/link';
import { ChevronRight, Clock, Info, HelpCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

interface TimeConversionPageProps {
    slug: string;
    fromZone: string;
    toZone: string;
    fromName: string;
    toName: string;
}

export function TimeConversionTemplate({ fromZone, toZone, fromName, toName }: TimeConversionPageProps) {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [inputTime, setInputTime] = useState('');

    useEffect(() => {
        const interval = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const formatterFrom = new Intl.DateTimeFormat('en-US', { timeStyle: 'short', timeZone: fromZone });
    const formatterTo = new Intl.DateTimeFormat('en-US', { timeStyle: 'short', timeZone: toZone });

    // Current times in both zones
    const currentFromTime = formatterFrom.format(currentTime);
    const currentToTime = formatterTo.format(currentTime);

    // Dynamic conversion logic if user inputs a time
    let convertedTime = currentToTime;
    if (inputTime) {
        try {
            const today = new Date().toISOString().split('T')[0];
            const d = new Date(`${today}T${inputTime}`);
            if (!isNaN(d.getTime())) {
                const diff = new Date(d.toLocaleString('en-US', { timeZone: toZone })).getTime() - new Date(d.toLocaleString('en-US', { timeZone: fromZone })).getTime();
                const converted = new Date(d.getTime() + diff);
                convertedTime = converted.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            }
        } catch (e) {
            // ignore
        }
    }

    const exampleHours = [9, 12, 15, 18, 21];

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
                    <span className="capitalize">Time Converters</span>
                    <ChevronRight size={12} />
                    <span className="text-foreground">{fromName} to {toName}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 space-y-8">
                        {/* Hero / Tool Area */}
                        <section className="glass-card p-8 md:p-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 premium-gradient opacity-10 blur-3xl -mr-16 -mt-16" />

                            <h1 className="font-outfit text-3xl md:text-4xl font-black mb-4 tracking-tight">
                                Convert {fromName} Time to {toName} Time
                            </h1>
                            <p className="text-muted-foreground mb-12 font-medium">
                                Fast and accurate time conversion from {fromName} ({fromZone}) to {toName} ({toZone}).
                            </p>

                            <div className="bg-surface-100 dark:bg-surface-900 rounded-3xl p-8 md:p-12 border shadow-inner">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-2">{fromName} ({fromZone})</label>
                                        <div className="relative">
                                            <input
                                                type="time"
                                                value={inputTime}
                                                onChange={(e) => setInputTime(e.target.value)}
                                                className="w-full bg-background border-2 border-surface-200 dark:border-surface-800 rounded-2xl p-6 text-3xl font-black outline-none focus:border-brand-primary transition-all"
                                                placeholder={currentFromTime}
                                            />
                                            <p className="mt-2 text-sm text-muted-foreground text-center">Currently: <strong>{currentFromTime}</strong></p>
                                        </div>
                                    </div>

                                    <div className="flex justify-center md:pt-6">
                                        <div className="w-12 h-12 rounded-full glass border flex items-center justify-center text-brand-primary shadow-lg">
                                            <Clock size={24} />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-2">{toName} ({toZone})</label>
                                        <div className="relative">
                                            <div className="w-full bg-surface-50 dark:bg-surface-950 border-2 border-surface-200 dark:border-surface-800 rounded-2xl p-6 text-3xl font-black text-brand-primary min-h-[5rem] flex items-center justify-center">
                                                {inputTime ? convertedTime : currentToTime}
                                            </div>
                                            <p className="mt-2 text-sm text-muted-foreground text-center">Currently: <strong>{currentToTime}</strong></p>
                                        </div>
                                    </div>
                                </div>
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
                                Common Questions
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold mb-2">What is the time difference between {fromName} and {toName}?</h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        The time difference depends on daylight saving time in both regions. Our tool automatically accounts for daylight saving time based on the current date, ensuring you always get the accurate conversion.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    <aside className="lg:col-span-4 space-y-8">
                        <AdPlaceholder type="sidebar" />
                        <div className="glass-card p-8">
                            <h3 className="font-outfit font-bold text-xl mb-6 italic">Related Converters</h3>
                            <div className="space-y-3">
                                <Link href="/time/japan-to-london" className="block p-4 rounded-xl border bg-surface-50 dark:bg-surface-900/50 hover:border-brand-primary transition-all text-sm font-bold">
                                    Japan to London
                                </Link>
                                <Link href="/time/pst-to-ist" className="block p-4 rounded-xl border bg-surface-50 dark:bg-surface-900/50 hover:border-brand-primary transition-all text-sm font-bold">
                                    PST to IST
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
