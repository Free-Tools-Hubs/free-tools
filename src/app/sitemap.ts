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

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://free-tools-steel.vercel.app';

    // Core pages
    const routes = [
        '',
        '/tools',
        '/about',
        '/privacy',
        '/terms',
        '/city',
        '/country',
        '/define',
        '/currency',
        '/convert',
        '/random',
        '/time',
        '/countdown'
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 1.0,
    }));

    // Category pages
    const categoryRoutes = categories.map((cat) => ({
        url: `${baseUrl}/tools/${cat.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // Tool pages
    const toolRoutes = tools.map((tool) => ({
        url: `${baseUrl}/tools/${tool.category}/${tool.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }));

    // Programmatic SEO Pages
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

    const dictionaryRoutes = topWords.map((word) => ({
        url: `${baseUrl}/define/${word.toLowerCase()}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
    }));

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
