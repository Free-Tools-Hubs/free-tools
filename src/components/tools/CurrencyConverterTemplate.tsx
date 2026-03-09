'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AdPlaceholder } from '@/components/layout/AdPlaceholder';
import Link from 'next/link';
import { ChevronRight, RefreshCw, Info, HelpCircle, ArrowRightLeft } from 'lucide-react';
import { useState, useEffect } from 'react';

interface CurrencyConverterProps {
    from: string;
    to: string;
    fromName: string;
    toName: string;
    rate: number;
    lastUpdate: string;
}

export function CurrencyConverterTemplate({ from, to, fromName, toName, rate, lastUpdate }: CurrencyConverterProps) {
    const [amount, setAmount] = useState<number>(1);
    const result = amount * rate;
    const inverseRate = 1 / rate;

    const exampleValues = [1, 5, 10, 50, 100, 500, 1000];

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
                    <span className="capitalize">Currency Converters</span>
                    <ChevronRight size={12} />
                    <span className="text-foreground">{fromName} to {toName}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 space-y-8">
                        {/* Hero / Tool Area */}
                        <section className="glass-card p-8 md:p-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 premium-gradient opacity-10 blur-3xl -mr-16 -mt-16" />

                            <h1 className="font-outfit text-3xl md:text-4xl font-black mb-4 tracking-tight">
                                Convert {fromName} ({from}) to {toName} ({to})
                            </h1>
                            <p className="text-muted-foreground mb-12 font-medium">
                                Fast and accurate live currency conversion using the latest mid-market rates.
                            </p>

                            <div className="bg-surface-100 dark:bg-surface-900 rounded-3xl p-8 md:p-12 border shadow-inner">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-2">{fromName} ({from})</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={amount}
                                                onChange={(e) => setAmount(Number(e.target.value))}
                                                className="w-full bg-background border-2 border-surface-200 dark:border-surface-800 rounded-2xl p-6 text-3xl font-black outline-none focus:border-brand-primary transition-all"
                                                placeholder="0.00"
                                            />
                                            <span className="absolute right-6 top-1/2 -translate-y-1/2 bg-surface-100 dark:bg-surface-800 px-3 py-1 rounded-lg text-sm font-bold border">{from}</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-center md:pt-6">
                                        <div className="w-12 h-12 rounded-full glass border flex items-center justify-center text-brand-primary shadow-lg">
                                            <ArrowRightLeft size={24} />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-2">{toName} ({to})</label>
                                        <div className="relative">
                                            <div className="w-full bg-surface-50 dark:bg-surface-950 border-2 border-surface-200 dark:border-surface-800 rounded-2xl p-6 text-3xl font-black text-brand-primary">
                                                {result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                                            </div>
                                            <span className="absolute right-6 top-1/2 -translate-y-1/2 bg-surface-100 dark:bg-surface-800 px-3 py-1 rounded-lg text-sm font-bold border">{to}</span>
                                        </div>
                                    </div>
                                </div>

                                <p className="mt-8 text-center text-xs text-muted-foreground italic">
                                    1 {from} = {rate.toFixed(6)} {to} • Updated: {new Date(lastUpdate).toLocaleString()}
                                </p>
                            </div>
                        </section>

                        {/* Ad */}
                        <AdPlaceholder type="content" />

                        {/* Data Table */}
                        <section className="glass-card p-8 md:p-12">
                            <h2 className="font-outfit text-2xl font-bold mb-8 italic flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                                    <Info size={18} />
                                </div>
                                {from} to {to} Conversion Table
                            </h2>
                            <div className="overflow-hidden border rounded-2xl">
                                <table className="w-full text-left">
                                    <thead className="bg-surface-50 dark:bg-surface-900 border-b">
                                        <tr>
                                            <th className="p-4 font-bold text-sm tracking-widest uppercase">{fromName} ({from})</th>
                                            <th className="p-4 font-bold text-sm tracking-widest uppercase">{toName} ({to})</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {exampleValues.map((val) => (
                                            <tr key={val} className="border-b last:border-0 hover:bg-surface-100/50 dark:hover:bg-surface-800/50">
                                                <td className="p-4 font-medium">{val.toLocaleString()} {from}</td>
                                                <td className="p-4 font-black italic text-brand-primary">{(val * rate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })} {to}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
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
                                    <h4 className="font-bold mb-2">How do I convert {from} to {to}?</h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        To convert {fromName} ({from}) to {toName} ({to}), simply multiply the amount by the exchange rate ({rate.toFixed(4)}). Our converter makes this easy with real-time data.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-2">Is this exchange rate accurate?</h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        Yes, our converter uses live mid-market exchange rates sourced from major financial data providers, providing reliable information for personal and educational use.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    <aside className="lg:col-span-4 space-y-8">
                        <AdPlaceholder type="sidebar" />
                        <div className="glass-card p-8">
                            <h3 className="font-outfit font-bold text-xl mb-6 italic">Recommended Converters</h3>
                            <div className="space-y-3">
                                <Link href={`/currency/${to.toLowerCase()}-to-${from.toLowerCase()}`} className="block p-4 rounded-xl border bg-surface-50 dark:bg-surface-900/50 hover:border-brand-primary transition-all text-sm font-bold">
                                    {toName} to {fromName}
                                </Link>
                                <Link href="/currency/usd-to-eur" className="block p-4 rounded-xl border bg-surface-50 dark:bg-surface-900/50 hover:border-brand-primary transition-all text-sm font-bold">
                                    US Dollar to Euro
                                </Link>
                                <Link href="/currency/gbp-to-usd" className="block p-4 rounded-xl border bg-surface-50 dark:bg-surface-900/50 hover:border-brand-primary transition-all text-sm font-bold">
                                    British Pound to US Dollar
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
