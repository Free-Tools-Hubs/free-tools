import React, { ReactNode } from 'react';
import Link from 'next/link';
import { ToolDefinition } from '@/types/tool';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AdPlaceholder } from '@/components/layout/AdPlaceholder';
import { tools } from '@/data/tools';
import * as LucideIcons from 'lucide-react';
import { ChevronRight, Share2, Info, HelpCircle, Star, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { generateToolSchema, generateFAQSchema } from '@/lib/seo';

interface ToolPageLayoutProps {
    tool: ToolDefinition;
    children: ReactNode;
}

export function ToolPageLayout({ tool, children }: ToolPageLayoutProps) {
    const Icon = (LucideIcons as any)[tool.icon] || LucideIcons.Zap;
    const relatedTools = tools.filter((t) => tool.relatedToolIds.includes(t.id));

    const toolSchema = generateToolSchema(tool);
    const faqSchema = generateFAQSchema(tool.faqs);

    return (
        <div className="min-h-screen flex flex-col bg-surface-50 dark:bg-surface-950">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <Header />

            <main className="flex-grow pt-28 md:pt-32 pb-20 container mx-auto px-4 md:px-8 max-w-7xl">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-8">
                    <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
                    <ChevronRight size={12} />
                    <Link href="/tools" className="hover:text-brand-primary transition-colors">Tools</Link>
                    <ChevronRight size={12} />
                    <Link href={`/tools/${tool.category}`} className="capitalize hover:text-brand-primary transition-colors">
                        {tool.category}
                    </Link>
                    <ChevronRight size={12} />
                    <span className="text-foreground">{tool.title}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Tool Header */}
                        <section className="glass-card p-8 md:p-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 premium-gradient opacity-10 blur-3xl -mr-16 -mt-16" />

                            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0 shadow-inner">
                                    <Icon size={32} />
                                </div>
                                <div className="flex-grow">
                                    <h1 className="font-outfit text-3xl md:text-4xl font-black mb-4 tracking-tight">
                                        {tool.title}
                                    </h1>
                                    <p className="text-muted-foreground leading-relaxed max-w-2xl font-medium">
                                        {tool.description}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="w-10 h-10 rounded-xl glass border flex items-center justify-center hover:text-brand-primary transition-colors">
                                        <Star size={18} />
                                    </button>
                                    <button className="w-10 h-10 rounded-xl glass border flex items-center justify-center hover:text-brand-primary transition-colors">
                                        <Share2 size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Tool Interface Wrapper */}
                            <div className="mt-12 p-1 bg-gradient-to-br from-surface-200 to-surface-100 dark:from-surface-800 dark:to-surface-900 rounded-2xl shadow-2xl">
                                <div className="bg-background rounded-[15px] min-h-[400px]">
                                    {children}
                                </div>
                            </div>
                        </section>

                        {/* Ad Content */}
                        <AdPlaceholder type="content" className="mb-8" />

                        {/* Detailed Info */}
                        <section className="glass-card p-8 md:p-12">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                                    <Info size={18} />
                                </div>
                                <h2 className="font-outfit text-2xl font-bold italic">Why use this tool?</h2>
                            </div>
                            <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                                <p className="mb-6">{tool.longDescription}</p>
                                <h3 className="text-foreground font-bold mb-4">How it works:</h3>
                                <p>{tool.usageExample}</p>
                            </div>
                        </section>

                        {/* FAQs */}
                        <section className="glass-card p-8 md:p-12">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center">
                                    <HelpCircle size={18} />
                                </div>
                                <h2 className="font-outfit text-2xl font-bold italic">Frequently Asked Questions</h2>
                            </div>
                            <div className="grid grid-cols-1 gap-6">
                                {tool.faqs.map((faq, i) => (
                                    <div key={i} className="group border-b pb-6 last:border-0 last:pb-0">
                                        <h4 className="font-bold mb-2 group-hover:text-brand-primary transition-colors">
                                            {faq.question}
                                        </h4>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-8">
                        <AdPlaceholder type="sidebar" />

                        {/* Categories */}
                        <div className="glass-card p-8">
                            <h3 className="font-outfit font-bold text-xl mb-6">Explore Tools</h3>
                            <div className="grid grid-cols-1 gap-4">
                                {relatedTools.length > 0 ? (
                                    relatedTools.map((t) => {
                                        const TIcon = (LucideIcons as any)[t.icon] || LucideIcons.Zap;
                                        return (
                                            <Link
                                                key={t.id}
                                                href={`/tools/${t.category}/${t.slug}`}
                                                className="flex items-center gap-4 p-4 rounded-xl border bg-surface-50 dark:bg-surface-900/50 hover:border-brand-primary transition-all group"
                                            >
                                                <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center group-hover:text-brand-primary transition-colors">
                                                    <TIcon size={20} />
                                                </div>
                                                <span className="font-bold text-sm">{t.title}</span>
                                            </Link>
                                        )
                                    })
                                ) : (
                                    <p className="text-xs text-muted-foreground italic">No related tools found yet.</p>
                                )}
                            </div>
                        </div>

                        {/* Premium Callout */}
                        <div className="premium-gradient p-8 rounded-2xl text-white shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-150 transition-transform duration-700">
                                <Sparkles size={120} />
                            </div>
                            <h3 className="font-outfit font-bold text-2xl mb-4 relative z-10 italic">Free Forever.</h3>
                            <p className="text-sm opacity-90 leading-relaxed mb-6 relative z-10 font-medium">
                                This platform is powered by the community. We never charge for professional utilities.
                            </p>
                            <button className="w-full py-3 bg-white text-brand-primary rounded-xl font-bold text-sm hover:bg-opacity-90 transition-all relative z-10 shadow-lg">
                                Buy us a coffee
                            </button>
                        </div>
                    </aside>
                </div>
            </main>

            <Footer />
            {/* Sticky Mobile Ad */}
            <AdPlaceholder type="sticky-mobile" className="z-[100]" />
        </div>
    );
}
