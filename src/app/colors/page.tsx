import { Metadata } from 'next';
import { namedColors } from '@/data/named-colors';
import { normalizeHex } from '@/lib/color-utils';
import Link from 'next/link';
import ColorPickerHome from './ColorPickerHome';

import { SITE_URL, SITE_NAME } from '@/lib/config';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export const metadata: Metadata = {
    title: `Color Hub | Explore HEX, RGB, HSL & CMYK Details | ${SITE_NAME}`,
    description: 'Discover thousands of colors, their harmonies, accessibility, and mathematical representations. Search any hex code or explore curated color palettes.',
    keywords: ['color hub', 'hex codes', 'html color names', 'color harmonies', 'rgb to hex', 'hsl values'],
    alternates: { canonical: '/colors' },
    openGraph: {
        title: `Color Hub | Explore HEX, RGB, HSL & CMYK Details | ${SITE_NAME}`,
        description: 'Discover thousands of colors, their harmonies, accessibility, and mathematical representations. Search any hex code or explore curated color palettes.',
        type: 'website',
        url: `${SITE_URL}/colors`,
        siteName: SITE_NAME,
    }
};

export default function ColorsHub() {
    // Group colors by category (rough logic)
    const categorized = namedColors.reduce((acc, color) => {
        const h = hexToHue(color.hex);
        const cat = getColorCategory(h || 0);
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(color);
        return acc;
    }, {} as Record<string, typeof namedColors>);

    const order = ['Red', 'Orange', 'Yellow', 'Green', 'Cyan', 'Blue', 'Purple', 'Magenta', 'Neutral'];

    return (
        <div className="max-w-7xl mx-auto px-4 py-20 pb-40 pt-32">
            <Breadcrumbs 
                items={[{ label: 'Color Hub', href: '/colors' }]} 
            />
            {/* Hero */}
            <div className="text-center mb-16">
                <h1 className="text-5xl lg:text-7xl font-black mb-6 tracking-tight bg-gradient-to-br from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500 bg-clip-text text-transparent italic">
                    Color Hub
                </h1>
                <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                    A comprehensive encyclopedia for every color. Find values, generate harmonies, 
                    and check accessibility for your design projects.
                </p>
            </div>

            {/* Input Component */}
            <ColorPickerHome />

            {/* Hub Sections */}
            <div className="space-y-24">
                {order.map(cat => categorized[cat] && (
                    <section key={cat}>
                        <div className="flex items-end justify-between mb-8 border-b-2 border-zinc-100 dark:border-zinc-900 pb-4">
                            <h2 className="text-3xl font-black">{cat} Shades</h2>
                            <span className="text-sm font-mono text-zinc-400 uppercase tracking-[0.2em]">{categorized[cat].length} Colors</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4">
                            {categorized[cat].map((color) => (
                                <Link 
                                    key={color.name} 
                                    href={`/colors/${normalizeHex(color.hex)}`}
                                    className="group flex flex-col items-center bg-white dark:bg-zinc-950 p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:scale-105 active:scale-95 transition-all shadow-sm hover:shadow-lg"
                                >
                                    <div 
                                        className="h-16 w-full rounded-lg mb-4 shadow-inner"
                                        style={{ backgroundColor: color.hex }}
                                    />
                                    <div className="text-center w-full px-1">
                                        <span className="block text-[10px] font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-amber-600 transition-colors uppercase truncate">{color.name}</span>
                                        <span className="block text-[9px] font-mono text-zinc-400 uppercase tracking-tighter">{color.hex}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            {/* AdSense Content Block */}
            <section className="mt-32 prose dark:prose-invert max-w-4xl mx-auto text-center border-t-2 border-zinc-100 dark:border-zinc-900 pt-20">
                <h2 className="text-3xl font-black mb-10">Understanding Digital Color Representation</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                    <div>
                        <h3 className="text-xl font-bold mb-4">What is a HEX code?</h3>
                        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                            A Hexadecimal color code is a six-digit, three-byte number used in HTML, CSS, and SVG to represent colors. 
                            The bytes represent the red, green, and blue components of the color. 
                            Each byte is represented as a pair of characters from 00 to FF, corresponding to values 0-255.
                        </p>
                    </div>
                     <div>
                        <h3 className="text-xl font-bold mb-4">RGB vs HSL</h3>
                        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                            RGB (Red, Green, Blue) is an additive professional model where light is combined to create color. 
                            HSL (Hue, Saturation, Lightness) is a cylindrical-coordinate representation of RGB and is often 
                            more intuitive for designers to manipulate brightness or saturation.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

// Minimal helpers for grouping logic
function hexToHue(hex: string): number {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0;
    if (max !== min) {
        const d = max - min;
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return Math.round(h * 360);
}

function getColorCategory(h: number): string {
    if (h >= 330 || h < 10) return 'Red';
    if (h >= 10 && h < 45) return 'Orange';
    if (h >= 45 && h < 75) return 'Yellow';
    if (h >= 75 && h < 165) return 'Green';
    if (h >= 165 && h < 200) return 'Cyan';
    if (h >= 200 && h < 260) return 'Blue';
    if (h >= 260 && h < 300) return 'Purple';
    if (h >= 300 && h < 330) return 'Magenta';
    return 'Neutral';
}
