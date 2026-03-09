export async function fetchWordData(word: string) {
    try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, {
            next: { revalidate: 86400 } // Cache for 24 hours (definitions don't change often)
        });

        if (!res.ok) return null;

        const data = await res.json();
        return data[0]; // Returns first entry
    } catch (error) {
        return null;
    }
}
