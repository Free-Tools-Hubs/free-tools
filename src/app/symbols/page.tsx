import { Metadata } from 'next';
import { unicodeSymbols, symbolCategories } from '@/data/unicode-symbols';
import Link from 'next/link';
import SymbolExplorer from './SymbolExplorer';
import { Sparkles, LucideIcon, Sigma, Heart, DollarSign, MoveRight, Type, Binary, Code } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Unicode Symbol Hub | Copy Symbols, Emojis & HTML Codes | Free Tools Hubs',
    description: 'Find and copy thousands of Unicode symbols, arrows, currency signs, and emojis. Get HTML entities, CSS codes, and technical details for any character.',
    keywords: ['unicode hub', 'copy symbols', 'html entity list', 'css codes for symbols', 'math symbols', 'emoji codes'],
    alternates: {
        canonical: '/symbols'
    }
};

const iconMap: Record<string, LucideIcon> = {
    'math': Sigma,
    'emoji': Heart,
    'currency': DollarSign,
    'arrow': MoveRight,
    'greek': Type,
    'technical': Binary
};

export default function SymbolsIndex() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-20 pb-40">
            {/* Hero Section */}
            <div className="text-center mb-20">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/10 text-brand-primary rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-brand-primary/20">
                    <Sparkles size={14} />
                    The Complete Unicode Hub
                </div>
                <h1 className="text-6xl lg:text-9xl font-black mb-8 tracking-tighter italic bg-gradient-to-br from-zinc-950 to-zinc-500 dark:from-white dark:to-zinc-600 bg-clip-text text-transparent">
                    Symbol Hub
                </h1>
                <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-12">
                    Your interactive dictionary for every character.
                    Copy, transform, and understand the technical representation of thousands of symbols instantly.
                </p>
                <SymbolExplorer />
            </div>

            {/* Grid Sections */}
            <div className="space-y-32">
                {symbolCategories.map(section => {
                    const CategoryIcon = iconMap[section.id] || Sparkles;
                    const items = unicodeSymbols.filter(s => s.category === section.id);

                    return (
                        <section key={section.id}>
                            <div className="flex items-end justify-between mb-10 border-b-2 border-zinc-100 dark:border-zinc-900 pb-6">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-zinc-950 dark:bg-white rounded-3xl flex items-center justify-center text-white dark:text-zinc-950 shadow-2xl">
                                        <CategoryIcon size={32} />
                                    </div>
                                    <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight italic">{section.title}</h2>
                                </div>
                                <span className="hidden sm:block text-xs font-mono text-zinc-400 tracking-[0.2em] uppercase font-bold px-4 py-2 border rounded-full bg-zinc-50 dark:bg-zinc-950">
                                    {items.length} SEEDED SYMBOLS
                                </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-4">
                                {items.map((s) => (
                                    <Link
                                        key={s.slug}
                                        href={`/symbols/${s.slug}`}
                                        className="group p-8 bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-200 dark:border-zinc-800 hover:border-brand-primary hover:shadow-2xl hover:shadow-brand-primary/5 transition-all flex flex-col items-center justify-center hover:scale-[1.05] active:scale-[0.95]"
                                    >
                                        <span className="text-5xl font-serif mb-6 group-hover:scale-125 transition-all select-none">{s.char}</span>
                                        <div className="text-center w-full px-1 overflow-hidden">
                                            <span className="block text-[8px] font-black text-zinc-900 dark:text-zinc-100 group-hover:text-brand-primary transition-colors uppercase truncate tracking-tighter mb-1">{s.name}</span>
                                            <span className="block text-[7px] font-mono text-zinc-500 uppercase tracking-widest">{s.hex}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    );
                })}
            </div>

            {/* Educational SEO Depth */}
            <section className="mt-40 prose dark:prose-invert max-w-4xl mx-auto border-t-2 border-zinc-100 dark:border-zinc-900 pt-32">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black mb-6 italic">Why Unicode is Essential for Modern Web Design</h2>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
                        Unicode is a global computing standard designed to support the consistent representation of characters across cultures, platforms, and devices.
                        Unlike legacy systems that struggled with special symbols, Unicode provides a single, universal identifier for thousands of mathematical expressions,
                        currency signs, and emotional icons like emojis.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left bg-zinc-50/50 dark:bg-zinc-900/50 p-12 rounded-4xl border border-zinc-200 dark:border-zinc-800">
                    <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Code size={18} className="text-brand-primary" />
                            HTML Entities & Web Accessibility
                        </h3>
                        <p className="text-sm leading-relaxed text-zinc-500">
                            Using HTML entities (e.g., &amp;sum; or &amp;#8721;) ensures that your text remains compatible even with older browsers or email clients
                            that might not natively parse raw Unicode characters. Furthermore, symbols provided by our hub are standardized, meaning they play well
                            with screen readers and high-contrast accessibility tools.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Sparkles size={18} className="text-brand-primary" />
                            Dynamic Scalability
                        </h3>
                        <p className="text-sm leading-relaxed text-zinc-500">
                            Our Symbol Hub is designed to help creatives and developers find the exact CSS representation for symbols.
                            Using \HEX codes in your stylesheets allows for scalable, vector-like icons that don't require external SVG libraries,
                            reducing your website's bundle size and improving overall load time.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
