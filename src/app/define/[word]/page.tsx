import { DictionaryTemplate } from '@/components/tools/DictionaryTemplate';
import { fetchWordData } from '@/lib/dictionary-api';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';

interface PageProps {
    params: Promise<{
        word: string;
    }>;
}

import { SITE_URL, SITE_NAME } from '@/lib/config';
import { topWords } from '@/lib/data-dictionaries';

// Generate static params for all words in dictionary
export async function generateStaticParams() {
    return topWords.map(word => ({
        word: word.toLowerCase()
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { word } = await params;
    const wordData = await fetchWordData(word);

    if (!wordData) return { title: 'Definition Not Found' };

    // Get first definition text
    const firstDef = wordData.meanings[0]?.definitions[0]?.definition || '';
    const canonical = `/define/${word.toLowerCase()}`;

    return {
        title: `What is the meaning of ${word}? - English Definition & Examples`,
        description: `Explore the meaning, pronunciation, and examples of the word "${word}". ${firstDef.slice(0, 100)}...`,
        keywords: `${word}, definition of ${word}, ${wordData.meanings[0]?.partOfSpeech || 'word'}, ${word} meaning, dictionary`,
        alternates: { canonical },
        openGraph: {
            title: `What is the meaning of ${word}? - English Definition & Examples`,
            description: `Explore the meaning, pronunciation, and examples of the word "${word}". ${firstDef.slice(0, 100)}...`,
            type: 'website',
            url: `${SITE_URL}${canonical}`,
            siteName: SITE_NAME,
            images: [
                {
                    url: `/og.png`,
                    width: 1200,
                    height: 630,
                    alt: `What is the meaning of ${word}? - English Definition & Examples`,
                },
            ],
        },
        twitter: {
            title: `What is the meaning of ${word}? - English Definition & Examples`,
            description: `Explore the meaning, pronunciation, and examples of the word "${word}". ${firstDef.slice(0, 100)}...`,
            card: 'summary_large_image',
            images: [`/og.png`],
        },
    };
}

export default async function WordPage({ params }: PageProps) {
    const { word } = await params;
    const wordData = await fetchWordData(word);

    if (!wordData) notFound();

    return (
        <>
            <JsonLd data={{
                "@context": "https://schema.org",
                "@type": "DefinedTerm",
                "name": wordData.word,
                "description": wordData.meanings[0]?.definitions[0]?.definition,
                "inDefinedTermSet": {
                    "@type": "DefinedTermSet",
                    "name": "English Dictionary",
                    "url": `${SITE_URL}/define`
                }
            }} />
            <DictionaryTemplate
                word={wordData.word}
                phonetic={wordData.phonetic}
                meanings={wordData.meanings}
            />
        </>
    );
}
