"use client";

import { useState } from 'react';
import { Calculator, DollarSign, Percent, Calendar } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function LoanEmiCalculatorTool() {
    const [amount, setAmount] = useState<number>(100000);
    const [rate, setRate] = useState<number>(8.5);
    const [tenure, setTenure] = useState<number>(10);
    const [tenureType, setTenureType] = useState<'years' | 'months'>('years');

    const calculateEMI = () => {
        const principal = amount;
        const r = rate / 12 / 100; // Monthly interest rate
        let n = tenure;
        if (tenureType === 'years') {
            n = n * 12; // Convert years to months
        }

        if (principal > 0 && r > 0 && n > 0) {
            // EMI Formula: P * r * (1+r)^n / ((1+r)^n - 1)
            const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            const totalPayment = emi * n;
            const totalInterest = totalPayment - principal;

            // Amortization Schedule Data
            let balance = principal;
            const data = [{ month: 0, balance: principal }];

            const maxPlotPoints = n > 120 ? Math.floor(n / 10) : 1; // Simplify chart if too many months

            for (let i = 1; i <= n; i++) {
                const interestPaid = balance * r;
                const principalPaid = emi - interestPaid;
                balance = balance - principalPaid;

                if (i % maxPlotPoints === 0 || i === n) {
                    data.push({
                        month: i,
                        balance: Math.max(0, parseFloat(balance.toFixed(2)))
                    });
                }
            }

            return {
                emi: parseFloat(emi.toFixed(2)),
                totalInterest: parseFloat(totalInterest.toFixed(2)),
                totalPayment: parseFloat(totalPayment.toFixed(2)),
                scheduleData: data
            };
        }
        return null;
    };

    const result = calculateEMI();

    return (
        <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
            <div className="flex flex-col xl:flex-row gap-8">
                {/* Left: Input Form */}
                <div className="bg-card border border-border rounded-xl p-8 shadow-sm flex flex-col gap-8 w-full xl:w-1/2 shrink-0">
                    <h2 className="text-2xl font-bold flex items-center gap-3 border-b border-border pb-4">
                        <Calculator className="w-6 h-6 text-brand-primary" />
                        EMI Calculator
                    </h2>

                    <div className="flex flex-col gap-6">
                        {/* Loan Amount */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                                <DollarSign className="w-4 h-4 text-brand-primary" /> Loan Amount
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">$</span>
                                <input
                                    type="number"
                                    min="0"
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value) || 0)}
                                    className="w-full text-lg font-bold bg-background border border-border rounded-lg py-3 pl-8 pr-4 outline-brand-primary"
                                />
                            </div>
                        </div>

                        {/* Interest Rate */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                                <Percent className="w-4 h-4 text-brand-primary" /> Interest Rate (% P.A.)
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    value={rate}
                                    onChange={(e) => setRate(Number(e.target.value) || 0)}
                                    className="w-full text-lg font-bold bg-background border border-border rounded-lg py-3 pl-4 pr-12 outline-brand-primary"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">%</span>
                            </div>
                        </div>

                        {/* Loan Tenure */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                                <Calendar className="w-4 h-4 text-brand-primary" /> Loan Tenure
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    min="1"
                                    value={tenure}
                                    onChange={(e) => setTenure(Number(e.target.value) || 1)}
                                    className="flex-1 text-lg font-bold bg-background border border-border rounded-lg py-3 px-4 outline-brand-primary min-w-[100px]"
                                />
                                <div className="flex border border-border rounded-lg overflow-hidden bg-background">
                                    <button
                                        onClick={() => setTenureType('years')}
                                        className={`px-4 py-2 text-sm font-bold transition-colors ${tenureType === 'years' ? 'bg-brand-primary text-white' : 'text-muted-foreground hover:bg-muted'}`}
                                    >
                                        Years
                                    </button>
                                    <button
                                        onClick={() => setTenureType('months')}
                                        className={`px-4 py-2 text-sm font-bold transition-colors ${tenureType === 'months' ? 'bg-brand-primary text-white' : 'text-muted-foreground hover:bg-muted'}`}
                                    >
                                        Months
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Results & Chart */}
                <div className="flex flex-col gap-8 w-full xl:w-1/2">
                    <div className="bg-card border border-border rounded-xl p-8 shadow-sm flex flex-col gap-8 justify-center min-h-[400px]">
                        {result ? (
                            <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4">

                                <div className="flex flex-col gap-2 items-center text-center p-6 bg-brand-primary/10 border border-brand-primary/20 rounded-xl relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/5 to-brand-primary/10 pointer-events-none"></div>
                                    <span className="uppercase text-sm font-bold text-brand-primary tracking-wider z-10">Monthly EMI</span>
                                    <span className="text-5xl font-black text-foreground z-10">${result.emi.toLocaleString()}</span>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-muted border border-border rounded-xl text-center flex flex-col gap-1">
                                        <span className="text-sm font-semibold text-muted-foreground">Total Interest</span>
                                        <span className="text-xl font-bold text-red-500">${result.totalInterest.toLocaleString()}</span>
                                    </div>
                                    <div className="p-4 bg-muted border border-border rounded-xl text-center flex flex-col gap-1">
                                        <span className="text-sm font-semibold text-muted-foreground">Total Payment</span>
                                        <span className="text-xl font-bold text-green-600 dark:text-green-500">${result.totalPayment.toLocaleString()}</span>
                                    </div>
                                </div>

                                {/* Simple Balance Chart */}
                                <div className="w-full h-[200px] border border-border rounded-xl p-4 pt-6 bg-background">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={result.scheduleData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <XAxis dataKey="month" hide />
                                            <YAxis hide domain={['auto', 'auto']} />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                                                formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Balance']}
                                                labelFormatter={(label) => `Month ${label}`}
                                            />
                                            <Area type="monotone" dataKey="balance" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center text-center gap-4 text-muted-foreground h-full">
                                <Calculator className="w-16 h-16 opacity-20" />
                                <p className="font-semibold text-lg">Enter valid loan details to compute EMI.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
