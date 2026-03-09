export async function getExchangeRate(from: string, to: string) {
    try {
        // Current free API that doesn't require key for some queries, 
        // or provides a simple fallback.
        // For production, ExchangeRate-API or OpenExchangeRates should be used.
        const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`, {
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!res.ok) throw new Error('Failed to fetch exchange rates');

        const data = await res.json();
        return data.rates[to] || null;
    } catch (error) {
        console.error('Error fetching currency data:', error);
        return null;
    }
}

export async function getAllCurrencyRates(base: string) {
    try {
        const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${base}`, {
            next: { revalidate: 3600 }
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data.rates;
    } catch (error) {
        return null;
    }
}
