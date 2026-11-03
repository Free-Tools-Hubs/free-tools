import { MetadataRoute } from 'next';
import { tools } from '@/data/tools';
import { categories } from '@/data/categories';
import conversions from '@/data/conversions';
import times from '@/data/times';
import countdowns from '@/data/countdowns';
import countries from '@/data/countries';
import randoms from '@/data/randoms';
import { commonCurrencyPairs } from '@/data/currencies';
import { topCities, topWords } from '@/lib/data-dictionaries';
import { namedColors } from '@/data/named-colors';
import { normalizeHex } from '@/lib/color-utils';
import { fileExtensions } from '@/data/file-extensions';
import { unicodeSymbols } from '@/data/unicode-symbols';
import { SITE_URL } from '@/lib/config';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = SITE_URL;
    const staticLastModified = new Date('2026-03-08T00:00:00.000Z');

    // 1. Core indexable hub pages (Utility pages like /privacy, /terms, /disclaimer, /contact have noindex and are omitted)
    const coreRoutes: MetadataRoute.Sitemap = [
        '',
        '/tools',
        '/about',
        '/city',
        '/country',
        '/define',
        '/currency',
        '/convert',
        '/random',
        '/time',
        '/countdown',
        '/colors',
        '/file-extension',
        '/symbols'
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: staticLastModified,
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1.0 : 0.9,
    }));

    // 2. Category routes
    const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
        url: `${baseUrl}/tools/${cat.id}`,
        lastModified: staticLastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // 3. Tool routes (Filter out tools that have customPath redirects to prevent redirecting URLs in sitemap)
    const toolRoutes: MetadataRoute.Sitemap = tools
        .filter((tool) => !tool.customPath)
        .map((tool) => ({
            url: `${baseUrl}/tools/${tool.category}/${tool.slug}`,
            lastModified: tool.lastUpdated ? new Date(tool.lastUpdated) : staticLastModified,
            changeFrequency: 'monthly' as const,
            priority: 0.9,
        }));

    // 4. Color Hub routes (Deduplicated unique hexes)
    const uniqueHexes = Array.from(new Set(namedColors.map((color) => normalizeHex(color.hex))));
    const colorRoutes: MetadataRoute.Sitemap = uniqueHexes.map((hex) => ({
        url: `${baseUrl}/colors/${hex}`,
        lastModified: staticLastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    // 5. File Encyclopedia routes
    const fileRoutes: MetadataRoute.Sitemap = fileExtensions.map((file) => ({
        url: `${baseUrl}/file-extension/${file.ext.toLowerCase()}`,
        lastModified: staticLastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    // 6. Symbol Hub routes
    const symbolRoutes: MetadataRoute.Sitemap = unicodeSymbols.map((s) => ({
        url: `${baseUrl}/symbols/${s.slug}`,
        lastModified: staticLastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    // 7. Programmatic Tool routes (Conversions, Time, Countdowns)
    const conversionRoutes: MetadataRoute.Sitemap = conversions.map((c) => ({
        url: `${baseUrl}/convert/${c.slug}`,
        lastModified: staticLastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    const timeRoutes: MetadataRoute.Sitemap = times.map((t) => ({
        url: `${baseUrl}/time/${t.slug}`,
        lastModified: staticLastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    const countdownRoutes: MetadataRoute.Sitemap = countdowns.map((c) => ({
        url: `${baseUrl}/countdown/${c.slug}`,
        lastModified: staticLastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    // 8. Data Hubs (Countries, Randoms, Currencies)
    const countryRoutes: MetadataRoute.Sitemap = countries.map((c) => ({
        url: `${baseUrl}/country/${c.slug}`,
        lastModified: staticLastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    const randomRoutes: MetadataRoute.Sitemap = randoms.map((r) => ({
        url: `${baseUrl}/random/${r.slug}`,
        lastModified: staticLastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    const currencyRoutes: MetadataRoute.Sitemap = commonCurrencyPairs.map((p) => ({
        url: `${baseUrl}/currency/${p.from.toLowerCase()}-to-${p.to.toLowerCase()}`,
        lastModified: staticLastModified,
        changeFrequency: 'daily' as const,
        priority: 0.8,
    }));

    // 9. Dictionary routes (Unique top words)
    const uniqueWords = Array.from(new Set(topWords.map((w) => w.trim().toLowerCase())));
    const dictionaryRoutes: MetadataRoute.Sitemap = uniqueWords.map((word) => ({
        url: `${baseUrl}/define/${word}`,
        lastModified: staticLastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.5,
    }));

    // 10. City routes (Deduplicated and normalized slug)
    const uniqueCitySlugs = Array.from(
        new Set(topCities.map((city) => city.trim().toLowerCase().replace(/ /g, '-')))
    );
    const cityRoutes: MetadataRoute.Sitemap = uniqueCitySlugs.map((slug) => ({
        url: `${baseUrl}/city/${slug}`,
        lastModified: staticLastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    const allRoutes: MetadataRoute.Sitemap = [
        ...coreRoutes,
        ...categoryRoutes,
        ...toolRoutes,
        ...colorRoutes,
        ...fileRoutes,
        ...symbolRoutes,
        ...conversionRoutes,
        ...timeRoutes,
        ...countdownRoutes,
        ...countryRoutes,
        ...randomRoutes,
        ...currencyRoutes,
        ...dictionaryRoutes,
        ...cityRoutes,
    ];

    // Deduplicate entries by lowercase canonical URL to guarantee uniqueness
    const urlMap = new Map<string, MetadataRoute.Sitemap[number]>();
    for (const item of allRoutes) {
        const key = item.url.toLowerCase();
        if (!urlMap.has(key)) {
            urlMap.set(key, item);
        }
    }

    return Array.from(urlMap.values());
}
