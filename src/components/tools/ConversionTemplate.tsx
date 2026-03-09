'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AdPlaceholder } from '@/components/layout/AdPlaceholder';
import Link from 'next/link';
import { ChevronRight, ArrowUpDown, Info, HelpCircle, LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { generateConversionArticle } from '@/lib/seo-generator';

interface ConversionPageProps {
    fromUnit: string;
    toUnit: string;
    fromName: string;
    toName: string;
    ratio: number;
    offset?: number;
    category: string;
}

export function ConversionTemplate({ fromUnit, toUnit, fromName, toName, ratio, offset = 0, category }: ConversionPageProps) {
    const [leftValue, setLeftValue] = useState<string>('1');
    const [rightValue, setRightValue] = useState<string>('');
    const [isReversed, setIsReversed] = useState(false);

    // Derived values based on direction
    const currentFromUnit = isReversed ? toUnit : fromUnit;
    const currentToUnit = isReversed ? fromUnit : toUnit;
    const currentFromName = isReversed ? toName : fromName;
    const currentToName = isReversed ? fromName : toName;

    const convert = (val: number, reverse: boolean) => {
        if (isNaN(val)) return '';

        if (category === 'temperature') {
            if (!reverse) {
                // Celsius to Fahrenheit (or equivalent)
                return (val * ratio + offset).toFixed(4);
            } else {
                // Fahrenheit to Celsius (or equivalent)
                return ((val - offset) / ratio).toFixed(4);
            }
        }

        // Standard ratio conversion
        if (!reverse) {
            return (val * ratio).toFixed(4);
        } else {
            return (val / ratio).toFixed(4);
        }
    };

    const handleLeftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setLeftValue(val);
        if (val === '') {
            setRightValue('');
        } else {
            setRightValue(convert(parseFloat(val), isReversed));
        }
    };

    const handleRightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setRightValue(val);
        if (val === '') {
            setLeftValue('');
        } else {
            setLeftValue(convert(parseFloat(val), !isReversed));
        }
    };

    const toggleReverse = () => {
        setIsReversed(!isReversed);
        // Swap values to maintain consistency
        setLeftValue(rightValue);
        setRightValue(leftValue);
    };

    // Initial calculation or when props change (navigating between tools)
    useEffect(() => {
        setLeftValue('1');
        setRightValue(convert(1, false));
        setIsReversed(false);
    }, [ratio, offset, fromUnit, toUnit]);

    const exampleValues = [1, 5, 10, 50, 100, 500, 1000];

    return (
        <div className="min-h-screen flex flex-col bg-surface-50 dark:bg-surface-950">
            <Header />

            <main className="flex-grow pt-28 md:pt-32 pb-20 container mx-auto px-4 md:px-8 max-w-7xl">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-8">
                    <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
                    <ChevronRight size={12} />
                    <Link href="/convert" className="hover:text-brand-primary transition-colors">Converters</Link>
                    <ChevronRight size={12} />
                    <span className="capitalize">{category}</span>
                    <ChevronRight size={12} />
                    <span className="text-foreground">{currentFromName} to {currentToName}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 space-y-8">
                        {/* Hero / Tool Area */}
                        <section className="glass-card p-8 md:p-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 premium-gradient opacity-10 blur-3xl -mr-16 -mt-16" />

                            <h1 className="font-outfit text-3xl md:text-5xl font-black mb-4 tracking-tight">
                                {currentFromName} to {currentToName} Converter
                            </h1>
                            <p className="text-muted-foreground mb-12 font-medium">
                                Fast and accurate {category} conversion. Simply enter the value in either field to convert instantly.
                            </p>

                            <div className="bg-surface-100 dark:bg-surface-900 rounded-3xl p-8 md:p-12 border shadow-inner">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
                                    {/* Swap Button (Mobile) */}
                                    <button
                                        onClick={toggleReverse}
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background border-2 border-brand-primary text-brand-primary flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all shadow-xl md:hidden"
                                    >
                                        <ArrowUpDown size={20} />
                                    </button>

                                    <div className="space-y-3">
                                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">
                                            From: {currentFromName}
                                        </label>
                                        <div className="relative group">
                                            <input
                                                type="number"
                                                value={leftValue}
                                                onChange={handleLeftChange}
                                                className="w-full bg-background border-2 border-surface-200 dark:border-surface-800 rounded-2xl p-6 text-3xl font-black outline-none focus:border-brand-primary transition-all pr-24"
                                            />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-surface-100 dark:bg-surface-800 px-4 py-2 rounded-xl text-sm font-black border group-focus-within:border-brand-primary transition-colors">
                                                {currentFromUnit}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Desktop Swap Button */}
                                    <div className="hidden md:flex justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                                        <button
                                            onClick={toggleReverse}
                                            className="w-14 h-14 rounded-full bg-background border-2 border-brand-primary text-brand-primary flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all shadow-xl hover:rotate-180 duration-500"
                                            title="Swap Units"
                                        >
                                            <ArrowUpDown size={24} />
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">
                                            To: {currentToName}
                                        </label>
                                        <div className="relative group">
                                            <input
                                                type="number"
                                                value={rightValue}
                                                onChange={handleRightChange}
                                                className="w-full bg-background border-2 border-surface-200 dark:border-surface-800 rounded-2xl p-6 text-3xl font-black outline-none focus:border-brand-primary transition-all pr-24 text-brand-primary"
                                            />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-surface-100 dark:bg-surface-800 px-4 py-2 rounded-xl text-sm font-black border group-focus-within:border-brand-primary transition-colors">
                                                {currentToUnit}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8 text-center text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                    Formula: 1 {fromUnit} = {ratio} {toUnit} {offset !== 0 ? ` (+${offset} offset)` : ''}
                                </div>
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
                                Quick Conversion Table
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="overflow-hidden border rounded-3xl">
                                    <table className="w-full text-left">
                                        <thead className="bg-surface-50 dark:bg-surface-900 border-b">
                                            <tr>
                                                <th className="p-4 font-black text-xs tracking-widest uppercase">{fromUnit}</th>
                                                <th className="p-4 font-black text-xs tracking-widest uppercase">{toUnit}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {exampleValues.map((val) => (
                                                <tr key={val} className="border-b last:border-0 hover:bg-surface-100/50 dark:hover:bg-surface-800/50">
                                                    <td className="p-4 font-bold">{val}</td>
                                                    <td className="p-4 font-black text-brand-primary italic">
                                                        {category === 'temperature' ? (val * ratio + offset).toFixed(2) : (val * ratio).toFixed(4)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="overflow-hidden border rounded-3xl">
                                    <table className="w-full text-left">
                                        <thead className="bg-surface-50 dark:bg-surface-900 border-b">
                                            <tr>
                                                <th className="p-4 font-black text-xs tracking-widest uppercase">{toUnit}</th>
                                                <th className="p-4 font-black text-xs tracking-widest uppercase">{fromUnit}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {exampleValues.map((val) => (
                                                <tr key={val} className="border-b last:border-0 hover:bg-surface-100/50 dark:hover:bg-surface-800/50">
                                                    <td className="p-4 font-bold">{val}</td>
                                                    <td className="p-4 font-black text-brand-primary italic">
                                                        {category === 'temperature' ? ((val - offset) / ratio).toFixed(2) : (val / ratio).toFixed(4)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>

                        {/* Complete Guide SEO Article */}
                        <section className="glass-card p-8 md:p-12">
                            <h2 className="font-outfit text-2xl font-bold mb-6 italic flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                                    <Info size={18} />
                                </div>
                                Guide: Converting {currentFromName} to {currentToName}
                            </h2>
                            <div className="space-y-4">
                                {generateConversionArticle(currentFromName, currentToName, currentFromUnit, currentToUnit, category, ratio).map((paragraph: string, idx: number) => (
                                    <p key={idx} className="text-muted-foreground leading-relaxed">
                                        {paragraph}
                                    </p>
                                ))}
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
                            <div className="space-y-8">
                                <div className="p-6 rounded-2xl bg-surface-50 dark:bg-surface-900/50 border">
                                    <h4 className="font-black mb-3">How do I convert {currentFromName} to {currentToName}?</h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                                        To convert {currentFromName} to {currentToName}, simply enter your value in the first field. Our tool calculates the result instantly based on high-precision conversion ratios.
                                    </p>
                                </div>
                                <div className="p-6 rounded-2xl bg-surface-50 dark:bg-surface-900/50 border">
                                    <h4 className="font-black mb-3">Is this {category} conversion accurate?</h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                                        Yes, our tool uses standard international conversion constants. for example, 1 {fromName} is exactly {ratio} {toName}. We provide up to 4 decimal places of precision for critical calculations.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    <aside className="lg:col-span-4 space-y-8">
                        <AdPlaceholder type="sidebar" />
                        <div className="glass-card p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/5 blur-2xl rounded-full -mr-8 -mt-8" />
                            <h3 className="font-outfit font-bold text-xl mb-6 italic">Popular {category} Conversions</h3>
                            <div className="grid grid-cols-1 gap-3">
                                <Link href="/convert/kg-to-lb" className="flex items-center justify-between p-4 rounded-xl border bg-surface-50 dark:bg-surface-900/50 hover:border-brand-primary hover:bg-background transition-all group">
                                    <span className="text-sm font-bold group-hover:text-brand-primary transition-colors">Kilograms to Pounds</span>
                                    <ChevronRight size={14} className="text-muted-foreground group-hover:text-brand-primary transition-colors" />
                                </Link>
                                <Link href="/convert/km-to-mi" className="flex items-center justify-between p-4 rounded-xl border bg-surface-50 dark:bg-surface-900/50 hover:border-brand-primary hover:bg-background transition-all group">
                                    <span className="text-sm font-bold group-hover:text-brand-primary transition-colors">Kilometers to Miles</span>
                                    <ChevronRight size={14} className="text-muted-foreground group-hover:text-brand-primary transition-colors" />
                                </Link>
                                <Link href="/convert/m-to-ft" className="flex items-center justify-between p-4 rounded-xl border bg-surface-50 dark:bg-surface-900/50 hover:border-brand-primary hover:bg-background transition-all group">
                                    <span className="text-sm font-bold group-hover:text-brand-primary transition-colors">Meters to Feet</span>
                                    <ChevronRight size={14} className="text-muted-foreground group-hover:text-brand-primary transition-colors" />
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
