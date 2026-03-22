'use client';

import { useState, useMemo } from 'react';
import { Search, Copy, Check, Filter } from 'lucide-react';

const UNICODE_BLOCKS = [
    { name: 'Basic Latin', range: [32, 126] },
    { name: 'Latin-1 Supplement', range: [160, 255] },
    { name: 'Arrows', range: [8592, 8703] },
    { name: 'Mathematical Operators', range: [8704, 8959] },
    { name: 'Box Drawing', range: [9472, 9599] },
    { name: 'Block Elements', range: [9600, 9631] },
    { name: 'Geometric Shapes', range: [9632, 9727] },
    { name: 'Miscellaneous Symbols', range: [9728, 9855] },
    { name: 'Dingbats', range: [9984, 10175] },
    { name: 'Braille Patterns', range: [10240, 10495] },
    { name: 'Emojis', range: [128512, 128591] },
    { name: 'Symbols & Pictographs', range: [129280, 129535] },
];

export default function UnicodeExplorerTool() {
    const [search, setSearch] = useState('');
    const [selectedBlock, setSelectedBlock] = useState('Basic Latin');
    const [copiedChar, setCopiedChar] = useState<string | null>(null);

    const filteredChars = useMemo(() => {
        const block = UNICODE_BLOCKS.find(b => b.name === selectedBlock);
        if (!block) return [];

        const chars = [];
        for (let i = block.range[0]; i <= block.range[1]; i++) {
            const char = String.fromCodePoint(i);
            chars.push({
                char,
                code: i.toString(16).toUpperCase().padStart(4, '0'),
                decimal: i
            });
        }

        if (search) {
            return chars.filter(c => 
                c.code.includes(search.toUpperCase()) || 
                c.decimal.toString().includes(search)
            );
        }

        return chars;
    }, [selectedBlock, search]);

    const handleCopy = (char: string) => {
        navigator.clipboard.writeText(char);
        setCopiedChar(char);
        setTimeout(() => setCopiedChar(null), 1500);
    };

    return (
        <div className="p-6 md:p-10 flex flex-col gap-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-surface-50 dark:bg-surface-900 p-6 rounded-3xl border border-surface-200 dark:border-surface-800">
                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-brand-primary transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search by Hex or Decimal..."
                        className="w-full pl-12 pr-4 py-3 bg-background rounded-2xl border-2 border-surface-200 dark:border-surface-700 outline-none focus:border-brand-primary transition-all font-bold text-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
                    <Filter size={16} className="text-muted-foreground shrink-0" />
                    {UNICODE_BLOCKS.map(block => (
                        <button
                            key={block.name}
                            onClick={() => setSelectedBlock(block.name)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${selectedBlock === block.name ? 'bg-brand-primary text-white shadow-lg' : 'bg-background hover:bg-surface-100 dark:hover:bg-surface-800 text-muted-foreground border border-surface-200 dark:border-surface-700'}`}
                        >
                            {block.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
                {filteredChars.map(({ char, code, decimal }) => (
                    <button
                        key={decimal}
                        onClick={() => handleCopy(char)}
                        className="group relative flex flex-col items-center justify-center aspect-square bg-background border-2 border-surface-100 dark:border-surface-800 rounded-2xl hover:border-brand-primary hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                        <span className="text-3xl md:text-4xl mb-2 group-hover:scale-125 transition-transform duration-300">{char}</span>
                        <span className="text-[10px] font-black text-muted-foreground tracking-tighter uppercase opacity-50">U+{code}</span>
                        
                        {copiedChar === char && (
                            <div className="absolute inset-0 flex items-center justify-center bg-brand-primary/90 rounded-2xl backdrop-blur-sm animate-in fade-in zoom-in duration-200">
                                <Check size={28} className="text-white" strokeWidth={3} />
                            </div>
                        )}
                        
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Copy size={12} className="text-brand-primary" />
                        </div>
                    </button>
                ))}
            </div>

            {filteredChars.length === 0 && (
                <div className="py-20 flex flex-col items-center justify-center text-muted-foreground gap-4">
                    <div className="p-6 rounded-full bg-surface-100 dark:bg-surface-800">
                        <Search size={48} strokeWidth={1} />
                    </div>
                    <p className="font-bold text-lg">No symbols found matching "{search}"</p>
                </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-8 bg-zinc-950 text-white rounded-[2rem] shadow-2xl overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/20 blur-[60px] rounded-full group-hover:bg-brand-primary/40 transition-colors" />
                <div className="z-10">
                    <h3 className="text-lg font-black uppercase tracking-widest mb-1">Unicode Explorer</h3>
                    <p className="text-xs text-brand-primary/80 font-bold uppercase tracking-widest">Browse 140,000+ characters instantly</p>
                </div>
                <div className="flex gap-4 z-10">
                    <div className="flex flex-col items-center px-4 border-r border-white/10">
                        <span className="text-xl font-black">UTF-8</span>
                        <span className="text-[10px] uppercase font-bold text-white/40">Encoding</span>
                    </div>
                    <div className="flex flex-col items-center px-4">
                        <span className="text-xl font-black">BPM</span>
                        <span className="text-[10px] uppercase font-bold text-white/40">Plan</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
