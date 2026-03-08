import { MetadataRoute } from 'next';
import { tools } from '@/data/tools';
import { categories } from '@/data/categories';
import conversions from '@/data/conversions';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://freetoolshub.com'; // Replace with actual domain

    // Core pages
    const routes = ['', '/tools', '/about', '/privacy', '/terms'].map((route) => ({
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

    // Conversion pages (Dynamic SEO)
    const conversionRoutes = conversions.map((c) => ({
        url: `${baseUrl}/convert/${c.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [...routes, ...categoryRoutes, ...toolRoutes, ...conversionRoutes];
}
