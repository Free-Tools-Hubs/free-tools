import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { 
    hexToRgb, 
    rgbToHsl, 
    rgbToCmyk, 
    getContrastRatio, 
    getHarmonies, 
    isValidHex, 
    normalizeHex 
} from '@/lib/color-utils';
import { namedColors } from '@/data/named-colors';
import Link from 'next/link';

interface Props {
    params: Promise<{ hex: string }>;
}

import { SITE_URL, SITE_NAME } from '@/lib/config';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { hex } = await params;
    if (!isValidHex(hex)) return { title: 'Invalid Color' };

    const cleanHex = normalizeHex(hex);
    const namedColor = namedColors.find(c => normalizeHex(c.hex) === cleanHex);
    const title = namedColor 
        ? `${namedColor.name} Color | Hex #${cleanHex} | ${SITE_NAME}`
        : `Hex #${cleanHex} Color Details | Color Hub | ${SITE_NAME}`;
    
    const canonical = `/colors/${cleanHex}`;

    return {
        title,
        description: `Detailed information about the color #${cleanHex}. Get RGB, HSL, CMYK values, complementary colors, and WCAG contrast ratios.`,
        keywords: [`#${cleanHex}`, `color ${cleanHex}`, `rgb of ${cleanHex}`, `hsl of ${cleanHex}`, 'color hub', 'free tools'],
        alternates: { canonical },
        openGraph: {
            title,
            description: `Detailed information about the color #${cleanHex}. Get RGB, HSL, CMYK values, complementary colors, and WCAG contrast ratios.`,
            url: `${SITE_URL}${canonical}`,
            siteName: SITE_NAME,
        }
    };
}

export function generateStaticParams() {
    return namedColors.map(color => ({
        hex: normalizeHex(color.hex),
    }));
}

