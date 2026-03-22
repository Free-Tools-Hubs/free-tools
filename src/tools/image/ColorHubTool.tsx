'use client';

import { useState, useEffect, useMemo } from 'react';
import { Copy, Check, RefreshCw, Layers, Palette, Droplet, Search, Info, Grid, List } from 'lucide-react';
import { namedColors, NamedColor } from '@/data/named-colors';
import { isValidHex, getHarmonies, getContrastRatio } from '@/lib/color-utils';

type ViewMode = 'grid' | 'list';

const getWcagLevel = (ratio: number) => {
    if (ratio >= 7) return "AAA";
    if (ratio >= 4.5) return "AA";
    if (ratio >= 3) return "Large";
    return "Fail";
};

function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHex(r: number, g: number, b: number) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

function generateRandomHex() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
}

export default function ColorHubTool() {
    const [color, setColor] = useState('#6366F1');
    const [copied, setCopied] = useState<string | null>(null);
    const [palette, setPalette] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState<ViewMode>('grid');

    const generatePalette = (baseColor: string) => {
        if (!isValidHex(baseColor)) return;
        
        const harmonies = getHarmonies(baseColor);
        const newPalette = [
            baseColor,
            `#${harmonies.complementary}`,
            `#${harmonies.analogous[0]}`,
            `#${harmonies.analogous[1]}`,
            `#${harmonies.triadic[0]}`,
            `#${harmonies.triadic[1]}`,
        ];
        setPalette(newPalette);
    };

    useEffect(() => {
        generatePalette(color);
    }, [color]);

    const handleCopy = (val: string) => {
        navigator.clipboard.writeText(val);
        setCopied(val);
        setTimeout(() => setCopied(null), 1500);
    };

    const randomize = () => {
        setColor(generateRandomHex());
    };

    const filteredColors = useMemo(() => {
        return namedColors.filter(c => 
            c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            c.hex.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    return (
        <div className="p-4 md:p-8 flex flex-col gap-12">
            {/* Hero Section - Main Color Tool */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="flex flex-col gap-6">
                    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-zinc-900 border-4 border-zinc-100 dark:border-zinc-800 shadow-2xl relative overflow-hidden group">
                        <div 
                            className="w-full h-72 rounded-3xl shadow-inner transition-all duration-500 cursor-pointer flex flex-col items-center justify-center group-hover:scale-[1.01] relative"
                            style={{ backgroundColor: color }}
                            onClick={randomize}
                        >
                            <span className="text-white mix-blend-difference font-black text-5xl uppercase tracking-tighter mb-2">
                                {color}
                            </span>
                            <div className="text-white mix-blend-difference opacity-60 font-medium tracking-widest text-xs uppercase">
                                Click to Randomize
                            </div>
                            
                            <div className="absolute top-6 left-6 flex flex-col gap-2 pointer-events-none">
                                {(() => {
                                    const rgb = hexToRgb(color);
                                    if (!rgb) return null;
                                    const contrastWhite = getContrastRatio(rgb, { r: 255, g: 255, b: 255 });
                                    const contrastBlack = getContrastRatio(rgb, { r: 0, g: 0, b: 0 });
                                    
                                    return (
                                        <>
                                            <div className="flex items-center gap-2 bg-black/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white mix-blend-difference font-black text-[10px] tracking-widest uppercase shadow-xl">
                                                <div className="w-2 h-2 rounded-full bg-white mr-1" />
                                                On White: {getWcagLevel(contrastWhite)} ({contrastWhite.toFixed(1)}:1)
                                            </div>
                                            <div className="flex items-center gap-2 bg-black/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white mix-blend-difference font-black text-[10px] tracking-widest uppercase shadow-xl">
                                                <div className="w-2 h-2 rounded-full bg-black mr-1" />
                                                On Black: {getWcagLevel(contrastBlack)} ({contrastBlack.toFixed(1)}:1)
                                            </div>
                                        </>
                                    );
                                })()}
                            </div>
                        </div>
                        
                        <div className="mt-8 flex gap-4">
                            <div className="relative group/input">
                                <input 
                                    type="color" 
                                    value={color}
                                    onChange={(e) => setColor(e.target.value.toUpperCase())}
                                    className="w-16 h-16 rounded-2xl cursor-pointer border-0 bg-transparent relative z-10"
                                />
                                <div className="absolute inset-0 rounded-2xl border-2 border-zinc-100 dark:border-zinc-700 pointer-events-none group-hover/input:border-brand-primary transition-colors" />
                            </div>
                            <div className="flex-grow relative">
                                <input 
                                    type="text"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value.toUpperCase())}
                                    className="w-full h-16 bg-zinc-50 dark:bg-zinc-800 px-6 rounded-2xl font-black text-xl outline-none focus:ring-4 ring-brand-primary/20 border-2 border-zinc-100 dark:border-zinc-700 transition-all font-mono"
                                    placeholder="#000000"
                                />
                                <button
                                    onClick={() => handleCopy(color)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-white dark:bg-zinc-900 border shadow-sm hover:text-brand-primary transition-all active:scale-90"
                                >
                                    {copied === color ? <Check size={20} className="text-emerald-500" /> : <Copy size={20} />}
                                </button>
                            </div>
                            <button 
                                onClick={randomize}
                                title="Random Color"
                                className="h-16 w-16 flex items-center justify-center rounded-2xl bg-zinc-950 text-white hover:bg-brand-primary transition-all active:scale-90 shadow-xl"
                            >
                                <RefreshCw size={24} className="group-hover:rotate-180 transition-transform duration-500" />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899', '#06B6D4', '#F43F5E', '#14B8A6'].map(c => (
                            <button
                                key={c}
                                onClick={() => setColor(c)}
                                className="w-10 h-10 rounded-full border-4 border-white dark:border-zinc-900 shadow-lg hover:scale-125 hover:z-10 transition-all"
                                style={{ backgroundColor: c }}
                                title={c}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <h3 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-400 flex items-center gap-2">
                        <Palette size={16} className="text-brand-primary" />
                        Dynamic Palette
                    </h3>
                    <div className="flex flex-col gap-3">
                        {palette.map((c, i) => (
                            <div 
                                key={i}
                                className="group flex items-center p-4 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-800 hover:border-brand-primary hover:shadow-xl transition-all cursor-pointer"
                                onClick={() => handleCopy(c)}
                            >
                                <div className="w-14 h-14 rounded-xl shadow-inner mr-6 shrink-0 transition-transform group-hover:scale-110" style={{ backgroundColor: c }} />
                                <div className="flex-grow min-w-0">
                                    <div className="font-black text-lg tracking-tight font-mono">{c}</div>
                                    <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest truncate">
                                        RGB({hexToRgb(c)?.r}, {hexToRgb(c)?.g}, {hexToRgb(c)?.b})
                                    </div>
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-4 shrink-0">
                                    {copied === c ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} className="text-zinc-400" />}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Named Colors Explorer Section */}
            <div className="flex flex-col gap-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h2 className="text-3xl font-black tracking-tighter mb-2 flex items-center gap-3">
                            <Droplet size={28} className="text-brand-primary" />
                            Named Colors Explorer
                        </h2>
                        <p className="text-zinc-500 font-medium">Browse over 140+ CSS named colors with detailed descriptions and conversions.</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                            <input 
                                type="text"
                                placeholder="Search by name, hex, or keyword..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-12 pr-6 h-12 bg-white dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-800 rounded-2xl focus:ring-4 ring-brand-primary/10 transition-all w-full md:w-80 font-medium"
                            />
                        </div>
                        <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl shrink-0">
                            <button 
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-zinc-700 shadow-sm text-brand-primary' : 'text-zinc-400 hover:text-zinc-600'}`}
                            >
                                <Grid size={18} />
                            </button>
                            <button 
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white dark:bg-zinc-700 shadow-sm text-brand-primary' : 'text-zinc-400 hover:text-zinc-600'}`}
                            >
                                <List size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {filteredColors.map((colorItem) => (
                            <div 
                                key={colorItem.name}
                                className="group relative bg-white dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-800 rounded-3xl p-3 hover:border-brand-primary hover:shadow-2xl transition-all cursor-pointer flex flex-col gap-3"
                                onClick={() => setColor(colorItem.hex)}
                            >
                                <div 
                                    className="w-full aspect-square rounded-2xl shadow-inner relative overflow-hidden" 
                                    style={{ backgroundColor: colorItem.hex }}
                                >
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 backdrop-blur-[2px]">
                                        <div className="bg-white px-3 py-1 rounded-full text-[10px] font-black uppercase text-zinc-900 shadow-lg">Use This</div>
                                    </div>
                                </div>
                                <div className="px-1">
                                    <h4 className="font-bold text-sm truncate">{colorItem.name}</h4>
                                    <code className="text-[10px] text-zinc-400 font-mono font-bold uppercase">{colorItem.hex}</code>
                                </div>
                                
                                {/* Info Tooltip on Hover */}
                                <div className="absolute opacity-0 group-hover:opacity-100 pointer-events-none z-20 bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 p-4 bg-zinc-950 text-white rounded-2xl shadow-2xl transition-all translate-y-2 group-hover:translate-y-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-4 h-4 rounded-full border border-zinc-700" style={{ backgroundColor: colorItem.hex }} />
                                        <span className="font-bold text-sm">{colorItem.name}</span>
                                    </div>
                                    <p className="text-[10px] leading-relaxed text-zinc-400">{colorItem.description}</p>
                                    <div className="mt-3 pt-3 border-t border-zinc-800 grid grid-cols-2 gap-2 text-[10px] font-mono">
                                        <div className="text-zinc-500 uppercase">RGB</div>
                                        <div>{colorItem.rgb}</div>
                                    </div>
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-zinc-950 rotate-45" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {filteredColors.map((colorItem) => (
                            <div 
                                key={colorItem.name}
                                className="group bg-white dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-800 rounded-2xl p-4 hover:border-brand-primary hover:shadow-lg transition-all cursor-pointer flex items-center gap-6"
                                onClick={() => setColor(colorItem.hex)}
                            >
                                <div className="w-16 h-16 rounded-xl shadow-inner shrink-0" style={{ backgroundColor: colorItem.hex }} />
                                <div className="grid grid-cols-1 md:grid-cols-4 flex-grow gap-4 items-center">
                                    <div>
                                        <h4 className="font-black text-lg leading-none mb-1">{colorItem.name}</h4>
                                        <code className="text-xs text-brand-primary font-mono font-bold uppercase">{colorItem.hex}</code>
                                    </div>
                                    <div className="text-xs font-mono text-zinc-500 font-bold uppercase">
                                        {colorItem.rgb}
                                    </div>
                                    <div className="md:col-span-2 text-xs text-zinc-400 font-medium italic line-clamp-2 pr-6">
                                        {colorItem.description}
                                    </div>
                                </div>
                                <button className="p-2 opacity-0 group-hover:opacity-100 rounded-xl bg-zinc-100 dark:bg-zinc-800 transition-all">
                                    <Copy size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                
                {filteredColors.length === 0 && (
                    <div className="py-20 flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center text-zinc-400 mb-4">
                            <Search size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-1">No colors found</h3>
                        <p className="text-zinc-500">Try searching for a different name, hex code, or keyword.</p>
                        <button 
                            onClick={() => setSearchTerm('')}
                            className="mt-4 text-brand-primary font-bold hover:underline"
                        >
                            Clear Search
                        </button>
                    </div>
                )}
            </div>

            {/* Bottom Info Section */}
            <div className="bg-brand-primary/5 dark:bg-brand-primary/10 rounded-[2.5rem] p-10 border-2 border-dashed border-brand-primary/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="flex flex-col gap-4">
                        <div className="w-12 h-12 bg-brand-primary text-white rounded-2xl flex items-center justify-center shadow-lg">
                            <Palette size={24} />
                        </div>
                        <h4 className="text-xl font-black tracking-tight">Design Ready</h4>
                        <p className="text-sm text-zinc-500 font-medium leading-relaxed">
                            Every color and palette on this page is production-ready. Copy hex codes for your CSS, design systems, or brand guidelines instantly.
                        </p>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                        <div className="w-12 h-12 bg-zinc-900 text-white rounded-2xl flex items-center justify-center shadow-lg">
                            <Info size={24} />
                        </div>
                        <h4 className="text-xl font-black tracking-tight">Smart Search</h4>
                        <p className="text-sm text-zinc-500 font-medium leading-relaxed">
                            Search by feeling or keyword like "vibrant", "calm", or "nature" to find colors that match your project's mood through our rich descriptions.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center border border-brand-primary/20">
                            <Layers size={24} />
                        </div>
                        <h4 className="text-xl font-black tracking-tight">Browser Native</h4>
                        <p className="text-sm text-zinc-500 font-medium leading-relaxed">
                            Leveraging the full library of 140+ CSS named colors supported by all modern browsers. Zero dependencies, maximum performance.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

