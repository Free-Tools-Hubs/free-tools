import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { unicodeSymbols } from '@/data/unicode-symbols';
import Link from 'next/link';
import CopyButton from '@/components/ui/CopyButton';
import { Info, Code, LayoutGrid, Sparkles } from 'lucide-react';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const symbol = unicodeSymbols.find(s => s.slug === slug);
    
    if (!symbol) return { title: 'Symbol Not Found' };

    const title = `${symbol.char} ${symbol.name} Symbol | Unicode ${symbol.hex} | Symbol Hub`;
    const description = `Copy the ${symbol.name} (${symbol.char}) symbol. Get HTML entities, CSS codes, hex values, and detailed character information.`;

    return {
        title,
        description,
        keywords: [symbol.char, symbol.name, `unicode ${symbol.hex}`, `html code for ${symbol.char}`, 'css symbol code'],
        alternates: {
            canonical: `/symbols/${slug}`
        }
    };
}

export async function generateStaticParams() {
    return unicodeSymbols.map(symbol => ({
        slug: symbol.slug,
    }));
}

export default async function SymbolPage({ params }: Props) {
    const { slug } = await params;
    const symbol = unicodeSymbols.find(s => s.slug === slug);

    if (!symbol) notFound();

    const related = unicodeSymbols
        .filter(s => s.category === symbol.category && s.slug !== symbol.slug)
        .slice(0, 8);

    const cssCode = `\\${symbol.hex.replace('U+', '').padStart(4, '0')}`;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Hero Section */}
            <div className="bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 lg:p-12 mb-12 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] dark:opacity-[0.05] pointer-events-none select-none">
                     <span className="text-[20rem] font-serif leading-none">{symbol.char}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
                    <div className="flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-900 rounded-3xl p-12 border border-dashed border-zinc-200 dark:border-zinc-800 aspect-square lg:aspect-auto">
                        <span className="text-9xl lg:text-[12rem] font-serif leading-none mb-10 select-all">{symbol.char}</span>
                        <CopyButton value={symbol.char} label={`Copy Character`} className="px-8 py-4 text-lg" />
                    </div>

                    <div className="flex flex-col justify-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-full text-xs font-bold uppercase tracking-widest mb-6 w-fit">
                            <Sparkles size={14} />
                            Unicode {symbol.hex}
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-black mb-4 tracking-tight">
                            {symbol.name}
                        </h1>
                        <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed max-w-xl">
                            {symbol.description} This character belongs to the <strong>{symbol.category}</strong> category 
                            and is a standard part of the Unicode specification.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <CopyButton variant="card" label="HTML ENTITY" value={symbol.htmlEntity || `&#${symbol.decimal};`} />
                            <CopyButton variant="card" label="CSS CODE" value={cssCode} />
                            <CopyButton variant="card" label="HEX CODE" value={symbol.hex} />
                            <CopyButton variant="card" label="DECIMAL" value={symbol.decimal.toString()} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Hub - AdSense Optimized */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
                <div className="lg:col-span-2 space-y-12">
                    <section className="bg-white dark:bg-zinc-950 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Info className="text-brand-primary" />
                            Usage and Context
                        </h2>
                        <div className="prose dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400">
                            <p>
                                The <strong>{symbol.name}</strong> symbol is widely supported across modern operating systems, 
                                browsers, and applications. Since it has a unique Unicode point (<strong>{symbol.hex}</strong>), 
                                it ensures consistency whether it is displayed on a website, in a document, or within code.
                            </p>
                            <h3>How to use in Web Development</h3>
                            <p>
                                To display this symbol on a webpage, you should use the HTML Entity 
                                <code>{symbol.htmlEntity || `&#${symbol.decimal};`}</code>. For decorative elements in CSS, 
                                you can use the pseudo-element <code>::before</code> or <code>::after</code> with the 
                                <code>content: &quot;{cssCode}&quot;;</code> property.
                            </p>
                            <h3>Accessibility Best Practices</h3>
                            <p>
                                When using {symbol.category} symbols for meaning, always ensure screen reader accessibility 
                                by providing an <code>aria-label</code> or <code>alt</code> text that describes the 
                                symbol's functional purpose to the user.
                            </p>
                        </div>
                    </section>
                </div>

                <aside className="space-y-8">
                    <div className="bg-zinc-900 rounded-3xl p-8 text-white shadow-xl shadow-zinc-900/10">
                         <h3 className="font-bold mb-6 flex items-center gap-2">
                             <LayoutGrid className="text-brand-primary" size={20} />
                             Quick Actions
                         </h3>
                         <div className="space-y-4">
                            <Link href="/symbols" className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                <span className="text-sm font-semibold">View All Symbols</span>
                                <Info size={16} />
                            </Link>
                             <Link href="/tools/text" className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                <span className="text-sm font-semibold">Text Tools</span>
                                <Sparkles size={16} />
                            </Link>
                         </div>
                    </div>

                    <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800">
                        <h3 className="font-bold mb-4">AdSense Placeholder</h3>
                        <div className="h-64 bg-zinc-200 dark:bg-zinc-800 rounded-2xl flex items-center justify-center border-2 border-dashed border-zinc-300 dark:border-zinc-700">
                             <span className="text-xs uppercase font-bold text-zinc-400">Advertisement Area</span>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Related Symbols / Grid */}
            {related.length > 0 && (
                <section>
                    <div className="flex items-center justify-between mb-8 border-b border-zinc-100 dark:border-zinc-900 pb-6">
                        <h2 className="text-3xl font-black uppercase tracking-tight">Related {symbol.category} Symbols</h2>
                        <Link href="/symbols" className="text-sm font-bold text-brand-primary hover:underline">Explore All &rarr;</Link>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                        {related.map(s => (
                            <Link 
                                key={s.slug} 
                                href={`/symbols/${s.slug}`}
                                className="group p-6 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-brand-primary hover:scale-[1.02] active:scale-[0.98] transition-all text-center flex flex-col items-center shadow-sm hover:shadow-xl"
                            >
                                <span className="text-4xl font-serif mb-4 group-hover:scale-125 transition-transform">{s.char}</span>
                                <span className="block text-[8px] font-mono text-zinc-400 group-hover:text-brand-primary transition-colors uppercase">{s.name}</span>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