export default async function ColorPage({ params }: Props) {
    const { hex } = await params;
    if (!isValidHex(hex)) notFound();

    const cleanHex = normalizeHex(hex);
    const rgb = hexToRgb(cleanHex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
    const harmonies = getHarmonies(cleanHex);
    const namedColor = namedColors.find(c => normalizeHex(c.hex) === cleanHex);

    const contrastWhite = getContrastRatio(rgb, { r: 255, g: 255, b: 255 });
    const contrastBlack = getContrastRatio(rgb, { r: 0, g: 0, b: 0 });

    const getWcagLevel = (ratio: number) => {
        if (ratio >= 7) return "AAA (Enhanced)";
        if (ratio >= 4.5) return "AA (Standard)";
        if (ratio >= 3) return "Large Text Only";
        return "Fail";
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                <div 
                    className="h-64 lg:h-full rounded-2xl shadow-inner border border-zinc-200 dark:border-zinc-800"
                    style={{ backgroundColor: `#${cleanHex}` }}
                />
                <div className="flex flex-col justify-center">
                    <h1 className="text-4xl lg:text-6xl font-bold mb-4 flex items-center gap-4">
                        {namedColor?.name || `#${cleanHex}`}
                        <span className="text-xl font-mono text-zinc-500">#{cleanHex}</span>
                    </h1>
                    <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-xl">
                        Explore properties, harmonies, and accessibility data for the color <strong>#{cleanHex}</strong>. 
                        This {hsl.l > 70 ? 'light' : hsl.l < 30 ? 'dark' : 'medium'} shade of {getColorCategory(hsl.h)} 
                        is widely used in modern design.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                            <span className="block text-xs uppercase tracking-widest text-zinc-500 mb-1">HEX</span>
                            <span className="font-mono font-bold">#{cleanHex}</span>
                        </div>
                        <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                            <span className="block text-xs uppercase tracking-widest text-zinc-500 mb-1">RGB</span>
                            <span className="font-mono font-bold">{rgb.r}, {rgb.g}, {rgb.b}</span>
                        </div>
                        <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                            <span className="block text-xs uppercase tracking-widest text-zinc-500 mb-1">HSL</span>
                            <span className="font-mono font-bold">{hsl.h}°, {hsl.s}%, {hsl.l}%</span>
                        </div>
                        <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                            <span className="block text-xs uppercase tracking-widest text-zinc-500 mb-1">CMYK</span>
                            <span className="font-mono font-bold">{cmyk.c},{cmyk.m},{cmyk.y},{cmyk.k}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Hub Section (AdSense Optimized Info) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
                <div className="lg:col-span-2 prose dark:prose-invert max-w-none">
                        <h2 className="text-2xl font-bold mb-4">Color Analysis & Expert Insights</h2>
                        <div className="space-y-6">
                            {namedColor && (
                                <div className="p-6 bg-brand-primary/5 rounded-2xl border-l-4 border-brand-primary italic text-zinc-700 dark:text-zinc-300">
                                    <p className="font-medium text-lg leading-relaxed mb-0">"{namedColor.description}"</p>
                                </div>
                            )}
                            <p>
                                Color <strong>#{cleanHex}</strong> is mathematically represented by {rgb.r} red, {rgb.g} green, and {rgb.b} blue. 
                                In the HSL color space, it has a hue of {hsl.h} degrees, {hsl.s}% saturation, and {hsl.l}% lightness. 
                                {namedColor && `This color is officially recognized as "${namedColor.name}" and is one of the standard CSS named colors supported across all modern web browsers.`}
                            </p>
                            <h3>Psychology and Visual Impact</h3>
                            <p>
                                Depending on the vibrant {hsl.h} hue, this color belongs to the <strong>{getColorCategory(hsl.h)}</strong> spectrum. 
                                {hsl.h < 30 || hsl.h > 330 ? 'Warm colors like this often represent passion, energy, and excitement. They are excellent for attention-grabbing elements like Call-to-Action buttons.' : 
                                 hsl.h > 180 && hsl.h < 260 ? 'Cool colors like this are often associated with calmness, trust, and professional reliability. This makes it a popular choice for corporate branding and banking interfaces.' :
                                 'This balanced tone provides a stable foundation for UI elements, backgrounds, and professional branding materials where subtlety is valued.'}
                            </p>
                            <h3>Design & Accessibility Best Practices</h3>
                            <p>
                                When using <strong>#{cleanHex}</strong> in your projects, consider the accessibility of text to ensure your content is readable by everyone. 
                                The contrast ratio against white is <strong>{contrastWhite.toFixed(2)}:1</strong>, which is rated <strong>{getWcagLevel(contrastWhite)}</strong>. 
                                Against black, the ratio is <strong>{contrastBlack.toFixed(2)}:1</strong>, rated <strong>{getWcagLevel(contrastBlack)}</strong>.
                            </p>
                            <p className="text-sm text-zinc-500">
                                Pro Tip: For optimal user experience, always ensure your primary text color has at least a 4.5:1 contrast ratio against the background color.
                            </p>
                        </div>
                </div>

                <aside className="space-y-8">
                    <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                        <h3 className="font-bold mb-4 flex items-center justify-between">
                            Harmonies
                            <span className="text-[10px] bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded">AUTO-GEN</span>
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <span className="text-xs text-zinc-500 mb-2 block">Complementary</span>
                                <Link href={`/colors/${harmonies.complementary}`} className="block h-10 w-full rounded-md border border-zinc-200 dark:border-zinc-800 group relative" style={{ backgroundColor: `#${harmonies.complementary}` }}>
                                     <span className="opacity-0 group-hover:opacity-100 absolute inset-0 flex items-center justify-center bg-black/20 text-white text-[10px] font-mono transition-opacity">
                                        #{harmonies.complementary}
                                     </span>
                                </Link>
                            </div>
                            <div>
                                <span className="text-xs text-zinc-500 mb-2 block">Analogous</span>
                                <div className="flex gap-2">
                                    {harmonies.analogous.map(hex => (
                                        <Link key={hex} href={`/colors/${hex}`} className="flex-1 h-10 rounded-md border border-zinc-200 dark:border-zinc-800 group relative" style={{ backgroundColor: `#${hex}` }}>
                                            <span className="opacity-0 group-hover:opacity-100 absolute inset-0 flex items-center justify-center bg-black/20 text-white text-[10px] font-mono transition-opacity">
                                                #{hex}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                             <div>
                                <span className="text-xs text-zinc-500 mb-2 block">Triadic</span>
                                <div className="flex gap-2">
                                    {harmonies.triadic.map(hex => (
                                        <Link key={hex} href={`/colors/${hex}`} className="flex-1 h-10 rounded-md border border-zinc-200 dark:border-zinc-800 group relative" style={{ backgroundColor: `#${hex}` }}>
                                            <span className="opacity-0 group-hover:opacity-100 absolute inset-0 flex items-center justify-center bg-black/20 text-white text-[10px] font-mono transition-opacity">
                                                #{hex}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Search/Filter or Related Colors Hub */}
            <div>
                <h2 className="text-2xl font-bold mb-8">Related Named Colors</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    {namedColors.slice(0, 24).map((color) => (
                        <Link 
                            key={color.name} 
                            href={`/colors/${normalizeHex(color.hex)}`}
                            className="group p-2 bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-shadow"
                        >
                            <div 
                                className="aspect-square rounded-lg mb-2 border border-zinc-100 dark:border-zinc-900"
                                style={{ backgroundColor: color.hex }}
                            />
                            <div className="px-1 overflow-hidden">
                                <span className="block text-[10px] font-bold truncate group-hover:text-amber-600 transition-colors uppercase">{color.name}</span>
                                <span className="block text-[8px] font-mono text-zinc-500 uppercase">{color.hex}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
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
