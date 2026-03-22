'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { isValidHex, normalizeHex } from '@/lib/color-utils';

export default function ColorPickerHome() {
    const [hex, setHex] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const cleanHex = hex.replace('#', '');
        if (isValidHex(cleanHex)) {
            router.push(`/colors/${normalizeHex(cleanHex)}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-20 max-w-2xl mx-auto">
            <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-mono text-xl">#</span>
                <input 
                    type="text" 
                    value={hex}
                    onChange={(e) => setHex(e.target.value)}
                    placeholder="Enter any Hex Code (e.g. FF5733)"
                    className="w-full bg-white dark:bg-zinc-950 border-2 border-zinc-200 dark:border-zinc-800 rounded-2xl py-5 pl-10 pr-6 text-xl font-mono focus:outline-none focus:border-amber-500 transition-colors shadow-sm"
                />
            </div>
            <button 
                type="submit"
                className="bg-zinc-900 dark:bg-zinc-50 text-white dark:text-black px-10 py-5 rounded-2xl font-bold text-lg hover:opacity-90 active:scale-95 transition-all"
            >
                Explore Color
            </button>
        </form>
    );
}
