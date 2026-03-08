"use client";

import { useState } from 'react';
import { Activity, RefreshCcw } from 'lucide-react';

export default function BmiCalculatorTool() {
    const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');

    // Metric
    const [cm, setCm] = useState<number>(170);
    const [kg, setKg] = useState<number>(65);

    // Imperial
    const [ft, setFt] = useState<number>(5);
    const [inches, setInches] = useState<number>(7);
    const [lbs, setLbs] = useState<number>(143);

    const calculateBmi = () => {
        let bmi = 0;
        if (unit === 'metric') {
            if (cm > 0 && kg > 0) {
                const m = cm / 100;
                bmi = kg / (m * m);
            }
        } else {
            if ((ft > 0 || inches > 0) && lbs > 0) {
                const totalInches = (ft * 12) + inches;
                if (totalInches > 0) {
                    bmi = 703 * (lbs / (totalInches * totalInches));
                }
            }
        }
        return bmi > 0 ? parseFloat(bmi.toFixed(1)) : null;
    };

    const getBmiCategory = (bmi: number) => {
        if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-500', bg: 'bg-blue-500/10' };
        if (bmi >= 18.5 && bmi <= 24.9) return { category: 'Normal Weight', color: 'text-green-500', bg: 'bg-green-500/10' };
        if (bmi >= 25 && bmi <= 29.9) return { category: 'Overweight', color: 'text-yellow-500', bg: 'bg-yellow-500/10' };
        if (bmi >= 30 && bmi <= 34.9) return { category: 'Obesity Class I', color: 'text-orange-500', bg: 'bg-orange-500/10' };
        if (bmi >= 35 && bmi <= 39.9) return { category: 'Obesity Class II', color: 'text-red-500', bg: 'bg-red-500/10' };
        return { category: 'Obesity Class III', color: 'text-red-700 dark:text-red-400', bg: 'bg-red-500/20' };
    };

    const bmi = calculateBmi();
    const cat = bmi ? getBmiCategory(bmi) : null;

    const reset = () => {
        setCm(170); setKg(65);
        setFt(5); setInches(7); setLbs(143);
    };

    return (
        <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-8 shadow-sm flex flex-col gap-8">
                <div className="flex items-center justify-between border-b border-border pb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <Activity className="w-6 h-6 text-brand-primary" />
                        BMI Calculator
                    </h2>
                    <button
                        onClick={reset}
                        className="px-4 py-2 text-sm font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors flex items-center gap-2"
                    >
                        <RefreshCcw className="w-4 h-4" /> Reset
                    </button>
                </div>

                <div className="flex border border-border rounded-lg overflow-hidden w-full max-w-xs mx-auto">
                    <button
                        onClick={() => setUnit('metric')}
                        className={`flex-1 px-4 py-2 text-sm font-bold transition-colors ${unit === 'metric' ? 'bg-brand-primary text-white' : 'text-muted-foreground hover:bg-muted bg-background'}`}
                    >
                        Metric (kg/cm)
                    </button>
                    <button
                        onClick={() => setUnit('imperial')}
                        className={`flex-1 px-4 py-2 text-sm font-bold transition-colors ${unit === 'imperial' ? 'bg-brand-primary text-white' : 'text-muted-foreground hover:bg-muted bg-background'}`}
                    >
                        Imperial (lbs/ft)
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">

                    <div className="flex flex-col gap-6">
                        {unit === 'metric' ? (
                            <>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                                        Height (cm)
                                    </label>
                                    <input
                                        type="number"
                                        value={cm}
                                        onChange={(e) => setCm(Number(e.target.value) || 0)}
                                        className="w-full text-lg font-bold bg-background border border-border rounded-lg p-3 outline-brand-primary"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                                        Weight (kg)
                                    </label>
                                    <input
                                        type="number"
                                        value={kg}
                                        onChange={(e) => setKg(Number(e.target.value) || 0)}
                                        className="w-full text-lg font-bold bg-background border border-border rounded-lg p-3 outline-brand-primary"
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                                        Height (ft & in)
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            value={ft}
                                            placeholder="ft"
                                            onChange={(e) => setFt(Number(e.target.value) || 0)}
                                            className="w-1/2 text-lg font-bold bg-background border border-border rounded-lg p-3 outline-brand-primary"
                                        />
                                        <input
                                            type="number"
                                            value={inches}
                                            placeholder="in"
                                            onChange={(e) => setInches(Number(e.target.value) || 0)}
                                            className="w-1/2 text-lg font-bold bg-background border border-border rounded-lg p-3 outline-brand-primary"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                                        Weight (lbs)
                                    </label>
                                    <input
                                        type="number"
                                        value={lbs}
                                        onChange={(e) => setLbs(Number(e.target.value) || 0)}
                                        className="w-full text-lg font-bold bg-background border border-border rounded-lg p-3 outline-brand-primary"
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <div className={`p-6 border border-border rounded-xl shadow-sm flex flex-col items-center justify-center text-center gap-4 transition-all duration-300 ${cat ? cat.bg : 'bg-muted/50'}`}>
                        {bmi && cat ? (
                            <div className="animate-in fade-in slide-in-from-bottom-4 flex flex-col items-center gap-2">
                                <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Your BMI</span>
                                <span className={`text-6xl font-black ${cat.color}`}>{bmi}</span>
                                <div className={`mt-2 px-6 py-2 rounded-full font-bold shadow-sm bg-background border border-border ${cat.color}`}>
                                    {cat.category}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-2 text-muted-foreground opacity-50">
                                <Activity className="w-12 h-12" />
                                <span className="font-semibold text-lg">Enter values to calculate</span>
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
}
