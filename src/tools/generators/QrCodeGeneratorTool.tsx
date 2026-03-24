"use client";

import { useState, useRef } from 'react';
import { QrCode, Download, Settings, RefreshCcw } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function QrCodeGeneratorTool() {
    const [value, setValue] = useState('https://freetoolshubs.com');
    const [size, setSize] = useState(256);
    const [fgColor, setFgColor] = useState('#000000');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [level, setLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');
    const [margin, setMargin] = useState(true);

    const qrRef = useRef<HTMLDivElement>(null);

    const downloadQR = () => {
        if (!qrRef.current) return;
        const svg = qrRef.current.querySelector('svg');
        if (!svg) return;

        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
            canvas.width = size;
            canvas.height = size;
            if (ctx) {
                ctx.fillStyle = bgColor;
                ctx.fillRect(0, 0, size, size);
                ctx.drawImage(img, 0, 0);

                const pngFile = canvas.toDataURL('image/png');
                const downloadLink = document.createElement('a');
                downloadLink.download = 'qrcode.png';
                downloadLink.href = `${pngFile}`;
                downloadLink.click();
            }
        };
        img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    };

    const reset = () => {
        setValue('https://freetoolshubs.com');
        setSize(256);
        setFgColor('#000000');
        setBgColor('#ffffff');
        setLevel('M');
        setMargin(true);
    };

    return (
        <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
            <div className="flex flex-col xl:flex-row gap-8">

                <div className="flex-1 bg-card border border-border rounded-xl p-8 shadow-sm flex flex-col gap-8">
                    <div className="flex items-center justify-between border-b border-border pb-4">
                        <h2 className="text-xl font-bold flex items-center gap-3">
                            <QrCode className="w-5 h-5 text-brand-primary" />
                            QR Code Generator
                        </h2>
                        <button
                            onClick={reset}
                            className="px-3 py-1.5 text-sm font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-lg shadow-sm transition-colors flex items-center gap-2"
                        >
                            <RefreshCcw className="w-4 h-4" /> Reset
                        </button>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-foreground">
                                Content (URL, Text, etc.)
                            </label>
                            <textarea
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="Enter url or text here..."
                                className="w-full h-32 text-lg font-medium bg-background border border-border rounded-lg p-4 outline-brand-primary resize-y"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/30 p-6 rounded-xl border border-border">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground col-span-full border-b border-border pb-2 flex items-center gap-2">
                                <Settings className="w-4 h-4" /> Customization
                            </h3>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold">Foreground Color</label>
                                <div className="flex gap-2 items-center">
                                    <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0 bg-transparent" />
                                    <input type="text" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="flex-1 border border-border rounded p-2 text-sm font-mono bg-background" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold">Background Color</label>
                                <div className="flex gap-2 items-center">
                                    <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0 bg-transparent" />
                                    <input type="text" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="flex-1 border border-border rounded p-2 text-sm font-mono bg-background" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold">Error Correction Level</label>
                                <select
                                    value={level}
                                    onChange={(e) => setLevel(e.target.value as any)}
                                    className="w-full bg-background border border-border rounded-lg p-3 text-sm font-bold outline-brand-primary cursor-pointer"
                                >
                                    <option value="L">L - Low (7%)</option>
                                    <option value="M">M - Medium (15%)</option>
                                    <option value="Q">Q - Quartile (25%)</option>
                                    <option value="H">H - High (30%)</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold">Image Size: {size}px</label>
                                <input
                                    type="range"
                                    min="128"
                                    max="1024"
                                    step="64"
                                    value={size}
                                    onChange={(e) => setSize(Number(e.target.value))}
                                    className="w-full accent-brand-primary h-2 bg-muted rounded-lg appearance-none cursor-pointer border border-border mt-3"
                                />
                            </div>

                            <label className="col-span-full flex items-center gap-3 cursor-pointer group mt-2 pt-4 border-t border-border">
                                <input
                                    type="checkbox"
                                    checked={margin}
                                    onChange={(e) => setMargin(e.target.checked)}
                                    className="w-5 h-5 text-brand-primary rounded border-border focus:ring-brand-primary accent-brand-primary cursor-pointer"
                                />
                                <span className="text-sm font-semibold group-hover:text-brand-primary transition-colors">Include White Margin (Quiet Zone)</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="w-full xl:w-[400px] shrink-0 flex flex-col gap-6">
                    <div className="bg-card border border-border rounded-xl p-8 shadow-sm flex flex-col items-center gap-8 sticky top-6 animate-in fade-in slide-in-from-right-4">
                        <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Live Preview</span>

                        <div className="p-4 bg-muted border-2 border-dashed border-border rounded-xl flex items-center justify-center min-h-[256px] w-full relative">
                            {value ? (
                                <div ref={qrRef} className="shadow-lg rounded-sm overflow-hidden bg-white w-full h-full flex items-center justify-center">
                                    {/* Keep the scale dynamic for UI but fixed for SVG export */}
                                    <QRCodeSVG
                                        value={value}
                                        size={256}
                                        fgColor={fgColor}
                                        bgColor={bgColor}
                                        level={level}
                                        includeMargin={margin}
                                        style={{ width: "100%", height: "auto", maxWidth: "256px" }}
                                    />
                                </div>
                            ) : (
                                <div className="text-muted-foreground opacity-50 flex flex-col items-center gap-2 text-center text-sm absolute inset-0 m-auto justify-center">
                                    <QrCode className="w-12 h-12" />
                                    Enter text to generate.
                                </div>
                            )}
                        </div>

                        <button
                            onClick={downloadQR}
                            disabled={!value}
                            className="w-full py-4 text-base font-bold text-white bg-brand-primary hover:bg-brand-primary/90 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                        >
                            <Download className="w-5 h-5" /> Download (.png)
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
