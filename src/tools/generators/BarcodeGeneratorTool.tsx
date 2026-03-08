"use client";

import { useState, useRef, useEffect } from 'react';
import { Barcode as BarcodeIcon, Download, RefreshCcw } from 'lucide-react';
import Barcode from 'react-barcode';

export default function BarcodeGeneratorTool() {
    const [value, setValue] = useState('123456789012');
    const [format, setFormat] = useState('CODE128');
    const [displayValue, setDisplayValue] = useState(true);
    const [fgColor, setFgColor] = useState('#000000');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [width, setWidth] = useState(2);
    const [height, setHeight] = useState(100);

    const qrRef = useRef<HTMLDivElement>(null);

    const downloadBarcode = () => {
        if (!qrRef.current) return;
        const svg = qrRef.current.querySelector('svg');
        if (!svg) return;

        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        // Since react-barcode outputs SVG without strict dimensions sometimes,
        // get bounding box for drawing
        const rect = svg.getBoundingClientRect();

        img.onload = () => {
            canvas.width = rect.width;
            canvas.height = rect.height;
            if (ctx) {
                ctx.fillStyle = bgColor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                const pngFile = canvas.toDataURL('image/png');
                const downloadLink = document.createElement('a');
                downloadLink.download = 'barcode.png';
                downloadLink.href = `${pngFile}`;
                downloadLink.click();
            }
        };
        img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    };

    const reset = () => {
        setValue('123456789012');
        setFormat('CODE128');
        setDisplayValue(true);
        setFgColor('#000000');
        setBgColor('#ffffff');
        setWidth(2);
        setHeight(100);
    };

    return (
        <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
            <div className="flex flex-col xl:flex-row gap-8">

                <div className="flex-1 bg-card border border-border rounded-xl p-8 shadow-sm flex flex-col gap-8">
                    <div className="flex items-center justify-between border-b border-border pb-4">
                        <h2 className="text-xl font-bold flex items-center gap-3">
                            <BarcodeIcon className="w-5 h-5 text-brand-primary" />
                            Barcode Generator
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
                            <label className="text-sm font-semibold text-foreground flex items-center justify-between">
                                Barcode Value (Text / Numbers)
                                <span className="text-xs text-muted-foreground font-normal">Ensure valid chars for selected format.</span>
                            </label>
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="e.g. 12345678"
                                className="w-full text-lg font-bold bg-background border border-border rounded-lg p-4 outline-brand-primary"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/30 p-6 rounded-xl border border-border">
                            <div className="col-span-1 flex flex-col gap-2">
                                <label className="text-sm font-semibold">Barcode Format</label>
                                <select
                                    value={format}
                                    onChange={(e) => setFormat(e.target.value)}
                                    className="w-full bg-background border border-border rounded-lg p-3 text-sm font-bold outline-brand-primary cursor-pointer"
                                >
                                    <option value="CODE128">CODE128 (Standard)</option>
                                    <option value="UPC">UPC (12 digits only)</option>
                                    <option value="EAN13">EAN-13 (12 digits only)</option>
                                    <option value="EAN8">EAN-8 (7 digits only)</option>
                                    <option value="CODE39">CODE39 (Uppercase/Numbers)</option>
                                    <option value="ITF14">ITF-14 (13 digits numeric)</option>
                                    <option value="MSI">MSI (Numeric)</option>
                                    <option value="pharmacode">Pharmacode (Integers)</option>
                                </select>
                            </div>

                            <div className="col-span-1 flex flex-col gap-2">
                                <label className="text-sm font-semibold">Display Text / Value Below</label>
                                <div className="flex gap-2">
                                    <button onClick={() => setDisplayValue(true)} className={`flex-1 py-3 text-sm font-bold border border-border rounded-lg ${displayValue ? 'bg-brand-primary text-white' : 'bg-background hover:bg-muted text-foreground'}`}>Yes</button>
                                    <button onClick={() => setDisplayValue(false)} className={`flex-1 py-3 text-sm font-bold border border-border rounded-lg ${!displayValue ? 'bg-brand-primary text-white' : 'bg-background hover:bg-muted text-foreground'}`}>No</button>
                                </div>
                            </div>

                            <div className="col-span-1 flex flex-col gap-2">
                                <label className="text-sm font-semibold">Line Color</label>
                                <div className="flex gap-2 items-center">
                                    <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0 bg-transparent" />
                                    <input type="text" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="flex-1 border border-border rounded p-2 text-sm font-mono bg-background" />
                                </div>
                            </div>

                            <div className="col-span-1 flex flex-col gap-2">
                                <label className="text-sm font-semibold">Background Color</label>
                                <div className="flex gap-2 items-center">
                                    <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0 bg-transparent" />
                                    <input type="text" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="flex-1 border border-border rounded p-2 text-sm font-mono bg-background" />
                                </div>
                            </div>

                            <div className="col-span-1 flex flex-col gap-2">
                                <label className="text-sm font-semibold">Bar Width: {width}px</label>
                                <input
                                    type="range"
                                    min="1"
                                    max="5"
                                    step="1"
                                    value={width}
                                    onChange={(e) => setWidth(Number(e.target.value))}
                                    className="w-full accent-brand-primary h-2 bg-muted rounded-lg appearance-none cursor-pointer border border-border mt-3"
                                />
                            </div>

                            <div className="col-span-1 flex flex-col gap-2">
                                <label className="text-sm font-semibold">Bar Height: {height}px</label>
                                <input
                                    type="range"
                                    min="20"
                                    max="200"
                                    step="10"
                                    value={height}
                                    onChange={(e) => setHeight(Number(e.target.value))}
                                    className="w-full accent-brand-primary h-2 bg-muted rounded-lg appearance-none cursor-pointer border border-border mt-3"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full xl:w-[400px] shrink-0 flex flex-col gap-6">
                    <div className="bg-card border border-border rounded-xl p-8 shadow-sm flex flex-col items-center gap-8 sticky top-6 animate-in fade-in slide-in-from-right-4">
                        <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Live Preview</span>

                        <div className="p-4 bg-muted border-2 border-dashed border-border rounded-xl flex items-center justify-center min-h-[200px] w-full overflow-x-auto relative">
                            {value ? (
                                <div ref={qrRef} className="shadow-sm rounded-sm overflow-hidden flex items-center justify-center bg-transparent py-4">
                                    <Barcode
                                        value={value}
                                        format={format as any}
                                        displayValue={displayValue}
                                        background={bgColor}
                                        lineColor={fgColor}
                                        width={width}
                                        height={height}
                                        margin={10}
                                    />
                                </div>
                            ) : (
                                <div className="text-muted-foreground opacity-50 flex flex-col items-center gap-2 text-center text-sm absolute inset-0 m-auto justify-center">
                                    <BarcodeIcon className="w-12 h-12" />
                                    Enter text to generate.
                                </div>
                            )}
                        </div>

                        <button
                            onClick={downloadBarcode}
                            disabled={!value}
                            className="w-full py-4 text-base font-bold text-white bg-brand-primary hover:bg-brand-primary/90 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                        >
                            <Download className="w-5 h-5" /> Download (.png)
                        </button>
                        <p className="text-xs text-center text-muted-foreground -mt-4">
                            Note: If the barcode fails to render, ensure your input value matches the strict limits of the selected Format (e.g. UPC requires exactly 12 numeric digits).
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
