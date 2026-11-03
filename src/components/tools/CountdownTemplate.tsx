'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AdPlaceholder } from '@/components/layout/AdPlaceholder';
import Link from 'next/link';
import { ChevronRight, Clock, Calendar, HelpCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Countdown } from '@/data/countdowns';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

interface CountdownTemplateProps extends Countdown { }

export function CountdownTemplate({ slug, eventName, targetDateMethod, month, date, fixedDate, description }: CountdownTemplateProps) {
    const [timeLeft, setTimeLeft] = useState<{ days: number, hours: number, minutes: number, seconds: number } | null>(null);
    const [target, setTarget] = useState<Date | null>(null);

    useEffect(() => {
        const now = new Date();
        let calculatedTarget = new Date();

        if (targetDateMethod === 'fixed' && fixedDate) {
            calculatedTarget = new Date(fixedDate);
        } else if (targetDateMethod === 'current_year' && month !== undefined && date !== undefined) {
            calculatedTarget = new Date(now.getFullYear(), month, date);
            if (now.getTime() > calculatedTarget.getTime()) {
                calculatedTarget.setFullYear(now.getFullYear() + 1);
            }
        } else if (targetDateMethod === 'next_year' && month !== undefined && date !== undefined) {
            calculatedTarget = new Date(now.getFullYear() + 1, month, date);
            if (month === 0 && date === 1) {
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
                <Breadcrumbs 
                    items={[
                        { label: 'Countdowns', href: '/countdown' },
                        { label: eventName, href: `/countdown/${slug}` }
                    ]} 
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 space-y-8">
                        {/* Hero / Tool Area */}
                        <section className="glass-card p-8 md:p-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 premium-gradient opacity-10 blur-3xl -mr-16 -mt-16" />

                            <h1 className="font-outfit text-3xl md:text-5xl font-black mb-4 tracking-tight">
                                Countdown to {eventName}
                            </h1>
                            <p className="text-muted-foreground mb-10 font-medium text-lg leading-relaxed">
                                {description} Track the exact remaining time with millisecond precision as we count down to this anticipated milestone.
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

                        {/* Cultural Significance & Origins */}
                        <section className="glass-card p-8 md:p-12">
                            <h2 className="font-outfit text-2xl font-bold mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                                    <Sparkles size={18} />
                                </div>
                                Celebration Traditions & Significance
                            </h2>
                            <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                                <p>
                                    <strong>{eventName}</strong> represents a key temporal landmark celebrated worldwide by millions of people. Whether marking the transition into a new calendar cycle, welcoming a seasonal astronomical shift, or celebrating historic cultural traditions, events like this offer an opportunity to gather with friends, reflect on personal goals, and share memorable experiences.
                                </p>
                                <p>
                                    Communities often mark the occasion with festivals, special gatherings, festive meals, and symbolic ceremonies that reflect centuries of shared heritage and modern festivities.
                                </p>
                            </div>
                        </section>

                        {/* Preparation Milestones */}
                        <section className="glass-card p-8 md:p-12">
                            <h2 className="font-outfit text-2xl font-bold mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                                    <CheckCircle2 size={18} />
                                </div>
                                Countdown Milestones & Checklist
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-4 rounded-2xl bg-surface-100 dark:bg-surface-900 border border-border">
                                    <span className="text-xs font-bold text-brand-primary uppercase tracking-wider block mb-1">30 Days Out</span>
                                    <h4 className="font-bold text-sm mb-2">Initial Planning</h4>
                                    <p className="text-xs text-muted-foreground">Coordinate travel, send invitations, and establish key preparations well in advance.</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-surface-100 dark:bg-surface-900 border border-border">
                                    <span className="text-xs font-bold text-brand-primary uppercase tracking-wider block mb-1">7 Days Out</span>
                                    <h4 className="font-bold text-sm mb-2">Final Logistics</h4>
                                    <p className="text-xs text-muted-foreground">Confirm event itineraries, acquire supplies, and review countdown timing.</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-surface-100 dark:bg-surface-900 border border-border">
                                    <span className="text-xs font-bold text-brand-primary uppercase tracking-wider block mb-1">Final 24 Hours</span>
                                    <h4 className="font-bold text-sm mb-2">The Celebration</h4>
                                    <p className="text-xs text-muted-foreground">Track the final hours live and celebrate the momentous milestone with family and friends.</p>
                                </div>
                            </div>
                        </section>

                        {/* FAQ */}
                        <section className="glass-card p-8 md:p-12">
                            <h2 className="font-outfit text-2xl font-bold mb-8 italic flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center">
                                    <HelpCircle size={18} />
                                </div>
                                Frequently Asked Questions
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold mb-2">When exactly is {eventName}?</h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {eventName} is on {target?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) || '...'}. Our live countdown accurately calculates the days, hours, minutes, and seconds remaining, adjusting automatically for your current local device time.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-2">Does this countdown update automatically?</h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        Yes. The timer updates every 1,000 milliseconds (1 second) directly in your browser without requiring page refreshes or external server polling.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-2">What happens when the countdown timer reaches zero?</h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        When the target moment arrives, the timer safely locks at 00:00:00, signaling that {eventName} has arrived and the celebration is underway.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    <aside className="lg:col-span-4 space-y-8">
                        <AdPlaceholder type="sidebar" />
                        <div className="glass-card p-8">
                            <h3 className="font-outfit font-bold text-xl mb-6 italic flex items-center gap-2">
                                <Clock size={18} className="text-brand-primary" />
                                Other Live Countdowns
                            </h3>
                            <div className="space-y-3">
                                <Link href="/countdown/new-year" className="block p-4 rounded-xl border bg-surface-50 dark:bg-surface-900/50 hover:border-brand-primary transition-all text-sm font-bold flex items-center justify-between group">
                                    <span>New Year</span>
                                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                                <Link href="/countdown/christmas" className="block p-4 rounded-xl border bg-surface-50 dark:bg-surface-900/50 hover:border-brand-primary transition-all text-sm font-bold flex items-center justify-between group">
                                    <span>Christmas</span>
                                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                                <Link href="/countdown/halloween" className="block p-4 rounded-xl border bg-surface-50 dark:bg-surface-900/50 hover:border-brand-primary transition-all text-sm font-bold flex items-center justify-between group">
                                    <span>Halloween</span>
                                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                                <Link href="/countdown/valentines-day" className="block p-4 rounded-xl border bg-surface-50 dark:bg-surface-900/50 hover:border-brand-primary transition-all text-sm font-bold flex items-center justify-between group">
                                    <span>Valentine's Day</span>
                                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
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
