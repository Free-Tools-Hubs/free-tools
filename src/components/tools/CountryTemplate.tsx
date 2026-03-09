'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AdPlaceholder } from '@/components/layout/AdPlaceholder';
import Link from 'next/link';
import { ChevronRight, Globe, MapPin, Users, Coins, MessageSquare, Phone, HelpCircle, Info } from 'lucide-react';
import type { Country } from '@/data/countries';
import { generateCountryArticle } from '@/lib/seo-generator';

export function CountryTemplate({ name, capital, region, population, currency, languages, callingCode, description }: Country) {
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
                    <span className="capitalize">Country Info</span>
                    <ChevronRight size={12} />
                    <span className="text-foreground">{name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 space-y-8">
                        {/* Hero Area */}
                        <section className="glass-card p-8 md:p-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 premium-gradient opacity-10 blur-3xl -mr-16 -mt-16" />

                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-brand-primary/10 rounded-xl text-brand-primary">
                                    <Globe size={28} />
                                </div>
                                <h1 className="font-outfit text-3xl md:text-5xl font-black tracking-tight">
                                    {name}
                                </h1>
                            </div>

                            <p className="text-muted-foreground mb-12 font-medium text-lg">
                                {description}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-surface-100 dark:bg-surface-900 rounded-2xl p-6 border flex items-start gap-4">
                                    <MapPin className="text-muted-foreground mt-1" size={20} />
                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Capital City</div>
                                        <div className="font-bold text-lg">{capital}</div>
                                    </div>
                                </div>
                                <div className="bg-surface-100 dark:bg-surface-900 rounded-2xl p-6 border flex items-start gap-4">
                                    <Globe className="text-muted-foreground mt-1" size={20} />
                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Region</div>
                                        <div className="font-bold text-lg">{region}</div>
                                    </div>
                                </div>
                                <div className="bg-surface-100 dark:bg-surface-900 rounded-2xl p-6 border flex items-start gap-4">
                                    <Users className="text-muted-foreground mt-1" size={20} />
                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Population</div>
                                        <div className="font-bold text-lg">{population}</div>
                                    </div>
                                </div>
                                <div className="bg-surface-100 dark:bg-surface-900 rounded-2xl p-6 border flex items-start gap-4">
                                    <Coins className="text-muted-foreground mt-1" size={20} />
                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Currency</div>
                                        <div className="font-bold text-lg">{currency}</div>
                                    </div>
                                </div>
                                <div className="bg-surface-100 dark:bg-surface-900 rounded-2xl p-6 border flex items-start gap-4">
                                    <MessageSquare className="text-muted-foreground mt-1" size={20} />
                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Languages</div>
                                        <div className="font-bold text-lg">{languages.join(', ')}</div>
                                    </div>
                                </div>
                                <div className="bg-surface-100 dark:bg-surface-900 rounded-2xl p-6 border flex items-start gap-4">
                                    <Phone className="text-muted-foreground mt-1" size={20} />
                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Calling Code</div>
                                        <div className="font-bold text-lg">{callingCode}</div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Ad */}
                        <AdPlaceholder type="content" />

                        {/* Complete Guide SEO Article */}
                        <section className="glass-card p-8 md:p-12">
                            <h2 className="font-outfit text-2xl font-bold mb-6 italic flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                                    <Info size={18} />
                                </div>
                                Complete Guide to {name}
                            </h2>
                            <div className="space-y-4">
                                {generateCountryArticle(name, capital, region, population.toString(), currency, languages.join(', ')).map((paragraph: string, idx: number) => (
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
                                Quick Facts about {name}
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold mb-2">What is the capital of {name}?</h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        The capital of {name} is {capital}.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-2">What language is spoken in {name}?</h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        The primary language(s) spoken in {name}: {languages.join(', ')}.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-2">What currency is used in {name}?</h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        The currency used is {currency}.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    <aside className="lg:col-span-4 space-y-8">
                        <AdPlaceholder type="sidebar" />
                        <div className="glass-card p-8">
                            <h3 className="font-outfit font-bold text-xl mb-6 italic">More Countries</h3>
                            <div className="space-y-3">
                                <Link href="/country/brazil" className="block p-4 rounded-xl border bg-surface-50 dark:bg-surface-900/50 hover:border-brand-primary transition-all text-sm font-bold">
                                    Facts about Brazil
                                </Link>
                                <Link href="/country/japan" className="block p-4 rounded-xl border bg-surface-50 dark:bg-surface-900/50 hover:border-brand-primary transition-all text-sm font-bold">
                                    Facts about Japan
                                </Link>
                                <Link href="/country/sri-lanka" className="block p-4 rounded-xl border bg-surface-50 dark:bg-surface-900/50 hover:border-brand-primary transition-all text-sm font-bold">
                                    Facts about Sri Lanka
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
