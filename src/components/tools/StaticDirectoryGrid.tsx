import Link from 'next/link';

interface DirectoryItem {
    label: string;
    slug: string;
    subLabel?: string;
}

interface StaticDirectoryGridProps {
    items: DirectoryItem[];
    basePath: string;
    title: string;
    itemIcon?: React.ReactNode;
}

export function StaticDirectoryGrid({ items, basePath, title, itemIcon }: StaticDirectoryGridProps) {
    // Sort items alphabetically
    const sorted = [...items].sort((a, b) => a.label.localeCompare(b.label));

    // Group by first uppercase letter
    const grouped = new Map<string, DirectoryItem[]>();
    for (const item of sorted) {
        const firstChar = item.label.trim().charAt(0).toUpperCase();
        const letter = /[A-Z]/.test(firstChar) ? firstChar : '#';
        if (!grouped.has(letter)) {
            grouped.set(letter, []);
        }
        grouped.get(letter)!.push(item);
    }

    const availableLetters = Array.from(grouped.keys()).sort((a, b) => {
        if (a === '#') return -1;
        if (b === '#') return 1;
        return a.localeCompare(b);
    });

    return (
        <section aria-label={`${title} Alphabetical Directory`} className="space-y-12">
            {/* Quick-Jump Alphabet Bar */}
            <div className="glass-card p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-2xl font-bold font-outfit">{title} Alphabetical Directory</h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            Browse all {sorted.length} {title.toLowerCase()} entries in our comprehensive index.
                        </p>
                    </div>
                </div>

                <nav aria-label="Alphabetical Jump Navigation" className="flex flex-wrap gap-2">
                    {availableLetters.map((letter) => (
                        <a
                            key={letter}
                            href={`#section-${letter}`}
                            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm bg-surface-50 dark:bg-surface-900 border border-border hover:border-brand-primary hover:bg-brand-primary/10 hover:text-brand-primary transition-all shadow-sm"
                        >
                            {letter}
                        </a>
                    ))}
                </nav>
            </div>

            {/* Categorized Alphabetical Sections */}
            <div className="space-y-10">
                {availableLetters.map((letter) => {
                    const groupItems = grouped.get(letter) || [];
                    return (
                        <div
                            key={letter}
                            id={`section-${letter}`}
                            className="glass-card p-6 md:p-8 scroll-mt-28"
                        >
                            <div className="flex items-center gap-3 border-b border-border pb-4 mb-6">
                                <span className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary font-black font-outfit text-xl flex items-center justify-center border border-brand-primary/20">
                                    {letter}
                                </span>
                                <span className="text-sm font-semibold text-muted-foreground">
                                    {groupItems.length} {groupItems.length === 1 ? 'entry' : 'entries'}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                {groupItems.map((item) => (
                                    <Link
                                        key={item.slug}
                                        href={`${basePath}/${item.slug}`}
                                        prefetch={false}
                                        className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-border/80 bg-background/60 hover:bg-surface-50 dark:hover:bg-surface-900 hover:border-brand-primary transition-all group"
                                    >
                                        {itemIcon && (
                                            <span className="text-brand-primary group-hover:scale-110 transition-transform shrink-0">
                                                {itemIcon}
                                            </span>
                                        )}
                                        <div className="min-w-0 flex-1">
                                            <span className="block font-medium text-sm truncate text-foreground group-hover:text-brand-primary transition-colors">
                                                {item.label}
                                            </span>
                                            {item.subLabel && (
                                                <span className="block text-xs text-muted-foreground truncate">
                                                    {item.subLabel}
                                                </span>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
