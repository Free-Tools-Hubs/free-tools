"use client";

import { useState } from 'react';
import { Calendar, RefreshCcw } from 'lucide-react';
import { differenceInYears, differenceInMonths, differenceInDays, differenceInWeeks } from 'date-fns';

export default function DateDifferenceCalculatorTool() {
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    const calculateDiff = () => {
        if (!startDate || !endDate) return null;

        let start = new Date(startDate);
        let end = new Date(endDate);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return null;
        }

        if (start > end) {
            const temp = start;
            start = end;
            end = temp;
        }

        const years = differenceInYears(end, start);

        const dateAfterYears = new Date(start);
        dateAfterYears.setFullYear(start.getFullYear() + years);
        const months = differenceInMonths(end, dateAfterYears);

        const dateAfterMonths = new Date(dateAfterYears);
        dateAfterMonths.setMonth(dateAfterYears.getMonth() + months);
        const days = differenceInDays(end, dateAfterMonths);

        // Absolute totals
        const totalDays = differenceInDays(end, start);
        const totalWeeks = differenceInWeeks(end, start);
        const totalMonths = differenceInMonths(end, start);

        return { years, months, days, totalDays, totalWeeks, totalMonths };
    };

    const diff = calculateDiff();

    return (
        <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-8 shadow-sm flex flex-col gap-8">
                <div className="flex items-center justify-between border-b border-border pb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <Calendar className="w-6 h-6 text-brand-primary" />
                        Date Difference
                    </h2>
                    <button
                        onClick={() => { setStartDate(''); setEndDate(''); }}
                        className="px-4 py-2 text-sm font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors flex items-center gap-2"
                    >
                        <RefreshCcw className="w-4 h-4" /> Reset
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-4">
                        <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                            Start Date
                        </label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full text-lg font-bold bg-background border border-border rounded-lg p-4 outline-brand-primary"
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                            End Date
                        </label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full text-lg font-bold bg-background border border-border rounded-lg p-4 outline-brand-primary"
                        />
                    </div>
                </div>

                {diff ? (
                    <div className="flex flex-col gap-8 mt-4 animate-in fade-in slide-in-from-bottom-4">
                        <div className="p-6 bg-brand-primary/10 border border-brand-primary/20 rounded-xl flex flex-col items-center justify-center text-center gap-2 shadow-sm">
                            <span className="text-sm font-bold uppercase tracking-widest text-brand-primary">Exact Difference</span>
                            <span className="text-3xl md:text-4xl font-black text-foreground">
                                {diff.years} years, {diff.months} months, {diff.days} days
                            </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="p-4 bg-muted border border-border rounded-xl text-center flex flex-col gap-1 shadow-sm">
                                <span className="text-sm font-semibold text-muted-foreground uppercase">Total Days</span>
                                <span className="text-2xl font-black">{diff.totalDays.toLocaleString()}</span>
                            </div>
                            <div className="p-4 bg-muted border border-border rounded-xl text-center flex flex-col gap-1 shadow-sm">
                                <span className="text-sm font-semibold text-muted-foreground uppercase">Total Weeks</span>
                                <span className="text-2xl font-black">{diff.totalWeeks.toLocaleString()}</span>
                            </div>
                            <div className="p-4 bg-muted border border-border rounded-xl text-center flex flex-col gap-1 shadow-sm">
                                <span className="text-sm font-semibold text-muted-foreground uppercase">Total Months</span>
                                <span className="text-2xl font-black">{diff.totalMonths.toLocaleString()}</span>
                            </div>
                            <div className="p-4 bg-muted border border-border rounded-xl text-center flex flex-col gap-1 shadow-sm">
                                <span className="text-sm font-semibold text-muted-foreground uppercase">Total Hours</span>
                                <span className="text-2xl font-black">{(diff.totalDays * 24).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-8 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center text-center gap-2 mt-4 text-muted-foreground">
                        <Calendar className="w-12 h-12 mb-2 opacity-50" />
                        <p className="font-medium">Select both Start and End dates to compute the difference.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
