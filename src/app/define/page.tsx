import { topWords } from '@/lib/data-dictionaries';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import { ClientSearch } from '@/components/tools/ClientSearch';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

import { JsonLd } from '@/components/seo/JsonLd';

export const metadata = {
    title: 'Free Online Dictionary - Definitions, Synonyms & Examples',
    description: 'Quickly find reliable definitions, phonetic pronunciations, and usage examples for thousands of English words. A clean, fast, and free online dictionary.',
    keywords: ['online dictionary', 'word definitions', 'english dictionary', 'meaning of words', 'vocabulary tool'],
    openGraph: {
        title: 'Free Online Dictionary - Definitions, Synonyms & Examples',
        description: 'Quickly find reliable definitions, phonetic pronunciations, and usage examples for thousands of English words. A clean, fast, and free online dictionary.',
        type: 'website',
        url: 'https://free-tools-steel.vercel.app/define',
        siteName: 'Free Tools',
        images: [
            {
                url: 'https://free-tools-steel.vercel.app/define.png',
                width: 1200,
                height: 630,
                alt: 'Free Online Dictionary - Definitions, Synonyms & Examples',
            },
        ],
    },
    twitter: {
        title: 'Free Online Dictionary - Definitions, Synonyms & Examples',
        description: 'Quickly find reliable definitions, phonetic pronunciations, and usage examples for thousands of English words. A clean, fast, and free online dictionary.',
        card: 'summary_large_image',
        images: [
            {
                url: 'https://free-tools-steel.vercel.app/define.png',
                width: 1200,
                height: 630,
                alt: 'Free Online Dictionary - Definitions, Synonyms & Examples',
            },
        ],
    },
};

export default function DictionaryHubPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <JsonLd data={{
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "English Dictionary Hub",
                "description": "Free online resource for word definitions and English vocabulary.",
                "url": "https://free-tools-steel.vercel.app/define"
            }} />
            <Header />
            <main className="flex-grow pt-32 pb-20 container mx-auto px-4 max-w-5xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 font-outfit">English Dictionary & Definitions</h1>
                    <p className="text-muted-foreground text-lg">Search for a word or browse popular definitions below.</p>
                </div>

                <ClientSearch basePath="/define" placeholder="E.g. productivity, serendipity, resilient..." />

                <div className="mb-8 p-8 glass-card">
                    <h2 className="text-2xl font-bold mb-6 font-outfit text-center">Popular Words</h2>
                    <div className="flex flex-wrap gap-3 justify-center">
                        {topWords.map(word => (
                            <Link
                                key={word}
                                href={`/define/${word.toLowerCase()}`}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-background hover:bg-surface-50 dark:hover:bg-surface-900 !border-border hover:!border-brand-primary transition-all shadow-sm"
                            >
                                <BookOpen size={14} className="text-brand-primary" />
                                <span className="font-medium">{word}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
