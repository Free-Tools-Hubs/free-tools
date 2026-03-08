"use client";

import { useState, useEffect } from 'react';
import { Calendar, UserCircle, RefreshCcw } from 'lucide-react';
import { differenceInYears, differenceInMonths, differenceInDays } from 'date-fns';

export default function AgeCalculatorTool() {
    const [dob, setDob] = useState<string>('');
    const [targetDate, setTargetDate] = useState<string>('');
    const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);

    useEffect(() => {
        // Set default target date to today
        setTargetDate(new Date().toISOString().split('T')[0]);
    }, []);

    useEffect(() => {
        if (dob && targetDate) {
            calculateAge(dob, targetDate);
        }
    }, [dob, targetDate]);

    const calculateAge = (birthDateStr: string, targetDateStr: string) => {
        const birthDate = new Date(birthDateStr);
        const target = new Date(targetDateStr);

        if (isNaN(birthDate.getTime()) || isNaN(target.getTime())) {
            setAge(null);
            return;
        }

        if (birthDate > target) {
            setAge(null); // Invalid: birthdate after target date
            return;
        }

        const years = differenceInYears(target, birthDate);
        const dateAfterYears = new Date(birthDate);
        dateAfterYears.setFullYear(birthDate.getFullYear() + years);

        const months = differenceInMonths(target, dateAfterYears);
        const dateAfterMonths = new Date(dateAfterYears);
        dateAfterMonths.setMonth(dateAfterYears.getMonth() + months);

        const days = differenceInDays(target, dateAfterMonths);

        setAge({ years, months, days });
    };

    const clearAll = () => {
        setDob('');
        setTargetDate(new Date().toISOString().split('T')[0]);
        setAge(null);
    };

    return (
        <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-8 shadow-sm flex flex-col gap-8">
                <div className="flex items-center justify-between border-b border-border pb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <UserCircle className="w-6 h-6 text-brand-primary" />
                        Age Calculator
                    </h2>
                    <button
                        onClick={clearAll}
                        className="px-4 py-2 text-sm font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors flex items-center gap-2"
                    >
                        <RefreshCcw className="w-4 h-4" /> Reset
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-4">
                        <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                            <Calendar className="w-4 h-4 text-brand-primary" /> Date of Birth
                        </label>
                        <input
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            className="w-full text-lg font-bold bg-background border border-border rounded-lg p-4 outline-brand-primary"
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                            <Calendar className="w-4 h-4 text-brand-primary" /> Target Date (Default: Today)
                        </label>
                        <input
                            type="date"
                            value={targetDate}
                            onChange={(e) => setTargetDate(e.target.value)}
                            className="w-full text-lg font-bold bg-background border border-border rounded-lg p-4 outline-brand-primary"
                        />
                    </div>
                </div>

                {age !== null ? (
                    <div className="flex flex-col gap-4 mt-4 animate-in fade-in slide-in-from-bottom-4">
                        <h3 className="font-bold text-lg text-center border-b border-border pb-2">Your Computed Age</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-brand-primary/10 border border-brand-primary/20 rounded-xl p-6 flex flex-col items-center justify-center gap-1 shadow-sm">
                                <span className="text-4xl font-black text-brand-primary">{age.years}</span>
                                <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Years</span>
                            </div>
                            <div className="bg-brand-primary/10 border border-brand-primary/20 rounded-xl p-6 flex flex-col items-center justify-center gap-1 shadow-sm">
                                <span className="text-4xl font-black text-brand-primary">{age.months}</span>
                                <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Months</span>
                            </div>
                            <div className="bg-brand-primary/10 border border-brand-primary/20 rounded-xl p-6 flex flex-col items-center justify-center gap-1 shadow-sm">
                                <span className="text-4xl font-black text-brand-primary">{age.days}</span>
                                <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Days</span>
                            </div>
                        </div>
                        <div className="mt-4 p-4 bg-muted rounded-lg border border-border text-center font-medium">
                            You are exactly <span className="font-bold text-brand-primary">{age.years} years, {age.months} months, and {age.days} days</span> old.
                        </div>
                    </div>
                ) : dob && targetDate ? (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 font-semibold text-center mt-4">
                        Please select a valid birth date that is before the target date.
                    </div>
                ) : (
                    <div className="p-8 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center text-center gap-2 mt-4 text-muted-foreground">
                        <UserCircle className="w-12 h-12 mb-2 opacity-50" />
                        <p className="font-medium">Enter your date of birth above to calculate your exact age.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
