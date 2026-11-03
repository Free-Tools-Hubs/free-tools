import { cache } from 'react';

/**
 * Fetch exchange rate between two currencies.
 * Uses React cache() for request deduplication across metadata and page execution.
 */
export const getExchangeRate = cache(async (from: string, to: string): Promise<number | null> => {
    try {
        const cleanFrom = from.trim().toUpperCase();
        const cleanTo = to.trim().toUpperCase();

        const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${encodeURIComponent(cleanFrom)}`);

        if (!res.ok) return null;

        const data = await res.json();
        return (data && data.rates && data.rates[cleanTo]) ? data.rates[cleanTo] : null;
    } catch (error) {
        console.error(`Error fetching currency rate for ${from}->${to}:`, error);
        return null;
    }
});

export const getAllCurrencyRates = cache(async (base: string): Promise<Record<string, number> | null> => {
    try {
        const cleanBase = base.trim().toUpperCase();
        const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${encodeURIComponent(cleanBase)}`);
        if (!res.ok) return null;
        const data = await res.json();
        return data?.rates || null;
    } catch (error) {
        return null;
    }
});
