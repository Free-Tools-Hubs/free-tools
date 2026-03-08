"use client";

import { useState } from 'react';
import { Calculator, Percent, ArrowRight } from 'lucide-react';

export default function PercentageCalculatorTool() {
    const [val1_type1, setVal1_type1] = useState<number | ''>('');
    const [val2_type1, setVal2_type1] = useState<number | ''>('');

    const [val1_type2, setVal1_type2] = useState<number | ''>('');
    const [val2_type2, setVal2_type2] = useState<number | ''>('');

    const [val1_type3, setVal1_type3] = useState<number | ''>('');
    const [val2_type3, setVal2_type3] = useState<number | ''>('');

    // Derived calculations
    const result_type1 = (val1_type1 !== '' && val2_type1 !== '')
        ? (Number(val1_type1) / 100) * Number(val2_type1)
        : null;

    const result_type2 = (val1_type2 !== '' && val2_type2 !== '' && Number(val2_type2) !== 0)
        ? (Number(val1_type2) / Number(val2_type2)) * 100
        : null;

    const result_type3 = (val1_type3 !== '' && val2_type3 !== '' && Number(val1_type3) !== 0)
        ? ((Number(val2_type3) - Number(val1_type3)) / Number(val1_type3)) * 100
        : null;

    return (
        <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-8 shadow-sm flex flex-col gap-8">
                <div className="flex items-center justify-between border-b border-border pb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <Percent className="w-6 h-6 text-brand-primary" />
                        Percentage Calculators
                    </h2>
                </div>

                <div className="flex flex-col gap-8">
                    {/* Type 1 */}
                    <div className="flex flex-col gap-4 p-6 bg-muted/50 rounded-xl border border-border">
                        <h3 className="text-lg font-bold flex items-center gap-2">What is X% of Y?</h3>
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <span className="font-semibold">What is</span>
                                <input
                                    type="number"
                                    value={val1_type1}
                                    onChange={(e) => setVal1_type1(e.target.valueAsNumber || '')}
                                    className="w-24 p-2 border border-border rounded outline-brand-primary text-center"
                                />
                                <span className="font-semibold">% of</span>
                                <input
                                    type="number"
                                    value={val2_type1}
                                    onChange={(e) => setVal2_type1(e.target.valueAsNumber || '')}
                                    className="w-32 p-2 border border-border rounded outline-brand-primary text-center"
                                />
                                <span className="font-semibold">?</span>
                            </div>
                            <ArrowRight className="hidden sm:block w-6 h-6 text-muted-foreground shrink-0" />
                            <div className="w-full sm:flex-1 p-3 bg-brand-primary/10 border border-brand-primary/20 rounded-lg text-brand-primary font-bold text-center text-xl min-h-[52px] flex items-center justify-center">
                                {result_type1 !== null ? Number(result_type1.toFixed(4)) : <span className="opacity-50 text-sm">Result</span>}
                            </div>
                        </div>
                    </div>

                    {/* Type 2 */}
                    <div className="flex flex-col gap-4 p-6 bg-muted/50 rounded-xl border border-border">
                        <h3 className="text-lg font-bold flex items-center gap-2">X is what percent of Y?</h3>
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <input
                                    type="number"
                                    value={val1_type2}
                                    onChange={(e) => setVal1_type2(e.target.valueAsNumber || '')}
                                    className="w-32 p-2 border border-border rounded outline-brand-primary text-center"
                                />
                                <span className="font-semibold">is what % of</span>
                                <input
                                    type="number"
                                    value={val2_type2}
                                    onChange={(e) => setVal2_type2(e.target.valueAsNumber || '')}
                                    className="w-32 p-2 border border-border rounded outline-brand-primary text-center"
                                />
                                <span className="font-semibold">?</span>
                            </div>
                            <ArrowRight className="hidden sm:block w-6 h-6 text-muted-foreground shrink-0" />
                            <div className="w-full sm:flex-1 p-3 bg-brand-primary/10 border border-brand-primary/20 rounded-lg text-brand-primary font-bold text-center text-xl min-h-[52px] flex items-center justify-center">
                                {result_type2 !== null ? `${Number(result_type2.toFixed(4))}%` : <span className="opacity-50 text-sm">Result</span>}
                            </div>
                        </div>
                    </div>

                    {/* Type 3 */}
                    <div className="flex flex-col gap-4 p-6 bg-muted/50 rounded-xl border border-border">
                        <h3 className="text-lg font-bold flex items-center gap-2">Percentage Increase/Decrease</h3>
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
                                <span className="font-semibold">Change from</span>
                                <input
                                    type="number"
                                    value={val1_type3}
                                    onChange={(e) => setVal1_type3(e.target.valueAsNumber || '')}
                                    className="w-32 p-2 border border-border rounded outline-brand-primary text-center"
                                />
                                <span className="font-semibold">to</span>
                                <input
                                    type="number"
                                    value={val2_type3}
                                    onChange={(e) => setVal2_type3(e.target.valueAsNumber || '')}
                                    className="w-32 p-2 border border-border rounded outline-brand-primary text-center"
                                />
                                <span className="font-semibold">is...</span>
                            </div>
                            <ArrowRight className="hidden md:block w-6 h-6 text-muted-foreground shrink-0" />
                            <div className="w-full sm:flex-1 p-3 bg-brand-primary/10 border border-brand-primary/20 rounded-lg text-brand-primary font-bold text-center text-xl min-h-[52px] flex items-center justify-center">
                                {result_type3 !== null ? (
                                    <span className={result_type3 > 0 ? 'text-green-600' : result_type3 < 0 ? 'text-red-500' : 'text-brand-primary'}>
                                        {result_type3 > 0 ? '+' : ''}{Number(result_type3.toFixed(4))}%
                                    </span>
                                ) : <span className="opacity-50 text-sm">Result</span>}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
