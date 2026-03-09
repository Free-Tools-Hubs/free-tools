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

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://freetoolshubs.com';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // 1. Core routes
    const routes = [
        '', '/tools', '/about', '/privacy', '/terms',
        '/city', '/country', '/define', '/currency',
        '/convert', '/random', '/time', '/countdown'
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 1.0,
    }));

    // 2. Category routes
    const categoryRoutes = categories.map((cat) => ({
        url: `${baseUrl}/tools/${cat.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // 3. Tool routes
    const toolRoutes = tools.map((tool) => ({
        url: `${baseUrl}/tools/${tool.category}/${tool.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }));

    // 4. Programmatic Tool routes (Conversions, Time, Countdowns)
    const conversionRoutes = conversions.map((c) => ({
        url: `${baseUrl}/convert/${c.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    const timeRoutes = times.map((t) => ({
        url: `${baseUrl}/time/${t.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    const countdownRoutes = countdowns.map((c) => ({
        url: `${baseUrl}/countdown/${c.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    // 5. Data Hubs (Countries, Randoms, Currencies)
    const countryRoutes = countries.map((c) => ({
        url: `${baseUrl}/country/${c.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    const randomRoutes = randoms.map((r) => ({
        url: `${baseUrl}/random/${r.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    const currencyRoutes = commonCurrencyPairs.map((p) => ({
        url: `${baseUrl}/currency/${p.from.toLowerCase()}-to-${p.to.toLowerCase()}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8,
    }));

    // 6. Dictionary routes
    const dictionaryRoutes = topWords.map((word) => ({
        url: `${baseUrl}/define/${word.toLowerCase()}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
    }));

    // 7. City routes
    const cityRoutes = topCities.map((city) => ({
        url: `${baseUrl}/city/${city.toLowerCase().replace(/ /g, '-')}`,
        lastModified: new Date(),
        changeFrequency: 'hourly' as const,
        priority: 0.8,
    }));

    return [
        ...routes,
        ...categoryRoutes,
        ...toolRoutes,
        ...conversionRoutes,
        ...timeRoutes,
        ...countdownRoutes,
        ...countryRoutes,
        ...randomRoutes,
        ...currencyRoutes,
        ...dictionaryRoutes,
        ...cityRoutes
    ];
}
