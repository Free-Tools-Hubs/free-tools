"use client";

import { useState } from 'react';
import { Tag, RefreshCcw } from 'lucide-react';

export default function DiscountCalculatorTool() {
    const [originalPrice, setOriginalPrice] = useState<number | ''>('');
    const [discountPercent, setDiscountPercent] = useState<number | ''>('');

    const calculateDiscount = () => {
        if (originalPrice !== '' && discountPercent !== '' && originalPrice > 0 && discountPercent >= 0) {
            const discountAmt = (discountPercent / 100) * originalPrice;
            const finalPrice = originalPrice - discountAmt;
            return { discountAmt, finalPrice };
        }
        return null;
    };

    const currentStatus = calculateDiscount();

    return (
        <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-8 shadow-sm flex flex-col gap-8">
                <div className="flex items-center justify-between border-b border-border pb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <Tag className="w-6 h-6 text-brand-primary" />
                        Discount Calculator
                    </h2>
                    <button
                        onClick={() => { setOriginalPrice(''); setDiscountPercent(''); }}
                        className="px-4 py-2 text-sm font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors flex items-center gap-2"
                    >
                        <RefreshCcw className="w-4 h-4" /> Reset
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-4">
                        <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                            Original Price
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">$</span>
                            <input
                                type="number"
                                min="0"
                                placeholder="e.g. 100"
                                value={originalPrice}
                                onChange={(e) => setOriginalPrice(e.target.valueAsNumber || '')}
                                className="w-full text-lg font-bold bg-background border border-border rounded-lg p-4 pl-8 outline-brand-primary"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                            Discount Percentage (%)
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                min="0"
                                max="100"
                                placeholder="e.g. 20"
                                value={discountPercent}
                                onChange={(e) => setDiscountPercent(e.target.valueAsNumber || '')}
                                className="w-full text-lg font-bold bg-background border border-border rounded-lg p-4 pr-12 outline-brand-primary"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">%</span>
                        </div>

                        <div className="flex gap-2 text-xs font-bold text-brand-primary">
                            {[10, 15, 20, 25, 50, 75].map(p => (
                                <button key={p} onClick={() => setDiscountPercent(p)} className="flex-1 py-1.5 bg-brand-primary/10 hover:bg-brand-primary/20 rounded border border-brand-primary/20 transition-colors">
                                    {p}%
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {currentStatus ? (
                    <div className="flex flex-col gap-8 mt-4 animate-in fade-in slide-in-from-bottom-4">
                        <div className="p-6 bg-brand-primary/10 border border-brand-primary/20 rounded-xl flex flex-col items-center justify-center text-center gap-2 shadow-sm relative overflow-hidden">
                            <div className="absolute -top-4 -right-4 bg-brand-primary/20 w-32 h-32 rounded-full blur-3xl"></div>
                            <span className="text-sm font-bold uppercase tracking-widest text-brand-primary z-10">Final Price</span>
                            <span className="text-5xl md:text-6xl font-black text-foreground z-10">
                                ${currentStatus.finalPrice.toFixed(2)}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-6 bg-muted border border-border rounded-xl text-center flex flex-col gap-1 shadow-sm">
                                <span className="text-sm font-semibold text-muted-foreground uppercase">You Save</span>
                                <span className="text-3xl font-black text-green-600 dark:text-green-500">${currentStatus.discountAmt.toFixed(2)}</span>
                            </div>
                            <div className="p-6 bg-muted border border-border rounded-xl text-center flex flex-col gap-1 shadow-sm">
                                <span className="text-sm font-semibold text-muted-foreground uppercase">Original Price</span>
                                <span className="text-3xl font-black line-through opacity-50">${Number(originalPrice).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-8 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center text-center gap-2 mt-4 text-muted-foreground">
                        <Tag className="w-12 h-12 mb-2 opacity-50" />
                        <p className="font-medium">Enter price and discount details above to see the final value.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
