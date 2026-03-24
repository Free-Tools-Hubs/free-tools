import { MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/config';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/private/', '/api/'],
            },
            {
                // Explicitly allow and prioritize AI-engine crawlers for AEO (AI Engine Optimization)
                userAgent: [
                    'GPTBot', 'ChatGPT-User', 'Google-Extended', 
                    'PerplexityBot', 'ClaudeBot', 'BingBot', 'AppleBot'
                ],
                allow: '/',
            }
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
