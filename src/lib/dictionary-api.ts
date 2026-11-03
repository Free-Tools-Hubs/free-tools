import { cache } from 'react';
import dictionaryDataRaw from '@/data/dictionary-data.json';

export interface WordMeaning {
    partOfSpeech: string;
    definitions: Array<{
        definition: string;
        example?: string;
    }>;
    synonyms: string[];
    antonyms: string[];
}

export interface WordData {
    word: string;
    phonetic?: string;
    meanings: WordMeaning[];
}

const dictionaryData = dictionaryDataRaw as Record<string, WordData>;

export const fetchWordData = cache(async (word: string): Promise<WordData | null> => {
    try {
        const cleanWord = word.trim().toLowerCase();
        if (!cleanWord) return null;

        // 1. Instant local lookup from offline dictionary dataset (2,070 curated words)
        if (dictionaryData[cleanWord]) {
            return dictionaryData[cleanWord];
        }

        // 2. Fallback network lookup for runtime dynamic word requests
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(cleanWord)}`);
        if (!res.ok) return null;

        const data = await res.json();
        if (!Array.isArray(data) || !data.length) return null;
        return data[0];
    } catch (error) {
        return null;
    }
});
