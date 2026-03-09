import { topWords } from '@/lib/data-dictionaries';
import { BookOpen, Languages, Sparkles, MessageSquare, Info } from 'lucide-react';
import { ClientSearch } from '@/components/tools/ClientSearch';
import { ExplorerGrid } from '@/components/tools/ExplorerGrid';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { generateDictionaryHubArticle } from '@/lib/seo-generator';

import { JsonLd } from '@/components/seo/JsonLd';

export const metadata = {
    title: 'Free Online Dictionary - Definitions, Phonetics & Usage | FreeToolsHub',
    description: 'Quickly find reliable definitions, phonetic pronunciations, and usage examples for thousands of English words. A clean, fast, and free online dictionary.',
    keywords: ['online dictionary', 'word definitions', 'english dictionary', 'meaning of words', 'vocabulary tool', 'linguistic resource'],
    openGraph: {
        title: 'Free Online Dictionary - Definitions, Phonetics & Usage | FreeToolsHub',
        description: 'Quickly find reliable definitions, phonetic pronunciations, and usage examples for thousands of English words. A clean, fast, and free online dictionary.',
        type: 'website',
        url: 'https://free-tools-steel.vercel.app/define',
        siteName: 'Free Tools Hub',
    },
    twitter: {
        title: 'Free Online Dictionary - Definitions, Phonetics & Usage | FreeToolsHub',
        description: 'Quickly find reliable definitions, phonetic pronunciations, and usage examples for thousands of English words. A clean, fast, and free online dictionary.',
    }
};

export default function DictionaryHubPage() {
    const article = generateDictionaryHubArticle();

    return (
        <div className="min-h-screen flex flex-col bg-surface-50 dark:bg-surface-950">
            <JsonLd data={{
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "English Dictionary Hub | FreeToolsHub",
                "description": "Free online resource for word definitions and English vocabulary.",
                "url": "https://free-tools-steel.vercel.app/define"
            }} />
            <Header />

            <main className="flex-grow pt-32 pb-20 container mx-auto px-4 max-w-6xl">
                {/* Hero Section */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-sm mb-6 border border-brand-primary/20">
                        <Languages size={16} />
                        <span>Advanced Semantic Discovery Engine</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 font-outfit tracking-tight leading-tight">
                        Online <span className="text-brand-primary">Dictionary</span>
                    </h1>
                    <p className="text-muted-foreground text-xl leading-relaxed">
                        Master the English language with precise architectural analysis of definitions, phonetics, and contextual usage.
                    </p>
                </div>

                {/* Search Interaction */}
                <div className="mb-20">
                    <ClientSearch basePath="/define" placeholder="Search a word (e.g. resilient, epiphany, innovative...)" />
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    <div className="glass-card p-8 group hover:!border-brand-primary/50 transition-all">
                        <div className="w-12 h-12 rounded-2xl bg-violet-500/10 text-violet-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Sparkles size={24} />
                        </div>
                        <h3 className="text-xl font-bold font-outfit mb-3">Clear Definitions</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">High-accuracy semantic explanations broken down by part of speech for maximum linguistic clarity.</p>
                    </div>
                    <div className="glass-card p-8 group hover:!border-brand-primary/50 transition-all">
                        <div className="w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <MessageSquare size={24} />
                        </div>
                        <h3 className="text-xl font-bold font-outfit mb-3">Usage Examples</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">Real-world contextual applications showing you precisely how to deploy new vocabulary in professional settings.</p>
                    </div>
                    <div className="glass-card p-8 group hover:!border-brand-primary/50 transition-all">
                        <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <BookOpen size={24} />
                        </div>
                        <h3 className="text-xl font-bold font-outfit mb-3">Phonetic Guides</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">Standardized phonetic transcriptions helping you perfect your enunciation and verbal communication flow.</p>
                    </div>
                </div>

                {/* The Alphabetical Explorer */}
                <ExplorerGrid
                    items={topWords.map(word => ({
                        label: word,
                        slug: word.toLowerCase().trim().replace(/\s+/g, '-')
                    }))}
                    basePath="/define"
                    title="Vocabulary"
                    itemIcon={<BookOpen size={14} />}
                />

                {/* Rich SEO Content Section */}
                <div className="mt-20 border-t pt-20">
                    <div className="max-w-4xl mx-auto space-y-12">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-black font-outfit flex items-center gap-3">
                                <Info className="text-brand-primary" />
                                Elevating Communication Through Language Mastery
                            </h2>
                            {article.map((para, i) => (
                                <p key={i} className="text-lg text-muted-foreground leading-relaxed text-justify">
                                    {para}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

