'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search } from 'lucide-react';

interface ExplorerItem {
    label: string;
    slug: string;
}

interface ExplorerGridProps {
    items: ExplorerItem[];
    basePath: string;
    itemIcon: React.ReactNode;
    title: string;
}

export function ExplorerGrid({ items, basePath, itemIcon, title }: ExplorerGridProps) {
    const searchParams = useSearchParams();
    const activeLetter = searchParams.get('letter')?.toUpperCase() || null;

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    // Sort items alphabetically by label
    const sortedItems = [...items].sort((a, b) => a.label.localeCompare(b.label));

    const filteredItems = activeLetter
        ? sortedItems.filter(item => item.label.trim().toUpperCase().startsWith(activeLetter))
        : sortedItems.slice(0, 50); // Show top 50 by default if no letter selected

    return (
        <div className="space-y-8">
            <div className="glass-card p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <h2 className="text-2xl font-bold font-outfit">{title} Explorer</h2>

                    <div className="flex flex-wrap gap-2 justify-center">
                        <Link
                            href={basePath}
                            scroll={false}
                            prefetch={false}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all border ${activeLetter === null
                                    ? 'bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/20'
                                    : 'bg-surface-50 dark:bg-surface-900 hover:border-brand-primary'
                                }`}
                        >
                            All
                        </Link>
                        {alphabet.map(letter => {
                            const hasItems = sortedItems.some(item => item.label.trim().toUpperCase().startsWith(letter));
                            return (
                                <Link
                                    key={letter}
                                    href={hasItems ? `${basePath}?letter=${letter}` : '#'}
                                    scroll={false}
                                    prefetch={false}
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all border ${activeLetter === letter
                                            ? 'bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/20'
                                            : hasItems
                                                ? 'bg-surface-50 dark:bg-surface-900 hover:border-brand-primary'
                                                : 'opacity-20 cursor-not-allowed pointer-events-none'
                                        }`}
                                >
                                    {letter}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div className="min-h-[200px]">
                    {filteredItems.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                            {filteredItems.map((item, idx) => (
                                <Link
                                    key={`${item.slug}-${idx}`}
                                    href={`${basePath}/${item.slug}`}
                                    prefetch={false}
                                    className="flex items-center gap-2 px-4 py-3 rounded-xl border bg-background hover:bg-surface-50 dark:hover:bg-surface-900 !border-border hover:!border-brand-primary transition-all group shadow-sm active:scale-95"
                                >
                                    <div className="text-brand-primary group-hover:scale-110 transition-transform flex-shrink-0">
                                        {itemIcon}
                                    </div>
                                    <span className="font-medium text-sm truncate">{item.label}</span>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                            <Search size={48} className="mb-4 opacity-20" />
                            <p>No results found for "{activeLetter}"</p>
                        </div>
                    )}
                </div>

                {!activeLetter && sortedItems.length > 30 && (
                    <div className="mt-8 pt-8 border-t text-center">
                        <p className="text-muted-foreground text-sm">
                            Showing featured results. Use the A-Z index above to explore all {sortedItems.length} entries.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
