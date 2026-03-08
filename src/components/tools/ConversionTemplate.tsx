import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AdPlaceholder } from '@/components/layout/AdPlaceholder';
import Link from 'next/link';
import { ChevronRight, RefreshCw, Info, HelpCircle } from 'lucide-react';

interface ConversionPageProps {
    fromUnit: string;
    toUnit: string;
    fromName: string;
    toName: string;
    ratio: number;
    category: string;
}

export function ConversionTemplate({ fromUnit, toUnit, fromName, toName, ratio, category }: ConversionPageProps) {
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
                    <span className="text-foreground">{fromName} to {toName}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 space-y-8">
                        {/* Hero / Tool Area */}
                        <section className="glass-card p-8 md:p-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 premium-gradient opacity-10 blur-3xl -mr-16 -mt-16" />

                            <h1 className="font-outfit text-3xl md:text-4xl font-black mb-4 tracking-tight">
                                Convert {fromName} to {toName} ({fromUnit} to {toUnit})
                            </h1>
                            <p className="text-muted-foreground mb-12 font-medium">
                                Fast and accurate {category} conversion from {fromName} to {toName} using our professional calculator.
                            </p>

                            <div className="bg-surface-100 dark:bg-surface-900 rounded-3xl p-8 md:p-12 border shadow-inner">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-2">{fromName}</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                defaultValue={1}
                                                className="w-full bg-background border-2 border-surface-200 dark:border-surface-800 rounded-2xl p-6 text-3xl font-black outline-none focus:border-brand-primary transition-all"
                                            />
                                            <span className="absolute right-6 top-1/2 -translate-y-1/2 bg-surface-100 dark:bg-surface-800 px-3 py-1 rounded-lg text-sm font-bold border">{fromUnit}</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-center md:pt-6">
                                        <div className="w-12 h-12 rounded-full glass border flex items-center justify-center text-brand-primary shadow-lg">
                                            <RefreshCw size={24} />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-2">{toName}</label>
                                        <div className="relative">
                                            <div className="w-full bg-surface-50 dark:bg-surface-950 border-2 border-surface-200 dark:border-surface-800 rounded-2xl p-6 text-3xl font-black text-brand-primary">
                                                {ratio.toFixed(4)}
                                            </div>
                                            <span className="absolute right-6 top-1/2 -translate-y-1/2 bg-surface-100 dark:bg-surface-800 px-3 py-1 rounded-lg text-sm font-bold border">{toUnit}</span>
                                        </div>
                                    </div>
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
                                {fromName} to {toName} Conversion Table
                            </h2>
                            <div className="overflow-hidden border rounded-2xl">
                                <table className="w-full text-left">
                                    <thead className="bg-surface-50 dark:bg-surface-900 border-b">
                                        <tr>
                                            <th className="p-4 font-bold text-sm tracking-widest uppercase">{fromName} ({fromUnit})</th>
                                            <th className="p-4 font-bold text-sm tracking-widest uppercase">{toName} ({toUnit})</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {exampleValues.map((val) => (
                                            <tr key={val} className="border-b last:border-0 hover:bg-surface-100/50 dark:hover:bg-surface-800/50">
                                                <td className="p-4 font-medium">{val} {fromUnit}</td>
                                                <td className="p-4 font-black italic text-brand-primary">{(val * ratio).toFixed(4)} {toUnit}</td>
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
                                Common Questions
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold mb-2">How do I convert {fromName} to {toName}?</h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        To convert {fromName} to {toName}, multiply the {fromName} value by {ratio}. For example, 1 {fromUnit} = {ratio} {toUnit}.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-2">Is this {category} conversion accurate?</h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        Yes, our tool uses high-precision mathematical constants to ensure all {category} conversions are accurate for professional and personal use.
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
                                <Link href={`/convert/${toUnit}-to-${fromUnit}`} className="block p-4 rounded-xl border bg-surface-50 dark:bg-surface-900/50 hover:border-brand-primary transition-all text-sm font-bold">
                                    {toName} to {fromName}
                                </Link>
                                <Link href="/convert/kg-to-lb" className="block p-4 rounded-xl border bg-surface-50 dark:bg-surface-900/50 hover:border-brand-primary transition-all text-sm font-bold">
                                    Kilograms to Pounds
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
