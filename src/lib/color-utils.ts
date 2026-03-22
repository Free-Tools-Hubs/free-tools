export interface RGB { r: number; g: number; b: number }
export interface HSL { h: number; s: number; l: number }
export interface CMYK { c: number; m: number; y: number; k: number }

export function isValidHex(hex: string): boolean {
    return /^#?([A-Fa-f0-9]{3}){1,2}$/.test(hex);
}

export function normalizeHex(hex: string): string {
    let cleanHex = hex.replace('#', '');
    if (cleanHex.length === 3) {
        cleanHex = cleanHex.split('').map(char => char + char).join('');
    }
    return cleanHex.toUpperCase();
}

export function hexToRgb(hex: string): RGB {
    const cleanHex = normalizeHex(hex);
    const bigint = parseInt(cleanHex, 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

export function rgbToHex(r: number, g: number, b: number): string {
    return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

export function rgbToHsl(r: number, g: number, b: number): HSL {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

export function hslToRgb(h: number, s: number, l: number): RGB {
    h /= 360; s /= 100; l /= 100;
    let r, g, b;

    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

export function rgbToCmyk(r: number, g: number, b: number): CMYK {
    let c = 1 - (r / 255);
    let m = 1 - (g / 255);
    let y = 1 - (b / 255);
    let k = Math.min(c, m, y);

    if (k === 1) {
        return { c: 0, m: 0, y: 0, k: 100 };
    }

    c = Math.round(((c - k) / (1 - k)) * 100);
    m = Math.round(((m - k) / (1 - k)) * 100);
    y = Math.round(((y - k) / (1 - k)) * 100);
    k = Math.round(k * 100);

    return { c, m, y, k };
}

export function getContrastRatio(rgb1: RGB, rgb2: RGB): number {
    const l1 = getLuminance(rgb1);
    const l2 = getLuminance(rgb2);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

function getLuminance({ r, g, b }: RGB): number {
    const a = [r, g, b].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function getHarmonies(hex: string) {
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    const complementary = (hsl.h + 180) % 360;
    const analogous1 = (hsl.h + 30) % 360;
    const analogous2 = (hsl.h - 30 + 360) % 360;
    const triadic1 = (hsl.h + 120) % 360;
    const triadic2 = (hsl.h + 240) % 360;

    const toHex = (h: number) => {
        const { r, g, b } = hslToRgb(h, hsl.s, hsl.l);
        return rgbToHex(r, g, b);
    };

    return {
        complementary: toHex(complementary),
        analogous: [toHex(analogous1), toHex(analogous2)],
        triadic: [toHex(triadic1), toHex(triadic2)],
        original: normalizeHex(hex)
    };
}
