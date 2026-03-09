"use client";

import { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function ClientSearch({ basePath, placeholder }: { basePath: string, placeholder: string }) {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        const formatted = query.trim().toLowerCase().replace(/\s+/g, '-');
        router.push(`${basePath}/${formatted}`);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto mb-16 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-12 pr-24 py-4 rounded-2xl border bg-background text-lg shadow-sm focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                required
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-brand-primary text-white rounded-xl font-bold hover:scale-105 transition-all">
                Search
            </button>
        </form>
    );
}
