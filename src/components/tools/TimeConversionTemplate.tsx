'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AdPlaceholder } from '@/components/layout/AdPlaceholder';
import Link from 'next/link';
import { ChevronRight, Clock, Info, HelpCircle, Calendar, Briefcase, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

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

    // Benchmark hours for conversion reference table
    const benchmarkHours = [
        { hour: '08:00', label: '8:00 AM' },
        { hour: '10:00', label: '10:00 AM' },
        { hour: '12:00', label: '12:00 PM (Noon)' },
        { hour: '14:00', label: '2:00 PM' },
        { hour: '16:00', label: '4:00 PM' },
        { hour: '18:00', label: '6:00 PM' },
        { hour: '20:00', label: '8:00 PM' },
    ];

    const getConvertedBenchmark = (timeStr: string) => {
        try {
            const today = new Date().toISOString().split('T')[0];
            const d = new Date(`${today}T${timeStr}:00`);
            const diff = new Date(d.toLocaleString('en-US', { timeZone: toZone })).getTime() - new Date(d.toLocaleString('en-US', { timeZone: fromZone })).getTime();
            return new Date(d.getTime() + diff).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
        } catch {
            return '--:--';
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-surface-50 dark:bg-surface-950">
            <Header />

            <main className="flex-grow pt-28 md:pt-32 pb-20 container mx-auto px-4 md:px-8 max-w-7xl">
                <Breadcrumbs 
                    items={[
                        { label: 'Time Hub', href: '/time' },
                        { label: `${fromName} to ${toName}`, href: `/time/${fromName.toLowerCase().replace(/\s+/g, '-')}-to-${toName.toLowerCase().replace(/\s+/g, '-')}` }
                    ]} 
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 space-y-8">
                        {/* Hero / Tool Area */}
                        <section className="glass-card p-8 md:p-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 premium-gradient opacity-10 blur-3xl -mr-16 -mt-16" />

                            <h1 className="font-outfit text-3xl md:text-5xl font-black mb-4 tracking-tight">
                                Convert {fromName} Time to {toName} Time
                            </h1>
                            <p className="text-muted-foreground mb-10 font-medium text-lg leading-relaxed">
                                Real-time clock and timezone synchronization tool comparing <strong>{fromName}</strong> ({fromZone}) with <strong>{toName}</strong> ({toZone}). Accurately calculates daylight saving adjustments and local time offsets.
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
                                                className="w-full bg-background border-2 border-surface-200 dark:border-surface-800 rounded-2xl p-6 text-3xl font-black outline-none focus:border-brand-primary transition-all text-center"
                                                placeholder={currentFromTime}
                                            />
                                            <p className="mt-2 text-sm text-muted-foreground text-center">Currently: <strong className="text-foreground">{currentFromTime}</strong></p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-2">{toName} ({toZone})</label>
                                        <div className="relative">
                                            <div className="w-full bg-surface-50 dark:bg-surface-950 border-2 border-surface-200 dark:border-surface-800 rounded-2xl p-6 text-3xl font-black text-brand-primary min-h-[5.5rem] flex items-center justify-center shadow-inner">
                                                {inputTime ? convertedTime : currentToTime}
                                            </div>
                                            <p className="mt-2 text-sm text-muted-foreground text-center">Currently: <strong className="text-foreground">{currentToTime}</strong></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Conversion Reference Table */}
                        <section className="glass-card p-8 md:p-12">
                            <h2 className="font-outfit text-2xl font-bold mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                                    <Clock size={18} />
                                </div>
                                {fromName} to {toName} Hourly Conversion Table
                            </h2>
                            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                                Use this hourly reference table to quickly look up equivalent local times between {fromName} and {toName} without manual calculation.
                            </p>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm border-collapse">
                                    <thead>
                                        <tr className="border-b border-border bg-surface-100 dark:bg-surface-900/60">
                                            <th className="py-3 px-4 font-bold">{fromName} Time ({fromZone})</th>
                                            <th className="py-3 px-4 font-bold text-brand-primary">{toName} Equivalent ({toZone})</th>
                                            <th className="py-3 px-4 font-bold text-muted-foreground">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {benchmarkHours.map((b) => (
                                            <tr key={b.hour} className="hover:bg-surface-50 dark:hover:bg-surface-900/40 transition-colors">
                                                <td className="py-3.5 px-4 font-semibold">{b.label}</td>
                                                <td className="py-3.5 px-4 font-bold text-brand-primary">{getConvertedBenchmark(b.hour)}</td>
                                                <td className="py-3.5 px-4 text-xs text-muted-foreground">Standard Hours</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* Business Hours & Meeting Overlap */}
                        <section className="glass-card p-8 md:p-12">
                            <h2 className="font-outfit text-2xl font-bold mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                                    <Briefcase size={18} />
                                </div>
                                Scheduling Meetings Across {fromName} and {toName}
                            </h2>
                            <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                                <p>
                                    When collaborating across time zones, finding a mutually convenient window during standard business hours (9:00 AM to 5:00 PM local time) is crucial. Time differences can sometimes mean that normal working hours in <strong>{fromName}</strong> correspond to evening or early morning hours in <strong>{toName}</strong>.
                                </p>
                                <p>
                                    To schedule international conference calls, webinars, or team check-ins, aim for overlapping business periods. If working hours do not directly align, rotating meeting schedules ensure fair collaboration without requiring one party to consistently join outside regular hours.
                                </p>
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
                                    <h4 className="font-bold mb-2">What is the exact time difference between {fromName} and {toName}?</h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        The time differential is calculated automatically based on the astronomical and statutory UTC offsets of {fromZone} and {toZone}. Our tool updates in real time to reflect local daylight saving transitions.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-2">Do {fromName} and {toName} observe Daylight Saving Time (DST)?</h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        Observance of Daylight Saving Time varies by jurisdiction. When one region transitions to or from summer time while the other does not, the total hour gap shifts by one hour. This tool incorporates international standard IANA timezone database rules to keep calculations exact.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-2">Can I convert a custom time?</h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        Yes. Simply click into the time input box above and select or enter any hour of the day to immediately see the corresponding local time in {toName}.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    <aside className="lg:col-span-4 space-y-8">
                        <AdPlaceholder type="sidebar" />
                        <div className="glass-card p-8">
                            <h3 className="font-outfit font-bold text-xl mb-6 flex items-center gap-2">
                                <Globe size={18} className="text-brand-primary" />
                                World Time Hubs
                            </h3>
                            <div className="space-y-3">
                                <Link href="/time" className="block p-4 rounded-xl border bg-surface-50 dark:bg-surface-900/50 hover:border-brand-primary transition-all text-sm font-bold flex items-center justify-between group">
                                    <span>Browse All Time Zones</span>
                                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                                <Link href="/city" className="block p-4 rounded-xl border bg-surface-50 dark:bg-surface-900/50 hover:border-brand-primary transition-all text-sm font-bold flex items-center justify-between group">
                                    <span>Global City Weather</span>
                                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                                <Link href="/convert" className="block p-4 rounded-xl border bg-surface-50 dark:bg-surface-900/50 hover:border-brand-primary transition-all text-sm font-bold flex items-center justify-between group">
                                    <span>Unit Converters</span>
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
