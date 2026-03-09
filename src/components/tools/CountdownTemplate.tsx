'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AdPlaceholder } from '@/components/layout/AdPlaceholder';
import Link from 'next/link';
import { ChevronRight, Clock, Calendar, HelpCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Countdown } from '@/data/countdowns';

interface CountdownTemplateProps extends Countdown { }

export function CountdownTemplate({ slug, eventName, targetDateMethod, month, date, fixedDate, description }: CountdownTemplateProps) {
    const [timeLeft, setTimeLeft] = useState<{ days: number, hours: number, minutes: number, seconds: number } | null>(null);

    // Compute target date once on mount to avoid hydration mismatch, or handle carefully
    const [target, setTarget] = useState<Date | null>(null);

    useEffect(() => {
        const now = new Date();
        let calculatedTarget = new Date(); // Fallback

        if (targetDateMethod === 'fixed' && fixedDate) {
            calculatedTarget = new Date(fixedDate);
        } else if (targetDateMethod === 'current_year' && month !== undefined && date !== undefined) {
            calculatedTarget = new Date(now.getFullYear(), month, date);
            // If the date has already passed this year, point to next year
            if (now.getTime() > calculatedTarget.getTime()) {
                calculatedTarget.setFullYear(now.getFullYear() + 1);
            }
        } else if (targetDateMethod === 'next_year' && month !== undefined && date !== undefined) {
            calculatedTarget = new Date(now.getFullYear() + 1, month, date);
            // If it's already past it this year, but we explicitly want 'next year'. 
            // Often "New Year's" logic means it's Jan 1st of the next year.
            if (month === 0 && date === 1) {
                // Next year always
                calculatedTarget = new Date(now.getFullYear() + 1, 0, 1);
            }
        }

        setTarget(calculatedTarget);
    }, [targetDateMethod, fixedDate, month, date]);

    useEffect(() => {
        if (!target) return;

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const difference = target.getTime() - now;

            if (difference <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                clearInterval(interval);
            } else {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [target]);

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
                    <span className="capitalize">Countdowns</span>
                    <ChevronRight size={12} />
                    <span className="text-foreground">{eventName}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 space-y-8">
                        {/* Hero / Tool Area */}
                        <section className="glass-card p-8 md:p-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 premium-gradient opacity-10 blur-3xl -mr-16 -mt-16" />

                            <h1 className="font-outfit text-3xl md:text-5xl font-black mb-4 tracking-tight">
                                Countdown to {eventName}
                            </h1>
                            <p className="text-muted-foreground mb-12 font-medium">
                                {description}
                            </p>

                            <div className="bg-surface-100 dark:bg-surface-900 rounded-3xl p-8 md:p-12 border shadow-inner">
                                {target && (
                                    <div className="flex items-center justify-center gap-2 text-sm font-bold text-brand-primary mb-8 bg-brand-primary/10 px-4 py-2 rounded-full w-fit mx-auto">
                                        <Calendar size={16} />
                                        Target Date: {target.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                    </div>
                                )}

                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 items-center text-center">
                                    <div className="bg-background border-2 border-surface-200 dark:border-surface-800 rounded-3xl p-6 shadow-sm">
                                        <div className="text-5xl font-black text-foreground mb-2">{timeLeft?.days ?? '0'}</div>
                                        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Days</div>
                                    </div>
                                    <div className="bg-background border-2 border-surface-200 dark:border-surface-800 rounded-3xl p-6 shadow-sm">
                                        <div className="text-5xl font-black text-foreground mb-2">{timeLeft?.hours ?? '0'}</div>
                                        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Hours</div>
                                    </div>
                                    <div className="bg-background border-2 border-surface-200 dark:border-surface-800 rounded-3xl p-6 shadow-sm">
                                        <div className="text-5xl font-black text-foreground mb-2">{timeLeft?.minutes ?? '0'}</div>
                                        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Minutes</div>
                                    </div>
                                    <div className="bg-background border-2 border-surface-200 dark:border-surface-800 rounded-3xl p-6 shadow-sm">
                                        <div className="text-5xl font-black text-brand-primary mb-2">{timeLeft?.seconds ?? '0'}</div>
                                        <div className="text-xs font-bold uppercase tracking-wider text-brand-primary/80">Seconds</div>
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
                                About {eventName}
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold mb-2">When exactly is {eventName}?</h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {eventName} is on {target?.toLocaleDateString('en-US', { day: 'numeric', month: 'long' }) || '...'}. Our live countdown accurately calculates the days, hours, minutes, and seconds remaining until this event, adjusting automatically across timezones.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    <aside className="lg:col-span-4 space-y-8">
                        <AdPlaceholder type="sidebar" />
                        <div className="glass-card p-8">
                            <h3 className="font-outfit font-bold text-xl mb-6 italic">Popular Countdowns</h3>
                            <div className="space-y-3">
                                <Link href="/countdown/christmas" className="block p-4 rounded-xl border bg-surface-50 dark:bg-surface-900/50 hover:border-brand-primary transition-all text-sm font-bold">
                                    Countdown to Christmas
                                </Link>
                                <Link href="/countdown/new-year" className="block p-4 rounded-xl border bg-surface-50 dark:bg-surface-900/50 hover:border-brand-primary transition-all text-sm font-bold">
                                    Countdown to New Year
                                </Link>
                                <Link href="/countdown/halloween" className="block p-4 rounded-xl border bg-surface-50 dark:bg-surface-900/50 hover:border-brand-primary transition-all text-sm font-bold">
                                    Countdown to Halloween
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
