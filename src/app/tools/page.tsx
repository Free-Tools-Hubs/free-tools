import { categories } from '@/data/categories';
import { tools } from '@/data/tools';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import { ChevronRight, LayoutGrid, List } from 'lucide-react';

export const metadata = {
    title: 'All Free Online Tools | FreeToolsHub',
    description: 'Browse our complete directory of 100+ free online tools for images, PDF, text, development, and more.',
};

export default function AllToolsPage() {
    return (
        <div className="min-h-screen flex flex-col bg-surface-50 dark:bg-surface-950">
            <Header />

            <main className="flex-grow pt-28 md:pt-32 pb-20 container mx-auto px-4 md:px-8 max-w-7xl">
                <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-12">
                    <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
                    <ChevronRight size={12} />
                    <span className="text-foreground">All Tools</span>
                </nav>

                <section className="mb-20 text-center max-w-3xl mx-auto">
                    <h1 className="font-outfit text-5xl font-black tracking-tight mb-6 italic">The Tool Directory</h1>
                    <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                        Discover a curated collection of specialized utilities designed for modern workflows.
                        Search by category or use the shortcut <kbd className="px-1.5 py-0.5 rounded border bg-background text-xs mx-1">⌘K</kbd> to find anything.
                    </p>
                </section>

                <div className="space-y-24">
                    {categories.map((cat) => {
                        const Icon = (LucideIcons as any)[cat.icon] || LucideIcons.Zap;
                        const categoryTools = tools.filter((t) => t.category === cat.id);

                        if (categoryTools.length === 0) return null;

                        return (
                            <section key={cat.id} className="relative">
                                <div className="flex items-center justify-between mb-8 pb-4 border-b">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-surface-100 dark:bg-surface-800 flex items-center justify-center text-brand-primary">
                                            <Icon size={20} />
                                        </div>
                                        <h2 className="font-outfit text-2xl font-black">{cat.title}</h2>
                                    </div>
                                    <Link href={`/tools/${cat.id}`} className="text-xs font-bold text-muted-foreground hover:text-brand-primary transition-colors uppercase tracking-widest">
                                        View All {cat.title}
                                    </Link>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {categoryTools.map((tool) => {
                                        const ToolIcon = (LucideIcons as any)[tool.icon] || LucideIcons.Zap;
                                        return (
                                            <Link
                                                key={tool.id}
                                                href={`/tools/${tool.category}/${tool.slug}`}
                                                className="flex items-center gap-4 p-4 rounded-2xl border bg-background hover:border-brand-primary hover:shadow-lg hover:scale-[1.02] transition-all group"
                                            >
                                                <div className="w-10 h-10 rounded-xl bg-surface-50 dark:bg-surface-900 flex items-center justify-center shrink-0 group-hover:text-brand-primary transition-colors">
                                                    <ToolIcon size={18} />
                                                </div>
                                                <div className="flex-grow">
                                                    <h4 className="font-bold text-sm mb-0.5">{tool.title}</h4>
                                                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">{tool.category}</p>
                                                </div>
                                            </Link>
                                        )
                                    })}
                                </div>
                            </section>
                        );
                    })}
                </div>
            </main>

            <Footer />
        </div>
    );
}
