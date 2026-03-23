import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { SITE_URL } from '@/lib/config';
import { JsonLd } from './JsonLd';

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    // Generate BreadcrumbList Schema for Google/Bing (AEO)
    const schemaData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: SITE_URL
            },
            ...items.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 2,
                name: item.label,
                item: `${SITE_URL}${item.href}`
            }))
        ]
    };

    return (
        <nav aria-label="Breadcrumb" className="mb-6">
            <JsonLd data={schemaData} />
            <ol className="flex items-center flex-wrap gap-2 text-sm font-medium">
                <li>
                    <Link 
                        href="/" 
                        className="flex items-center gap-1.5 text-muted-foreground hover:text-brand-primary transition-colors"
                    >
                        <Home size={14} />
                        <span className="sr-only">Home</span>
                    </Link>
                </li>
                
                {items.map((item, index) => (
                    <li key={item.href} className="flex items-center gap-2">
                        <ChevronRight size={14} className="text-muted-foreground/50 shrink-0" />
                        {index === items.length - 1 ? (
                            <span className="text-brand-primary truncate max-w-[200px] md:max-w-none font-bold" aria-current="page">
                                {item.label}
                            </span>
                        ) : (
                            <Link 
                                href={item.href}
                                className="text-muted-foreground hover:text-brand-primary transition-colors truncate max-w-[150px] md:max-w-none"
                            >
                                {item.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
