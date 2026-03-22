'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function SymbolExplorer() {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Redirect to a specific logic if needed, 
        // but for now let's just search the name
        // ... or jump to the detail if it's a single char
        if (query.length === 1) {
            // ... Logic to find by char would be better here ...
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto flex flex-col sm:flex-row gap-4 mb-20 relative group">
            <div className="relative flex-1">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-brand-primary transition-colors" size={24} />
                <input 
                    type="text" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for any symbol (e.g. sigma, heart, rocket)"
                    className="w-full h-16 bg-white dark:bg-zinc-950 border-2 border-zinc-200 dark:border-zinc-800 rounded-3xl pl-16 pr-6 text-xl font-medium focus:outline-none focus:border-brand-primary shadow-xl shadow-zinc-100 dark:shadow-none transition-all"
                />
            </div>
            <button 
                type="submit"
                className="h-16 bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 px-10 rounded-3xl font-black text-lg hover:opacity-90 active:scale-95 transition-all shadow-lg"
            >
                Find Symbol
            </button>
        </form>
    );
}
